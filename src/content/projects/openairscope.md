---
title: OpenAirScope
summary: OpenAirScope is a high-performance, open-source environmental monitoring
  platform built on the STM32H743 and ESP32-C3 microcontrollers. It features multi-protocol
  wireless connectivity including LoRaWAN, Wi-Fi, and Bluetooth, alongside a sophisticated
  sensor suite for comprehensive air quality and acoustic analysis.
slug: openairscope
codeUrl: https://github.com/emertcakir/OpenAirScope
lastUpdated: '2025-11-22'
licenses:
- MIT
image: /202606/OpenAirScope_0.avif
rtos: ''
libraries:
- platformio-platformio-core
topics:
- air-quality
- can-bus
- environmental-monitoring
- esp32
- iot
- kicad
- lipo-battery
- lorawan
- oled-display
- open-source
- pcb-design
- rs485
- sdcard
- sensors
- stm32
- usb-c
isShow: true
createdAt: '2026-06-04T00:43:32+00:00'
updatedAt: '2026-06-04T00:43:32+00:00'
relatedProjects:
- project-aura
- q-sensor-multi-functional-zigbee-air-quality-sensor
- smart-iot-sensor-with-xiao-esp32c6
- tinycore-esp32-s3-learning-platform
- dualcast
- nrf52840-m-2-developer-kit
---

OpenAirScope is an advanced open-source hardware and software ecosystem designed for high-precision environmental monitoring. By combining industrial-grade processing power with a versatile array of sensors, it provides a robust solution for tracking air quality, noise pollution, and various atmospheric parameters in real-time.

### Hardware Architecture and Design

At the heart of OpenAirScope is a dual-processor architecture. It leverages the high-performance **STM32H743** (ARM Cortex-M7 running at 400 MHz) to handle complex algorithms and real-time data processing. This is complemented by an **ESP32-C3-WROOM-02** for Wi-Fi and Bluetooth LE connectivity, and a **RAK3172** module for long-range LoRaWAN communication. 


The PCB design is highly modular, supporting a wide range of state-of-the-art sensors. This includes the **SGP41-D-R4** for VOC and NOx gas sensing, the **SCD40-D-R2** for CO2 and climate monitoring, and the **SPS30** for laser-based particulate matter detection (PM1.0 through PM10). For acoustic analysis, the board integrates dual **SPH0645LM4H-B** digital MEMS microphones, enabling noise level tracking and sound frequency evaluation.

![Perspective view of the OpenAirScope hardware design](/202606/OpenAirScope_1.avif)

### Connectivity and Visualization

OpenAirScope is designed for flexibility in both data transmission and local interaction. For long-range IoT applications, it features an external SMA antenna connector specifically for LoRaWAN. For industrial or wired environments, the board includes RS485 and CAN-Bus support, alongside a modern USB-C interface.

![Side profile of the OpenAirScope PCBA highlighting the modular sensor mounting](/202606/OpenAirScope_2.avif)

Local data visualization is handled by a 1.5-inch RGB OLED display. With a 128×128 resolution and 65K colors, the SPI-driven screen allows for fast graphics and immediate feedback of environmental metrics directly on the device. Power management is equally versatile, supporting Li-Ion batteries with simultaneous USB charging, making it suitable for both portable field use and permanent stationary installations.

### Software and Development

The project provides a developer-friendly environment with support for both **STM32CubeIDE** and **PlatformIO**. The software stack utilizes the STM32Cube HAL (Hardware Abstraction Layer) to manage core peripherals like FDCAN, SPI, and I2C. The repository includes open-source drivers, example libraries for sensor integration, and specific algorithms for evaluating air quality data. 

![Detailed 3D render of the OpenAirScope environmental monitoring node](/202606/OpenAirScope_5.avif)

### Applications and Use Cases

Thanks to its modular design and powerful processing capabilities, OpenAirScope is positioned for a variety of professional and research applications:
* **Smart Cities**: Deploying distributed networks for urban air quality tracking.
* **Industrial Monitoring**: Using RS485 and gas sensors to ensure workplace safety.
* **Acoustic Research**: Utilizing dual MEMS microphones for noise pollution mapping.
* **Remote IoT**: Leveraging LoRaWAN for long-range data collection in areas without Wi-Fi coverage.

***

**Note on Prototype Status**: This design is currently in an experimental, unverified prototype phase. Users interested in manufacturing the PCB should be aware that it has not yet undergone full functional testing and carries the inherent risks of an initial hardware revision.
