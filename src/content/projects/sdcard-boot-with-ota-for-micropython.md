---
title: SDCard Boot with OTA for MicroPython
summary: A MicroPython-based bootloader and OTA update system for ESP32 that uses
  an external SD card as the root filesystem. It minimizes internal flash wear and
  provides a robust update mechanism with hash matching and rollback capabilities.
slug: sdcard-boot-with-ota-for-micropython
codeUrl: https://github.com/Gurkengewuerz/micropython-sdcard-boot
star: 1
lastUpdated: '2022-12-27'
rtos: ''
libraries:
- micropython
- littlefs
topics:
- bootloader
- esp32
- littlefs
- micropython
- ota
isShow: false
createdAt: '2025-12-31'
updatedAt: '2025-12-31'
relatedProjects:
- yaota8266-ota-bootloader
- senko-ota-updater-for-micropython
- multi-firmware-esp
- stm32-bootloader
- esp32-ble-ota-arduino
- bleota-esp32-ota-updates-over-ble
---

# SDCard Boot with OTA for MicroPython

The `micropython-sdcard-boot` project addresses a common challenge in embedded development with MicroPython: the limited write cycles of internal flash memory. By redirecting the root directory to an external SD card, this project not only preserves the internal flash but also enables a sophisticated Over-The-Air (OTA) update system that would otherwise be risky or resource-intensive on internal storage.

## The Boot Sequence

The core of this project lies in a specialized `boot.py` script designed for the ESP32. Upon power-up, the ESP32 initializes the SD card using a 1-width SDIO interface (Slot 2). The script performs several critical checks:

1.  **Filesystem Verification**: It checks the SD card for a valid filesystem.
2.  **Auto-Initialization**: If an unknown or uninitialized filesystem is found, the SD card is automatically formatted (defaulting to FAT, though LittleFS is recommended for certain use cases).
3.  **Root Redirection**: Once initialized, the internal root directory is unmounted, and the SD card is mounted as the new root (`/`).
4.  **Application Execution**: The system executes `main.py` from the newly mounted SD card root.

This approach ensures that all application logic and data logging occur on the removable storage, keeping the internal flash static and safe from wear.

## Robust OTA Updates

The OTA implementation is designed for reliability, drawing inspiration from existing tools like `uota` but adding layers of robustness such as hash matching and failure recovery. The update workflow follows a strict sequence to prevent bricking the device:

1.  **Cleanup**: Any remnants of previous failed updates are removed to ensure a clean state.
2.  **Version Check**: The system downloads a `versions` file from a user-defined web server to identify the latest firmware and its SHA1 hash.
3.  **Staging**: A new folder structure (defaulting to `/next`) is created to hold the incoming update.
4.  **Download and Unpack**: The firmware is downloaded as a `.tar` file and unpacked into the staging area.
5.  **Atomic Swap**: The old application folder (`/app`) is deleted, and the `/next` folder is moved to `/app` to finalize the update.

Files outside the `/app` directory are replaced only if they have changed, minimizing the risk of corruption during the update process. Note that the bootloader (`boot.py`) itself is not updated via OTA to ensure the device remains bootable even if an update fails.

## Recovery and Development

To facilitate development and provide a safety net, the project includes a hardware-based override. By pulling Pin 18 to GND during boot, the system bypasses the normal boot sequence and enters the REPL. In this mode, the SD card is mounted to `/sd` rather than root, allowing developers to browse files and debug without the application automatically starting. This is particularly useful for reflashing the internal `boot.py` or fixing configuration errors.

## Server-Side Configuration

Updates are managed via a simple CSV-based versioning system on a standard web server. The `versions` file tracks releases using semantic versioning, filenames, and SHA1 hashes:

```csv
0.0.1;0_0_1-firmware.tar;2988860ca0858eca16a795399148fca95b649784
```

Firmware packages are created using standard tar commands, making it easy to integrate into existing CI/CD pipelines:

```bash
tar -cvf 0_0_1-firmware.tar app/ main.py
```

This project is an excellent solution for IoT devices that require frequent updates or high-volume data logging while maintaining the long-term reliability of the ESP32 hardware.
