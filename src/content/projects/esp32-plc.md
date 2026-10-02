---
title: ESP32-PLC
summary: ESP32-PLC is an open-source firmware project that transforms the ESP32 microcontroller
  into a functional Programmable Logic Controller (PLC) using ladder logic. Built
  on the Espressif IoT Development Framework (ESP-IDF) and FreeRTOS, it leverages
  the ladderlib library to execute industrial control programs and supports web-based
  logic editing and simulation.
slug: esp32-plc
codeUrl: https://github.com/hiperiondev/ESP32-PLC
siteUrl: https://github.com/hiperiondev/ESP32-PLC
version: 1.0.0
lastUpdated: '2025-06-11'
licenses:
- MIT
image: /202607/esp32devc.webp
rtos: freertos
libraries:
- littlefs
- lwip
- spiffs
topics:
- automation
- esp-idf
- esp32
- espressif
- iec61131-3
- ladder
- ladder-diagram
- ladder-logic
- ladder-network
- ladder-programming
- microcontroller
- plc
- plc-controller
- plc-programming
isShow: true
createdAt: '2026-07-29T04:15:21+00:00'
updatedAt: '2026-07-29T04:15:21+00:00'
relatedProjects:
- esp-4diac-forte-library
- ionode
- beremiz4uc
- klipper-esp32
- micropython-and-lvgl-firmware-for-esp32
- esp32-bus-pirate
---

Industrial automation has traditionally been dominated by expensive, proprietary Programmable Logic Controllers (PLCs). The **ESP32-PLC** project seeks to disrupt this landscape by bringing the power of ladder logic—the standard language of industrial control—to the versatile and low-cost ESP32 microcontroller. By combining the robust Espressif IoT Development Framework (ESP-IDF) with the specialized `ladderlib` library, this repository provides a professional-grade foundation for building custom automation solutions.

## Transforming the ESP32 into an Industrial Controller

At its core, ESP32-PLC allows developers to program the ESP32 using the IEC 61131-3 standard's graphical ladder logic. This approach makes the hardware accessible to electrical engineers and maintenance technicians who are familiar with relay logic but may not be proficient in C or C++. The project is built atop **FreeRTOS**, ensuring that the logic execution rungs are handled with the deterministic timing required for real-time control applications. 

The system architecture is divided into a clear modular structure. While the ESP32 handles the high-speed execution of the logic, the project integrates with a web-based editor for designing and simulating rungs. This editor supports standard PLC elements including contacts, coils, timers, and counters, allowing users to visualize their control flow before deploying it to the field.

## Technical Architecture and Integration

The project utilizes a sophisticated stack of components within the ESP-IDF environment. It relies on **LittleFS** and **SPIFFS** for persistent storage of configuration and logic files, ensuring that the PLC program remains intact across power cycles. Networking is handled via the **LwIP** stack, which facilitates features like Wi-Fi provisioning and potentially MQTT-based IoT integration for remote monitoring.

One of the standout features is the integration of `ladderlib`, a C library specifically optimized for embedded systems. This library provides:
*   Support for 39 distinct instructions (logical, arithmetic, and timing).
*   Six execution states for robust program management.
*   Function pointers for hardware I/O, allowing the logic to directly manipulate ESP32 GPIOs for sensors and relays.

## Hardware and Software Capabilities

To build a physical PLC using this firmware, a standard ESP32 development board (like the WROOM-32) serves as the brain. Users can interface digital inputs like push buttons and proximity sensors, and drive outputs such as 5V or 24V relay modules. Because it uses ESP-IDF rather than the Arduino wrapper, the project gains more granular control over the hardware, leading to better optimization and lower latency in the logic scan cycle.

The project also includes a built-in web server and Wi-Fi provisioning capabilities. This allows for a "headless" setup where the controller can be configured and monitored via a browser on a smartphone or laptop, eliminating the need for specialized programming cables once the initial firmware is flashed.

## Getting Started with ESP32-PLC

The workflow for implementing a control system follows a logical progression:
1.  **Design**: Use the compatible web-based ladder editor to create your rungs and logic flow.
2.  **Configure**: Map your logical inputs and outputs to the physical GPIO pins of the ESP32.
3.  **Build**: Compile the project using the `idf.py build` command, which links the `ladderlib` and system components.
4.  **Deploy**: Flash the firmware to the ESP32 and monitor the serial output to verify that the logic engine is scanning correctly.

Whether you are an educator looking for an affordable way to teach industrial automation, a hobbyist automating a home greenhouse, or an engineer prototyping a cost-effective industrial sub-system, ESP32-PLC provides the tools to bridge the gap between modern IoT hardware and traditional control logic.
