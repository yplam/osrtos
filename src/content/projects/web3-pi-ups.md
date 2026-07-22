---
title: Web3 Pi UPS
summary: An open-source DC uninterruptible power supply designed specifically for
  the Raspberry Pi 5, featuring triple-input power paths and smart battery management.
  It utilizes a dual-MCU architecture with a CH32X035 for power delivery and an RP2040
  for the user interface, while supporting remote monitoring via FreeRTOS and the
  lwIP stack.
slug: web3-pi-ups
codeUrl: https://github.com/Web3-Pi/Web3-Pi-UPS
siteUrl: https://www.web3pi.io/products/ups
lastUpdated: '2026-07-22'
licenses:
- CERN-OHL-S-2.0
image: /202607/Web3-Pi-UPS_0.avif
rtos: freertos
libraries:
- lwip
- platformio-platformio-core
topics:
- battery
- esp32-s3
- lte-m
- rasperry-pi
- rp2040
- ups
- usb-c
- usb-pd
- wch
isShow: true
createdAt: '2026-07-22T13:59:15+00:00'
updatedAt: '2026-07-22T13:59:15+00:00'
---

The Web3 Pi UPS is a purpose-built, compact DC UPS designed specifically for the Raspberry Pi 5. Born from the Web3 Pi project—a platform for running Ethereum nodes—it addresses a critical gap in the market. Running a blockchain node requires 24/7 uptime; power outages can corrupt databases and lead to financial penalties for solo stakers. This project provides a robust solution that actually fits the Raspberry Pi form factor.

## Why a Specialized DC UPS?

Traditional UPS units are often oversized for small computers. They typically involve multiple energy-wasting conversions: converting mains AC to DC for battery charging, then inverting DC back to AC for output, only for the device's power supply to convert it back to DC again. Furthermore, many HAT-style UPS boards stack via GPIO, which complicates mechanical assembly and enclosure compatibility.

The Web3 Pi UPS takes a streamlined approach. It sits between the charger and the Raspberry Pi, connected by a single USB-C cable. As a true DC UPS, power flows from input to battery to output without AC conversion, resulting in a compact, silent, and efficient device.

## Versatile Power Sources

The system is designed to accept power from three independent sources, ensuring the output remains uninterrupted if any single source is active:

*   **USB-C PD input**: Primary power from a 12-20V, 27W+ charger.
*   **DC barrel jack**: An alternative 9-24V input for standard power supplies.
*   **Sony NP-F battery**: Reliable backup power for when external sources fail.

Power switching is seamless and instant. When external power is lost, the battery takes over without any glitch in service. The choice of the Sony NP-F battery ecosystem allows users to leverage a globally available standard used widely in photography. These batteries are hot-swappable, allowing for continuous operation even during battery maintenance.

## Integrated Communication and Telemetry

One of the unique features of the Web3 Pi UPS is its use of the Raspberry Pi 5's USB-C data capabilities. A single cable carries both Power Delivery and a data channel. This link enables graceful shutdowns when the battery reaches critical levels, preventing filesystem corruption. It also provides real-time telemetry, including battery levels, charging status, voltage, and temperature.


For local monitoring, the UPS features a built-in UI panel consisting of an SSD1306 OLED display, two tactile buttons, and an onboard buzzer for audible alerts. This allows users to check system status without needing to SSH into the Pi.

## Technical Architecture

The device is essentially a "Raspberry Pi for a Raspberry Pi," as it uses a Raspberry Pi RP2040 microcontroller to manage the UI panel and system monitoring. The main power handling is managed by a CH32X035 RISC-V MCU, which features a built-in USB-PD 3.0 PHY for sophisticated power negotiation.

### Electronics and Enclosure

The hardware is split into two primary assemblies:
1.  **Main Board**: A 4-layer PCB containing the USB-PD controller, an MP2762A charger for 2S Li-ion management, and a TPS55289 buck-boost converter capable of delivering up to 27W.
2.  **UI Panel**: A 2-layer PCB housing the RP2040, the OLED display, and control buttons.

![UI Panel — top](/202607/Web3-Pi-UPS_1.avif)
![UI Panel — bottom](/202607/Web3-Pi-UPS_2.avif)

The system is housed in a multi-part 3D-printed enclosure designed for FDM printing, featuring a snap-fit battery latch and dedicated windows for the OLED display.

## Firmware and Development

The repository contains multiple firmware components catering to the different processors on board. The RP2040 firmware is built using PlatformIO and the Arduino core, while the CH32X035 firmware utilizes the MounRiver Studio toolchain or `riscv-none-embed-gcc`. Additionally, for configurations involving cellular connectivity, the project includes an ESP32-S3 based firmware that leverages ESP-IDF, FreeRTOS, and the lwIP stack to handle secure MQTT communication and remote OTA updates.
