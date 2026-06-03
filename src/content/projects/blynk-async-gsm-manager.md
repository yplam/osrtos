---
title: Blynk_Async_GSM_Manager
summary: A comprehensive library for ESP32 and ESP8266 that enables simultaneous WiFi
  and GSM/GPRS connections for Blynk applications. It features an asynchronous web-based
  configuration portal to manage credentials at runtime, eliminating the need for
  hardcoded network settings.
codeUrl: https://github.com/khoih-prog/Blynk_Async_GSM_Manager
isShow: false
rtos: ''
libraries:
- littlefs
- spiffs
topics:
- apn
- async
- blynk-gsm
- config-portal
- dynamic-parameters
- eep8266
- eeprom
- esp32
- gprs
- gprssim800
- gprssim900
- gsm-shield
- littlefs
- multiblynk
- multiwifi
- spiffs
- tinygsm
- ttgo-tcall
- wifi
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- blynkgsm-manager
- blynk-async-esp32-bt-wf
- blynk-wifimanager
- blynk-async-wm
- blynk-esp8266at-wm
- blynk-wifinina-wm
---

Managing connectivity for IoT devices in the field can be a logistical nightmare. Traditionally, developers had to hardcode WiFi SSIDs or GSM APN settings, meaning a simple change in network environment required a physical firmware update. **Blynk_Async_GSM_Manager** solves this problem for ESP32 and ESP8266 developers by providing a robust, asynchronous configuration portal that allows credentials to be updated on the fly.

### The Power of Asynchronous Connectivity

What sets this library apart is its use of `ESPAsyncWebServer`. Unlike standard blocking web servers, an asynchronous approach allows the MCU to handle multiple connections simultaneously without stalling the main loop. This is particularly critical for IoT applications where maintaining a connection to the Blynk cloud and processing sensor data must happen in parallel with serving a configuration webpage. The result is a faster, more responsive user interface and a more stable application.

### Simultaneous WiFi and GSM

One of the most unique features of this library is the ability to run **WiFi and GSM/GPRS simultaneously**. In many industrial or remote use cases, you might want WiFi as a primary connection and GSM as a failover, or use both to route different types of data. Blynk_Async_GSM_Manager enables this dual-mode operation, allowing the system to autoconnect to the best available WiFi Access Point or fall back to cellular data seamlessly.

### Dynamic Configuration Portal

When the device cannot connect to a known network, it automatically enters 'Configuration Mode,' acting as a WiFi Access Point. Users can connect to this AP via a smartphone or laptop and access a web portal to enter:
- Multiple WiFi SSIDs and Passwords.
- Blynk Auth Tokens for both WiFi and GSM modes.
- GSM settings including APN, User, Password, and PIN.
- Custom dynamic parameters (e.g., MQTT server addresses or sensor thresholds).

These settings are saved securely in the device's non-volatile memory using **LittleFS**, **SPIFFS**, or **EEPROM**, ensuring they persist across reboots.

### Hardware and Modem Support

The library is designed to be highly compatible with a vast range of hardware. It supports the ESP32 and ESP8266 cores and integrates with the `TinyGSM` library to support a long list of modems, including:
- **SIMCom**: SIM800, SIM900, SIM7000, SIM7600, and more.
- **u-blox**: SARA series, LEON, and TOBY.
- **Quectel**: BG96, M95, and MC60.
- **AI-Thinker**: A6, A7, and A20.

### Advanced Reset Detection

To make it easy for users to trigger the configuration portal manually, the library supports **DoubleResetDetector (DRD)** and **MultiResetDetector (MRD)**. By quickly toggling the reset button two or three times, the device can be forced into configuration mode, even if it already has valid credentials stored. This is an essential feature for devices deployed in enclosures without physical access to the internal wiring.

### Getting Started Example

Integrating the library into your sketch is straightforward. Instead of the standard Blynk headers, you include the Async-specific versions. Here is a snippet showing how to initialize the manager:

```cpp
#include "defines.h"
#include <BlynkSimpleEsp32_GSM_Async_WFM.h>

void setup() {
  // Initialize modem pins
  pinMode(MODEM_POWER_ON, OUTPUT);
  digitalWrite(MODEM_POWER_ON, HIGH);

  // Start the configuration portal with a custom hostname
  Blynk_WF.begin("My-IoT-Device");
}

void loop() {
  // Maintain both WiFi and GSM connections
  Blynk_WF.run();
  
  if (Blynk_GSM.connected()) {
    Blynk_GSM.run();
  }
}
```

By separating the credentials from the code, Blynk_Async_GSM_Manager empowers developers to build more professional, flexible, and user-friendly IoT products.
