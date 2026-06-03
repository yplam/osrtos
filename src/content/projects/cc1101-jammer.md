---
title: CC1101 Jammer
summary: An ESP32-based RF interference tool utilizing the CC1101 transceiver to disrupt
  signals in the 300-928 MHz range. It features a dual-interface system with support
  for physical OLED displays and buttons or a standalone Wi-Fi web interface for remote
  control.
slug: cc1101-jammer
codeUrl: https://github.com/W0rthlessS0ul/CC1101_jammer
star: 49
version: V1.5.0
lastUpdated: '2025-11-10'
rtos: freertos
topics:
- cc1101
- esp32
- jammer
isShow: false
createdAt: '2026-01-20'
updatedAt: '2026-01-20'
relatedProjects:
- nrf24-jammer
- esp32-2-4ghz-jammer
- esp32-bluejammer
- espnrf24-jammer
- esp32-bluetooth-signal-jammer
- c3mini-bluejammer
---

The CC1101 Jammer is an open-source firmware project designed for the ESP32 platform, leveraging the versatile CC1101 transceiver to explore the world of Sub-GHz radio frequency interference. By combining the processing power and Wi-Fi capabilities of the ESP32 with the wide-range frequency support of the CC1101, this project provides a portable and accessible tool for RF testing and signal disruption.

## Hardware Architecture

The project is built around two primary components: the ESP32 microcontroller (either the DevKitC or DevKit V1) and the CC1101 RF module. The CC1101 is a low-cost sub-1 GHz transceiver designed for very low-power wireless applications. In this implementation, it is configured to operate across a broad spectrum ranging from 300 MHz to 928 MHz. This range covers a significant portion of common consumer electronics, including garage door openers, wireless doorbells, and automotive key fobs.

For user interaction, the project supports two configurations. The standard version utilizes a 128x64 or 128x32 OLED display connected via I2C, along with three tactile buttons for navigation (OK, Next, and Previous). For users seeking a more streamlined build, a "Without OLED" version is available, which relies entirely on the web interface for control.

## Connectivity and Control

One of the standout features of this jammer is its integrated web interface. Upon startup, the ESP32 creates a local Wi-Fi access point named "jammer". Users can connect to this network using a predefined password and navigate to a local IP address (192.168.4.1) to control the device's functions through a browser. This allows for remote operation and provides a visual interface for managing jamming parameters without needing physical access to the device's buttons or display.

## Capabilities and Use Cases

The CC1101 Jammer is capable of disrupting signals across various modes, including spot jamming, range jamming, and frequency hopping. The project demonstrates its effectiveness through several operational modes:
- **Jam Spot**: Targeting a specific frequency.
- **Jam Range**: Sweeping across a range of frequencies.
- **Jam Hopper**: Utilizing frequency hopping patterns to disrupt agile signals.

While the current focus is on jamming, the project roadmap includes sophisticated additions such as recording and playback of RAW RF files, auto-tuning sampling intervals, integrated spectrum scanning, and RollJam capabilities for advanced security testing.

## Technical Setup

The firmware is distributed as pre-compiled binaries, making it easy to flash using web-based tools like ESPWebTool. The flashing process involves writing the bootloader, partition table, and the main application binary to specific memory addresses (0x1000, 0x8000, and 0x10000 respectively). 

Wiring the device is straightforward, utilizing the SPI interface for the CC1101 (SCK, MISO, MOSI, and CSN) and standard I2C pins for the optional OLED display. The project also utilizes GDO0 and GDO2 pins on the CC1101 for digital signal handling, mapped to ESP32 GPIOs 2 and 4. This hardware-level control allows the ESP32 to manipulate the CC1101 radio state with high precision.

## Conclusion

The CC1101 Jammer serves as a powerful example of how commodity hardware like the ESP32 can be repurposed for specialized RF tasks. Whether used for educational purposes to understand signal interference or for security auditing of Sub-GHz devices, it provides a robust foundation for RF experimentation and hardware hacking.
