---
title: Interrupts and deferred handling
description: Why an interrupt handler should only signal a task, how the task runs the moment the interrupt returns, and what happens to interrupts that arrive while it is busy.
order: 11
scenario: deferred-interrupt
rtos: [freertos, zephyr]
keyStep: { event: Interrupt, nth: 1 }
---

Hardware does not wait for the scheduler. A UART receives a byte, a timer expires, a button is
pressed, and the CPU stops whatever it was doing to run an
[interrupt service routine (ISR)](/learn/glossary/isr/). The interrupted task does not choose this
and cannot delay it; the ISR runs before any task, however urgent.

That is exactly why an ISR should do as little as possible. While it runs, no task runs, and other
interrupts of the same or lower priority wait. The usual design is
[deferred interrupt handling](/learn/glossary/deferred-interrupt-handling/): the ISR does only what
cannot wait (read the byte, clear the interrupt), **signals a task**, and returns. The task does the
real work, at a priority the designer chose, where it can block, take mutexes and be preempted like
any other task.

## The scenario

- `Handler` (most urgent) loops for ever: take the semaphore `S`, then work for two ticks.
- `Main` is a less urgent task with fourteen ticks of work.
- The `UART` interrupt fires at ticks 3, 8, 9 and 15. Its handler gives `S` and nothing else.

`S` is a [binary semaphore](/learn/semaphores/) that starts empty. The interrupt lane under the tasks
on the timeline marks each interrupt.

The simulator makes two simplifications. An interrupt arrives **right after a tick**, before the
context switch that tick may ask for, never in the middle of a tick or of a kernel call. And an ISR
takes no time. Real interrupts arrive at any moment and take a few microseconds; neither changes
what the kernel does with the signal.

## What happens

1. Tick 0: `Handler` runs first and blocks on the empty `S`. `Main` gets the CPU.
2. [Tick 3](#sim:event=Interrupt:1): the interrupt fires while `Main` is running. The handler gives
   `S`. `Handler` was waiting for it, so the kernel makes it ready. It is more urgent than `Main`, so
   the kernel switches to it **as soon as the interrupt returns**: `Handler` runs during tick 3. The
   delay between the interrupt and the start of the real work is the
   [interrupt-to-task latency](/learn/glossary/isr/), here zero ticks.
3. `Handler` works for two ticks, loops, and at tick 5 takes `S` again. It is empty, so `Handler`
   blocks and `Main` continues.
4. [Tick 8](#sim:event=Interrupt:2): the same again.
5. [Tick 9](#sim:event=Interrupt:3): the interrupt fires while `Handler` is **still busy** with the
   previous one. Nobody waits for `S`, so the give only sets it to 1. Nothing is lost: when
   `Handler` loops at tick 10 it takes `S` at once, without blocking, and handles the second event.
6. [Tick 15](#sim:event=Interrupt:4): one more event, handled at once. `Main` finishes at tick 22.

`Main` was interrupted four times and preempted three times, and nothing in its code knows about
it. That is the point of an RTOS: the urgent work is organised by priority, not by inserting checks
into the main loop.

## Leaving the interrupt: who switches tasks?

An ISR runs on whatever stack and task context it interrupted. It must not switch tasks in the
middle of itself; the switch happens on the way out. The two kernels arrange this differently, and
you can see it in the **Kernel** code tab at tick 3.

- **FreeRTOS** has a separate set of ISR calls. `xSemaphoreGiveFromISR()` never switches tasks. It
  reports, in `xHigherPriorityTaskWoken`, whether it woke a task more urgent than the interrupted
  one, and the handler ends with `portYIELD_FROM_ISR( xHigherPriorityTaskWoken )`. On a Cortex-M
  that sets the PendSV exception pending, and the switch happens after the interrupt returns.
  Leaving out that last line is allowed, and the parameter **Yield from ISR** does it.
- **Zephyr** uses the same `k_sem_give()` in threads and ISRs. Inside an ISR the kernel never
  switches; instead, the interrupt exit code always checks whether the thread to run has changed.
  There is nothing to forget, and no parameter to turn off.

The walkthroughs show the code: [FreeRTOS](/learn/freertos/interrupts/) and
[Zephyr](/learn/zephyr/interrupts/).

## What to try

- On FreeRTOS, turn **Yield from ISR** off. At tick 3 the interrupt still makes `Handler` ready, but
  nobody asks for a switch, so `Main` goes on running until the next tick: the latency grows to one
  tick. The kernel has noted the switch in `xYieldPending` (watch the variables), and the tick
  interrupt honours it. Worse, at tick 8 `Handler` is woken but has not run by tick 9, so `S` is
  still given and the tick-9 interrupt is **lost**: a binary semaphore cannot count two events.
  `Handler` handles three of the four interrupts.
- Set **Handler urgency** to 1, below `Main`. Now the interrupts still arrive on time, but `Handler`
  cannot run until `Main` has finished at tick 14. By then the interrupts at 8 and 9 have found `S`
  already given and have been lost. Deferring work to a task only works if the task is urgent
  enough.
- Now set **S is a** to counting semaphore and try both again. A counting semaphore remembers how
  many interrupts are pending (up to its maximum, 4 here), so with **Yield from ISR** off `Handler`
  handles all four interrupts, though none of them in the tick it arrived. With **Handler urgency** at 1 it handles all four
  too, one after another once `Main` has finished.

Lost events are the weakness of a binary semaphore as a signal. A
[counting semaphore](/learn/counting-semaphores/) keeps count of them, and a [queue](/learn/queues/)
keeps the data that comes with each one.
