---
title: DualCast
summary: DualCast is an open-source multi-protocol wireless tool designed for LoRa
  communication and 2.4GHz network analysis. Built on a dual-MCU architecture featuring
  an STM32H5 and an ESP32-C6, it integrates long-range LoRa capabilities with modern
  2.4GHz standards like WiFi 6, Bluetooth 5, and Zigbee.
slug: dualcast
codeUrl: https://github.com/RoboticWorx/DualCast
siteUrl: https://roboticworx.io/blogs/projects/dualcast
star: 14
lastUpdated: '2025-03-08'
rtos: ''
topics:
- esp32
- lora
- stm32
- sx1262
- wifi
isShow: true
image: /202601/dualcast.webp
createdAt: '2026-01-19'
updatedAt: '2026-01-19'
relatedProjects:
- project-starbeam
- openairscope
- esp-hack-fw
- esp-graber
- ghostesp
- esp32-bit-pirate
---

DualCast is a comprehensive, open-source hardware and software project designed for wireless communication enthusiasts and security researchers. It functions as both a high-performance LoRa (Long Range) transceiver and a versatile 2.4GHz wireless network analyzer. By combining the processing power of the STM32H5 series with the multi-protocol wireless capabilities of the ESP32-C6, DualCast provides a portable platform for sniffing, analyzing, and transmitting across a wide array of radio frequencies.

## Hardware Architecture

The heart of the DualCast system is a dual-processor design that separates high-level application logic from dedicated wireless tasks. The main controller is an **STM32H563VIT6**, an ARM Cortex-M33 microcontroller running at 250MHz with 2MB of Flash. This chip handles the user interface, sensor data processing, and overall system management.

For wireless connectivity, the project utilizes two primary modules:
- **ESP32-C6**: This RISC-V based SoC provides support for 2.4GHz protocols, including WiFi 6, Bluetooth 5 (LE), Zigbee, and Thread. It acts as the primary engine for network analysis and sniffing.
- **SX1262**: A long-range LoRa transceiver that allows for sub-GHz communication, making the device capable of sending and receiving data over several kilometers.

## Integrated Features and Sensors

Beyond its radio capabilities, DualCast is packed with peripheral hardware that makes it a standalone diagnostic tool:
- **Display**: A 2.4-inch 240x320 TFT LCD provides real-time data visualization, from signal strength graphs to packet contents.
- **Environmental Sensing**: An onboard BME280 sensor monitors temperature, humidity, and atmospheric pressure.
- **Motion and Orientation**: The BMI323 6-axis IMU tracks device movement and orientation.
- **Distance Sensing**: A VL53L4CX Time-of-Flight (ToF) sensor allows for precise distance measurements up to 6 meters.
- **User Interface**: The device features eight tactile switches for navigation and a vibration motor for haptic feedback.
- **Power Management**: It includes a BQ24090 Li-Po charger and a 1.25Ah battery, making the unit fully portable.

## The DualCast Receiver

The project also includes a dedicated receiver module based on the **STM32U073CCT6**, a low-power ARM Cortex-M0+ microcontroller. This receiver is designed to act as a remote node that can be triggered by the main DualCast unit. It features its own SX1262 LoRa module and BME280 sensor, allowing it to report environmental data back to the main unit or execute commands via its GPIO pins.

## Getting Started

The repository provides everything needed to replicate the project, including PCB Gerber files, a detailed Bill of Materials (BOM), and firmware for both the ESP32 and STM32 components. For those looking to integrate the receiver into their own projects, an Arduino-based example is provided to demonstrate how to read binary commands sent from the DualCast transceiver.

```cpp
// Example: Reading binary commands on the DualCast Receiver
int readBinaryInput()
{
  int value = 0;
  value |= digitalRead(CONNECTED_TO_PA3) << 0;  // IO1 -> bit 0 (1's place)
  value |= digitalRead(CONNECTED_TO_PA4) << 1;  // IO2 -> bit 1 (2's place)
  value |= digitalRead(CONNECTED_TO_PA5) << 2;  // IO3 -> bit 2 (4's place)
  value |= digitalRead(CONNECTED_TO_PA6) << 3;  // IO4 -> bit 3 (8's place)
  value |= digitalRead(CONNECTED_TO_PA7) << 4;  // IO5 -> bit 4 (16's place)
  return value;
}
```

Whether you are interested in LoRaWAN development, WiFi security auditing, or general embedded systems design, DualCast offers a robust, well-documented platform for exploration.
