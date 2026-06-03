---
title: Little LED Daemon (littled) for RT-Thread
summary: A lightweight, asynchronous LED control daemon for RT-Thread based on linked
  lists. It provides a thread-safe, singleton-based service for managing LED states,
  including blinking, toggling, and custom pulse patterns in embedded applications.
slug: little-led-daemon-littled-for-rt-thread
codeUrl: https://github.com/luhuadong/rtt-littled
siteUrl: https://blog.csdn.net/lu_embedded/article/details/104565786
star: 2
version: v1.0.0
lastUpdated: '2023-04-13'
rtos: rt-thread
topics:
- mcu
- rt-thread
- rt-thread-rtos
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- lpc43xx-freertos-led-blinking-example
- rt-thread-thread-pool-implementation
- rtic-blinky-for-nrf52840
- simple-cmsis-led-blinking-applications
- ppool-for-rt-thread
- fastled-idf
---

## Overview

Managing LED states in an embedded system often involves repetitive boilerplate code, especially when handling complex blinking patterns or multiple LEDs across different application threads. **littled** (Little LED Daemon) is a simple yet powerful LED control package designed specifically for the RT-Thread RTOS. It operates as a background service thread, handling requests for LED operations like turning on, off, toggling, or blinking without blocking the calling application thread.

By utilizing a linked-list architecture and a singleton service pattern, littled allows developers to register multiple LEDs and control them through a unified, thread-safe interface. This approach is particularly useful for systems that need to provide visual feedback (like status indicators or error codes) while maintaining high responsiveness in the main application logic.

## Key Features and Capabilities

The littled package is built with the constraints of embedded systems in mind, offering several technical advantages:

- **Asynchronous Operation**: Application threads can request an LED state change and immediately continue execution while the daemon handles the timing and GPIO toggling.
- **Singleton Service Pattern**: A single background thread manages all registered LEDs, reducing resource overhead.
- **Thread Safety**: The API is designed to be called from multiple threads safely.
- **Interrupt Support**: Control interfaces can be invoked from Interrupt Service Routines (ISRs), allowing for immediate visual feedback from hardware events.
- **Flexible Control**: Supports specific pulse widths, periods, blink counts, and durations.

## Technical Architecture

The software is structured around a central daemon thread that iterates through a list of registered LED devices. Each device is defined by its GPIO pin and active logic level (high or low). When a mode is set, the daemon calculates the necessary timing for high and low states based on the provided period and pulse width parameters.

To use littled, the system must have RT-Thread 3.0 or higher and a functional dynamic memory management module, as LED descriptors are allocated from the heap during registration.

## Getting Started

Integrating littled into an RT-Thread project is straightforward via the RT-Thread package manager. Once enabled, you can register an LED by specifying its pin and active logic:

```c
int led_desc = led_register(GET_PIN(F, 9), PIN_LOW);
```

After registration, you can control the LED using the `led_mode` function or a variety of convenient macros. For example, to make an LED blink continuously:

```c
LED_BLINK(led_desc);
```

### Available Control Macros

For ease of use, littled provides several predefined macros for common tasks:
- `LED_ON(ld)`: Turn the LED on.
- `LED_OFF(ld)`: Turn the LED off.
- `LED_TOGGLE(ld)`: Flip the current state.
- `LED_BLINK(ld)`: Standard blinking (default 1s period, 50% duty cycle).
- `LED_BLINK_FAST(ld)` / `LED_BLINK_SLOW(ld)`: Preset speeds for urgent or idle status.
- `LED_BEEP(ld)`: A short pulse or "beep" visual.

## Configuration

The package is highly configurable through `menuconfig`. Users can define default values for the period, pulse width, and blink counts, ensuring the daemon fits the specific timing requirements of the target hardware. These settings are found under the peripheral libraries and drivers section of the RT-Thread online packages menu.
