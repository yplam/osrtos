---
title: TISM - The Incredible State Machine
summary: TISM is a cooperative multitasking framework for the Raspberry Pi Pico (RP2040
  and RP2350) that enables concurrent task execution through a state-machine architecture.
  It provides essential system services including dual-core scheduling, a thread-safe
  messaging system, and hardware abstraction for interrupts and timers.
slug: tism-the-incredible-state-machine
codeUrl: https://github.com/mjklaren/TISM
lastUpdated: '2026-03-21'
licenses:
- GPL-3.0
image: /202605/TISM_0.avif
rtos: ''
topics:
- c
- cooperative-multitasking
- multitasking
- raspberry-pi-pico
- rp2040
- rp2350
isShow: true
createdAt: '2026-05-07T00:41:12+00:00'
updatedAt: '2026-05-07T00:41:12+00:00'
relatedProjects:
- arduino-pico
- pico-rtic-template
- rp2040-freertos-template
- stm32-event-triggered-finite-state-machine-framework
- raspberry-pi-pico-freertos-sample-application
- mbed-rpi-pico-timerinterrupt
---

Developing for the Raspberry Pi Pico often starts with a simple loop, but as projects grow to include multiple sensors, motors, and user interfaces, managing timing becomes a significant challenge. While the RP2040 and RP2350 offer dual-core performance, standard procedural code often leaves one core idle or struggles to balance competing priorities. TISM, or "The Incredible State Machine," provides a lightweight framework to solve this by applying cooperative multitasking techniques specifically tuned for the Pico ecosystem.

### A State-Machine Approach to Multitasking

Unlike a preemptive RTOS like FreeRTOS, which forces context switches at any time, TISM relies on cooperative multitasking. In this model, tasks are designed as state machines that run briefly and then yield control back to the scheduler. This approach eliminates the need for complex stack management and reduces overhead, making it ideal for developers who want to maximize the 125MHz+ capacity of the Pico without the complexity of a full operating system.

At its core, TISM is built around a centralized system structure where tasks are registered and then managed by autonomous schedulers running on each core. These schedulers iterate through task lists to determine which task is ready to run based on a priority-based wake-up mechanism. Tasks can be assigned HIGH, NORMAL, or LOW priorities, which effectively dictates how frequently the scheduler checks their execution status.

### Core Components and Architecture

The framework is modular, consisting of several specialized components that handle the heavy lifting of embedded development:

*   **The Scheduler:** Manages task execution across both cores. To prevent data races and optimize performance, schedulers on different cores can iterate through task lists in opposite directions.
*   **The Postman:** A thread-safe messaging system that replaces direct function calls. Each task maintains an inbound circular queue, allowing tasks to communicate asynchronously without blocking.
*   **IRQ Handler:** A sophisticated abstraction for hardware interrupts. Since the Pico typically supports a limited number of interrupt handlers, TISM allows multiple tasks to "subscribe" to specific GPIO events via messages.
*   **Software Timers:** Provides a mechanism for tasks to receive messages after specific intervals, useful for periodic actions like blinking LEDs or polling sensors.
*   **UartMX & Network Manager:** For distributed systems, TISM supports inter-host communication over UART. This allows multiple Picos to form a network, discovering neighbors and exchanging messages with CRC-16 error checking.

### Developing with TISM

Creating a task in TISM involves defining a set of states—typically `INIT`, `RUN`, and `STOP`. Because the framework does not store individual task stacks, developers use static or global variables to maintain state across execution cycles. This discipline ensures that tasks remain lightweight and predictable.

An example implementation of a blinking LED task might look like this logically:

```c
// Example logic for a TISM task
static void ExampleTask2(TISM_Message *msg) {
    static bool led_state = false;
    
    // Handle incoming messages (e.g., from a timer or another task)
    if (msg->Type == TISM_TIMER_EVENT) {
        led_state = !led_state;
        gpio_put(PICO_DEFAULT_LED_PIN, led_state);
    }
    
    // Handle priority changes or frequency adjustments from other tasks
    if (msg->Type == TISM_MSG_UPDATE_FREQ) {
        // Logic to update software timer interval
    }
}
```

### System Tuning and Debugging

TISM is highly configurable through definitions in `TISM.h`. Developers can disable multicore support, turn off the priority mechanism for a simple round-robin execution, or disable the scheduler entirely for specialized use cases. 

For debugging, the framework includes a thread-safe `EventLogger` and a built-in console. The console provides a window into the system's internals via USB or UART, allowing developers to monitor memory usage, task statuses, and network topology in real-time. There is even a "step-by-step" execution mode for developers who need to meticulously trace the interaction between concurrent tasks.
