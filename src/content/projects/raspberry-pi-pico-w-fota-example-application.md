---
title: Raspberry Pi Pico W FOTA Example Application
summary: A demonstration project for implementing secure Firmware Over-The-Air (FOTA)
  updates on the Raspberry Pi Pico W. It utilizes FreeRTOS and the lwIP stack to download
  encrypted firmware images from a TCP server and apply them using the pico_fota_bootloader.
slug: raspberry-pi-pico-w-fota-example-application
codeUrl: https://github.com/JZimnol/pico_fota_example
star: 10
lastUpdated: '2025-04-25'
rtos: freertos
libraries:
- lwip
topics:
- bootloader
- firmware-update-over-the-air
- fota
- ota
- ota-firmware-updates
- ota-update
- raspberry-pi-pico
- raspberry-pi-pico-w
- rp2040
- rp2040w
isShow: false
createdAt: '2026-02-26'
updatedAt: '2026-02-26'
---

## Overview

The `pico_fota_example` project provides a reference implementation for developers looking to add remote update capabilities to their Raspberry Pi Pico W applications. By leveraging the `pico_fota_bootloader`, this example demonstrates a secure path for delivering new firmware over a network connection without physical access to the device.

### System Architecture

The application is built on the FreeRTOS kernel, allowing it to manage multiple tasks concurrently. The system is split into two primary threads:

1.  **Main Application Thread**: This represents the user's actual logic, such as blinking an LED or processing sensor data.
2.  **Downloader Thread**: A background task that manages the Wi-Fi connection and periodically checks a remote TCP server for new firmware binaries.

This separation ensures that the device remains functional while a download is in progress, a critical requirement for robust IoT devices.

### Secure Update Mechanism

Security and reliability are core focuses of the underlying bootloader integration. The example supports several advanced features for firmware management:

- **Image Encryption**: Firmware images can be encrypted using AES, ensuring that the binary remains protected during transit across the network.
- **Integrity Verification**: The system uses SHA256 checksums to verify that the downloaded image is complete and hasn't been tampered with before attempting an update.
- **Atomic Swapping**: The bootloader handles the swapping of the current application with the new image in flash memory, providing a safe mechanism to ensure the device doesn't end up in an unbootable state.

### Network Integration

The project utilizes the Raspberry Pi Pico SDK's Wi-Fi architecture, specifically the `pico_cyw43_arch_lwip_sys_freertos` library. This integrates the lwIP (Lightweight IP) stack with FreeRTOS, providing a thread-safe environment for TCP/IP communication. The example includes a basic TCP client that communicates with a companion Python-based server script.

### Development Workflow

To facilitate testing, the repository includes a Python-based TCP server (`tcp_server.py`). This script acts as the host, serving the firmware binary to the Pico W. The update process follows a simple flow:

1.  The Pico W connects to the configured Wi-Fi network.
2.  The downloader thread establishes a TCP connection to the host.
3.  The user triggers the update on the server side.
4.  The Pico W receives the binary in chunks, verifies the hash, and signals the bootloader to perform the swap on the next reboot.

### Getting Started

Compilation is handled via CMake, requiring the Pico SDK and FreeRTOS Kernel. Users must provide Wi-Fi credentials and the host server's address during the configuration step:

```shell
cmake -DWIFI_SSID='<ssid>' -DWIFI_PASSWORD='<password>' -DHOST_ADDRESS='<address>' -DHOST_PORT='<port>' -DPFB_AES_KEY="<your_key_value>" ..
make -j
```

This example serves as a foundational template for building more complex, production-ready FOTA solutions on the RP2040 platform, showcasing how to bridge the gap between high-level networking and low-level bootloader operations.
