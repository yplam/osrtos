---
title: Pelion Device Management Client Example for Mbed OS
summary: A reference implementation of the Pelion Device Management Client for Mbed
  OS devices. It provides core IoT functionalities including secure developer provisioning,
  remote firmware updates, and multi-interface connectivity support for Ethernet,
  Wi-Fi, and Cellular networks.
slug: pelion-device-management-client-example-for-mbed-os
codeUrl: https://github.com/ARMmbed/mbed-os-example-pelion
siteUrl: https://www.pelion.com/docs/device-management/current/connecting/mbed-os.html
star: 14
version: v1.4.0
lastUpdated: '2021-12-01'
rtos: mbed-os
libraries:
- lwip
- littlefs
topics:
- lwm2m
- lwm2m-client
- mbed-os
- pelion
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- mbed-os-client-example
- mbed-to-aws-iot-example
- mender-ota-example-for-stm32l4-and-zephyr-rtos
- mbed-bootloader
- anjay-zephyr-client
- anjay-zephyr
---

## Overview

The Pelion Device Management Client example for Mbed OS serves as a foundational template for connecting embedded devices to the Pelion IoT ecosystem. This project demonstrates how to integrate the Device Management Client library with Mbed OS to enable secure communication, lifecycle management, and remote updates. While a more advanced multi-OS version exists, this specific repository is optimized for Mbed OS, offering a streamlined path for developers to get their hardware connected and manageable via the cloud.

## Key Features

The example application focuses on the essential pillars of IoT device management:
- **Developer Mode Provisioning**: Simplifies the initial setup by using developer certificates to authenticate devices with the Pelion portal.
- **Firmware Updates**: Implements a robust update mechanism, allowing for remote over-the-air (OTA) updates of the device firmware.
- **Connectivity Flexibility**: Supports a wide array of networking interfaces including Ethernet, Wi-Fi (via ESP8266, ESP32, or ISM43362), and Cellular (via various modems).
- **Storage Abstraction**: Demonstrates how to store credentials and firmware candidates using internal flash or external storage like SD cards and QSPI flash.

## Supported Hardware

The project maintains a comprehensive list of supported Mbed-Enabled boards. Some of the verified platforms include:
- **NXP**: K64F and K66F (using internal flash for storage).
- **STMicroelectronics**: Various NUCLEO and DISCO boards (F429ZI, L475VG, H743ZI2, etc.).
- **Cypress**: CY8CPROTO-062-4343W and CYTFM_064B0S2_4343W.
- **Nuvoton**: NUMAKER_IOT_M487 and PFM_NUC472.
- **Renesas**: GR_LYCHEE and RZ_A1H.

## Technical Implementation

The application architecture is designed around the `mbed_app.json` configuration file, which manages target-specific overrides for connectivity and storage. It utilizes the Mbed OS KVStore for secure credential management and the ARM Update Client for handling firmware image downloads and validation.

### Storage Configuration
Developers can choose between two primary storage strategies for credentials:
1. **TDB_INTERNAL**: Allocates a section of the MCU's internal flash for the Key-Value store.
2. **FILESYSTEM**: Uses an external block device (like an SD card or SPI flash) with a filesystem like LittleFS to manage data.

### Program Flow
Upon startup, the application initializes the network interface and registers the device with the Pelion Device Management service. Users can interact with the running device via a serial terminal (115200 baud) to:
- Simulate button presses to trigger cloud events.
- Print the unique endpoint name.
- Unregister the device.
- Reset storage and reboot the device to generate a new identity.

## Getting Started

To use this example, you need the Mbed CLI (version 1.10.0 or higher) and a Pelion Device Management account. The general workflow involves:
1. Importing the repository and its dependencies.
2. Downloading a developer certificate (`mbed_cloud_dev_credentials.c`) from the Pelion portal.
3. Initializing the update environment using the `manifest-dev-tool`.
4. Compiling the project for your specific target board.

```bash
mbed import mbed-os-example-pelion
cd mbed-os-example-pelion
mbed target <YOUR_TARGET>
mbed toolchain GCC_ARM
mbed compile
```

For firmware updates, a bootloader is required. The project includes a `bootloader` directory with pre-configured settings and binaries for several popular boards, ensuring that the update client can safely swap the active application with a new candidate image.
