---
title: TankSync
summary: TankSync is a solar-powered, local-first smart water monitoring system built
  on ESP32 and ESP32-C3 hardware using the ESP-IDF framework. It utilizes long-range
  LoRa communication to bridge rooftop sensors with an indoor hub, offering Home Assistant
  integration and offline reliability via FreeRTOS-based firmware.
slug: tanksync
codeUrl: https://github.com/Techposts/TankSync
siteUrl: https://tanksync.smartghar.org
version: tx-v2.0.15
lastUpdated: '2026-05-27'
licenses:
- AGPL-3.0
image: /202606/TankSync_0.avif
rtos: freertos
libraries:
- spiffs
- lwip
topics:
- agpl
- esp-idf
- esp32
- hacs
- home-assistant
- iot
- local-first
- lora
- mqtt
- open-hardware
- rylr998
- smartghar
- solar-powered
- ultrasonic-sensor
- water-tank-monitor
isShow: true
createdAt: '2026-06-02T23:24:07+00:00'
updatedAt: '2026-06-02T23:24:07+00:00'
---

TankSync is engineered with a focus on reliability rather than cloud dependency. Designed to address the challenges of water monitoring in demanding environments, it provides a robust solution that continues to function even when internet connectivity fails. The system is built for resilience, featuring local operation by default and an optional cloud layer for convenience.

### Reliability-First Engineering

Unlike many smart home products that rely heavily on remote servers, TankSync treats the cloud as an optional enhancement. The indoor hub remains fully functional offline, providing tank level updates, LED status indications, and overflow alerts regardless of WiFi or ISP status. This local-first approach ensures that critical water monitoring is never interrupted by external connectivity issues.


To solve the common problem of poor WiFi coverage on rooftops, TankSync uses 865/915 MHz LoRa (REYAX RYLR998) for communication. This allows the sensor to transmit data through thick concrete walls and across multiple floors, reaching distances of up to 5 km in line-of-sight conditions. This architectural choice eliminates the need for extending WiFi networks to the terrace or tank location.

### System Architecture

The system consists of two primary hardware components: the Transmitter and the Hub. 

*   **The Transmitter**: Based on an ESP32-C3 SuperMini, this unit is mounted on the tank lid. It utilizes a JSN-SR04T waterproof ultrasonic sensor for non-contact measurement and is powered by a solar-charged 18650 battery. The firmware is optimized for deep sleep, allowing for months of autonomy even in low-light conditions.
*   **The Hub**: An ESP32-based receiver that collects data from the transmitter via LoRa. It features an SH1106 OLED display for immediate visual feedback and a WS2812 LED ring for status alerts. The hub acts as the gateway to the local network and Home Assistant.

![TankSync solar tank sensor — side profile with ultrasonic measurement waves visualised](/202606/TankSync_1.avif)

### Hardware and Industrial Design

The hardware is designed to withstand harsh environmental conditions, specifically tested through 45°C ambient temperatures in Delhi summers. The enclosures are intended for UV-stabilised PETG 3D printing with IP65 sealing to ensure they are monsoon-ready. The transmitter features a custom circular PCB (REV 2.2) and a threaded sensor mount that secures through a standard tank-lid hole.

![Populated TX PCB — REV 2.2, May 2026 (open hardware)](/202606/TankSync_2.avif)

### Software and Integration

The firmware for both devices is developed using the Espressif IoT Development Framework (ESP-IDF v5.4). It leverages FreeRTOS for task management, mbedTLS for secure communications, and SPIFFS for local data storage. For ease of deployment, a browser-based flasher using WebSerial is available, allowing users to update firmware without command-line tools.

![Hub local web UI showing tank levels and offline status](/202606/TankSync_4.avif)

Users can interact with the system through multiple interfaces. The hub hosts a local web UI for configuration and real-time monitoring. For advanced smart home users, TankSync offers native Home Assistant integration via MQTT auto-discovery or a dedicated HACS integration. This bidirectional integration allows users to not only view sensors and events but also configure device parameters like tank capacity and sleep intervals directly from the Home Assistant dashboard.

### Open Source and Licensing

TankSync is open at its core, providing public access to firmware, hardware schematics, and BOMs. The firmware is licensed under AGPL-3.0 to ensure that modifications remain open to the community, while the hardware designs are shared under CC BY-SA 4.0. This transparency prevents vendor lock-in and allows for community audits and modifications.
