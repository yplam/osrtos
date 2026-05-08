---
title: Wi-Fi Setup for Raspberry Pi Pico W via USB Mass Storage
summary: This project provides a unique method for configuring Wi-Fi credentials on
  the Raspberry Pi Pico W by emulating a USB Mass Storage device. It uses a virtual
  FAT12 filesystem to map a text file directly to the microcontroller's flash memory,
  allowing users to set network settings without specialized software.
slug: wi-fi-setup-for-raspberry-pi-pico-w-via-usb-mass-storage
codeUrl: https://github.com/oyama/pico-msc-wifi-setting
lastUpdated: '2024-04-03'
licenses:
- MIT
rtos: ''
libraries:
- lwip
topics:
- raspberry-pi-pico-w
isShow: false
createdAt: '2026-05-07T23:43:27+00:00'
updatedAt: '2026-05-07T23:43:27+00:00'
---

Configuring Wi-Fi credentials on embedded devices often involves hardcoding strings, setting up a serial console, or creating a temporary Wi-Fi Access Point for a web-based captive portal. This project offers a simpler, more intuitive alternative by making the Raspberry Pi Pico W appear as a standard USB flash drive when connected to a computer.

### Virtual Filesystem and USB MSC

At the heart of the project is the USB Mass Storage Class (MSC) implementation, which is based on the TinyUSB library. Instead of using a physical SD card or a standard block device, the project emulates a FAT12 filesystem in software. This virtual disk contains a single file named `WIFI.TXT`.

When a user opens this file on their host computer, the firmware intercepts the read requests and serves data directly from a designated area in the Pico's flash memory. Conversely, when the user saves changes to the file, the firmware hooks into the write operations to update the flash memory with the new SSID and password. This approach eliminates the need for complex filesystem drivers while providing a familiar interface for the end-user.

### Technical Implementation

The project is built using the Raspberry Pi Pico SDK and targets the RP2040-based Pico W. It integrates several key components:

*   **TinyUSB**: Handles the USB device stack and the Mass Storage Class (MSC) interface.
*   **lwIP**: Provides the networking stack required for the Pico W's CYW43439 wireless chip.
*   **Flash Memory Access**: The project uses the `hardware_flash` and `hardware_sync` libraries from the Pico SDK to safely write the credentials to non-volatile storage.

By using the `pico_cyw43_arch_lwip_threadsafe_background` architecture, the project can manage networking tasks in the background while the main application or the USB stack handles user interaction.

### How It Works

Once the firmware is compiled into a `.uf2` file and loaded onto the Pico W, the device restarts and initializes as a USB drive. The user can simply:

1. Connect the Pico W to a PC via USB.
2. Open the drive that appears in the file explorer.
3. Edit `WIFI.TXT` with their network credentials.
4. Save the file.

The firmware detects the update to the virtual sectors, parses the text, and stores the configuration. On subsequent boots, the Pico W can read these stored credentials from flash and connect to the local network automatically.

This method is particularly useful for projects intended for non-technical users or for devices that will be deployed in environments where Wi-Fi credentials might change frequently, as it requires no special drivers or configuration tools beyond a standard text editor.
