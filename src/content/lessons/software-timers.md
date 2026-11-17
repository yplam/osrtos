---
title: Software timers
description: How a software timer runs a callback after a delay or every period, and why FreeRTOS runs it in a task of its own while Zephyr runs it in the tick interrupt.
order: 16
scenario: software-timers
rtos: [freertos, zephyr]
keyStep: { event: TimerExpire, nth: 2 }
---

A task that has to do something every 4 ticks can loop on a [delay](/learn/periodic-tasks/). But
many jobs are too small to deserve a task and a stack of their own: blink an LED, time out a
key press, poll a sensor now and then. A **[software timer](/learn/glossary/software-timer/)** does
them with no task of its own. You give the kernel a period and a **callback**, a short function,
and the kernel calls it when the time is up:

- A **one-shot** timer expires once, a period after it is started.
- An **auto-reload** timer expires every period, until it is stopped.

Starting a timer again while it runs restarts its period from now, which is how a timeout that
should only fire after a quiet spell (a screen that dims when no key has been pressed for a while)
is built: every key press restarts it.

The callback must be short and must never wait, because it does not run in a task you own. Where
it does run is the big difference between the two kernels:

- **FreeRTOS** runs every callback in the **[timer service task](/learn/glossary/timer-service-task/)**
  (`Tmr Svc`), a task the kernel creates for itself at `configTIMER_TASK_PRIORITY`. A task does not
  even touch a timer itself: `xTimerStart()` and `xTimerStop()` send a command to that task through
  a queue.
- **Zephyr** runs the callback, its *expiry function*, inside the tick interrupt, as soon as the
  timer's timeout comes due. There is no timer task and no command queue: `k_timer_start()` puts
  the timer straight into the kernel's timeout list.

## The scenario

- `Blink` is an auto-reload timer with a period of 4 ticks. `main()` starts it before any task
  runs. Its callback gives the binary semaphore `S`, and that is all.
- `Handler` does the work: it loops on `S` and works one tick each time. It has urgency 2.
- `Worker`, the most urgent task (urgency 3), sleeps until tick 6 and then works for five ticks.
- `Keys` (urgency 1) wakes at tick 13 and stops `Blink`.

Giving a semaphore from the callback and doing the work in a task is the same
[deferred handling](/learn/interrupts/) used for interrupts: the callback stays short.

## What happens on FreeRTOS

1. Tick 0: `main()` has created `Blink` and called `xTimerStart( xBlink, 0 )`. The scheduler is not
   running yet, so the command `start(Blink, 0)` just waits in the timer command queue
   (`xTimerQueue` in the kernel panel). `Tmr Svc` has priority 4, above every task, so it runs
   first: it takes the command, puts `Blink` into its list of active timers, due at 0 + 4 = 4, and
   waits on its queue until then.
2. [Tick 4](#sim:tick=4): the tick wakes `Tmr Svc`. It finds `Blink` due, puts it back in the list
   for tick 8 and calls the callback, which gives `S`. `Tmr Svc` waits again and `Handler` runs.
3. Tick 6: `Worker` starts its five ticks of work.
4. [Tick 8](#sim:event=TimerExpire:2): `Blink` is due again. `Tmr Svc` is more urgent than
   `Worker`, so it preempts it and runs the callback on time. `Handler` is ready now, but it is
   less urgent than `Worker` and waits until `Worker` ends at tick 11.
5. Tick 12: the third expiry, and `Handler` runs at once.
6. Tick 13: `Keys` calls `xTimerStop()`. That only sends `stop(Blink)` to `Tmr Svc`, which is more
   urgent and runs before `Keys` has even returned: it takes `Blink` out of the list. The expiry
   due at tick 16 never comes.

The timer task's own lane in the timeline shows what all this costs: it runs for a moment at each
expiry and each command, and is blocked the rest of the time.

## What happens on Zephyr

The timer expires at [tick 5](#sim:rtos=zephyr&tick=5), 9 and 13, one tick later than on FreeRTOS.
`k_timer_start()` was called from a thread, and a relative timeout from a thread always gets one
extra tick ([why](/learn/zephyr/tick-and-delay/)). After that first expiry the next one is
computed from when the timer was due, as an absolute tick, so the period stays 4.

Each expiry function runs inside the timer interrupt, before any thread switch. At tick 9 it gives
`S` while `Worker` is still busy; `Handler` gets the semaphore but waits for `Worker`, as on
FreeRTOS. `Keys` wakes at tick 14 (the same extra tick on its own sleep) and `k_timer_stop()` takes
the timer out of the timeout list straight away, so the expiry due at tick 17 never comes.

## When the timer task is not the most urgent

On FreeRTOS a callback runs only when the timer task gets the CPU. Set **Timer task urgency** to
2, below `Worker`. At tick 8 `Blink` is due, but `Worker` keeps the CPU, and the callback only runs
at tick 11, three ticks late. The next expiry is still at tick 12: an auto-reload timer counts its
next expiry from when it was *due*, not from when its callback ran, so being late once does not
shift every later expiry. If the timer task falls behind by more than a whole period, it runs the
missed callbacks back to back.

This is why the FreeRTOS documentation suggests a high priority for the timer task, and why
callbacks must be short: while one runs, no other callback can, and no command is processed.
Zephyr has no such setting, and the parameter is not offered there. Its expiry functions are never
late, but they run with interrupts at the timer's level, so they must be even shorter.

## What to try

- Untick **Blink reloads**: `Blink` becomes a one-shot timer and expires only once, at tick 4
  (Zephyr: 5). `Keys` stops a timer that is no longer running, which does nothing.
- Set **Blink period** to 3: FreeRTOS expires at ticks 3, 6, 9 and 12, Zephyr at 4, 7, 10 and 13.
  The extra tick on Zephyr only ever applies to the first expiry.
- On FreeRTOS, follow a command at the **Line** level: from `xTimerStop()` in `Keys`, through
  `xQueueSend()` into the timer queue, to `prvProcessReceivedCommands()` in `Tmr Svc`. The
  walkthroughs [for FreeRTOS](/learn/freertos/software-timers/) and
  [for Zephyr](/learn/zephyr/timers/) go through the kernel code.
