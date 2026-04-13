---
title: ToothPaste
summary: ToothPaste is an ESP32-S3 based hardware receiver that converts Web-BLE signals
  into AES-128 encrypted USB HID keyboard and mouse commands. It provides a secure,
  driverless solution for entering complex passwords and executing DuckyScript macros
  on air-gapped or untrusted systems.
slug: toothpaste
codeUrl: https://github.com/Brisk4t/ToothPaste
siteUrl: https://www.toothpasteapp.com
version: firmware
lastUpdated: '2026-03-27'
licenses:
- AGPL-3.0
image: /202604/ToothPasteCoverBlocks.webp
rtos: freertos
libraries:
- nanopb
topics:
- arduino
- argon2
- ble
- cybersecurity
- ecdh
- embedded-systems
- encryption
- esp32
- hardware
- infiltration
- keystroke-injection
- mbedtls
- open-source
- password
- password-manager
- pentesting
- react
- usb-hid
- web-ble-api
isShow: true
createdAt: '2026-04-12T09:15:31+00:00'
updatedAt: '2026-04-12T09:15:31+00:00'
---

Entering long, complex passwords on untrusted or air-gapped computers is a recurring headache for security-conscious users. Whether it's a BIOS interface, a remote server, or a public terminal, these systems often lack the software flexibility to support password managers or network-based clipboard sharing. ToothPaste solves this by leveraging the most universally trusted interface available: the USB Human Interface Device (HID) standard.

### The Universal Interface

At its core, ToothPaste acts as a bridge between your browser and any USB-compatible host. By emulating a standard keyboard and mouse, the device requires no specialized drivers or software installation on the target machine. Because keyboards are implicitly trusted by operating systems—after all, you can't enter a password to authorize a keyboard if the keyboard is what you use to type the password—ToothPaste can interact with systems at the lowest levels, including BIOS and boot loaders.

### Web-BLE and Cross-Platform Control

The project utilizes Web BLE (Bluetooth Low Energy) to provide a controller interface directly through a web browser. This approach eliminates the need for platform-specific native applications, allowing users to control the hardware from any Chromium-based browser on a desktop or mobile device. By visiting the ToothPaste web app, users can connect to their hardware, send keystrokes, and manage macros with minimal friction.

### Security First: Encrypted Keystrokes

Since Bluetooth is an open airwaves protocol, security is a paramount concern—especially when transmitting sensitive credentials. ToothPaste implements a robust security layer to prevent Man-In-The-Middle (MITM) attacks. While standard Web BLE often relies on "Just Works" pairing (which is vulnerable to interception), ToothPaste uses a two-step encryption workflow:

1.  **ECDH Public Key Cryptography**: A key exchange occurs to establish a secure channel.
2.  **AES-128 Symmetric Encryption**: All subsequent "ToothPackets" containing keyboard and mouse data are encrypted using a derived key.

This ensures that even if the BLE traffic is captured, the actual keystrokes remain protected. Furthermore, the local data stored in the browser—such as saved macros and scripts—can be encrypted using an Argon2-derived key, mirroring the security architecture of professional password managers.

### Technical Architecture

The hardware is built around the ESP32-S3, chosen for its integrated support for both USB OTG and BLE. The firmware is developed using the ESP-IDF framework and utilizes NanoPB for efficient protocol buffer serialization. This combination allows for high-performance, low-latency communication between the web interface and the HID output.

For power users, ToothPaste supports DuckyScript, the industry-standard scripting language for automated keystroke injection. Users can create, save, and replay complex scripts directly from the web interface, making it a versatile tool for both productivity and security auditing.

### Getting Started

Setting up ToothPaste is designed to be accessible. The quickest method involves using the ToothPaste Webapp to flash the firmware directly over Web Serial to an ESP32-S3 development board. Once flashed, the device identifies as a standard HID device. For developers looking to customize the project, the source code is structured for the ESP-IDF (v5.5.1+) build system, with clear paths for modifying ProtoBuf packets and UI components.
