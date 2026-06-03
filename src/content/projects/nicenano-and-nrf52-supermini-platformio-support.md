---
title: Nicenano and NRF52 Supermini PlatformIO Support
summary: A board support package and configuration repository for Nicenano and NRF52840
  Supermini development kits in PlatformIO. It provides variant definitions, pin mappings,
  and setup instructions for the Adafruit nRF52 Arduino framework and Zephyr RTOS.
slug: nicenano-and-nrf52-supermini-platformio-support
codeUrl: https://github.com/ICantMakeThings/Nicenano-NRF52-Supermini-PlatformIO-Support
star: 40
lastUpdated: '2026-01-05'
rtos: zephyr
libraries:
- nimble
topics:
- arduino
- nicenano
- nrf52
- nrf52840
- platformio
- platformio-arduino
isShow: false
createdAt: '2026-01-16'
updatedAt: '2026-01-16'
relatedProjects:
- super-mini-esp32-c3-arduino-and-platformio-sketches
- n-able-arduino-core
- xiao-esp32c6-sketches
- lemon-iot-lte-nrf9160
- blackpill-stm32f401ce-support-for-mbed-os-6
- esp32-repo
---

The Nicenano and NRF52840 Supermini are popular, compact development boards often found on platforms like AliExpress, featuring the powerful Nordic nRF52840 SoC. While these boards offer a form factor similar to the Seeed Studio XIAO or Pro Micro, they often lack native support in standard development environments. This project bridges that gap by providing the necessary configuration files and variant definitions to use these boards seamlessly within PlatformIO.

## Hardware Compatibility

This support package is designed for various nRF52840 devkits, including the TENSTAR ROBOT ProMicro NRF52840 and the "Super NRF52840" (often referred to as a XIAO clone). These boards are characterized by their high pin density and integrated Bluetooth Low Energy (BLE) capabilities, making them ideal for wireless peripherals like custom mechanical keyboards or small IoT sensors.

## Simplified Pin Mapping

One of the most useful features of this support package is the intuitive pin mapping. The firmware definitions are designed to match the physical silkscreen on the boards. For example, a pin labeled as `102` on the board corresponds to the physical MCU pin `P1.02`. In the firmware, this can be addressed directly using the `PIN_102` constant:

```cpp
digitalWrite(PIN_102, HIGH);
```

Default peripheral configurations are also provided for common buses:
- **SPI**: P1.11 (SCK), P1.13 (MOSI), P1.15 (MISO)
- **I2C**: P1.06 (SCL), P1.04 (SDA)
- **Serial**: P0.06 (TX), P0.08 (RX)

## Customization and Variants

For developers needing to relocate peripheral pins, the project provides guidance on modifying the `variant.h` file located within the PlatformIO packages directory. By adjusting the definitions for `PIN_WIRE_SDA` or `PIN_WIRE_SCL`, users can reconfigure the I2C or SPI buses to suit their specific hardware layout. This flexibility is crucial for projects with tight routing requirements or conflicting pin assignments.

## Framework Support

While primarily targeting the Adafruit nRF52 Arduino framework (which provides compatibility with the Bluefruit library), the project also acknowledges and provides paths for using other ecosystems:

- **Adafruit Bluefruit**: Works with standard nRF52 Arduino libraries for BLE and peripheral management.
- **Zephyr RTOS**: Provides links to Zephyr documentation for users preferring a professional-grade RTOS environment.
- **n-able**: Includes configuration examples for using the n-able platform and NimBLE-Arduino for optimized Bluetooth performance.

## Power Management Insights

Beyond software configuration, the project offers practical advice for low-power applications. It notes that many of these inexpensive boards suffer from high quiescent current due to leaky charging ICs. To achieve the lowest possible power consumption, it recommends bypassing the standard power input and using the "VDD" SMD pad located on the bottom of the board near the debugging pins.
