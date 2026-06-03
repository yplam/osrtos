---
title: Spotflow Observability Device SDK
summary: A comprehensive device SDK for the Spotflow observability platform, primarily
  targeting Zephyr RTOS and ESP-IDF. It provides integrated logging backends, coredump
  collection, and cloud-synchronized configuration for embedded devices across various
  hardware platforms including ESP32, Nordic nRF, and NXP.
slug: spotflow-observability-device-sdk
codeUrl: https://github.com/spotflow-io/device-sdk
siteUrl: https://docs.spotflow.io/
star: 11
version: v0.7.0
lastUpdated: '2025-12-18'
rtos: zephyr
topics:
- embedded
- iot
- iot-device
- observability
- real-time
- rust
- spotflow
- zephyr
- zephyr-rtos
- zephyros
isShow: false
createdAt: '2026-01-12'
updatedAt: '2026-01-12'
relatedProjects:
- golioth-firmware-sdk
- golioth-zephyr-sdk
- infuse-iot-sdk
- zephyr-sdk
- iotconnect-azure-rtos-sdk
- ameba-rtos-sdk
---

The Spotflow Observability Device SDK is a powerful toolset designed for developers working with the Zephyr RTOS and ESP-IDF frameworks. It serves as a bridge between embedded hardware and the Spotflow observability platform, allowing for streamlined log management, error reporting, and remote device configuration.

The SDK is primarily distributed as a Zephyr module, making it easy to integrate into existing projects. Once added, it provides a dedicated logging backend that hooks directly into Zephyr's native logging subsystem. This means developers can use standard logging macros while the SDK handles the heavy lifting of encoding messages in CBOR and transmitting them via MQTT to the Spotflow platform. Currently, the backend utilizes MQTT QoS 0 for efficient data transmission.

## Key Features and Capabilities

One of the standout features of the SDK is its robust handling of device diagnostics. It includes a coredump backend that can extract and process crash data. To ensure that these coredumps can be accurately analyzed, the SDK implements a unique Build ID system. During the build process, a hash of the firmware image is computed and patched into the binary files (ELF, HEX, and BIN). This allows the Spotflow platform to precisely match a received coredump with the corresponding symbol files, significantly simplifying the debugging process for field-deployed devices.

Beyond monitoring, the SDK facilitates remote management through a cloud-synchronized configuration system. It uses an asynchronous "desired" and "reported" value mechanism over MQTT. For instance, a developer can change the minimal log severity level from the Spotflow portal; the SDK receives this "desired" state, applies it (persisting it via the Zephyr Settings subsystem if enabled), and then "reports" the new active state back to the cloud.

## Hardware and RTOS Support

The SDK supports a broad range of modern embedded hardware, including:
- **Espressif**: ESP32-C3, ESP32-C6, and ESP32-S3 DevKits
- **Nordic Semiconductor**: nRF7002DK
- **NXP**: FRDM-RW612
- **Infineon**: CY8CProto-062-4343W
- **Raspberry Pi**: Pico 2 W

It maintains compatibility with multiple versions of Zephyr (from 3.7.x up to 4.3.x) and the nRF Connect SDK, ensuring it fits into both bleeding-edge and stable long-term support environments. Recent updates have also introduced support for ESP-IDF v6.0.

## Getting Started

To get started, developers can integrate the SDK into their Zephyr workspace by adding it to their `west.yml` manifest:

```yaml
manifest:
    projects:
    - name: spotflow
      path: modules/lib/spotflow
      revision: main
      url: https://github.com/spotflow-io/device-sdk
```

Once integrated, most features are configurable via Kconfig, allowing for fine-tuned control over the SDK's behavior and resource usage. Developers can retrieve the unique build ID from their ELF files using the West tool to facilitate symbol matching during debugging sessions.
