---
title: SW32 - 4 Channel E-Stim
summary: The SW32 is a modern 4-channel E-Stim box powered by a dual-processor architecture
  featuring an RP2040 and an ESP32. It provides isolated outputs, a color display,
  and versatile control via USB, Bluetooth, or Wi-Fi, utilizing FreeRTOS through the
  ESP-IDF framework alongside the SPIFFS and littlefs filesystems.
slug: sw32-4-channel-e-stim
codeUrl: https://github.com/saawsm/SW32
siteUrl: https://saawsm.github.io/SW32/
version: rev1
lastUpdated: '2024-09-15'
licenses:
- GPL-3.0
rtos: freertos
libraries:
- littlefs
- spiffs
topics:
- bluetooth
- e-stim
- electrostim
- electrostimulation
- esp32
- estim
- li-ion-battery
- rp2040
- usb-c
- usb-pd
isShow: false
createdAt: '2026-05-09T00:12:32+00:00'
updatedAt: '2026-05-09T00:12:32+00:00'
relatedProjects:
- esp32-lab-power-supply
- elevourer-portable-intelligent-electronic-load
- blynk-async-esp32-bt-wf
- stm32-synchronous-rectification-buck-boost-digital-power-supply
- esp32-ble-uart-mx
- ic-705-ci-v-band-decoder-and-transverter-controller
---

The SW32 project represents a significant modernization and redesign of the classic MK312 E-Stim box. Developed with a focus on compactness and modern connectivity, the SW32 provides a sophisticated platform for electro-stimulation, leveraging the power of contemporary microcontrollers and high-quality analog components.

## System Architecture

The SW32 is built on a modular multi-PCB architecture designed for flexibility and cost-effectiveness. By separating the core logic from the output stage, the design allows for easier upgrades and repairs. The system consists of:

*   **Main Board:** The brain of the device, containing the primary microcontrollers.
*   **Output Board:** Responsible for generating the four isolated E-Stim output channels.
*   **Front Control Board:** Houses the physical interface components, including potentiometers, buttons, and LEDs.
*   **Display Module:** A 1.8" 160x128 color TFT screen for visual feedback.

## Dual-Processor Power

One of the most interesting technical aspects of the SW32 is its dual-processor approach. It utilizes both a Raspberry Pi RP2040 and an ESP32 to balance real-time signal processing with high-level connectivity.

### The RP2040 (Signal Processing)

The RP2040 handles the heavy lifting for data acquisition and signal generation. By utilizing the RP2040's unique Programmable I/O (PIO) blocks, the firmware can generate precise pulses and handle complex timing without taxing the CPU cores. This side of the firmware integrates the `littlefs` filesystem for persistent storage and the `cobs-c` library for efficient data framing.

### The ESP32 (Interface & Connectivity)

The ESP32 acts as the communication hub and user interface controller. Running on the ESP-IDF framework (which utilizes FreeRTOS), it manages the graphical display via the HAGL graphics library. The ESP32 enables modern interaction methods, including an internally hosted web app accessible via Wi-Fi, USB connectivity, and Bluetooth/A2DP audio support. It uses `SPIFFS` for managing file system resources on its 16MB flash storage.

## Advanced Features and Capabilities

The SW32 is designed to be a versatile tool for E-Stim enthusiasts. It supports four isolated output channels with Triphase and Tri-polar (+, GND, -) support. Beyond simple digital control, it includes analog capabilities such as:

*   Stereo Line-In and Mono Microphone inputs with programmable gain.
*   An internal microphone for reactive modes.
*   Four dedicated trigger channels for external interaction.

Power management is equally modern, featuring USB Type-C Power Delivery (PD) charging. The system is designed to be multi-chemistry compatible, supporting Li-Ion, Li-Poly, and even Lead Acid battery packs, provided appropriate protection circuitry is used.

## Safety and Fabrication

Given the nature of E-Stim hardware, safety is a primary focus. The outputs are isolated to protect the user and the sensitive control electronics. The project is designed specifically for modern fabrication workflows, with PCBs optimized for JLCPCB assembly. While the build is primarily Surface Mount Technology (SMT), it uses Through-Hole Technology (THT) for connectors and front-panel components to ensure mechanical durability.

As a work-in-progress open-source project, the SW32 provides a transparent and hackable platform for those interested in the intersection of embedded systems and electro-stimulation technology.
