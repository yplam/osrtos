---
title: Multi-Firmware-ESP
summary: A custom bootloader for the ESP32 that enables switching between multiple
  firmware versions using hardware switches. It integrates Over-The-Air (OTA) update
  capabilities and the ESP-Serial-Flasher library to facilitate remote firmware management
  and master-slave device flashing.
slug: multi-firmware-esp
codeUrl: https://github.com/SurajSonawane2415/multi-firmware-esp
lastUpdated: '2025-06-19'
image: /202605/multi-firmware-esp_0.avif
rtos: freertos
libraries:
- lwip
topics:
- bootloader
- embedded-c
- ota-update
isShow: true
createdAt: '2026-05-18T06:27:18+00:00'
updatedAt: '2026-05-18T06:27:18+00:00'
relatedProjects:
- esp32-ble-ota-arduino
- esp32-ota-firmware-update-and-file-management
- dual-boot-esp32-with-platformio-and-arduino
- esp32-graphical-bootloader
- bleota-esp32-ota-updates-over-ble
- tab5-launcher
---

The ESP32 is a versatile microcontroller for IoT applications, but standard firmware deployments are often limited to a simple A/B update scheme. Multi-Firmware-ESP expands these capabilities by implementing a custom bootloader that allows users to navigate between multiple firmware versions stored on the device's flash memory using physical hardware switches. Developed using the ESP-IDF framework, this project provides a robust solution for developers needing to host multiple distinct applications on a single chip.

### The Custom Bootloader Mechanism

In the ESP32 architecture, the second-stage bootloader is responsible for hardware initialization and selecting the application partition to load into RAM. This project introduces a custom bootloader override that intercepts the standard boot process. By reading the state of specific GPIO pins (switches) during the bootloader stage, the system can dynamically select which firmware partition to execute. This allows a single device to serve multiple roles—such as a diagnostic tool, a sensor node, or a configuration portal—depending on the physical toggle state at power-up.

### Over-The-Air Updates and Partitioning

To manage multiple firmware images, the project utilizes custom partition tables. Unlike standard configurations, this setup defines multiple app slots (e.g., `ota_0`, `ota_1`) and an OTA data partition. The system leverages the ESP-IDF OTA mechanism to receive firmware updates over Wi-Fi, ensuring that the device can be updated remotely without physical access. 

One of the standout features is the integration of the `esp-serial-flasher` library. This allows for a master-slave configuration where a "Master ESP" can flash firmware to a "Second ESP" over the air. The Master ESP hosts a file server that accepts new binaries and then streams them to the target device via a serial interface.

### Technical Hardware Configuration

For the master-slave serial flashing workflow, specific hardware connections are required to allow the master device to control the slave's boot state and reset lines:

| ESP32 (Master) | ESP32 (Slave) |
| :---: | :---: |
| IO26 | IO0 |
| IO25 | RESET |
| IO4 | RX0 |
| IO5 | TX0 |

This wiring allows the Master ESP to pull IO0 low and toggle the Reset pin to put the Slave ESP into bootloader mode, facilitating the flashing process over the serial pins.

### Development and Integration

The project is built on the ESP-IDF (Espressif IoT Development Framework) and relies on FreeRTOS for task scheduling and LwIP for network stack management. The repository is structured to separate the OTA update logic from the custom bootloader components, making it easier for developers to adapt specific parts of the code for their own projects. 

Future iterations of the project aim to move the OTA update mechanism directly into the bootloader stage. This enhancement would allow the device to download and flash multiple firmwares autonomously, eliminating the need for a Master ESP in the deployment chain and further streamlining the multi-firmware management process.
