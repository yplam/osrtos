---
title: Blynk_Esp8266AT_WM
summary: A comprehensive Blynk and WiFiManager library for ESP8266/ESP32 AT-command
  shields. It enables runtime WiFi configuration, multi-AP auto-reconnection, and
  dynamic parameter management across various platforms including AVR, SAMD, STM32,
  nRF52, and RP2040.
codeUrl: https://github.com/khoih-prog/Blynk_Esp8266AT_WM
isShow: false
rtos: ''
libraries:
- littlefs
topics:
- blynk
- blynk-credentials
- config-portal
- dhcp-hostname
- eeprom
- esp8266-shield
- flashstorage
- littlefs
- mega-boards
- multiwifi
- nrf52832
- nrf52840
- rp2040
- sam-due
- samd21
- samd51
- staticip
- stm32
- wifi-credentials
- wifimanager
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- blynk-wifinina-wm
- blynk-wifimanager
- blynk-async-gsm-manager
- blynkgsm-manager
- blynk-async-wm
- blynk-async-esp32-bt-wf
---

One of the most common frustrations in embedded development is the 'hardcoding' of network credentials. For developers using ESP8266 or ESP32 modules as AT-command shields for more powerful microcontrollers, updating a WiFi password often meant tethering the device back to a PC for a reflash. **Blynk_Esp8266AT_WM** is a library designed to eliminate this workflow by providing a robust WiFiManager and Blynk configuration portal for AT-command-based systems.

### Why Use This Library?

This library is more than just a simple connection utility; it is a full-featured management system for your IoT devices. It allows you to configure or reconfigure WiFi and Blynk credentials at runtime via a web-based Config Portal. If the device cannot find a known network, it automatically starts its own Access Point (AP). Users can then connect to this AP with a smartphone or laptop, navigate to a local IP address, and enter the new network details through a clean, user-friendly interface.

### Key Features and Capabilities

- **MultiWiFi Support**: The library can store multiple WiFi credentials and will automatically detect and connect to the best available Access Point. This is critical for mobile IoT devices or systems requiring high reliability.
- **DoubleResetDetector**: By detecting two reset button presses within a short window (default 10s), the library can force the device into Configuration Mode even if existing credentials are still valid.
- **Dynamic Parameters**: Developers can add custom fields to the Config Portal, such as MQTT server addresses, port numbers, or custom API keys, which are then saved to the device's non-volatile memory (EEPROM, LittleFS, or FlashStorage).
- **Broad Hardware Compatibility**: The library supports an extensive range of boards, including:
  - **AVR**: Mega 1280, 2560, ADK.
  - **SAMD**: Arduino Zero, MKR series, Nano 33 IoT, and Adafruit/Seeeduino SAMD21/SAMD51 boards.
  - **STM32**: F/L/H/G/WB/MP1 series.
  - **nRF52**: Adafruit Feather nRF52832/nRF52840 and Bluefruit Sense.
  - **Teensy**: 4.1, 4.0, 3.x.
  - **RP2040**: Raspberry Pi Pico using either the Earle Philhower or Arduino-mbed cores.

### How It Works

When the device boots, it attempts to connect to the stored WiFi networks. If it fails to connect within a specified timeout (usually 30 seconds), it enters `Configuration Mode`. The built-in LED turns on, and the device creates a WiFi AP named after the board (e.g., `Mega_XXXXXX`). 

Once a user connects to this AP and submits the form, the data is saved to the appropriate storage medium for that specific architecture—such as `LittleFS` on nRF52/RP2040 or `DueFlashStorage` on the SAM DUE. The device then reboots and attempts to connect using the new credentials.

### Getting Started

To integrate the library, you typically replace the standard Blynk shield header with the WiFiManager-enabled version. For example, on an Arduino Mega, you would replace `BlynkSimpleShieldEsp8266.h` with `BlynkSimpleShieldEsp8266_WM.h`.

```cpp
#include "BlynkSimpleShieldEsp8266_WM.h"

// Initialize the ESP8266 AT shield
ESP8266 wifi(&EspSerial);

void setup() {
  EspSerial.begin(ESP8266_BAUD);
  
  // Optional: Set a custom portal SSID and Password
  Blynk.setConfigPortal("MyDevice_Config", "password123");
  
  // Start the connection process
  Blynk.begin(wifi);
}

void loop() {
  Blynk.run();
}
```

### Ecosystem and Dependencies

The library relies on several high-quality dependencies to handle the heavy lifting of AT commands and web serving, specifically `ESP_AT_Lib` and `ESP8266_AT_WebServer`. Because it targets so many different architectures, it also utilizes various storage libraries like `FlashStorage_SAMD` and `FlashStorage_STM32` to ensure that your credentials survive power cycles regardless of the MCU you are using.
