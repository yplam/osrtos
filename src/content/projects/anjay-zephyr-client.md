---
title: Anjay Zephyr Client
summary: Anjay-zephyr-client is a collection of LwM2M client samples based on the
  Anjay Zephyr Module and Zephyr RTOS. It demonstrates how to implement LwM2M functionality,
  including sensor reporting, FOTA updates, and GPS tracking across various hardware
  platforms like nRF9160 and ESP32.
codeUrl: https://github.com/AVSystem/Anjay-zephyr-client
siteUrl: https://iotdevzone.avsystem.com/docs/Anjay_integrations/Getting_started/
isShow: false
rtos: zephyr
libraries:
- tensorflow-micro
topics:
- iot
- lwm2m
- lwm2m-client
- embedded
- zephyr
- zephyr-rtos
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- anjay-zephyr
- zephyr-lorawan-lora-examples
- mender-ota-example-for-stm32l4-and-zephyr-rtos
- pelion-device-management-client-example-for-mbed-os
- zephyr-rtos-for-dwm1001
- zephyr-coaps-client-with-tinydtls
---

Anjay-zephyr-client is a comprehensive repository designed to bridge the gap between the Lightweight Machine to Machine (LwM2M) protocol and the Zephyr RTOS ecosystem. Maintained by AVSystem, it provides a suite of sample applications that utilize the [Anjay Zephyr Module](https://github.com/AVSystem/Anjay-zephyr) to enable IoT devices with robust management capabilities, including firmware updates, sensor data reporting, and remote configuration.

### A Versatile Range of Examples

The repository is organized into several distinct projects, each catering to different use cases and complexity levels:

*   **Demo Application**: This is the flagship showcase, implementing all features and sensors available on supported boards. It includes experimental support for Anjay 3's factory provisioning and Firmware Over-the-Air (FOTA) updates.
*   **Minimal Client**: A stripped-down version designed to serve as a clean slate for developers building specific custom applications. It is compatible with a wide range of targets, including the `qemu_x86` emulator for rapid testing.
*   **Edge Impulse Demo (ei_demo)**: This specialized example integrates a motion recognition model built with Edge Impulse. It demonstrates how TinyML can be combined with LwM2M to report high-level inferences (like movement patterns) to a cloud server.
*   **Bubblemaker**: An interactive and creative example that integrates water meters, pumps, and various sensors. It serves as a practical reference for industrial-style monitoring and control via LwM2M.

### Extensive Hardware Support

One of the project's greatest strengths is its broad hardware compatibility. Out of the box, it supports a variety of popular development kits, including:

*   **Nordic Semiconductor**: nRF9160 DK, nRF9151 DK, Thingy:91, nRF7002 DK, and nRF52840 DK.
*   **STMicroelectronics**: B-L475E-IOT01A Discovery kit.
*   **Espressif**: ESP32-DevKitC.
*   **Arduino**: Nano 33 BLE Sense Lite.
*   **T-Mobile**: DevEdge IoT Developer Kit.

### Advanced Features for Cellular IoT

For developers working with the nRF91 series, the project includes deep integration for cellular-specific features. It supports GPS implementation with configurable priority modes, allowing the device to temporarily prioritize GPS acquisition over LTE idle mode to ensure a fix is obtained. It also supports Assisted GPS (A-GPS) via Nordic Location Services, which can significantly reduce the time-to-first-fix by downloading satellite data over the LwM2M connection.

### Getting Started with West

As a Zephyr-based project, it relies on the `west` meta-tool for dependency management. To get started, users typically initialize a Zephyr workspace and then configure the manifest to point to the Anjay client repository:

```bash
west config manifest.path Anjay-zephyr-client/demo
west config manifest.file west-nrf.yml
west update
```

This workflow ensures that all necessary modules, including the Anjay LwM2M library itself and the required hardware abstraction layers, are correctly pulled and synchronized.

### Connectivity and Management

While the samples are designed to be compliant with any LwM2M 1.0 TS server, they are pre-configured for easy integration with AVSystem's Coiote IoT Device Management platform. This allows developers to quickly visualize sensor data, manage device lifecycles, and perform secure firmware updates through a unified web interface.
