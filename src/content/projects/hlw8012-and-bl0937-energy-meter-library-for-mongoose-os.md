---
title: HLW8012 and BL0937 Energy Meter Library for Mongoose OS
summary: A Mongoose OS library for the HLW8012 and BL0937 energy monitoring sensors,
  targeting ESP32 and ESP8266 platforms. It enables precise measurement of voltage,
  current, active power, and energy consumption through a pulse-based interface.
slug: hlw8012-and-bl0937-energy-meter-library-for-mongoose-os
codeUrl: https://github.com/yaourdt/mgos-hlw8012
star: 0
version: v0.1.0
lastUpdated: '2021-01-21'
rtos: mongoose-os
topics:
- bl0937
- energy-monitor
- hlw8012
- mongoose-os
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- hlw811x-power-metering-library
- energy-consumption-monitor
- ltc68xx-battery-monitoring-library-for-mongoose-os
- energy-consumption-monitor-energymon-c
- sgp30-gas-sensor-library-for-mongoose-os
- hx711-library-for-mongoose-os
---

## Overview

The mgos-hlw8012 library provides a robust interface for integrating HLW8012 and BL0937 energy monitoring sensors into Mongoose OS projects. These sensors are commonly found in smart plugs and energy monitoring devices, offering a cost-effective way to measure AC power consumption. This library acts as a wrapper around the well-known xoseperez/hlw8012 implementation, bringing its proven logic to the Mongoose OS ecosystem.

## Key Features

The library allows developers to extract a wide range of electrical metrics from the connected sensor. By monitoring the pulse outputs of the HLW8012 or BL0937, the library calculates:

- **Voltage and Current**: Real-time RMS values.
- **Power Metrics**: Active, apparent, and reactive power measurements.
- **Efficiency**: Calculation of the power factor.
- **Accumulated Energy**: Tracking total energy consumption over time with a reset capability.

## Hardware Integration and Safety

This library is specifically designed for the ESP32 and ESP8266 microcontrollers. It utilizes GPIO pins to interface with the sensor's CF (power pulse), CF1 (voltage/current pulse), and SEL (selection) pins. 

**Important Safety Note:** When working with these sensors, the hardware is often connected directly to mains voltage. It is critical to avoid connecting a serial line for debugging while the device is powered by the mains. Instead, developers should use UDP logging or other isolated communication methods to ensure safety.

## Configuration and Calibration

Integration into a Mongoose OS project is handled via the `mos.yml` configuration file. Users can define the specific GPIO pins and operational parameters such as pulse timeouts and multipliers. 

Because these sensors rely on external components (like shunt resistors and voltage dividers) that vary between devices, manual calibration is required for accurate readings. The library provides functions to set expected values based on a known resistive load, allowing the system to calculate the necessary multipliers for the specific hardware implementation.

```c
// Example calibration for a 10A load at 220V
mgos_hlw8012_expectedCurrent(10.0);
mgos_hlw8012_expectedVoltage(220);
mgos_hlw8012_expectedActivePower(2200);
```

## Technical Implementation

The library supports both interrupt-driven and polling modes for pulse detection. By default, it uses interrupts to ensure high precision in pulse timing, which is essential for accurate power calculation. The configuration schema allows for fine-tuning the `pulse_timeout` and the logic level of the selection pin (`currentWhen`), ensuring compatibility with various hardware designs and "exotic" device configurations.

Once calibrated, reading data is straightforward using the provided C API:

```c
double current = mgos_hlw8012_getCurrent();
unsigned int voltage = mgos_hlw8012_getVoltage();
unsigned int active_power = mgos_hlw8012_getActivePower();
unsigned long energy = mgos_hlw8012_getEnergy();
```

This library provides a reliable bridge between low-level pulse counting and high-level energy management for IoT applications built on Mongoose OS.
