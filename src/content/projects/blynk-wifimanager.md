---
title: Blynk_WiFiManager
summary: A powerful WiFi and Blynk configuration library for ESP8266 and ESP32 that
  eliminates hardcoded credentials. It provides a web-based portal for runtime configuration
  of multiple WiFi APs and Blynk tokens, supporting SSL and various storage backends
  like LittleFS and SPIFFS.
codeUrl: https://github.com/khoih-prog/Blynk_WM
siteUrl: https://github.com/khoih-prog/Blynk_WM
isShow: false
rtos: ''
libraries:
- littlefs
- spiffs
topics:
- autoreconnect
- blynk
- blynk-connection
- blynk-credentials
- blynk-server
- blynk-wm
- dynamic-parameters
- eeprom
- eeprom-size
- esp32-library
- esp8266-library
- multi-blynk
- multi-wifi
- non-blocking
- spiffs
- spiffs-support
- ssl
- wifi
- wifimanager
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- blynk-wifinina-wm
- blynk-async-wm
- blynk-esp8266at-wm
- blynk-async-gsm-manager
- blynkgsm-manager
- blynk-async-esp32-bt-wf
---

Developing IoT applications for the ESP8266 and ESP32 often involves a frustrating cycle of hardcoding WiFi credentials, flashing the device, and then realizing you need to move the hardware to a different network. **Blynk_WiFiManager (Blynk_WM)** is a library designed to break this cycle by providing a robust, runtime configuration interface for both WiFi and Blynk credentials.

### The Problem with Hardcoding
Most standard Blynk examples require you to define your `auth[]`, `ssid[]`, and `pass[]` directly in the source code. This approach is brittle; if the WiFi password changes or you want to switch Blynk servers, you must reflash the firmware. Blynk_WM solves this by implementing a "Configuration Portal." If the device cannot connect to a known network, it automatically starts its own Access Point. Users can connect to this AP via a smartphone or laptop, open a web browser, and enter new credentials through a clean, user-friendly interface.

### Key Features and Capabilities
Blynk_WM isn't just a simple wrapper; it adds significant enterprise-grade features to the standard Blynk experience:

*   **MultiWiFi & MultiBlynk:** The library can store and attempt connections to multiple WiFi Access Points and multiple Blynk servers. It will automatically connect to the best available option, ensuring high reliability for critical IoT nodes.
*   **Flexible Storage:** Configuration data can be saved to **LittleFS**, **SPIFFS**, or **EEPROM**. This flexibility allows developers to choose the most modern and reliable file systems available on the ESP platform.
*   **Security:** Full support for SSL/TLS connections is included, which is vital for modern IoT security standards.
*   **Reset Detection:** By integrating with `DoubleResetDetector` or `MultiResetDetector`, the library can force the device into configuration mode if the user toggles the power or reset button multiple times in quick succession.
*   **Dynamic Parameters:** Beyond just WiFi and Blynk tokens, you can define custom parameters—such as MQTT server addresses, port numbers, or API keys—that can be configured through the same web portal.

### Hardware Support
The library is highly optimized for the Espressif ecosystem, supporting:
*   **ESP8266** (NodeMCU, Wemos D1 Mini, etc.)
*   **ESP32** (DevKit, Pico, etc.)
*   **ESP32-S2** and **ESP32-C3**

### Getting Started
Using Blynk_WM is designed to be a drop-in replacement for standard Blynk headers. Instead of including `BlynkSimpleEsp32.h`, you would use `BlynkSimpleEsp32_WM.h`. 

```cpp
#include <BlynkSimpleEsp32_WM.h>

void setup() {
  // Optional: Set a custom configuration portal SSID
  Blynk.setConfigPortal("MyDevice-Config", "password123");

  // Start the Blynk_WM logic
  // This will either connect to saved WiFi or start the Config Portal
  Blynk.begin("My-Personalized-Hostname");
}

void loop() {
  Blynk.run();
}
```

### Advanced Customization
For developers looking to provide a branded experience, Blynk_WM allows for extensive customization of the web portal. You can inject custom HTML styles, head elements, and even CORS headers. This allows the configuration page to match the aesthetic of your specific project or company branding. Additionally, the library supports an "Auto-Scan" feature, which populates a dropdown list of available WiFi networks in the portal, reducing the chance of user typos during setup.

By moving credentials out of the code and into persistent storage via a user-friendly portal, Blynk_WM transforms a prototype into a deployable product that end-users can manage themselves without ever touching an IDE.
