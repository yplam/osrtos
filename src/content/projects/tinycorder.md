---
title: Tinycorder
summary: A compact, open-source multi-purpose sensing device inspired by the Star
  Trek tricorder. Built on the Seeed Studio XIAO ESP32C3, it integrates a spectrometer,
  CO2 sensor, and environmental sensors with a low-power Sharp Memory Display for
  portable data visualization.
slug: tinycorder
codeUrl: https://github.com/Egokitek/Tinycorder
siteUrl: http://www.victorbarahona.com
star: 15
lastUpdated: '2025-07-08'
rtos: freertos
topics:
- adafruit
- arduino
- cyberdeck
- esp32c3
- handheld
- minicomputer
- seeedstudio
- sharpmemorydisplay
- xiao
isShow: true
image: /202601/Tinycorder.webp
createdAt: '2026-01-15'
updatedAt: '2026-01-15'
relatedProjects:
- xiao-debug-mate
- lumen
- stm32-pocket-game-dev-console
- wardriver3000
- e-paper-climate-logger-weathergotchi
- tinycore-esp32-s3-learning-platform
---

## Overview

Tinycorder is a compact, multi-purpose sensing device designed as a functional tribute to the iconic tricorder from the Star Trek science fiction series. Developed by Victor Barahona, this open-source project combines modern microelectronics with a handheld form factor to create a versatile tool for environmental analysis, light spectrometry, and personal productivity.

The device is engineered for portability and efficiency, measuring just 75x85x10mm and weighing approximately 70 grams. It is designed to be worn as an electronic badge or carried as a field tool, featuring a low-power architecture that allows for extended use on a small 150mAh Lithium-Ion battery.

## Hardware Architecture

The Tinycorder is built around the **Seeed Studio XIAO ESP32C3**, a powerful RISC-V based microcontroller that provides the necessary processing power and connectivity. To maintain high visibility while minimizing power draw, the project utilizes an **Adafruit Sharp Memory Display** (400x240px). This display technology offers the high resolution of an LCD with the ultra-low power consumption characteristics of e-paper, making it ideal for a device that remains active for long periods.

### Integrated Sensor Suite

The device features a sophisticated array of sensors that allow it to interact with the physical world:
- **AS7341 Spectrometer**: Measures light across seven visible bands and Near-Infrared (NIR), enabling users to analyze light sources and spectral compositions.
- **SCD40 Air Quality Sensor**: Provides precise measurements of CO2 levels, temperature, and humidity.
- **BMP280**: Adds atmospheric pressure sensing to the environmental monitoring capabilities.
- **Analog Expansion**: Two free pins are accessible from the front panel, allowing users to measure external analog signals.

## Software and Functionality

The firmware is developed using the Arduino framework and leverages the ESP32's underlying FreeRTOS capabilities for task management. The user interface is navigated via three tactile pushbuttons (Up, Down, Enter), providing a simple and reliable way to switch between various modes:

- **Spectrometer Mode**: Visualizes light spectra in histogram, line, or numerical formats.
- **Air Quality & Dashboard**: Offers real-time monitoring of CO2 and climate data. The dashboard includes a historical view, displaying histograms of the last 24 measurements taken at five-minute intervals.
- **Pomodoro Timer**: A productivity tool that allows users to set focus blocks ranging from 5 to 120 minutes, complete with a visual alert upon completion.
- **Electronic Badge**: A low-power mode that displays user information or custom graphics, suitable for conferences and events.

## Design and Assembly

The Tinycorder's chassis is a two-piece 3D-printed design made from PLA, held together by four M3 screws. The repository provides all necessary STL files for makers to print their own enclosures. While the current prototype is built using a perfboard, the project documentation includes a comprehensive Bill of Materials (BOM) and assembly photos to guide users through the construction process.

## Future Development

The project is actively evolving, with several planned improvements on the roadmap:
- **PCB Design**: Transitioning from a perfboard prototype to a dedicated printed circuit board.
- **Power Management**: Implementing battery voltage monitoring and optimizing deep sleep processes to further extend battery life.
- **Expanded Sensing**: Adding a Time-of-Flight (ToF) sensor for distance measurement and a small buzzer for audible feedback.
- **Oscilloscope Functionality**: Utilizing the front-facing analog pins to implement a basic signal testing tool.

The Tinycorder is licensed under **GPL 3.0**, encouraging the community to modify, improve, and share their own versions of this versatile handheld sensor platform.
