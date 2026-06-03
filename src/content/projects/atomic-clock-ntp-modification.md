---
title: Atomic Clock NTP Modification
summary: A hardware modification project that replaces the WWVB radio receiver in
  an atomic clock with an ESP8266 module. It synchronizes time via the Network Time
  Protocol (NTP) and generates a digital signal mimicking the WWVB format to update
  the clock's original controller.
slug: atomic-clock-ntp-modification
codeUrl: https://github.com/jim11662418/Atomic-Clock-NTP-Modification
star: 12
lastUpdated: '2025-09-11'
rtos: ''
topics:
- atomic-clock
- esp8266
- ntp
isShow: true
image: /202601/Atomic_Clock.webp
createdAt: '2026-01-23'
updatedAt: '2026-01-23'
relatedProjects:
- retrofit-electronic-clock-with-raspberry-pi-pico-w
- dcf77-transmitter
- old-train-station-clock-revival
- 7-segment-clock
- elekstube-ips-custom-firmware
- esp32fmradio
---

## Overview

The Atomic Clock NTP Modification project provides a modern solution for 'atomic' clocks that suffer from poor WWVB radio reception. By removing the original amplitude-modulated radio receiver and replacing it with an ESP8266 microcontroller, the clock can synchronize its time via the Network Time Protocol (NTP) over WiFi. 

The project is designed to be transparent to the clock's original controller. The ESP8266 generates a digital time signal that perfectly mimics the WWVB format (Fort Collins, Colorado), leading the clock to believe it is receiving a perfect radio signal. This hack is applicable to many clocks using the older amplitude-modulated time signal format.

## Technical Implementation

The core of the project involves simulating the WWVB time code format. WWVB transmits a digital serial time code at a 1 Hz rate. The ESP8266 replicates this by modulating a digital output pin (TCO) with specific pulse widths:
- **Zero bit**: 200ms pulse
- **One bit**: 500ms pulse
- **Marker bit**: 800ms pulse

The software handles the complex task of converting NTP time into the binary-coded decimal (BCD) format required by the IRIG timecode, including bits for minutes, hours, day of the year, year, leap year status, and Daylight Saving Time (DST) indicators.

## Hardware Evolution

The project has evolved through two distinct versions to optimize for power consumption and integration:

### Version 1: NodeMCU Implementation
Initially, the project used a RobotDyn WiFi NodeMCU ESP8266 module. This version focused on functionality, connecting to the clock's controller via three lines: 
1. **TCO (Time Code Output)**: The digital signal from the ESP8266 to the clock.
2. **PON (Power On)**: A signal from the clock controller indicating it is seeking a time update.
3. **Ground**: Common reference.

### Version 2: Battery-Optimized ESP-01
To allow the clock to run on its original 2x AA batteries, Version 2 utilizes a more power-efficient ESP-01 module. This version implements a sophisticated power management strategy:
- **Deep Sleep**: The ESP8266 remains in deep sleep mode most of the time, consuming only ~60 µA.
- **Wake-on-Demand**: When the clock controller pulls the 'PON' line low (typically once every 24 hours at night), a hardware circuit involving a CD4049 CMOS Hex Inverter generates a reset signal to wake the ESP-01.
- **Rapid Sync**: Upon waking, the module connects to WiFi, fetches NTP time, transmits the simulated WWVB signal for a few minutes, and returns to deep sleep once the 'PON' line is released.

## Software Features

The provided Arduino sketches (`AtomicClock.ino` and `AtomicClock2.ino`) include several robust features for time management:
- **NTP Integration**: Uses the standard ESP8266 core NTP functions with configurable time servers (e.g., time.windows.com, time.nist.gov).
- **DST Logic**: Automatically calculates Daylight Saving Time status for the local timezone.
- **Leap Year Support**: Correctly identifies leap years to ensure the 'day of year' count remains accurate.
- **Visual Feedback**: Flashes an LED to indicate synchronization status and signal transmission.

## Interfacing with the Clock

Most atomic clocks only attempt to sync once a day to save power. The ESP8266 monitors the 'PON' (Power On) pin of the clock's internal PCB. When the clock tries to power its (now removed) radio, the ESP8266 detects this request and begins broadcasting the simulated time signal. This ensures the modification respects the original design's power-saving logic while providing a much more reliable time source than long-wave radio.
