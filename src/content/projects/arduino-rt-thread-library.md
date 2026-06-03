---
title: Arduino RT-Thread Library
summary: A comprehensive port of the RT-Thread real-time operating system for the
  Arduino platform, enabling advanced multitasking and system-level features. It provides
  a full kernel, shell interface (FinSH), FAT filesystem support, and a micro-logging
  system for various ARM and RISC-V architectures.
codeUrl: https://github.com/onelife/Arduino_RT-Thread
siteUrl: https://create.arduino.cc/projecthub/onelife/a-better-sd-library-with-rt-thread-242130
isShow: false
rtos: rt-thread
libraries: []
topics:
- arduino
- rt-thread
- rtos
- exfat
- fat32
- ili9341
- ft6206
- arduino-library
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- arduino-freertos-library
- rtduino
- seeed-arduino-freertos
- freertos-port-for-teensy-3-6-4-0-4-1
- rt-thread-art-arduino-rt-thread
- arduino-pico
---

The Arduino ecosystem is beloved for its simplicity, but as projects grow in complexity, managing multiple tasks using only `millis()` and state machines can become a bottleneck. The **Arduino RT-Thread Library** bridges this gap by bringing the power of RT-Thread—a mature, open-source real-time operating system—directly to the Arduino environment. This library allows developers to leverage professional-grade RTOS features while maintaining the familiar Arduino workflow.

### Bringing Multitasking to Arduino
At its core, this project is a fork of RT-Thread modified specifically for Arduino. It introduces a preemptive priority-based scheduler, allowing you to run multiple threads simultaneously. Instead of a single `loop()` function, you can define distinct threads for sensor reading, motor control, and user interface management, each with its own priority and stack.

To get started, the library uses a simple initialization pattern. Calling `RT_T.begin()` in your `setup()` function hands control over to the RT-Thread scheduler. From there, you can initialize threads statically or dynamically.

```c
#include <rtt.h>

struct rt_thread blink_thread;
byte blink_thread_stack[1024];

void blink_thread_entry(void* parameter) {
  while (true) {
    digitalWrite(LED_BUILTIN, !digitalRead(LED_BUILTIN));
    rt_thread_sleep(RT_TICK_PER_SECOND);
  }
}

void rt_setup(void) {
  rt_thread_init(
      &blink_thread, "blink", blink_thread_entry, 
      RT_NULL, blink_thread_stack, sizeof(blink_thread_stack), 
      10, 20);
  rt_thread_startup(&blink_thread);
}

void setup() {
  pinMode(LED_BUILTIN, OUTPUT);
  RT_T.begin();
}
```

### Advanced Components and Shell Integration
One of the standout features of this library is the inclusion of **FinSH** (the RT-Thread Shell). FinSH provides a command-line interface over the Serial port, allowing you to interact with your running Arduino project in real-time. You can list running threads, check memory usage, or even invoke custom C functions directly from the terminal. This is an invaluable tool for debugging complex systems without constant re-flashing.

Beyond the shell, the library includes several powerful components:
- **FAT Filesystem**: Based on ChaN's FatFs, providing robust SD card support with long filename capabilities.
- **uLog**: A micro-logging system that makes debugging significantly easier than standard `Serial.print` statements.
- **Dynamic Modules**: An advanced feature that enables "Arduino Apps"—dynamic shared library linking that allows for modular code execution.

### Hardware and Architecture Support
The library is designed to be cross-platform, supporting several popular architectures and boards:
- **SAM (Cortex-M3)**: Tested on the Arduino Due.
- **SAMD (Cortex-M0+)**: Tested on the Arduino MKRZero.
- **GD32V (RISC-V)**: Support for the Longan Nano and Bumblebee core.
- **STM32 (Cortex-M7)**: Tested on the Nucleo-F767ZI.

In addition to core RTOS functionality, the project includes drivers for common hardware like ILI9341 LCDs, FT6206 touch screens, and SSD1306 OLED modules, making it a complete package for building sophisticated embedded applications.
