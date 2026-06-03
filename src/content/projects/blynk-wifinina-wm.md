---
title: Blynk_WiFiNINA_WM
summary: A comprehensive WiFi configuration manager and Blynk connection library for
  a wide range of Arduino-compatible boards using WiFiNINA modules. It enables runtime
  credential configuration via a web portal, supports multiple WiFi networks, and
  integrates with storage solutions like LittleFS and EEPROM to eliminate hardcoded
  credentials.
codeUrl: https://github.com/khoih-prog/Blynk_WiFiNINA_WM
isShow: false
rtos: mbed-os
libraries:
- littlefs
- spiffs
topics:
- blynk
- blynk-credentials
- blynk-wifinina-wm
- dueflashstorage
- dynamic-parameters
- eeprom
- flashstorage
- littlefs
- mega2560
- multi-blynk
- multi-wifi
- nrf52
- rp2040
- samd
- samdue
- stm32
- teensy
- wifi
- wifinina
- wifinina-shields
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- blynk-wifimanager
- blynk-esp8266at-wm
- blynkgsm-manager
- blynk-async-gsm-manager
- blynk-async-wm
- blynk-async-esp32-bt-wf
---

Managing WiFi credentials and Blynk tokens in embedded projects often leads to the 'hardcoding' trap, where every change in environment requires a firmware re-flash. **Blynk_WiFiNINA_WM** is a powerful library designed to solve this by providing a robust WiFi Configuration Manager (WM) for boards using WiFiNINA shields or modules. By leveraging this library, developers can create devices that are easily reconfigurable at runtime through a user-friendly web interface.

### Solving the Hardcoding Problem
The primary goal of Blynk_WiFiNINA_WM is to eliminate hardcoded credentials. When a device cannot connect to a known network, it automatically enters 'Configuration Mode,' acting as an Access Point (AP). Users can connect to this AP with a smartphone or laptop, navigate to a local web portal (typically 192.168.4.1), and input new WiFi SSIDs, passwords, and Blynk authentication tokens. These settings are then saved to non-volatile memory—such as EEPROM, LittleFS, or FlashStorage—and the device restarts to connect with the new parameters.

### Extensive Hardware Support
One of the library's standout features is its broad compatibility across the Arduino ecosystem. It supports a diverse range of architectures, including:
- **AVR**: Mega 1280, 2560, and ADK.
- **ARM Cortex-M**: SAMD21/SAMD51 (Zero, MKR, Nano 33 IoT), SAM DUE, and STM32 (F/L/H/G/WB/MP1 series).
- **Teensy**: 4.1, 4.0, 3.x, and LC.
- **nRF52**: Adafruit Feather nRF52832/nRF52840 and BlueFruit Sense.
- **RP2040**: Raspberry Pi Pico and Arduino Nano RP2040 Connect, using either the Arduino-mbed or Earle Philhower core.

### Advanced Features for Reliable IoT
Beyond simple configuration, the library includes several advanced features that enhance device reliability and user experience:
- **MultiWiFi & MultiBlynk**: The system can store multiple sets of credentials and automatically cycle through available WiFi APs or Blynk servers if a connection is lost.
- **DoubleResetDetector (DRD)**: This feature allows users to force the device into Configuration Mode by simply pressing the reset button twice within a short window (default 10 seconds), which is invaluable if the stored credentials are valid but the user still needs to access the portal.
- **Dynamic Custom Parameters**: Developers can add their own fields to the configuration portal, such as MQTT server addresses or custom device IDs, which are automatically saved and loaded alongside WiFi settings.
- **SSL Support**: For security-conscious applications, the library supports connections with or without SSL.

### Implementation Example
Transitioning to the WiFiManager version of Blynk is straightforward. Instead of the standard `BlynkSimpleWiFiNINA.h`, you include the specific header for your board. For example, on a SAMD board:

```cpp
#include "BlynkSimpleWiFiNINA_SAMD_WM.h"

void setup() {
  Serial.begin(115200);
  
  // Optional: Set a custom config portal IP
  Blynk.setConfigPortalIP(IPAddress(192, 168, 120, 1));
  
  // Start the connection process
  Blynk.begin();
}

void loop() {
  Blynk.run();
}
```

### Ecosystem and Dependencies
The library is part of a larger ecosystem of tools by Khoi Hoang, often requiring helper libraries like `WiFiNINA_Generic`, `DoubleResetDetector_Generic`, and various `FlashStorage` implementations depending on the target hardware. It is compatible with both Blynk v0.6.1 and the newer Blynk v1.0.1 (Blynk IoT), though it requires specific library patches provided in the repository to ensure proper device detection and protocol handling. For developers using PlatformIO, a pre-configured `platformio.ini` is available to manage these dependencies automatically.
