---
title: Mbed Bootloader
summary: A generic, secure bootloader designed for Mbed OS and the Pelion Device Management
  Client. It manages firmware updates through a metadata header interface, supporting
  multi-slot candidate storage on internal flash or external block devices while providing
  Root of Trust integration.
slug: mbed-bootloader
codeUrl: https://github.com/PelionIoT/mbed-bootloader
siteUrl: https://os.mbed.com/docs/v5.10/tutorials/bootloader.html#arm-mbed-os-managed-bootloader
star: 57
version: v4.1.3
lastUpdated: '2020-08-26'
rtos: mbed-os
libraries:
- littlefs
topics:
- bootloader
- embeded
- firmware-updates
- mbed-os
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- pelion-device-management-client-example-for-mbed-os
- mcuboot-for-stm32
- stm32-bootloader
- multi-firmware-esp
- tock-bootloader
- raspberry-pi-pico-w-and-pico-2-w-fota-bootloader
---

## Overview

The Mbed Bootloader is a generic, highly configurable bootloader designed to work in tandem with the Pelion Device Management Client. It serves as the primary gateway for firmware updates in Mbed OS-based IoT devices, ensuring that new application images are validated, ordered, and correctly applied to the system. By providing a standardized interface for firmware metadata and storage, it allows developers to implement robust Over-the-Air (OTA) update capabilities across a wide range of ARM Cortex-M microcontrollers.

## The Metadata Header Interface

At the core of the bootloader's operation is the metadata header. Every firmware stage in the boot sequence—excluding the root bootloader itself—is paired with a header containing critical information such as the firmware version, image size, and cryptographic hashes. This header acts as the update interface, allowing the bootloader to verify the integrity and authenticity of a candidate image before attempting a flash operation.

There are two primary header formats supported:
- **Internal Header**: Used for firmware stored on the device's internal flash.
- **External Header**: Used for firmware stored on external, potentially insecure storage (like SD cards). This format includes additional security information to prevent tampering with the header data while it resides outside the MCU.

## Firmware Storage and Management

The bootloader supports flexible storage configurations for firmware candidates. Depending on the hardware design, developers can choose to store update images on internal flash or external block devices using the `ARM_UCP_FLASHIAP` or `ARM_UCP_FLASHIAP_BLOCKDEVICE` macros. 

The system supports multiple storage slots, allowing the device to hold several firmware candidates simultaneously. The bootloader automatically handles the alignment requirements for flash erase boundaries and page boundaries, ensuring that the update process is compatible with the underlying hardware's physical constraints.

## Security and Root of Trust

Security is a fundamental aspect of the Mbed Bootloader. It utilizes a device secret key to authenticate any firmware stored on external storage. This key is derived from a device-specific Root of Trust (RoT). The bootloader can integrate with Mbed OS's KVStore feature to manage the RoT, where a random number is generated during the first boot and stored securely in internal flash. Alternatively, developers can implement a custom hardware-specific RoT by providing a specialized implementation of the `mbed_cloud_client_get_rot_128bit` function.

## Configuration and Build System

Building the bootloader requires the `mbed-cli` toolchain. Configuration is primarily handled through `mbed_app.json`, where developers define critical memory offsets such as:
- `update-client.application-details`: The address of the active firmware's metadata header.
- `mbed-bootloader.application-start-address`: The start of the application binary.
- `update-client.storage-address`: The location for firmware candidate storage.

Because the bootloader is often size-constrained, it includes options to disable serial output or progress bars to reduce the final binary footprint on headless or resource-limited devices.

## Flash Layout and Alignment

The bootloader dictates a specific flash layout to ensure reliable updates. A typical layout includes the bootloader at the start of flash (address 0), followed by the active application metadata header, and then the application itself. The bootloader also accounts for the ARM architecture's Vector Table Size Boundary, ensuring the application's entry point is correctly aligned to the next power of two of the vector table size. This attention to detail prevents common boot failures associated with improper memory alignment in ARM Cortex-M systems.
