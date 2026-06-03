---
title: Blynk_Async_ESP32_BT_WF
summary: An advanced ESP32 library that enables simultaneous or runtime-selectable
  Blynk connections via WiFi, Bluetooth, and BLE. It leverages asynchronous web servers
  for a non-blocking configuration portal and supports multi-credential management
  with storage in SPIFFS, LittleFS, or EEPROM.
codeUrl: https://github.com/khoih-prog/Blynk_Async_ESP32_BT_WF
siteUrl: https://github.com/khoih-prog/Blynk_Async_ESP32_BT_WF
isShow: false
rtos: ''
libraries:
- littlefs
- spiffs
topics:
- asyncwebserver
- ble
- bluetooth
- bluetooth-low-energy
- blynk-iot-platform
- blynk-library
- config-portal
- dhcp
- dynamic-parameters
- eeprom
- esp32
- esp8266
- iot
- multiblynk
- multiwifi
- spiffs
- staticip
- wifimanager
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- blynk-async-wm
- blynk-async-gsm-manager
- blynk-wifimanager
- blynkgsm-manager
- blynk-wifinina-wm
- blynk-esp8266at-wm
---

Managing connectivity on the ESP32 can often feel like a series of trade-offs. Traditionally, Blynk users had to choose between WiFi or Bluetooth/BLE at compile time, requiring firmware updates just to switch communication methods. The **Blynk_Async_ESP32_BT_WF** library changes this dynamic by allowing developers to include both WiFi and BT/BLE stacks in a single sketch, enabling them to run simultaneously or be selected at runtime.

### Why Asynchronous Matters
At the heart of this library is the use of asynchronous networking via `ESPAsyncWebServer`. Unlike standard synchronous servers that block execution while waiting for a client response, an asynchronous approach allows the ESP32 to handle multiple connections at once. This results in significantly higher speeds and a more responsive system. When the server sends a response, it happens in the background, leaving the main loop free to handle critical sensor readings or motor controls. This is particularly vital for real-time applications where timing is everything.

### Smart Configuration and Dynamic Parameters
One of the most powerful features of this library is the elimination of hardcoded credentials. By using a 'Smart Config Portal,' users can save WiFi SSIDs, passwords, and Blynk tokens directly into the ESP32's flash memory (using SPIFFS, LittleFS, or EEPROM). 

If the device cannot connect to a known network within a specified timeout, it automatically enters Configuration Mode, acting as an Access Point. Users can then connect to this AP via a smartphone or laptop to input new credentials through a web interface. The library also supports dynamic custom parameters, allowing you to define fields for things like MQTT server addresses or API keys directly within the portal.

### Hardware and Storage Support
The library is specifically designed for ESP32-based boards. It provides robust support for various file systems to store configuration data:
- **LittleFS**: The modern, resilient choice for flash wear leveling.
- **SPIFFS**: The legacy flash file system.
- **EEPROM**: For simple data persistence.

It also integrates with the `ESP_DoubleResetDetector`, allowing users to force the device into configuration mode simply by tapping the reset button twice.

### Getting Started
To use the library, you typically include the specific header for your desired mode, such as `BlynkSimpleEsp32_Async_BLE_WF.h`. Below is a snippet showing how the library handles the selection between BLE and WiFi based on a physical pin state:

```cpp
#include "defines.h"
#include <BlynkSimpleEsp32_Async_BLE_WF.h>

void setup() {
  // Check a physical pin to decide between WiFi or BLE
  if (digitalRead(WIFI_BLE_SELECTION_PIN) == HIGH) {
    // Start WiFi with Config Portal support
    Blynk_WF.begin("My-ESP32-Device");
  } else {
    // Start BLE mode
    Blynk_BLE.begin(auth_token);
  }
}

void loop() {
  if (USE_BLE)
    Blynk_BLE.run();
  else
    Blynk_WF.run();
}
```

### Reliability with MultiWiFi and MultiBlynk
For high-reliability projects, the library supports MultiWiFi and MultiBlynk features. It can automatically detect and connect to the best available WiFi Access Point or failover to a secondary Blynk server if the primary one is unreachable. Because the connection calls are non-blocking, your `loop()` function continues to execute even during reconnection attempts, ensuring that your local logic remains active regardless of the network state.
