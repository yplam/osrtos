---
title: Bluetooth Ducky ESP32 - HID Injection Tool
summary: A stealthy HID injection tool built on the ESP32 platform that emulates a
  Bluetooth keyboard to wirelessly inject keystrokes into paired devices. It supports
  Ducky Script-style payloads and features a comprehensive serial command interface
  for remote execution on Windows, macOS, Linux, and Android.
slug: bluetooth-ducky-esp32-hid-injection-tool
codeUrl: https://github.com/Linuxndroid/Bluetooth-Ducky
siteUrl: https://linuxndroid.in
star: 24
version: V.1.0
lastUpdated: '2025-07-22'
rtos: freertos
topics:
- ble-device
- blueducky
- bluetooth
- ducky-payloads
- esp32
- esp32-ducky
- esp32-wroom
- hacker
- hacking
- hid
- hid-attacks
- hid-injection
- linuxndroid
- mrrobot
- rubber-ducky
isShow: false
createdAt: '2026-01-17'
updatedAt: '2026-01-17'
relatedProjects:
- wifiexe-esp32-s3-based-badusb
- m5-keyboard-and-mouse-emulator
- neoducky
- toothpaste
- dshare-hid
- esp32-bluejammer
---

## Overview

Bluetooth Ducky is a specialized HID (Human Interface Device) injection tool designed for the ESP32 platform. Unlike traditional USB-based injection tools like the USB Rubber Ducky, this project leverages the ESP32's Bluetooth capabilities to emulate a wireless keyboard. This allows for stealthy, wireless keystroke injection into any device that supports Bluetooth HID, including PCs, smartphones, and tablets.

The tool is particularly effective for red team operations and security research because it eliminates the need for physical contact with the target device once the initial pairing is established. It supports auto-pairing for previously connected devices, making it a persistent and silent threat actor in authorized testing environments.

## Key Features and Capabilities

The project transforms an ESP32 development board into a powerful automation and exploitation platform. Key features include:

- **Bluetooth HID Emulation**: The device appears to the host system as a standard Bluetooth keyboard, bypassing many security restrictions that might block unauthorized USB devices.
- **Ducky Script Support**: Users can create customizable payloads that mimic the logic of Ducky Script to automate complex tasks.
- **Serial Command Interface**: The firmware includes a robust serial listener that allows users to trigger specific payloads or individual keystrokes in real-time via a Serial Monitor or the project's dedicated GUI application.
- **Cross-Platform Compatibility**: The tool is designed to interact with Windows, macOS, Linux, and Android systems.
- **Stealth Operations**: Features like the `stealWifiSilent` command demonstrate the ability to execute complex PowerShell or CMD sequences while attempting to hide the terminal window from the user's view.

## Technical Implementation

The project is built using the Arduino framework for ESP32 and relies heavily on the `ESP32-BLE-Keyboard` library. The core logic resides in `Ducky.ino`, which manages the BLE connection state and parses incoming serial commands. 

The firmware utilizes a `typeSlow` function to simulate human-like typing speeds, which can help bypass certain heuristic-based security software that monitors for impossibly fast keyboard input. It also includes helper functions for common GUI interactions, such as `pressWinCombo` for triggering Windows shortcuts (e.g., Win+R) and `sendCtrlKey` for standard control sequences.

### Example Command Structure

The device can be controlled via serial strings. For example, sending the command `notepad` triggers the following sequence:

```cpp
void openNotepad() {
  pressWinCombo('r');
  typeSlow("notepad");
  bleKeyboard.write(KEY_RETURN);
}
```

## Advanced Payloads

Beyond simple text injection, the Bluetooth Ducky includes pre-configured payloads for more advanced scenarios:

- **Wi-Fi Credential Harvesting**: A silent routine that exports Wi-Fi profiles to a temporary file and exfiltrates them to a specified webhook.
- **System Manipulation**: Commands to lock the workstation, trigger a shutdown, or display fake system updates to distract the user.
- **Social Engineering**: Automated sequences to open WhatsApp Web and send messages or screenshots to specific numbers.

## Getting Started

To deploy the Bluetooth Ducky, developers need an ESP32 development board (such as the ESP32-WROOM-32) and the Arduino IDE. After installing the ESP32 board support package and the necessary BLE Keyboard library, the `Ducky.ino` sketch can be uploaded. Once powered, the ESP32 begins broadcasting as "ESP32_Keyboard". After the initial pairing with a target device, the payload execution can be triggered automatically on connection or manually via the serial interface.
