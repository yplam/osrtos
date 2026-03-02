---
title: OpenTemp Thermal Imager + Infrared Thermometer
summary: An open-source handheld thermal imaging device and infrared thermometer based
  on the STM32F413 microcontroller. It features a Melexis MLX90640 thermal sensor,
  USB-C charging, and a custom PCB design for portable thermal analysis.
slug: opentemp-thermal-imager-infrared-thermometer
codeUrl: https://github.com/RoboticWorx/OpenTemp
siteUrl: https://roboticworx.io/blogs/projects/opentemp
star: 65
lastUpdated: '2025-01-08'
rtos: ''
topics:
- infrared
- mlx90640
- stm32
- thermal
isShow: true
image: /202603/opentemp.webp
createdAt: '2026-03-02'
updatedAt: '2026-03-02'
---

OpenTemp is a sophisticated, open-source handheld thermal imaging device designed for makers, engineers, and hobbyists. Combining a high-performance thermal sensor with a powerful microcontroller, it provides a portable solution for visualizing heat patterns, identifying thermal leaks, or exploring the infrared spectrum in real-time.

## Hardware Architecture

At the heart of OpenTemp is the **STM32F413RGT6**, a high-performance ARM Cortex-M4 microcontroller. This MCU provides the necessary computational power to process raw data from the thermal sensor and drive the graphical user interface. With 1MB of Flash and significant RAM, it is well-suited for the memory-intensive tasks of interpolating thermal data and rendering it to a display.

The thermal vision is provided by the **Melexis MLX90640**, a 32x24 pixel infrared array. While this resolution might seem modest compared to standard digital cameras, it is highly effective for thermal analysis, offering a wide field of view. The sensor communicates via I2C and is capable of detecting temperatures ranging from -40°C to 300°C, making it versatile for both industrial and hobbyist applications.

## Power and Connectivity

Designed for portability and ease of use, the project includes a complete power management system:

- **Battery Charging**: An onboard Texas Instruments BQ24090 IC handles Lithium-Ion battery charging via a modern USB-C interface.
- **Voltage Regulation**: A TPS79533 low-dropout (LDO) regulator ensures a stable 3.3V supply for the sensitive analog components and the MCU, minimizing noise in the thermal readings.
- **User Interface**: The design incorporates tactile switches for navigation and multiple status LEDs (Power, Charge, and Status) to provide immediate feedback to the user.

## Design and Assembly

The repository provides a complete set of hardware design files, making it possible for users to manufacture their own units. The documentation includes:

- **Schematics and Gerbers**: Full design files for PCB fabrication.
- **Bill of Materials (BOM)**: A detailed list of components with part numbers for major distributors like LCSC and DigiKey.
- **Placement Sheet**: A guide for physical component orientation during the SMD assembly process.

The physical design is optimized for a handheld form factor, utilizing a 64-pin LQFP package for the MCU and standard 0603/0805 passive components, making it an achievable project for those with intermediate surface-mount soldering skills.

## Licensing and Usage

OpenTemp is released under the **Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International** license. This allows users to download, build, and modify the project for personal use and education. However, the license explicitly prohibits the commercial sale of the project, ensuring it remains an open resource for the maker community.
