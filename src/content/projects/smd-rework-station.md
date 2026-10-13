---
title: SMD Rework Station
summary: An Arduino-based hot air rework station firmware featuring PID heater control,
  PWM fan regulation, and MAX6675 thermocouple sensing. The system integrates a 16x2
  I2C display, EEPROM persistence, and safety cooldown routines alongside a serial
  interface for companion web and desktop software.
slug: smd-rework-station
codeUrl: https://github.com/Frazix12/SMD-Rework-Station
siteUrl: https://smd-station.vercel.app/
version: app-v0.2.2
lastUpdated: '2026-07-13'
image: /202610/SMD-Rework-Station_0.avif
rtos: ''
topics:
- arduino
- hot-air-rework
- smd
- soldering
- tauri
isShow: true
createdAt: '2026-10-13T10:50:18+00:00'
updatedAt: '2026-10-13T10:50:18+00:00'
---

An Arduino-powered hot air rework station designed for reliable soldering and desoldering tasks, combining precise thermal regulation with user-friendly control interfaces.

## Features

The controller handles critical heating and airflow management tasks in real time:

* **PID Heater Regulation**: Controls the heating element via SSR switching to maintain target temperatures.
* **PWM Airflow Control**: Adjusts fan speed against a calibrated airflow lookup curve.
* **MAX6675 Thermocouple Interface**: Delivers direct digital temperature feedback from the hot air nozzle.
* **Local Display & Interface**: Employs a 16×2 I2C LCD featuring large temperature characters alongside a 3-button physical navigation system.
* **Safety & Cooldown**: Automated sleep mode initiates active fan cooling down to safe temperatures when the handle is docked.
* **EEPROM Storage**: Retains configuration, calibration values, and PID parameters across power cycles.
* **Companion Telemetry**: Serial Protocol v2 enables real-time interaction with dedicated desktop and web interfaces.

## Hardware Configuration

The firmware assigns microcontroller I/O for sensor reading, driving power elements, and processing input switches:

* **MAX6675 SPI Interface**: `D12` (SO), `D10` (CS), and `D13` (SCK)
* **Actuators & Outputs**: `D9` (Heater SSR via PID), `D3` (Fan PWM), `D2` (Buzzer)
* **User Inputs & Sensors**: `D4` (Active-low Sleep switch), `D5` (Up button), `D6` (OK button), `D7` (Down button)
* **Display Bus**: `A4` (SDA) and `A5` (SCL) for I2C LCD communication

![Circuit schematic](/202610/SMD-Rework-Station_4.avif)

Physical navigation is straightforward:
* **UP / DOWN**: Increments or decrements setpoint temperature and fan duty cycle.
* **OK**: Toggles the active target between temperature and fan adjustments.
* **Hold UP + DOWN (~2s)**: Enters sensor and airflow calibration mode.
* **Sleep Switch (Active LOW)**: Disengages heating immediately and forces fan operation for thermal protection until cool.

## Calibration and Companion Apps

Fine-tuning thermal performance and airflow linearisation is managed through serial communication. The companion application provides visual tuning for PID gains, minimum fan thresholds, and sensor offsets.


Airflow adjustments are matched against specific setpoints across 30%, 60%, and 90% fan duty levels between 100 °C and 500 °C in 50 °C increments. The companion tools execute `CALROW` serial commands to streamline live tuning without requiring constant reflashing.

![PID Tuning tab — Kp, Ki, Kd and loop rate](/202610/SMD-Rework-Station_1.avif)

## Operating Specifications

* **Temperature Operating Window**: 100 °C to 500 °C
* **Fan Speed Range**: 10% to 100% (default minimum floor set to 30%)
* **Telemetry Stream**: 4 Hz continuous status updates over serial
