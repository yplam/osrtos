---
title: 'D21ecm: USB CDC-ECM for SAMD21'
summary: A CDC-ECM implementation for the Microchip SAMD21 microcontroller that enables
  Ethernet-over-USB functionality. It integrates the lwIP stack to provide a built-in
  web server, DHCP server, and DNS server, allowing the device to act as a network
  interface for Linux, macOS, and mobile devices.
codeUrl: https://github.com/majbthrd/D21ecm
isShow: false
rtos: ''
libraries:
- lwip
topics:
- cdc-ecm
- ecm
- lwip
- macos
- microchip
- samd21
- samd21g18
- samd21j18
- usb
- usb-cdc-ecm
- usb-devices
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- d21eem-usb-cdc-eem-for-samd21
- d21rndis-usb-rndis-for-samd21
- usb-cdc-ecm-for-stm32f072
- ip-over-usb
- stm32-bluepill-rndis-device-with-lwip
- wiznetinterface-library
---

The **D21ecm** project is a specialized implementation of the USB Communication Device Class - Ethernet Control Model (CDC-ECM) for the Microchip (formerly Atmel) SAMD21 microcontroller. By leveraging this protocol, developers can transform a SAMD21-based board into a network interface that is natively recognized by operating systems like Linux and macOS, as well as many modern smartphones.

### A Versatile Networking Stack
At the heart of D21ecm is the **lwIP (lightweight IP)** stack, version 2.1.2. This allows the project to go beyond simple data transfer and provide a full suite of networking services directly from the microcontroller. The project includes:
- A **DHCP server** to automatically assign IP addresses to the host computer.
- A **DNS server** for basic name resolution.
- A **Web server** that serves HTML content, including real-time data updates.

This project is part of a family of implementations by the same author, including `D21rndis` (for RNDIS) and `D21eem` (for CDC-EEM). While they share much of the same core logic and lwIP integration, D21ecm specifically targets the ECM standard, which is widely supported on non-Windows platforms without requiring custom drivers.

### Hardware Requirements and Clocking
Because running a full TCP/IP stack is resource-intensive, the project requires a SAMD21 variant with at least **32KB of RAM** and **128KB of Flash**. Common targets include the SAMD21 Xplained Pro (ATSAMD21J18), the SparkFun SAMD21 Mini Breakout, and the Arduino Zero.

One interesting technical detail involves the SAMD21's clocking mechanism. By default, the project uses **USBCRM (USB Calibration Real-time Monitor)** mode. This allows the internal 48MHz RC clock to discipline itself using USB Start-of-Frame (SOF) messages, eliminating the need for an external crystal. However, the author notes that some hardware designs (like the Arduino Zero) may require an external 32kHz crystal for reliable USB operation, and the source code provides a simple toggle to switch between these modes.

### Customizing the Application
The logic for the end-user application is primarily contained within `project/app.c`. The default demo showcases a web interface (accessible at `192.168.7.1`) that displays the device's "Systick" time in real-time. It also features "User Controls" (labeled alpha, bravo, and charlie) that demonstrate how web-based interactions can trigger specific code execution on the microcontroller.

### Getting Started
Currently, the project is configured for use with **Rowley Crossworks for ARM**, with project files located in the `ide/Rowley/` directory. While the code is written to be compatible with GCC and Clang, the build system is currently tied to the Crossworks environment. 

For those looking for a more portable solution, the author suggests keeping an eye on the **TinyUSB** project, as they have been contributing similar capabilities there to support a wider range of processors and open-source build tools.
