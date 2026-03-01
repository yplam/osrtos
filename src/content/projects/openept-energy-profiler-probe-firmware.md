---
title: OpenEPT Energy Profiler Probe Firmware
summary: Open-source firmware for the OpenEPT Energy Profiler Probe, a tool for real-time
  energy profiling and battery state evaluation. It features high-speed data acquisition
  up to 1 MSPS and targets STM32-based hardware platforms.
slug: openept-energy-profiler-probe-firmware
codeUrl: https://github.com/OpenEPT/Firmware
siteUrl: https://openept.net
star: 15
version: v1.0.0
lastUpdated: '2025-07-03'
rtos: ''
topics:
- data-acquisition
- energy
- energy-profile
- firmware-tools
- iot-monitor
- iot-platform
- measurement
- microcontroller
- profiler-framework
isShow: true
image: /202602/openept.webp
createdAt: '2026-03-01'
updatedAt: '2026-03-01'
---

## Overview

The OpenEPT (Open Energy Profiler Tool) firmware is the core software component of an affordable, open-source ecosystem designed for deep energy analysis of embedded systems. It provides developers with the tools necessary to profile firmware energy consumption and evaluate State of Charge (SoC) and State of Health (SoH) algorithms for LiPo battery-powered devices.

## High-Performance Data Acquisition

At the heart of the OpenEPT probe is a high-speed data acquisition system capable of sampling at rates up to 1 MSPS (Mega Samples Per Second). This high temporal resolution allows developers to capture transient current spikes and fine-grained power state transitions that lower-frequency loggers might miss. The firmware facilitates real-time streaming of voltage and current data, providing an immediate window into the electrical behavior of the target device.

## Programmable Load and Waveform Generation

Beyond simple measurement, the OpenEPT firmware supports programmable load generation. This feature allows users to create custom waveforms and simulate various discharge scenarios, which is critical for validating battery management algorithms under realistic or worst-case conditions. The hardware interface includes dedicated connectors for batteries, chargers, and external loads, all managed by the central STM32 microcontroller.

## Hardware Integration

The firmware is specifically tailored for STM32 architecture, with implementations targeting high-performance cores like the Cortex-M7. It is designed to run on custom hardware that integrates seamlessly with the STM32 Nucleo ecosystem. The board layout includes several key interfaces:

- **Energy Debugging Interface**: For direct connection to the target system under test.
- **ADC Selection**: Jumpers for switching between internal and external ADC references to ensure measurement precision.
- **Connectivity**: Support for USB (via Nucleo) and RJ45 for high-speed data offloading to a host computer.
- **Power Management**: Selectable power supplies (5V or 12V) and integrated protection status indicators.

## Development and Toolchain

The project is built using **STM32CubeIDE**, leveraging the standard STMicroelectronics development environment. The build process involves a multi-step configuration, including the definition of global project paths to ensure portability across different developer environments. The firmware is organized into specific source directories (e.g., `Source/ADFirmware`), allowing for modular development and easy integration of new features or hardware revisions.

## Ecosystem and Visualization

While the firmware handles the low-level acquisition and control, it is part of a larger ecosystem that includes a Graphical User Interface (GUI). This GUI provides the necessary visualization tools to analyze the high-speed data streams, manage the programmable load, and perform long-term battery health assessments. This comprehensive approach bridges the gap between raw hardware measurements and actionable firmware optimization data.
