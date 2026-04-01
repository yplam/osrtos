---
title: ESP32 U2F Security Key
summary: This project transforms ESP32-S2 and ESP32-S3 microcontrollers into hardware
  security tokens supporting FIDO2/U2F, OpenPGP, PIV, and OATH protocols. It leverages
  the ESP-IDF framework, FreeRTOS, and the LittleFS file system to provide a secure
  authentication solution using native USB-OTG capabilities.
slug: esp32-u2f-security-key
codeUrl: https://github.com/jocover/esp32_u2f
version: v1.0.3
lastUpdated: '2024-06-28'
licenses:
- GPL-3.0
rtos: freertos
libraries:
- littlefs
topics:
- esp32
- esp32s2
- esp32s3
- fido2
- openpgp
- passkeys
- u2f
isShow: false
createdAt: '2026-03-31T23:28:24+00:00'
updatedAt: '2026-03-31T23:28:24+00:00'
---

Hardware security keys are a cornerstone of modern multi-factor authentication (MFA), providing a physical layer of protection against phishing and unauthorized access. The esp32_u2f project brings this capability to the versatile and affordable ESP32 platform, specifically targeting chips with native USB-OTG support like the ESP32-S2 and ESP32-S3. By utilizing this project, developers can turn standard development boards into functional security tokens.

## Multi-Protocol Authentication

While the project name emphasizes U2F (Universal 2nd Factor), the implementation is actually a multi-protocol hardware security token. It supports several industry standards including:

*   **FIDO2/U2F**: For web-based authentication and passwordless login.
*   **OpenPGP**: For email encryption and digital signatures.
*   **PIV (Personal Identity Verification)**: For smart card-based authentication.
*   **OATH (Open Authentication)**: For generating TOTP and HOTP one-time passwords.

## Technical Architecture

The firmware is built on the Espressif IoT Development Framework (ESP-IDF) version 5.0. It relies heavily on the ESP32's internal hardware features and several key software components to maintain security and functionality. 

At its core, the project uses the TinyUSB stack to handle USB HID (Human Interface Device) communication, allowing the ESP32 to identify itself to a host computer as a security key. For data persistence, it incorporates the LittleFS file system, which is optimized for wear leveling on SPI flash memory—a critical feature for storing cryptographic keys and counters that are frequently updated.

Security is handled through a combination of mbedtls for standard cryptographic operations and a custom cryptographic suite designed for key management. The project also utilizes the ESP32's eFuse and partition table management to ensure that sensitive data is stored and accessed correctly.

## Hardware Requirements and Setup

To use this project, you need an ESP32 board that supports USB-OTG. The ESP32-S2 and ESP32-S3 are the primary targets because they possess the native USB peripheral required to emulate a security token without needing external USB-to-Serial converters for the main communication path.

Flashing the device requires `esptool`. It is important to note that using `erase_flash` will result in the loss of all stored cryptographic keys, so users should be cautious when performing maintenance. The project provides specific memory addresses for the bootloader, partition table, and the main application binary to ensure the device is configured correctly for the custom partition layout.

```bash
# Example flash command for ESP32-S3
esptool --chip esp32s3 write_flash --flash_mode dio --flash_size 2MB --flash_freq 80m 0x0 bootloader/bootloader.bin 0x8000 partition_table/partition-table.bin 0x10000 esp32_u2f.bin
```

## Configuration and Customization

The project uses a custom partition table (`u2f_partitions.csv`) and specific SDK configurations to optimize the environment for security tasks. For instance, the main task stack size is increased to handle cryptographic operations, and the product string is customized to "U2F Token" to be easily identifiable by the operating system when plugged in. This level of low-level control via `sdkconfig.defaults` ensures that the hardware performs reliably as a dedicated security peripheral.
