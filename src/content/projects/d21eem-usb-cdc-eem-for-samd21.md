---
title: 'D21eem: USB CDC-EEM for SAMD21'
summary: An implementation of the USB CDC-EEM (Ethernet Emulation Model) protocol
  for the Microchip SAMD21 microcontroller. It integrates the lwIP TCP/IP stack to
  provide a web server and DHCP services, allowing the device to function as a network
  interface over USB.
codeUrl: https://github.com/majbthrd/D21eem
isShow: false
rtos: ''
libraries:
- lwip
topics:
- cdc-eem
- eem
- lwip
- microchip
- samd21
- samd21g18
- samd21j18
- usb
- usb-cdc-eem
- usb-devices
star: 5
lastUpdated: '2020-10-24'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- d21ecm-usb-cdc-ecm-for-samd21
- d21rndis-usb-rndis-for-samd21
- usb-cdc-ecm-for-stm32f072
- ip-over-usb
- stm32-bluepill-rndis-device-with-lwip
- esp32-usb-over-ip
---

The **D21eem** project is a specialized implementation of the USB Communication Device Class Ethernet Emulation Model (CDC-EEM) specifically designed for the Atmel/Microchip SAMD21 series. By leveraging this protocol, developers can make a SAMD21-based device appear as a standard network interface when plugged into a host computer, enabling high-level networking capabilities over a simple USB cable.

Inspired by the `lrndis` project, D21eem serves as a bridge between the physical USB hardware of the SAMD21 and the powerful **lwIP** (lightweight IP) stack. This combination allows the microcontroller to host a rudimentary TCP/IP stack, including a built-in DHCP server and a web server, without requiring a dedicated Ethernet controller.

### Hardware and Resource Requirements
Running a full TCP/IP stack on a microcontroller is resource-intensive. To use D21eem, you will need a SAMD21 variant with at least **32 KB of RAM** and **128 KB of Flash**. The project was developed using the SAMD21 Xplained Pro (ATSAMD21J18), but it is also compatible with common boards like the SparkFun SAMD21 Mini Breakout and the Arduino Zero (ATSAMD21G18).

### Technical Architecture
The project is built upon several key components:
- **USB Stack**: A variant of the SAMDx1 USB stack from the `vcp` project.
- **Networking**: lwIP version 2.1.2 provides the core networking logic.
- **Services**: Integrated DHCP and DNS servers allow the host computer to automatically configure its network settings when connected to the device.
- **Application Layer**: A sample web server is included, accessible by default at `192.168.7.1`.

### The USBCRM Clocking Challenge
One of the most interesting technical details documented in this project involves the SAMD21's clocking mechanism. By default, the code uses **USBCRM** (USB Clock Recovery Mode), which allows the internal 48MHz RC clock to be disciplined by USB Start-of-Frame (SOF) messages. This eliminates the need for an external crystal, simplifying hardware design.

However, the author notes that certain hardware designs, specifically those following the Arduino Zero reference, may experience reliability issues with USBCRM. For these cases, the project includes a configuration toggle to switch to an external 32kHz crystal if one is populated on the board:

```c
// In the source code, you can toggle between USBCRM and external crystal
#if 1
  // Default: Use USBCRM (No external crystal required)
#else
  // Use external 32k crystal for improved stability on some boards
#endif
```

### Getting Started and Customization
The logic for the end-user application is primarily contained within `project/app.c`. In the provided example, the device serves a web page that displays the system uptime (systick) in real-time as "Device Time." It also features "User Controls" (labeled alpha, bravo, and charlie) that demonstrate how web-based interactions can trigger specific code execution on the microcontroller.

To compile the project, **Rowley Crossworks for ARM** is currently required, with the project files located in the `ide/Rowley` directory. While the code is GCC/Clang compatible, the build system is currently tailored for the Crossworks environment.
