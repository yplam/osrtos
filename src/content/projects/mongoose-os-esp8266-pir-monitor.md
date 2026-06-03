---
title: Mongoose OS ESP8266 PIR Monitor
summary: A low-power motion detection application for the ESP8266 that utilizes a
  PIR sensor and MQTT for reporting. It features advanced power-saving techniques
  including deep sleep, RTC memory persistence, and conditional WiFi activation to
  minimize energy consumption.
slug: mongoose-os-esp8266-pir-monitor
codeUrl: https://github.com/Tommystus/PIR-Monitor
star: 10
lastUpdated: '2017-11-23'
rtos: mongoose-os
topics:
- deepsleep
- esp8266-rtc
- mongoose-os
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- losant-temperature-sensor-for-mongoose-os
- esp-temperature-to-losant-using-mongoose-os
- coffee-bin-mqtt
- ulp-temperature-logging-iot-node
- mongoose-os-mlx90614-ir-temperature-monitor
- mqtt-wake-on-lan-for-esp8266
---

The PIR-Monitor project is a specialized firmware implementation for the ESP8266 microcontroller, designed to create a highly efficient motion detection system. Built on the Mongoose OS (MOS) framework, the application leverages the ESP8266's low-power capabilities to provide a battery-friendly solution for IoT security and automation.

## Efficient Power Management

The core strength of this project lies in its aggressive power-saving strategy. Standard ESP8266 applications often consume significant power due to the WiFi radio. This monitor circumvents that by keeping the WiFi interface disabled during normal operation. When the Passive Infrared (PIR) sensor detects motion, the device wakes from deep sleep, processes the event, and only then enables WiFi if necessary to transmit an MQTT message.

According to the project documentation, the system consumes approximately 15mA for a few seconds during the detection phase before returning to sleep. To achieve maximum efficiency, users are encouraged to disable both Station and Access Point modes by default using the Mongoose OS configuration tool:

```bash
mos config-set wifi.sta.enable=false wifi.ap.enable=false
```

## Heartbeat and RTC Memory

To ensure the device remains operational over long periods, the application implements a heartbeat signal. This signal is sent after a configurable number of deep sleep cycles, allowing a central server to know the device is still alive even if no motion has been detected. The project utilizes RTC memory to maintain state (like cycle counts) across deep sleep resets, ensuring data persistence without the power overhead of writing to flash memory.

## Technical Implementation

The project is structured as a Mongoose OS application, utilizing a mix of C for low-level logic and JavaScript (`init.js`) for high-level application flow. The `mos.yml` configuration file defines the project dependencies, including libraries for MQTT, RPC services, and WiFi management. 

Key configuration parameters include:
- `pir.dsTimeout`: Defines the duration of the deep sleep period in seconds.
- `pir.hbCycle`: Sets the number of sleep cycles between heartbeat messages.
- `pir.devName`: A unique identifier for the device in MQTT topics.

## Hardware Considerations

The project includes a specific circuit design to handle the PIR interrupt. A critical note for developers is that the PIR signal should be grounded before flashing the firmware, as accidental triggers can reset the chip and interrupt the process. Additionally, the author notes that signal interference from the ESP8266 can sometimes cause false triggers on the PIR sensor; this is physically mitigated by using aluminum foil as shielding around the PIR module.

## Remote Management

While the device is designed to stay offline to save power, it includes a mechanism for maintenance. By manually setting the PIR signal to active, the application is prevented from entering sleep mode. This keeps the WiFi active, allowing developers to perform remote script updates or configuration changes via the Mongoose OS toolset without needing a physical serial connection.
