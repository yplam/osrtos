---
title: Event groups
description: How a task waits for several events at once, all of them or any one, how one set of bits wakes every task it satisfies, and what each kernel returns to the waiter.
order: 17
scenario: event-group
rtos: [freertos, zephyr]
keyStep: { event: GotBits, nth: 2 }
---

A [semaphore](/learn/semaphores/) signals one kind of event. A task that needs *several* things
before it can go on (a reading from the sensor *and* a network link, say) could wait on two
semaphores one after the other, but then it holds on to the first while it waits for the second,
and it cannot wait for "whichever comes first" at all. An **[event group](/learn/glossary/event-group/)**
answers both: it is a word of bits, each one an event, and a task can wait for **all** of a set of
bits or for **any** of them.

- **Setting** bits (from a task, an interrupt or a timer callback) wakes *every* waiting task whose
  condition is now met. One set can wake several tasks, unlike a semaphore give, which wakes one.
- A waiter can ask for the bits it waited for to be **cleared on exit**, so the same events are
  not handled twice. Without it, the bits stay set until someone clears them.
- Bits that are set while nobody waits are remembered, but not counted: setting a bit that is
  already set changes nothing.

FreeRTOS calls them event groups (`xEventGroupSetBits()`, `xEventGroupWaitBits()`); Zephyr calls
them event objects, `k_event` (`k_event_post()`, `k_event_wait()` for any bit,
`k_event_wait_all()` for all of them, and the `_safe` variants, which clear on exit).

## The scenario

`E` has three bits, `DATA`, `LINK` and `ERR`. The application names them (`#define BIT_DATA ( 1 << 0 )`).

- `Upload` (urgency 3) waits for **all** of `DATA` and `LINK`, clearing them as it takes them, and
  then works for two ticks. It does that twice.
- `Status` (urgency 2) waits for **any** of `LINK` or `ERR`, once, and works for one tick.
- `Net` (urgency 1) sleeps until tick 6, sets `LINK`, sleeps 6 more ticks and sets `LINK` again.
- The `Sensor` interrupt sets `DATA` at ticks 3 and 8.

## What happens on FreeRTOS

1. [Tick 3](#sim:tick=3): the `Sensor` interrupt sets `DATA`. On FreeRTOS an interrupt does not set
   the bits itself: `xEventGroupSetBitsFromISR()` hands the work to the
   [timer service task](/learn/glossary/timer-service-task/), which is the most urgent task and
   runs as soon as the interrupt returns. `DATA` alone wakes nobody: `Upload` also needs `LINK`,
   and `Status` waits for `LINK` or `ERR`.
2. [Tick 6](#sim:event=GotBits:1): `Net` sets `LINK`. The kernel walks the list of waiting tasks:
   `Upload` now has both bits, `Status` has one of its two. **Both are woken by the one call.**
   `Upload` asked for its bits to be cleared, but that happens only after the walk, so `Status`
   sees `LINK` too. `Upload` is the more urgent and runs first.
3. Tick 8: `Upload` is done with its work, and the interrupt sets `DATA` again. `Upload` waits for
   `DATA` and `LINK` a second time; `DATA` is there, `LINK` is not. `Status` finally runs.
4. [Status gets its bits](#sim:event=GotBits:2): `xEventGroupWaitBits()` returns
   `DATA | LINK`, the whole group as it was when `Status` was woken, although `Status` only waited
   for `LINK`. It is the caller's job to test the bits it cares about.
5. Tick 15: `Net` sets `LINK` again, and `Upload` takes both bits for the second time.

## What happens on Zephyr

The bits move the same way, a tick later where a sleep is involved (`Net`'s sleeps get
[the extra tick](/learn/zephyr/tick-and-delay/): `LINK` is set at ticks 7 and 17). Two things
differ:

- The interrupt calls `k_event_post()` and sets `DATA` itself, inside the handler. There is no
  helper task.
- A wait returns only the events that satisfied it. `Status` gets
  [`LINK`](#sim:rtos=zephyr&event=GotBits:2), not `DATA | LINK`. The rest of the group is not its
  business, and in its `_safe` form the wait clears exactly those bits.

## The cost of deferring

Why does FreeRTOS not set the bits in the interrupt? Setting bits may wake any number of tasks,
and walking a list of unknown length is not something FreeRTOS does with interrupts off. So the
interrupt only queues a request (`setBits(E, DATA)` in the timer queue) and the timer service task
does the walk later, with the scheduler suspended but interrupts on.

"Later" is only as soon as the timer task gets the CPU. Set **Timer task urgency** to 1, the lowest
task priority. At tick 8 the timer task now waits behind `Upload` and `Status`, and `DATA` is set
only at tick 9: the bit lights up in `E` a tick after the interrupt. If a task more urgent than the
timer task were busy for longer, the event would wait for it. Zephyr pays the walk inside the
interrupt instead, with interrupts masked for as long as it takes.

## What to try

- Untick **Yield from ISR** (FreeRTOS): the timer service task is woken by the interrupt, but no
  switch is requested. At tick 3 nothing else happens until the next tick, so `DATA` is set at
  tick 4. At tick 8 `Upload` makes a kernel call right after the interrupt, and resuming the
  scheduler in that call makes the switch that was left pending: `DATA` is set on time.
- Swap the urgencies of `Upload` and `Status`: at tick 6 `Status` runs first, and on FreeRTOS it
  still returns `DATA | LINK` although `Upload`, woken by the same call, clears them.
- Read the kernel side in the walkthroughs [for FreeRTOS](/learn/freertos/event-groups/) and
  [for Zephyr](/learn/zephyr/events/).
