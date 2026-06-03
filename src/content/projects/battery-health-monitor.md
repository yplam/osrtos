---
title: Battery Health Monitor
summary: A DIY battery monitoring device based on the ATmega328P microcontroller for
  tracking the State of Charge (SoC) and State of Health (SoH) of lithium batteries.
  It integrates the BQ27441 fuel gauge and BQ24075 charger ICs to provide real-time
  battery diagnostics via LED indicators.
slug: battery-health-monitor
codeUrl: https://github.com/BEEMB/Battery-Health-Monitor
star: 32
lastUpdated: '2025-04-01'
rtos: ''
topics:
- arduino
- atmega328p
- battery
- bq24075
- bq27441
- health
- led-indicators
- lithium-batteries
- pcb-design
- state-of-charge
- usb-c
isShow: true
image: /202601/battery-health.webp
createdAt: '2026-01-14'
updatedAt: '2026-01-14'
relatedProjects:
- esp32-remote-for-victron
- spinc-diy-automatic-battery-charger
- bbmonitor
- light-watcher
- max17263-test-app-for-mongoose-os
- bq35100-mbed-library
---

## Overview

The Battery Health Monitor is a compact, self-contained DIY project designed to provide deep insights into the condition of lithium-ion batteries. Unlike simple voltage-based indicators, this device tracks both the State of Charge (SoC) and the State of Health (SoH), allowing users to understand not just how much energy is left, but how much the battery has degraded over time. 

Built around the popular ATmega328P microcontroller, the project serves as a practical tool for anyone working with 18650 cells or LiPo batteries in hobbyist electronics, robotics, or portable devices.

## Technical Implementation

The system relies on specialized integrated circuits to handle the complexities of battery management:

- **BQ27441-G1A Fuel Gauge**: This IC uses the Impedance Track™ technology to accurately predict battery capacity and health. It communicates with the ATmega328P over I2C to report remaining capacity, state of health, and voltage.
- **BQ24075 Charger**: A linear charger with power-path management that allows the system to power the load while simultaneously charging the battery. It supports USB-C input for modern compatibility.
- **ATmega328P**: Acts as the central controller, reading data from the fuel gauge and driving the LED bar displays to provide visual feedback to the user.

## Key Features

- **Real-Time Monitoring**: Provides immediate visual feedback on battery status through dedicated LED bars for SoC and SoH.
- **Versatile Connectivity**: The hardware design includes multiple connection options, including an onboard 18650 battery holder, JST connectors, and screw terminals for external battery packs.
- **Compact Design**: The PCB is designed to be small and portable, making it easy to integrate into larger projects or use as a standalone tester.
- **USB-C Integration**: Modern power input for charging and system power.

## Hardware and Firmware

The project is fully open-source, providing comprehensive hardware files including schematics, Bill of Materials (BOM), Gerber files for PCB manufacturing, and 3D models for enclosures. 

The firmware is developed within the Arduino environment, making it accessible for modification. The code handles the initialization of the BQ27441 fuel gauge, configures battery parameters (such as design capacity and termination voltage), and maps the resulting data to the LED indicators. 

## Getting Started

To build the Battery Health Monitor, users should refer to the provided Assembly Guide. The process involves soldering SMD components, so a reflow oven or steady hand with a fine-tip iron is recommended. Once the hardware is assembled, the firmware can be flashed to the ATmega328P using a standard AVR ISP programmer or via the Arduino IDE if a bootloader is present. The project is inspired by the SparkFun Battery Babysitter but adds dedicated visual indicators and a streamlined form factor for standalone use.
