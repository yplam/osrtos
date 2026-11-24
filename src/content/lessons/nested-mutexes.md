---
title: Nested mutexes and when an inherited priority drops
description: A task that holds two mutexes inherits a priority through one of them. FreeRTOS keeps it until both are released; Zephyr drops it as soon as nobody waits.
order: 7
scenario: nested-mutexes
rtos: [freertos, zephyr]
keyStep: { event: Give, nth: 1 }
---

[Priority inheritance](/learn/priority-inheritance/) raises a task that holds a mutex while a more
urgent task waits for it. The interesting question is when the raised priority comes down again.
With one mutex the answer is obvious: when the mutex is released. With two, it is not, and the two
kernels in the simulator answer it differently.

## The three tasks

- `Low` takes mutex `A`, works one tick, takes mutex `B` inside it, works three ticks, releases
  `B`, works two more ticks, releases `A`, and works one last tick. `B` is *nested* inside `A`.
- `Med` wakes at tick 2 and has three ticks of work. It uses no mutex.
- `High` wakes at tick 3 and needs `B` for two ticks of work.

Nobody but `Low` ever asks for `A`.

## What happens (FreeRTOS)

The priorities are 1 (`Low`), 2 (`Med`) and 3 (`High`).

1. Ticks 0 and 1: `Low` takes `A` and then `B`.
2. Tick 2: `Med` wakes and preempts `Low`.
3. [Tick 3](#sim:rtos=freertos&event=PrioChange:1): `High` wakes, preempts `Med` and asks for `B`. `Low` holds it,
   so `Low` inherits priority 3 and `High` blocks. `Low` runs ticks 3 and 4.
4. Tick 5: `Low` gives `B` back. `High` is made ready, and gets `B` when it runs. But `Low` **stays at
   priority 3**. It still holds `A`, and FreeRTOS only restores the base priority when a task holds no
   mutex at all.
5. `High` and `Low` now have the same priority, so they take turns, one
   [time slice](/learn/glossary/time-slice/) each: `Low` runs tick 5, `High` tick 6,
   [`Low` tick 7](#sim:rtos=freertos&tick=7), `High` tick 8.
6. Tick 9: `Low` gives `A` back, and only now [drops to priority 1](#sim:rtos=freertos&event=PrioChange:2).
   `High` finishes and ends at tick 9.
7. `Med` runs ticks 9 and 10; `Low` runs its last tick, 11, and ends.

Between ticks 5 and 9, `Low` ran at priority 3 although nobody was waiting for anything it held. It
took two ticks that `High` should have had, and it kept `Med`, a more urgent task, waiting.

## What happens (Zephyr)

The priorities are 14 (`Low`), 13 (`Med`) and 12 (`High`); in Zephyr a lower number is more urgent.
Every wake-up is a tick later than on FreeRTOS (see [scheduling](/learn/scheduling/#the-tick)), so
`Med` wakes at tick 3 and `High` at tick 4.

1. Tick 4: `High` asks for `B`, `Low` is raised from 14 to 12, and `High` blocks. `Low` runs tick 4,
   the last tick of its work inside `B`.
2. [Tick 5](#sim:rtos=zephyr&event=PrioChange:2): `Low` unlocks `B`. Zephyr works the priority out
   again from the mutexes `Low` still holds. `A` has no waiters, so `Low` goes straight back to 14.
   `B` is handed to `High`, which runs ticks 5 and 6 and ends.
3. `Med` runs ticks 7 and 8; `Low` finishes its work in `A` and ends at tick 12.

`High` waited one tick for `B` and was never slowed down after it got it.

## Two ways to keep the books

FreeRTOS keeps very little per task: its base priority (`uxBasePriority`) and a count of the
mutexes it holds (`uxMutexesHeld`). When a mutex is given back, it cannot tell which of the held
mutexes caused the inheritance, so it plays safe and keeps the raised priority until the count is
zero. The [FreeRTOS walkthrough](/learn/freertos/priority-inheritance/) shows the two conditions in
`xTaskPriorityDisinherit()`. The source calls the rule a simplification, in the comment of the
timeout variant, `vTaskPriorityDisinheritAfterTimeout()`.

Zephyr v4.5.0 keeps a list of the mutexes each thread holds. On every unlock it looks at the first
waiter of each mutex that is still held and takes the most urgent of their priorities, or the
thread's original priority when nobody waits. The
[Zephyr walkthrough](/learn/zephyr/priority-inheritance/) goes through
`held_mutexes_highest_waiter_prio()`. Older Zephyr versions stored the original priority on the
mutex instead, and older articles describe that.

Neither is wrong. The FreeRTOS rule errs on the side of running the holder too urgently, never too
little, and costs nothing to compute. Zephyr's rule is exact but walks a list on every unlock.

## What it means for your program

- Inheritance is a safety net, not a design. The time a task runs at a borrowed priority is time
  that more urgent tasks may lose. On FreeRTOS that time includes everything up to the release of
  the outermost mutex.
- Keep nested sections short. On FreeRTOS, whatever work is left in the outer section after the
  inner mutex is released runs at the borrowed priority. Better still, avoid holding one mutex while
  taking another: it is also the first step towards a [deadlock](/learn/deadlock/).
- Always take nested mutexes in the same order in every task. This program does (`A`, then `B`).

## What to try

- Turn **Time slicing** off. On FreeRTOS, `Low` now keeps the CPU at priority 3 from tick 5 until it
  releases `A` at tick 7, while `High` waits with the mutex it wanted already free. On Zephyr nothing
  changes.
- Set **Med urgency** to 4. `Med` is now the most urgent task and runs its three ticks first;
  inheritance starts later, but `Low` again keeps priority 3 on FreeRTOS until it releases `A`.
