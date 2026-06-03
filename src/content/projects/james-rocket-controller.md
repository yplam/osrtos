---
title: James Rocket Controller
summary: Firmware for a Raspberry Pi Pico-based rocket controller designed for the
  Czech Rocket Challenge. It features automated parachute deployment via free-fall
  detection using an ADXL345 accelerometer, data logging to flash memory using Littlefs,
  and audible/visual status feedback.
slug: james-rocket-controller
codeUrl: https://github.com/profi248/james_rocket_controller
star: 1
lastUpdated: '2021-09-19'
rtos: ''
libraries:
- littlefs
topics:
- accelerometer
- littlefs
- pi-pico
- raspberry-pi-pico
- rocket
isShow: false
createdAt: '2025-12-29'
updatedAt: '2025-12-29'
relatedProjects:
- alturia-firmware
- filtered-inertial-rotation-module-firm
- flight-controller-rev2
- mcp2518fd-can-fd-logger-for-raspberry-pi-pico
- stick-firmware
- droners
---

The James Rocket Controller is a specialized firmware developed for the Czech Rocket Challenge, a model rocket competition. Built on the Raspberry Pi Pico (RP2040), the system manages the critical phases of a rocket's flight, specifically focusing on automated recovery and flight data recording.

### Flight Operation and Recovery

The controller operates through a simple but effective state machine. Upon booting, the system enters a standby mode, waiting for a physical button press to "lock" the parachute. This action moves the SG90 servo to its initial position, securing the recovery system for launch.

During flight, the controller monitors an ADXL345 accelerometer. The firmware is configured to detect a free-fall event, which signifies that the rocket has reached its apogee (peak) and is beginning its descent. Once this event is triggered via a hardware interrupt, the controller immediately rotates the servo to release the parachute. Simultaneously, a piezo buzzer is activated to provide an audible beacon, assisting in the recovery of the rocket after landing.

### Technical Implementation

The project is written in C++ using the Raspberry Pi Pico SDK. It leverages several hardware-level features of the RP2040:

- **I2C Communication**: Interfaces with the ADXL345 accelerometer to monitor G-forces and detect free-fall conditions.
- **PWM Control**: Drives the SG90 servo motor to actuate the parachute release mechanism.
- **GPIO Interrupts**: Handles real-time events from the accelerometer and the user button for low-latency response.
- **Watchdog Timer**: Ensures system reliability by automatically rebooting the controller if the software encounters a hang.
- **Hardware Alarms**: Utilizes the SDK's timer system to manage the piezo buzzer's beep patterns asynchronously, ensuring the main loop remains responsive.

### Data Logging with Littlefs

A key feature of the James Rocket Controller is its ability to log flight telemetry. The project integrates the Littlefs file system to store data directly onto the Pico's onboard flash memory. The system logs several types of events, including boot sequences (distinguishing between cold boots and watchdog reboots), regular accelerometer readings during flight, and critical events like apogee detection or sensor connection errors.

To ensure data integrity, each log entry includes a checksum byte. After the flight, users can use the provided `logdump` utility to extract the binary data from the flash memory and the `parselog.py` script to convert the logs into a standard CSV format for detailed post-flight analysis.

### Hardware Architecture

The system is designed around a compact and accessible hardware stack:

- **Raspberry Pi Pico**: The central processing unit.
- **ADXL345**: A 3-axis accelerometer used for motion sensing.
- **SG90 Servo**: The actuator for the parachute release mechanism.
- **Adafruit PowerBoost 500 & Li-Pol Battery**: Provides regulated power to the electronics during high-vibration flight phases.
- **Piezo Buzzer & LED**: Provides visual and audible status indicators for pre-flight readiness and post-flight recovery.

This combination of hardware and software provides a robust platform for model rocket enthusiasts to automate recovery and gather valuable flight performance data.
