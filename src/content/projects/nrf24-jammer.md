---
title: nRF24 Jammer
summary: An ESP32-based RF interference tool utilizing multiple nRF24L01 modules to
  disrupt signals including Bluetooth, Wi-Fi, and Zigbee. It features a web-based
  control interface, serial terminal support, and optional OLED display integration
  for standalone operation.
slug: nrf24-jammer
codeUrl: https://github.com/W0rthlessS0ul/nRF24_jammer
star: 515
version: V3.1.0
lastUpdated: '2026-02-25'
rtos: freertos
libraries:
- u8g2
- spiffs
topics:
- ble
- bluetooth
- esp32
- jammer
- nrf24
- wifi
isShow: true
image: /202603/nrf24_jammer.webp
createdAt: '2026-03-06'
updatedAt: '2026-03-06'
---

The nRF24 Jammer is a specialized firmware for the ESP32 microcontroller designed to explore and demonstrate RF interference in the 2.4GHz spectrum. By leveraging the capabilities of nRF24L01+PA+LNA modules, this project can effectively disrupt various wireless technologies, including Bluetooth, Wi-Fi, Zigbee, and drone control signals. It serves as a powerful tool for security researchers and hobbyists interested in radio frequency behavior and signal integrity.

One of the standout features of this project is its scalability. The system is designed to work with a configurable number of nRF24 modules—ranging from a single unit up to five. These modules share the same SPI bus (SCK, MOSI, MISO) while using dedicated Chip Enable (CE) and Chip Select Not (CSN) lines. This multi-module architecture allows for high-density signal disruption across multiple channels or protocols simultaneously, significantly increasing the effectiveness of the jamming compared to single-radio solutions.

### User Interface and Control

The project offers three distinct ways to interact with the device, making it versatile for both field use and laboratory testing:

*   **Standalone Interface:** For portable use, the firmware supports 128x32 or 128x64 OLED displays and tactile buttons. The system includes logic for different button configurations (1, 2, or 3 buttons) to navigate menus and select jamming targets. This allows users to cycle through modes like 'Bluetooth Jam', 'Wi-Fi Jam', or 'Misc Jam' without external hardware.
*   **Web Interface:** For remote operation, the ESP32 hosts a local Wi-Fi hotspot named `jammer`. Users can connect via a smartphone or laptop and navigate to a local IP address to access a graphical dashboard. This interface provides real-time control and status updates.
*   **Serial Interface:** A command-line interface is available via the USB port. By connecting to a serial terminal, users can issue commands and receive diagnostic information, which is particularly useful for debugging or automated testing scripts.

### Technical Implementation

Technically, the project is built using the Arduino framework on the ESP32 platform. It utilizes a modified version of the RF24 library to achieve the specific timing and packet injection required for effective jamming. The build process is managed via PlatformIO, which handles the complex environment configurations for different display types and hardware setups. 

The firmware also includes robust deployment features. Beyond standard serial flashing, it supports Over-The-Air (OTA) updates. Once a device is running version 1.9 or higher, users can upload new `firmware.bin` files directly through the web interface, simplifying the process of keeping the device updated with the latest features or security patches.

### Hardware and Assembly

The project is designed to be accessible to builders with basic soldering skills. The README provides detailed pinout tables for connecting up to five nRF24 modules to the ESP32's GPIOs. A critical component of the build is the inclusion of 100µF capacitors across the VCC and GND of the nRF24 modules to handle the power spikes associated with high-power radio transmission. This attention to hardware stability ensures that the jammer remains effective even when multiple modules are transmitting at peak power.
