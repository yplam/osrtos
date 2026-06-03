---
title: paMcuLib
summary: A unified hardware abstraction library for microcontrollers including STM32
  and ESP32, designed to provide Arduino-like interface consistency. It features a
  modular architecture for displays, sensors, and input devices, supported by custom
  VSCode extensions for submodule management.
slug: pamculib
codeUrl: https://github.com/ActivePeter/paMcuLib
star: 18
lastUpdated: '2021-07-11'
rtos: freertos
libraries:
- lvgl
- u8g2
topics:
- cpp
- cross-platform
- esp32
- ili9341
- lvgl
- mcu
- ssd1306
- stm32
- u8g2
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- cmsis-drivers-for-efm32-and-stm32
- spirit-motor-driver-library
- supladevice-library
- esp32-smartdisplay
- microchip-cmsis-modules-for-arduino
- stm32-cmsis-libraries
---

## Overview

paMcuLib is an embedded systems library designed to solve the common problem of fragmentation across different microcontroller platforms. By providing a unified interface for modules and MCU peripherals, it allows developers to write code that is more portable and modular. Much like the Arduino framework, paMcuLib abstracts the underlying hardware details, but it is specifically tailored for professional development environments like VSCode and supports advanced platforms such as the STM32 and ESP32 series.

To manage the complexity of multiple submodules and configurations, the project integrates with two custom VSCode extensions: **SubmoduleHelper** for managing library components and **MacroDefineHelper** for generating configuration trees and header macros.

## Architecture and Design

The library is built on a layered architecture that separates hardware-specific implementations from high-level logic. This is achieved through two primary components:

- **paCoreInc**: This layer defines the standard interfaces for hardware peripherals. It serves as the contract that the implementation must follow and provides the headers used by the application layer.
- **paCoreSrc**: This layer contains the platform-specific implementations. Depending on whether the target is an ESP32 or an STM32, the developer swaps out the core source repository while maintaining the same API.

This separation ensures that the application code remains largely unchanged when migrating between different MCU families.

## Supported Hardware and Modules

paMcuLib currently supports a variety of popular microcontrollers and peripheral devices:

- **Microcontrollers**: STM32 (F103, F407, H743), ESP32 (including S2), and MSP432E.
- **Displays**: Integration with powerful graphics libraries like **u8g2** (for SSD1306 OLEDs) and **LVGL**, as well as direct support for ILI9341 SPI screens.
- **Input Devices**: Support for XPT2046 touch controllers and standard keypad matrices.
- **Sensors and Actuators**: Drivers for AS5048A (angle), BNO055 (IMU), VL53L0X (ToF), and various I2C/SPI peripherals.

## Development Workflow

Using paMcuLib typically involves setting up a project as a Git repository and using the `submodule_helper.json` configuration to pull in the necessary library components. This allows developers to include only the modules they need, keeping the firmware footprint optimized.

### Application Entry Point

Instead of writing code directly in the vendor-generated `main.c`, paMcuLib encourages a clean entry point pattern. Developers create a C++ entry function that initializes the unified drivers:

```cpp
#include "paMods/display/SSD1306/pa_oled.h"
#include "paCoreHead/paIIC.h"
#include "paCoreHead/paBase.h"

void mainAppEntry()
{
    _G_paIIC.init(0);
    OLED_Init(0);
    OLED_ShowString(0, 0, "paMcuLib Ready", 12);
    
    while (1)
    {
        _G_paBase.output("System Heartbeat");
        HAL_Delay(1000);
    }
}
```

## Ecosystem and Tooling

The project is highly dependent on its companion VSCode extensions to streamline the developer experience. **SubmoduleHelper** acts as a lightweight package manager, allowing users to select and auto-load specific modules (like a display driver or a sensor stack) into their project directory. **MacroDefineHelper** complements this by providing a GUI-like experience for managing preprocessor definitions, which is essential for tailoring the library to specific hardware pinouts and features without manually editing dozens of header files.
