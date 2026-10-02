---
title: GeoShake
summary: GeoShake is an open-source firmware and hardware project for a distributed,
  real-time earthquake monitoring station based on the ESP32-S3. It utilizes high-precision
  accelerometers and on-device seismic processing to contribute to a global seismic
  network via MQTT and BLE connectivity.
slug: geoshake
codeUrl: https://github.com/GeoShake/geoshake
siteUrl: https://www.geoshake.org/
lastUpdated: '2026-07-30'
licenses:
- NOASSERTION
image: /202608/geoshake_0.avif
rtos: freertos
libraries:
- nimble
- lwip
topics:
- citizen-science
- earthquake
- earthquake-detection
- earthquake-early-warning
- esp-idf
- esp32
- gpl-3
- iot
- open-data
- seismology
- seismometer
isShow: true
createdAt: '2026-08-02T06:42:58+00:00'
updatedAt: '2026-08-02T06:42:58+00:00'
relatedProjects:
- quakeguard
- project-aura
- cyd-tactical-weather-station
- twatch-v3-firmware-for-esp32
- openairscope
- motesync
---

## Distributed Earthquake Monitoring with GeoShake

GeoShake is an ambitious project designed to turn homes, offices, and schools into active nodes in a global seismic network. By combining low-cost, high-performance embedded hardware with sophisticated signal processing, GeoShake enables real-time earthquake monitoring through a distributed architecture. The project focuses on providing open-source firmware, enclosure designs, and open data, allowing users to build or modify their own monitoring stations while contributing to a larger scientific effort.

## Hardware and Sensor Fusion

The current flagship device, the GeoShake T1 (Rev-C), is built around the ESP32-S3 microcontroller. This choice provides the necessary computational power for local digital signal processing (DSP) and the connectivity required for real-time data transmission. 

What sets the GeoShake hardware apart is its sensor array. Rather than relying on a single sensor, the T1 utilizes four ST LSM6DSO accelerometers communicating over SPI. These sensors operate at 104 Hz with a ±2 g range. By aggregating data from multiple sensors, the system can improve signal-to-noise ratios and provide more reliable seismic detection. The firmware manages these sensors to perform on-device STA/LTA (Short-Term Average / Long-Term Average) seismic triggering, along with per-second RMS and Peak Ground Acceleration (PGA) feature extraction.

## Verifiable Science and DSP

A unique aspect of the GeoShake project is its commitment to "verifiable science." To ensure that the seismic data collected is accurate and consistent across different implementations, the C-based firmware is bit-locked to a TypeScript DSP reference located in the `shared` directory of the repository. 

During every boot sequence, the device re-asserts "golden vectors." If the results produced by the C implementation diverge from the TypeScript reference, the system logs a failure. This approach allows the community to audit the signal processing logic independently in a high-level language (TypeScript) while maintaining the performance of the embedded C implementation. The system also maintains a ring buffer of event waveforms, capturing approximately 6.5 seconds of raw data around each trigger for detailed analysis.

## Connectivity and Security

Operating as an IoT-connected seismic station requires robust and secure communication. GeoShake utilizes the ESP-IDF framework, leveraging FreeRTOS for task management and the NimBLE stack for Bluetooth Low Energy (BLE) functionality. BLE is primarily used for device provisioning through the GeoShake mobile app, though a captive-portal fallback is available for traditional WiFi setup.

Data is transmitted to the network via MQTT over TLS, ensuring that seismic features and triggers are sent securely. The project also prioritizes long-term maintenance through signed Over-the-Air (OTA) updates using RSA-3072. These updates include A/B rollback capabilities to prevent bricking during remote maintenance, and the device remains user-reflashable over USB-C for those who prefer full manual control.

## Open Source Philosophy

GeoShake maintains a transparent approach to its "open" status. While the firmware (GPL-3.0), enclosure designs (CC BY-SA 4.0), and seismic data (CC BY 4.0) are fully open-source and available in the repository, the PCB design and cloud backend remain proprietary. This distinction is clearly documented, providing a realistic path for DIY enthusiasts: one can print the enclosure and flash the firmware onto a custom carrier board using the documented pinouts, or purchase a pre-assembled device to join the official GeoShake network.
