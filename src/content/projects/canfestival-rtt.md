---
title: CanFestival-RTT
summary: A port of the CanFestival CANopen protocol stack for the RT-Thread operating
  system. It provides a complete framework for CANopen communication, including a
  DS402 master implementation for controlling servo motors using RT-Thread's native
  CAN and hardware timer drivers.
codeUrl: https://github.com/wdfk-prog/canfestival-rtt
siteUrl: https://github.com/wdfk-prog/canfestival-rtt
isShow: false
rtos: rt-thread
libraries: []
topics:
- canfestival
- canopen
- rt-thread
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- uc-modbus-for-rt-thread
- mbed-os-maxon-epos4-motor-controller-driver
- micro-ros-for-rt-thread
- simple-open-ethercat-master-library-rtnet-version
- c-common-for-rt-thread
- rt-rosserial-for-rt-thread
---

CanFestival-RTT brings the power of the CanFestival CANopen protocol stack to the RT-Thread ecosystem. As a fork of the CanFestival-3 project, this package is designed to be a "plug-and-play" solution for developers needing robust CANopen functionality on RT-Thread-supported hardware. By leveraging RT-Thread's native driver interfaces, it provides a standardized way to implement CANopen master or slave nodes across various MCU architectures.

### Core Integration and Architecture

The integration is built upon RT-Thread's standard driver model. Specifically, it utilizes the **CAN driver** for bus communication and the **hwtimer (hardware timer) driver** for the precise timing required by the CANopen protocol (such as SYNC messages and heartbeat monitoring). This design ensures that the stack can run on any hardware platform that provides these two drivers within the RT-Thread environment.

The project structure is organized to separate the core protocol logic from the RT-Thread specific porting layer:
- **inc/ & src/**: Contain the core CanFestival protocol stack files.
- **src/can_rtthread.c & src/timer_rtthread.c**: The porting layer that bridges the stack with RT-Thread's device drivers.
- **master402/**: A specialized implementation of the CiA 402 profile for motion control.
- **tool/objdictgen/**: A Python-based tool for generating C code from CANopen Object Dictionary files (.od).

### Enhanced DS402 Motion Control

One of the most significant additions in this repository is the enhanced **Master402** implementation. Designed for controlling servo motors, it includes several improvements over the base CanFestival examples:
- **Expanded Motion Modes**: Support for Profile Position (PP), Profile Velocity (PV), and Homing (HM) modes.
- **Improved Communication Efficiency**: Non-frequent variables are moved to PDO (Process Data Object) transmission to reduce bus load.
- **Robustness**: The implementation includes logic to handle communication exceptions such as node offline events, power loss, bus disconnection, or short circuits, allowing the system to recover communication automatically.
- **Command Line Support**: Integration with the RT-Thread FinSH shell allows users to check NMT states and control motor movement directly from the console.

### Getting Started with CanFestival-RTT

To use this package, developers can select it through the RT-Thread package manager (`menuconfig`). The configuration allows for fine-tuning the system behavior:

```text
RT-Thread online packages
    miscellaneous packages --->
        [*] CanFestival: A free software CANopen framework
```

Within the configuration menu, you must specify the device names for your CAN controller and hardware timer (e.g., `can1` and `timer1`). You can also set the priority levels for the CAN receive thread and the timer thread to ensure they meet your application's real-time requirements.

### Object Dictionary Generation

The project includes an updated version of `objdictgen`. This tool is essential for defining the communication objects, SDOs, and PDOs for your specific CANopen nodes. The version provided here includes updated DS402 configuration files that are more comprehensive than the original source, facilitating easier integration with modern industrial servo drives.
