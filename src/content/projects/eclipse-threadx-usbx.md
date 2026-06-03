---
title: Eclipse ThreadX USBX
summary: A high-performance USB host, device, and on-the-go (OTG) stack fully integrated
  with the Eclipse ThreadX RTOS. It provides a small-footprint solution for deeply
  embedded applications requiring USB connectivity across various hardware architectures
  including ARM Cortex-M, Renesas, and NXP microcontrollers.
slug: eclipse-threadx-usbx
codeUrl: https://github.com/eclipse-threadx/usbx
siteUrl: https://projects.eclipse.org/projects/iot.threadx
star: 208
version: v6.4.3.202503_rel
lastUpdated: '2025-10-02'
rtos: threadx
libraries:
- filex
topics:
- eclipse-threadx
- embedded
- iot
- mcu
- microcontroller
- rtos
- usb
- usb-hid
- usb-host
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- eclipse-threadx-filex
- eclipse-threadx-netx-duo
- eclipse-threadx-iot-devkit-starter-application
- x-cube-azrtos-h7-azure-rtos-software-expansion
- x-cube-azrtos-g4-azure-rtos-software-expansion-for-stm32cube
- x-cube-azrtos-f7-azure-rtos-software-expansion-for-stm32cube
---

## High-Performance USB Connectivity for Embedded Systems

Eclipse ThreadX USBX is a comprehensive USB stack designed specifically for deeply embedded applications. As part of the Eclipse ThreadX RTOS ecosystem, USBX provides a high-performance, small-footprint solution for implementing USB Host, USB Device, and USB On-The-Go (OTG) functionality. Its tight integration with the ThreadX kernel ensures efficient multitasking and resource management, making it an ideal choice for resource-constrained microcontrollers.

## Versatile USB Support

USBX is architected to handle the complexities of the USB protocol while remaining accessible to embedded developers. It supports a wide range of USB classes and configurations:

- **USB Host Support**: Allows the embedded system to act as a host, connecting to peripherals like mass storage devices (using FileX), keyboards, mice, and printers.
- **USB Device Support**: Enables the system to function as a USB peripheral, such as a HID device, communications class (CDC), or mass storage device.
- **USB OTG**: Provides the flexibility for a device to switch roles between host and peripheral dynamically.

## Seamless Integration and Ecosystem

One of the primary strengths of USBX is its place within the broader Eclipse ThreadX suite. It is designed to work out-of-the-box with other components:

- **ThreadX RTOS**: Provides the underlying scheduling and synchronization primitives.
- **FileX**: Integrates with USBX Host Mass Storage class to provide FAT-compatible file system access on USB drives.
- **NetX Duo**: Can be used in conjunction with USB network classes (like CDC-ECM or RNDIS) to provide TCP/IP connectivity over USB.

## Hardware Portability and Vendor Support

USBX is highly portable and supports a vast array of processor architectures and USB controllers. It has been integrated into the SDKs of major semiconductor manufacturers, including STMicroelectronics, NXP, Renesas, and Microchip. The repository includes a `ports` directory containing architecture-specific and compiler-specific files, ensuring that developers can leverage hardware-accelerated USB features on platforms like ARM Cortex-M, RISC-V, and others.

## Technical Architecture and Usage

The project follows a modular structure that separates core logic from hardware-specific implementations. The `common` directory contains the stack's core logic, while the `ports` directory handles the interface between the stack and the specific USB controller hardware. 

To use USBX, developers typically define their required features and configurations in a `ux_user.h` header file. This allows for fine-tuning the stack's memory usage and feature set to match the specific requirements of the application. The build system is based on CMake, supporting modern development workflows and easy integration into existing projects via `add_subdirectory()`.

## Getting Started

For developers looking to implement USB functionality, the repository provides sample codes and clear documentation. The typical workflow involves:
1. Building the ThreadX library as a dependency.
2. Configuring USBX via `ux_user.h` (using `ux_user_sample.h` as a template).
3. Linking the USBX library with the application code and the appropriate hardware port.

With its focus on performance and reliability, Eclipse ThreadX USBX continues to be a cornerstone for developers building sophisticated USB-enabled embedded devices.
