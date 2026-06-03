---
title: FileFerry-Click2Flash
summary: A portable hardware tool designed for factory programming of SPI flash ICs.
  It supports transferring binary images and security credentials from an onboard
  SD card or via UART using the X-modem protocol, targeting STM32-based embedded systems.
slug: fileferry-click2flash
codeUrl: https://github.com/Fasal-Tech/FileFerry-Click2Flash
star: 18
version: PR1.1_V1.1
lastUpdated: '2024-12-06'
rtos: ''
topics:
- flash-programmer
- jig
- pcb
- spi
- spi-flash
- stm32
- uart
- w25q64
- x-modem
isShow: true
image: /202602/click2flash.webp
createdAt: '2026-02-19'
updatedAt: '2026-02-19'
relatedProjects:
- esp8266-arduino-serial-uploader
- stm32-bootloader
- esp32-fatfs-image-tool-and-example
- esp32-spartan-edge-spiffs-loader
- tab5-launcher
- ftp-server-with-littlefs-for-wfi32-iot-board
---

## Overview

FileFerry-Click2Flash is a compact, portable hardware jig designed to streamline the factory programming process for IoT products. It serves as a bridge between data sources—such as an SD card or a computer—and a target SPI flash IC. By providing a simple, button-triggered interface, it allows technicians to flash firmware images, security certificates, or unique device identifiers without the need for expensive, bulky equipment like J-Link SPI programmers or complex bed-of-nails test jigs.

## Key Features and Functionality

The tool is built around the STM32F103 microcontroller and offers two primary methods for data transfer:

*   **SD Card Mode:** Users can store production binaries or configuration files on a micro SD card. Once the card is inserted and the board is powered, a single click of the onboard button initiates the flashing process to the target SPI flash. This mode is ideal for offline factory environments where a PC connection is not available.
*   **UART X-modem Mode:** For scenarios requiring unique data per device (such as specific CA certificates or UUIDs), the tool supports file transfer from a PC over USB-UART. By utilizing the X-modem protocol, a computer can stream data directly through the FileFerry to the target flash IC.

## Technical Implementation

The project is fully open-source, providing both hardware and firmware resources. The hardware design is available in Eagle format (.brd, .sch) and includes manufacturing files (Gerber, BOM, PnP) optimized for vendors like JLCPCB. The firmware is developed using the STM32Cube IDE and the STM32 HAL (Hardware Abstraction Layer), making it highly accessible for developers familiar with the STM32 ecosystem.

The system architecture includes:
*   **STM32F103 MCU:** Acts as the central controller managing the file systems and SPI communication.
*   **Status Monitoring:** An onboard RGB LED provides visual feedback on the flashing progress, while debug logs are available via the USB-UART interface.
*   **Expandability:** The board features a QWIIC port and a JST port with controlled power, allowing it to be repurposed as a data logger or a general-purpose STM32 development kit.

## Use Cases in Manufacturing

FileFerry-Click2Flash addresses the gap between high-cost professional tools and DIY solutions. Common applications include:
*   **Golden Image Deployment:** Flashing a primary bootloader or firmware image that supports subsequent Over-the-Air (OTA) updates.
*   **Security Provisioning:** Transferring unique device certificates generated on-the-fly by a PC application during the assembly process.
*   **Configuration Management:** Loading JSON configuration files or audio assets onto external flash memory during final assembly.

Because the hardware is open, users can modify the connector interface—such as using pogo pins—to match the specific physical requirements of their target PCB, ensuring a reliable and repeatable programming connection.
