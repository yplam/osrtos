---
title: 'STM32-Quadcopter: Low-cost Quadcopter Design'
summary: An open-source quadcopter project based on the STM32F411CEU6 Blackpill development
  board running INAV 6.0 firmware. The design includes a hybrid frame of carbon fiber
  and 3D-printed parts, integrating MPU6500/BMP280 sensors and supporting GPS navigation.
  It provides full schematics, CAD models, and firmware build instructions for a low-cost
  DIY flight platform.
slug: stm32-quadcopter-low-cost-quadcopter-design
codeUrl: https://github.com/I-M-Robotics-Lab/STM32-Quadcopter
siteUrl: https://www.imroboticslab.com/docs/stm32-quadcopter
star: 20
lastUpdated: '2025-11-13'
rtos: cmsis
topics:
- diy-electronics
- drone
- flight-controller
- pcb
- quadcopter
- stm32
isShow: false
createdAt: '2026-01-12'
updatedAt: '2026-01-12'
relatedProjects:
- fpv-drone-stm32f411-flight-controller
- drone-stm32f1
- avem
- freevario
- bitcraze-crazyflie-2-0-2-1-mbed-os-firmware
- catpilot
---

## Overview

The STM32-Quadcopter project by I-M Robotics Lab provides a comprehensive blueprint for building a high-performance, low-cost drone. By leveraging the popular STM32F411CEU6 "Blackpill" development board, the project demonstrates how hobbyist-grade hardware can be transformed into a capable flight controller compatible with professional-grade firmware like INAV. This repository serves as a complete resource for makers, providing mechanical CAD models, KiCAD electronics designs, and firmware configuration guides.

## Hardware Architecture

At the heart of the quadcopter is the STM32F411CEU6, a Cortex-M4 microcontroller running at 100MHz. This choice provides a significant performance boost over traditional 8-bit flight controllers while maintaining a small footprint and low cost. The sensor suite includes an MPU6500 for 6-axis inertial measurements and a BMP280 for barometric pressure sensing, enabling stable flight and altitude hold capabilities. For those looking to expand, the design supports external GPS and magnetometer modules via UART, paving the way for autonomous navigation.

### Key Components
- **Flight Controller:** STM32F411CEU6 Blackpill
- **IMU:** MPU6500 or MPU9250
- **Barometer:** BMP280
- **Motors:** RS2205 BLDC Motors with 20A ESCs
- **Radio:** FS-iA6B Receiver and Transmitter

## Frame and Mechanical Design

The project stands out for its hybrid frame construction. It utilizes a combination of 2D carbon-fiber parts for structural rigidity and 3D-printed components for complex geometries. The documentation suggests using high-strength filaments like PET-CF or PAHT-CF for critical parts, while ABS suffices for less-stressed components. This approach allows builders to customize and repair their frames easily using standard desktop 3D printers and CNC services.

## Firmware Integration: INAV 6.0

The project is specifically tailored for INAV 6.0.0. A key technical aspect of this implementation is the handling of the 25 MHz High-Speed External (HSE) clock found on many Blackpill boards. Since INAV does not support this clock frequency by default for this target, the project provides a specific code patch for the `system_stm32f4xx.c` file to correctly configure the Phase-Locked Loop (PLL). This ensures the MCU runs at its intended clock speed, which is critical for the timing-sensitive tasks of flight control.

```c
// Example of the PLL_M modification for 25MHz HSE
#if HSE_VALUE == 25000000
    #define PLL_M   25
#elif HSE_VALUE == 24000000
    #define PLL_M   24
```

## Building and Flashing

The build process utilizes a modern toolchain involving CMake, Ninja, and the `gcc-arm-none-eabi` compiler. Flashing is performed via the INAV Configurator, utilizing the STM32's built-in Device Firmware Upgrade (DFU) mode. The documentation provides a clear path for users to enter DFU mode using the onboard BOOT and RESET buttons, making the firmware deployment process accessible even to those new to the STM32 ecosystem.

## Sensor Nuances and Troubleshooting

A common challenge in the DIY drone community is the proliferation of mislabeled MPU9250 modules. The project addresses this by providing diagnostic Arduino code to read the `WHO_AM_I` register. This allows builders to identify whether they have a genuine MPU9250 (0x73) or an MPU6500 (0x71) and adjust their firmware configuration accordingly, ensuring the IMU is correctly initialized by the flight controller. This attention to detail makes the STM32-Quadcopter an excellent educational resource for understanding the complexities of embedded hardware integration.
