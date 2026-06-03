---
title: ESP32 Bit Pirate
summary: ESP32 Bit Pirate is an open-source firmware that transforms ESP32-S3 development
  boards into multi-protocol hardware hacking tools. It provides extensive support
  for digital protocols like I2C, SPI, and UART, as well as radio communications including
  Wi-Fi, Bluetooth, and Sub-GHz, utilizing FreeRTOS and LittleFS for robust device
  interaction.
slug: esp32-bit-pirate
codeUrl: https://github.com/geo-tp/ESP32-Bit-Pirate
siteUrl: https://geo-tp.github.io/ESP32-Bit-Pirate/webflasher/
version: v1.5
lastUpdated: '2026-05-19'
licenses:
- MIT
image: /202605/ESP32-Bit-Pirate_5.avif
rtos: freertos
libraries:
- littlefs
- lwip
- nimble
topics:
- arduino
- bluetooth
- can-bus
- debugging
- eeprom
- esp32
- flipperzero
- gpio
- hardware-hacking
- i2c
- jtag
- protocols
- pwm
- radio
- rfid
- spi
- subghz
- uart
- wifi
isShow: true
createdAt: '2026-05-20T08:43:02+00:00'
updatedAt: '2026-05-20T08:43:02+00:00'
relatedProjects:
- esp32-bus-pirate
- esp-hack-fw
- unigeek-firmware
- esp32-bus-expander
- beamstalker
- bruce-firmware
---

### Multi-Protocol Hardware Hacking

Inspired by the legendary Bus Pirate, the ESP32 Bit Pirate is a versatile firmware designed to turn standard ESP32-S3 hardware into a comprehensive tool for interacting with digital and radio protocols. It enables users to sniff, send, script, and analyze data across a vast array of interfaces. Whether communicating via a traditional serial terminal or a modern web-based CLI, the tool provides deep access to I2C, UART, 1-Wire, SPI, and more. Beyond wired connections, it extends into the wireless realm, supporting Bluetooth, Wi-Fi, Sub-GHz, and RFID protocols.

### Feature-Rich Protocol Support

The firmware is packed with specialized modes for different interaction types. For wired debugging, it includes modes for HiZ, I2C (with scanning and glitching capabilities), SPI (supporting EEPROM and SD card operations), and various UART configurations. It also handles niche protocols such as 1-Wire for iButtons, 2-Wire for smartcards, and JTAG/SWD for debugging other microcontrollers.

For radio and signal analysis, the ESP32 Bit Pirate offers tools for Infrared recording (supporting over 80 protocols), Bluetooth LE sniffing and spoofing, and Wi-Fi network analysis. It can even handle CAN bus frames, I2S audio testing, and Sub-GHz signal replay. Data management is handled efficiently using LittleFS over HTTP, allowing for easy import and export of captured data.

### Supported Hardware Platforms

The firmware is optimized for the ESP32-S3 architecture and supports a variety of popular development kits and handheld devices. Notable targets include the M5Stack Cardputer, which offers a standalone experience with its built-in keyboard and screen, and the M5Stick S3. It also supports various LILYGO T-Display and T-Embed boards, as well as the Seeed Studio Xiao S3. Generally, any ESP32-S3 board with at least 8MB of flash can run the firmware, though pin mappings may require adjustment for custom hardware.

### Getting Started and Automation

Installation is streamlined through a dedicated Web Flasher, allowing users to burn the firmware directly from a browser. Once flashed, the device can be accessed via USB Serial or by configuring Wi-Fi to use the web-based CLI. For advanced users, automation is a core capability; the system supports scripting using Bus Pirate-style bytecode or Python scripts over serial, making it possible to automate tasks like EEPROM dumping or digital I/O logging.

### Hardware Extensions: Expander and Dock

To further increase its utility, the project includes hardware extension designs. The **ESP32 Bus Expander** adds support for additional radio interfaces, such as 5GHz Wi-Fi. For those who already own original Bus Pirate accessories, the **ESP32 Bit Pirate Dock** provides a physical bridge for the ESP32 S3 DevKit, allowing it to interface with existing Bus Pirate adapters and probes.

![The ESP32 Bit Pirate dock board for Bus Pirate accessories](/202605/ESP32-Bit-Pirate_7.avif)

### Versatile Command-Line Interfaces

Interaction with the firmware is possible through three distinct interfaces. The **Serial Interface** provides the fastest performance and most responsive handling of large data streams, ideal for intensive debugging. The **Web Interface** offers cable-free convenience, making the tool accessible from mobile devices or tablets over Wi-Fi. Finally, the **Standalone Mode** is tailored specifically for the M5Stack Cardputer, utilizing its integrated hardware for portable, on-the-go hacking sessions.

![An iPhone screenshot showing the Bit Pirate firmware web interface](/202605/ESP32-Bit-Pirate_8.avif)

### Safety and Usage Warnings

Users must exercise caution regarding voltage levels, as the ESP32-S3 operates at 3.3V or 5V; connecting peripherals with higher voltage levels can cause permanent hardware damage. Furthermore, this firmware is intended strictly for educational, diagnostic, and authorized testing purposes. Users are responsible for ensuring their RF transmissions and signal manipulations comply with local laws and regulations.
