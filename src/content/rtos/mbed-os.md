---
title: mbed OS
slug: mbed-os
summary: Arm Mbed OS is an open-source real-time operating system specifically designed
  for IoT applications on Arm Cortex-M microcontrollers. It provides a comprehensive
  platform integrating a deterministic RTOS kernel, multi-layered security foundations,
  and extensive connectivity stacks for wireless and wired networking.
codeUrl: https://github.com/ARMmbed/mbed-os
siteUrl: https://www.mbed.com/
star: 4836
version: mbed-os-6.17.0
lastUpdated: '2024-10-08'
components:
- Network
- Wireless
- Cryptography
- FileSystem
- Storage
- IPv6
- TCP
- UDP
- TLS/SSL
- DTLS
- DNS
- DHCP
- CoAP
- WiFi
- Bluetooth
- BLE
- LoRa
- LoRaWAN
- Cellular
- LTE-M
- NB-IoT
- USBDevice
- CAN
- Shell
- Profiling
- OTA
- SecureBoot
- TrustZone
- PKI
- MemoryEncryption
- 6LoWPAN
- Thread
platforms:
- ARM
- ARM Cortex-M
licenses:
- Apache-2.0
libraries:
- Keil RTX
- Mbed TLS
- Nanostack
- lwIP
- Cordio
- LittleFS
createdAt: '2024-10-08'
updatedAt: '2026-04-07'
---

### Features


- Deterministic multithreaded execution via the integrated Keil RTX kernel.

- Dual-profile support including a Full Profile for RTOS features and a Bare Metal Profile for constrained devices.

- Native integration of Mbed TLS and Mbed Crypto for secure communication and storage.

- Comprehensive connectivity support including Wi-Fi, Bluetooth Low Energy (BLE), LoRaWAN, and Cellular (LTE-M, NB-IoT).

- Support for Wi-SUN mesh networking via the integrated Nanostack.

- Standardized C++ API for peripheral access including GPIO, ADC, I2C, SPI, PWM, and CAN.

- Built-in storage management with support for FAT and LittleFS file systems.

- Cloud management services integration for device provisioning and updates.

- Advanced power management features including tickless sleep and automated sleep/deep-sleep transitions.

- Support for Arm TrustZone for hardware-enforced security isolation.

- Integrated bootloader support and Over-the-Air (OTA) update capabilities.

- Extensive hardware abstraction layer (HAL) for porting across diverse Cortex-M vendors.

- Built-in error handling with overridable weak symbols for production-ready failure management.

- Support for multiple toolchains including Arm Compiler 6, GCC ARM, and IAR.

- Comprehensive testing framework (Greentea) and unit testing support.



### Architecture

Arm Mbed OS follows a layered architectural design optimized for Arm Cortex-M microcontrollers. At its core, the **Full Profile** utilizes the Keil RTX kernel, a deterministic real-time operating system that provides multithreading, semaphores, mutexes, and other RTOS primitives. For highly constrained devices, Mbed OS offers a **Bare Metal Profile** which excludes the RTX kernel to minimize memory footprint, focusing on a single-threaded event-loop model. 

The architecture is structured into several distinct layers: the Hardware Abstraction Layer (HAL) provides a consistent interface to vendor-specific peripherals; the Core OS layer manages the RTOS kernel and system services; the Middleware layer includes comprehensive stacks for connectivity (IP, BLE, LoRaWAN, Wi-SUN) and security (Mbed TLS); and the Application API layer provides a standardized C++ interface for developers. This modularity allows developers to include only the components necessary for their specific application, optimizing for both performance and power consumption.

#### Core Components
- **RTOS Kernel**: Based on CMSIS-RTOS2 (Keil RTX) for thread management and synchronization.
- **Connectivity Stacks**: Native support for IPv4/IPv6, WiFi, Bluetooth Low Energy, LoRaWAN, and Cellular.
- **Security Foundations**: Integrated Mbed TLS for cryptography and secure communication, with support for Arm TrustZone.
- **Storage & FileSystems**: Support for LittleFS (optimized for wear leveling) and FATFileSystem.
- **Power Management**: Automated sleep management and tickless RTOS mode to maximize battery life.

### Use Cases

This RTOS is ideal for:

- **Smart Street Lighting**: Managing city-wide lighting platforms with industry-standard control nodes and NEMA socket integration.
- **Smart City Bike Lights**: Utilizing accelerometers and low-power wireless to monitor road conditions and cyclist safety.
- **Industrial Asset Monitoring**: Deploying multi-sensor devices for air quality, motion, and cellular-based remote monitoring.
- **Agricultural IoT**: Implementing LoRaWAN-based sensor networks for long-range, low-power soil and climate monitoring.
- **Smart Home Appliances**: Providing secure, Wi-Fi connected interfaces for domestic devices and energy management systems.
- **Wearable Health Monitors**: Leveraging BLE and advanced power management for long-lasting, secure medical telemetry.

### Getting Started

Developers can begin by choosing between three primary development environments: **Keil Studio Cloud** for a zero-installation web-based IDE, **Mbed Studio** for a dedicated desktop experience with integrated debugging, or **Mbed CLI** for command-line flexibility and automation. The official documentation at [os.mbed.com/docs](https://os.mbed.com/docs) provides comprehensive Doxygen-generated API references, step-by-step tutorials, and detailed porting guides for custom hardware. 

Note: Arm has announced an End of Life (EOL) timeline for Mbed OS, with the project and its associated websites scheduled for archiving in July 2026. Developers starting new projects should consider the long-term maintenance implications and review the official announcement on the Mbed blog.
