---
title: Flexwatch
summary: A minimalist, low-power smartwatch built with a 2.9-inch e-ink display and
  a Seeed Studio XIAO nRF52840 Sense. It utilizes a custom flex PCB and integrated
  sensors to provide a comfortable, long-lasting wearable experience focused on essential
  timekeeping.
slug: flexwatch
codeUrl: https://github.com/ephiras/EPD-FlexwatchV0
lastUpdated: '2026-03-31'
image: /202603/EPD-FlexwatchV0_0.avif
rtos: ''
isShow: true
createdAt: '2026-03-31'
updatedAt: '2026-03-31'
---

Most modern smartwatches are essentially tiny smartphones strapped to your wrist, constantly buzzing with notifications and requiring daily charging. Flexwatch takes a different approach. Designed as a "low stress" wearable, this project prioritizes readability, battery longevity, and a minimalist user experience through the use of electronic paper display (EPD) technology and efficient hardware.

## The Hardware Foundation

At the heart of the Flexwatch is the Seeed Studio XIAO nRF52840 Sense. This compact microcontroller provides the necessary processing power and integrated sensors while maintaining a small footprint suitable for a wearable. The display is a 2.9-inch e-ink panel, chosen for its excellent sunlight readability and the fact that it consumes zero power when displaying a static image.

One of the most unique aspects of the project is its physical construction. The current version utilizes a custom flex PCB, allowing the internal components to conform more comfortably to the wrist. The frame itself is creatively improvised, utilizing a ruler-based rigid structure to provide support where needed, showcasing a blend of professional PCB design and clever mechanical problem-solving.

## Key Features and Functionality

The firmware, developed within the Arduino ecosystem, focuses on core timekeeping and extreme power efficiency. 

- **Accurate Timekeeping**: The project uses an external RV3028C7 RTC (Real-Time Clock) to ensure precise time even when the main MCU is in deep sleep. This is critical for maintaining accuracy over long periods without needing to sync with a phone.
- **Gesture Awareness**: By leveraging the integrated LSM6DS3 accelerometer, the watch can detect wrist gestures. This allows the display to update or the system to wake from low-power modes only when the user is actually looking at the watch.
- **Energy Management**: The combination of an e-ink display and the nRF52840's native low-power modes allows the watch to function for extended periods on a single charge, moving away from the "charge every night" cycle of standard smartwatches.
- **Battery Monitoring**: Integrated logic tracks the battery level, providing data to the user and allowing the system to manage its power state based on remaining capacity.

## Software Architecture

The codebase is structured as an Arduino sketch, relying on several specialized libraries to interface with the custom hardware. It utilizes the `GxEPD2_BW` library for managing the Waveshare e-paper display, ensuring efficient partial updates to the screen. Communication with the RTC and the IMU is handled via the I2C protocol using the `Wire` library, alongside specific drivers for the RV3028C7 and LSM6DS3 components.

## Future Development

While the current version provides a stable watch interface, the hardware is designed with significant expansion in mind. The PCB layout already includes support for Bluetooth and a microphone, which are slated for future software implementation. 

Beyond software updates, the roadmap for the Flexwatch includes:
- **GPS Integration**: A new layout is planned to incorporate positioning data.
- **Health Monitoring**: Future iterations aim to include heart rate and UV sensors.
- **Rigid-Flex PCB**: Transitioning from a purely flex PCB to a rigid-flex design for better durability.
- **Improved Sleep States**: Further optimization of the firmware to squeeze even more life out of the battery.

Flexwatch is an open-source project under the MIT License, offering a refreshing take on what a wearable can be when the goal is utility and comfort rather than constant connectivity.
