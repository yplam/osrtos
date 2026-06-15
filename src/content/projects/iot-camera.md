---
title: IoT Camera
summary: A Wi-Fi enabled camera firmware based on the RT-Thread RTOS, targeting the
  FH8620 ARM1176 SoC. It supports H.264 and MJPEG hardware encoding, RTSP streaming,
  and provides a POSIX-compatible environment for embedded multimedia applications.
slug: iot-camera
codeUrl: https://github.com/RT-Thread/IoT_Camera
star: 88
lastUpdated: '2018-02-12'
rtos: rt-thread
topics:
- arm
- camera
- iot
- mjpeg
- rt-thread
- wifi
isShow: false
createdAt: '2025-12-29'
updatedAt: '2025-12-29'
relatedProjects:
- ameba-freertos-pro2-sdk
- usb-video-class-uvc-for-raspberry-pi-pico
- esp32-cam-mjpeg-streaming-and-sd-capture
- h747-camera-dual-core-stm32h747-camera-and-display-system
- esp32-mjpeg-multiclient-streaming-server
- stm32n6-camera-capture-application
---

## Overview

IoT Camera is an open-source firmware project designed for Wi-Fi-enabled camera systems. Built on the RT-Thread Real-Time Operating System, it provides a robust foundation for developing networked imaging devices. The project leverages hardware acceleration for video encoding and offers a POSIX-compatible environment, making it easier for developers to port existing multimedia applications to an embedded target.

## Hardware Architecture

The project is optimized for the FH8620 SoC, which features an ARM1176 core running at up to 450MHz. This platform is well-suited for low-power video processing and includes 16MB of built-in DRAM. 

**Key hardware components include:**
- **SoC:** FH8620 (ARM1176) @ 450MHz
- **Connectivity:** AP6181 (bcm43362) Wi-Fi module
- **Storage:** 8MB SPI Nor Flash
- **Imaging:** GC1024 sensor support
- **Video Processing:** Dedicated hardware encoders for H.264 (1280x720 @ 30FPS) and MJPEG

## Software Features

The software stack is centered around RT-Thread, utilizing its modular architecture to handle networking, file systems, and peripheral management. By using the RT-Thread POSIX edition, the project allows for standard C library usage and easier integration of networking protocols.

**Core software capabilities:**
- **Streaming Protocols:** Support for RTSP (Real Time Streaming Protocol) and MJPEG streaming.
- **Networking:** Integrated Wi-Fi management via the RT-Thread `wlan` framework.
- **Shell Interface:** A command-line interface (msh) for system configuration and debugging.

## Development and Getting Started

Development for the IoT Camera project typically involves the RT-Thread `env` tool, which manages the build environment and package dependencies. The project structure is designed to have the RT-Thread source code placed directly within the firmware directory, allowing for a self-contained build process using SCons.

### Wi-Fi Configuration

One of the primary features of the project is its wireless connectivity. While Wi-Fi is not always enabled by default to save resources, it can be activated through the `menuconfig` interface. Once enabled, users can manage connections directly through the FinSH command line. For example, scanning for networks and joining an access point is handled via simple commands:

```bash
wifi w0 join SSID PASSWORD
wifi w0 status
```

### Multimedia Pipeline

The project is particularly useful for developers looking to implement RTSP servers on low-resource hardware. By utilizing the FH8620's hardware encoders, the system can maintain a steady 720p 30FPS stream without overwhelming the ARM1176 CPU, leaving overhead for other application logic or network management tasks.
