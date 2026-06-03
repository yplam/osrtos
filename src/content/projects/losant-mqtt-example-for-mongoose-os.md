---
title: Losant MQTT Example for Mongoose OS
summary: A Mongoose OS application demonstrating secure MQTT connectivity to the Losant
  IoT platform. It supports ESP32, ESP8266, and CC3200 microcontrollers, featuring
  SSL/TLS encryption and GPIO-based event triggers for cloud data streaming.
slug: losant-mqtt-example-for-mongoose-os
codeUrl: https://github.com/mongoose-os-apps/losant-mqtt
siteUrl: https://www.losant.com
star: 5
version: ddd
lastUpdated: '2019-08-16'
rtos: mongoose-os
topics:
- esp32
- esp8266
- gpio
- hardware
- iot
- javascript
- losant
- mongoose-os
- mqtt
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- losant-mqtt-mongoose-os-example
- mongoose-os-samples-for-esp32
- mbed-to-ibm-watson-iot-platform
- mongoose-os-programs-and-examples
- mongoose-os-environmental-sensors-application
- mbed-to-azure-iot-hub
---

The Losant MQTT example for Mongoose OS provides a streamlined path for developers looking to integrate embedded devices with the Losant IoT platform. By leveraging the Mongoose OS framework, this project demonstrates how to establish a secure MQTT connection, handle device authentication, and transmit telemetry data from popular microcontrollers like the ESP32 and ESP8266.

### Seamless Cloud Integration
At its core, the application focuses on the integration between Mongoose OS and Losant's cloud services. It utilizes the built-in MQTT client of Mongoose OS to communicate with the Losant broker. Security is a priority, with the configuration defaulting to port 8883 and utilizing SSL/TLS via a CA certificate to ensure data integrity and privacy during transmission.

### Hardware and Configuration
The project is designed to be portable across several hardware platforms, including:
- **ESP32**: A powerful dual-core MCU with integrated Wi-Fi and Bluetooth.
- **ESP8266**: A cost-effective Wi-Fi-enabled microcontroller.
- **CC3200**: SimpleLink Wi-Fi wireless microcontroller from Texas Instruments.

The `mos.yml` configuration file defines a flexible schema for hardware interactions. It maps specific GPIO pins for an onboard LED and a physical button across the supported architectures. For instance, on the ESP32, the button is mapped to GPIO 0, while on the CC3200, it uses pin 15. This abstraction allows the application logic to remain consistent regardless of the underlying hardware.

### Getting Started with Losant
To deploy the application, users utilize the `mos` toolchain. The process involves building the firmware for the specific architecture, flashing the device, and configuring Wi-Fi credentials. Once the device is online, connection to Losant is established by setting specific MQTT configuration parameters via the command line:

```bash
mos config-set mqtt.client_id=LOSANT_DEVICE_ID \
  mqtt.user=LOSANT_ACCESS_KEY \
  mqtt.pass=LOSANT_ACCESS_SECRET
```

Once configured, the device can stream logs to the terminal and send data to the Losant dashboard. In this example, pressing the physical button on the device triggers data transmission, which can then be visualized in real-time using Losant's graphing tools.

### Extensibility
While this project serves as a starting point, it is built on the Mongoose OS library system, suggesting that logic can be extended using JavaScript (mJS) or C. The use of the Mongoose OS configuration system makes it easy to add new sensors or change MQTT topics without necessarily recompiling the entire firmware, providing a highly iterative development workflow for IoT prototyping.
