---
title: ESP32 Ruuvitag Collector
summary: An ESP32-based application designed to collect environmental data from Ruuvitag
  BLE sensors. It supports data transmission to InfluxDB and MQTT, features local
  storage on SPIFFS or SD cards, and is optimized for low-power battery operation.
codeUrl: https://github.com/hpirila/ESP32-Ruuvitag-Collector
isShow: false
rtos: freertos
libraries:
- spiffs
topics:
- esp32
- esp32-lan
- mqtt-smarthome
- olimex-esp32-gateway
- ruuvi
- ruuvitag
- spiffs
- weatherstation
star: 29
lastUpdated: '2020-04-03'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- mongoose-os-environment-logger
- lorawan-end-device-with-freertos-and-esp32
- lilygo-higrow-esp32-plant-monitoring-sensor-firmware-hardware-v1
- bresserweathersensorlw
- losant-temperature-sensor-for-mongoose-os
- apache-mynewt-sensor-network-for-stm32-blue-pill
---

The **ESP32-Ruuvitag-Collector** is a specialized firmware for the ESP32 microcontroller designed to bridge the gap between Ruuvitag Bluetooth Low Energy (BLE) sensors and modern data platforms like InfluxDB and Home Assistant. Ruuvitags are popular open-source environmental sensors that broadcast temperature, humidity, and pressure data via BLE. This project allows users to gather that data efficiently, even in remote locations or battery-powered setups.

### Core Functionalities
At its heart, the collector scans for BLE advertisements from Ruuvitags, parses the sensor data, and forwards it to various destinations. Key features include:
- **InfluxDB Integration**: Send measurements directly to an InfluxDB instance for visualization in tools like Grafana.
- **MQTT Publishing**: Publish sensor data to an MQTT broker, including support for Home Assistant MQTT Discovery, making it easy to integrate sensors into a smart home dashboard.
- **Local Storage**: If the network is unavailable, the device can store measurements to the ESP32's internal SPIFFS (SPI Flash File System) or an external microSD card.
- **White Listing**: To save power and processing time, users can specify a list of MAC addresses to monitor, allowing the device to stop scanning as soon as all target tags are found.

### Optimized Power Management
One of the standout features of this project is its flexibility regarding power consumption. It offers two distinct operational modes:

1. **Primary Weather Station**: In this mode, the ESP32 wakes up every minute, scans for tags, and immediately turns on WiFi to transmit data. This is ideal for mains-powered devices where real-time updates are a priority.
2. **Backup/Low-Power Collector**: To conserve battery, the device can be configured to wake up and scan every minute but only turn on the WiFi radio periodically (e.g., every 15 minutes). During the 'offline' periods, data is cached locally and then uploaded in a single burst, significantly extending battery life.

### Configuration and Setup
Configuration is handled primarily through the `config.cpp` file. Users can define WiFi credentials, NTP server IPs (critical for accurate timestamping), and server details for InfluxDB and MQTT. 

```cpp
// Example InfluxDB Configuration
iC.host = "192.168.1.100";
iC.port = 8086;
iC.database = "weather_data";
iC.username = "admin";
iC.password = "secret";
influxConfiguration.push_back(iC);
```

For those using specialized hardware like the ESP32-CAM, the project includes specific flags to manage hardware quirks, such as the flash LED interference when writing to the microSD card.

### Managing the Device
The project includes a built-in serial menu system accessible during the first two seconds of boot-up. By pressing any key in a serial console, users can enter a management interface to:
- Print stored measurements from SPIFFS or SD cards.
- Manually trigger data uploads to InfluxDB.
- Delete local log files or format the SPIFFS partition.

### Getting Started
The project is built using the **PlatformIO** ecosystem. To deploy it, you will need Visual Studio Code with the PlatformIO extension. The repository includes a `platformio.ini` file configured for the `esp32dev` board using the Arduino framework. Because the project uses a custom partition scheme (`no_ota.csv`) to maximize space for data storage, ensure you use the provided configuration files during the build process.
