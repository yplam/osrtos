---
title: ILDAWaveX16 - Open Source Laser DAC
summary: A high-resolution, wireless laser Digital-to-Analog Converter (DAC) powered
  by the ESP32-S3. It features 16-bit 8-channel output, SD card playback, and support
  for ILDA Digital Network (IDN) and custom UDP streaming protocols.
slug: ildawavex16-open-source-laser-dac
codeUrl: https://github.com/stanleyondrus/ILDAWaveX16
siteUrl: https://stanleyprojects.com/projects/ildawavex16
star: 26
lastUpdated: '2026-01-28'
rtos: freertos
libraries:
- lwip
- platformio-platformio-core
topics:
- esp32
- idn
- ilda
- isp-db25
- laserdac
- lasershow
isShow: true
image: /202602/ildawavex16.webp
createdAt: '2026-02-06'
updatedAt: '2026-02-06'
relatedProjects:
- esp32-web-radio-evo3
- openfire-firmware-for-esp32
- esp32-a2dp-sink-with-ldac-aptx-hd-and-aac-support
- esp8266-sound-effects-i2s-web-trigger
- esp32-s3-soundfont-sf2-sampler-synthesizer
- esper-cdp
---

## High-Resolution Laser Control

ILDAWaveX16 is designed to be the "Arduino of laser DACs," providing a flexible and hackable platform for makers and laser enthusiasts. Traditional laser controllers are often proprietary or expensive, creating a barrier for hobbyists looking to build custom projectors or experiment with laser show control. This project lowers that barrier by offering an open-source hardware and firmware solution capable of professional-grade performance.

## Hardware Architecture

At the heart of the ILDAWaveX16 is the ESP32-S3, a dual-core MCU running at 240 MHz. This provides the necessary processing power to handle network stacks, file system operations, and high-speed data output simultaneously. The project leverages the native USB, Wi-Fi, and BLE capabilities of the ESP32-S3 to provide a modern, wireless-first approach to laser control.

The analog section is driven by the DAC80508, a high-precision 16-bit, 8-channel Digital-to-Analog Converter. This allows for:
- **X/Y Scanning**: 65,536 x 65,536 resolution for smooth vector graphics.
- **Color Control**: R/G/B channels with massive color depth (281 trillion colors).
- **Intensity & User Channels**: Dedicated intensity control and two user-programmable channels (USR1/USR2) for auxiliary effects.

The board is compact (55 x 53 mm) and features a standard ILDA DB25 connector for professional projectors, alongside JST XH connectors for direct integration into DIY driver kits.

## Firmware and Connectivity

The firmware is built on the Arduino framework and PlatformIO, making it accessible for modification and community contribution. It currently supports several modes of operation:
- **SD Card Playback**: Users can play `.ild` files directly from a microSD card.
- **ILDA Digital Network (IDN)**: Support for standard real-time streaming over the network.
- **ILDAWaveProtocol (IWP)**: A lightweight UDP-based streaming protocol designed for low-latency control.
- **Web Interface**: An onboard web server allows users to manage Wi-Fi settings, adjust brightness, change scan speeds, and trigger SD card playback from a browser.

## Streaming and Tools

To facilitate content creation, the project includes Python scripts and Jupyter notebooks. These tools allow users to open standard ILDA files or generate custom patterns programmatically and stream them directly to the hardware over UDP. This makes it an excellent platform for those wanting to integrate laser output into larger software ecosystems or creative coding projects.

## Power and Integration

One of the standout features of the ILDAWaveX16 is its flexible power delivery. While traditional laser DACs often require a bipolar power supply (±15V), this board can be powered entirely via USB-C. For those who prefer standard projector power, it also includes an optional input for external ±15V supplies. This flexibility ensures the board can be used as a standalone portable controller or integrated permanently into a projector housing.
