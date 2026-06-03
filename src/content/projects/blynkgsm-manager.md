---
title: BlynkGSM_Manager
summary: An Arduino library for ESP32 and ESP8266 that enables simultaneous WiFi and
  GSM/GPRS connections to Blynk. It features a built-in web configuration portal for
  managing credentials and supports a wide array of GSM modems and storage options
  like LittleFS and SPIFFS.
codeUrl: https://github.com/khoih-prog/BlynkGSM_Manager
siteUrl: https://github.com/khoih-prog/BlynkGSM_Manager
isShow: false
rtos: ''
libraries:
- littlefs
- spiffs
topics:
- apn
- blynk-library
- blynk-server
- config-portal
- configuration-portal
- dynamic-parameters
- eeprom
- esp32
- esp8266
- gprs
- gprssim800
- gprssim900
- gsm-modems
- gsm-module
- gsm-shield
- spiffs
- tinygsm-library
- ttgo-tcall
- web-portal
- wifi
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- blynk-async-gsm-manager
- blynk-wifinina-wm
- blynk-wifimanager
- blynk-async-esp32-bt-wf
- blynk-async-wm
- blynk-esp8266at-wm
---

Managing connectivity in embedded systems often involves a trade-off between WiFi and Cellular (GSM/GPRS) options. Traditionally, developers had to choose one or hardcode credentials for both, making field updates a nightmare. **BlynkGSM_Manager** is a powerful library designed for ESP32 and ESP8266 modules that solves this by allowing both WiFi and GSM/GPRS to run simultaneously, managed through a dynamic web-based configuration portal.

### Why Simultaneous Connectivity Matters
In many IoT applications, reliability is paramount. A device might primarily use WiFi but need a GSM fallback if the local network fails. Conversely, a device might use GSM for data but require a WiFi configuration portal for initial setup. BlynkGSM_Manager provides the flexibility to run both stacks at once or select the preferred method at runtime. It eliminates the need to hardcode sensitive credentials like SSIDs, passwords, and Blynk Auth Tokens, storing them instead in non-volatile memory such as LittleFS, SPIFFS, or EEPROM.

### Key Features and Capabilities
- **Simultaneous Operation**: Run `Blynk_WF` (WiFi) and `Blynk_GSM` (Cellular) in the same sketch.
- **Dynamic Config Portal**: If the device cannot connect, it spawns an Access Point (AP) with a web server, allowing users to input network and Blynk credentials via a browser.
- **Multi-WiFi & Multi-Blynk**: The system can store multiple sets of credentials and automatically connect to the best available WiFi AP or Blynk server.
- **Wide Modem Support**: Compatible with a vast range of GSM modems including SIMCom (SIM800, SIM900, SIM7000, SIM7600), AI-Thinker (A6, A7), u-blox, and Quectel modules.
- **Reset Detection**: Integrates with DoubleResetDetector or MultiResetDetector to force the configuration portal open if the user toggles the power or reset button quickly.

### Technical Architecture
The library acts as a wrapper and manager around the standard Blynk and TinyGSM libraries. It provides specialized adapters for ESP32 and ESP8266 to handle the nuances of their respective network stacks. For storage, it supports modern filesystems like LittleFS, which is highly recommended for ESP8266 and newer ESP32 cores due to its robustness against power failure.

### Getting Started
To use the library, you replace the standard `BlynkSimpleTinyGSM.h` include with `BlynkSimpleTinyGSM_M.h`. Instead of a single `Blynk.run()` call, you manage the two interfaces separately in your main loop:

```cpp
void loop() {
  // Process WiFi-based Blynk connection
  Blynk_WF.run();

  // Process GSM-based Blynk connection
  #if USE_BLYNK_WM
    if (valid_apn)
      Blynk_GSM.run();
  #else
    Blynk_GSM.run();
  #endif

  check_status();
}
```

### Configuration and Customization
One of the most powerful aspects of BlynkGSM_Manager is the ability to add **Dynamic Parameters**. If your project requires extra settings—like an MQTT server address, a sensor calibration offset, or a custom device ID—you can define these in your sketch, and they will automatically appear as input fields in the web configuration portal.

For developers using the TTGO T-Call (a popular ESP32 + SIM800L board), this library is particularly useful as it includes specific pin definitions and examples tailored for that hardware. Whether you are building a remote weather station or an industrial gateway, BlynkGSM_Manager provides the connectivity resilience required for professional IoT deployments.
