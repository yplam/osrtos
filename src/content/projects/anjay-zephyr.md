---
title: Anjay-zephyr
summary: Anjay-zephyr is a library module that integrates the Anjay LwM2M client into
  the Zephyr RTOS. It enables IoT devices to communicate using the LwM2M protocol,
  supporting features like firmware updates, IPSO objects, and various network bearers
  including LTE and OpenThread.
codeUrl: https://github.com/AVSystem/Anjay-zephyr
siteUrl: https://avsystem.github.io/Anjay-doc/
isShow: false
rtos: zephyr
libraries:
- open-thread
topics:
- lwm2m
- lwm2m-client
- zephyr
- iot
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- anjay-zephyr-client
- pelion-device-management-client-example-for-mbed-os
- golioth-zephyr-sdk
- zephyr-coaps-client-with-tinydtls
- openthread-rtos
- pyrinas-zephyr
---

Anjay-zephyr is a specialized module designed to bring the power of the Anjay LwM2M (Lightweight Machine-to-Machine) library to the Zephyr RTOS ecosystem. Developed by AVSystem, this integration allows developers to build robust, standards-compliant IoT applications that benefit from LwM2M's device management capabilities, including remote configuration, monitoring, and over-the-air firmware updates.

### Bridging Anjay and Zephyr
At its core, Anjay-zephyr acts as a compatibility layer. While the base Anjay library is designed to be portable, this repository provides the specific glue code necessary to run it seamlessly on Zephyr. This includes implementations for networking (`net_impl.c`), threading (`threading_compat.c`), and time management (`time_compat.c`), all mapped to Zephyr's native APIs. By leveraging Zephyr's unified networking stack, Anjay-zephyr can support a wide array of communication technologies, from traditional Wi-Fi and Ethernet to cellular LTE-M/NB-IoT and Thread.

### Feature-Rich LwM2M Implementation
The project goes beyond simple connectivity by providing ready-to-use implementations for various LwM2M and IPSO (Internet Protocol for Smart Objects) objects. Developers can quickly integrate hardware features such as:
- **Sensors and Actuators**: Support for light control, buzzers, push buttons, and generic sensors.
- **Location Services**: Integration with GPS/GNSS modules, including specific support for the Nordic nRF9160 and Sony CXD5605.
- **Firmware Updates (FOTA)**: A robust firmware update mechanism that integrates with Zephyr's bootloaders and flash management, with advanced support for multi-image updates on nRF91 series devices.
- **Connection Monitoring**: Objects for tracking signal strength, link quality, and network bearer details.

### Hardware and Network Versatility
One of the strengths of Anjay-zephyr is its broad hardware support. The repository contains specific network drivers and optimizations for:
- **Nordic Semiconductor**: nRF9160 (LTE) and nRF700x (Wi-Fi).
- **Espressif**: ESP32 Wi-Fi integration.
- **OpenThread**: Support for low-power mesh networking via the `open-thread` library.
- **STMicroelectronics**: Support for B-L475E-IOT01A (esWiFi).

### Getting Started
To use Anjay-zephyr, it is typically included as a module in a Zephyr project's `west.yml` manifest. Configuration is handled through Zephyr's Kconfig system, allowing developers to toggle features like persistence, shell integration, and specific IPSO objects without modifying the source code. For those looking for a complete reference implementation, the [Anjay Zephyr Client](https://github.com/AVSystem/Anjay-zephyr-client) repository provides a full application example that demonstrates how to initialize the stack and connect to an LwM2M Server like Coiote IoT Device Management.

### Advanced Capabilities
For industrial-grade deployments, Anjay-zephyr supports factory provisioning and persistence. This ensures that device credentials and configurations survive power cycles and can be securely injected during the manufacturing process. The inclusion of a Zephyr shell interface also makes it easier for developers to debug LwM2M registrations and object states directly from a serial console.
