---
title: E-Paper Climate Logger (Weathergotchi)
summary: A comprehensive environmental monitoring system built on the ESP32-S3 platform,
  featuring an e-paper display for high-visibility, low-power data visualization.
  The project integrates the GxEPD2 library for display management and includes full
  PCB schematics and CAD designs for a complete hardware-software solution.
slug: e-paper-climate-logger-weathergotchi
codeUrl: https://github.com/Michael-Manning/E-Paper-Climate-Logger
lastUpdated: '2026-05-31'
licenses:
- MIT
image: /202606/E-Paper-Climate-Logger_0.avif
rtos: freertos
isShow: true
createdAt: '2026-06-01T00:56:47+00:00'
updatedAt: '2026-06-01T00:56:47+00:00'
relatedProjects:
- bbmonitor
- git-contributions-e-ink-display
- espmonitor-iot-environment-monitoring-system
- gateway-smartwatch
- esphome-e-ink-4-color-dashboard
- weather-micro-station-for-t-display-s3
---

The E-Paper Climate Logger, affectionately known as the "Weathergotchi," is an open-source project designed to provide a robust and visually clear solution for tracking environmental conditions. This repository serves as a one-stop shop for the project, containing not only the firmware but also the professional-grade PCB schematics and CAD files required to build the physical unit.


At its core, the Weathergotchi is designed to solve the problem of persistent environmental monitoring. By using an e-paper (E-Ink) display, the device ensures that climate data remains visible even without active power to the screen, significantly extending battery life and providing a paper-like reading experience that excels in bright environments.

### Hardware Architecture

The project is built around the ESP32-S3 microcontroller, a powerful chip that provides the necessary processing power and wireless capabilities for modern IoT logging. The specific hardware implementation uses a custom board definition referred to as `templog-v1`.

![Side profile of the Weathergotchi device](/202606/E-Paper-Climate-Logger_1.avif)

Key hardware characteristics include:
- **Microcontroller**: ESP32-S3 with QIO QSPI memory mapping.
- **Display**: High-contrast E-Paper screen.
- **Optimized Memory**: The system is configured to run without PSRAM (`BOARD_HAS_NO_PSRAM`), indicating a lean and efficient firmware design focused on core logging tasks.
- **Mechanical Integration**: The repository includes full CAD files, allowing users to 3D print or manufacture a custom enclosure that fits the PCB perfectly.

### Firmware and Software Design

The firmware is developed using the Arduino framework within the PlatformIO ecosystem. This choice allows for a balance between high-level ease of use and low-level hardware control. The system relies heavily on the `GxEPD2` library, which is a specialized driver for E-Ink displays, providing the logic needed to handle partial updates and complex graphical rendering on the e-paper panel.

![Rear view of the climate logger hardware](/202606/E-Paper-Climate-Logger_2.avif)

Technical highlights of the firmware implementation include:
- **Error Management**: The build is configured with a debug level set to `ESP_LOG_ERROR`, ensuring that the system remains performant by only processing critical system messages.
- **Build System**: Utilizes PlatformIO with custom extra scripts (`extra_script.py`) to handle pre-build processes, ensuring a consistent environment across different development setups.
- **Monitoring**: Standardized serial communication at 115200 baud via `/dev/ttyACM0` for easy debugging and data retrieval during development.

### Getting Started

To build the firmware, developers should use PlatformIO. The configuration is pre-set to target the `templog-esp-s3` environment. The project manages its own dependencies, specifically requiring the `GxEPD2` library (version 1.6.4 or higher). Because the repository includes the full PCB and CAD files, the transition from firmware development to a fully realized hardware product is streamlined for the user.
