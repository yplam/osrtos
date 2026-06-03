---
title: Speech2Touch
summary: An embedded voice-to-touch conversion system for the Franke A600 coffee machine.
  Built on the STM32WB55 MCU using Azure RTOS (ThreadX/USBX) and Picovoice, it translates
  voice commands into USB HID touch events to automate beverage selection.
slug: speech2touch
codeUrl: https://github.com/edholmes2232/Speech2Touch
star: 19
version: v1.0.1
lastUpdated: '2025-10-02'
rtos: threadx
topics:
- c
- embedded
- firmware
- google-test
- picovoice
- speech-recognition
- stm32
- threadx
- usb
- usb-hid
- usbx
isShow: false
createdAt: '2026-01-12'
updatedAt: '2026-01-12'
relatedProjects:
- la-marzocco-round-controller
- smartspeaker
- espgaggia-smart-coffee-machine-controller
- speech-recognition-on-stm32-using-machine-learning
- diy-smart-coffee-and-espresso-scale
- esp32-voice-assistant
---

## Overview

Speech2Touch is an innovative embedded project designed to add voice control capabilities to existing touchscreen-based hardware, specifically targeting the Franke A600 coffee machine. By leveraging the STM32WB55 microcontroller, the project captures audio input via a MEMS microphone and translates recognized speech commands into custom USB HID packets that simulate physical touch events on the machine's display.

Originally conceived as a way to modernize coffee machine interactions, the project demonstrates a sophisticated integration of speech recognition, real-time operating system (RTOS) task management, and USB device emulation.

## Technical Architecture

The system is built on a robust stack featuring **Azure RTOS (ThreadX)** for multi-threaded execution and **USBX** for handling the USB HID interface. The hardware core is an STM32WB55, which manages the entire pipeline from audio acquisition to touch output.

### Audio Processing and Speech Recognition

The project uses an **INMP441 MEMS microphone** connected via SAI (Serial Audio Interface). Audio data is captured using DMA to ensure low-latency processing. For the speech-to-text component, Speech2Touch integrates the **Picovoice** library, which provides efficient, on-device voice recognition. This allows the system to operate entirely offline, maintaining privacy and ensuring fast response times without requiring a cloud connection.

### Threading Model

The application logic is divided into three primary threads to maintain system responsiveness:
- **Audio Thread**: Handles DMA-based audio capture and initial buffer processing.
- **Speech Thread**: Performs speech recognition using Picovoice and maps recognized commands to specific target coordinates.
- **Touch Thread**: Formats the target coordinates into USB HID reports and manages the transmission to the host device.

## Hardware-In-Loop (HIL) Testing

To ensure reliability without needing constant access to the physical coffee machine, the project includes a comprehensive Hardware-In-Loop test suite. This suite utilizes a **Qt-based GUI** that emulates the Franke A600 touchscreen layout. By using Linux text-to-speech utilities to trigger the microphone and monitoring the resulting USB HID events, the developer can validate that specific voice commands (like "Franke, I'll have a double espresso") correctly activate the intended touch targets.

## Implementation Details

The project is configured using STM32CubeMX, with the logic implemented in C. Key components include:
- `touch_mapper.c`: Responsible for converting logical commands into precise X/Y coordinates.
- `pv.c`: The integration layer for the Picovoice engine.
- `usb_device.c`: Manages the USBX stack to present the STM32 as a standard HID touch device.

## Getting Started

The repository is designed for development within a VSCode environment, utilizing the STM32Cube extension and Dev Containers for a consistent build environment. While currently optimized for the Franke A600, the architecture is modular, allowing developers to adapt the `touch_targets` and Picovoice configuration files to support other touchscreen-operated devices.
