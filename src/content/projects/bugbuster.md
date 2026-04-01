---
title: BugBuster
summary: BugBuster is an open-source, four-channel analog/digital I/O debug and programming
  tool built around the ESP32-S3 and the Analog Devices AD74416H. It features a high-precision
  ADC/DAC, waveform generation, and a 32-switch MUX matrix, all managed by a FreeRTOS-based
  firmware and a cross-platform Tauri desktop application.
slug: bugbuster
codeUrl: https://github.com/lollokara/bugbuster
lastUpdated: '2026-03-31'
licenses:
- MIT
image: /202603/bugbuster_1.avif
rtos: freertos
libraries:
- spiffs
- platformio-platformio-core
isShow: true
createdAt: '2026-03-31T23:22:11+00:00'
updatedAt: '2026-03-31T23:22:11+00:00'
---

BugBuster is a versatile bench instrument designed to replace a collection of traditional lab equipment with a single USB-C connected board. It is specifically tailored for embedded systems testing and field instrument prototyping, offering high-precision analog and digital capabilities in a compact form factor.

## Versatile Analog/Digital Capabilities
The tool turns a single USB-C connection into a powerful diagnostic interface. It features a 4-channel 24-bit ADC capable of up to 4.8 kSPS per channel and a 4-channel 16-bit DAC for voltage and current output. Beyond simple I/O, it includes a waveform generator for sine, square, and triangle waves, resistance measurement for RTDs, and a real-time oscilloscope with binary recording capabilities.


## Technical Architecture
The system architecture is centered on the ESP32-S3 dual-core microcontroller. The firmware is built using the ESP-IDF framework and leverages FreeRTOS to partition tasks efficiently across both cores. Core 0 handles high-level communication protocols including WiFi, HTTP, and USB CDC, while Core 1 is dedicated to timing-critical hardware operations like ADC polling, DAC updates, and fault monitoring.

Key hardware components include:
- **AD74416H**: The primary 4-channel software-configurable I/O.
- **ADGS2414D**: A matrix of four octal SPST switches providing a 32-switch MUX for flexible signal routing.
- **DS4424**: A 4-channel IDAC used to tune the feedback networks of the adjustable DC-DC converters.
- **HUSB238**: A USB-C Power Delivery controller that negotiates between 5V and 20V from the source.

![Overview tab](/202603/bugbuster_3.avif)

## Hardware and Pin Assignments
The PCB, designed in Altium Designer, utilizes a sophisticated power topology. USB-C power is negotiated via PD and then regulated through LTM8063 step-down converters to provide adjustable output voltages between 3V and 15V. These outputs are protected by TPS1641x e-fuses, which are monitored and controlled by a PCA9535 GPIO expander.

Communication between the ESP32-S3 and the various ICs is handled via a 10-20 MHz SPI bus for the high-speed I/O and MUX matrix, and a shared I2C bus for the power controllers and expanders.

![Signal path / MUX matrix](/202603/bugbuster_5.avif)

## Communication and Desktop Integration
BugBuster supports two primary transport layers: USB CDC for low-latency streaming and WiFi HTTP for remote access. Both utilize the BugBuster Protocol (BBP), a custom framed protocol using COBS encoding and CRC-16 for data integrity. 

The project includes a comprehensive desktop application built with Tauri v2 and Leptos 0.7. This app provides 18 dedicated tabs for various functions, including a real-time oscilloscope, a waveform generator preview, and an interactive visualization of the 32-switch MUX matrix. State is pushed from the firmware to the UI at 5 Hz, ensuring a responsive diagnostic experience.

![Diagnostics tab](/202603/bugbuster_8.avif)

## Firmware Management and OTA
The firmware is managed via PlatformIO and uses a custom partition table to support A/B OTA updates. This allows for safe wireless updates where the bootloader can automatically roll back if a new firmware version fails to boot. User settings, WiFi credentials, and calibration data for the IDAC are preserved across updates within a dedicated NVS partition. For web-based interaction, the device also hosts a built-in web UI served from a SPIFFS partition.
