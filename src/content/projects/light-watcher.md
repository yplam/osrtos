---
title: Light Watcher
summary: An ESP32-based IoT power monitoring system that tracks electricity outages
  and notifies users via a Telegram bot. The device features a battery backup system
  for seamless operation during blackouts and utilizes a captive portal for easy configuration
  of network and bot credentials.
slug: light-watcher
codeUrl: https://github.com/Stanislav-developer/Light_Watcher
version: v1.5
lastUpdated: '2026-02-15'
licenses:
- MIT
image: /202604/Light_Watcher_2.avif
rtos: ''
libraries:
- littlefs
topics:
- 3d-printing
- arduino
- blackout
- diy-electronics
- esp32
- esp32c3
- home-automation
- iot
- li-ion
- power-monitoring
- telegrambot
- ukrainian
isShow: true
createdAt: '2026-04-18T01:29:14+00:00'
updatedAt: '2026-04-18T01:29:14+00:00'
---

Light Watcher is an automated monitoring solution designed to provide real-time updates on the state of the local electrical grid. Built primarily for the ESP32-C3 SuperMini, this Telegram bot tracks the exact timing of power outages and restorations, offering essential data for users in regions experiencing frequent grid instability. It functions as a specialized IoT observer that logs outage durations and maintains statistics, ensuring users stay informed through instant messaging.

### Key Features and Capabilities

The system is engineered with several failsafes to ensure reliability under difficult conditions. It calculates the precise duration of power absences and includes battery discharge protection logic. Even if the battery runs low during a prolonged outage, the device is programmed to notify the user as soon as power returns and calculate the total time it was offline. 

The hardware architecture allows the ESP32 to switch to battery power seamlessly without rebooting, maintaining a continuous connection to the network. To ensure high availability, the firmware includes a connectivity watchdog that checks the Wi-Fi status every 30 seconds, attempting to reconnect automatically if the signal is lost. The bot is also capable of operating within group chats, allowing multiple users to receive simultaneous updates.

### Telegram Interaction

Users interact with the device through a standard set of Telegram commands. The `/status` command provides the current system state, while `/info` offers general bot details. There are also maintenance commands for setting seasonal time (summer/winter), clearing historical statistics, or remotely restarting the microcontroller. Beyond formal commands, the bot is programmed to respond to natural language queries regarding whether the electricity is currently on or off.

### Hardware Architecture and Wiring

The physical device is built around the ESP32-C3 SuperMini, though versions for the ESP8266 are also available. The circuit is designed to manage power intelligently between a USB source and an 18650 lithium battery.


The components include a TP4056 charging module and a CKCS BS01 DC-DC boost converter to maintain a stable 5V rail. Schottky diodes (1N5819) are utilized for power path management, preventing backflow and ensuring the device draws power from the grid when available while keeping the battery charged. A simple voltage divider, consisting of 10kΩ and 20kΩ resistors, allows the microcontroller to monitor the grid status via an analog pin.

### Software Design and Configuration

The firmware has evolved to simplify user setup. Starting with version 1.5, the project features a captive portal for configuration.

![Web interface for Wi-Fi and Telegram configuration](/202604/Light_Watcher_4.avif)

This web-based interface allows users to input Wi-Fi credentials, Bot tokens, and Chat IDs directly from a smartphone or computer without needing to hardcode them into the source code. The project relies on the `UniversalTelegramBot` library for API communication and uses the `Preferences` library (or `LittleFS` on ESP8266 versions) to store outage logs and configuration data in non-volatile memory.

### Physical Construction and Assembly

To house the electronics, a custom 3D-printed enclosure was developed. The case is designed to be compact (90 x 85 x 30 mm) while providing dedicated slots for the 18650 battery holder, the PCB modules, and a KCD11 power switch.

![Internal assembly and component placement](/202604/Light_Watcher_9.avif)

The assembly process involves mounting the modules into the 3D-printed base and securing them with M2 screws. The final result is a professional, self-contained IoT device that can be plugged into any standard USB power source for continuous, long-term grid monitoring.

![Fully assembled Light Watcher device](/202604/Light_Watcher_10.avif)
