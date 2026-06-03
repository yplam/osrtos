---
title: RTduino
summary: An Arduino ecosystem compatibility layer for the RT-Thread real-time operating
  system. It enables the use of Arduino APIs and libraries on RT-Thread supported
  hardware, bridging the gap between the Arduino community and professional RTOS development.
slug: rtduino
codeUrl: https://github.com/RTduino/RTduino
siteUrl: http://www.rtduino.com/
star: 107
version: v1.0.0
lastUpdated: '2025-08-07'
rtos: rt-thread
topics:
- arduino
- compatibility-layer
- rt-thread
- rtduino
- rtos
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- cmsis-rtos1-compatibility-layer-for-rt-thread
- rt-thread-art-arduino-rt-thread
- rtduino-pinout-generator
- arduino-rt-thread-library
- cmsis-rtos2-compatibility-layer-for-rt-thread
- arduino-freertos-library
---

## Bridging Arduino and RT-Thread

RTduino is an open-source compatibility layer designed to bring the vast Arduino ecosystem to the RT-Thread real-time operating system. As a sub-community project of RT-Thread, it serves as a bridge that allows developers to use familiar Arduino APIs, programming methods, and thousands of existing third-party libraries directly within an RT-Thread environment. This integration significantly lowers the barrier to entry for beginners transitioning from Arduino to professional RTOS development while providing experienced RT-Thread users with access to a massive repository of sensor drivers and algorithms.

## Key Features and Capabilities

The primary goal of RTduino is to provide a seamless "setup-loop" framework that Arduino developers expect, while running on top of a multi-threaded, industrial-grade RTOS. By implementing the core Arduino API—including GPIO control, PWM, ADC, I2C, and SPI—RTduino allows for the rapid porting of sketches and libraries.

**Core capabilities include:**
- **Standard Arduino API Support**: Functions like `digitalRead`, `digitalWrite`, `analogWrite`, and `pinMode` are mapped to RT-Thread's hardware abstraction layers.
- **Built-in Library Support**: Includes standard implementations for `SPI`, `Wire` (I2C), and `Servo` control.
- **Third-Party Library Compatibility**: Users can import standard Arduino libraries (e.g., Adafruit or SparkFun drivers) by simply placing them in the project folder.
- **IDE Integration**: Full support for RT-Thread Studio, VSCode, and Keil MDK, with GUI-based configuration for enabling features.

## Extensive Hardware Support

RTduino has been ported to a wide variety of Board Support Packages (BSPs) within the RT-Thread ecosystem. Supported platforms include:
- **STM32 Series**: From the popular BluePill (F103) and BlackPill (F401/F411) to high-end Nucleo and Discovery boards.
- **Renesas RA**: Support for the RA6M3 HMI board.
- **NXP LPC**: Support for the LPC55S69 EVK.
- **Raspberry Pi**: Full support for the RP2040-based Raspberry Pi Pico.
- **RISC-V**: Support for WCH CH32V series and Essemi ES32VF microcontrollers.
- **Infineon**: Support for PSoC6 and XMC7100 series.

## Getting Started with RTduino

Using RTduino within an RT-Thread project follows the standard Arduino workflow. Once the RTduino package is enabled in the RT-Thread settings, developers can write their logic in an `arduino_main.cpp` file using the classic structure:

```cpp
#include <Arduino.h>

void setup(void)
{
    // Initialize the built-in LED pin as an output
    pinMode(LED_BUILTIN, OUTPUT);
}

void loop(void)
{
    // Toggle the LED and print to the serial monitor
    digitalWrite(LED_BUILTIN, !digitalRead(LED_BUILTIN));
    Serial.println("Hello from RTduino on RT-Thread!");
    delay(500);
}
```

## Technical Architecture

The project is organized into two main components: the **core** and **libraries**. The core folder contains the implementation of the Arduino base specifications, ensuring that timing functions (`delay`, `millis`) and I/O operations behave correctly within the RT-Thread scheduler. The libraries folder is split into `buildin` (standard Arduino libraries) and `user` (where developers can drop in external ZIP libraries).

One of the unique advantages of RTduino is its ability to coexist with native RT-Thread code. Developers can use Arduino APIs for simple hardware interaction while simultaneously utilizing RT-Thread's advanced features like semaphores, mailboxes, and high-level networking stacks. This makes it an ideal choice for projects that require the rapid prototyping speed of Arduino with the robustness of a professional RTOS.
