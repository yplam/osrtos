---
title: Tasks and stacks
description: What a task is made of (a function, a stack of its own and a control block), why every task needs its own stack, and how to size one.
order: 3
---

A **task** (a *thread* in Zephyr) is the unit the kernel schedules. From the programmer's side it
is just a C function that usually loops forever. From the kernel's side it is three things:

- **the function** it runs;
- **a stack** of its own, a block of RAM reserved for that task alone;
- **a control block**, the kernel's record of the task: its priority, its state, which list it is
  in, and where its stack pointer was when it last stopped. See
  [task control block](/learn/glossary/task-control-block/).

With one CPU, only one task executes at a time. The kernel creates the illusion that they all run
side by side by stopping one task and continuing another, many times per second. The stack is what
makes that possible.

## Why each task needs its own stack

A C function keeps a lot of its state on the stack: its local variables, the arguments of the
functions it calls, and the return address that tells each function where to go back to. A task
that is stopped in the middle of `update_display()`, three calls deep, has all of that on its stack.
Another task running in the meantime must not overwrite it, so it needs a stack of its own.

The stack also holds the last piece of state: the CPU's registers. When the kernel stops a task, it
saves the registers the task was using (the program counter, the stack pointer, the working
registers) and later restores them, so the task continues with its next instruction as if nothing
had happened. That is a [context switch](/learn/glossary/context-switch/).

![Three tasks, each with a TCB and its own stack. The running task's registers are in the CPU, and the CPU's stack pointer points into its stack. The two tasks that are not running have their registers saved at the top of their stacks, and their TCBs point there.](/learn/img/task-stacks.svg)

Where exactly the registers go depends on the port. On ARM Cortex-M, the processor itself pushes
eight registers onto the current stack when an interrupt arrives, and FreeRTOS's switch handler
pushes the other eight next to them. The only thing left to remember is the stack pointer, which is
stored in the TCB (`pxTopOfStack`). Zephyr's Cortex-M port keeps the same hardware-pushed frame on
the stack but stores the other registers in the thread structure itself (`callee_saved`). Either
way, the task's whole context is in its stack and its control block.

## Creating a task

In FreeRTOS a task is created at run time, usually in `main()` before the scheduler starts:

```c
void sensor_task(void *arg)
{
    for (;;) {
        read_sensor();
        vTaskDelay(pdMS_TO_TICKS(10));
    }
}

xTaskCreate(sensor_task, "Sensor", 256 /* words */, NULL, 3 /* priority */, NULL);
vTaskStartScheduler();   /* never returns */
```

The stack size is given in **words**, not bytes: 256 words is 1 KB on a 32-bit microcontroller.
`xTaskCreate()` allocates the stack and the TCB from the FreeRTOS heap; `xTaskCreateStatic()`
takes memory you provide instead.

In Zephyr, threads are usually defined statically, so their stacks are reserved at build time:

```c
void sensor_thread(void *p1, void *p2, void *p3)
{
    for (;;) {
        read_sensor();
        k_sleep(K_MSEC(10));
    }
}

K_THREAD_DEFINE(sensor, 1024 /* bytes */, sensor_thread, NULL, NULL, NULL,
                5 /* priority */, 0, 0);
```

Here the size is in **bytes**, and a lower number is a more urgent priority. A thread can also be
created at run time with `k_thread_create()` and a stack declared with `K_THREAD_STACK_DEFINE()`.
On Zephyr, the **Application** tab of the simulator's code panel shows the `K_THREAD_DEFINE` line of each thread.

## When the function ends

A task function is not supposed to fall off its end. In FreeRTOS, a task that has finished must
delete itself with `vTaskDelete(NULL)`; returning from the function is an error (the Cortex-M port
sends it to `prvTaskExitError()`, which stops in an endless loop). The simulator's tasks end with
`vTaskDelete(NULL)`, and the idle task later frees their memory.

Zephyr is more forgiving: the kernel calls every thread's function through a small wrapper, and if
the function returns, the wrapper aborts the thread.

```kernel zephyr:kernel/sys/thread_entry.c#z_thread_entry
```

## How big should a stack be?

Big enough for the deepest chain of calls the task can make, with all their local variables, plus
the saved registers, plus whatever an interrupt pushes when it arrives while the task runs. That
last part is why stacks need slack even for simple tasks. Some library functions are surprisingly
hungry: a `printf()` with floating-point formatting can need a kilobyte or more on its own.

Nobody computes that exactly by hand. The usual practice is to start generously, run the
application through its heaviest paths, measure how much of each stack was ever used, and trim.
Both kernels can measure it: they fill a new stack with a known pattern and later look for the
highest point where the pattern was overwritten. FreeRTOS reports it with
`uxTaskGetStackHighWaterMark()`; Zephyr with `k_thread_stack_space_get()` and its thread analyzer
(with `CONFIG_INIT_STACKS`).

Stacks are the main RAM cost of an RTOS design. Ten tasks with 1 KB each is 10 KB, a large share of
a small microcontroller. That is one reason to keep the number of tasks modest, and to give work
that is not urgent to a task that already exists.

## Stack overflow

If a task uses more stack than it was given, it writes over whatever lies next to its stack in
memory: another task's stack or TCB, or global variables. The program then fails somewhere else,
often much later, which makes stack overflow one of the hardest bugs to find on a microcontroller.

Both kernels can [watch for it](/learn/glossary/stack-overflow/):

- FreeRTOS: with `configCHECK_FOR_STACK_OVERFLOW` set to 1, the kernel checks at each context
  switch whether the stack pointer has gone past the end of the stack; set to 2, it also checks
  that the last bytes of the stack still hold their fill pattern. Either way it calls
  `vApplicationStackOverflowHook()`. The check catches most overflows, not all: one that happens
  and recovers between two switches can go unseen.
- Zephyr: `CONFIG_STACK_SENTINEL` keeps a magic value at the end of each stack and checks it at
  context switches and interrupts. On processors with a memory protection unit,
  `CONFIG_HW_STACK_PROTECTION` places a guard region below the stack, so an overflow faults at
  the very instruction that causes it.

Stack overflow and memory allocation are taught here in prose only: the simulator models
scheduling, and its tasks have no real stacks.

Next: the states a task moves through while it runs, waits and sleeps, in
[Task states](/learn/basics/task-states/).
