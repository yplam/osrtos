---
title: 'Pulse: Real-time Vibration Anomaly Detection'
summary: Pulse is an embedded vibration monitoring system built on Zephyr RTOS for
  the STM32L412RB microcontroller. It utilizes ST's NanoEdge AI for on-device machine
  learning to detect mechanical anomalies in motors, pumps, and fans without cloud
  connectivity. The system features persistent training data storage and a real-time
  Python-based GUI for monitoring.
slug: pulse-real-time-vibration-anomaly-detection
codeUrl: https://github.com/Ayushkothari96/pulse
star: 2
version: v0.0.2
lastUpdated: '2026-03-15'
rtos: zephyr
libraries:
- mcuboot
topics:
- anomaly-detection
- edge-ai
- embedded
- iot
- machine-learning
- nanoedge-ai
- predictive-maintenance
- stm32
- tinyml
- zephyr-rtos
isShow: true
image: /202603/pulse.webp
createdAt: '2026-03-15'
updatedAt: '2026-03-15'
---

## Overview

Pulse is a low-cost, palm-sized embedded device designed to bring predictive maintenance to environments where expensive enterprise IoT solutions are impractical. Built on the Zephyr RTOS and targeting the STM32L412RB microcontroller, Pulse monitors the vibration patterns of machinery like motors, fans, and pumps to detect early signs of failure. Unlike traditional systems that rely on cloud processing and expensive subscriptions, Pulse performs all machine learning inference locally on a microcontroller with only 40KB of RAM.

## On-Device Intelligence with NanoEdge AI

At the heart of Pulse is the STMicroelectronics NanoEdge AI library. This technology enables the device to learn the "normal" vibration profile of a specific machine in about 30 seconds. Once the baseline is established, the device transitions to an inference state where it continuously compares live 3-axis accelerometer data against the learned model. 

The system categorizes machine health into three levels based on a similarity score:
- **Normal (≥ 90%)**: The vibration matches the learned baseline.
- **Warning (70–89%)**: A noticeable deviation is detected, suggesting the machine should be watched closely.
- **Anomaly (< 70%)**: A significant change has occurred, indicating potential mechanical failure.

## Robust Firmware Architecture

Pulse leverages the production-grade features of Zephyr RTOS to ensure deterministic performance and reliability. The firmware is designed with a thread-safe architecture, utilizing double buffering and mutex-protected critical sections to manage data flow between the sensor acquisition thread and the ML processing thread. 

One of the standout technical features is the implementation of persistent training data. Using Zephyr’s Non-Volatile Storage (NVS) filesystem, Pulse saves training samples directly to the internal flash. A CRC32-validated header ensures data integrity across power cycles. This means that once Pulse has learned a machine's behavior, it can be powered down and moved without losing its baseline, automatically reconstructing the ML model upon reboot.

## Hardware and Performance

The project is optimized for the STM32L412RB Nucleo board paired with an LIS2DH12 3-axis MEMS accelerometer. Despite the limited resources of the Cortex-M4F MCU, Pulse achieves impressive performance metrics:
- **Sampling Rate**: 500 Hz across three axes.
- **Inference Latency**: Under 600ms end-to-end.
- **Memory Footprint**: Uses approximately 70KB of Flash (55%) and 25KB of SRAM (62%).

## User Interface and Control

Pulse provides multiple ways for users to interact with the hardware. It features a USB CDC Shell that allows users to issue commands like `STATUS`, `RESET`, and `LOGS` through any standard serial terminal. For a more visual experience, the project includes a Python-based GUI monitor. This dashboard provides real-time visualization of similarity scores, color-coded status indicators, and live logs, making it easy to deploy and test in the field.

## Getting Started

To deploy Pulse, developers need the Zephyr SDK and a library generated from NanoEdge AI Studio. The workflow involves mounting the device directly to a vibrating surface, initiating the training phase via the `RESET` command, and allowing the device to collect normal operating data. Once training is complete, the device provides continuous, autonomous monitoring without any further user intervention.
