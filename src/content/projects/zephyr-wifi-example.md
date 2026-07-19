---
title: Zephyr WiFi Example
summary: A cross-platform Zephyr RTOS application demonstrating WiFi connectivity,
  DHCP, DNS resolution, and HTTP GET requests. It provides reference implementations
  and build configurations for ESP32-S3, ESP32-C3, Raspberry Pi Pico W, and Nordic
  nRF7002 hardware.
slug: zephyr-wifi-example
codeUrl: https://github.com/craigpeacock/Zephyr_WiFi
star: 48
lastUpdated: '2025-08-16'
rtos: zephyr
topics:
- esp32c3
- esp32s3
- nrf7002
- raspberry-pico-w
- wifi
- zephyr
- zephyr-rtos
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- zephyr-wi-fi-and-tcp-udp-connection-demo
- zephyr-lorawan-lora-examples
- network-provisioning-for-zephyr-rtos
- anjay-zephyr-client
- pico-zephyr-project
- mbed-os-client-example
---

## Overview

The Zephyr WiFi Example project serves as a practical demonstration of the Zephyr RTOS networking stack's portability. By leveraging Zephyr's hardware abstraction layer, this project provides a unified codebase that can connect to wireless networks across diverse architectures, including Xtensa (ESP32-S3), RISC-V (ESP32-C3/C6), ARM Cortex-M0+ (Raspberry Pi Pico W), and ARM Cortex-M33 (Nordic nRF7002).

The application follows a standard network initialization sequence: it connects to a specified WiFi SSID, obtains an IPv4 address via DHCP, performs ICMP pings to verify connectivity, resolves hostnames using DNS, and finally executes an HTTP GET request to retrieve a text file from a remote server.

## Key Features and Functionality

This project showcases several core components of the Zephyr networking subsystem:

- **WiFi Management**: Utilizes the L2 WiFi management API to handle scanning and association.
- **IP Stack**: Implements both IPv4 and IPv6 support, including DHCPv4 for automatic address assignment.
- **DNS Resolver**: Demonstrates hostname resolution for both address families.
- **HTTP Client**: Uses the high-level HTTP client library to perform web requests.
- **Cross-Platform Support**: Includes specific configurations and build instructions for multiple popular development boards.

## Technical Implementation

The project's behavior is primarily defined through its `prj.conf` file, which enables the necessary Zephyr modules. Key configurations include `CONFIG_WIFI`, `CONFIG_NET_L2_WIFI_MGMT`, and `CONFIG_HTTP_CLIENT`. For RISC-V targets like the ESP32-C3, the project highlights the importance of memory management, specifically requiring `CONFIG_HEAP_MEM_POOL_SIZE` to be sufficiently large (e.g., 32768) to prevent runtime driver allocation failures.

### Example Execution Flow

When the system boots, the console output provides a detailed look at the network stack initialization:

```
*** Booting Zephyr OS build v4.2.0 ***
WiFi Example
Board: esp32s3_devkitc
Connecting to SSID: test_ap
Connected
SSID: test_ap
Band: 2.4GHz
Channel: 9
Security: WPA2-PSK
RSSI: -68
IPv4 address: 192.168.0.152
Ready...
Reply from 8.8.8.8: bytes=28 time=25ms TTL=116

Looking up IP addresses:
IPv4: 66.39.146.38
IPv6: 2607:f440::4227:9226
Connecting to HTTP Server:
Connecting to 66.39.146.38:80 Success
HTTP/1.1 200 OK
```

## Hardware and Build Considerations

Building for different targets requires specific toolchain considerations and binary blobs. For Espressif chips, the `west blobs fetch hal_espressif` command is essential to obtain the necessary WiFi and Bluetooth binary libraries. For the Raspberry Pi Pico W, the project utilizes the Infineon CYW43439 driver via `hal_infineon`.

The project also addresses specific nuances of newer hardware, such as the Nordic nRF7002. It notes that newer versions of the nRF Connect SDK may require specific delays or configuration flags like `CONFIG_NEWLIB_LIBC` and `CONFIG_ENTROPY_GENERATOR` to ensure stable operation and successful compilation of the wpa_supplicant shim layer.
