---
title: M5_Crystal
summary: M5_Crystal is a modular firmware for M5Stack devices like the M5StickCPlus2
  and Cardputer, providing a suite of tools for Wi-Fi, NFC, and Bluetooth interaction.
  It utilizes the M5Unified and M5GFX libraries for hardware abstraction and is built
  on a custom wrapper system designed for rapid feature development.
slug: m5-crystal
codeUrl: https://github.com/Dlazder/m5stick_crystal_firmware
version: v0.6.1
lastUpdated: '2026-05-12'
image: /202605/m5stick_crystal_firmware_0.avif
rtos: freertos
libraries:
- h2zero-esp-nimble-cpp
- littlefs
- u8g2
topics:
- deauth
- firmware
- littlefs
- localization
- m5
- m5cardputer-adv
- m5stick
- m5stickcplus2
- mouse-emulation
- nfc
- pn532
isShow: true
createdAt: '2026-05-13T00:19:38+00:00'
updatedAt: '2026-05-13T00:19:38+00:00'
relatedProjects:
- unigeek-firmware
- stick-firmware
- saturn
- bruce-firmware
- highboy-firmware
- m5-keyboard-and-mouse-emulator
---

M5_Crystal is a versatile and extensible firmware designed specifically for the M5Stack ecosystem, targeting devices such as the M5StickCPlus2 and the Cardputer-ADV. It provides a comprehensive suite of utilities ranging from network security testing to daily productivity tools, all packed into a portable form factor.


## Versatile Feature Set

The firmware is organized into several functional domains, making it a Swiss-army-knife tool for developers and enthusiasts:

*   **Wi-Fi Capabilities**: The system includes a Wi-Fi scanner, deauthentication tools, weather reporting, and network information displays. It also supports time synchronization and standard Wi-Fi connection management.
*   **NFC Interaction**: By leveraging the PN532 module, the firmware can read and write UIDs, enabling basic interaction with NFC tags.
*   **Bluetooth and HID**: The Bluetooth suite is particularly robust, offering BLE scanning and "BAD BLE" functionality powered by LittleFS. It also allows the device to act as a gyro-based mouse or keyboard, a media presenter, or a remote camera shutter for phones.
*   **System Utilities**: Beyond connectivity, it includes a clock, flashlight, battery monitor, level tool (utilizing the onboard gyroscope), and a sound meter.
*   **Global Support**: To accommodate a wide user base, the interface is localized into seven languages: English, Italian, Spanish, Indonesian, German, Russian, and Ukrainian.

## Installation and Deployment

There are multiple ways to deploy M5_Crystal to a supported device. The most user-friendly method is via **M5Burner**, the official firmware management tool from M5Stack. Users can simply select the STICK or CARDPUTER category, search for the firmware by name, and burn it directly to their hardware over USB.

For developers or those who prefer manual control, the project supports building from source. This can be done using the Arduino CLI or within VS Code using the Arduino Community Edition extension. The repository includes detailed configuration examples and documentation for flashing binary files directly.

## Design Philosophy and Architecture

M5_Crystal is built following the KISS (Keep It Simple, Stupid) principle. The software architecture is designed to be extremely structured yet simple to navigate. 

![Firmware architecture](/202605/m5stick_crystal_firmware_1.avif)

Central to this design is the use of custom wrappers. These wrappers abstract the complexities of the user interface and hardware interaction, allowing developers to focus entirely on the logic of new "programs" or features. This approach effectively turns the firmware into a framework for M5Stack development. Adding a new function is as simple as creating a new entry in the `functions/` folder and following the established wrapper patterns. 

## Technical Foundation

The project relies on several key libraries to manage the hardware and communication protocols:
*   **M5Unified & M5GFX**: These serve as the core hardware abstraction layers, ensuring the firmware can run across different M5Stack hardware revisions with minimal changes.
*   **ESP32-BLE-Combo**: This facilitates the advanced Bluetooth HID features, allowing the device to emulate various peripherals.
*   **Adafruit PN532**: Used for interfacing with the NFC hardware.
*   **U8g2**: Provides high-quality graphics and font support for the display.
*   **LittleFS**: Manages the internal file system for storing BLE payloads and system settings.

## Maintenance and Extensibility

The project is actively maintained with a focus on structured development. This includes the use of Process IDs (PIDs) to categorize functions and a rigorous approach to documentation. Recent updates have improved the level tool based on gyroscope data, added more NFC features, and expanded device support. The modular nature of the code ensures that as new M5Stack hardware is released, the firmware can be adapted to support new sensors or display configurations.
