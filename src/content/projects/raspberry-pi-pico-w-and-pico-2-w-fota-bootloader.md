---
title: Raspberry Pi Pico W and Pico 2 W FOTA Bootloader
summary: A secure Firmware Over The Air (FOTA) bootloader designed for the Raspberry
  Pi Pico W and Pico 2 W. It features SHA256 integrity verification, AES-256 image
  encryption, and an automatic rollback mechanism to ensure safe and reliable remote
  firmware updates on RP2040 and RP2350 platforms.
slug: raspberry-pi-pico-w-and-pico-2-w-fota-bootloader
codeUrl: https://github.com/JZimnol/pico_fota_bootloader
star: 87
version: v3.0
lastUpdated: '2025-11-30'
rtos: cmsis
topics:
- bootloader
- firmware-update-over-the-air
- fota
- ota
- ota-firmware-updates
- ota-update
- raspberry-pi-pico
- raspberry-pi-pico-2w
- raspberry-pi-pico-w
- rp2040
- rp2040w
- rp2350
- rp2350w
isShow: false
createdAt: '2026-02-26'
updatedAt: '2026-02-26'
---

## Overview

The `pico_fota_bootloader` is a specialized solution for implementing secure Firmware Over The Air (FOTA) updates on the Raspberry Pi Pico W and the newer Pico 2 W. As IoT devices often reside in inaccessible locations, the ability to update firmware remotely and securely is critical. This project provides the necessary bootloader logic, linker scripts, and Python utilities to manage the entire update lifecycle on RP2040 and RP2350 microcontrollers.

## Flash Memory Architecture

The bootloader establishes a structured memory layout within the flash to manage dual-slot updates. The flash is divided into several segments:
- **Bootloader (36k)**: Resides at the start of flash.
- **Info Headers**: Small slots for application headers, download headers, and state flags (e.g., Is Download Slot Valid, Should Rollback).
- **Application Slot**: The primary location where the active firmware runs.
- **Download Slot**: A secondary area where new firmware images are staged before being swapped.
- **Filesystem Block**: An optional reserved area at the end of the flash for persistent data storage.

## Security and Integrity Features

Security is a core focus of this bootloader. It implements two primary layers of protection for firmware images:

- **SHA256 Verification**: Every FOTA image is appended with a SHA256 hash. The bootloader uses the `pfb_firmware_sha256_check` function to verify that the downloaded binary is intact and has not been corrupted during transmission.
- **AES Encryption**: To protect intellectual property and prevent unauthorized firmware execution, images can be encrypted using the AES ECB algorithm. Both the bootloader and the application must share the same 32-byte key, which is configured during the build process via CMake.

## Reliability and Rollback Mechanism

One of the most important features for remote updates is the rollback mechanism. If a newly updated firmware fails to boot or crashes before it can "commit" itself, the bootloader detects this on the next reboot. It will then automatically swap the firmware back to the previous known-working version. This prevents "bricking" devices in the field due to faulty updates.

## Technical Implementation

The project integrates seamlessly with the `pico-sdk` (version 2.2.0 or higher). It provides a library, `pico_fota_bootloader_lib`, which applications link against to interact with the bootloader state. The build system uses CMake to automate the generation of FOTA-ready binaries, including the necessary encryption and hashing steps performed by Python scripts.

### Application Integration Example

Developers integrate the FOTA logic into their main application loop. The following snippet demonstrates how an application might handle a firmware update:

```c
#include <pico_fota_bootloader/core.h>

int main() {
    // Check if we just recovered from a failed update
    if (pfb_is_after_rollback()) {
        // Handle rollback event
    }

    // Commit the current firmware to prevent rollback on next boot
    pfb_firmware_commit();

    // Prepare the download slot for a new update
    pfb_initialize_download_slot();

    // Write received data chunks to flash
    pfb_write_to_flash_aligned_256_bytes(buffer, offset, length);

    // Verify the image and mark it as ready
    if (pfb_firmware_sha256_check(total_size) == 0) {
        pfb_mark_download_slot_as_valid();
        pfb_perform_update(); // Reboots and swaps firmware
    }
}
```

## Hardware Support

The bootloader is compatible with both the original Raspberry Pi Pico W (RP2040) and the Pico 2 W (RP2350). It includes specific linker scripts (`app2040.ld`, `app2350.ld`, etc.) to ensure that the application code is correctly positioned in memory relative to the bootloader and the download slots.
