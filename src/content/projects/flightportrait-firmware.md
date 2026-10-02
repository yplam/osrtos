---
title: FlightPortrait Firmware
summary: FlightPortrait is an open-source firmware for an ESP32-S3-powered 13.3" color
  e-ink frame that visualizes local aviation traffic. Built using the ESP-IDF framework,
  it leverages FreeRTOS and NimBLE to provide a secure, low-power display solution
  that retrieves images via HTTPS. The project emphasizes a "simple by design" approach,
  featuring a robust state machine for provisioning, polling, and deep sleep cycles
  to maximize battery life.
slug: flightportrait-firmware
codeUrl: https://github.com/flightportrait/frame
version: v0.2.4
lastUpdated: '2026-07-30'
licenses:
- Apache-2.0
rtos: freertos
libraries:
- nimble
- lwip
topics:
- adsb
- aviation
- eink
- epaper
- esp-idf
- esp32
- firmware
isShow: false
createdAt: '2026-08-09T09:13:53+00:00'
updatedAt: '2026-08-09T09:13:53+00:00'
relatedProjects:
- flightradar24-ttgo
- open-display-firmware
- inkcast
- readmepaper-esp32-7-color-e-paper-display-project
- esp32flight
- esp32-flight-tracker
---

## A Window into the Skies

FlightPortrait is a unique intersection of aviation hobbyism and elegant hardware design. It is an open-source firmware project for a battery-powered 13.3" color e-ink frame that serves a single, focused purpose: drawing the aircraft that recently flew over your home. Unlike many IoT devices that demand constant connectivity and offer broad attack surfaces, FlightPortrait is built on a philosophy of deliberate simplicity and security.

## Hardware and Architecture

The project is primarily designed for the ESP32-S3, targeting hardware such as the XIAO ESP32-S3 Plus paired with the EE02 driver board, or the reTerminal E1004. The centerpiece of the device is a 13.3" E Ink Spectra 6 display, offering a portrait resolution of 1200×1600. Because rendering high-resolution color images on e-ink is resource-intensive, the firmware makes extensive use of the ESP32-S3's OPI PSRAM to buffer 960 KB image downloads before they are verified and blitted to the panel.

The firmware is built using ESP-IDF (v5.3+), utilizing FreeRTOS for task management and the NimBLE stack for low-energy Bluetooth provisioning. The system follows a strict "wake-poll-display-sleep" lifecycle. By spending the vast majority of its time in deep sleep and never listening for incoming network connections, the device minimizes battery consumption and eliminates the risk of unauthorized network access.

## Secure by Design

Security is baked into the FlightPortrait protocol. The device uses BLE Unified Provisioning (Security 2) for initial setup. Once connected to WiFi, it communicates with a server over HTTPS using a specific three-endpoint API contract. 

The firmware includes several robust safety features:
- **Signed Downloads**: The device never displays an unverified buffer; it performs SHA256 hash and size checks on every streamed image.
- **Identity Management**: Each unit uses per-device factory credentials and runtime P-256 possession keys for authentication.
- **Exponential Backoff**: To protect both the device battery and the server, the firmware implements an ownership-controlled backoff strategy (ranging from 5 minutes to 6 hours) in case of errors.
- **Memory Safety**: The main task is allocated a generous 12 KiB stack to safely handle JSON buffers and TLS/HTTP client operations without risking overflows.

## Flexibility and the BYOS Protocol

While FlightPortrait is designed to work with a dedicated cloud service, it is also explicitly "yours." The project maintains a "Bring Your Own Server" (BYOS) philosophy. A stock frame can be pointed at any server that implements the protocol defined in the repository's documentation. To facilitate this, the repository includes a reference server written in standard Python (`examples/byos_server.py`), allowing users to host their own image-serving infrastructure without modifying the device's firmware.

## Getting Started

For developers looking to experiment, the repository provides multiple entry points. While the main production firmware is built using the ESP-IDF toolchain, there is also an `arduino-sd-demo`. This allows users to get "art on glass" within an hour of unboxing by blitting pre-rendered binary images from a microSD card using the Arduino IDE. 

The project maintains high standards for documentation and testing, with pure-C contract tests that can be compiled on a host machine without hardware. This ensures that the core logic—such as the URL normalization and the error log ring buffer—remains reliable across updates.
