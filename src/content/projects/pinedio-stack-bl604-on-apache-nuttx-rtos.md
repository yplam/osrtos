---
title: PineDio Stack BL604 on Apache NuttX RTOS
summary: A comprehensive implementation of the Apache NuttX RTOS for the Pine64 PineDio
  Stack BL604 microcontroller board. It features integrated support for the ST7789
  display, LVGL graphics library, SX1262 LoRa transceiver, and various onboard sensors
  using a shared SPI bus architecture.
slug: pinedio-stack-bl604-on-apache-nuttx-rtos
codeUrl: https://github.com/lupyuen/pinedio-stack-nuttx
siteUrl: https://lupyuen.github.io/articles/pinedio2
star: 6
lastUpdated: '2022-04-17'
rtos: nuttx
libraries:
- lvgl
topics:
- bl604
- i2c
- lora
- lvgl
- nuttx
- pinedio
- riscv32
- spi
- st7789
- sx1262
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- apache-nuttx-rtos-for-pinephone
- st7789-and-lvgl-demo-for-apache-nuttx-rtos
- apache-nuttx-rtos-for-pine64-star64
- zig-on-risc-v-bl602-with-apache-nuttx-rtos
- lvgl-test-app-for-apache-nuttx
- rust-test-app-for-apache-nuttx-os
---

## Overview

The PineDio Stack BL604 is a versatile microcontroller board from Pine64, centered around the Bouffalo Lab BL604 SoC, which features a RISC-V architecture with integrated WiFi and Bluetooth LE. This project brings the Apache NuttX RTOS to the PineDio Stack, enabling a robust, POSIX-compliant environment for IoT development. The repository provides the necessary board support, drivers, and configurations to utilize the board's extensive hardware features, including its color display, LoRa transceiver, and various environmental sensors.

## Hardware and Features

The PineDio Stack is designed for IoT education and development, packed with a wide array of peripherals:
- **Display**: ST7789 240x240 color LCD.
- **Connectivity**: Semtech SX1262 LoRa transceiver (LoRaWAN compatible), WiFi, and Bluetooth LE.
- **Navigation**: AT6558 GPS/GNSS receiver.
- **Sensors**: Heart rate sensor, accelerometer, compass, and a CST816S touch panel.
- **Power Management**: SGM40561 PMU and battery support.

## Shared SPI Bus Architecture

A significant technical aspect of this implementation is the management of the shared SPI bus. On the PineDio Stack, the ST7789 display, the SX1262 LoRa transceiver, and the SPI Flash all reside on the same bus. To prevent crosstalk and handle hardware quirks, the project implements a sophisticated SPI device table. 

One specific challenge addressed is a BL602 SPI quirk requiring MISO and MOSI pins to be swapped for certain devices. While the SX1262 and SPI Flash require this swap, the ST7789 display is wired differently, receiving data on GPIO 0. The project manages these transitions dynamically during chip selection, ensuring that the SPI controller configuration matches the target device's requirements before communication begins.

## Graphics and User Interface

With the integration of the ST7789 driver and the LVGL (Light and Versatile Graphics Library), the PineDio Stack can render complex user interfaces. The implementation supports SPI Mode 1 or 3 depending on the pin configuration and runs reliably at frequencies up to 4 MHz. Developers can utilize the included `lvgltest` and `lvgldemo` applications to verify display performance and begin building their own graphical applications.

## LoRa and LoRaWAN Integration

The project successfully demonstrates LoRaWAN connectivity using the SX1262 transceiver. By registering specific SPI test drivers, the system avoids race conditions between the display and the radio. The implementation has been verified to connect to LoRaWAN gateways like ChirpStack, enabling the transmission of sensor data, such as internal temperature readings, over long-range networks.

## Getting Started

To build NuttX for the PineDio Stack, the project utilizes a standard NuttX build flow. After cloning the main NuttX repository and the apps repository (using the `pinedio` branches), users can configure the environment specifically for the BL602-based board:

```bash
./tools/configure.sh bl602evb:pinedio
make
```

This process generates a firmware image that supports the NSH (NuttX Shell), allowing users to interact with the hardware via a serial console and run built-in applications like `sx1262_test` or `lvgldemo`.
