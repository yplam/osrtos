---
title: Zigbee Flow and Return Temperature Sensor
summary: An nRF52840-based Zigbee sensor designed to monitor flow and return temperatures
  in heating systems using dual NTC thermistor probes. Built with the nRF Connect
  SDK and Zephyr RTOS, it is optimized for ultra-low power consumption, achieving
  over a year of battery life on a coin cell.
slug: zigbee-flow-and-return-temperature-sensor
codeUrl: https://github.com/tomasmcguinness/zigbee-nrf-flow-and-return-temperature-sensor
siteUrl: https://tomasmcguinness.com/2024/12/19/reducing-power-consumption-in-my-nrf52840-zigbee-sensor-with-the-help-of-a-nordic-semiconductors-power-profiler-ii-kit/
star: 11
lastUpdated: '2025-07-25'
rtos: zephyr
topics:
- nrf52840
- zigbee
isShow: true
image: /202601/zigbee-flow-sensor.webp
createdAt: '2026-01-29'
updatedAt: '2026-01-29'
relatedProjects:
- beelight-zigbee-light-environment-sensor
- q-sensor-multi-functional-zigbee-air-quality-sensor
- zigbee-gas-counter
- losant-temperature-sensor-for-mongoose-os
- smart-iot-sensor-with-xiao-esp32c6
- ruuvitag-firmware-for-zephyr-os
---

## Monitoring Heating Efficiency with Zigbee

The Zigbee Flow and Return Temperature Sensor is a specialized embedded project designed to provide high-accuracy monitoring of heating systems. By measuring the temperature difference between the 'flow' (hot water leaving a boiler) and 'return' (water returning after circulating through radiators), users can gain critical insights into the efficiency of their home heating setup. The project is built around the Seeed XIAO nRF52840, a compact and powerful microcontroller capable of running both the Zigbee stack and complex power management routines.

## Technical Architecture

The firmware is developed using the nRF Connect SDK (NCS), which leverages the Zephyr RTOS. This choice provides a robust foundation for Zigbee networking and hardware abstraction. The sensor utilizes two NTC thermistors connected via voltage dividers to the nRF52840's ADC pins (P0.03 and P0.29). 

To ensure accuracy, the project uses high-precision 0.1% resistors and allows for software-level calibration of thermistor parameters, including nominal resistance and the B-coefficient. The Zigbee implementation follows the standard Zigbee Cluster Library (ZCL) to ensure broad compatibility with home automation coordinators.

### Zigbee Endpoints and Clusters

The device exposes three distinct endpoints to the Zigbee network:
- **Endpoint 1**: Handles device management, including the Basic, Identify, and Power Configuration clusters.
- **Endpoint 5**: Dedicated to the first Temperature Measurement Cluster (Probe 1).
- **Endpoint 7**: Dedicated to the second Temperature Measurement Cluster (Probe 2).

This multi-endpoint approach allows standard Zigbee gateways, such as Home Assistant's ZHA integration, to recognize and log both temperature probes independently.

## Power Optimization

A primary focus of this project is extreme energy efficiency. Through careful optimization of the Zigbee polling intervals and hardware sleep states, the sensor achieves an average current consumption of approximately 16µA. This efficiency allows the device to operate for over 18 months on a standard CR2032 coin cell battery, or up to a decade on a larger 2000mAh battery pack. The developer has documented this journey extensively, highlighting the use of the Nordic Power Profiler Kit II to identify and eliminate power leaks.

## Hardware and PCB Design

Beyond the firmware, the repository includes hardware designs created in KiCAD. The PCB has evolved through several iterations:
- **V2**: Introduced a mix of SMD and through-hole components with fixes for the reset circuitry.
- **V3**: Moved to a socket-mount design for the XIAO board to simplify assembly for hobbyists and introduced pogo-pin battery connections.
- **V4**: A work-in-progress design aiming for a fully SMD footprint with an integrated CR2032 holder.

## Getting Started

The project uses the Zephyr `west` meta-tool for building and flashing. Developers can compile the firmware for the XIAO BLE target using standard NCS commands:

```bash
west build -b xiao_ble -p
```

Flashing can be performed via the factory-installed UF2 bootloader by dragging the generated `zephyr.uf2` file onto the device's USB drive, or via a J-Link programmer for more advanced debugging. Once powered, the device automatically enters pairing mode, ready to be joined to any standard Zigbee 3.0 network.
