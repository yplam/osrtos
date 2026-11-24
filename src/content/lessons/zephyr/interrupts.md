---
title: Interrupts in Zephyr
description: How k_sem_give behaves in an interrupt handler, why it never switches threads there, and how the interrupt exit picks the thread to run.
order: 7
scenario: deferred-interrupt
rtos: zephyr
keyStep: { event: Interrupt, nth: 1 }
---

This walkthrough follows one interrupt through the Zephyr source, from the handler's give to the
thread switch on the way out of the interrupt. The [interrupts lesson](/learn/interrupts/) explains
the idea. Set the step level to **Line** and jump to [tick 3](#sim:event=Interrupt:1).

The application connects its handler when `main()` runs and keeps it to one line:

```c
void uart_isr(const void *arg)
{
    k_sem_give(&S);
}

int main(void)
{
    IRQ_CONNECT(UART_IRQ, 2, uart_isr, NULL, 0);
    irq_enable(UART_IRQ);
    return 0;
}
```

On most hardware `IRQ_CONNECT()` places the handler in the interrupt vector table when the image is
built; on `native_sim` it registers the handler when `main()` runs. Unlike FreeRTOS, there is no
separate ISR form of `k_sem_give()`: the same call is safe in a thread and in an ISR.

## The interrupt loop

The simulator follows the `native_sim` board, where interrupts are delivered by
`posix_irq_handler()`. On a Cortex-M the code is different (each interrupt has its own vector, and
the exit path is `z_arm_int_exit()`), but it makes the same decision at the same point.

```kernel zephyr:boards/native/native_sim/irq_handler.c#posix_irq_handler
```

At tick 3 two interrupts are pending: the system timer and the UART. The `do … while` loop handles
them in order of priority:

1. `vector_to_irq()` calls the timer driver's handler, which announces the tick
   (`sys_clock_announce()`): the tick count becomes 3. The only entry due is `Main`'s time-slice
   timer; no other thread of priority 13 is ready, so `Main` simply gets a new slice.
2. The UART is still pending, so the loop goes round and calls `uart_isr()`.
3. Each ordinary handler sets `may_swap`. After the loop, if this is the outermost interrupt and
   the scheduler's cache, `_kernel.ready_q.cache`, holds a different thread from the one that was
   interrupted, `z_swap_irqlock()` switches to it.

That last check is the only place where an interrupt leads to a thread switch. Every handler can
change which thread *should* run; none of them switches.

## k_sem_give in a handler

```kernel zephyr:kernel/sem.c#z_impl_k_sem_give
```

`Handler` waits in `S`'s wait queue, so `z_sched_wake()` takes it out, hands it the semaphore (the
count stays 0, as explained in the [semaphores lesson](/learn/semaphores/)), and makes it ready.
Making a thread ready updates the cache: `Handler` is more urgent than `Main`, and `Main` is
preemptible, so the cache now points at `Handler`.

Then `z_reschedule()` is called, as after any give that woke a thread:

```kernel zephyr:kernel/sched.c#reschedule
```

`resched()` is false inside an ISR (`arch_is_in_isr()`), so the function only releases the lock.
In a thread, the same call would have switched to `Handler` on the spot. Here the switch waits for
the end of `posix_irq_handler()`, which finds the cache changed and swaps. `Handler` runs during
tick 3.

## Nothing to forget

Compare this with FreeRTOS, where the handler must end with `portYIELD_FROM_ISR()` and forgetting it
delays the woken task by up to a tick (see [the FreeRTOS walkthrough](/learn/freertos/interrupts/)).
In Zephyr the interrupt exit always asks the scheduler, so there is no such mistake to make, and the
simulator offers no **Yield from ISR** switch for Zephyr.

The price is paid elsewhere: the check runs on every interrupt exit, including the many interrupts
that wake nobody. It is cheap, a comparison of two pointers, because the cache is kept up to date
whenever a thread becomes ready.

## A give that finds the semaphore given

Set **Handler urgency** to 1. `Main` is now more urgent and keeps the CPU until tick 14, so nobody
waits for `S`. The interrupt at tick 3 raises the count to 1. The ones at 8 and 9 find it at its
limit of 1, and `k_sem_give()` leaves it there: those two events are lost. The event log still
shows the gives, because the call itself succeeded; it simply has nowhere to put a second event.
