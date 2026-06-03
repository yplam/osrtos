---
title: IoT HDMI Mux
summary: An ESP32-C3 based HDMI multiplexer that enables wireless switching between
  two HDMI sources. It utilizes the TS3DV642 high-speed switch IC to support HDMI
  2.0 specifications, including 4K resolution at 60Hz.
slug: iot-hdmi-mux
codeUrl: https://github.com/guimpt/iot_hdmi_mux
star: 37
lastUpdated: '2025-12-12'
rtos: freertos
topics:
- esp32-c3
- hdmi
- internet-of-things
- iot
isShow: true
image: /202601/render3.webp
createdAt: '2026-01-23'
updatedAt: '2026-01-23'
relatedProjects:
- esp32-s3-usb-to-ble-keyboard-bridge
- pico-cec
- hd2-macropad
- 42-smart-cluster-sign
- t-hmi-c64-emulator
- m5-keyboard-and-mouse-emulator
---

## Overview

The IoT HDMI Mux is a hardware and firmware project designed to solve a common home entertainment frustration: the need to manually switch HDMI cables or manage multiple remote controllers. By combining a modern microcontroller with a high-performance video switch, this project creates a connected device capable of toggling between two HDMI inputs and one output via a wireless interface.

At its core, the project leverages the ESP32-C3, a RISC-V based SoC with integrated Wi-Fi and Bluetooth LE. This allows the multiplexer to be integrated into home automation systems or controlled via a web interface, eliminating the need for physical proximity to the media center.

## Hardware Architecture

The project is built around two primary components:

- **ESP32-C3 Microcontroller**: Acts as the brain of the device, handling wireless connectivity and GPIO control to trigger the switching logic.
- **TS3DV642 IC**: A high-speed 1-to-2 or 2-to-1 bi-directional multiplexer/demultiplexer. This specific IC is a FET-based switch designed for high-speed differential signaling.

Because the TS3DV642 is a passive FET switch, it offers low power consumption and minimal signal distortion, provided the PCB layout is optimized for high-frequency signals. The project includes dedicated pinout documentation for both the ESP32-C3 and the TS3DV642 to assist in hardware assembly and troubleshooting.

## Video Performance and Features

Despite its compact and DIY-friendly nature, the IoT HDMI Mux is designed to handle modern high-resolution video standards. The TS3DV642 IC is rated for and has been tested to support:

- **HDMI 2.0 Compatibility**: Ensuring support for the bandwidth requirements of modern consoles and media players.
- **4K at 60 Hz**: Providing smooth, high-definition playback without the flickering or degradation often found in lower-quality switches.

While the switch is rated for these specifications, the project notes that the actual performance ceiling may be higher depending on the specific PCB implementation and signal integrity.

## Project Structure

The repository is organized into several key areas to support both the hardware and software aspects of the build:

- **Firmware**: Contains the code to be flashed onto the ESP32-C3, likely utilizing the ESP-IDF or Arduino framework to manage the switching logic and network stack.
- **Project**: Houses the hardware design files, including schematics and PCB layouts required to manufacture the device.
- **Documentation**: Includes high-quality renders of the electronics and detailed pinout spreadsheets for the main components.

This project is an excellent example of modern IoT application, bridging the gap between high-speed analog video signals and digital wireless control. It is particularly useful for users looking to integrate their media setups into platforms like Home Assistant or simply looking for a more convenient way to manage their HDMI inputs.
