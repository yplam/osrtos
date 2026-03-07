---
title: ESPHome for Nixie2
summary: A custom ESPHome component and configuration for driving Nixie tube clocks
  using the HV5222 high-voltage shift register. It targets the ESP32-S3 platform using
  the ESP-IDF framework and features integrated tube cleaning cycles, SNTP time synchronization,
  and WS2812 backlighting.
slug: esphome-for-nixie2
codeUrl: https://github.com/acvigue/esphome-nixie2
siteUrl: https://vigue.me/nixie-clock
star: 15
lastUpdated: '2025-07-17'
rtos: freertos
topics:
- altium
- esp-idf
- esp32
- esphome
- nixie
isShow: false
createdAt: '2026-03-07'
updatedAt: '2026-03-07'
---

## Overview

ESPHome for Nixie2 is a specialized firmware solution designed to bridge the gap between vintage Nixie tube technology and modern smart home ecosystems. Built on the ESPHome framework, this project provides a custom component for the HV5222 low-side shift register, which is commonly used to interface low-voltage microcontrollers with high-voltage Nixie tube cathodes. 

The project is specifically tailored for the ESP32-S3 platform using the ESP-IDF framework, offering a robust and extensible foundation for building high-end Nixie clocks that integrate natively with Home Assistant.

## Hardware Integration

The firmware is designed to run on the ESP32-S3-DevKitC-1, leveraging its high-performance capabilities to manage both timekeeping and visual effects. The core of the display logic relies on the HV5222 shift register, controlled via a software SPI interface. This allows for precise control over multiple Nixie tubes (up to 6 tubes in the provided example) by daisy-chaining shift registers.

In addition to the high-voltage display, the project supports:
- **WS2812 Backlighting**: Integrated RGB LED support for ambient lighting effects beneath the tubes.
- **HV5222 Output Enable (OE) Calibration**: A sophisticated PWM-based dimming system using the ESP32's LEDC peripheral. It includes a calibrated template output to ensure smooth brightness transitions and minimum voltage thresholds.
- **SPI Communication**: Uses a software-based SPI implementation to drive the HV5222 at data rates up to 10MHz.

## Key Features

### Tube Cleaning (Anti-Cathode Poisoning)
One of the critical maintenance requirements for Nixie tubes is a "cleaning" cycle to prevent cathode poisoning. This project automates this process using a cron-based trigger. Every hour, the clock enters a cleaning state where it rapidly cycles through all digits on all tubes for 45 iterations, ensuring the longevity of the vintage hardware.

### Time Synchronization
The system utilizes the SNTP protocol to maintain accurate time. It supports both standard (12-hour) and military (24-hour) time formats, toggleable via global variables. The logic handles digit splitting (tens and units) for seconds, minutes, and hours, mapping them directly to the corresponding pins on the HV5222 shift registers.

### Smart Home Connectivity
As an ESPHome-based project, it inherits full support for the Home Assistant API, including encrypted communication and Over-the-Air (OTA) updates. This allows users to control the clock's backlight, toggle time formats, or monitor the clock's status directly from their mobile devices or dashboards.

## Example Configuration

The following YAML snippet demonstrates how the `hv5222` component is integrated into an ESPHome configuration, including the pin mapping for a six-digit Nixie display:

```yaml
external_components:
  - source: github://acvigue/esphome-nixie2
    components: [hv5222]

spi:
  id: spi_hv5222
  clk_pin: 12
  mosi_pin: 10
  interface: software

hv5222:
  - id: myHV5222
    spi_id: spi_hv5222
    data_rate: 10MHz
    spi_mode: MODE0
    count: 2

number:
  - platform: hv5222
    id: nixie_1
    hv5222: myHV5222
    pins: [50, 51, 52, 53, 54, 55, 56, 57, 58, 59]
```

## Technical Implementation Details

The project utilizes a custom C++ component within ESPHome to handle the bit-shifting logic required by the HV5222. By defining the Nixie tubes as `number` entities, the firmware allows for easy manipulation of the displayed digits through standard ESPHome actions. The use of the ESP-IDF framework ensures that the underlying FreeRTOS tasks are handled efficiently, providing stable performance even during complex LED animations or network activity.
