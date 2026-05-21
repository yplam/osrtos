---
title: ESPHome Plant Watering
summary: An automated irrigation system built with ESPHome for the M5Stack AtomS3-Lite
  and Unit Watering modules. It supports up to six plants via I2C expansion and features
  moisture-based automation and safety limits through Home Assistant integration.
slug: esphome-plant-watering
codeUrl: https://github.com/dcelasun/esphome-plant-watering
lastUpdated: '2026-05-03'
image: /202605/esphome-plant-watering_1.avif
rtos: freertos
libraries:
- platformio-platformio-core
topics:
- atoms3-lite
- esphome
- home-assistant
- home-assistant-integration
- m5stack
- m5stack-pbhub
- m5stack-unit-watering
isShow: true
createdAt: '2026-05-20T00:12:46+00:00'
updatedAt: '2026-05-20T00:12:46+00:00'
---

Automated indoor gardening often requires a delicate balance between simple hardware and robust software. The ESPHome Plant Watering project provides a comprehensive firmware solution for managing up to six plants using the M5Stack ecosystem. By leveraging the power of ESPHome and the ESP32-S3-based AtomS3-Lite, this project creates a bridge between physical soil moisture sensors and the Home Assistant automation engine.

## Hardware Architecture

The system is designed around a modular hardware stack from M5Stack. At the core is the AtomS3-Lite, a compact development board that handles the logic and connectivity. Because the AtomS3-Lite has limited I/O, the project utilizes the M5Stack PbHub v1.1. This I2C expander allows the system to communicate with up to six Unit Watering modules simultaneously. 

Each Unit Watering module is a self-contained irrigation tool containing both a capacitive moisture sensor and a small water pump. This design avoids the corrosion issues common with resistive sensors while providing integrated pumping capabilities. One critical technical detail is power management: while the AtomS3-Lite can power a single pump directly via its Grove port, the firmware includes a configuration toggle (`allow_simultaneous_pumps`) to prevent overdrawing current unless an external 5V supply, like the Unit TypeC to Grove, is used.

## Smart Firmware and Calibration

The firmware is built on ESPHome, which simplifies the integration of the PbHub and the analog signals from the watering units. A key feature of this implementation is the focus on sensor accuracy. Since capacitive moisture sensors often provide raw values that vary based on soil type and probe placement, the firmware allows for individual calibration of each plant. Users can define `dry_raw` and `wet_raw` values to map the sensor output to a meaningful 0-100% moisture scale.

Safety is also handled at the firmware level. To prevent accidental flooding in the event of a sensor failure or a logic error in Home Assistant, the project enforces a `pump_max_run_time` (defaulting to 10 seconds). This ensures that even if a "turn on" command is sent, the pump will automatically shut off after the safety threshold is reached.

## Home Assistant Integration

Once flashed, the device is automatically discovered by Home Assistant. This allows for sophisticated automation logic that goes beyond simple timers. For example, users can create automations that only trigger at specific times of day if the moisture level drops below a certain percentage, or prevent watering entirely if the soil is already saturated.

```yaml
alias: Water Plant 1 When Dry
trigger:
  - platform: time
    at: "07:30:00"
condition:
  - condition: numeric_state
    entity_id: sensor.plant_watering_plant_1_soil_moisture_percent
    below: 35
action:
  - service: switch.turn_on
    target:
      entity_id: switch.plant_watering_plant_1_water_pump
```

## Deployment and Maintenance

The project uses the `uv` package manager to handle dependencies, ensuring that the ESPHome environment and PlatformIO core are managed without interfering with system-wide Python installations. This makes the setup process highly reproducible. The included Makefile streamlines the workflow, providing simple commands for validation, compilation, and flashing over USB or via mDNS for wireless log monitoring.
