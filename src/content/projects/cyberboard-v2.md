---
title: Cyberboard V2
summary: A compact development board featuring the STM32WB55CG microcontroller in
  a Raspberry Pi Pico form factor, designed for wireless sensing applications. It
  integrates Bluetooth Low Energy, an ICM-42688 6-axis IMU, and a BMP580 barometer
  with a sophisticated power management system for battery operation. The project
  utilizes the STM32 HAL and WPAN middleware to implement a dual-core wireless sensor
  hub.
slug: cyberboard-v2
codeUrl: https://github.com/notaroomba/cyberboard
siteUrl: https://notaroomba.dev
lastUpdated: '2026-04-06'
image: /202604/cyberboard_1.avif
rtos: cmsis
topics:
- blutooth
- devboard
- imu
- raspberry-pi-pico
- stm32
isShow: true
createdAt: '2026-04-22T00:32:45+00:00'
updatedAt: '2026-04-22T00:32:45+00:00'
---

Cyberboard V2 is a specialized development board that brings the capabilities of the STM32WB55 series to the popular Raspberry Pi Pico form factor. Unlike its predecessor, V2 is a complete redesign focused on providing reliable functionality for environmental and motion sensing projects that require wireless connectivity.


## Key Features

The heart of the board is the STM32WB55CG microcontroller, which provides native Bluetooth support. The hardware is tailored for mobile and environmental monitoring, featuring an ICM-42688 6-axis IMU for motion tracking and a BMP580 pressure sensor for high-precision barometric data. 

Power management is a core focus of the design. It includes a BQ24072RGTR IC for LiPo battery charging via a dedicated solder pad and a TPS631000 buck-boost converter to maintain efficient power delivery across varying battery voltages. The board also features USB-C connectivity for both power and data, along with multiple status LEDs for immediate visual feedback during development.

## Technical Architecture and Firmware

The software architecture is designed to operate the STM32WB55 as a wireless sensor hub. The firmware leverages the STM32_WPAN middleware stack to manage the dual-core nature of the MCU, where one core handles the application logic and the other manages the Bluetooth Low Energy (BLE) radio stack. 

Data processing includes a custom Kalman filter implementation to refine signals from the motion sensors. Communication with the onboard sensors is handled via SPI and I2C interfaces, while external connectivity is provided through BLE and USB CDC (Communication Device Class) for serial debugging and data transfer.

## PCB Design and Hardware Layout

The board utilizes a 4-layer PCB stackup (Signal/Ground/Power/Signal) to ensure signal integrity and optimal RF performance. Significant attention was paid to the Bluetooth section, which features a ceramic antenna with precise impedance matching.

![Cyberboard V2 Schematic Diagram](/202604/cyberboard_3.avif)

The layout includes SWD test points on the bottom of the board for streamlined programming and debugging. The 4-layer design allows for a dedicated ground plane, which is essential for the sensitive analog signals coming from the IMU and the high-frequency RF signals from the Bluetooth radio.

![PCB Front Render](/202604/cyberboard_8.avif)

## Manufacturing and Integration

The project is designed with manufacturing efficiency in mind, utilizing a panelized layout that is cost-effective for services like JLCPCB. This approach makes it easier to produce small batches of the board for fleet deployment or testing.

![Assembled PCB Panels](/202604/cyberboard_10.avif)

By combining the STM32 ecosystem with the Pico's physical footprint, the Cyberboard V2 offers a high-performance alternative for developers who need integrated wireless capabilities and advanced sensing in a compact, battery-ready package.
