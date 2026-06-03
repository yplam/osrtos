---
title: uC/Modbus for RT-Thread
summary: A port of the Silicon Labs uC/Modbus stack for the RT-Thread RTOS. It provides
  a comprehensive implementation of the Modbus industrial communication protocol,
  supporting both Master and Slave modes across RTU and ASCII formats. The package
  leverages the uC/OS-III compatibility layer to integrate seamlessly with RT-Thread
  environments.
slug: uc-modbus-for-rt-thread
codeUrl: https://github.com/mysterywolf/uC-Modbus-for-RT-Thread
siteUrl: https://doc.micrium.com/pages/viewpage.action?pageId=10753125
star: 6
lastUpdated: '2021-11-01'
rtos: rt-thread
topics:
- modbus
- rt-thread
- uc-modbus
- ucos-iii
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- c-common-for-rt-thread
- modbus-tcp-for-stm32f407
- rt-rosserial-for-rt-thread
- canfestival-rtt
- micro-ros-for-rt-thread
- c-os-iii-compatibility-layer-for-rt-thread
---

uC/Modbus for RT-Thread is a specialized port of the robust uC/Modbus stack, originally developed by Micrium (now Silicon Labs), specifically tailored for the RT-Thread real-time operating system. Modbus remains one of the most widely used industrial communication protocols, and this package brings its full suite of capabilities to the RT-Thread community.

The implementation provides a flexible solution for connecting industrial electronic devices. It supports both Modbus Master and Slave configurations, allowing an RT-Thread-based device to either control a network of sensors and actuators or act as a data provider for a PLC or SCADA system.

## Key Features and Protocol Support

The stack is highly configurable and supports the two primary Modbus transmission modes:
- **Modbus RTU**: The standard binary representation used over RS-485 or RS-232.
- **Modbus ASCII**: A human-readable format often used in specific legacy environments.

Beyond basic data types, the library includes support for floating-point registers, which is essential for modern industrial applications involving complex sensor data. It implements a wide range of standard Modbus Function Codes (FC), including:
- Coils and Discrete Inputs (FC01, FC02, FC05, FC15)
- Holding and Input Registers (FC03, FC04, FC06, FC16)
- Diagnostics (FC08)

## RT-Thread Integration and Architecture

One of the most interesting technical aspects of this port is its reliance on the uC/OS-III compatibility layer for RT-Thread. Because the original uC/Modbus stack was designed to run on Micrium's uC/OS-III kernel, this port utilizes a wrapper that maps uC/OS-III API calls to RT-Thread primitives. This approach ensures the core protocol logic remains identical to the certified Micrium version while running natively within the RT-Thread environment.

The system is designed to be resource-efficient. Users can configure the priority and stack size of the Modbus receive task through the `mb_cfg.h` file or via the RT-Thread configuration menu (menuconfig). This ensures that the communication stack does not interfere with other critical real-time tasks on the system.

## Configuration and Build System

The project integrates deeply with the RT-Thread build system using `SConscript` files. This allows developers to enable the package easily within their projects using the RT-Thread Env tool. The `mb_cfg.h` file serves as the central point for tailoring the stack to specific hardware requirements, such as:
- Defining the maximum number of Modbus channels.
- Setting the internal buffer sizes.
- Enabling or disabling specific function codes to save memory.
- Configuring the floating-point start address.

For developers looking to implement reliable industrial communications on RT-Thread, this package offers a battle-tested protocol stack with the flexibility of an open-source RTOS. It bridges the gap between legacy industrial standards and modern embedded development practices.
