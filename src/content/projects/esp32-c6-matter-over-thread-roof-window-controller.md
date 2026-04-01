---
title: ESP32-C6 Matter Over Thread Roof Window Controller
summary: A smart home controller for roof windows that utilizes Matter over Thread
  on the Espressif ESP32-C6 platform. It combines environmental sensing via an AM2301
  sensor with hardware control for window automation, integrating directly into ecosystems
  like Home Assistant through a Thread border router.
slug: esp32-c6-matter-over-thread-roof-window-controller
codeUrl: https://github.com/lemauee/esp32c6-matter-over-thread-roof-window-controller
lastUpdated: '2025-02-01'
rtos: freertos
libraries:
- lwip
- nimble
- open-thread
topics:
- am2301
- dht
- dht11
- dht21
- dht22
- esp-idf
- esp-matter
- esp32
- esp32c6
- home-assistant
- home-automation
- humidity-sensor
- matter
- matter-over-thread
- relay
- switch
- temperature-sensor
- thread
isShow: false
createdAt: '2026-03-31T23:46:38+00:00'
updatedAt: '2026-03-31T23:46:38+00:00'
---

The transition toward unified smart home standards has reached a milestone with Matter, a protocol designed to ensure interoperability across different manufacturers and ecosystems. This project implements a specialized Matter-enabled controller for roof windows, utilizing the Espressif ESP32-C6. By leveraging Matter over Thread, it provides a low-power, mesh-capable solution that integrates seamlessly into modern smart home setups without the need for proprietary bridges.

### Hardware Foundation

The implementation centers on the Olimex ESP32-C6-EVB, an evaluation board that showcases the capabilities of the ESP32-C6 SoC. This chip is particularly noteworthy as it is one of Espressif's first to support IEEE 802.15.4, enabling native Thread and Zigbee connectivity alongside Wi-Fi 6 and Bluetooth Low Energy (BLE). 

To handle the practical aspects of window management, the controller manages several hardware components:
- **AM2301 Sensor**: A temperature and humidity sensor (similar to the DHT series) used to monitor indoor environmental conditions.
- **Relay Module**: Provides the physical switching capability required to actuate window motors.
- **Local Inputs**: Includes support for physical switches and a reset button for manual overrides and device management.
- **User LED**: Provides visual feedback for device status and commissioning states.

### Software Architecture

The firmware is built upon the Espressif IoT Development Framework (ESP-IDF) and the ESP-Matter SDK. The choice of the ESP32-C6 allows the project to use Matter over Thread, which offers significant advantages in terms of network reliability and power efficiency compared to traditional Wi-Fi-based Matter devices. 

The project structure is modular, with dedicated drivers for each peripheral component. As seen in the component registration, the build system integrates specific directories for the relay, sensor, and button logic:

```cmake
idf_component_register(SRC_DIRS "." "am2301" "relay" "reset_button" "switch" "user_led"
                       PRIV_INCLUDE_DIRS "." "am2301" "relay" "reset_button" "switch" "user_led")
```

This modularity ensures that the high-level Matter clusters can interact cleanly with the underlying hardware abstraction layer. The project utilizes the NimBLE stack for Bluetooth-based commissioning and lwIP for IPv6 networking, which is a requirement for Matter communication.

### Integration and Commissioning

One of the primary strengths of this controller is its integration with Home Assistant. By using a Thread Border Router, such as the Home Assistant SkyConnect (ZBT-1), the device joins a Thread mesh network where it can communicate with other Matter-certified devices. 

Commissioning is handled via BLE. During the initial setup, the device advertises its presence, allowing a controller (like a smartphone running the Home Assistant Companion app) to securely share Thread network credentials. Once commissioned, the device operates entirely over the Thread protocol. The project documentation highlights the importance of syncing Thread credentials across mobile devices to ensure a smooth setup process within the Home Assistant environment.

### Technical Implementation

The firmware maps hardware functionality to standard Matter clusters. For example, the relay is typically mapped to an "On/Off" cluster, while the AM2301 sensor data is exposed through "Temperature Measurement" and "Relative Humidity Measurement" clusters. This mapping allows the roof window to appear as a native device in any Matter-compliant app, whether it be Home Assistant, Apple Home, or Google Home.

For developers looking to extend the project, the use of `sdkconfig.defaults` provides a streamlined configuration process, enabling the necessary Thread and Matter features by default. The build process follows the standard ESP-IDF workflow, using `idf.py` to compile, flash, and monitor the device, making it accessible for those already familiar with the Espressif ecosystem.
