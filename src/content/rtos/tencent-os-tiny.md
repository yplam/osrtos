---
title: TencentOS-tiny
slug: tencent-os-tiny
summary: TobudOS (formerly TencentOS Tiny) is a highly tailorable, open-source real-time
  operating system designed specifically for resource-constrained IoT terminal devices.
  It features a compact micro-kernel with a minimal footprint, advanced low-power
  management, and integrated connectivity stacks for seamless cloud integration.
codeUrl: https://github.com/Tencent/TencentOS-tiny
siteUrl: https://cloud.tencent.com/product/tos-tiny
star: 5970
version: v2.5.0
lastUpdated: '2024-02-02'
components:
- MQTT
- CoAP
- TLS/SSL
- DTLS
- LoRaWAN
- NB-IoT
- Shell
- OTA
- Cryptography
- Network
- Wireless
platforms:
- ARM Cortex-M
- STM32
createdAt: '2024-02-02'
updatedAt: '2026-03-03'
---

### Features


- Highly tailorable micro-kernel architecture allowing for minimal resource footprints.

- Advanced low-power management framework designed specifically for battery-operated IoT terminals.

- Modular system design enabling flexible selection of components based on application needs.

- Integrated support for mainstream IoT communication protocols including MQTT and CoAP.

- Built-in security stacks providing TLS/SSL and DTLS for encrypted data transmission.

- Native support for Low Power Wide Area Network (LPWAN) technologies like LoRaWAN and NB-IoT.

- Fast porting layer for rapid deployment across various MCU architectures, specifically STM32.

- Deterministic task scheduling and inter-process communication mechanisms.

- Small RAM and Flash requirements suitable for memory-constrained devices.

- Support for cloud platform connectivity to streamline device-to-cloud integration.

- Configurable kernel components to optimize system size for specific hardware.

- Open-source governance under the OpenAtom Foundation ensuring community-driven development.



### Architecture

TobudOS utilizes a modular micro-kernel architecture designed for scalability and efficiency. The kernel is the core of the system, providing essential RTOS services such as task management, memory management, time management, and inter-task communication (semaphores, mutexes, queues). Its design emphasizes a "tiny" footprint, allowing it to run on devices with as little as 2KB RAM and 8KB Flash. The architecture is strictly layered to separate the hardware abstraction, the core kernel, and the high-level middleware components.

Above the kernel, TobudOS provides a middleware layer that includes connectivity stacks (TCP/IP, 6LoWPAN), IoT protocols (MQTT, CoAP), and security modules. This layered approach allows developers to strip away unnecessary components, ensuring that the final binary only contains the required functionality for the target hardware. The system also includes a dedicated low-power framework that coordinates between the kernel scheduler and hardware power modes to maximize battery life.

#### Core Components
- **Kernel**: Task scheduling, IPC, and memory management.
- **Connectivity**: Support for WiFi, Bluetooth, LoRaWAN, and NB-IoT.
- **Protocols**: MQTT, CoAP, LwM2M.
- **Security**: TLS/SSL, DTLS, and hardware-accelerated encryption support.
- **HAL**: Hardware Abstraction Layer for easy porting to different MCUs.

### Use Cases

This RTOS is ideal for:

- **Smart Home**: Powering low-power sensors, smart locks, and environmental monitors that require long battery life and cloud connectivity.
- **Industrial IoT**: Implementing reliable monitoring systems in factories using LoRaWAN or NB-IoT for long-range data transmission.
- **Wearable Devices**: Managing resource-constrained hardware in fitness trackers or health monitors where memory and power are at a premium.
- **Smart Agriculture**: Deploying remote sensor nodes for soil moisture and weather tracking using LPWAN technologies.
- **Asset Tracking**: Building GPS/Cellular trackers that utilize the low-power modes of TobudOS to extend operational cycles.

### Getting Started

To begin developing with TobudOS, developers should migrate to the new official repository hosted at AtomGit (https://atomgit.com/tobudos). The project provides comprehensive porting guides for the STM32 series and other mainstream MCUs. Developers can start by configuring the kernel via the `tos_config.h` file to enable or disable specific features and components. The repository includes various sample projects demonstrating how to connect to cloud platforms and utilize the integrated protocol stacks. For legacy support, the original TencentOS Tiny documentation remains a valid reference for the core kernel APIs.
