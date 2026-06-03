---
title: NoteIt UART Datalogger
summary: A portable datalogger for UART-based devices featuring micro-SD storage with
  FatFs and an OLED display. It supports automatic baud rate detection, 3.3V/5V logic
  levels, and USB-C connectivity for data access and charging.
slug: noteit-uart-datalogger
codeUrl: https://github.com/import-tiago/NoteIt
star: 2
version: PCB_v1.2
lastUpdated: '2023-07-21'
rtos: ''
topics:
- datalogger
- fat-fs
- fatfs
- microsd
- msp
- msp430
- mux
- oled
- oled-display
- rotary-encoder
- sdcard
- sdcardfs
- usbc
isShow: true
image: /202601/Home_Screen_Prototype.webp
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- usb-pd-tester
- ch32v003-usb-meter
- m5cardputer-gps-logger
- meindatalogger
- wardriver3000
- usb-pd-adapter
---

NoteIt is a dedicated datalogger designed for devices utilizing UART protocols. It serves as a bridge between embedded systems and data analysis, providing a seamless way to capture serial communication in the field or on the bench. The device is built around a compact 4-layer PCB and is powered by an internal rechargeable battery, making it a truly portable solution for firmware debugging and long-term data collection.

## Core Functionality

The primary purpose of NoteIt is to simplify the process of logging serial data. It features an automatic baud rate detector, which eliminates the guesswork when connecting to unknown systems, though manual selection is also available for specific requirements. The device is compatible with both 3.3V and 5V logic levels, ensuring it can interface with a wide variety of microcontrollers and industrial equipment without needing external level shifters.

Data is stored on a micro-SD card using the FatFs file system. One of the most convenient features of NoteIt is its USB-C integration; when connected to a computer, the device allows direct access to the SD card files. This removes the need for an external SD card adapter, streamlining the workflow from data capture to analysis.

## User Interface and Configuration

Despite its small form factor (50 mm x 35 mm), NoteIt provides a rich user interface. It utilizes an OLED display and a rotary encoder to allow users to navigate settings easily. Through this interface, users can:
- Configure log file settings.
- Adjust the real-time clock (RTC) and calendar.
- Select baud rates manually.
- Monitor device status and battery levels.

Optionally, the device can append metadata such as date, time, and temperature to the recorded UART data, providing essential context for time-sensitive logs.

## Hardware Design

The hardware is designed for reliability and aesthetics. The project utilizes a 4-layer PCB to maintain a small footprint while ensuring signal integrity for the high-speed UART and USB interfaces. It is designed for ultra-low power consumption, allowing it to operate for weeks on battery power, though it can also be powered continuously via a standard 5V USB source.

## Technical Implementation

The firmware manages several complex tasks simultaneously, including:
- **UART Reception**: High-speed data capture with buffering.
- **File Management**: Automatic file naming and organization on the SD card via FatFs.
- **USB Stack**: Implementing Mass Storage Class (MSC) for direct file access.
- **Power Management**: Handling battery charging and low-power states for extended field use.

NoteIt is an ideal tool for developers who need a "set and forget" solution for serial logging, ensuring that data is captured reliably without worrying about voltage levels, power supplies, or complex configuration.
