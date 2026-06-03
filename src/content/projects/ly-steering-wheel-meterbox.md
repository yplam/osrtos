---
title: LY Steering Wheel MeterBox
summary: A comprehensive racing steering wheel and dashboard system based on the STM32F407
  and FreeRTOS. It supports real-time CAN bus data acquisition for Formula Student
  race cars and integrates with PC simulators via USB HID and Simhub.
slug: ly-steering-wheel-meterbox
codeUrl: https://github.com/Nolimy/steeringWheel_MeterBox_STM32_FreeRTOS
siteUrl: https://oshwhub.com/nolimy/steeringWheel_project
star: 113
version: steeringWheel_v1.0.0
lastUpdated: '2023-10-26'
rtos: freertos
libraries:
- lvgl
topics:
- 3d-print
- assetto-corsa-competizione
- assettocorsa
- diy
- f1
- formular-student
- freertos
- fsae
- fscc
- fsec
- gui
- lvgl
- motec
- mqtt
- qt5
- racing-car
- sim-racing
- simhub
- steering-wheel
- stm32
isShow: true
image: /202601/meterbox.webp
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- wute-dashboard-for-formula-student-electric
- alfa-romeo-giulia-dashboard-info-display-for-esp32-s3
- rbcm-s32k344-autosar-rear-body-control-module
- bmw-e90-can-cluster-arduino-project
- stm32l476g-discovery-rtos-sensor-project
- stm32-framework
---

## Overview

The LY Steering Wheel MeterBox is a sophisticated embedded system designed for Formula Student racing. Developed as an undergraduate thesis project, it serves as a high-performance interface for both physical race cars and racing simulators. Built on the STM32F407ZET6 microcontroller and running FreeRTOS, the system integrates data acquisition, high-brightness visual feedback, and wireless telemetry into a single, ergonomic steering wheel unit.

The project is tailored to the specific needs of racing drivers, featuring a sunlight-readable 3.5-inch display and a programmable Shift LED Module (SLM) to optimize gear changes. It bridges the gap between real-world racing and high-fidelity simulation by supporting dual operational modes.

## Key Features

- **Dual-Mode Operation**: Automatically switches between 'Real Car Mode' (CAN-based) and 'Simulator Mode' (USB/Serial-based) depending on the incoming data source.
- **Advanced GUI**: Utilizes the LVGL graphics library to provide a high-refresh-rate dashboard displaying speed, RPM, gear, lap times, and vehicle health parameters.
- **Wireless Telemetry**: Integrated BC260Y 4G module for real-time data uploading via MQTT, allowing engineers to monitor vehicle performance from the pits.
- **Simulator Integration**: Functions as a composite USB device (HID Joystick + Virtual COM Port), making it compatible with major titles like Assetto Corsa, F1 series, and Simhub.
- **Shift LED Module (SLM)**: A strip of 12 WS2812B RGB LEDs provides intuitive engine RPM feedback, adjustable for different power bands.
- **Data Logging**: Supports local storage of racing data to external SPI Flash for post-race analysis.

## Technical Architecture

The software architecture is organized into a vertical stack to ensure maintainability and real-time performance:

- **HAL & BSP Layers**: Hardware abstraction provided by STM32CubeMX, with custom Board Support Packages for the ST7796 LCD controller, W25Q128 Flash, and BC260Y module.
- **RTOS Kernel**: FreeRTOS manages concurrent tasks such as GUI rendering, CAN bus parsing, MQTT communication, and USB stack handling.
- **Data Layer**: A centralized database manages shared variables between the CAN interrupt routines and the LVGL application layer.
- **Communication Protocols**: Supports MoTeC M800 CAN protocols for real-world ECU integration and JSON-based serial communication for simulator data.

## Hardware Implementation

The hardware is designed for the rigors of racing. The core is an STM32F407ZET6 (168MHz, 192KB RAM), chosen for its FSMC interface (to drive the LCD) and robust CAN/USB peripherals. The display is a specialized 1000-nit high-brightness TFT panel, ensuring visibility under direct sunlight. The mechanical structure utilizes a mix of CNC-machined carbon fiber plates and 3D-printed resin components, adhering to Formula Student safety and ergonomic regulations.

## Getting Started

For simulator use, the device connects via USB and is recognized as a 'LY_Wheel_Controller'. Users can configure Simhub to send telemetry data using a custom JavaScript-based JSON script provided in the project documentation. For real-car applications, the CAN baud rate is configurable (defaulting to 125kbps or 1Mbps) to match the vehicle's ECU settings. The project includes complete BOM lists, 3D models (STEP files), and hardware schematics hosted on the JLC hardware platform.
