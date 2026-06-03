---
title: Losant Temperature Sensor for Mongoose OS
summary: A power-efficient ESP32 application built on Mongoose OS that transmits internal
  temperature readings to the Losant IoT platform. It utilizes MQTT for communication
  and deep sleep for extended battery life, featuring a unique calibration system
  to approximate ambient temperature.
slug: losant-temperature-sensor-for-mongoose-os
codeUrl: https://github.com/mongoose-os-apps/losant-temp-sensor
star: 6
version: 2.18.0
lastUpdated: '2019-08-30'
rtos: mongoose-os
topics:
- esp32
- esp822
- espressif
- losant
- mongoose-os
- mongoose-os-app
- mqtt
- temperature-sensor
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- esp-temperature-to-losant-using-mongoose-os
- mongoose-os-esp8266-pir-monitor
- mongoose-os-mlx90614-ir-temperature-monitor
- mongoose-os-environment-logger
- ulp-temperature-logging-iot-node
- coffee-bin-mqtt
---

The `losant-temp-sensor` project is a practical implementation of an IoT edge device designed to monitor environmental conditions and report them to a cloud-based dashboard. Built using Mongoose OS, this application is specifically tailored for the ESP32, leveraging its internal sensors and low-power capabilities to create a functional temperature monitoring node with minimal external hardware.

## Intelligent Temperature Sensing

One of the most interesting aspects of this application is how it handles temperature data. Instead of requiring an external thermistor or digital sensor, it utilizes the ESP32's internal temperature sensor. Because internal sensors primarily measure the temperature of the MCU itself—which is typically higher than the surrounding environment—the app implements a calibration logic.

Upon initial setup, the user provides a reference ambient temperature (the `temperature.basis`). The application compares this reference to the internal reading to calculate a fixed offset. Subsequent readings are adjusted by this offset to provide a more accurate approximation of the ambient temperature. This approach allows for quick testing and deployment using nothing more than a standard ESP32 development board and a USB cable.

## Power Efficiency and Deep Sleep

To maximize battery life, the application is designed around a cyclic sleep-and-wake pattern. After booting, connecting to WiFi, and successfully publishing its data to the Losant MQTT broker, the device immediately enters deep sleep. 

The sleep duration is configurable (defaulting to 10 minutes), allowing users to balance data granularity with power consumption. This makes the project suitable for remote monitoring applications where power sources might be limited.

## The "Edit Mode" Solution

A common challenge with deep-sleeping IoT devices is that they are difficult to configure via a serial console because they spend very little time awake and active. This project solves that problem with a dedicated **Edit Mode**. 

By pressing the `Boot` or `Flash` button on the ESP32 after a restart, the user can disable deep sleep for one boot cycle. An onboard LED provides visual feedback on the mode status. While in Edit Mode, the UART connection remains active, allowing developers to use the `mos` tool to update configurations like WiFi credentials, MQTT settings, or temperature units without the device shutting down mid-command.

## Cloud Integration with Losant

The application integrates seamlessly with the Losant IoT platform. It uses MQTT with SSL/TLS support for secure data transmission. On the Losant side, users can set up attributes for temperature, offset, and units, which can then be used to trigger workflows or populate real-time dashboards.

## Configuration and Customization

The project is highly configurable through the Mongoose OS configuration system. Key parameters include:
- `temperature.unit`: Toggle between Celsius and Fahrenheit.
- `sleep_duration`: Define how long the device stays in deep sleep.
- `led.gpio` and `button.gpio`: Customize the hardware pins for different ESP32 board layouts.

This flexibility, combined with the robust foundation of Mongoose OS libraries for WiFi and MQTT, makes it an excellent starting point for developers looking to explore IoT telemetry.
