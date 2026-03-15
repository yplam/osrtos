---
title: Daeva RF Cybersecurity Tool
summary: An ESP32-based cybersecurity tool designed for scanning, capturing, and replaying
  RF signals in the Sub-GHz range. It supports multiple frequency bands including
  315, 433, 868, and 915 MHz, providing a portable platform for signal analysis and
  security testing.
slug: daeva-rf-cybersecurity-tool
codeUrl: https://github.com/cifertech/Daeva
siteUrl: https://cifertech.net/daeva-your-subghz-replay-attack-gadget-for-rf-hacking/
star: 184
version: Daevav1.0
lastUpdated: '2024-06-25'
rtos: freertos
topics:
- cc1101
- esp32
- replay-attack
- sub1ghz
isShow: true
image: /202603/daeva.webp
createdAt: '2026-03-15'
updatedAt: '2026-03-15'
---

Daeva is a versatile, open-source cybersecurity tool specifically engineered for RF signal manipulation. Built around the powerful ESP32 microcontroller, it serves as a portable Swiss Army knife for security researchers and hobbyists interested in Sub-GHz frequencies. The project focuses on the most common bands used in remote controls, sensors, and IoT devices: 315 MHz, 433 MHz, 868 MHz, and 915 MHz.

The core functionality of Daeva revolves around two primary modes: RF Scanning and Replay Attacks. In scanning mode, the device detects ambient signals and provides graphical feedback to the user, allowing for real-time environment monitoring. The replay attack feature enables the device to capture a specific RF signal and retransmit it, effectively mimicking the original source—a common technique used to test the security of wireless entry systems and remote switches.

### Hardware Architecture

From a hardware perspective, Daeva utilizes the ESP32-WROOM-32U module, which provides the necessary processing power and wireless connectivity. The design incorporates a micro SD card slot for data logging and future firmware updates. User interaction is handled through a combination of five SMD microswitches and a rotary encoder, allowing for intuitive menu navigation on an integrated display. 

Power management is robust, featuring an LF33 regulator and a TP4056 charging controller to support battery-powered operation. This makes the device entirely portable for field use. Visual feedback is enhanced by a NeoPixel LED, which can be programmed to indicate different states of signal capture or transmission.

### Software and Libraries

The software stack leverages several specialized libraries to interface with the RF hardware and manage the user interface. It utilizes the `SmartRC-CC1101-Driver-Lib` for low-level communication with the radio transceiver, while the menu system is built upon the `arduino_oled_menu` framework. This combination allows for a responsive UI and precise control over the radio parameters. Because it is built on the ESP32, the system benefits from the underlying FreeRTOS scheduler, ensuring that UI responsiveness and signal processing can happen concurrently.

### Key Features

- **RF Scanning**: Detects and displays frequencies in the environment with two graphical representation options for better signal visualization.
- **Replay Attack**: Captures and retransmits RF signals to replicate original actions, useful for auditing the security of fixed-code or simple rolling-code systems.
- **Multi-Band Support**: Operates across 315, 433, 868, and 915 MHz ranges.
- **Compact Design**: Optimized PCB layout using the ESP32 Wroom 32u for a small form factor.
- **Expandable Storage**: Includes a Micro SD card slot for future data-heavy updates and signal logging.

Daeva is designed with portability and efficiency in mind, making it an ideal tool for field testing. Whether you are analyzing the security of a garage door opener or exploring the RF landscape of a smart home, Daeva provides the necessary tools in a compact, DIY-friendly package.
