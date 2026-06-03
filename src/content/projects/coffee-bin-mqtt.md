---
title: Coffee-Bin MQTT
summary: An ESP8266-based IoT application designed to monitor coffee bin levels and
  maintenance status. It utilizes Mongoose OS for building and flashing, featuring
  MQTT connectivity, deep sleep power management, and OTA update capabilities.
codeUrl: https://github.com/vergissberlin/coffee-bin-mqtt
siteUrl: https://coffee-bin-mqtt.readthedocs.io/
isShow: false
rtos: mongoose-os
libraries: []
topics:
- iot
- mongoose-os
- mqtt
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- mongoose-os-esp8266-pir-monitor
- esp-temperature-to-losant-using-mongoose-os
- losant-temperature-sensor-for-mongoose-os
- mqtt-wake-on-lan-for-esp8266
- mqtt-message-display-for-ssd1306
- leilei-mongoose-os-sensing-device
---

Coffee-Bin MQTT is a specialized IoT sensor project designed to bring smart monitoring to coffee machines. Built around the popular ESP8266 (specifically the ESP12F module), this project provides a robust way to track the fill status of coffee bins and signal when maintenance is required, all via the MQTT protocol.

### Core Functionality and Features
The project is designed with efficiency and utility in mind. One of its standout features is the use of **Deep Sleep mode**, which allows the device to conserve energy when not active, making it suitable for battery-powered deployments. On every bootup, the system measures the battery voltage and broadcasts the result as an MQTT message, ensuring that users are aware of the device's power status.

Key features include:
- **Bin Status Monitoring**: Detects when the coffee bin is full or needs attention.
- **Maintenance Mode**: A dedicated physical switch allows users to broadcast an MQTT message indicating the machine is currently undergoing maintenance.
- **Visual Feedback**: Multiple LEDs provide local status updates for WiFi connectivity, maintenance mode, and bin fill levels.
- **Over-the-Air (OTA) Updates**: Support for remote firmware updates ensures the device can be maintained without physical access.

### Hardware and Wiring
The project targets the ESP8266 ESP12F with 32 Mbit of flash. The circuit involves a simple but effective array of inputs and outputs:
- **Inputs**: A switch for maintenance mode and a sensor for the coffee bin status.
- **Outputs**: External and internal LEDs for status visualization.
- **Sensors**: A voltage sensor to monitor the power supply.

The repository includes comprehensive wiring diagrams in PDF, PNG, and SVG formats to assist with assembly.

### Technical Architecture
The software is structured into modular components, making it easy to read and maintain. The main application logic resides in `coffee-bin.ino`, which orchestrates several sub-modules:
- `wifi.h`: Manages network connectivity.
- `mqtt.h`: Handles communication with the MQTT broker.
- `ota.h`: Manages the update process.
- `pins.h`: Defines the hardware mapping for the ESP8266.

### Getting Started with Mongoose OS
While the code follows an Arduino-like structure, the project leverages the **Mongoose OS (mos)** toolchain for building and flashing. This provides a professional-grade environment for managing ESP8266 devices. 

To build the project locally, you can use the following commands:

```bash
git clone https://github.com/vergissberlin/coffee-bin-mqtt
cd coffee-bin-mqtt
mos build --platform ESP8266 --local --verbose
mos flash --esp-erase-chip --esp-baud-rate 115200 --esp-flash-params "dio,4m,40m"
```

Once flashed, configuring the WiFi is straightforward via the CLI:

```bash
mos wifi --port /dev/cu.SLAB_USBtoUART WIFI-SSID WIFI-PASSWORD
```

This project is an excellent example of how to combine simple hardware sensors with a professional IoT stack to solve a specific, real-world problem in the office or home environment.
