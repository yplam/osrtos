---
title: ESP32 Sniffer
summary: An ESP32-based firmware designed to capture Wi-Fi Probe Request packets sent
  by smartphones. Built on the ESP-IDF framework, it extracts metadata such as MAC
  addresses and signal strength, stores them locally using SPIFFS, and periodically
  uploads the data to a central server via MQTT.
codeUrl: https://github.com/ETS-PoliTO/esp32-sniffer
siteUrl: https://j4nn0.github.io/doc/ets_presentation.pdf
isShow: false
rtos: freertos
libraries:
- spiffs
- lwip
topics:
- component
- esp32
- esp32-idf
- esp32-spiffs
- esp32-wroom
- filesystem
- framework
- iot
- mqtt
- multithreading
- probe-requests
- real-time-location
- smartphones
- sniffer
- sntp
- spiffs
- task-management
- tasks
- tracking-system
- wifi-connection
star: 266
lastUpdated: '2023-12-18'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- smarttrack-rfid-attendance-system
- ghost-esp
- esp32-ruuvitag-collector
- flock-detector-3-0
- esp32-wi-fi-provision-care
- periscope-os-v2-0-0-sigint
---

The ESP32 Sniffer is a specialized firmware developed to monitor and analyze Wi-Fi traffic, specifically focusing on Probe Request packets. These packets are broadcast by smartphones searching for available or known Wi-Fi networks. By capturing these requests, the ESP32 can gather significant data about nearby devices without requiring them to actually connect to a network, making it a powerful tool for presence detection and location tracking.

### How It Works

The firmware architecture is built on the Espressif IoT Development Framework (ESP-IDF) and leverages the dual-core capabilities of the ESP32 to run two primary concurrent tasks:

*   **Sniffer Task**: This task operates the Wi-Fi radio in a mode that intercepts Probe Request packets. It extracts critical metadata—including the smartphone's MAC address, the SSID it is searching for, the Received Signal Strength Indicator (RSSI), and Sequence Numbers—and saves this information to the internal flash memory.
*   **Wi-Fi Task**: Every minute, this task takes the information saved by the Sniffer Task and transmits it to a central server. 

A key technical highlight is the use of `WIFI_MODE_APSTA`. This configuration allows the ESP32 to create a soft-AP and station control block simultaneously. This enables the device to sniff packets and maintain a connection to a server for data transmission at the same time, significantly reducing the risk of losing data during the upload phase.

### Data Collection and Storage

The project captures a comprehensive set of fields from each sniffed packet, based on the IEEE 802.11-2012 standard:
*   MAC address of the transmitting smartphone
*   SSID of the target network
*   Timestamp of the request
*   RSSI (Signal Strength)
*   Sequence Number (SN)
*   HT Capabilities Info

To manage this data locally, the project utilizes **SPIFFS** (SPI Flash File System), which supports wear leveling and file system consistency checks. A mutex lock is implemented to manage critical sections during I/O operations, ensuring that the Sniffer Task and Wi-Fi Task do not conflict when accessing the storage file.

### Configuration and Deployment

The project is highly customizable through the ESP-IDF `menuconfig` system. Users can configure various parameters without touching the source code, including:
*   **Hardware IDs**: Unique identifier for the ESP32 node.
*   **Network Credentials**: Wi-Fi SSID and password for the reporting connection.
*   **MQTT Settings**: Broker address, port, and authentication details.
*   **Sniffing Parameters**: Specific Wi-Fi channels to monitor and the duration of sniffing cycles.

### Getting Started

To deploy the firmware, you will need an ESP32 (such as the ESP-WROOM-32) and the ESP-IDF toolchain (specifically version `v3.2`). The build process follows the standard ESP-IDF workflow:

```bash
# Clone the repository
git clone https://github.com/ETS-PoliTO/esp32-sniffer.git
cd esp32-sniffer

# Configure the project (Set serial port, Wi-Fi, and MQTT details)
make menuconfig

# Build and flash the device
make all && make flash

# Monitor the output
make monitor
```

Once flashed, the ESP32 will begin sniffing and reporting data to the configured MQTT broker. This data can then be processed by a server and visualized through a GUI to track real-time smartphone locations and frequency.
