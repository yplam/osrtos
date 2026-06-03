---
title: LPC407x NoOS lwIP mbedTLS HTTPD for Keil
summary: A bare-metal (NoOS) implementation of an HTTP/HTTPS server on the NXP LPC4078
  microcontroller. It integrates the lwIP TCP/IP stack and mbedTLS for secure communication,
  targeting the Cortex-M4 platform with external SDRAM support and Keil MDK development
  environment.
slug: lpc407x-noos-lwip-mbedtls-httpd-for-keil
codeUrl: https://github.com/straight-coding/LPC407x-NoOS-LWIP-MBEDTLS-HTTPD-KEIL
star: 3
lastUpdated: '2021-09-06'
rtos: ''
libraries:
- lwip
topics:
- cortex
- device
- http
- httpd
- https
- keil
- lpc407x
- lpc408x
- lwip
- m4
- mbedtls
- no-rtos
- page
- web
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- lwip-http-server-netconn-rtos-application
- mqtt-client-and-https-server-using-mbedtls
- stm32f429-nucleo-lwip-and-freertos-template
- straight-httpd-embedded-web-server-simulator
- stm32f7-https-client
- stm32f7-lxi-device
---

## Overview

The LPC407x-NoOS-LWIP-MBEDTLS-HTTPD-KEIL project is a specialized port of the `straight-httpd` web server to a real-world embedded platform. While the original project was designed for Windows simulation, this repository targets the NXP LPC4078-FET208 (Cortex-M4) microcontroller. It provides a robust foundation for building secure web interfaces on embedded devices without the overhead of a Real-Time Operating System (RTOS).

## Hardware and Platform Support

The project is configured for an evaluation board featuring the NXP LPC4078. A significant aspect of this implementation is its support for external SDRAM (16MB), which is essential for handling the memory-intensive requirements of HTTPS and SSL/TLS handshakes. 

**Key hardware features include:**
- **MCU**: NXP LPC4078 (Cortex-M4)
- **Memory**: 16MB External SDRAM at 0xA0000000
- **Ethernet PHY**: Automatic identification of KSZ8041NL, DP83848C, and DM9161A
- **MAC Address**: Automatically generated using the unique identification number of the LPC4078 chip via IAP

## Networking and Security

The project utilizes the **lwIP** TCP/IP stack in a standalone (NO_SYS) configuration. For security, it integrates **mbedTLS**, enabling HTTPS support. Because the LPC4078 lacks a hardware cryptographic engine, the project is optimized to use 512-bit keys to maintain reasonable performance. 

One of the unique features is the **Debug Log Receiver**. When the device obtains a valid IP address, it creates a UDP-based socket to broadcast logs to a remote port (8899). This leverages the high speed of Ethernet DMA to transmit large volumes of diagnostic data without significantly impacting network communication performance.

## Technical Configuration

To manage the limited on-chip resources, the project employs several specific configurations in `lwipopts.h` and `config_user.h`:

- **Memory Management**: The lwIP allocator is used for both the stack and mbedTLS to simplify memory tracking. If HTTPS is enabled, the memory size is increased to 100KB; otherwise, it stays at 24KB.
- **TCP Optimization**: The TCP Maximum Segment Size (MSS) is reduced to 800 to lower memory requirements, while the TCP Window (WND) is adjusted based on whether HTTPS is active to ensure large data uploads (like firmware updates) succeed.
- **HTTPS Redirection**: The server can be configured to redirect all HTTP requests to HTTPS automatically.
- **Keep-Alive Support**: The project supports "keep-alive" headers to reuse existing connections, which is highly recommended for HTTPS to avoid the slow overhead of repeated handshakes.

## Development Tools

The project includes a suite of tools called **EmbedTools** to streamline the development process:
- **Certificate Tool**: Generates PEM-formatted self-signed server certificates.
- **Web Pages Compressor**: Compresses web assets using GZIP and converts them into C source files (`fs_data.c`) for inclusion in the firmware.
- **Build Scripts**: Includes `buildfs.bat` to automate the conversion of web root files into the embedded file system format.

## Getting Started

The project is designed for the Keil MDK environment. Developers can find the web root files in `httpd/webroot`. After modifying web pages or scripts, running the compression tool updates `fs_data.c`, which is then compiled into the final binary. For those without external SDRAM, the project can be downgraded to HTTP-only mode by disabling `ENABLE_HTTPS` in the configuration files, as the 64KB on-chip RAM is insufficient for secure socket layers.
