---
title: NimBLE
slug: nimble
summary: Apache NimBLE is a feature-complete, open-source Bluetooth Low Energy (BLE)
  5.4 stack comprising both Host and Controller layers. Designed for resource-constrained
  embedded systems, it serves as a portable alternative to proprietary stacks, supporting
  advanced features like Bluetooth Mesh, multi-role concurrency, and high-density
  connection management.
codeUrl: https://github.com/apache/mynewt-nimble
siteUrl: http://mynewt.apache.org/latest/network/docs/index.html
star: 859
version: nimble_1_9_0_tag
lastUpdated: '2026-03-18'
components:
- Wireless
- Bluetooth
- BLE
- Shell
- Cryptography
- Network
platforms:
- ARM
- ARM Cortex-M
- Xtensa
- RISC-V
- POSIX
- Native
- Simulator
licenses:
- Apache-2.0
libraryType: Wireless
createdAt: '2025-12-20'
updatedAt: '2026-03-22'
---

### Features


- Full Bluetooth 5.4 specification compliance for both Host and Controller layers.

- Support for Data Length Extension (DLE) enabling up to 251-byte packet sizes.

- Concurrent operation of Broadcaster, Observer, Peripheral, and Central roles.

- Scalable connection management supporting up to 32 simultaneous connections.

- Security Manager Protocol (SMP) with support for Legacy and Secure Connections (SC).

- Support for Advertising Extensions (AE) for increased data capacity in advertisements.

- Support for Periodic Advertising for synchronized data broadcasting.

- Physical layer support for 2M PHY and Coded PHY (Long Range) communications.

- Integrated Bluetooth Mesh subsystem for many-to-many device networking.

- NimBLE Porting Layer (NPL) for integration with various RTOS environments like FreeRTOS and RIOT.

- Flexible Host-Controller Interface (HCI) implementation for standard interfacing.

- Multiple transport options including UART, emSPI, and shared RAM for combined builds.

- Comprehensive implementation of L2CAP, ATT, GAP, and GATT protocols.

- Low-level radio drivers for Nordic nRF51, nRF52, nRF5340, and Renesas DA1469x.

- Support for Nordic UART / Serial Port Emulation service (bleuart).

- Privacy features including support for Resolvable Private Addresses (RPA).



### Architecture

Apache NimBLE is architected as a modular Bluetooth Low Energy stack, strictly separating the **Controller** (Link Layer) from the **Host** layer. This separation allows for flexible deployments where the Host and Controller can run on the same MCU (using shared RAM transport) or on separate processors (using UART or SPI via HCI). The Controller manages real-time radio timing, hardware-specific transceiver drivers, and the Link Layer state machine, while the Host implements high-level protocols including L2CAP, the Attribute Protocol (ATT), and the Security Manager (SM).

A critical architectural component is the **NimBLE Porting Layer (NPL)**. The NPL provides a set of OS-agnostic primitives for tasks, mutexes, semaphores, and callouts. This abstraction layer is what enables NimBLE to be highly portable, allowing it to function as the default BLE stack for Apache Mynewt while also being integrated into external ecosystems like the Espressif ESP-IDF, RIOT OS, and the Open IOT SDK.

#### Core Components
- **Controller**: Includes the Link Layer (LL) and hardware-specific drivers for Nordic and Renesas radios.
- **Host**: Implements GAP, GATT, ATT, L2CAP, and the Security Manager.
- **Mesh**: A complete Bluetooth Mesh implementation integrated into the Host subsystem.
- **Transport**: Provides HCI implementations over various physical and virtual interfaces.
- **NPL**: The abstraction layer facilitating portability across different operating systems.

### Use Cases

This library is ideal for:

- **Industrial Mesh Networking**: Deploying large-scale, many-to-many device networks for industrial automation or smart lighting using the integrated Mesh subsystem.
- **High-Density Sensor Hubs**: Creating central devices that must maintain up to 32 simultaneous connections with peripheral sensors.
- **Long-Range IoT**: Utilizing Coded PHY support to extend the range of BLE communications in outdoor or obstructed environments.
- **Secure Wearables**: Implementing secure bonding and encrypted communications for consumer electronics using LE Secure Connections.
- **Cross-Platform Development**: Projects that require a consistent BLE API across different hardware architectures and RTOS environments.
- **HCI Controller Emulation**: Turning a supported SoC into a dedicated BLE controller for use with a Linux-based host running BlueZ.

### Getting Started

To get started with NimBLE, it is recommended to use the **Newt** build tool provided by the Apache Mynewt project. Developers can begin by exploring the `apps/` directory within the repository, which contains several reference applications. For example, `bleprph` provides a template for a basic peripheral, while `btshell` offers a command-line interface to exercise the stack's full functionality. 

For integration into non-Mynewt projects, developers should refer to the `porting/` directory, which contains NPL implementations for various environments. Detailed documentation, including API references for GAP, GATT, and Mesh, is available through the [Apache Mynewt documentation portal](https://mynewt.apache.org/documentation/). Community support is primarily handled via the Apache Mynewt developer mailing list and Slack channel.
