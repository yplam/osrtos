---
title: Bleeper
summary: Bleeper is a C++ configuration management library for ESP8266 and ESP32 Arduino
  platforms. It provides a hierarchical structure for firmware settings, automatic
  persistence using EEPROM or SPIFFS, and a built-in web interface for remote configuration.
codeUrl: https://github.com/workilabs/Bleeper
isShow: false
rtos: ''
libraries:
- spiffs
topics:
- arduino
- arduino-ide
- configurations
- eeprom
- esp32
- esp32-arduino
- esp8266
- firmware
- interface
- iot
- iot-framework
- platformio-ide
- spiffs
- storage
- web-panel
- webserver
- wifi
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- configassist-esp32-esp8266
- esp-fs-webserver
- settings-manager
- blynk-async-wm
- blynkgsm-manager
- autonetwork-library
---

Managing firmware configurations in embedded systems often leads to a mess of `#define` macros and hardcoded constants. While this works for simple prototypes, it becomes a bottleneck when you need to change settings like WiFi credentials, sensor thresholds, or device IDs without reflashing the entire firmware. Bleeper is a library designed specifically for ESP8266 and ESP32 Arduino platforms to solve this problem by providing a robust, hierarchical configuration manager.

### Why Use a Configuration Manager?

In many IoT scenarios, you might not have physical access to a device once it is deployed. If you need to update a port number or a calibration value, downloading the firmware again is tedious and often impossible. Bleeper allows developers to expose these variables through a high-level interface, persist them in non-volatile storage, and even observe changes in real-time. It transforms static constants into dynamic, manageable properties.

### Hierarchical and Type-Safe Configuration

One of Bleeper's strongest features is its support for hierarchical structures. You can define your configuration as a tree of objects, which makes organizing complex settings much easier. Because it uses C++ classes and specific variable macros, the system remains type-safe. You aren't just accessing a generic map of strings; you are interacting with actual `int`, `float`, or `string` types.

```cpp
#include "Bleeper.h"

class WifiConfig: public Configuration {
public:
  persistentStringVar(ssid, "MySSID");
  persistentStringVar(password, "MyPassword");
};

class Config: public RootConfiguration {
public:
  stringVar(name, "Default Device Name");
  subconfig(WifiConfig, wifi);
};

Config C;
```

In the example above, `wifi.ssid` and `wifi.password` are marked as persistent, meaning Bleeper will automatically handle saving and loading these values from storage.

### The Four Pillars of Bleeper

Bleeper is organized into four main entry points that define how your device behaves:

1.  **Configuration**: This is where you set your root configuration instance and attach observers. The observer API allows your code to react immediately when a specific property is changed, which is perfect for updating hardware states (like LED brightness) the moment a user changes a setting.
2.  **Configuration Interface**: Bleeper can automatically generate a web-based control panel. By calling `addDefaultWebServer()`, you get a UI that allows you to modify your configuration variables from a browser or smartphone.
3.  **Connection**: Managing WiFi can be tricky. Bleeper simplifies this by allowing you to define a priority list of connections. For example, it can attempt to connect to a saved WiFi SSID and, if that fails, automatically fall back to Access Point (AP) mode so you can still reach the configuration portal.
4.  **Storage**: The library supports multiple storage backends. By default, it uses EEPROM, but it also provides support for SPIFFS. This ensures that your "persistent" variables actually survive a reboot.

### Getting Started

Setting up Bleeper involves a fluent API that makes initialization readable. In your `setup()` function, you chain the configuration of your storage, connections, and interfaces:

```cpp
void setup() {
  Bleeper
    .verbose(115200)
    .configuration
      .set(&C)
      .done()
    .configurationInterface
      .addDefaultWebServer()
      .done()
    .connection
      .setSingleConnectionFromPriorityList({
          new Wifi(&C.wifi.ssid, &C.wifi.password),
          new AP()
      })
      .done()
    .storage
      .setDefault() // Uses EEPROM
      .done()
    .init();
}

void loop() {
  Bleeper.handle();
}
```

By calling `Bleeper.handle()` in the main loop, the library manages background tasks like web server requests and connection maintenance. This abstraction allows developers to focus on their application logic while Bleeper handles the heavy lifting of device management and connectivity.
