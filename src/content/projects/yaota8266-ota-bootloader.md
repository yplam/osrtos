---
title: yaota8266 OTA Bootloader
summary: An in-place over-the-air (OTA) update solution for the ESP8266 WiFi SoC designed
  for large firmwares on small flash devices. It features a dual-stage bootloader
  architecture with RSA-signed UDP updates, eliminating the need for redundant flash
  partitions.
slug: yaota8266-ota-bootloader
codeUrl: https://github.com/pfalcon/yaota8266
star: 121
lastUpdated: '2017-03-02'
rtos: ''
libraries:
- lwip
- micropython
topics:
- bootloader
- esp8266
- lwip
- ota
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- multi-firmware-esp
- raspberry-pi-pico-w-and-pico-2-w-fota-bootloader
- bleota-esp32-ota-updates-over-ble
- sdcard-boot-with-ota-for-micropython
- esp32repartition
- raspberry-pi-pico-w-fota-example-application
---

## Overview

yaota8266 (Yet Another OTA for ESP8266) is a specialized bootloader and over-the-air update framework designed specifically for the ESP8266 WiFi SoC. Unlike standard OTA implementations that require a "ping-pong" or A/B partition scheme—effectively halving the available FlashROM for the application—yaota8266 performs updates in-place. This approach is particularly beneficial for resource-constrained environments where large firmwares, such as MicroPython, need to reside on devices with limited flash memory (e.g., 1MB modules).

## The In-Place Update Philosophy

The core innovation of yaota8266 is its departure from the safety-first, double-space requirement of traditional OTA solutions. In a typical setup, a 1MB flash chip can only host a 512KB application because the other 512KB must be reserved for the incoming update. yaota8266 allows a 512KB+ application to occupy the flash and updates it by overwriting the existing firmware. While this means there is no fallback if an update is interrupted, the project operates on the principle that a failed update can simply be retried until it succeeds, which is often an acceptable trade-off for maximizing usable storage.

## System Architecture

The project is divided into three distinct components that work in tandem to manage the device lifecycle:

### 1. boot8266 (2nd-Stage Bootloader)
This is a tiny bootloader (fitting within a single 4K sector) loaded by the ESP8266's internal BootROM. Its primary responsibilities are:
- **Mode Selection**: It checks for a physical button press or verifies the application checksum. If the button is pressed or the checksum fails (indicating a corrupted firmware), it enters OTA mode.
- **Application Loading**: Depending on the state, it either loads the `ota-server` or the main user application. It handles the recursive loading of ESP8266 application structures similarly to the hardware BootROM.

### 2. ota-server
When the device enters OTA mode, it runs this specialized application. The server listens for UDP datagrams on port 8266. To ensure security, every chunk of the incoming firmware must be signed with an RSA private key. The `ota-server` verifies these signatures using a pre-configured public key before flashing the data to the user application region.

### 3. ota-client
This is a host-side Python tool used by the developer to drive the update process. It communicates with the device in OTA mode, sending the firmware chunks and managing the transmission flow.

## Technical Configuration

Configuration is handled via a `config.h` file. Developers can define critical parameters such as:
- **MAIN_APP_OFFSET**: The flash memory address where the user application begins.
- **RSA Modulus**: The public key modulus used for signature verification, ensuring that only authorized users can update the device.
- **GPIO Configuration**: Settings for the "OTA button," including which pin to monitor and how long to wait for a state change.
- **Timeouts**: Parameters like `IDLE_REBOOT_MS` prevent the device from being stuck in OTA mode indefinitely if an update is accidentally triggered.

## Use Cases

yaota8266 is ideal for developers working with MicroPython or other large frameworks on ESP-01 or ESP-12 modules with limited flash. By allowing the filesystem and the binary to occupy nearly the entire flash chip, it enables sophisticated IoT applications that would otherwise be impossible to update remotely.
