---
title: S/PDIF Recorder for Raspberry Pi Pico
summary: A high-resolution digital audio recorder that captures S/PDIF signals and
  stores them as WAV files on microSD media. It supports up to 24-bit/192kHz sampling
  and is compatible with Raspberry Pi Pico (RP2040) and Pico 2 (RP2350) microcontrollers.
slug: s-pdif-recorder-for-raspberry-pi-pico
codeUrl: https://github.com/elehobica/pico_spdif_recorder
star: 22
version: 1.0.5
lastUpdated: '2026-03-21'
rtos: ''
libraries:
- lwip
topics:
- microsd
- raspberry-pi-pico
- raspberry-pi-pico-2
- raspberry-pi-pico-2-w
- raspberry-pi-pico-w
- rp2040
- rp2350
- spdif
- wav-recorder
isShow: true
image: /202603/pico_spdif_recorder_pcb_front.webp
createdAt: '2026-03-22'
updatedAt: '2026-03-22'
---

## High-Resolution Audio Recording on the Raspberry Pi Pico

The S/PDIF Recorder for Raspberry Pi Pico is a specialized embedded project designed to bridge the gap between digital audio sources and modern storage. By leveraging the processing power of the RP2040 and the newer RP2350 (Pico 2) microcontrollers, this project enables high-fidelity recording from S/PDIF Coaxial or TOSLINK inputs directly to a microSD card in standard WAV format.

This project is particularly useful for audiophiles and engineers looking for a compact, low-power solution to archive digital audio without the need for a full-sized computer or expensive dedicated recording hardware.

## Technical Capabilities and Audio Support

The recorder is built to handle high-resolution audio streams with ease. It supports both 16-bit and 24-bit resolutions across two channels. The sampling frequency support is extensive, covering standard rates such as 44.1 kHz and 48.0 kHz, as well as high-resolution rates like 88.2 kHz and 96.0 kHz. While 176.4 kHz and 192 kHz are supported by the software, the project notes that these rates are challenging for the single-bit SPI interface used for the microSD card, requiring high-performance V30-rated SD-XC cards to avoid data drops.

## Hardware Architecture

The system is designed around the Raspberry Pi Pico series. Key hardware components include:
- **Microcontroller**: Raspberry Pi Pico/W (RP2040) or Pico 2/W (RP2350).
- **S/PDIF Receiver**: A TOSLINK Rx module (like the DLR1160) or a Coaxial input circuit connected to GPIO 15.
- **Storage**: A microSD card slot connected via SPI.
- **User Interface**: Optional physical buttons for resolution switching and start/stop control, supplemented by a robust serial command interface over USB.

## Intelligent Recording Features

Beyond simple data capture, the firmware includes several "smart" features to manage the recording process:
- **Silence Detection**: The system can standby and automatically start recording when sound is detected, and stop when a long period of silence is encountered.
- **Auto-Split**: WAV files can be automatically split when short blanks are detected, making it easier to record albums or sets of tracks.
- **NTP Synchronization**: When using a Raspberry Pi Pico W, the system can connect to Wi-Fi and use NTP to synchronize the system clock, ensuring that recorded WAV files have accurate timestamps.
- **Visual Feedback**: An LED indicator provides status updates, using different blink patterns to signify recording, background file processing, or error states.

## Software and Build Environment

The project is built using the Raspberry Pi Pico SDK (confirmed with version 2.1.1). It utilizes several specialized sub-libraries, including a customized version of FatFs for file system management and a dedicated S/PDIF receiver library (`pico_spdif_rx`). For users who need to organize their recordings, the project also includes a Python-based `wav_tagger` tool. This tool can post-process the recorded files, merging or splitting them based on YAML metadata and adding ID3v2.3 tags.

## Getting Started

To build the project, developers need the standard Pico development environment, including `pico-sdk`, `pico-examples`, and `pico-extras`. The build process is managed via CMake, with specific flags available to target either the RP2040 or the RP2350 platform. Once flashed, the device is controlled primarily through a serial console, where users can toggle bit depth, manage file suffixes, and configure Wi-Fi settings for the Pico W.
