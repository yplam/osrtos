---
title: Apache Mynewt Sensor Network for STM32 Blue Pill
summary: An IoT sensor network application for STM32 Blue Pill using Apache Mynewt
  RTOS. It supports multiple operational modes including standalone WiFi nodes, low-power
  nRF24L01 sensor nodes, and collector gateways. The project features internal temperature
  monitoring, WiFi geolocation, and integration with thethings.io via CoAP and CBOR.
slug: apache-mynewt-sensor-network-for-stm32-blue-pill
codeUrl: https://github.com/lupyuen/stm32bluepill-mynewt-sensor
star: 103
version: v13.0.0
lastUpdated: '2020-12-09'
rtos: apache-mynewt
libraries:
- mcuboot
- nimble
topics:
- bme280
- coap
- embedded-c
- embedded-rust
- esp8266
- gps
- ibeacon
- iot
- mynewt
- mynewt-driver
- mynewt-thethings
- nb-iot
- nimble
- nrf24l01
- nrf52
- quectel
- rust
- stm32
- stm32f103c8t6
- udp
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- mbed-os-6-stm32-iot-ethernet-controller
- mqtt-demo-for-stm32-iot-discovery-board-with-thingsboard
- bluetooth-mesh-sensor-network
- building-wireless-sensor-networks-with-openthread
- esp32-ruuvitag-collector
- low-power-wireless-networking-for-iot-lpiot
---

The STM32 Blue Pill remains one of the most popular entry-level development boards for embedded enthusiasts. This project elevates the hardware by implementing a sophisticated sensor network using the Apache Mynewt RTOS. By leveraging Mynewt's modular architecture, the application demonstrates how to build a scalable IoT system that can communicate via WiFi using the ESP8266 or via 2.4GHz radio using the nRF24L01.

## Multi-Mode Network Architecture

The application is designed to operate in several distinct modes, allowing a single codebase to serve multiple roles in a distributed sensor network:

- **Standalone Node**: Directly connects to WiFi via ESP8266 to send internal temperature data to a CoAP server.
- **Sensor Node**: Acts as a low-power remote unit, transmitting sensor data over nRF24L01 using the CBOR format.
- **Collector Node**: Serves as a gateway, receiving CBOR data from remote nRF24L01 nodes and forwarding it to the cloud via ESP8266 in JSON format.
- **WiFi Geolocation**: Scans for nearby WiFi Access Points and transmits their MAC addresses and signal strengths to compute location data via the Google Geolocation API.

## Driver and Library Ecosystem

Beyond the core application logic, the project includes a suite of custom Mynewt drivers and libraries. These include specialized drivers for the ESP8266 and nRF24L01, as well as an ADC driver for the STM32F1 series. The inclusion of a Sensor CoAP library and a Sensor Network library simplifies the process of formatting and transmitting data across different physical layers. 

The project also features a custom HMAC pseudorandom number generator (PRNG) that uses entropy derived from the internal temperature sensor, providing a unique approach to security on resource-constrained hardware.

## Advanced Features and Rust Integration

While the core of this project focuses on C-based development, the repository ecosystem extends into modern embedded development with Rust. Various branches explore using Rust for memory safety, including the use of Rust macros and safe wrappers for Mynewt APIs. This makes it a valuable resource for developers looking to transition from traditional C firmware to more modern, safe languages on platforms like the STM32, nRF52, and GD32VF103.

## Configuration and Deployment

System configuration is handled through Mynewt's `syscfg.yml` system, allowing developers to toggle features like geolocation or specific hardware tutorials easily. The project also integrates with Arm Semihosting for debugging, providing a console interface through the debugger without requiring a dedicated UART-to-USB adapter for logs.

```yaml
syscfg.vals:
    # Example configuration for a Standalone Node with Geolocation
    TUTORIAL2: 1
    WIFI_GEOLOCATION: 1
    # Configure hardware IDs for the network
    COLLECTOR_NODE_HW_ID: 0x12345678
```

The project serves as a practical implementation of the Sensor Framework in Apache Mynewt, showing how to abstract hardware sensors into a unified data stream that can be consumed by various transport protocols and cloud services like thethings.io.
