---
title: HellzGate
summary: HellzGate is a multi-node wireless research platform built for the Espressif
  ESP32-C5 microcontroller. Running on ESP-IDF and FreeRTOS, it coordinates a master
  controller and multiple scanner nodes over ESP-NOW or I²C to perform passive dual-band
  Wi-Fi and BLE observation logging with GNSS time and location stamping.
slug: hellzgate
codeUrl: https://github.com/Hellz0wnzJ00/hellzgate
siteUrl: https://hellzgate.com
lastUpdated: '2026-10-12'
image: /202610/hellzgate_0.avif
rtos: freertos
topics:
- ble
- cpp
- dart
- embedded-systems
- esp32
- esp32-c5
- firmware
- flutter
- hardware
- iot
- kicad
- pcb
- wardriving
- wifi
- wigle
- wireless
isShow: true
createdAt: '2026-10-13T10:51:47+00:00'
updatedAt: '2026-10-13T10:51:47+00:00'
---

HellzGate is an independent, multi-node wireless research and observation platform architected around Espressif's dual-band ESP32-C5 microcontroller. Designed to overcome the physical and operational limitations of single-radio wardriving and spectrum analysis rigs, the platform distributes wireless monitoring across an array of coordinated scanner nodes coordinated by a dedicated master module.

### Multi-Node Architecture and Hardware Design

The primary hardware implementation, dubbed **C5 FullGate**, integrates a modular multi-transceiver backbone. The core board hosts up to ten removable Seeed Studio XIAO ESP32-C5 modules: one master coordinator and nine dedicated scanner nodes. 

Hardware design highlights include:
- **Dual Communication Topologies**: Scanner nodes communicate with the master through a primary high-throughput wired I²C production backbone or wirelessly over Espressif's ESP-NOW transport protocol.
- **Sensor and Peripheral Integration**: Built-in support for GNSS modules provides real-time geographic positioning and microsecond-level synchronization, paired with local high-speed microSD card logging.
- **Power Delivery and Diagnostics**: Equipped with USB-C Power Delivery (PD) alongside an XT60 connector for external 4S lithium-ion battery packs, an optional I²C OLED status display, and active cooling fan support.

While FullGate provides ten physical board slots, the firmware's ESP-NOW cluster protocol supports extended wireless scaling, having demonstrated coordinated data streaming from up to 20 concurrent scanner nodes during scalability testing.

### Firmware Architecture with FreeRTOS and ESP-IDF

The embedded firmware is implemented in C on top of Espressif's ESP-IDF framework, relying heavily on a FreeRTOS task-based design to manage strict real-time constraints. Passive dual-band (2.4 GHz and 5 GHz) Wi-Fi sniffing and Bluetooth Low Energy (BLE) advertisements generate substantial packet ingress. FreeRTOS task queues, ring buffers, and event loops isolate radio reception handlers from frame deduplication, CRC verification, and SD storage writes.

Communication modes include:
- **ESP-NOW Cluster Protocol**: Scanner nodes capture ambient RF frames, strip unnecessary payloads, package structured observation metadata, and broadcast them across a unified mesh channel to the master controller.
- **Wired I²C Backbone**: In RF-dense or stealth environments where radio transmission between nodes must be minimized, scanner nodes push captured batches directly across the I²C bus through an interrupt-driven polling mechanism.

### Data Pipeline and Export

Observations gathered by the scanning nodes are verified for integrity, timestamped against the GNSS fix, deduplicated, and committed to a microSD card in structured, 14-column WiGLE-compatible CSV format. During bench and mobile field tests spanning hundreds of thousands of observations, the storage pipeline sustained high write frequencies without buffer overflow or filesystem corruptions.

### Control and Diagnostics

For field management, the master node can run a local SoftAP hotspot that hosts an embedded HTTP management dashboard (`http://192.168.4.1`). Field operators can toggle the access point dynamically using hardware boot buttons to ensure the rig remains radio-silent when desired while logging continues uninterrupted in the background. A companion application developed with Flutter and Dart provides mobile telemetry and session analysis across iOS and Android.
