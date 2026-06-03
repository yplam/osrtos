---
title: Ameba FreeRTOS Pro2 SDK
summary: The official software development kit for Realtek Ameba Pro2 series SoCs,
  featuring a FreeRTOS-based environment for IoT, video streaming, and AI-enabled
  applications. It provides comprehensive support for WLAN, Bluetooth, and specialized
  hardware scenarios like smart glasses.
slug: ameba-freertos-pro2-sdk
codeUrl: https://github.com/Ameba-AIoT/ameba-rtos-pro2
siteUrl: https://ameba-doc-rtos-pro2-sdk.readthedocs-hosted.com/en/latest/
star: 22
version: V1.0.3-aiglass.06
lastUpdated: '2025-12-18'
rtos: freertos
libraries:
- lwip
- warmcat-libwebsockets
topics:
- aiot
- camera
- embedded-systems
- freertos
- iot-video
- sdk
- wifi
isShow: false
createdAt: '2026-02-08'
updatedAt: '2026-02-08'
relatedProjects:
- ameba-rtos-sdk
- kendryte-k210-freertos-sdk
- esp8266-rtos-software-development-kit-sdk
- sony-spresense-sdk
- nuclei-software-development-kit-nuclei-sdk
- golioth-firmware-sdk
---

The Ameba FreeRTOS Pro2 SDK (ameba-rtos-pro2) is the primary software development platform for Realtek's high-performance Ameba Pro2 series microcontrollers. Built upon the FreeRTOS real-time operating system, this SDK is designed for developers building sophisticated IoT devices that require a balance of low power consumption and high-performance multimedia capabilities.

### Advanced Multimedia and AI Integration

A standout feature of the Ameba Pro2 platform is its focus on vision and AI applications. The SDK includes specialized scenarios, such as the "AI Glass" application, which demonstrates the platform's ability to handle high-resolution snapshots, video recording, and real-time AI processing. The repository contains specific drivers and example code for image sensors, video encoders, and WebSocket-based viewers, making it a robust choice for smart cameras, wearable technology, and edge AI devices.

### Connectivity and Networking

Connectivity is a core pillar of the Ameba ecosystem. The SDK provides a full networking stack, utilizing lwIP for robust TCP/IP communication, with extensive support for WLAN scenarios. Recent updates highlighted in the release notes show continuous optimization for DHCP stability, WiFi power-save modes, and seamless integration between wireless connectivity and application-specific tasks. Additionally, the SDK supports Bluetooth (BT) and Bluetooth Low Energy (BLE) functionality, including coexistence mechanisms and various profile examples for modern wireless peripherals.

### Comprehensive Development Environment

Realtek provides a well-defined path for getting started with the Ameba Pro2. The SDK supports both Windows (via MSYS2 and CMake) and Linux environments. It utilizes a modern GCC 10.3.0 toolchain and includes custom tools like the Pro2 PG Tool for firmware flashing and image management. The project structure is organized into components, projects, and tools, allowing developers to easily navigate between low-level hardware abstraction layers and high-level application logic.

### Security and Reliability

For professional-grade IoT deployments, the SDK incorporates essential features like Over-the-Air (OTA) updates and security enhancements. Mentions of TrustZone (TZ) support in the release notes indicate that the platform is capable of running secure workloads, protecting sensitive data such as private keys and secure boot processes. The inclusion of "tickless" power-saving modes further ensures that devices can operate efficiently in battery-powered environments, which is critical for mobile and wearable applications.

### Getting Started

Developers can begin by setting up their environment using the provided `setup.sh` or `setup.bat` scripts, which configure necessary Git hooks and environment variables. Detailed documentation is hosted online, covering everything from basic environment setup to complex application notes for specific hardware scenarios like AI-enabled smart glasses and video streaming servers.
