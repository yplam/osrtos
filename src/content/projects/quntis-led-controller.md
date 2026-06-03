---
title: Quntis LED Controller
summary: A DIY remote controller for the Quntis Monitor Light Bar PRO+ that enables
  smart home integration using an ESP32 and NRF24L01 module. It features a dedicated
  sniffer to capture proprietary remote addresses and supports both standalone MQTT
  and native ESPHome configurations.
slug: quntis-led-controller
codeUrl: https://github.com/bluemaex/Quntis-LED-Controller
lastUpdated: '2026-03-03'
image: /202606/Quntis-LED-Controller_0.avif
rtos: freertos
libraries:
- spiffs
topics:
- esphome
- home-assistant
- platformio
- quntis
isShow: true
createdAt: '2026-06-02T23:24:44+00:00'
updatedAt: '2026-06-02T23:24:44+00:00'
relatedProjects:
- esp32-controller-for-charlton-jenrick-fireplace
- electricitydisplay-mqtt-remote-control-for-esp8266-esp32
- esp32-jarolift-controller
- esp8266-home-automation
- omote-open-universal-remote
- esphome-ikea-vindriktning
---

The Quntis Monitor Light Bar PRO+ (model LI-HY-208-BK) is a popular desk lighting solution that typically relies on a dedicated physical remote for power, dimming, and color temperature control. While effective, the lack of native smart home connectivity led to the development of this DIY bridge. By leveraging previous reverse-engineering efforts, this project migrates the control logic to the ESP32 platform, allowing the lamp to be fully integrated into Home Assistant.


### The Challenge of Proprietary Protocols

One of the primary hurdles in controlling these light bars is that the NRF24L01-based protocol uses specific device addresses that may not be universal across all units. To solve this, the project includes a specialized "Sniffer" tool. Using an ESP32—specifically the compact ESP32-C3 Super Mini—and an NRF24L01 radio module, users can capture the unique hex address of their own remote. This sniffer runs a barebone Arduino image designed to minimize 2.4 GHz interference by disabling Wi-Fi during the capture process.

To capture the address, the NRF24L01 is wired to the ESP32-C3 using the following pinout:
- **CE**: GPIO1
- **CS**: GPIO5
- **CLK**: GPIO2
- **MOSI**: GPIO4
- **MISO**: GPIO3

By holding the original remote close to the antenna and pressing buttons, the sniffer detects duplicate packets in the burst transmission and prints the decoded 5-byte address to the serial monitor. This address is the key to local control.

### Implementation Options: MQTT and ESPHome

Once the device address is known, there are two primary ways to deploy the controller. The first is the **MQTT Version**, which is ideal for users who prefer a standalone bridge or do not use Home Assistant as their primary orchestrator. This version includes a WebUI stored on the SPIFFS filesystem, providing a clean interface for direct control and status monitoring.

![Web interface for the MQTT-based Quntis LED controller](/202606/Quntis-LED-Controller_1.avif)

The MQTT implementation utilizes the `RF24` library for radio communication and `PubSubClient` for messaging. It automatically handles discovery in Home Assistant, appearing as a standard light entity.

### Native ESPHome Integration

For those deeply embedded in the ESPHome ecosystem, a dedicated configuration is available. Because ESPHome does not have native, high-level support for the NRF24L01 in this specific context, the project utilizes the Arduino Subsystem plugin to bridge the custom control logic. 

![ESPHome device dashboard in Home Assistant showing control and calibration options](/202606/Quntis-LED-Controller_2.avif)

Setting this up involves using a provided YAML template and inserting the previously sniffed `device_address`. A unique feature of the ESPHome version is the **Calibrate** switch. Since the ESP32 cannot bi-directionally communicate with the lamp to know its initial state, the calibration routine walks the light through a full cycle of color and brightness settings. This ensures the software state and the physical lamp state are perfectly synchronized, a process recommended after power cuts or when using the original physical remote alongside the digital controller.
