---
title: STM32F103 USB CDC CMSIS
summary: A lightweight firmware implementation for the STM32F1 series to provide Virtual
  COM Port (USB CDC) functionality using CMSIS. It offers a simple API for data transmission
  and reception, targeting STM32F103 microcontrollers without the overhead of heavy
  HAL libraries.
slug: stm32f103-usb-cdc-cmsis
codeUrl: https://github.com/saewave/STM32F103-USB-CDC-CMSIS
star: 73
lastUpdated: '2018-10-23'
rtos: cmsis
topics:
- cmsis
- firmware
- stm32
- stm32f1
- stm32f103
- usb
- usb-cdc
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- stm32f103-cmsis-libraries-and-projects
- usb-cdc-ecm-for-stm32f072
- stm32-usb-mass-storage-with-fatfs
- stm32f103-cmsis-peripheral-configuration
- minimal-mbed-os-template-for-stm32f103
- arm-mbed-os-blue-pill-usb-demo
---

## Overview

The STM32F103-USB-CDC-CMSIS project provides a streamlined, low-weight firmware solution for implementing a Virtual COM Port (VCP) on the STM32F1 series of microcontrollers. By leveraging the CMSIS (Cortex Microcontroller Software Interface Standard) rather than high-level abstraction layers like the STM32 HAL, this implementation offers a high-performance, small-footprint alternative for developers needing serial communication over USB.

The current implementation defaults to standard serial settings (115200 baud, 8-N-1), though these are easily configurable within the source code to meet specific application requirements.

## Key Features

- **Lightweight Implementation**: Minimal overhead compared to standard vendor-provided libraries.
- **Cross-Platform Compatibility**: Well-tested on Windows 7, macOS 10.13 (High Sierra), and Linux (Raspbian OS).
- **Simple Integration**: Requires only two core files (`usblib.c` and `usblib.h`) to be added to an existing project.
- **Driver Support**: Includes a dedicated Windows driver installation file (`RemoteSwitchHUB.inf`) to ensure the device is recognized correctly as a COM port.

## Technical Requirements

To ensure reliable USB communication, the project specifies several hardware and clock configuration requirements:
- **Clock Configuration**: The USB peripheral must be configured to a 48 MHz clock. The system RCC should be set to 48 MHz or higher, with 72 MHz being the recommended frequency for STM32F103 devices.
- **Hardware Interface**: It is strongly recommended to use a 1.5K GPIO-driven pull-up resistor on the USB D+ line. This allows the firmware to programmatically control the USB connection sequence and trigger host detection.

## Integration and API

The library is designed around a simple initialization and callback-based architecture. Developers interact with the library through a few primary functions and handlers:

### Initialization
Calling `USBLIB_Init();` enables the USB peripheral and configures the necessary registers. This function also triggers the USB RESET sequence.

### Event Handling
The library requires the implementation of two specific handlers in the user code to manage connection states and incoming data:

1.  **Line State Handler**: `void uUSBLIB_LineStateHandler(USBLIB_WByte LineState)`
    This allows the application to detect when a host has opened or closed the virtual serial port. Data transmission should only occur when the port is active.

2.  **Data Received Handler**: `void uUSBLIB_DataReceivedHandler(uint16_t *Data, uint16_t Length)`
    This function is called automatically whenever the host sends data to the microcontroller.

### Example Usage

Checking the line state before transmitting data is a critical step in the application logic:

```c 
if (LineState.L) {      // App connected to the virtual port
    USBLIB_Transmit((uint16_t *)"Welcome to the club!\r\n", 22);
}
```

## Build Environment

The project is provided as a Keil MDK uVision project, making it easy to compile and deploy using standard ARM development tools. It targets the popular STM32F103C8 "Blue Pill" style microcontrollers but can be adapted for other members of the STM32F1 family.
