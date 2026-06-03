---
title: 'D21rndis: USB RNDIS for SAMD21'
summary: D21rndis is a USB Remote Network Driver Interface Specification (RNDIS) implementation
  for the Microchip SAMD21 microcontroller. It integrates the lwIP TCP/IP stack to
  provide a web server, DHCP server, and DNS server over a USB connection, enabling
  network connectivity without dedicated Ethernet hardware.
codeUrl: https://github.com/majbthrd/D21rndis
isShow: false
rtos: ''
libraries:
- lwip
topics:
- lwip
- microchip
- rndis
- samd21
- samd21g18
- samd21j18
- usb
- usb-devices
star: 19
lastUpdated: '2020-10-24'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- d21ecm-usb-cdc-ecm-for-samd21
- d21eem-usb-cdc-eem-for-samd21
- stm32-bluepill-rndis-device-with-lwip
- usb-cdc-ecm-for-stm32f072
- ip-over-usb
- esp32-usb-over-ip
---

Connecting embedded devices to a network often requires dedicated Ethernet controllers or Wi-Fi modules, but the **D21rndis** project offers a clever alternative for the Microchip SAMD21. By implementing the Remote Network Driver Interface Specification (RNDIS), this project allows a SAMD21-based board to appear as a network interface to a host computer over a standard USB cable.

Inspired by the `lrndis` project and leveraging a variant of the SAMDx1 USB stack, D21rndis provides a complete networking solution in a compact footprint. It is particularly useful for creating configuration web pages, local data dashboards, or simple network-based control interfaces for embedded systems without the overhead of additional networking hardware.

## A Complete Network Stack in Your Pocket

At the heart of D21rndis is the **lwIP (lightweight IP)** stack, version 2.1.2. This allows the SAMD21 to handle standard TCP/IP traffic. To make the user experience seamless, the project includes several built-in services:

*   **DHCP Server:** Automatically assigns an IP address to the host computer (typically 192.168.7.x).
*   **DNS Server:** Resolves local queries to ensure the device is easily reachable.
*   **Web Server:** Serves HTML, CSS, and JavaScript directly from the microcontroller's flash memory.

## Hardware and Resource Requirements

Running a full TCP/IP stack over USB is resource-intensive for a small microcontroller. D21rndis requires a SAMD21 variant with at least **32 kBytes of RAM** and **128 kBytes of Flash**. 

Development was primarily performed on the SAMD21 Xplained Pro (ATSAMD21J18), but it is also compatible with popular boards like the SparkFun SAMD21 Mini Breakout and the Arduino Zero (ATSAMD21G18). 

One interesting technical detail involves the clocking mechanism. By default, the project uses the **USBCRM mode**, where the SAMD21 disciplines its internal 48MHz RC clock using USB Start-of-Frame (SOF) messages. This eliminates the need for an external crystal. However, for boards like the Arduino Zero that may have specific timing requirements or populated 32k crystals, the code provides a simple configuration toggle to switch to an external crystal source.

## Customizing the Application

The project is designed to be easily extensible. The main logic resides in `project/app.c`, where developers can define how the device responds to network requests. For example, the default demo shows a real-time "Device Time" (based on the system tick) on a web page and provides "User Controls" (Alpha, Bravo, Charlie) that trigger specific C code on the microcontroller.

```c
// Example of how the application might handle a state update
void app_update_state(const char *name, const char *value) {
    if (strcmp(name, "alpha") == 0) {
        // Execute logic for 'alpha' control
    }
}
```

## Ecosystem and Compatibility

D21rndis is part of a family of USB networking implementations by the same author. If your target environment requires different USB protocols, you might also look at:
*   **D21ecm:** A CDC-ECM (Ethernet Control Model) implementation, often preferred for macOS and Linux.
*   **D21eem:** A CDC-EEM (Ethernet Emulation Model) implementation.

All three implementations share a significant amount of code, differing primarily in the USB driver layer, making it easy to switch between protocols depending on the host operating system requirements.

Presently, the project is configured for use with **Rowley Crossworks for ARM**, though the source code is standard GCC/Clang compatible, allowing for potential porting to other toolchains like Makefile-based systems or PlatformIO in the future.
