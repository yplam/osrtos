---
title: Batear
summary: An edge-only acoustic drone detection system built for the ESP32-S3 that
  uses FFT-based harmonic analysis to identify rotor signatures. It features encrypted
  LoRa communication between detectors and gateways, with seamless integration into
  Home Assistant via MQTT.
slug: batear
codeUrl: https://github.com/batear-io/batear
siteUrl: https://www.batear.io/
version: v2.0.0
lastUpdated: '2026-04-18'
licenses:
- MIT
image: /202604/batear_0.avif
rtos: freertos
libraries:
- lwip
topics:
- acoustic
- anti-war
- drone
- drone-detection
- esp32
- heltec
- home-assistant
- lilygo
- lora
- poe
isShow: true
createdAt: '2026-04-19T08:48:11+00:00'
updatedAt: '2026-04-19T08:48:11+00:00'
---

Batear is a specialized firmware application designed for civil defense and community monitoring, turning low-cost microcontrollers into sophisticated acoustic sensors. While traditional drone detection often relies on expensive radar or high-bandwidth camera systems, Batear focuses on the unique acoustic signature produced by drone rotors. By running entirely at the edge on the ESP32-S3, it provides a private, subscription-free solution for monitoring airspace near homes, farms, or community borders.

### Acoustic Detection Pipeline

The system's core is a digital signal processing pipeline that analyzes ambient sound in real-time. Using an ICS-43434 I2S MEMS microphone, the device samples audio at 16 kHz. The firmware then performs a 1024-point real Fast Fourier Transform (FFT) using ESP-DSP SIMD-accelerated routines. This process produces a power spectral density with a resolution of 15.625 Hz per bin.

Detection is based on identifying the "harmonic ladder" characteristic of multi-rotor drones. The algorithm scans for a fundamental frequency (f₀)—representing the motor and propeller RPM—and validates the presence of energy peaks at the 2×f₀ and 3×f₀ harmonics. To prevent false alarms from transient environmental noises, the system employs a confidence scoring heuristic that considers the Signal-to-Noise Ratio (SNR) and harmonic ratios, paired with exponential moving average smoothing and hysteresis.

### Dual-Role Architecture

The codebase is designed to be versatile, building into one of two roles selectable at compile time:

*   **The Detector**: This unit serves as the "ear." It handles the microphone input, runs the FFT analysis, and monitors battery levels. When a drone is confirmed, it transmits an AES-128-GCM encrypted alert over LoRa.
*   **The Gateway**: This unit acts as the bridge. It listens for LoRa transmissions from multiple detectors, manages local alerts via an OLED display and LED indicators, and forwards data to a smart home ecosystem via WiFi.

### Hardware and Connectivity

Batear is optimized for the Heltec WiFi LoRa 32 (V3 and V4) platforms, which integrate the ESP32-S3 MCU with an SX1262 LoRa transceiver. This hardware choice allows for long-range communication without the need for internet connectivity at the detection point. For those looking for professional integration, the gateway supports MQTT with automatic device discovery for Home Assistant. This allows users to trigger automated responses—such as smart lights, sirens, or mobile notifications—the moment a drone is detected.

### Secure and Efficient Operation

Security and efficiency are central to the project's design. Communication between the detector and gateway is secured with modern encryption, ensuring that alert data cannot be intercepted or spoofed. On the power management side, the firmware includes clever optimizations, such as gating the battery monitoring resistor divider to eliminate parasitic drain between measurements, making it suitable for battery-powered field deployments.

### Building from Source

The project utilizes the ESP-IDF framework. Developers can build both roles from the same repository by specifying different sdkconfig defaults:

```bash
# Build the detector role
idf.py -B build_detector \
  -DSDKCONFIG=build_detector/sdkconfig \
  -DSDKCONFIG_DEFAULTS="sdkconfig.defaults;sdkconfig.detector" \
  set-target esp32s3
idf.py -B build_detector -DSDKCONFIG=build_detector/sdkconfig build

# Build the gateway role
idf.py -B build_gateway \
  -DSDKCONFIG=build_gateway/sdkconfig \
  -DSDKCONFIG_DEFAULTS="sdkconfig.defaults;sdkconfig.gateway" \
  set-target esp32s3
idf.py -B build_gateway -DSDKCONFIG=build_gateway/sdkconfig build
```

By leveraging the SIMD capabilities of the ESP32-S3, Batear keeps the entire FFT and harmonic scanning process under 10 ms per frame, allowing the device to remain highly responsive while maintaining low power consumption.
