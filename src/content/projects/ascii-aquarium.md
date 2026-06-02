---
title: ASCII Aquarium
summary: ASCII Aquarium is a live-rendered fish tank simulation and clock designed
  for the ESP32-2432S028R 'Cheap Yellow Display.' It uses the TFT_eSPI library to
  animate fish, bubbles, and seaweed using ASCII characters, featuring complex schooling
  behaviors and touch-to-feed interactivity. The project supports Wi-Fi time synchronization,
  persistent settings via ESP32 Preferences, and unique hardware expansions like beam
  splitter cubes.
slug: ascii-aquarium
codeUrl: https://github.com/POWER-PILL/ASCII-Aquarium
siteUrl: https://power-pill.github.io/ASCII-Aquarium/
version: v2.20
lastUpdated: '2026-06-01'
image: /202606/ASCII-Aquarium_6.avif
rtos: ''
libraries:
- tft-espi
topics:
- 3d-printing
- arduino
- ascii-art
- ascii-art-generator
- ascii-graphics
- cheap-yellow-display
- cyd
- esp-web-tools
- esp32
- ili9341
- makerworld
- powerpill
- tft-espi
- xpt2046
isShow: true
createdAt: '2026-06-02T10:01:56+00:00'
updatedAt: '2026-06-02T10:01:56+00:00'
---

## Meet the ASCII Aquarium

ASCII Aquarium is a tiny animated fish tank simulation designed specifically for the ESP32-2432S028R, commonly known as the "Cheap Yellow Display" (CYD). Far from being a simple video loop, this project renders a live environment on the ESP32 where fish wander, school, avoid obstacles, and chase food in real-time. It transforms a standard 320x240 touchscreen into a functional piece of desktop art that doubles as a Wi-Fi-synced clock.


### Living Simulation and Features

The aquarium features animated ASCII fish with multiple glyph-based species. These characters exhibit varied colors, depth shading, and smooth wraparound movement. The simulation includes sophisticated behaviors such as schooling and separation, ensuring the fish interact naturally with each other. Beyond the fish, the environment is populated with rising bubbles and swaying seaweed with adjustable length and randomness. Occasional visitors like octopuses and seahorses also drift through the tank, and the fish are programmed to steer around them.

Interactivity is a core component of the experience. Users can tap the screen to drop food flakes, which nearby fish will actively chase. A hidden HUD, accessible by tapping the top-left corner, provides deep control over the simulation, including fish population (from 6 to 36), bubble counts, and background styles ranging from dithered gradients to a randomized "Spongebob style" flower backdrop.

![ASCII Aquarium Settings Interface](/202606/ASCII-Aquarium_5.avif)

### Advanced Functionality and v2.20 Updates

The project includes a robust settings menu with dedicated tabs for the tank, seaweed, clock, and background. The integrated clock can display manual or internet time via NTP, with support for 12/24-hour formats and various timezones. Version 2.20 introduced significant enhancements, including an overhauled background system with smoother dithered gradients, LCD backlight scheduling, and RGB ambient LED control. New timed events now allow for auto-feeding, which is particularly useful for setups where the touchscreen is inaccessible.

![Feeding the Fish](/202606/ASCII-Aquarium_2.avif)

Connectivity is handled through a Wi-Fi panel that includes a network scanner and an on-screen keyboard for entering credentials. Settings are persistent, saved using the ESP32's internal Preferences storage. For those looking to capture their tank's inhabitants, the firmware supports saving BMP screenshots and frame sequences to an SD card.

### Hardware and Optical Enhancements

While the firmware is built for the standard CYD board (featuring an ILI9341 display and XPT2046 resistive touch), it can be paired with specialized hardware for a more immersive effect. One such configuration uses a 50 mm beam splitter cube. By reflecting the CYD's light off an internal 45-degree surface, the fish appear to hover inside the glass cube, creating a miniature optical tide pool effect. This setup requires enabling a "flip clock" setting to ensure the reflection appears correctly to the viewer.

### Technical Implementation

The project is developed as an Arduino sketch, primarily utilizing the `TFT_eSPI` library for high-speed display communication. To build the project from source, developers must configure `TFT_eSPI` with specific setup files tailored for the CYD hardware (`User_Setup_Select_CYD.h`). The firmware manages multiple concurrent systems, including the fish AI, touch input processing, and Wi-Fi stack management, to maintain a fluid simulation on the ESP32 platform.
