---
title: K3NG CW Keyer for ESP32 and Pico 2W
summary: An advanced Morse code keyer based on the K3NG project, ported to ESP32 and
  Raspberry Pi Pico 2W hardware. It features integrated Bluetooth keyboard support,
  high-resolution TFT touch displays, and GPS-based location tracking, utilizing dual-core
  processing to maintain precise keying timing.
slug: k3ng-cw-keyer-for-esp32-and-pico-2w
codeUrl: https://github.com/K7MDL2/K3NG_Keyer_ESP32_BT_Keyboard
lastUpdated: '2026-06-27'
rtos: freertos
libraries:
- tft-espi
topics:
- ble
- bt
- cw
- esp32
- esp32-wroom-32
- k3ng
- keyboard
- keyer
- morse
- pico2-w
- pico2w
- tft-display
isShow: true
image: /202607/keyboard.webp
createdAt: '2026-07-20T10:55:34+00:00'
updatedAt: '2026-07-20T10:55:34+00:00'
---

The K3NG CW Keyer has long been a staple in the amateur radio community, known for its incredible flexibility and a feature set that rivals high-end commercial hardware. This specific fork by K7MDL2 brings that power into the modern era by targeting the ESP32-WROOM32 and the Raspberry Pi Pico 2W. By leveraging these powerful microcontrollers, the project adds features previously difficult to implement on standard AVR-based Arduinos, such as Bluetooth keyboard support and high-resolution graphical interfaces.

### Modern Hardware and Dual-Core Performance

One of the most significant advantages of moving to the ESP32 and RP2350 platforms is the ability to use multi-core processing. In this implementation, the project strategically assigns tasks to different cores to ensure that the critical Morse code timing remains uninterrupted. On the ESP32, background tasks like GPS data processing, Bluetooth connection management, and touch-screen polling are offloaded to a specific core. This allows the main loop to handle keying logic with high precision, maintaining steady performance even at speeds up to 50 WPM.

### Bluetooth Keyboard Integration

A standout feature of this version is the integration of Bluetooth HID host capabilities. This allows the ESP32 to act as a host for wireless keyboards, such as the Logitech K380 or Rii i8+ mini. Operators can use these compact keyboards for CW input, effectively turning the keyer into a portable terminal for field operations. The project supports both Bluetooth Classic and BLE, though the ESP-IDF framework is recommended for the most stable Bluetooth Classic connectivity.

### Visual Interface and Touch Support

The keyer supports a wide variety of TFT displays using the `TFT_eSPI` library, with resolutions ranging from 320x170 to 480x320. For displays equipped with GT911 or XPT2046 touch controllers, the firmware provides interactive on-screen buttons. A comprehensive status bar is also included, displaying real-time information such as:

- Maidenhead Grid Square (up to 8 characters)
- Callsign and WPM rate
- T/R (Transmit/Receive) status icons
- Memory contents via popup windows

### Expanded I/O and Sensor Support

To address the high I/O demands of graphical displays, the project incorporates the MCP23017 I2C port expander. This allows the paddles and straight keys to be handled via interrupts on the expander pins, saving local GPIO for high-speed display communication. Beyond simple keying, the firmware can interface with serial GPS modules to automatically update time and location data. It even supports I2C compasses (like the IST8310) to display heading values, a useful feature for operators aiming microwave antennas in the field.

### Development and Deployment

While the project is compatible with the Arduino IDE, the preferred development environment is the Espressif IoT Development Framework (ESP-IDF). Using ESP-IDF allows for better management of the Bluetooth stack and multi-tasking components. For users who prefer a plug-and-play experience, the repository provides precompiled firmware images (including UF2 files for the Pico) tailored to specific display models, eliminating the need for a complex local build environment.
