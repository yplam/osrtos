---
title: PrintpooP – Retro Pixel Smart Display for Bambu Lab A1
summary: An ESP32-powered smart display for Bambu Lab A1 and A1 Mini 3D printers featuring
  an 8-bit pixel art aesthetic. It monitors real-time print status, temperatures,
  and fan speeds via Wi-Fi and MQTT, while integrating an MPU6050 gyro for motion-synced
  animations.
slug: printpoop-retro-pixel-smart-display-for-bambu-lab-a1
codeUrl: https://github.com/VaAndCob/PrintpooP
siteUrl: https://vaandcob.github.io/webpage/src/index.html
star: 32
version: v1.7.0
lastUpdated: '2026-01-15'
rtos: freertos
libraries:
- lvgl
- tft-espi
topics:
- 3dprint
- 3dprinter
- 8bit
- a1
- a1mini
- arduino
- bambulab
- cyd
- diy
- esp32
- faceplate
- filament
- lvgl
- makerworld
- pixel-art
- printpoop
- retro
- tft
- touch
- touchscreen
isShow: false
createdAt: '2026-01-20'
updatedAt: '2026-01-20'
relatedProjects:
- printsphere
- bbmonitor
- clawdmeter
- bitclock
- advanced-filament-sensor-for-elegoo-carbon-centauri
- p3a-pixel-art-player
---

## Overview

PrintpooP is a custom, ESP32-powered accessory designed specifically for the Bambu Lab A1 and A1 Mini 3D printers. It serves as a functional and aesthetic upgrade, replacing the original hotend faceplate with a 3D-printed enclosure that houses a 2.4" or 2.8" resistive touchscreen. The project focuses on bringing a retro, 8-bit pixel art personality to the 3D printing experience while providing useful real-time telemetry directly at the print head.

## Visuals and User Experience

The project stands out for its charming 8-bit aesthetic. Users can choose between two adorable themes—a Kitten or a Puppy—that accompany the printing journey through various stages. The UI is designed with nostalgic pixel art animations and custom icons, blending retro design with functional UX. 

One of the most unique features is the "swinging" animation. By integrating an optional MPU6050 gyro sensor, the display can trigger animations that follow the physical movement of the print head. When the printer is idle, the display enters a standby animation mode, adding life to the machine even when it isn't active.

## Technical Features and Monitoring

PrintpooP connects to the local network via Wi-Fi and communicates with the Bambu Lab printer using MQTT. It provides a localized status view that makes monitoring more intuitive. The display currently supports four main status pages:

- **Action Page**: Displays the selected theme (Kitten or Puppy) and handles the motion-synced swinging animations.
- **Environment Page**: Monitors hotend and bed temperatures, fan speeds, and overall print progress.
- **Progress Page**: Shows detailed print statistics including time remaining, current layer, and a system clock.
- **AMS Status**: Displays Automatic Material System (AMS) data, including filament types, colors, and the currently active slot.

## Hardware and Software Stack

The project is built on the ESP32 platform, leveraging its Wi-Fi capabilities and processing power to handle both the UI and the network communication. The firmware has evolved from using the TFT_eSPI library to the LovyanGFX library to simplify configuration across different display variants. 

The hardware setup includes:
- **ESP32 Development Board**: The core controller.
- **Resistive Touch Display**: 2.4" or 2.8" (240x320 resolution).
- **MPU6050 Gyro/Accelerometer**: Used for motion detection and animation syncing.
- **Loudspeaker**: A 1W 8-ohm speaker for sound effects.
- **SD Card Support**: Implemented for future custom image replacement.

## Configuration and Setup

Setting up PrintpooP is designed to be accessible, with a web-based flasher available for those who do not wish to compile code manually. Once flashed, the device features an on-screen setup menu for configuring Wi-Fi credentials and printer-specific details. Users must provide the printer's IP address, access code, and serial number—data typically retrieved from the Bambu Studio software or the printer's own interface. The firmware also includes a touch screen calibration routine to ensure accuracy on the resistive panels.
