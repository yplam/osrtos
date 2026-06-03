---
title: Meeting Room Display Firmware
summary: A firmware application for a connected meeting room display using Mbed OS
  and the Nanostack IPv6/Thread stack. It features LWM2M integration for remote management
  and updates a Sharp Memory LCD with real-time room status and scheduling information.
slug: meeting-room-display-firmware
codeUrl: https://github.com/stevew817/MeetingroomDisplayFirmware
star: 0
lastUpdated: '2017-06-22'
rtos: mbed-os
topics:
- lwm2m-client
- mbed-os
- thread
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- pelion-device-management-client-example-for-mbed-os
- e-ink-meeting-room-schedule-display
- mender-ota-example-for-stm32l4-and-zephyr-rtos
- esp32-p4-home-assistant-display
- wt32-sc01-plus-smart-desk-companion
- open-display-firmware
---

## Overview

The Meeting Room Display Firmware is a specialized embedded application designed to drive a low-power status display for office environments. Built on the Mbed OS platform, this project demonstrates a sophisticated integration of IPv6 networking, low-power display technology, and standardized IoT management protocols.

## Hardware and Architecture

The firmware is specifically tailored for the Silicon Labs EFR32 platform, leveraging its integrated radio capabilities for Thread networking. The visual interface is powered by a Sharp LS027B7DH01 Memory LCD, which is known for its extremely low power consumption and high readability. The display is driven via SPI, with the firmware utilizing the Adafruit GFX library for rendering fonts and UI elements.

## Networking and Connectivity

One of the core strengths of this project is its networking stack. It utilizes Nanostack, a full-featured 6LoWPAN/Thread implementation, to provide IPv6 connectivity. This allows the display to operate within a mesh network, ensuring robust communication even in large office buildings.

For device management and data synchronization, the project implements the LWM2M (Lightweight Machine-to-Machine) protocol. By connecting to the Mbed Device Connector (or a compatible CoAP/LWM2M server), the display can receive real-time updates regarding:

- **Room Name**: The identifier for the specific meeting space.
- **Current Meeting Owner**: The person or group currently occupying the room.
- **Current Time Slot**: The duration of the current booking.
- **Next Meeting Information**: Details about the upcoming reservation to help users plan ahead.

## Software Design

The application logic is centered around a `MeetingRoomMonitorResource` class, which maps LWM2M resources to internal state. It uses an asynchronous event queue (`Queue<ProgramEvent_t, 16>`) to handle updates from the network without blocking the main execution thread. This design ensures that the UI remains responsive and that network operations are handled efficiently.

Time synchronization is managed through an NTP client, which periodically updates the system clock to account for drift and Daylight Savings Time changes. The firmware also includes logic to handle UTF-8 character conversion, ensuring that meeting owner names and room titles are displayed correctly even with special characters.

## Key Features

- **Standardized IoT Management**: Uses LWM2M for seamless integration with enterprise IoT platforms.
- **Low-Power UI**: Optimized for Memory LCDs, only updating the screen when data changes to conserve energy.
- **Robust Networking**: Built-in support for Thread/6LoWPAN mesh networking via Nanostack.
- **Automated Time Sync**: Integrated NTP client for accurate scheduling displays, including logic to sync every Sunday to capture DST changes.
- **Custom Font Support**: Includes multiple sizes of Sans Serif and Micro Sans Serif fonts for a professional UI appearance.

This project serves as an excellent reference for developers looking to build professional-grade IoT displays that require secure, standardized communication and high energy efficiency.
