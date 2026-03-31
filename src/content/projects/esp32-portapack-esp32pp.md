---
title: ESP32-Portapack (ESP32PP)
summary: An expansion module for the Portapack H4 and PortaRF that adds GPS, environmental
  sensors, and a web-based remote control interface. Built on the ESP-IDF framework
  with FreeRTOS, it integrates NimBLE Bluetooth and LwIP to provide features like
  signal geotagging, fox hunting assistance, and satellite tracking.
slug: esp32-portapack-esp32pp
codeUrl: https://github.com/htotoo/ESP32-Portapack
version: v0.33
lastUpdated: '2026-01-11'
licenses:
- NOASSERTION
image: /202603/ESP32-Portapack_0.avif
rtos: freertos
libraries:
- lwip
- nimble
topics:
- esp32
- esp32pp
- esp32s3
- external-port
- gps
- hackrf
- i2c
- lora
- otg
- portapack
- portarf
- remote-control
- wifi
isShow: true
createdAt: '2026-03-31'
updatedAt: '2026-03-31'
---

The HackRF Portapack has long been a favorite tool for software-defined radio (SDR) enthusiasts, providing a portable interface for signal analysis. However, many users find themselves wanting more integrated data, such as precise GPS coordinates for wardriving or environmental telemetry for field operations. The ESP32-Portapack (ESP32PP) project addresses these needs by introducing a versatile hardware addon module that communicates with the Portapack via I2C.

### Expanding the Portapack Ecosystem

At its core, ESP32PP acts as a bridge between the physical world and the SDR interface. By integrating an ESP32-S3 (or similar) microcontroller, the project brings modern connectivity and processing power to the HackRF platform. The module is designed to work natively with Portapack H4 and PortaRF hardware, and can even be adapted for H2 models with a hardware modification. 

The integration allows for a suite of new applications on the Portapack, including ADS-B tracking with live location data, a "Fox hunt" helper for signal direction finding, and satellite tracking (SatTrack). By providing real-time GPS and compass data, the module enables the Portapack to calculate relative positions of signals and geotag captured data—a vital feature for wardriving and weather balloon recovery.

### Advanced Web Interface and Remote Control

One of the most significant additions provided by the ESP32PP is its robust web interface. Utilizing the LwIP stack and the ESP32's Wi-Fi capabilities, the module can operate as a standalone Access Point or connect to an existing network. Through this interface, users can:

*   **Remote Control**: Navigate and control the Portapack interface from a browser.
*   **File Management**: Upload and download files directly to and from the Portapack's SD card.
*   **OTA Updates**: Perform over-the-air firmware updates for both the ESP32 module and the Portapack hardware itself.
*   **Sensor Monitoring**: View live data from the connected sensor suite, including temperature, humidity, and atmospheric pressure.

### Technical Architecture

The project is built using the Espressif IoT Development Framework (ESP-IDF), leveraging FreeRTOS for task management. The firmware is written in a mix of C and C++, organizing various hardware drivers into a modular structure. The source code includes support for a wide array of I2C sensors, such as the HMC5883L and LSM303 compasses, BMP280 pressure sensors, and SHT3x/SHT4x humidity sensors.

Communication between the ESP32 and the Portapack is handled through a specialized I2C slave driver and a shell communication protocol (`ppshellcomm.cpp`). This allows the ESP32 to push "On-system apps" to the Portapack, effectively extending the device's original firmware without requiring a total rewrite of the base system. 

### Connectivity and Future Growth

Beyond basic sensing, the project incorporates the NimBLE Bluetooth stack, opening the door for future mobile app integrations and low-energy peripheral connectivity. The inclusion of the SGP4 orbital model library allows the device to predict satellite passes locally, which, when combined with the GPS module, provides a high-accuracy tracking solution for amateur radio satellites.

While the project is in early development, it already supports a diverse range of standalone apps, such as a Wi-Fi SSID spoofer. Future plans include expanding the IR blaster capabilities and integrating LoRa support via Meshtastic, further cementing the ESP32-Portapack as an essential upgrade for serious SDR hobbyists.
