---
title: Old Train Station Clock Revival
summary: A MicroPython-based project for the ESP32-C3 that modernizes vintage train
  station clocks using standard A4988 or DRV8825 stepper motor drivers. It features
  automatic time synchronization via WiFi, persistent hand position tracking, and
  an interactive serial console for configuration and manual control.
slug: old-train-station-clock-revival
codeUrl: https://github.com/PiotrTopa/OldTrainStationClock
star: 10
lastUpdated: '2026-01-19'
rtos: ''
libraries:
- micropython
topics:
- a4988
- clock
- esp32
- micropython
- online-time-synchronization
- stepper-motor
- trainstation
isShow: true
image: /202602/clock_prototype_board.webp
createdAt: '2026-02-02'
updatedAt: '2026-02-02'
relatedProjects:
- retrofit-electronic-clock-with-raspberry-pi-pico-w
- diy-weather-clock-firmware
- sanjin-intelligent-mechanical-clock
- elekstube-ips-custom-firmware
- atomic-clock-ntp-modification
- retro-nixie-clock
---

## Reviving Vintage Horology with Modern Electronics

The Old Train Station Clock project is a creative bridge between industrial-era mechanical engineering and modern IoT technology. Many vintage station clocks utilize a simple two-step stepping motor with an escapement mechanism that requires a specific electrical signal to advance: a 24V DC pulse that alternates polarization every minute. Traditionally, this was handled by a master clock system, but this project replaces that bulky infrastructure with a compact ESP32-C3 and a common 3D printer component.

## The Hardware Hack: Stepper Drivers as H-Bridges

The core technical challenge of driving these clocks is the need for alternating polarization. While a custom H-bridge circuit could be built from discrete transistors, this project utilizes a clever shortcut: the A4988 or DRV8825 stepper motor driver. These modules, ubiquitous in the 3D printing community, contain two integrated H-bridges and all necessary safety features like over-current protection and thermal shutdown.

By treating the clock's single coil as one phase of a stepper motor, the driver can be commanded to "step," which naturally alternates the output polarization. This approach simplifies the bill of materials and provides a robust, reliable driving stage for the 24V clock mechanism.

## Intelligent Software with MicroPython

The project is powered by MicroPython running on an ESP32-C3 Mini. This choice allows for rapid development and high-level features that would be more complex in C++, such as easy JSON parsing for configuration and simple HTTP requests for time synchronization.

**Key Software Features include:**
- **Online Synchronization:** The clock connects to WiFi and uses the WorldTimeAPI to synchronize its internal Real-Time Clock (RTC) every hour.
- **Persistent State:** To ensure the clock remains accurate after a power cycle, the current position of the hands is stored in a `configuration.json` file on the internal flash memory.
- **Energy Efficiency:** The stepper driver is only enabled during the actual "tick" (the polarization switch) and is disabled immediately after to prevent unnecessary power consumption and coil heating.

## Interactive Management

One of the standout features of this implementation is the interactive serial console. When connected via USB, users can interact with the clock in real-time. The console provides an ASCII art representation of the current time and allows for various commands:

```
s, status     - Show current clock status with ASCII clock
t HH:MM       - Set displayed time (e.g., t 14:30)
+N            - Physically advance clock by N minutes
sync          - Force RTC synchronization with online service
run           - Start automatic clock mode
```

This interface makes it easy to calibrate the physical hands with the digital logic without needing to reflash the firmware or manually edit files. 

## Technical Implementation Details

The wiring is straightforward, utilizing three GPIO pins from the ESP32-C3: one for the driver's `ENABLE` pin, one for the `STEP` pin, and one for an status LED. The system uses a step-down converter (like the LM2596) to provide 5V to the ESP32 from the 24V rail required by the clock motor. This creates a self-contained unit that only needs a single power source to keep perfect time for years to come.
