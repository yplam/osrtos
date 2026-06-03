---
title: Arduino FreeRTOS Library
summary: A specialized port of the FreeRTOS kernel optimized for 8-bit AVR microcontrollers
  within the Arduino ecosystem. It provides seamless real-time multitasking capabilities
  for ATmega-based boards like the Arduino Uno, Leonardo, and Mega, while maintaining
  compatibility with standard Arduino functions.
codeUrl: https://github.com/feilipu/Arduino_FreeRTOS_Library
siteUrl: https://feilipu.me/2015/11/24/arduino_freertos/
isShow: false
rtos: freertos
libraries: []
topics:
- freertos
- arduino
- avr
- freertos-library
- arduino-freertos
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- seeed-arduino-freertos
- arduino-rt-thread-library
- freertos-port-for-teensy-3-6-4-0-4-1
- freertos-port-for-avr-xmega
- rtduino
- rt-thread-art-arduino-rt-thread
---

Bringing real-time operating system capabilities to the world of 8-bit microcontrollers, the Arduino FreeRTOS Library is a robust fork of Richard Barry's FreeRTOS, specifically optimized for Microchip ATmega devices. While modern 32-bit processors often dominate the RTOS conversation, this project ensures that the ubiquitous AVR architecture remains a powerful contender for complex, multi-tasking embedded applications.

## Bridging the Gap Between Arduino and RTOS

For many developers, the Arduino experience begins and ends with the `void loop()` function— a simple "super-loop" architecture. While effective for basic tasks, it becomes difficult to manage as application complexity grows. This library integrates the FreeRTOS kernel directly into the Arduino IDE, allowing developers to break their code into independent tasks. 

One of the most impressive features of this port is its "hands-off" philosophy. It touches the minimum amount of hardware necessary to function, ensuring that standard Arduino libraries and functions continue to work as expected. For instance, the library redefines the standard `delay()` function to automatically use `vTaskDelay()` when appropriate, allowing other tasks to run while one is waiting, without breaking existing code logic.

## Technical Architecture and Optimization

Under the hood, the library is tailored for the constraints of 8-bit hardware. By default, it uses the ATmega Watchdog Timer (WDT) to generate 15ms time slices (Ticks). This is a clever choice that preserves the standard 8-bit timers for PWM or other user applications. However, for those requiring high-precision timing, the library allows the scheduler tick to be sourced from hardware timers like Timer0.

Memory management is handled via `heap_3.c`, which wraps the standard C `malloc()` and `free()` functions. This ensures that the heap automatically adjusts to the specific SRAM capabilities of the target device, whether you are working with the limited memory of an ATmega328 or the more generous space of an ATmega2560.

## Hardware Compatibility

The library supports a wide array of classic Arduino hardware, including:
- **ATmega328 @ 16MHz**: Uno R3, Duemilanove, Pro Trinket 5V.
- **ATmega32u4 @ 16MHz**: Leonardo, Micro, Yun, Teensy 2.0.
- **ATmega2560 @ 16MHz**: Mega, ADK.
- **ATmega1284p**: Goldilocks Analogue, Sanguino.

## Getting Started with Tasks

Creating a task in this environment feels familiar to anyone who has used FreeRTOS, but with the convenience of the Arduino setup. Here is a basic example of how tasks are initialized within the `setup()` function:

```c
#include <Arduino_FreeRTOS.h>

void setup() {
  xTaskCreate(
    TaskBlink
    ,  "Blink"   // Human-readable name
    ,  128       // Stack size (bytes)
    ,  NULL      // Parameters
    ,  2         // Priority
    ,  NULL );   // Task handle

  xTaskCreate(
    TaskAnalogRead
    ,  "Analog"
    ,  128
    ,  NULL
    ,  1
    ,  NULL );
}

void loop() {
  // Empty. Things are done in Tasks.
}
```

## Robust Error Handling

Debugging an RTOS on an 8-bit MCU can be challenging. To assist developers, the library includes built-in visual error indicators using the board's onboard LED:
- **Stack Overflow**: If a task exceeds its allocated memory, the LED will blink slowly (4-second cycle).
- **Heap Overflow**: If memory allocation fails, the LED will blink rapidly (100ms cycle).

This immediate feedback is invaluable for developers pushing the limits of their hardware. Whether you are building a complex MIDI synthesizer or a multi-sensor data logger, the Arduino FreeRTOS Library provides the scheduling power needed to manage concurrency with ease.
