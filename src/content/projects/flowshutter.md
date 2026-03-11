---
title: Flowshutter
summary: A custom camera remote and motion logger for Gyroflow that synchronizes video
  recording with flight controller data. It runs on ESP32 hardware using MicroPython
  and supports various camera protocols including Sony MULTI, LANC, and ZCAM UART.
slug: flowshutter
codeUrl: https://github.com/gyroflow/flowshutter
siteUrl: https://docs.gyroflow.xyz/flowshutter/flowshutter/
star: 177
version: v0.66
lastUpdated: '2022-10-10'
rtos: ''
libraries:
- micropython
topics:
- camera
- esp32
- flowbox
- flowshutter
- gyroflow
- gyrologger
- hacktoberfest
- hacktoberfest2022
- micropython
- motion-logger
- sony-camera
isShow: true
image: /202512/flowshutter.webp
createdAt: '2025-12-28'
updatedAt: '2025-12-28'
---

Flowshutter is an open-source camera remote and motion logging solution designed to integrate seamlessly with the Gyroflow stabilization ecosystem. By providing a bridge between professional cameras and flight controller (FC) hardware, Flowshutter ensures that motion data is precisely synchronized with video recordings, a critical requirement for high-quality post-process stabilization.

At its core, Flowshutter simplifies the workflow for creators using external motion loggers. Its "1-click" functionality allows users to simultaneously start or stop camera recording and arm or disarm the flight controller. This synchronization eliminates the guesswork often associated with aligning gyro data to video frames in post-production. Beyond simple triggers, it supports advanced features like FC blackbox flash chip erasure and provides real-time feedback via an integrated OLED display.

The project is built to be flexible regarding hardware. While it supports commercial options like the NeutronRC SDB, it also offers open-source hardware designs, including credit-card-sized and flight-controller-sized DIY boards. These designs typically center around the ESP32 microcontroller, leveraging its connectivity and processing power to handle various camera communication protocols.

Flowshutter's compatibility list is extensive, covering a wide range of industry-standard trigger mechanisms and protocols. It currently supports the Sony MULTI Terminal protocol, Sony LANC (via an additional Arduino bridge), ZCAM UART, and various Schmitt trigger or momentary ground mechanisms. This broad support makes it a versatile tool for diverse camera setups, from mirrorless rigs to specialized cinema cameras.

From a technical perspective, Flowshutter is developed using MicroPython, specifically targeting version 1.19.1. This choice allows for rapid development and easy customization of the firmware. The project includes a dedicated `build.py` script to manage the compilation of single-binary firmware or the preparation of debug environments. Developers can use popular tools like Visual Studio Code with the Pymakr extension or the Thonny IDE to interact with the hardware. The repository provides a structured approach to managing different hardware targets—such as generic, DIY, or specific commercial boards—through a modular configuration system.
