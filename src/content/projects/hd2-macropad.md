---
title: HD2 Macropad
summary: An ESP32-S3 based touchscreen macropad designed for Helldivers 2, providing
  live stratagem configuration and loadout management. It utilizes FreeRTOS, LVGL,
  and the TinyUSB stack to function as a versatile HID keyboard interface for PC and
  PlayStation.
slug: hd2-macropad
codeUrl: https://github.com/unic8s/hd2_macropad
version: v1.7.0
lastUpdated: '2026-04-06'
licenses:
- NOASSERTION
image: /202604/hd2_macropad.webp
rtos: freertos
libraries:
- lvgl
- littlefs
topics:
- ble-hid
- capacitive-touch
- esp-idf-framework
- esp32-idf
- esp32-s3
- helldivers2
- i2s-audio
- lvgl-esp32
- macropad
- platformio
- playstation
- squareline
- usb-hid
- vscode
- xbox
isShow: true
createdAt: '2026-04-07T23:24:43+00:00'
updatedAt: '2026-04-07T23:24:43+00:00'
---

The HD2 Macropad is a highly flexible, easy-to-use peripheral designed specifically for HELLDIVERS 2. It allows players to manage live configurations and individual loadouts on each drop into combat, streamlining the process of calling in stratagems through a dedicated capacitive touchscreen interface.

Built on the affordable JC3248W535 IoT platform, the device serves as a bridge between the player and the game by acting as a standard keyboard input device. It supports connections via both Bluetooth and USB, making it a versatile tool for both PC and PlayStation enthusiasts.

## Connectivity and Platform Support

The device is designed to work seamlessly with PC and PlayStation systems. For PC users, the macropad can connect via Bluetooth or USB to provide immediate keyboard emulation. When used with a PlayStation, the device currently requires a USB connection. To enhance this experience, development is underway for a BT2USB bridge that will allow the HD2 Macropad to connect to the console wirelessly via a dedicated USB dongle.

## User Interface and Configuration

The software environment is built using the LVGL graphics library and the EEZ-framework, providing a responsive and visually rich interface. The system features several distinct modes and screens to assist players during gameplay:

### Customization and Presets

Players can configure the device through a comprehensive setup and configuration menu. This allows for the selection of user-defined icons and the organization of stratagems into specific presets. The configuration interface ensures that the macropad can be tailored to match different playstyles or specific mission requirements.

![Device configuration and setup menu](/202604/hd2_macropad_0.avif)

### Combat and Mission Management

During active gameplay, the macropad displays a grid of stratagems, allowing for one-touch activation of complex key sequences. This minimizes the time spent on manual input during high-intensity combat encounters. The mission view provides a streamlined look at the current loadout, ensuring the right tools are always visible.


![Mission-specific loadout interface](/202604/hd2_macropad_4.avif)

## Versatile Deployment

Beyond desktop use, the macropad's design allows for creative physical mounting. Its compact form factor and responsive touch controls make it suitable for wrist-mounting, a popular option for cosplayers or players seeking a more immersive "diving" experience.

![Macropad mounted on a wrist for cosplay and immersion](/202604/hd2_macropad_5.avif)

## Technical Foundation

The firmware is developed using the Espressif IoT Development Framework (ESP-IDF) and is compatible with PlatformIO. It relies on the TinyUSB stack to handle HID device functionality and LittleFS for robust data storage. The project integrates several community resources, including high-quality SVG icon sets and hardware-specific demo projects, to deliver a polished and functional gaming accessory.
