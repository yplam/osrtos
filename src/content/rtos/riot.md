---
title: RIOT
slug: riot
summary: RIOT is a modular, open-source real-time operating system specifically engineered
  for the Internet of Things (IoT), supporting a wide range of 8-bit, 16-bit, and
  32-bit microcontrollers. It features a micro-kernel architecture with a preemptive,
  tickless scheduler and provides a uniform API with partial POSIX compliance to simplify
  cross-platform development and code reuse.
codeUrl: https://github.com/RIOT-OS/RIOT
siteUrl: http://riot-os.org/
star: 5684
version: '2026.01'
lastUpdated: '2026-02-23'
components:
- FileSystem
- Network
- Wireless
- Storage
- Cryptography
- IPv6
- TCP
- UDP
- DTLS
- MQTT
- CoAP
- LwM2M
- Bluetooth
- BLE
- 6LoWPAN
- LoRaWAN
- CAN
- OTA
- USBDevice
- Shell
- Bootloader
platforms:
- ARM
- ARM Cortex-M
- ARM7
- RISC-V
- Xtensa
- AVR
- MSP430
- Linux
- Native
- POSIX
licenses:
- LGPL-2.1
libraries:
- lwIP
- NimBLE
- paho-mqtt
- CCN-Lite
- MicroPython
- WebAssembly
createdAt: '2025-12-24'
updatedAt: '2026-02-24'
---

### Features


- Supports over 200 boards across architectures including ARM Cortex-M, RISC-V, ESP32, AVR, and MSP430.

- Implements a preemptive, tickless scheduler with priority-based and optional round-robin scheduling.

- Provides a native port allowing RIOT applications to run as processes on Linux and BSD for simulation and testing.

- Includes a comprehensive network stack supporting IPv6, 6LoWPAN, UDP, TCP, and RPL (storing and P2P modes).

- Supports standard IoT application protocols such as CoAP, MQTT, MQTT-SN, and LwM2M.

- Offers wireless connectivity for Bluetooth Low Energy (BLE), LoRaWAN, IEEE 802.15.4, and UWB.

- Features a PSA-compliant Cryptographic API and security protocols like DTLS and EDHOC.

- Enables secure over-the-air (OTA) updates following the SUIT standard.

- Supports high-level programming in C, C++, and Rust with standard embedded interfaces.

- Integrates dynamic runtimes including MicroPython, elm (JavaScript), and WebAssembly (WASM).

- Provides a Memory Technology Device (MTD) abstraction layer for flash and EEPROM management.

- Includes extensive device drivers for SPI, I2C, UART, USB, CAN, and various sensors/actuators.

- Implements partial POSIX compliance to facilitate code portability from desktop environments.

- Supports industrial communication protocols including CAN and Ethernet (including USB-Ethernet).

- Features a modular build system that allows including only necessary components to minimize memory footprint.

- Provides high-resolution, long-term timers for precise event handling and energy-efficient sleep modes.

- Supports IPv4 networking through integration with the lwIP stack.

- Includes a shell with support for custom command handlers for interactive debugging and system control.



### Architecture

RIOT is built upon a micro-kernel architecture designed for robustness, real-time capabilities, and extreme energy efficiency. Unlike traditional monolithic kernels, RIOT's micro-kernel provides only the essential services—such as thread management, inter-process communication (IPC), and scheduling—while other system services like network stacks and file systems run as separate modules. This modularity allows developers to include only the specific components required for their application, significantly reducing the memory footprint on constrained devices.

The system utilizes a preemptive, tickless scheduler. This design ensures that the system only wakes up when an event occurs or a timer expires, maximizing the time spent in low-power sleep modes. RIOT provides a uniform API across all supported hardware platforms, including partial POSIX compliance. This abstraction layer allows developers to write hardware-independent code, facilitating easy porting between different microcontrollers or even running the same code on a Linux/BSD host via the "native" port.

#### Core Components
- **Kernel**: Handles multi-threading, priorities, and IPC.
- **Network Stack (GNRC)**: A modular IPv6-centric network stack.
- **VFS/MTD**: Virtual File System and Memory Technology Device layers for storage abstraction.
- **Device Drivers**: Unified peripheral drivers (SAUL) for sensors and actuators.
- **Security**: Integrated PSA Cryptographic API and SUIT-compliant OTA update system.

### Use Cases

This RTOS is ideal for:

- **Smart Agriculture**: Monitoring soil moisture and environmental conditions using LoRaWAN or 6LoWPAN sensors with long battery life.
- **Industrial IoT (IIoT)**: Implementing CAN-based communication and real-time control in factory automation and automotive applications.
- **Smart Home**: Developing interconnected devices using Thread, BLE, or Matter that require secure, low-power communication.
- **Wearable Devices**: Powering health monitors and fitness trackers that utilize high-resolution timers and energy-efficient scheduling.
- **Network Research**: Probing and testing new IoT protocols and network architectures using the highly modular GNRC stack.
- **Asset Tracking**: Utilizing GNSS drivers and low-power wireless protocols for long-term tracking of goods and equipment.

### Getting Started

To begin developing with RIOT, the recommended approach is to clone the repository directly from GitHub: `git clone https://github.com/RIOT-OS/RIOT`. Developers can immediately test the environment by building the "hello-world" example for the `native` board, which allows RIOT to run as a standard process on Linux or macOS. Simply navigate to `examples/basic/hello-world` and run `make term`. 

For hardware-specific development, RIOT supports a wide array of toolchains, including GCC for ARM, RISC-V, and AVR. The project provides a comprehensive [Getting Started Guide](https://guide.riot-os.org/) and [API Documentation](https://api.riot-os.org/) to assist with installation, board selection, and application development. For those new to the system, the [RIOT Online Course](https://github.com/RIOT-OS/riot-course) offers structured lessons covering kernel basics, networking, and security.
