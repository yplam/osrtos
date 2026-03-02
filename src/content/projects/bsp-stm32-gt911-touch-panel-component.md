---
title: BSP STM32-GT911 Touch Panel Component
summary: A hardware abstraction and driver for the GT911 capacitive touch screen controller,
  designed for the STM32Cube ecosystem. It provides a standardized API for touch detection,
  multi-touch support, and gesture recognition on STM32-based embedded systems.
slug: bsp-stm32-gt911-touch-panel-component
codeUrl: https://github.com/STMicroelectronics/stm32-gt911
star: 15
version: v1.0.1
lastUpdated: '2024-04-26'
rtos: cmsis
topics:
- bsp
- bsp-component
- stm32
- stm32cube-mcu-component
- touch
- touchpanel
- touchscreen
isShow: false
createdAt: '2026-03-02'
updatedAt: '2026-03-02'
---

## Overview

The **stm32-gt911** MCU component is a specialized driver for the Goodix GT911 capacitive touch controller, integrated into the STMicroelectronics STM32Cube software platform. As a standalone component, it provides a portable and modular way to add touch interface capabilities to STM32-based projects without requiring the entire monolithic MCU package.

The GT911 is a widely used touch IC in the embedded industry, known for its responsiveness and support for advanced features like multi-touch and gesture detection. This driver abstracts the underlying I2C communication and register-level logic into a high-level C API that is consistent with the STM32 Board Support Package (BSP) architecture.

## Key Features

- **Multi-Touch Support**: Capable of tracking up to five simultaneous touch points, providing coordinates, pressure (weight), and unique track IDs for each point.
- **Gesture Recognition**: Built-in support for detecting common gestures such as swipes (up, down, left, right) and double taps.
- **Hardware Abstraction**: Uses a function-pointer-based IO structure, allowing the driver to be used with any STM32 series by providing the appropriate I2C read/write implementations.
- **Configurable Triggering**: Supports multiple interrupt modes, including rising edge, falling edge, and level-based triggers for touch detection.
- **Flexible Configuration**: Build-time options for screen dimensions, auto-calibration, and refresh rates via a template configuration header.

## Technical Architecture

The driver is split into two primary layers to ensure maintainability and portability:

### 1. Register Layer (`gt911_reg.c` / `gt911_reg.h`)
This layer handles the low-level interaction with the GT911 hardware. It defines the register map, bitmasks, and basic read/write primitives. It uses a context structure (`gt911_ctx_t`) that holds the hardware handle and the IO functions, ensuring the core logic remains independent of the specific MCU peripheral implementation.

### 2. Component Layer (`gt911.c` / `gt911.h`)
This layer provides the public API used by the application or the BSP board driver. It manages device initialization, state polling, and coordinate conversion. It utilizes the `GT911_Object_t` to maintain the state of the touch controller instance.

## Integration and Usage

To integrate the GT911 driver, developers must define the Bus IO operations. This typically involves mapping the driver's read and write requirements to the STM32 HAL I2C APIs. 

```c
/* Example of the Multi-Touch State structure */
typedef struct
{
  uint32_t  TouchDetected;
  uint32_t  TouchX[GT911_MAX_NB_TOUCH];
  uint32_t  TouchY[GT911_MAX_NB_TOUCH];
  uint32_t  TouchWeight[GT911_MAX_NB_TOUCH];
  uint32_t  TouchTrackID[GT911_MAX_NB_TOUCH];
} GT911_MultiTouch_State_t;
```

Once the IO is registered using `GT911_RegisterBusIO`, the device can be initialized. The application can then either poll the touch state using `GT911_GetState` or `GT911_GetMultiTouchState`, or configure the system to respond to hardware interrupts for more power-efficient operation.

## STM32Cube Ecosystem

As an STM32Cube MCU component, this repository follows the standard STMicroelectronics release model. It is designed to be compatible with CMSIS modules and the STM32 HAL/LL drivers. This modularity allows developers to select only the necessary components for their specific hardware, reducing code footprint and simplifying version management across different projects.
