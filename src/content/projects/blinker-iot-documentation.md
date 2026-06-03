---
title: Blinker IoT Documentation
summary: The official documentation repository for the Blinker IoT platform, providing
  comprehensive guides for connecting embedded devices to the cloud. It supports a
  wide range of hardware including ESP32, ESP8266, and Arduino, with SDKs for FreeRTOS,
  Python, and Node.js.
codeUrl: https://github.com/blinker-iot/blinker-doc
siteUrl: https://diandeng.tech/doc
isShow: false
rtos: freertos
libraries:
- micropython
topics:
- android
- arduino
- ble
- blinker
- esp32
- esp8266
- freertos
- ios
- iot
- mqtt
- raspberry-pi
- wifi
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- mongoose-os-samples-for-esp32
- fctc-art-pi-code-iot-from-chip-to-cloud
- blynk-python-library
- jc2432w328-microcontroller-board-documentation
- 100askteam-elinux-code-library
- esp32-repo
---

Blinker is a comprehensive IoT solution designed to bridge the gap between hardware development and mobile application control. The `blinker-doc` repository serves as the central knowledge base for developers looking to integrate their embedded systems with the Blinker ecosystem. Whether you are working with simple Arduino boards or complex ESP32-based RTOS applications, this documentation provides the necessary roadmap to get your devices online and controllable via a smartphone.

## A Multi-Platform Ecosystem

One of the standout features of Blinker is its broad compatibility. The platform is not tied to a single hardware architecture. Instead, it provides SDKs and integration guides for a variety of environments:

- **Microcontrollers**: Native support for ESP32, ESP8266, and Arduino (including Bluetooth and WiFi variants).
- **RTOS Environments**: Dedicated support for FreeRTOS, allowing for professional-grade, multi-threaded IoT applications.
- **High-Level Languages**: SDKs for Python and Node.js, enabling Linux, Windows, and MacOS machines to act as Blinker-enabled devices.
- **Specialized Modules**: Integration paths for GPRS and NBIoT modules for long-range connectivity.

## Key Features and Capabilities

Blinker goes beyond simple remote switching. The platform offers a suite of tools designed for modern IoT needs:

- **Customizable App Interface**: Users can design their own control layouts within the Blinker App without writing mobile code.
- **Voice Assistant Integration**: Seamlessly connect devices to popular AI assistants like Tmall Genie (天猫精灵), Baidu Xiaodu (百度小度), and Xiaomi Xiao Ai (小米小爱).
- **Data Management**: Tools for real-time data monitoring, historical data aggregation, and cloud logging.
- **Automation & Scenes**: Configure "If This Then That" style logic (Smart Automation) and scene-based controls to manage multiple devices simultaneously.
- **Device Management**: Includes features for OTA (Over-the-Air) firmware updates, device sharing among users, and batch management via a web console.

## Getting Started with Blinker

The documentation is structured to take developers from zero to a working prototype quickly. A typical workflow involves:

1.  **Adding a Device**: Registering a new device in the Blinker App to obtain a unique Secret Key.
2.  **Environment Setup**: Installing the appropriate SDK (e.g., the Blinker Arduino library).
3.  **Coding**: Using the provided templates to connect to WiFi or Bluetooth.

For example, a basic ESP32 WiFi connection using the Arduino SDK looks like this:

```cpp
#define BLINKER_WIFI
#include <Blinker.h>

char auth[] = "Your_Auth_Key";
char ssid[] = "Your_WiFi_SSID";
char pswd[] = "Your_WiFi_Password";

void setup() {
    Serial.begin(115200);
    Blinker.begin(auth, ssid, pswd);
}

void loop() {
    Blinker.run();
}
```

## Advanced Development and Customization

For professional developers, Blinker offers "Exclusive Device" (专属设备) development. This path allows for deeper customization, including custom branding, firmware management, and authorization quota management. The documentation also details the underlying communication protocols, including MQTT for real-time messaging and HTTP for management tasks, providing the transparency needed for custom implementations or debugging with the provided cloud log tools.
