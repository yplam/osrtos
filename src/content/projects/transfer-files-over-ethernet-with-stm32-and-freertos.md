---
title: Transfer Files over Ethernet with STM32 and FreeRTOS
summary: A project implementing binary file transfer over Ethernet using an STM32F103ZET6
  microcontroller and FreeRTOS. It features a TCP server on the embedded device to
  facilitate reliable communication with a host computer.
slug: transfer-files-over-ethernet-with-stm32-and-freertos
codeUrl: https://github.com/xaowang96/Transfer-files-by-Ethernet
star: 1
lastUpdated: '2020-07-09'
rtos: freertos
topics:
- fatfs
- freertos
- lwip
- stm32
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- stm32-ftp-server
- embedded-proto-mbed-os-to-server-example
- modbus-tcp-for-stm32f407
- stm32h745-ethernet-with-lwip-and-freertos
- lwip-tcp-ip-stack-on-stm32-microcontroller
- udp-echo-server-for-stm32f407-and-enc28j60
---

## Overview

The "Transfer-files-by-Ethernet" project provides a practical implementation for sending and receiving binary files between an embedded system and a PC over a wired network. By leveraging the STM32F103ZET6 development board and the FreeRTOS real-time operating system, the project demonstrates how to handle network communication and file data processing in a multi-threaded environment.

In many industrial and IoT applications, the ability to move data reliably between a field device and a central controller is paramount. This project addresses that need by establishing a robust TCP-based communication channel over Ethernet, which is often preferred in industrial settings for its noise immunity and high throughput compared to wireless protocols.

## Technical Architecture

The system is divided into two main components: the "lower machine" (embedded device) and the "upper machine" (host PC).

### Embedded System (Lower Machine)

The firmware is designed for the STM32F103ZET6, a high-performance ARM Cortex-M3 microcontroller. This specific variant of the STM32F1 series is well-equipped for networking tasks, featuring 512KB of Flash memory and 64KB of SRAM, providing ample space for both the RTOS kernel and the networking stack buffers.

To manage the complexities of network communication and potential concurrent tasks, the project utilizes **FreeRTOS**. FreeRTOS allows the system to maintain a responsive TCP server while handling file I/O or other system tasks. By using a real-time kernel, the developer can separate the networking logic into its own high-priority task, ensuring that network interrupts and packet processing are handled promptly without being delayed by background application logic.

The core of the network functionality is located within the `FreeRTOSTCPServer` directory, which implements the logic necessary to listen for incoming connections and stream binary data over a TCP socket.

### Network Communication

The project uses a standard Ethernet connection to facilitate high-speed, reliable data transfer. By implementing a TCP server on the STM32, the device can ensure that binary files are transferred without corruption. TCP's built-in error checking and retransmission capabilities make it the ideal choice for binary file transfers where even a single bit error could render the file useless.

## Key Features

- **Real-Time Operation**: Uses FreeRTOS to manage networking tasks efficiently, allowing for deterministic behavior in time-critical applications.
- **Binary Support**: Specifically designed to handle binary file formats, ensuring data integrity during the transfer process from the host to the microcontroller's storage or memory.
- **Wired Reliability**: Utilizes Ethernet for stable communication, making it suitable for environments where Wi-Fi might be unreliable or unavailable.
- **STM32 Integration**: Tailored for the popular STM32F103 series, providing a clear reference for developers working with the ARM Cortex-M3 architecture.

## Use Cases

This type of implementation is foundational for several embedded applications:

- **Remote Firmware Updates (OTA)**: Sending new binary images to a device over the local network to update the application code without physical access.
- **Data Logging**: Transferring large logs from an SD card or external Flash on the embedded device to a central server for analysis.
- **Configuration Management**: Uploading complex configuration files to initialize or update device parameters in real-time.

By studying the `FreeRTOSTCPServer` implementation, developers can learn how to integrate a TCP/IP stack with FreeRTOS on STM32 hardware, a skill that is highly transferable to many other professional embedded projects.
