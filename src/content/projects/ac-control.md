---
title: AC_control
summary: AC_control is an Arduino-based project designed to control air conditioning
  units via MQTT. It utilizes IR signals stored in SPIFFS to trigger ON and OFF functions,
  integrating with Adafruit IO for remote operation.
codeUrl: https://github.com/samlewis02/AC_control
isShow: false
rtos: ''
libraries:
- spiffs
topics:
- mqtt
- ir
- wemos-d1-mini
- spiffs
- air-conditioner
- platformio
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- iot-project-on-hvac
- electricitydisplay-mqtt-remote-control-for-esp8266-esp32
- mel-ac-demo-app
- mel-ac-library-for-mongoose-os
- esphome-hitachi-h-link-ac-component
- thing-simplified-mqtt-framework-for-esp8266-and-esp32
---

Managing air conditioning units that lack built-in smart features can be a challenge for home automation enthusiasts. The **AC_control** project offers a robust solution by bridging the gap between traditional infrared (IR) remotes and modern IoT protocols. By leveraging an ESP8266 or similar microcontroller, this project allows users to switch their A/C on and off using MQTT messages.

### How It Works

Unlike simple television remotes that send short codes, air conditioner remotes often transmit a large block of data representing the entire state of the unit (temperature, fan speed, mode, etc.). Because these signals are complex and vary significantly between manufacturers, AC_control uses a recording approach. 

Users first capture the IR signals from their physical remote using an IR detector connected to an Arduino. Two specific files are required for the system to function: one for the **OFF** command and one for the **ON** command. Because these files can be quite large, they are stored in **SPIFFS** (Serial Peripheral Interface Flash File System) on the microcontroller's flash memory.

### Integration with Adafruit IO

The project is designed to work seamlessly with the Adafruit IO platform. By setting up a feed and a simple toggle switch on the Adafruit IO dashboard, users can send "ON" or "OFF" strings to the device. When the microcontroller receives a message via MQTT, it retrieves the corresponding data file from SPIFFS and transmits the raw IR signal through an IR LED to the air conditioner.

### Technical Architecture

The repository is organized into several modular libraries to handle different aspects of the system:
- **handler**: Manages the logic for processing incoming messages.
- **prepare_files**: Handles the reading and preparation of IR data from the filesystem.
- **DebugMacros**: Provides utility for logging and troubleshooting.
- **common**: Contains shared utilities used across the project.

### Getting Started

To implement this project, you will need to:
1.  **Capture IR Codes**: Use an IR receiver to record the raw data from your A/C remote for both the ON and OFF states.
2.  **Upload to SPIFFS**: Save these captures as text files (e.g., `ACbedrm1.txt`) and upload them to the device's SPIFFS partition.
3.  **Configure MQTT**: Set up your WiFi credentials and Adafruit IO feed details within the source code.
4.  **Hardware Setup**: Connect an IR LED with an appropriate resistor to the designated GPIO pin on your microcontroller.

This approach ensures that regardless of the specific brand or model of your air conditioner, as long as you can capture the IR signal, you can automate it.
