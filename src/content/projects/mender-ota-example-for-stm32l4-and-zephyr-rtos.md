---
title: Mender OTA Example for STM32L4 and Zephyr RTOS
summary: A demonstration project showcasing over-the-air (OTA) update capabilities
  using the Mender MCU client on STM32L4 hardware. It utilizes the Zephyr RTOS and
  a W5500 Ethernet module to connect to Mender servers for firmware deployment, remote
  troubleshooting, and device management.
slug: mender-ota-example-for-stm32l4-and-zephyr-rtos
codeUrl: https://github.com/joelguittet/mender-stm32l4a6-zephyr-example
siteUrl: https://docs.mender.io
star: 10
lastUpdated: '2025-12-04'
rtos: zephyr
libraries:
- mcuboot
- littlefs
topics:
- mcu
- mender
- ota
- stm32
- zephyr
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- pelion-device-management-client-example-for-mbed-os
- raspberry-pi-pico-w-fota-example-application
- anjay-zephyr-client
- stm32f4-display-and-ethernet-example
- embedded-proto-mbed-os-to-server-example
- stm32h745-ethernet-with-lwip-and-freertos
---

## Overview

The mender-stm32l4a6-zephyr-example project is a comprehensive demonstration of how to implement robust over-the-air (OTA) update capabilities on resource-constrained microcontrollers. By combining the Mender MCU client with the Zephyr RTOS, this project provides a production-ready template for managing firmware lifecycles on STM32L4 hardware. It specifically targets the NUCLEO-L4A6ZG evaluation board paired with a W5500 Ethernet module, though the implementation is designed to be portable across different Zephyr-supported platforms.

## Key Features and Capabilities

This example goes beyond simple firmware swapping, incorporating several advanced features provided by the Mender ecosystem and Zephyr's modular architecture:

- **Robust OTA Updates**: Leverages MCUBoot for secure bootloading and atomic firmware swaps, ensuring the device remains bootable even if an update is interrupted.
- **Device Troubleshoot Add-on**: Enables a remote Zephyr shell directly within the Mender web interface, allowing developers to interact with the device's console over the network.
- **File Transfer**: Supports uploading and downloading files to and from the device's local file system (LittleFS), which is essential for managing configuration files or retrieving logs.
- **LLEXT Support**: Demonstrates the use of Zephyr's Linkable Loadable Extensions (LLEXT) to download and execute modular code artifacts without requiring a full system reboot.
- **Automatic Rollback**: Includes logic to detect failed connections or authentication errors after an update, triggering an automatic rollback to the previous known-good firmware version.

## Technical Architecture

The project is built on Zephyr RTOS v3.7.x and utilizes the standard Zephyr build system (`west`). The integration is divided into several logical components:

### Bootloader and Partitioning
MCUBoot is used as the primary bootloader. The flash memory is partitioned into a primary slot (`slot0`), a secondary slot (`slot1`) for receiving updates, and a storage partition for non-volatile settings (NVS). This dual-slot approach is critical for the "A/B" update strategy that Mender employs.

### Networking
Connectivity is handled via the W5500 Ethernet controller, integrated through Zephyr's native networking stack. The project uses DHCP for IPv4 addressing and establishes secure HTTPS connections to the Mender server using mbedTLS. This ensures that all communication, including artifact downloads and inventory reporting, is encrypted.

### Mender MCU Client
The core of the application is the Mender MCU client library. It manages the state machine for polling the server, handling deployments, and reporting inventory data such as hardware type and current firmware version.

## Getting Started

To use this project, developers need to configure their Mender Tenant Token in the `prj.conf` file. The build process involves two main steps: building and flashing the MCUBoot bootloader with specific device tree overlays, followed by building and signing the application firmware.

```bash
# Build the application
west build -b nucleo_l4a6zg path/to/mender-stm32l4a6-zephyr-example

# Flash the signed binary
west flash --hex-file build/zephyr/zephyr.signed.hex
```

Once running, the device will generate authentication keys and attempt to register with the Mender server. After the device is accepted in the Mender dashboard, users can create deployments using the `mender-artifact` tool to package signed Zephyr binaries into `.mender` files for distribution.

## Advanced Modular Updates with LLEXT

One of the most innovative aspects of this example is the support for LLEXT. This allows the system to download small, functional modules (like a 'hello-world' extension) and execute them dynamically. This is particularly useful for adding features or patches to a running system without the overhead of a full 512KB+ firmware update, significantly saving bandwidth and reducing downtime.
