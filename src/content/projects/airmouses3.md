---
title: AirMouseS3
summary: AirMouseS3 is an ESP32-S3 based gesture-controlled mouse that uses an onboard
  gyroscope and accelerometer to translate physical movement into cursor actions.
  Designed for the M5Stack StickS3, it utilizes the NimBLE library for Bluetooth HID
  connectivity and the M5Unified framework for hardware management.
slug: airmouses3
codeUrl: https://github.com/Teapot174/AirMouseS3
version: v1.0
lastUpdated: '2026-03-12'
licenses:
- MIT
image: /202606/AirMouseS3_0.avif
rtos: freertos
libraries:
- nimble
topics:
- airmouse
- m5stack
- sticks3
isShow: true
createdAt: '2026-06-02T23:22:09+00:00'
updatedAt: '2026-06-02T23:22:09+00:00'
relatedProjects:
- m5-keyboard-and-mouse-emulator
- nimble-hid-keyboard-and-mouse-example-for-esp32
- gesture-detecting-macro-keyboard
- esp32-nimble-hid-client
- esp32-s3-usb-to-ble-keyboard-bridge
- micropython-human-interface-device-library
---

## About the AirMouseS3

The AirMouseS3 is an innovative peripheral project that transforms the M5Stack StickS3 into a motion-sensing computer mouse. By utilizing the device's built-in gyroscope and accelerometer, it allows users to control their computer cursor through physical movement in the air, rather than on a flat surface. 

This project is designed for versatility and can be connected to any device that supports Bluetooth HID, including PCs, tablets, and smartphones. It offers a compact and wireless solution for presentations or alternative input needs.


## Flash and Setup

Deploying the AirMouseS3 firmware is straightforward using the M5Stack ecosystem. Users can find the project listed as «AirMouseS3» within the M5Burner tool to flash their StickS3 device. Once the firmware is installed and the device is powered on, it initializes the internal sensors and prepares for wireless communication.

![AirMouseS3 boot screen](/202606/AirMouseS3_1.avif)

To begin using the device, you simply need to connect to the Bluetooth hotspot advertised as "AirStick." Once paired, the StickS3 acts as a standard input device, requiring no additional software on the host computer.

![Bluetooth connection screen](/202606/AirMouseS3_2.avif)

## Controls and Navigation

The AirMouseS3 maps its physical buttons to essential mouse functions to ensure a seamless navigation experience:

*   **BUTTON A**: Serves as the Left Mouse Button (LMB) for clicking and selecting items.
*   **BUTTON B**: Acts as a movement freeze. This is a critical feature for recalibrating or "straightening" the stick. By holding this button, movement tracking is paused, allowing the user to reposition their hand without moving the cursor on the screen.

![The final AirMouseS3 hardware](/202606/AirMouseS3_3.avif)

## Technical Implementation

The project is built using the PlatformIO environment, targeting the ESP32-S3 DevKit board. It relies on the `M5Unified` library to interface with the StickS3's hardware components and the `NimBLE-Arduino` library to manage efficient Bluetooth Low Energy (BLE) communications. The build process involves merging the bootloader, partition table, and application firmware into a single deployable binary using `esptool.exe`.
