---
title: Sanjin Intelligent Mechanical Clock
summary: An ESP32-based mechanical clock that uses servos to actuate a physical 7-segment
  display. It features NTP time synchronization, a web-based management portal, voice
  command support via an ASRPRO module, and I2S audio integration.
slug: sanjin-intelligent-mechanical-clock
codeUrl: https://github.com/cteamx/JinTime
siteUrl: https://mp.weixin.qq.com/s/AsMNsmtuo1j1VLAA3zim8A
star: 95
lastUpdated: '2025-10-22'
rtos: freertos
libraries:
- spiffs
topics:
- esp32
isShow: false
createdAt: '2026-01-12'
updatedAt: '2026-01-12'
relatedProjects:
- 7-segment-clock
- shelf-edge-clock
- esp32-weatherstationrtc
- desk-weather-clock-geekmagic-s3
- flatsphere-clock
- elekstube-ips-custom-firmware
---

## Overview

The Sanjin Intelligent Mechanical Clock (三斤智能机械钟) is a creative fusion of traditional mechanical movement and modern IoT technology. Built around the ESP32 microcontroller, this project reimagines the classic 7-segment digital display by using physical servos to move individual segments into place. The result is a clock that doesn't just show the time but performs a mechanical dance every minute.

## Hardware and Mechanical Design

The project utilizes an ESP32 as the central brain, coordinating a complex array of servos. To manage the high number of PWM signals required for a four-digit 7-segment display (28 segments in total), the system employs I2C-based PWM drivers via the Adafruit PWMServoDriver library. The physical structure is designed for 3D printing, with CAD files provided for the acrylic background plate and 3D-printed clock slices.

Beyond the visual display, the clock integrates:
- **ASRPRO Voice Module**: Enables voice-activated commands and wake-up functionality.
- **I2S Audio**: Supports MP3 playback for alarms or notifications using an I2S DAC.
- **Servo Control**: Precise mapping of angles to "open" and "closed" states for each segment to create the 7-segment effect.

## Software Architecture

The firmware is developed using the Arduino framework for ESP32. It leverages several key components to provide a seamless user experience:

- **WiFi & Web Server**: Upon first boot or if connection fails, the device enters Access Point (AP) mode. This allows users to configure WiFi credentials via a captive portal. Once connected, it provides a web-based dashboard for manual control, status monitoring, and even triggering specific animations or audio.
- **NTP Synchronization**: The clock automatically fetches accurate time from global NTP servers (like pool.ntp.org), supporting multiple time zones including Beijing, London, and New York.
- **Smart Segment Logic**: To prevent mechanical interference and reduce wear, the code implements a "safe mode" for transitions. For example, when switching to the number '0', it follows a three-stage sequence to ensure segments don't collide during movement.

## Key Features

- **Dynamic 7-Segment Display**: Physical movement of segments to represent digits 0-9 with a unique mechanical aesthetic.
- **Web Management Interface**: A mobile-friendly portal to control the clock, play audio, and reset configurations.
- **Voice Interaction**: Integration with dedicated ASRPRO hardware for hands-free operation.
- **World Time Support**: Easy switching between different time zones via the web interface.
- **Persistence**: Uses the ESP32's Preferences library to store WiFi and system settings across power cycles.

## Technical Implementation

The core logic resides in the `ServoController` class, which maps the 7-segment bitmask to specific servo channels. The use of SPIFFS allows for potential storage of web assets or configuration files on the internal flash.

```cpp
// 7-segment数码管的段定义 (0, 1, 2, 3, 4, 5, 6)
// 数字0-9的7段显示模式 (1=显示段, 0=不显示段)
bool digitPatterns[10][7] = {
  { 1, 1, 1, 1, 1, 1, 0 },  // 0: 012345
  { 0, 1, 1, 0, 0, 0, 0 },  // 1: 12
  { 1, 1, 0, 1, 1, 0, 1 },  // 2: 01346
  { 1, 1, 1, 1, 0, 0, 1 },  // 3: 01236
  { 0, 1, 1, 0, 0, 1, 1 },  // 4: 1256
  { 1, 0, 1, 1, 0, 1, 1 },  // 5: 02356
  { 1, 0, 1, 1, 1, 1, 1 },  // 6: 023456
  { 1, 1, 1, 0, 0, 0, 0 },  // 7: 012
  { 1, 1, 1, 1, 1, 1, 1 },  // 8: 0123456
  { 1, 1, 1, 1, 0, 1, 1 }   // 9: 012356
};
```

This project is an excellent example of how ESP32 can be used to create interactive, "kinetic" art pieces that are both functional and technically sophisticated, combining mechanical engineering with modern firmware development.
