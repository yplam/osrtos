---
title: Edge AI on Embedded Linux — i.MX 8M Plus
summary: A full-stack embedded Linux project for the NXP i.MX 8M Plus EVK featuring
  real-time NPU-accelerated object detection and NIR spectral monitoring. It demonstrates
  a complete development workflow from Yocto BSP bring-up and custom kernel module
  development to high-level Python applications using TensorFlow Lite and GStreamer.
slug: edge-ai-on-embedded-linux-i-mx-8m-plus
codeUrl: https://github.com/Corning-AI/embedded-linux
version: v0.3.0
lastUpdated: '2026-05-06'
licenses:
- MIT
image: /202605/embedded-linux_0.avif
rtos: ''
topics:
- arm-cortex-a53
- computer-vision
- deep-learning
- device-driver
- edge-ai
- embedded-linux
- freertos
- gstreamer
- imx8mplus
- linux-kernel
- mipi-csi
- npu
- object-detection
- real-time
- tflite
- wayland
- yocto
isShow: true
createdAt: '2026-05-13T00:18:08+00:00'
updatedAt: '2026-05-13T00:18:08+00:00'
---

This project provides a comprehensive implementation of an Edge AI system on the NXP i.MX 8M Plus EVK. It spans the entire embedded stack, starting from Yocto BSP bring-up to deploying real-time neural network inference using the onboard 2.3 TOPS NPU. The primary demonstration features a live camera feed processed through a MobileNet SSD v2 model, delivering bounding boxes to an HDMI display with a low latency of 11ms per inference.

## Real-Time Object Detection Performance

The core of the project is a high-performance detection pipeline. By utilizing the NPU via TensorFlow Lite and the VX Delegate, the system achieves significant speedups compared to CPU-only execution. For example, MobileNet SSD v2 runs 4x faster on the NPU (11ms) than on the CPU (45ms), while MoveNet Lightning for pose estimation sees a 2x improvement.


The architecture leverages a zero-copy pipeline: an OV5640 camera captures frames via MIPI-CSI2, which are handled by the ISI DMA and passed into GStreamer. The application uses an appsink to feed data into NumPy and then into the TFLite engine. Finally, a PIL-based overlay is applied before the video is rendered via waylandsink on HDMI.

![NPU performance metrics showing 11.3ms inference time](/202605/embedded-linux_1.avif)

## NIR Tissue Monitoring

Beyond standard computer vision, the repository includes a specialized NIR Spectral Monitor designed for medical safety applications, specifically cold therapy monitoring. Using an AS7263 6-channel sensor, the system reads tissue reflectance to calculate a tissue oxygenation index (TOI). 

![AS7263 NIR real-time tissue monitor dashboard on HDMI](/202605/embedded-linux_3.avif)

This data is visualized on a full-screen GTK3 and Cairo dashboard. In testing, the sensor successfully detected physiological changes such as vasoconstriction during ice-pack application and reactive hyperemia during rewarming, demonstrating the platform's utility for real-time clinical monitoring.

## Hardware and Software Stack

The project targets the NXP i.MX 8M Plus EVK, which features a quad-core A53 processor and an integrated NPU. Key hardware components include:
- **Camera**: OV5640 MIPI CSI-2
- **Sensors**: AS7263 NIR spectral sensor and BME280
- **Connectivity**: AzureWave AW-CM276NF (WiFi/BT)
- **Display**: HDMI output via Weston/Wayland

The software environment is built using Yocto (Scarthgap release) with Kernel 6.6.52-lts. The repository includes helper scripts to automate the multimedia image build process and configure the hardware switches for SD card booting.

## Custom Kernel Modules

A significant portion of the project focuses on low-level driver development. It includes three out-of-tree kernel modules that serve as a learning path for Linux driver architecture:
- **hello**: A minimal module demonstrating initialization, exit routines, and kernel logging.
- **chardev**: A complete character device implementation featuring file operations, user-space memory copying, and mutex-based synchronization.
- **bme280**: An I2C client driver that utilizes device tree matching, sysfs attributes for sensor data access, and managed resource allocation (`devm`).

## Development and Debugging

The project documents real-world bring-up challenges, providing a valuable debug log for embedded developers. Issues addressed include V4L2 device mapping (where the VPU encoder often claims `/dev/video0`), color space mismatches in the ISI output, and networking configuration hurdles like empty DNS resolution files. This documentation ensures a smoother path for developers replicating the setup or building similar high-performance edge AI applications.
