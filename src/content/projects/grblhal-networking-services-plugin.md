---
title: grblHAL Networking Services Plugin
summary: A comprehensive networking services plugin for grblHAL that provides protocol
  support on top of the lwIP TCP/IP stack. It enables Telnet, Websocket, FTP, HTTP,
  WebDAV, mDNS, MQTT, and Modbus across a variety of 32-bit microcontrollers including
  STM32, RP2040, and ESP32. The plugin facilitates remote machine control and file
  management for embedded CNC systems.
slug: grblhal-networking-services-plugin
codeUrl: https://github.com/grblHAL/Plugin_networking
star: 13
lastUpdated: '2025-11-08'
rtos: ''
libraries:
- lwip
- littlefs
topics:
- ftp-server
- grbl-firmware
- grblhal
- grblhal-plugin
- http-server
- lwip
- networking
- telnet-server
- websocket-server
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- multiftpserver-library
- ftp-server-teensy41
- ip-over-usb
- stm32-ftp-server
- modbus-tcp-for-stm32f407
- simpleftpserver-library
---

The grblHAL Networking Services Plugin is a powerful extension designed to bring modern connectivity to CNC machines and motion control systems running grblHAL. By leveraging the industry-standard lwIP TCP/IP stack, this plugin transforms a standard serial-based controller into a networked device capable of sophisticated remote management and integration.

### Comprehensive Protocol Support

The plugin implements a wide array of server-side protocols, allowing for various methods of interaction with the motion controller:

*   **Telnet**: Provides a "raw" mode interface for command-line control over the network, allowing users to send G-code and receive status reports as if they were connected via USB.
*   **Websocket**: Enables real-time, bidirectional communication, which is essential for modern web-based machine interfaces and dashboards.
*   **FTP and HTTP**: These services allow for robust file management, enabling users to upload G-code files directly to an onboard SD card. Note that these require the grblHAL SD card plugin to be active.
*   **WebDAV**: An extension of the HTTP service that allows the machine's storage to be mounted as a network drive. While currently tested successfully with WinSCP, it provides a path toward seamless file management directly from a desktop environment.
*   **Discovery Services**: Support for mDNS (multicast DNS) and SSDP (Simple Service Discovery Protocol) ensures that the machine can be easily found on a local network without needing to remember static IP addresses.
*   **Modbus**: Includes support for Modbus client functionality, facilitating integration with industrial peripherals and PLCs.

On the client side, the plugin includes an **MQTT** (MQ Telemetry Transport) implementation. While not used by the standard grblHAL core, it provides a programming API that other plugins can use to report telemetry data or receive commands from IoT brokers, making it ideal for industrial monitoring and "Industry 4.0" integrations. Note that MQTT authentication requires lwIP 2.1.x or later.

### Hardware and Driver Compatibility

One of the strengths of the grblHAL ecosystem is its broad hardware support. This networking plugin is compatible with several high-performance microcontrollers, provided the underlying driver includes the necessary lwIP "middleware" layer. Supported platforms include:

*   **Teensy 4.1 (iMXRT1062)**: Utilizing its onboard cabled Ethernet.
*   **Raspberry Pi Pico W (RP2040)**: Supporting both wireless (Wi-Fi) and cabled Ethernet via WizNet modules.
*   **ESP32**: Leveraging its native Wi-Fi capabilities.
*   **STM32 Series**: Including F4, F7, and H7 variants with Ethernet support.
*   **TI LaunchPads**: Such as the MSP432E401Y and TM4C129.

### Technical Architecture

The plugin acts as a protocol layer, abstracting the complexities of network communication from the motion control logic. It relies on the lwIP library (version 2.1.0 or later for HTTP daemon support) for the core TCP/IP functionality. Because grblHAL is designed for high-performance real-time tasks, the networking stack is typically handled in a way that minimizes interference with critical step generation and motion planning.

For file-based services like HTTP and FTP, the plugin integrates with the grblHAL Virtual File System (VFS). This allows the network daemons to interact with storage devices through a standardized interface, regardless of the underlying hardware or filesystem (such as littlefs).

### Getting Started

To use the networking plugin, developers must ensure their specific grblHAL driver is configured to initialize the lwIP stack and start the required services. Users can then access the machine via its IP address or hostname if mDNS is enabled. For example, a web interface can connect via Websockets to provide a full-featured dashboard for machine monitoring and control. 

It is important to note that mDNS and SSDP use UDP multicast/unicast transmission, which may require manual code changes in some drivers to handle correctly. The plugin is part of the larger grblHAL ecosystem, which aims to modernize the classic GRBL firmware for 32-bit microcontrollers, providing the performance and features required for professional-grade CNC applications.
