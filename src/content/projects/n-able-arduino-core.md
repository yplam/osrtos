---
title: n-able Arduino Core
summary: An Arduino Core for ARM-based BLE microcontrollers, specifically targeting
  the Nordic nRF51 and nRF52 series. It features a complete open-source BLE stack
  via NimBLE, integrated FreeRTOS with tickless idle for low-power operation, and
  support for custom compile-time configurations.
slug: n-able-arduino-core
codeUrl: https://github.com/h2zero/n-able-Arduino
star: 49
version: 0.3.0
lastUpdated: '2025-09-06'
rtos: freertos
libraries:
- nimble
topics:
- arduino
- ble
- bluetooth-low-energy
- nimble
- nrf51
- nrf52
- nrf5x
- platformio
isShow: false
createdAt: '2025-12-31'
updatedAt: '2025-12-31'
relatedProjects:
- nimble-arduino
- silicon-labs-arduino-core
- arduino-serial-ble
- zj-ble-rt-thread-and-nimble-for-nordic-nrf52
- rt-thread-nimble
- arduino-pico
---

## Overview

The n-able Arduino core is a specialized development framework designed for ARM-based Bluetooth Low Energy (BLE) devices. Specifically targeting the Nordic Semiconductor nRF51 and nRF52 series, this core provides a robust alternative to standard vendor-supplied frameworks. It is built with a focus on providing a consistent BLE API across different hardware while maintaining high efficiency and open-source transparency.

One of the defining characteristics of n-able is its departure from the traditional Nordic SoftDevice. Instead of relying on a proprietary, pre-compiled binary blob for Bluetooth functionality, n-able utilizes the NimBLE stack. This allows for a fully open-source BLE implementation that is integrated directly into the application build process, offering developers greater control and visibility into the network stack's behavior.

## Key Features and Architecture

The core is built upon a foundation of well-established embedded technologies. It incorporates FreeRTOS as its underlying operating system, enabling sophisticated multi-tasking and synchronization. A standout feature is the implementation of tickless idle, which is designed to maximize battery life. By allowing the MCU to enter a low-power sleep state whenever the `delay()` function is called or the system is idle, n-able makes it significantly easier to develop power-sensitive IoT applications.

**Technical highlights include:**
- **NimBLE Integration:** Full support for the NimBLE-Arduino library, providing a feature-complete BLE API.
- **FreeRTOS Core:** Uses FreeRTOS for task management, with custom configuration options for stack sizes and priorities.
- **Power Management:** Tickless idle support ensures the hardware spends as much time as possible in sleep modes.
- **Peripheral Support:** Includes the nrfx driver suite for Nordic peripherals and TinyUSB for devices with native USB support (like the nRF52840).
- **Flexible Configuration:** Developers can provide a `build_opt.h` file in their sketch to override default compile-time definitions for both the RTOS and the BLE stack.

## Hardware Support

The n-able core supports a wide array of popular Nordic-based boards, ranging from generic modules to well-known development kits:

- **nRF52840:** Nordic DK/Dongle, Adafruit Feather/Sense/Clue, Seeed Studio XIAO, and various Ebyte modules.
- **nRF52833:** Nordic DK and the BBC micro:bit v2.
- **nRF52832:** Nordic DK, Adafruit Feather nRF52832, RedBear Blend 2, and Electronut Labs Bluey/hackaBLE.
- **nRF51 Series:** The original BBC micro:bit, Calliope mini, and various legacy development kits.

## System and RTOS API

To assist with debugging and system monitoring, n-able provides a dedicated `RTOS` class. This allows developers to query the health of the system at runtime, which is particularly useful when tuning stack sizes or investigating memory leaks. Available functions include:

```cpp
// Monitor stack high water marks (in 32-bit words)
uint32_t mainStack = RTOS.getMainTaskHwm();
uint32_t idleStack = RTOS.getIdleTaskHwm();
uint32_t bleStack  = RTOS.getBleHostTaskHwm();

// Check available memory
uint32_t freeHeap  = RTOS.getFreeHeap();
```

Additionally, the core provides general system utilities such as `getResetReason()`, `systemPowerOff()`, and `systemRestart()`, giving developers fine-grained control over the device lifecycle.

## Getting Started

The project is compatible with both the Arduino IDE and PlatformIO. For Arduino IDE users, the core can be installed via the Board Manager using the project's JSON index URL. PlatformIO users can point their platform configuration directly to the n-able repository. Because the core does not include BLE functionality natively, users must also install the `NimBLE-Arduino` library (version 1.4.0 or higher) to enable Bluetooth features. 

By combining the ease of use of the Arduino ecosystem with the power of FreeRTOS and the flexibility of the NimBLE stack, the n-able core represents a powerful toolset for professional-grade BLE development on Nordic hardware.
