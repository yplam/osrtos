---
title: WUTE Dashboard for Formula Student Electric
summary: A high-performance multi-function digital dashboard for Formula Student electric
  racing cars based on the STM32H7B0VET6 microcontroller. It utilizes the LVGL graphics
  library to provide real-time visualization of vehicle data such as battery status,
  motor temperature, and CAN bus telemetry on a high-brightness 5-inch TFT display.
slug: wute-dashboard-for-formula-student-electric
codeUrl: https://github.com/Caler10/WUTE_Dashboard_STM32H7B0_LVGL
star: 12
lastUpdated: '2025-10-10'
rtos: ''
libraries:
- lvgl
topics:
- 3d-printing
- diy
- formular-student
- fsae
- fsec
- gui
- lvgl
- motec
- racing-car
- stm32
isShow: true
image: /202602/WUTE_Dashboard_Test.webp
createdAt: '2026-02-14'
updatedAt: '2026-02-14'
relatedProjects:
- ly-steering-wheel-meterbox
- alfa-romeo-giulia-dashboard-info-display-for-esp32-s3
- euc-dash-esp32-dashboard
- giulia-tft
- rbcm-s32k344-autosar-rear-body-control-module
- bbn-m5stack-tough-sailing-instruments
---

## Overview

The WUTE Dashboard is a custom-designed human-machine interface (HMI) developed for the WUTE Formula Student team's electric racing cars. Built to provide drivers with critical real-time telemetry, the system was successfully deployed on the E33 (2023 season) and E10 (2024 season) vehicles. The project centers around the STM32H7B0VET6 microcontroller, leveraging its high-performance capabilities to drive a 5-inch high-brightness (800 nit) TFT screen.

## Hardware and System Architecture

The hardware is built on a custom four-layer PCB designed using LCEDA. To manage the high-resolution assets required for a modern GUI, the system employs a Bootloader and App split architecture, allowing the application to load resources from external flash memory. 

Unlike many complex embedded systems that rely on an RTOS, this dashboard is built on a foreground-background bare-metal architecture. This choice ensures deterministic performance for real-time data processing while maintaining a layered software structure consisting of CORE, BSP (Board Support Package), Middleware (LVGL), and APP layers.

## Key Features and Capabilities

The dashboard serves as the central monitoring hub for the vehicle, integrating several critical subsystems:

- **Real-time Data Visualization**: Using the LVGL graphics library, the display provides a comprehensive overview of the car's status, including high-voltage battery metrics (voltage, current, temperature, SoC), motor controller data, and motor RPM.
- **CAN Bus Integration**: The system communicates directly with the vehicle's CAN network to parse and display sensor data such as brake oil pressure, accelerator position, and torque percentages.
- **Environmental Adaptation**: An integrated ambient light sensor allows the screen brightness to adjust automatically, ensuring visibility in various racing conditions.
- **Wireless Connectivity**: An ESP8266 module is integrated to provide 2.4G wireless data transmission capabilities.
- **Safety and Status Indicators**: The board includes physical activation and Ready-To-Drive (RTD) buttons, along with dedicated LED indicators for TSOFF, BMS, and IMD faults.
- **Visual Feedback**: A built-in marquee LED strip provides immediate peripheral visual cues to the driver.

## GUI and Model Design

The user interface is designed for maximum readability during high-speed maneuvers. It utilizes a single-screen layout that consolidates all essential information, including DRS and TCS status, into a cohesive dashboard. The physical enclosure is a two-part assembly (front and back plates) designed to house the driver board and screen securely using countersunk bolts and heat-set inserts, with sealant used to ensure water and vibration resistance—critical for the harsh environment of a racing car.

## Project Impact

This dashboard has proven its reliability through multiple racing seasons, demonstrating excellent vibration resistance and waterproofing. It serves as a vital tool for driver feedback and vehicle health monitoring, representing a significant step forward in the WUTE team's body electronics and HMI development.
