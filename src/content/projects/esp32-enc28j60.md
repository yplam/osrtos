---
title: ESP32-ENC28J60
summary: A specialized Ethernet library for the ESP32 platform that provides driver
  support for the ENC28J60 SPI Ethernet controller. It leverages the standard Arduino
  ESP32 Ethernet API, allowing developers to use familiar networking functions with
  low-cost SPI Ethernet hardware.
codeUrl: https://github.com/tobozo/ESP32-ENC28J60
isShow: false
rtos: freertos
libraries:
- lwip
topics:
- arduino
- arduino-ethernet
- arduino-library
- enc28j60
- esp32
- ethernet
- lwip
star: 41
version: v2.0.1
lastUpdated: '2024-06-18'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- webserver-esp32-enc
- webserver-esp32-w5500
- wiznetinterface-library
- esp32-smartdisplay
- asynchttprequest-esp32-ethernet
- asyncwebserver-esp32-sc-enc
---

The ESP32-ENC28J60 library is a targeted solution for developers looking to add wired networking to their ESP32 projects using the popular and inexpensive ENC28J60 SPI Ethernet controller. While the ESP32 features a built-in MAC that supports RMII-based Ethernet PHYs (like the LAN8720), many modular components and hobbyist boards utilize the ENC28J60, which communicates over the SPI bus. This library bridges that gap by providing a familiar Arduino-compatible interface for this specific hardware.

### Technical Foundation
This library is essentially a specialized fork of the official [esp32-arduino Ethernet Library](https://github.com/espressif/arduino-esp32/tree/master/libraries/Ethernet). The author has streamlined the codebase by removing support for other board types and focusing exclusively on the ENC28J60. 

At its core, the low-level driver implementation is derived from the `eth_enc28j60` component found in the official Espressif IoT Development Framework (ESP-IDF). By wrapping these low-level C drivers into the Arduino `ETH` class, the library allows users to use standard networking tools like `HTTPClient` and `WiFiClient` over a wired connection with minimal code changes.

### Hardware Integration
Because the ENC28J60 is an SPI device, it requires specific pin assignments for MISO, MOSI, SCLK, and CS, along with an interrupt pin (INT). The library is flexible and supports various ESP32 variants, including the standard ESP32 and the ESP32-C3. 

Typical pin configurations often look like this for a standard ESP32:
- **MISO**: GPIO 12
- **MOSI**: GPIO 13
- **SCLK**: GPIO 14
- **CS**: GPIO 15
- **INT**: GPIO 4

### Using the Library
The library integrates seamlessly with the ESP32's event system. Developers can monitor Ethernet events such as `ARDUINO_EVENT_ETH_START`, `ARDUINO_EVENT_ETH_CONNECTED`, and `ARDUINO_EVENT_ETH_GOT_IP` using the standard `WiFiEvent` callback mechanism. This makes it easy to write robust applications that react to cable unplugging or DHCP lease assignments.

Here is a basic example of how the library is initialized in an Arduino sketch:

```cpp
#include <ESP32-ENC28J60.h>

#define INT_GPIO 4
#define CS_GPIO  15

void setup() {
  Serial.begin(115200);
  // The ETH object is provided by the library
  // Initialization parameters: CS Pin, SPI Host, INT Pin, SPI Clock (MHz)
  ETH.begin( CS_GPIO, 1, INT_GPIO, 8 );
}

void loop() {
  if (ETH.linkUp()) {
    Serial.printf("Ethernet Link is Up. IP: %s
", ETH.localIP().toString().c_str());
  }
  delay(5000);
}
```

### Advanced Features and Compatibility
Beyond simple web requests, the repository includes examples for more complex scenarios, such as Firmware Over-The-Air (FOTA) updates. By combining this library with others like `esp32FOTA` and `ESP32-targz`, developers can implement secure, compressed firmware updates over a wired Ethernet connection.

For users of PlatformIO, the library is easily integrated via the `lib_deps` configuration. The project maintainer recommends using specific versions of the Arduino-Espressif32 framework (such as 2.0.5 or later) to ensure stability, as Ethernet support in earlier versions of the ESP32 Arduino core was known to be inconsistent.

Whether you are building an industrial gateway or a home automation node where Wi-Fi is unreliable, the ESP32-ENC28J60 library provides a stable, well-integrated path to adding robust wired connectivity to your ESP32-based hardware.
