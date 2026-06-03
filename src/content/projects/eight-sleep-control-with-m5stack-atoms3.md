---
title: Eight Sleep Control with M5Stack ATOMS3
summary: A dedicated hardware controller for Eight Sleep mattresses using the M5Stack
  ATOMS3 Dev Kit and ESPHome. It provides a physical interface to monitor bed temperature,
  sleep stages, and state, while allowing users to cycle through temperature presets
  via a built-in button and Home Assistant integration.
slug: eight-sleep-control-with-m5stack-atoms3
codeUrl: https://github.com/jkpe/eight-sleep-m5stack-atoms3
star: 10
version: v1.2
lastUpdated: '2025-04-30'
rtos: freertos
topics:
- atoms3
- eight-sleep
- esp32
- home-assistant
- home-automation
- homeassistant
- m5stack
isShow: true
image: /202601/atoms3-eightsleep.webp
createdAt: '2026-01-23'
updatedAt: '2026-01-23'
relatedProjects:
- esp32-c6-matter-over-thread-roof-window-controller
- home-assistant-epaper-remote
- comfosense-touch-zehnder-comfoair-q350-mqtt-bridge-controller
- m5stack-esphome-integrations
- esphome-hitachi-h-link-ac-component
- mitsubishi-ecodan-air-to-water-bridge-for-cn105-to-mqtt
---

## Overview

Adjusting smart home devices at night often involves the friction of finding a smartphone, unlocking it, and navigating through apps—a process that can be disruptive to sleep. This project addresses that specific pain point for Eight Sleep mattress users by repurposing the M5Stack ATOMS3 Dev Kit into a dedicated, bedside physical controller. 

The ATOMS3 is a compact ESP32-S3 based device featuring an integrated 0.85-inch display and a front-facing button. By leveraging ESPHome and Home Assistant, this project transforms the device into a real-time dashboard and remote control for the Eight Sleep system, allowing for quick temperature adjustments and status monitoring without ever needing to reach for a phone.

## Key Features and Capabilities

The controller provides a high-density information display and tactile control in a tiny form factor. Key features include:

- **Real-time Monitoring**: The display shows the current bed temperature, target heating level, current sleep stage (such as REM or Deep sleep), and the general bed state (Active or Off).
- **Tactile Temperature Cycling**: A single press of the ATOMS3 button cycles through pre-configured temperature settings (e.g., -2, -1, 0, +1), which are then sent to the Eight Sleep API via Home Assistant.
- **Smart Backlight Management**: To ensure the device doesn't disturb sleep, an automation automatically turns off the display backlight 30 seconds after the last interaction.
- **Home Assistant Integration**: The system relies on the custom Eight Sleep integration for Home Assistant to bridge the gap between the ESP32 hardware and the Eight Sleep cloud API.

## Technical Implementation

The project is built on the ESPHome framework, which runs on the ESP32-S3 microcontroller. While the hardware handles the display and button input, the heavy lifting for logic and data processing occurs within Home Assistant using YAML-based templates and automations.

### Data Mapping and Templates

Because the Eight Sleep API and sensors often provide data in formats that are too long for a 0.85-inch screen, the project uses Home Assistant templates to sanitize and scale the data. For example, the bed state is shortened from a long string to a single word like "Active." 

Additionally, the project maps the Eight Sleep sensor's internal percentage range (-100% to 100%) to the more familiar app scale of -10 to 10 using a mathematical mapping template:

```yaml
{% set value = states('sensor.jack_s_eight_sleep_side_bed_state') | float %}
{% set mapped_value = ((value / 100) * 10) | round %}
{{ mapped_value }}
```

### Automation Logic

The interaction model is designed to be intuitive. If the display is off, the first button press simply wakes the screen. Subsequent presses cycle through an `input_select` helper in Home Assistant, which contains the user's preferred temperature offsets. 

To prevent accidental changes while the bed is powered off, the automation includes a safety condition that checks the bed state before sending commands to the Eight Sleep API. When a new temperature is selected, the system waits for a 10-second confirmation period before calling the `eight_sleep.heat_set` service, ensuring that rapid button presses don't flood the API with requests.

## Hardware and Software Requirements

To implement this setup, users require:
- **M5Stack ATOMS3 Dev Kit**: The core hardware featuring the ESP32-S3 and the LCD.
- **ESPHome**: Used to flash the firmware onto the ATOMS3.
- **Home Assistant**: Acts as the central hub for automations and API communication.
- **Custom Eight Sleep Integration**: Specifically the `lukas-clarke/eight_sleep` integration, which provides the necessary service calls for temperature control.

This project demonstrates the power of combining specialized IoT hardware with flexible smart home platforms to create highly functional, single-purpose devices that improve the user experience of complex consumer electronics.
