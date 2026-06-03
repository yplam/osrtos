---
title: FTP Server with littlefs for WFI32-IoT Board
summary: An MPLAB Harmony 3 application demonstrating an FTP server implementation
  using the littlefs fail-safe file system on the Microchip WFI32-IoT board. It utilizes
  the onboard SST26 SPI Flash for storage and operates in SoftAP mode to allow wireless
  file management via standard FTP clients.
slug: ftp-server-with-littlefs-for-wfi32-iot-board
codeUrl: https://github.com/MicrochipTech/PIC32MZW1_LittleFS_over_FTP
siteUrl: https://www.microchip.com/en-us/development-tool/EV36W50A
star: 1
version: v1.1.1
lastUpdated: '2022-10-20'
rtos: ''
libraries:
- littlefs
topics:
- ftp-server
- littlefs
- sst26
- wfi32iot-board
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- stm32-ftp-server
- multiftpserver-library
- simpleftpserver-library
- ftp-server-teensy41
- transfer-files-over-ethernet-with-stm32-and-freertos
- esp32-fatfs-storage-example
---

## Overview

The PIC32MZW1_LittleFS_over_FTP project is a reference implementation for embedded developers looking to integrate robust file management with wireless connectivity. Developed for the Microchip WFI32-IoT board, this application demonstrates how to host an FTP server that stores data on external SPI Flash using the littlefs file system. 

By combining the fail-safe nature of littlefs with the networking capabilities of the PIC32MZW1 (WFI32) microcontroller, the project provides a reliable solution for IoT devices that require remote file access, data logging, or firmware updates over a local wireless connection.

## Technical Architecture

The application is built upon the **MPLAB Harmony 3** software framework, utilizing several key components:

- **Networking Stack**: The system configures the WFI32-IoT board to boot in SoftAP mode (Access Point), creating a local network named 'DEMO_AP_SOFTAP'. This allows any FTP client (such as a smartphone or laptop) to connect directly to the board without an external router.
- **File System**: It integrates **littlefs**, a fail-safe file system designed specifically for microcontrollers with limited resources and flash memory. It is particularly well-suited for this application due to its resilience against power loss and efficient wear leveling.
- **Storage Driver**: The backend storage is the SST26 memory module available on the WFI32-IoT board. The project uses the Harmony 3 Memory Driver and SPI peripheral library to interface with this Flash chip.

## Key Features

- **SoftAP Connectivity**: Simplifies the connection process by hosting its own wireless network.
- **Standard FTP Support**: Supports common FTP commands including `put`, `get`, `mkdir`, `rmdir`, `delete`, `ls`, `cd`, `pwd`, and `lpwd`.
- **Fail-Safe Storage**: Ensures data integrity even during unexpected power interruptions thanks to the littlefs architecture.
- **Hardware Integration**: Pre-configured for the WFI32-IoT development environment, including UART logging for real-time debugging and status monitoring.

## Getting Started

To run this application, developers need the MPLAB X IDE and the XC32 compiler. The project relies on the MPLAB Harmony 3 Configurator (MHC) for peripheral and middleware setup. 

Once the firmware is programmed, the board initializes the WiFi service and the FTP server. Users can monitor the boot process via a serial terminal (115200 baud). After the board displays its SoftAP IP address, a user can connect their device to the 'DEMO_AP_SOFTAP' network and use any standard FTP client to interact with the files stored on the SST26 SPI Flash. 

## Configuration Notes

The project provides a comprehensive Project Graph within MHC, showing the interconnections between the TCP/IP stack, the littlefs file system, and the SPI drivers. Developers should note that in the current version, user authentication is disabled by default (`authRes = true`), allowing any client on the local AP network to access the hosted files. This makes it an excellent starting point for internal tool development or rapid prototyping of wireless storage solutions.
