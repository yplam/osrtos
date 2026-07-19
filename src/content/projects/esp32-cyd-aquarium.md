---
title: ESP32 CYD Aquarium
summary: An autonomous virtual aquarium firmware designed for the ESP32-2432S028R
  'Cheap Yellow Display'. It features a stylized dot-grid renderer, simulated aquatic
  life, and automatic backlight adjustment using onboard sensors.
slug: esp32-cyd-aquarium
codeUrl: https://github.com/Lagerpun/esp32-cyd-aquarium
lastUpdated: '2026-06-13'
licenses:
- AGPL-3.0
rtos: freertos
libraries:
- littlefs
- tft-espi
topics:
- cheap-yellow-display
- cheap-yellow-display-esp32-2432s028r
- esp32
- esp32-arduino
- ili9341
- platformio
- platformio-arduino
isShow: true
image: /202607/aquarium.webp
createdAt: '2026-07-10T02:04:57+00:00'
updatedAt: '2026-07-10T02:04:57+00:00'
relatedProjects:
- ascii-aquarium
- denki-kurage
- borneoiot-professional-aquarium-lighting-platform
- esp32-virtual-cat-project
- aquarios-project-aquarius
- tamafi-wifi-powered-virtual-pet
---

The ESP32 CYD Aquarium transforms the popular ESP32-2432S028R development board—affectionately known in the maker community as the "Cheap Yellow Display" (CYD)—into a lively, self-sustaining desk companion. Originally adapted from the Livegrid OpenMatrix project, which targeted large HUB75 LED matrices, this implementation retools the experience for the compact 2.8-inch ILI9341 TFT screen found on the CYD.

### A Retro Aesthetic on Modern Hardware

One of the standout features of this project is its custom dot-grid renderer. Rather than attempting high-resolution photorealism, the software maps a logical 80x106 pixel aquarium frame onto the 240x320 physical display. This creates a charming "small LED matrix" look, mimicking the aesthetic of vintage digital displays while running on modern, affordable hardware. The result is a vibrant scene populated by autonomous creatures, including fish, turtles, snakes, and octopuses, alongside drifting food and animated water.

### Intelligent Automation and Sensors

The firmware is designed to be truly "set and forget." It leverages the onboard hardware of the CYD board to provide a seamless user experience:

*   **Light Sensing:** It utilizes the onboard LDR (light-dependent resistor) connected to GPIO34 to automatically dim the TFT backlight based on ambient room light, making it suitable for bedside tables or offices.
*   **Timekeeping:** The aquarium includes a 12-hour clock with an AM/PM indicator and date overlay. If Wi-Fi is configured, the system automatically syncs with NTP servers. To save power and reduce overhead, the Wi-Fi module disconnects immediately after a successful sync.
*   **Standalone Reliability:** If no Wi-Fi credentials are provided, the project remains fully functional, falling back to the firmware's compile time as a reference point for the clock.
*   **Interactive Elements:** While the aquarium is designed to run autonomously, it includes optional touch-to-feed functionality using the XPT2046 resistive touch controller.

### Technical Foundation

Built using the Arduino framework and managed via PlatformIO, the project is optimized for the ESP32-WROOM-32 class modules. It relies on the high-performance `TFT_eSPI` library for display driving and `LittleFS` for efficient filesystem management. The simulation logic handles "boids" (flocking behavior) and various creature pathfinding to ensure the aquarium feels alive and unpredictable.

Because the CYD hardware is known for having several variants, the project is configured specifically for the common ESP32-2432S028R pinout, handling the specific SPI bus settings and backlight PWM requirements of that board style. 

### Hardware Integration

The default build is tailored for the out-of-the-box CYD experience, meaning no external temperature, humidity, or CO2 sensors are required. It focuses entirely on the visual and interactive capabilities of the integrated screen, touch layer, and light sensor. For developers looking to customize the experience, the project structure allows for easy adjustment of creature logic and scene tuning to fit the specific constraints of the 2.8-inch display.
