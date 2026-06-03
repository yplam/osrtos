---
title: Mbed OS 6 STM32 IoT Ethernet Controller
summary: An IoT controller project for the STM32F103C8 (BluePill) using Mbed OS 6
  and the Wiznet W5500 Ethernet module. It provides MQTT connectivity for remote monitoring
  and control of digital inputs, outputs, and temperature sensors.
slug: mbed-os-6-stm32-iot-ethernet-controller
codeUrl: https://github.com/geekshow/mbed-os6-stm32-w5500-mqtt
star: 2
version: IO-v2
lastUpdated: '2023-11-14'
rtos: mbed-os
topics:
- bluepill
- controller
- iot
- mbed
- mbed-os
- mqtt
- stm32
- stm32f103
- w5500
- wiznet
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- electricitydisplay-mqtt-remote-control-for-esp8266-esp32
- mqtt-demo-for-stm32-iot-discovery-board-with-thingsboard
- apache-mynewt-sensor-network-for-stm32-blue-pill
- stm32-lwip-mqtt-demo
- 6lbr-on-telecontrolli-devices-x-ip4t-x-ip5
- stm32-bluepill-rndis-device-with-lwip
---

The Mbed OS 6 STM32 IoT Ethernet Controller is a robust firmware solution designed for the STM32F103C8, commonly known as the BluePill. By integrating the Wiznet W5500 Ethernet controller, this project transforms a standard microcontroller into a networked IoT node capable of communicating via the MQTT protocol.

## Hardware Integration and Connectivity

The core of the system is the STM32F103C8, an ARM Cortex-M3 microcontroller. Connectivity is handled by the Wiznet W5500, which provides a hardwired TCP/IP stack, offloading network processing from the MCU. The project is specifically tailored for Mbed OS 6, utilizing the bare-metal profile to minimize memory footprint while maintaining the powerful hardware abstraction layer (HAL) provided by Mbed.

## Key Features and Capabilities

The controller is designed for versatile I/O management and environmental monitoring. Key capabilities include:

- **MQTT Messaging**: Enables bi-directional communication with IoT brokers for remote control and data logging.
- **Digital I/O Control**: Supports multiple DigitalIn pins (PA_0 to PB_0) and DigitalOut pins (PB_7 to PA_8) for interfacing with switches, relays, and actuators.
- **Temperature Sensing**: Integrated support for the DS18B20 1-wire temperature sensor on pin PB_1.
- **Visual Feedback**: Support for SSD1306-based OLED displays via I2C for local status monitoring.
- **Debug Interface**: Serial output on PB_10 at 115200 baud for real-time debugging and system status updates.

## Pin Configuration

The project defines a specific pinout for the BluePill board to ensure reliable operation:

- **Network (SPI)**: PB_12 through PB_15 are dedicated to the Wiznet SPI interface, with PB_11 acting as the hardware reset.
- **Status Indicators**: PC_13 (the onboard green LED) is used to indicate the online/offline status of the controller.
- **Sensors and Peripherals**: PB_1 is reserved for the DS18B20 (requiring a 4.7k pull-up resistor), while PB_8 and PB_9 handle I2C communication.
- **Input/Output**: PA_0 through PB_0 are configured as 9 digital inputs, while PB_7 through PA_8 provide 11 digital outputs.

## Technical Implementation

The project utilizes the Mbed OS 6 bare-metal configuration, as seen in the `mbed_app.json` file. This configuration optimizes the system by using the "small" C library and minimal-printf, which is essential for the limited flash and RAM of the STM32F103C8. The build system is managed via CMake, providing a modern development workflow for Mbed-based applications.

The integration of the `WIZnetInterface` and `MQTT` libraries allows for a structured networking stack. The `MQTTNetwork.h` wrapper facilitates the connection between the Ethernet interface and the MQTT client, ensuring that data packets are reliably transmitted over the wire. This architecture makes it particularly well-suited for industrial or home automation applications where wired Ethernet reliability is preferred over wireless alternatives.
