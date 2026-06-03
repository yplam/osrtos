---
title: Weather LED Map with MicroPython on ESP32C3
summary: An IoT weather visualization project developed for the HackConRD 2025 badge
  using an ESP32C3 microcontroller and MicroPython. The system fetches real-time meteorological
  data from the OpenWeatherMap API to drive a 31-LED matrix representing the provinces
  of the Dominican Republic, mapping temperature and rain conditions to specific LED
  colors.
slug: weather-led-map-with-micropython-on-esp32c3
codeUrl: https://github.com/jrgdiaz/Weather-Micropython-HackConRD2025
siteUrl: https://verpent.co/posts/esp32c3-iot-dev-getting-started
star: 18
lastUpdated: '2025-04-12'
rtos: ''
libraries:
- micropython
topics:
- challenges
- ctf
- embedded
- hacking
- iot
- iot-security
- micropython
- reverse-engineering
- weather-api
- wled
isShow: false
createdAt: '2026-01-23'
updatedAt: '2026-01-23'
relatedProjects:
- esptimecast
- weather-micro-station-for-t-display-s3
- esp8266-esp32-spotify-oled-display
- esp32-32x32-rgb-matrix-controller
- esp32-offline-osm-maps
- erikaos-online-weather-station
---

The HackConRD 2025 badge is more than just a piece of conference hardware; it is a functional IoT device designed to visualize the weather across the Dominican Republic. Built around the powerful and cost-effective ESP32C3 microcontroller, this project leverages MicroPython to create an interactive meteorological map using a matrix of 31 addressable RGB LEDs.

## Hardware and Platform

The heart of the project is the ESP32C3, a RISC-V based SoC with integrated Wi-Fi and Bluetooth. The hardware design, featuring a PCB shaped like the Dominican Republic, includes 31 LEDs, each corresponding to a specific province. Due to a known hardware quirk in some ESP32C3 "Super Mini" style boards, the firmware specifically manages transmission power (`wlan.config(txpower=8)`) to ensure stable Wi-Fi connectivity.

## Software Architecture

The project is implemented in MicroPython, taking advantage of its rapid prototyping capabilities and robust library support. The application logic is split into several key components:

- **Connectivity**: A robust Wi-Fi connection handler that manages network authentication and handles internal stack errors.
- **Data Acquisition**: Using the `urequests` library, the device polls the OpenWeatherMap API for current weather conditions in 31 different locations.
- **Asynchronous Processing**: The `asyncio` library is used to handle the update loop, ensuring the device remains responsive while waiting for network I/O.
- **Visual Mapping**: A specialized function translates temperature and precipitation data into specific colors on the NeoPixel matrix.

## Weather Visualization Logic

To provide an intuitive overview of the country's climate, the badge uses a color-coded system to represent different meteorological conditions:

- **Blue**: Indicates significant precipitation (rain chance > 50%).
- **Red**: Represents high temperatures (above 30°C).
- **Yellow**: Signifies clear, sunny weather with moderate temperatures (25°C to 30°C).
- **Green**: Represents cool and dry conditions.

The brightness is carefully managed (set to approximately 5%) to ensure the LEDs are visible without being overwhelming, which is crucial for a wearable badge.

## Development and Deployment

Developers can interact with the badge using `rshell`, a remote shell for MicroPython. The deployment process involves flashing the MicroPython firmware and then uploading `main.py` to the device's internal filesystem. The project also serves as a platform for a Capture The Flag (CTF) challenge at HackConRD 2025, encouraging participants to perform reverse engineering on the IoT device.

## Getting Started

To implement this project, users need an OpenWeatherMap API key and a Wi-Fi connection. The code is designed to be easily extensible, allowing for the addition of more provinces or different data sources. The use of `asyncio` allows the weather data to refresh every two hours without blocking the main execution thread, making it a perfect example of an efficient, event-driven embedded application.

```python
def weather_to_color(temperature, precipitation_chance):
    BRIGHTNESS = 0.05
    precipitation_chance = min(precipitation_chance, 100)
    
    if precipitation_chance > 50:
        return (0, 0, int((precipitation_chance / 100) * 255 * BRIGHTNESS))
    elif temperature > 30:
        return (int(min((temperature / 50) * 255, 255) * BRIGHTNESS), 0, 0)
    elif 25 <= temperature <= 30 and precipitation_chance <= 20:
        return (int(255 * BRIGHTNESS), int(255 * BRIGHTNESS), 0)
    else:
        return (0, int(max((1 - (temperature / 30)) * 255, 0) * BRIGHTNESS), 0)
```
