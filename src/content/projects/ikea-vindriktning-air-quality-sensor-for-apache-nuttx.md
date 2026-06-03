---
title: IKEA VINDRIKTNING Air Quality Sensor for Apache NuttX
summary: An application for Apache NuttX OS that interfaces with the IKEA VINDRIKTNING
  air quality sensor to read and decode PM 2.5 data. It targets the PineDio Stack
  BL604 and ESP32 platforms, enabling sensor data transmission via LoRaWAN to The
  Things Network.
slug: ikea-vindriktning-air-quality-sensor-for-apache-nuttx
codeUrl: https://github.com/lupyuen/ikea_air_quality_sensor
siteUrl: https://lupyuen.github.io/articles/ikea
star: 2
lastUpdated: '2022-02-09'
rtos: nuttx
topics:
- bl602
- bl604
- grafana
- ikea
- iot
- lorawan
- nuttx
- prometheus
- riscv32
- thethingsnetwork
- vindriktning
isShow: false
createdAt: '2025-12-29'
updatedAt: '2025-12-29'
relatedProjects:
- lorawan-test-app-for-apache-nuttx
- esphome-ikea-vindriktning
- visual-programming-for-zig-with-nuttx-sensors
- mqtt-demo-for-stm32-iot-discovery-board-with-thingsboard
- apache-mynewt-sensor-network-for-stm32-blue-pill
- tinycbor-test-app-for-apache-nuttx
---

## Overview

The IKEA VINDRIKTNING is an affordable, widely available air quality sensor that measures PM 2.5 particulate matter. This project provides a dedicated application for the Apache NuttX RTOS to interface with the sensor, decode its serial protocol, and prepare the data for transmission over LoRaWAN. By connecting the sensor to a PineDio Stack BL604 (based on the BL602 RISC-V SoC) or an ESP32, users can transform a simple household device into a connected IoT node for environmental monitoring.

## Hardware Integration

Internally, the VINDRIKTNING uses a PM1006 LED particle sensor module. While the device is designed for standalone use with a simple LED indicator, it exposes UART pads on its PCB. By soldering wires to the `REST` (TX) and `GND` pads, the sensor's raw data stream can be captured by an external microcontroller. 

The project specifically targets the PineDio Stack BL604, which features an onboard Semtech SX1262 LoRa transceiver. This allows the air quality data to be sent to The Things Network (TTN) and eventually visualized using tools like Prometheus and Grafana.

## Technical Implementation

The application interfaces with the sensor via a UART port configured at 9600 bps. In the NuttX environment, the sensor is typically accessed through a character device such as `/dev/ttyS1`. 

### Protocol Decoding

The sensor transmits a 20-byte data frame. The project includes logic to parse these frames based on the PM1006 specification. A typical frame includes:
- **Header**: `0x16 0x11 0x0B`
- **PM 2.5 Data**: Two bytes representing the concentration in µg/m³
- **Checksum**: A final byte used to validate the integrity of the 20-byte packet

### NuttX Configuration

Integrating the application involves standard NuttX build procedures. Users can enable the application through `menuconfig` under `Application Configuration > Examples`. The project also requires specific system configurations, such as enabling UART1 peripheral support and ensuring the `cat` command is available in the NuttX Shell (NSH) for initial debugging and data verification.

## Getting Started

To use this project, the repository is added as a submodule to the NuttX `apps/examples` directory. After configuring the build for the specific target board (e.g., `bl602evb:nsh` or `esp32-devkitc:nsh`), the `ikea_air_quality_sensor` command becomes available in the NSH. When executed, the application reads the serial device, validates the checksum, and prints the current PM 2.5 concentration to the console.

```c
// Example of the data processing loop
read(fd, &ch, 1);
if (ch == 0x16) { 
    // Potential start of a 20-byte frame
    // ... logic to read and validate the remaining 19 bytes
}
```

This project serves as an excellent example of how to bridge consumer hardware with professional-grade open-source RTOSs to create custom IoT solutions.
