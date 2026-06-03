---
title: IoT ESP8266 Serial Forwarder
summary: An ESP8266-based firmware for monitoring and interacting with TTL serial
  devices over WiFi. It provides a web interface for serial communication, supports
  analog voltage logging via ADC, and integrates DS18B20 temperature sensors.
slug: iot-esp8266-serial-forwarder
codeUrl: https://github.com/devel0/iot-esp8266-serial-fwd
star: 0
lastUpdated: '2021-10-26'
rtos: ''
libraries:
- spiffs
- lwip
topics:
- esp8266
- serial-over-wifi
- spiffs
- voltage-logger
- websocket
isShow: false
createdAt: '2025-12-29'
updatedAt: '2025-12-29'
relatedProjects:
- esp8266starter
- riden-dongle
- nmea0183-wifi-marine-data-gateway
- esp8266-web-server-and-spiffs-integration
- esp8266-mlx90614-temperature-monitor
- esp8266-dht22-spiffs-web-server
---

## Overview

The iot-esp8266-serial-fwd project is a versatile firmware designed for the ESP8266 platform, specifically targeting the NodeMCU v2. It serves as a bridge between physical TTL serial interfaces and WiFi, allowing users to monitor and interact with serial devices remotely through a web browser or terminal. Beyond serial forwarding, the project includes capabilities for analog data logging and temperature monitoring, making it a multi-purpose tool for IoT debugging and environment sensing.

## Key Features

- **WiFi Serial Bridge**: Forward TTL serial data (3.3V native) over WiFi. The firmware supports configurable baud rates and provides a web-based console for interaction.
- **Flexible Connectivity**: Supports multiple WiFi credentials with automatic connection to the strongest signal. It also features an Access Point (AP) mode for direct connection and mDNS support for easy discovery via `http://espserial.local`.
- **Data Logging**: Built-in support for monitoring analog voltages via the ESP8266 ADC. It can be used as a continuous voltage logger using WebSockets or one-shot readings via HTTP GET requests.
- **Sensor Integration**: Native support for DS18B20 temperature sensors connected via OneWire.
- **Web Interface**: A mobile-friendly web dashboard for real-time monitoring and configuration.

## Technical Implementation

The project is built using the **Arduino framework** within the **PlatformIO** ecosystem. It leverages several high-performance libraries to handle networking and hardware interfacing:

- **ESPAsyncWebServer & ESPAsyncTCP**: Used to provide a responsive, non-blocking web interface.
- **WebSockets**: Enables real-time, low-latency data streaming for serial output and ADC readings.
- **EspSoftwareSerial**: Implements software-defined serial ports on GPIO pins (D5 for RX, D6 for TX) to avoid conflicts with the hardware serial used for flashing firmware.
- **SPIFFS**: The ESP8266's internal flash filesystem is used to store web assets and configuration data.

## Hardware Configuration

To ensure safe operation with 5V devices (like standard Arduino boards), the project recommends using a BSS138-based logic level converter. The wiring is optimized to use D5 and D6 for communication, leaving the primary hardware serial pins free for debugging and programming. For voltage logging, the firmware can monitor 0-3V natively, which can be extended using a simple voltage divider circuit to monitor higher ranges, such as 25V battery systems.

## Application Scenarios

### Serial Forwarding
This mode allows you to interact with the serial console of a remote device. By connecting the ESP8266 to the target's TX/RX pins, you can send commands and receive logs over the network. This is particularly useful for debugging headless systems or devices installed in hard-to-reach locations.

### Voltage and Temperature Logging
The firmware can act as a standalone telemetry node. Using simple shell scripts or tools like `websocat`, users can log ADC values or temperature readings to a file or database. 

```sh
# Example: Monitoring ADC values via WebSockets
websocat ws://espserial.local:82 | while IFS= read -r line; do 
    echo "adc=[$line] V=[$(printf "%0.3f" $(echo "$line / 1023 * 3.161" | bc -l))]"; 
done
```

## Getting Started

The project is designed to be compiled using Visual Studio Code with the PlatformIO extension. Users need to configure their WiFi credentials in a header file and upload both the firmware and the filesystem image (containing the web data) to the ESP8266. Once flashed, the device becomes accessible via its IP address or mDNS name.
