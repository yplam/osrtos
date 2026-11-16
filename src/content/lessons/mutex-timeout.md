---
title: Waiting for a mutex with a timeout
description: What happens when a task stops waiting for a mutex, and how each kernel takes back the priority the holder inherited from it.
order: 8
scenario: mutex-timeout
rtos: [freertos, zephyr]
keyStep: { event: Timeout, nth: 1 }
---

A task does not have to wait for a mutex forever. It can give a **timeout**: "wait at most three
ticks, then tell me you could not get it". Real-time code uses this a lot, because a task with a
deadline would rather do something else, or report an error, than wait without limit.

A timeout makes [priority inheritance](/learn/priority-inheritance/) harder. While the task waits,
the holder runs at the waiter's priority. When the waiter gives up, that boost has no reason to
exist any more, and someone has to take it back.

## The program

`High` asks for the mutex `M` with a timeout of three ticks. In FreeRTOS the call returns `pdTRUE`
when it got the mutex, so the code that needs the mutex goes inside an `if`:

```c
if( xSemaphoreTake( M, 3 ) == pdTRUE )
{
    vCompute( 1 );          /* work that needs M */
    xSemaphoreGive( M );
}
vCompute( 1 );              /* runs either way */
```

On Zephyr, `k_mutex_lock(&M, K_TICKS(3))` returns 0 on success and `-EAGAIN` when it times out, and
the program has the same shape. The simulator's App tab shows the code for the kernel you have
chosen. A task that gives up skips to the line after the `if` block, so it never gives back a mutex
it does not hold.

The other two tasks: `Low` takes `M` at tick 0 and needs it for seven ticks of work. `Med` wakes at
tick 2 with three ticks of work that have nothing to do with `M`.

## What happens (FreeRTOS)

1. Tick 0: `Low` takes `M`.
2. [Tick 1](#sim:rtos=freertos&event=PrioChange:1): `High` wakes and asks for `M` with a timeout of 3.
   `Low` inherits priority 3, and `High` blocks until tick 4 at the latest. It sits in two lists at
   once: the mutex's waiting list and the [delayed list](/learn/glossary/delayed-list/).
3. Ticks 1 to 3: `Low` runs at priority 3. `Med` wakes at tick 2 but is less urgent than `Low`'s
   borrowed priority, so it waits. So far this is priority inheritance working as intended.
4. [Tick 4](#sim:rtos=freertos&event=Timeout:1): `High`'s timeout runs out. The tick moves it back to
   the ready list, and it runs again inside `xSemaphoreTake()`. The mutex is still taken and the
   time is up, so before returning `pdFALSE` the function calls
   `vTaskPriorityDisinheritAfterTimeout()`. `Low` drops back to priority 1 while it still holds `M`.
5. `High` skips the `if` block, does its last tick of work and ends.
6. `Med` is now the most urgent task and runs ticks 5 to 7. `Low` runs again at tick 8 and gives `M`
   back at tick 11.

## What happens (Zephyr)

Every timeout on Zephyr is one tick longer (see [scheduling](/learn/scheduling/#the-tick)): `High`
wakes at tick 2, and its three-tick wait for `M` ends at tick 6.

1. Tick 2: `High` asks for `M`; `Low` goes from priority 14 to 12. `Low` runs ticks 2 to 5, and `Med`,
   awake from tick 3, waits.
2. [Tick 6](#sim:rtos=zephyr&event=Timeout:1): the timeout fires. `High` runs again inside
   `k_mutex_lock()`, which sees that it timed out, lowers `Low` back to 14 and returns `-EAGAIN`.
3. `High` does its last tick of work and ends; `Med` runs ticks 7 to 9; `Low` gives `M` back at
   tick 11.

## Taking the boost back

Both kernels lower the holder when a waiter gives up, but they compute the new priority from
different information.

**FreeRTOS** looks at the mutex the waiter gave up on. `xQueueSemaphoreTake()` finds the most urgent
task still in that mutex's waiting list and passes its priority to
`vTaskPriorityDisinheritAfterTimeout()`. The holder is set to the higher of that priority and its
own base priority, but only if it holds **exactly one** mutex. If it holds more, FreeRTOS cannot
tell which one caused the boost, so it leaves the priority alone, the same rule that makes
[nested mutexes](/learn/nested-mutexes/) keep a raised priority. The
[FreeRTOS walkthrough](/learn/freertos/priority-inheritance/#when-the-waiter-gives-up) shows the
function.

**Zephyr** recomputes the owner's priority from scratch, over every mutex the owner holds: the most
urgent first waiter of each, or the owner's original priority if there is none. That is exact. One
limitation is documented in the source: only the direct owner is lowered. If that owner was itself
waiting for another mutex, the owners further along the chain keep their raised priority until they
unlock. See the [Zephyr walkthrough](/learn/zephyr/priority-inheritance/#when-the-waiter-gives-up).

In this scenario `Low` holds only `M` and nobody else waits, so both kernels put it straight back to
its own priority.

## A timeout is not a deadline

The timeout bounds how long `High` waits; it does not guarantee that `High` runs when it expires. The
expired task is made ready like any other, and runs when it is the most urgent. Here it is, because
`High` is the most urgent task. Turn time slicing off (below) to see a case where it is not.

## What to try

- Turn **Time slicing** off. `High`'s timeout expires on time, but `Low` runs at the same borrowed
  priority and nothing makes it give up the CPU, so `High` only runs when `Low` releases `M`. Then
  the kernels differ: FreeRTOS's `xSemaphoreTake()` goes round its loop once more, finds `M` free and
  takes it, late (tick 7). Zephyr's `k_mutex_lock()` was already woken by its timeout and returns
  `-EAGAIN`, although `M` is free by the time `High` runs.
- Set **Med urgency** to 4. `Med` is now more urgent than everyone, so inheritance cannot help `Low`
  finish, and `High` gives up without `Low` having made much progress. The timeout is the only thing
  that limits `High`'s wait.
