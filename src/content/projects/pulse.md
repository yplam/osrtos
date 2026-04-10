---
title: Pulse
summary: Pulse is a real-time vibration anomaly detection system for microcontrollers
  that enables predictive maintenance without cloud connectivity. It leverages the
  Zephyr RTOS and STMicroelectronics NanoEdge AI on an STM32L412RB to provide a standalone,
  low-cost solution for monitoring industrial machinery.
slug: pulse
codeUrl: https://github.com/Ayushkothari96/pulse
version: v0.0.2
lastUpdated: '2026-03-18'
licenses:
- MIT
image: /202604/pulse_0.avif
rtos: zephyr
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
createdAt: '2026-04-09T23:53:25+00:00'
updatedAt: '2026-04-09T23:53:25+00:00'
---

Pulse provides a real-time vibration anomaly detection solution designed to run entirely on a microcontroller, eliminating the need for cloud subscriptions or complex IT infrastructure. By focusing on an affordable, standalone hardware design, it addresses the gap in predictive maintenance for small-scale industrial applications like motors, pumps, and fans.

### The Problem and Solution
Many industrial machines give subtle vibration warnings before failing, but these often go unnoticed. While enterprise predictive maintenance systems exist, they are frequently cost-prohibitive and require stable internet connectivity. Pulse offers a local alternative: a palm-sized device that learns a machine's normal vibration profile in approximately 30 seconds and monitors it continuously in real-time.


The system operates in three main stages: learning, monitoring, and alerting. Once trained, it triggers an onboard buzzer and LED the moment vibration patterns deviate from the learned baseline. This allows for immediate on-site response without requiring a laptop or network connection for basic deployment.

### Operational Workflow
Pulse is powered by STMicroelectronics NanoEdge AI, which allows a trained anomaly detection model to run locally on an STM32L412RB. A critical feature of the system is its persistent training data. Using Zephyr’s Non-Volatile Storage (NVS) filesystem, training samples are saved directly to the internal flash.

The boot flow is designed for reliability. On startup, the device checks flash storage for existing training samples. If valid samples are found—verified via a CRC32-protected header—the ML model is reconstructed automatically. This ensures that the device can resume monitoring immediately after a power cycle without needing to be retrained. If no samples are found, it enters a training phase, collecting data from the LIS2DH12 accelerometer at 500 Hz.

### Monitoring and Visualization
The system outputs a similarity score every 600ms to quantify how closely current vibrations match the learned baseline. A score of 90% or higher indicates normal operation, while scores between 70% and 89% serve as a warning. Any score below 70% is flagged as an anomaly.

![Normal Data Visualization](/202604/pulse_1.avif)

For users who want deeper insights, a Python-based GUI monitor provides real-time visualization of these similarity scores and device logs over a USB connection. This monitor displays live status indicators and color-coded results for quick diagnostic checks.

![Anomaly Detection Result](/202604/pulse_2.avif)

### Technical Architecture
The hardware is built around a custom PCB integrating the STM32L412 MCU and the LIS2DH12 3-axis MEMS accelerometer. The software architecture leverages the Zephyr RTOS to manage a thread-safe design with deterministic scheduling.

![Pulse Custom PCB](/202604/pulse_3.avif)

The system uses a double-buffering scheme with mutex-protected critical sections to handle data transfer between the sensor thread and the ML processing thread. The accelerometer samples three axes at 500 Hz, with each inference window consisting of 256 samples per axis (768 total). This results in an end-to-end latency of less than 600ms, covering both sample collection and inference time.

### Hardware and Resource Footprint
Pulse is optimized for a minimal Bill of Materials (BOM). The STM32L412RB provides 128KB of Flash and 40KB of SRAM. The application utilizes approximately 55% of the available flash and 62% of the SRAM, maintaining a lean footprint while providing industrial-grade functionality. The I2C3 bus connects the MCU to the accelerometer, while a USB CDC shell allows for interaction via standard serial commands such as `STATUS`, `RESET`, and `LOGS`.
