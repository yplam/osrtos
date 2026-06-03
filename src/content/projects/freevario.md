---
title: FreeVario
summary: An open-source variometer project designed for paragliding and hang gliding,
  providing telemetry data via Bluetooth or USB in NMEA format. It features an STM32F405
  processor, E-Ink display, and a suite of sensors including GNSS, pressure, and motion
  tracking.
slug: freevario
codeUrl: https://github.com/FreeVario/FreeVario
star: 45
version: '0.02'
lastUpdated: '2024-04-02'
rtos: freertos
topics:
- cubemx
- e-ink
- freertos
- gnss
- paragliding
- stm32
- stm32f4
- vario
isShow: false
createdAt: '2025-12-28'
updatedAt: '2025-12-28'
relatedProjects:
- fpv-drone-stm32f411-flight-controller
- stm32-quadcopter-low-cost-quadcopter-design
- drone-stm32f1
- avem
- move-on-helium-sensors
- lvgl-demo-embarcadores
---

FreeVario is an open-source hardware and firmware project dedicated to creating a high-performance variometer for flight sports. By providing real-time telemetry data to popular flight software such as XCSoar or XCTrack, it serves as a bridge between physical flight sensors and digital navigation tools. The system transmits data via Bluetooth or USB using standard NMEA sentences, making it compatible with a wide range of mobile devices and flight computers.

## Hardware Architecture

The project is built around a custom PCB featuring a robust set of components tailored for aviation needs:
- **Processing**: STM32F405 microcontroller
- **Display**: E-Ink screen, chosen for its exceptional readability in direct sunlight
- **Sensors**: BMP280 pressure sensor for altitude and lift detection, and an MPU6050 motion sensor for orientation
- **Connectivity**: HM13 Bluetooth module for wireless telemetry and an SX1276 LoRa Modem for FANET support
- **Positioning**: Integrated GNSS module for location tracking
- **Storage**: Micro SD card reader for data logging
- **Power**: USB-C for charging and OTG, managed by a CN3055 LiPo charger

## Firmware and RTOS Integration

The firmware is developed using the STM32 HAL drivers and runs on FreeRTOS. This real-time operating system approach allows the device to handle multiple concurrent tasks—such as sensor polling, GNSS processing, and Bluetooth transmission—with deterministic timing. 

Developers contributing to the project are encouraged to follow specific RTOS-friendly practices. For instance, the project strictly avoids `HAL_Delay()` in favor of `osDelay()` to ensure the scheduler can switch tasks during wait periods. Additionally, the architecture emphasizes passing pointers to sub-functions rather than relying on global `extern` declarations, maintaining a cleaner and more modular codebase.

## Telemetry and Communication

The primary function of FreeVario is to act as a telemetry hub. It aggregates data from the barometer and GNSS to calculate vertical speed (lift/sink) and position. This information is then formatted into NMEA sentences, which are the industry standard for GPS and marine/aviation electronics. The inclusion of an SX1276 LoRa modem also opens up possibilities for FANET (Flight Awareness Network), allowing for peer-to-peer communication between pilots in the air.

## Project Status

FreeVario is currently in a development state. While milestone releases are considered practically usable for enthusiasts, the hardware and firmware are still evolving. The project provides a complete ecosystem for those interested in building their own flight instruments, from the hardware design files to the FreeRTOS-based source code.
