---
title: ESP-PPB
summary: ESP-PPB is an open-source, wireless, battery-powered platform for distributed,
  phase-coherent Wi-Fi Channel State Information (CSI) capture. Built on the ESP32-C3
  and the ESP-IDF framework using FreeRTOS and LwIP, it achieves sub-PPB clock alignment
  by disciplining a VCTCXO using Wi-Fi Fine Timing Measurement (FTM). This enables
  advanced wireless sensing applications like angle-of-arrival estimation and indoor
  localization without the need for wired synchronization.
slug: esp-ppb
codeUrl: https://github.com/jonathanmuller/esp-ppb
lastUpdated: '2026-03-04'
licenses:
- GPL-3.0
image: /202604/esp-ppb_0.avif
rtos: freertos
libraries:
- lwip
topics:
- angle-of-arrival
- antenna-array
- aoa
- csi
- eso32-c3
- esp32
- ftm
- hardware
- indoor-localization
- iot
- lock
- music-algorithm
- phase
- sensing
- vctcxo
- wi-fi
- wifi
isShow: true
createdAt: '2026-04-21T05:22:13+00:00'
updatedAt: '2026-04-21T05:22:13+00:00'
---

ESP-PPB is a distributed, phase-coherent Wi-Fi Channel State Information (CSI) platform designed to be fully open-source, wireless, and battery-powered. CSI captures how a Wi-Fi signal travels between a transmitter and receiver, providing amplitude and phase data on every subcarrier. By achieving phase-coherent CSI across multiple nodes, the system enables complex applications such as angle-of-arrival (AoA) estimation, indoor localization, and distributed wireless sensing without the constraints of wired backhauls or tethered power. Each node synchronizes its clock over the air using Wi-Fi Fine Timing Measurement (FTM) and a Voltage-Controlled Temperature-Compensated Crystal Oscillator (VCTCXO) disciplined by dual DACs.


## Why ESP-PPB

Traditional Wi-Fi CSI platforms often require physical cables between antennas, wired connections to a PC, or lack the ability to synchronize phase across multiple devices. ESP-PPB addresses these limitations by providing a solution that is simultaneously wireless, battery-powered, and phase-synchronized. It supports an unlimited number of synced nodes at a significantly lower cost per node compared to existing enterprise or research tools. This portability allows researchers to drop nodes in various environments and collect synchronized data remotely over Wi-Fi.

## Performance and Validation

The system is currently functional end-to-end, with synchronization stability reaching the parts-per-billion (PPB) level. Testing in standard indoor environments has demonstrated that multi-node phase-coherent CSI capture works effectively for detecting the presence and position of objects. 

![Angle of arrival matrices showing phase differences across nodes](/202604/esp-ppb_1.avif)

Heatmaps generated from pairwise CSI phase differences between nodes show visible patterns that change based on physical obstructions, such as placing objects between nodes. Furthermore, the CSI phase per subcarrier across synchronized nodes remains stable and flat, which is the necessary foundation for super-resolution direction-finding algorithms like MUSIC and ESPRIT.

![CSI phase angle per subcarrier across synchronized nodes](/202604/esp-ppb_2.avif)

## Technical Architecture

The system operates using a Master/Slave architecture. One node acts as the Access Point (AP) and FTM responder, serving as the master clock. Slave nodes initiate FTM exchanges periodically to estimate clock drift relative to the master. 

A specialized ESP-IDF modification enables nanosecond-level RX timestamps via promiscuous mode. Using these timestamps, each slave estimates its clock drift (PPB slope) and corrects its VCTCXO via dual 12-bit DACs for coarse and fine adjustments. When a CSI frame is detected, the slave records the data and broadcasts the results over Wi-Fi to a listener node connected to a PC for post-processing.

## Hardware Design

The hardware is built around the ESP32-C3 microcontroller with custom RF antenna tuning for the 2.4 GHz band. The compact PCB (under 4 cm x 4 cm) includes:
- **VCTCXO**: A 0.5ppm voltage-controlled oscillator.
- **Dual DAC**: Two 12-bit DACs for precise oscillator discipline.
- **OLED Display**: Provides live status and accuracy readouts.
- **Power Management**: Integrated LiPo battery charger providing approximately 8 hours of runtime.

![A single ESP-PPB hardware node](/202604/esp-ppb_3.avif)

## Software and Code Structure

The firmware is built using ESP-IDF 6.0. Each node determines its role (Master, Slave, or Listener) at boot time based on its MAC address. The software architecture utilizes specific callbacks for different tasks:
- **Promiscuous RX Callbacks**: Used by slaves to extract nanosecond timestamps from management frames.
- **CSI RX Callbacks**: Used to package and broadcast CSI data.
- **Main Loop (infinite_ftm)**: Manages the FTM exchange and VCTCXO correction logic.

The project structure is organized into functional helpers for Wi-Fi initialization, I2C utilities for the OLED and DACs, and performance-critical logic for clock drift estimation and correction.
