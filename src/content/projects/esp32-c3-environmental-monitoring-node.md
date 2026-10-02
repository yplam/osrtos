---
title: ESP32-C3 Environmental Monitoring Node
summary: A high-efficiency, low-power environmental monitoring firmware developed
  using the native ESP-IDF v5.x framework for the ESP32-C3. It integrates deep sleep
  cycles with multi-sensor data collection and provides configurable alerts via Telegram,
  Discord, and custom webhooks. The system includes a built-in SoftAP web portal for
  runtime configuration, allowing users to manage Wi-Fi credentials and sensor thresholds
  without serial re-flashing.
slug: esp32-c3-environmental-monitoring-node
codeUrl: https://github.com/d7main/ESP32_EnvironmentalNode
siteUrl: https://d7main.github.io/ESP32_EnvironmentalNode/
version: v1.0.1
lastUpdated: '2026-07-31'
image: /202608/ESP32_EnvironmentalNode_1.avif
rtos: freertos
libraries:
- lwip
topics:
- bmp280
- deepsleep
- dht22
- discord-webhook
- embedded-c
- esp32-c3
- esp32-c3-super-mini
- freertos
- iot
- platformio
- soil-moisture-sensor
- telegram-bot-checker
- web-configurator
isShow: true
createdAt: '2026-08-09T09:12:54+00:00'
updatedAt: '2026-08-09T09:12:54+00:00'
relatedProjects:
- smart-iot-sensor-with-xiao-esp32c6
- lilygo-higrow-esp32-plant-monitoring-sensor-firmware-hardware-v1
- espmonitor-iot-environmental-monitoring-system
- lilygo-higrow-esp32-plant-monitoring-sensor-firmware
- inkcast
- espmonitor-iot-environment-monitoring-system
---

The ESP32-C3 Environmental Monitoring Node is a purpose-built firmware designed for long-term remote sensing. Built with native **ESP-IDF v5.x** and managed via **PlatformIO**, this project avoids the overhead of the Arduino framework to achieve a lean, performant system. The device is designed to spend most of its time in a deep sleep state, waking up periodically to sample environmental data, evaluate soil moisture conditions against a configurable threshold, and dispatch alerts before returning to sleep.


### Core Features and Capabilities

The firmware is optimized for reliability and ease of use in the field. Key capabilities include:

*   **Native Performance**: By using pure ESP-IDF, the project ensures minimal bloat and direct access to the ESP32-C3's hardware features.
*   **Deep Sleep Management**: The node utilizes a timer-based RTC wakeup, with a default sleep interval of 30 minutes to conserve battery power.
*   **On-Demand Configuration**: A physical button press (GPIO9) for three seconds launches a SoftAP Web Portal. This interface allows users to update Wi-Fi settings, notification tokens, and sensor calibration values on the fly at `192.168.4.1`.
*   **Resilient Alerting**: The system supports multiple independent notification channels, including Telegram Bot API, Discord Webhooks, and a generic JSON Webhook. Each channel operates independently, ensuring that a failure in one service does not prevent others from firing.
*   **Data Persistence**: All critical runtime configurations, such as ADC calibration bounds and alert thresholds, are stored in Non-Volatile Storage (NVS), allowing them to survive power cycles.

### Target Hardware and Wiring

The project targets the **ESP32-C3** (specifically the `esp32-c3-devkitm-1`) with 2 MB of flash. It utilizes a variety of sensors to capture a complete environmental picture, including a capacitive soil moisture sensor via ADC, a BMP280 for temperature and atmospheric pressure via I²C, and a DHT22 for humidity via a 1-Wire interface.

![Wiring Schematic](/202608/ESP32_EnvironmentalNode_2.avif)

GPIO assignments are carefully chosen to avoid strapping pin conflicts. For instance, while GPIO2 controls boot mode, the project utilizes GPIO9 for the configuration trigger, as it is safe to hold LOW during operation. The soil sensor is powered through a gated GPIO (GPIO7) to prevent electrolysis and save power during sleep cycles.

### Setup and Configuration

On the initial boot, the device detects that it is unconfigured and automatically launches the SoftAP portal. Users can connect to the `d7main_sensor` SSID to access the web-based setup form. This form handles everything from Wi-Fi credentials to the specific API tokens required for Discord or Telegram alerts.

![Web Configurator User Interface](/202608/ESP32_EnvironmentalNode_0.avif)

### Sensor Calibration and Logic

Accurate soil moisture monitoring requires calibration due to variances in sensors and supply voltages. The firmware calculates moisture percentage linearly based on two user-defined ADC points: `v_dry` (measured in open air) and `v_wet` (measured submerged in water). These values can be read in real-time from the Live Telemetry card within the web portal during the setup phase.

### Firmware Operational Cycle

The firmware follows a structured boot cycle to maximize efficiency:
1.  **NVS Initialization**: Load stored configurations.
2.  **Configuration Check**: If unconfigured, block and launch the Web Portal.
3.  **Active Loop**: If configured, spawn a button monitor task, read all connected sensors, and connect to Wi-Fi.
4.  **Alert Evaluation**: If the calculated moisture is below the defined threshold, the `sys_alerts_send()` function triggers all active webhook channels.
5.  **Sleep**: The device enters Deep Sleep for the duration defined by `DEFAULT_SLEEP_SEC`.

This architecture ensures that the node remains autonomous and responsive to environmental changes while maintaining a low power profile suitable for battery-operated deployments.
