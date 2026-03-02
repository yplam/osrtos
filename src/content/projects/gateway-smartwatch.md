---
title: Gateway Smartwatch
summary: An ESP32-S3 based smartwatch project that integrates a comprehensive suite
  of sensors including the BME680, ICM42670, DS3231, and VL53L1X. It features custom
  PCB design, power management for Li-Ion batteries, and multiple graphical themes.
slug: gateway-smartwatch
codeUrl: https://github.com/RoboticWorx/Gateway-Smartwatch
siteUrl: https://roboticworx.io/blogs/projects/gateway-smartwatch
star: 196
lastUpdated: '2025-06-09'
rtos: freertos
topics:
- esp32
- smartwatch
- wireless
isShow: true
image: /202603/gateway-smartwatch.webp
createdAt: '2026-03-02'
updatedAt: '2026-03-02'
---

The Gateway Smartwatch is a sophisticated open-source wearable platform designed to serve as a portable sensor hub. Built around the powerful ESP32-S3-MINI-1 module, it provides high-performance processing and wireless connectivity in a compact form factor suitable for daily wear.

## A Comprehensive Sensor Suite

What sets the Gateway apart is its dense integration of high-quality sensors, making it a versatile tool for environmental monitoring and motion tracking. The device incorporates several industry-standard components:

- **BME680**: A 4-in-1 environmental sensor that measures gas (VOC), humidity, pressure, and temperature.
- **ICM42670**: A high-performance 6-axis IMU (accelerometer and gyroscope) for gesture recognition and activity tracking.
- **VL53L1X**: A long-range Time-of-Flight (ToF) sensor for precise distance measurements up to 4 meters.
- **DS3231**: An extremely accurate I2C real-time clock (RTC) with an integrated temperature-compensated crystal oscillator to ensure precise timekeeping.
- **MCP3427**: A dual-channel 16-bit analog-to-digital converter for high-resolution voltage sensing.

## Hardware Architecture

The hardware design is optimized for the constraints of a wearable device. It utilizes a TPS79533 linear regulator for stable 3.3V power and a BQ24090 Li-Ion battery charger for safe and efficient charging via USB-C. The bill of materials (BOM) specifies high-quality components from major distributors like LCSC and DigiKey, ensuring reliability for those looking to assemble their own unit.

The project repository includes comprehensive hardware documentation, including:
- Full schematics in PDF format
- Gerber files for PCB fabrication
- Detailed placement sheets and a Bill of Materials (BOM)
- 3D-printable or wearable-ready design considerations

## Software and Customization

The Gateway Smartwatch is designed to be highly customizable. The repository provides pre-compiled binary files for different visual styles, including a "Planets Theme" and a "Steampunk Theme," which demonstrate the graphical capabilities of the hardware. For developers looking to extend the functionality, an Arduino receiver example is provided, showing how to interface the watch with other devices or base stations.

Because it is based on the ESP32-S3, the project benefits from the robust ESP-IDF and Arduino ecosystems, allowing developers to leverage FreeRTOS for task management and various libraries for Bluetooth and Wi-Fi connectivity.

## Community and Open Source

The Gateway Smartwatch is an excellent reference for anyone interested in modern wearable design, I2C sensor bus management, and compact PCB layout techniques. It is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0, which encourages learning and personal modification while ensuring the original creator's work is respected.
