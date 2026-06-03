---
title: STM32 Weather Station
summary: A desktop weather station built on the STM32F746G-Discovery board featuring
  a TouchGFX-based graphical interface. It integrates local temperature readings from
  a DS18B20 sensor with remote weather data from Open Weather Map via Ethernet. The
  project utilizes FreeRTOS for task management and LwIP for network connectivity.
slug: stm32-weather-station
codeUrl: https://github.com/AdrianBesciak/STM32WeatherStation
star: 9
lastUpdated: '2021-05-27'
rtos: freertos
libraries:
- lwip
topics:
- ds18b20
- freertos
- lwip
- stm32
- stm32f7
- stm32f746g-discovery
- touchgfx
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- erikaos-online-weather-station
- wt32-sc01-plus-smart-desk-companion
- stm32f407-weather-clock-cmake-development-template
- stm32l476g-discovery-rtos-sensor-project
- desk-weather-clock-geekmagic-s3
- stm32f4-display-and-ethernet-example
---

The STM32 Weather Station is a sophisticated embedded project that transforms an STM32F746G-Discovery board into a functional desktop weather monitoring system. By combining local sensor data with real-time information from the Open Weather Map API, the station provides a detailed view of both indoor and outdoor environmental conditions through a professional-grade graphical interface.

## Hardware and Display

The project is centered around the STM32F746G-Discovery kit, which features a high-performance ARM Cortex-M7 core and a 480x272 pixel LCD touch panel. This hardware choice allows for a rich, interactive user interface. For local temperature monitoring, the system uses a DS18B20 digital thermometer, a popular choice in the embedded world for its accuracy and simple one-wire interface. The hardware configuration is managed through STM32CubeMX, utilizing the MCU's advanced peripherals like the LTDC for the display and the FMC for SDRAM management.

## Graphical User Interface with TouchGFX

One of the standout features of this weather station is its professional-grade UI, developed using STMicroelectronics' TouchGFX framework. TouchGFX leverages the hardware acceleration capabilities of the STM32F7—specifically the Chrom-ART Accelerator (DMA2D)—to deliver smooth animations and high-quality graphics without taxing the CPU. The interface displays current weather conditions, forecasts, and local sensor readings across multiple screens, providing an intuitive experience for the user.

## Networking and Data Integration

To fetch external weather data, the station utilizes the LwIP (Lightweight IP) stack to establish an Ethernet connection via the RMII interface. It communicates with the Open Weather Map service to retrieve global weather data. This integration demonstrates a practical application of IoT concepts, where an edge device combines local sensing with cloud-based information to provide a complete data set to the user.

## System Architecture

The software is built on FreeRTOS, which manages the various concurrent tasks required for a responsive system. The use of a Real-Time Operating System ensures that the UI remains fluid while the system performs background networking operations and sensor polling. Key tasks include:

- **TouchGFX Task**: Dedicated to rendering and processing touch interactions for the graphical interface.
- **Networking Task**: Manages the LwIP stack, handles DHCP, and executes HTTP requests to the weather API.
- **Sensor Task**: Periodically reads data from the DS18B20 thermometer using precise timing over a GPIO pin.

## Development and Documentation

The project was developed using STM32CubeIDE. The repository is well-structured, with main application logic separated into specific modules for headers and sources. For those interested in replicating the project, the repository includes a comprehensive PDF document detailing the final implementation, hardware connections, and software configuration. This project serves as an excellent example of integrating high-level graphics, RTOS task management, and networking on a modern ARM Cortex-M7 microcontroller.
