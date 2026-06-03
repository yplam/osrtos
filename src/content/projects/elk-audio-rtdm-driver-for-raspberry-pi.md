---
title: Elk Audio RTDM Driver for Raspberry Pi
summary: A Xenomai real-time audio driver designed for the TI PCM3168A codec on the
  Elk Pi hat. It provides low-latency audio processing for Raspberry Pi systems using
  the Real-Time Driver Model (RTDM) framework. The project supports various audio
  hats including Elk Pi, HiFiBerry, and HiFiBerry Pro.
slug: elk-audio-rtdm-driver-for-raspberry-pi
codeUrl: https://github.com/elk-audio/rpi-rtdm-audio-driver
siteUrl: https://elk.audio/dev-kit/
star: 8
lastUpdated: '2021-12-13'
rtos: xenomai
topics:
- audio
- audio-driver
- elk
- elk-audio
- linux
- linux-driver
- rtdm
- xenomai
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- rtdm-shift-register-driver-for-elk-pi
- raspa-realtime-audio-driver-access-library
- real-time-spi-on-xenomai-3
- xenomai-3-for-raspberry-pi-4
- xenomai-3-for-raspberry-pi-0-1-linux-kernel-4-1-21
- soem-w5500-ethercat-master-for-raspberry-pi
---

## Overview

The Elk Audio RTDM driver is a high-performance, real-time audio driver specifically engineered for the Raspberry Pi platform. Developed by Elk Audio, it leverages the Xenomai Real-Time Driver Model (RTDM) to provide the ultra-low latency required for professional audio applications. While primarily designed for the TI PCM3168A codec found on the Elk Pi hat, the driver architecture is flexible enough to support several other popular audio hardware configurations.

## Real-Time Performance with Xenomai

At the core of this project is Xenomai, a real-time development framework that runs alongside the Linux kernel. By using the RTDM, this driver bypasses the standard Linux audio stack (ALSA), which is often prone to jitter and unpredictable latencies. Instead, it provides a direct path for audio data, ensuring that processing deadlines are met with microsecond precision. This makes it an essential component for the Elk Audio OS, which aims to turn embedded systems into powerful musical instruments and audio processors.

## Hardware Support and Architecture

The driver is composed of several modules that handle different aspects of the audio hardware chain:

- **Core Driver (`audio_rtdm`)**: Manages the RTDM device lifecycle, memory mapping (mmap), and ioctl operations for user-space synchronization.
- **I2S Interface (`bcm2835-i2s-elk`)**: Implements the digital audio interface for the Broadcom SoC found on the Raspberry Pi, handling DMA transfers and clock synchronization.
- **Codec Support**: Includes dedicated implementations for several high-quality codecs:
  - **TI PCM3168A**: The primary target for the Elk Pi hat, supporting multi-channel input and output.
  - **TI PCM5122**: Used in HiFiBerry and HiFiBerry Pro configurations.
  - **TI PCM1863**: Supported for high-quality analog-to-digital conversion.

Beyond standard audio, the driver includes specialized support for **CV (Control Voltage) gates**. This feature is critical for interfacing with modular synthesizers and other analog gear, allowing the Raspberry Pi to send and receive trigger signals via GPIO pins synchronized with the audio stream.

## Technical Implementation

The driver utilizes a cyclic DMA buffer strategy to manage audio data. It exposes a character device interface under `/dev/rtdm/audio_rtdm`, which user-space applications can open to interact with the audio stream. The driver supports configurable buffer sizes (typically 16, 32, 64, or 128 frames) to allow developers to tune the balance between CPU load and latency.

Key technical features include:
- **mmap Support**: Allows user-space applications to map DMA buffers directly into their memory space for zero-copy data access.
- **Synchronous Processing**: Uses RTDM events to signal user-space processes when a new block of audio data is ready for processing.
- **Sysfs Integration**: Provides a class interface in Linux to monitor driver status, such as sampling rate, buffer size, and version information.

## Getting Started

Building the driver requires a cross-compilation toolchain for ARMv7 and the Linux kernel sources patched with Xenomai. The build process is managed via a standard Makefile, where users specify the `KERNEL_PATH` and `CROSS_COMPILE` prefix. 

Once compiled, the driver is loaded as a series of out-of-tree kernel modules. A typical loading sequence involves inserting the codec module, the I2S module, and finally the core RTDM driver:

```c
$ insmod pcm3168a-elk.ko
$ insmod bcm2835-i2s-elk.ko
$ insmod audio_rtdm.ko audio_buffer_size=64
```

For developers using the Elk Audio ecosystem, this driver is often pre-integrated into the Elk Audio OS, allowing for immediate development of real-time audio applications using the Elk C++ SDK or other supported frameworks.
