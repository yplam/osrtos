---
title: NRSuite
summary: NRSuite is a modular wireless research toolkit that offloads the radio layer
  to an ESP32 connected via USB OTG to an unrooted Android device. It enables advanced
  Wi-Fi operations, BLE HID emulation, and BadUSB functionality within the Termux
  environment using a custom binary bridge protocol.
slug: nrsuite
codeUrl: https://github.com/7wp81x/NRSuite
siteUrl: https://7wp81x.github.io/NRSuite/
version: v1.0.1
lastUpdated: '2026-07-20'
licenses:
- MIT
image: /202607/NRSuite_0.avif
rtos: freertos
libraries:
- h2zero-esp-nimble-cpp
- nimble
- lwip
topics:
- 7wp81x
- 802-11
- android
- ble
- deauthentication-attack
- deauther
- esp32
- ethical-hacking
- firmware
- hid
- nethunter
- no-root
- packet-capture
- security-research
- termux
- termux-hacking
- termux-tool
- wifi-security
- wireless
- wpa2-handshake
isShow: true
createdAt: '2026-07-20T10:47:23+00:00'
updatedAt: '2026-07-20T10:47:23+00:00'
---

## Bridging the Gap in Android Wireless Research

Android has long been a challenging platform for wireless security researchers. Due to strict kernel lockdowns and restricted radio APIs, features like monitor mode, raw packet injection, and low-level Bluetooth control are typically unavailable to user-space applications. Traditionally, overcoming these hurdles required a rooted device, custom kernels like NetHunter, and specific external USB adapters. NRSuite offers a novel alternative by sidestepping the Android software stack entirely, offloading the radio operations to an inexpensive ESP32 microcontroller.

By connecting an ESP32 to a stock Android phone via a USB OTG cable, NRSuite turns the device into a powerful wireless toolkit. The project utilizes the Termux environment and a Python-based bridge to communicate with the ESP32 firmware, providing a professional-grade suite of tools without requiring root access or system modifications.

## Architecture and the Bridge Protocol

The core of NRSuite's efficiency lies in its modular architecture and its custom binary framing protocol. Instead of relying on slow serial ASCII communication, NRSuite uses a compact framed protocol with sliding-window flow control. This allows for high-throughput tasks such as live Wi-Fi packet streaming (PCAP) and real-time HID injection.

The system is split into three distinct layers:
1.  **The Firmware**: Written for the ESP32 using the ESP-IDF and Arduino frameworks, it handles the heavy lifting of promiscuous capture, frame injection, and hardware-level radio management.
2.  **The Python Bridge**: A middleware layer (utilizing the `espbridge` library) that manages USB communication via `libusb` and `termux-usb`, facilitating the transfer of commands and data between the phone and the microcontroller.
3.  **The CLI**: A user-friendly interface in Termux that allows researchers to execute scans, capture handshakes, and deploy payloads through simple commands.

## Versatile Wireless Capabilities

NRSuite is designed to be a multi-purpose tool, moving beyond simple Wi-Fi scanning. Its current feature set includes:

*   **Wi-Fi Sniffing and Injection**: Users can perform active scans, capture EAPOL handshakes, and stream live traffic into tools like Wireshark or Termshark via a FIFO pipe. It also supports standalone or combined deauthentication attacks to facilitate handshake acquisition.
*   **Captive Portal Implementation**: The toolkit can deploy custom captive portals for network testing, allowing for HTML file uploads and automated EAPOL capture against specific targets.
*   **BLE HID (BadBLE)**: By leveraging the Bluetooth capabilities of chips like the ESP32-C3 and S3, NRSuite can emulate a BLE keyboard. This enables the execution of DuckyScript payloads or real-time keystroke passthrough to a paired host.
*   **USB HID and Mass Storage**: On chips with native USB-OTG support (S2 and S3), NRSuite can act as a BadUSB device or expose the onboard flash as a mass storage drive, providing a versatile platform for physical security assessments.

## Hardware Flexibility

One of the most impressive aspects of NRSuite is its broad hardware support. It is compatible with a wide range of ESP32 variants, each offering different strengths. The ESP32-C3 is a cost-effective choice for Wi-Fi and BLE operations, while the ESP32-S3 provides the most comprehensive feature set, including native USB-OTG for BadUSB and Mass Storage modes. Even classic ESP32 devkits are supported via external USB-UART bridges, ensuring that researchers can build a functional toolkit for as little as $5.

## Getting Started with NRSuite

Setting up NRSuite is streamlined for the Termux environment. Users need to install the necessary Python dependencies and the Termux:API companion app. The firmware can be flashed directly from a PC using PlatformIO or from the Android device itself using the `nrflash` utility. Once the ESP32 is connected via OTG, the `nrsuite` CLI automatically detects the hardware and requests the required USB permissions, making it one of the most accessible wireless research platforms available today.
