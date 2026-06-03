---
title: ESP32 CYD Weather Station with 3-Day Forecast
summary: An internet-connected weather station application for the ESP32 Cheap Yellow
  Display (CYD). It features a 3-day forecast using the OpenWeather API, displaying
  weather icons and data on a 2.8-inch TFT screen. The project utilizes LittleFS for
  asset storage and the TFT_eSPI library for high-performance graphics.
slug: esp32-cyd-weather-station-with-3-day-forecast
codeUrl: https://github.com/AndroidCrypto/ESP32_CYD_Weather_Station_With_Forecast
siteUrl: https://medium.com/@androidcrypto/create-an-internet-weather-station-with-3-days-forecast-on-an-esp32-cheap-yellow-display-cyd-15eb5c353b1d
star: 10
lastUpdated: '2025-08-05'
rtos: freertos
libraries:
- littlefs
- tft-espi
topics:
- arduino
- cheap-yellow-display
- cyd
- esp32
- ili9341
- openweathermap
- openweathermap-api
- spi
- st7789
- tft-display
- weather
- weather-forecast
- weather-station
isShow: true
image: /202601/esp32_cyd_weather_station_01_600h.webp
createdAt: '2026-01-13'
updatedAt: '2026-01-13'
relatedProjects:
- weather-micro-station-for-t-display-s3
- esp8266-esp32-spotify-oled-display
- stm32-weather-station
- wt32-sc01-plus-smart-desk-companion
- erikaos-online-weather-station
- desk-weather-clock-geekmagic-s3
---

The ESP32 Cheap Yellow Display (CYD) has emerged as a versatile platform for rapid prototyping, combining a powerful ESP32 microcontroller with a 2.8-inch color TFT display, touch capabilities, and an SD card reader. This project transforms the CYD into a sophisticated internet-connected weather station, capable of displaying current conditions and a three-day forecast. By pulling data from the OpenWeatherMap API, the station provides real-time meteorological information in a compact, desktop-friendly form factor.

### Hardware and Display Drivers

The "Cheap Yellow Display" is not a single static hardware design but a family of devices. Early versions typically utilized the ILI9341 display driver and the XPT2046 resistive touch controller. Newer iterations have transitioned to the ST7789 driver. This repository addresses this hardware diversity by providing pre-configured setup files for both driver types. These configurations optimize the SPI bus speed—running up to 80MHz for the ST7789—to ensure smooth UI transitions and fast image rendering. The display has a resolution of 320 x 240 pixels, which is utilized in landscape orientation for this dashboard.

### Advanced Graphics and Asset Management

One of the standout features of this weather station is its use of the LittleFS filesystem. Unlike simpler projects that might hardcode bitmaps into header files, this project stores weather icons and font files in the ESP32's flash memory. This approach allows for higher-quality visuals without exhausting the program memory. The `TJpg_Decoder` library is employed to render these icons, which are stored as JPEGs to save space while maintaining visual fidelity.

The user interface is built using the `TFT_eSPI` library, which is widely regarded as one of the fastest graphics libraries for the ESP32. It handles the rendering of the weather dashboard, which includes:
- Current temperature and humidity.
- Atmospheric pressure and wind speed.
- A visual icon representing current conditions (e.g., sunny, cloudy, rainy).
- A dedicated section for the three-day forecast, showing predicted highs and lows.

### Integration with OpenWeather API

The core logic of the station revolves around the OpenWeather library. The ESP32 connects to local WiFi, synchronizes its internal clock using NTP (Network Time Protocol), and then periodically queries the OpenWeatherMap API. The returned JSON payload is parsed using the `JSON_Decoder` library, extracting specific fields for temperature, weather IDs, and timestamps. To handle global time differences and Daylight Savings Time, the `Timezone` library is integrated, ensuring the displayed time is always accurate regardless of the user's location.

### Setup and Customization

For developers looking to deploy this station, the project requires a few specific steps beyond simply uploading the code. The `TFT_eSPI` library must be configured by placing the provided setup headers into the library's internal `User_Setups` directory. This step is crucial because it defines the pin mapping between the ESP32 and the display, which varies between different CYD board revisions. Furthermore, the `data` folder containing the UI assets must be flashed to the device using the ESP32 LittleFS data upload tool.

This project is an excellent demonstration of the ESP32's capabilities as an IoT hub. It successfully integrates wireless networking, filesystem management, and high-speed SPI communication to create a polished, functional end-user device. Whether used as a desktop accessory or a learning tool for ESP32 development, the CYD Weather Station showcases the power of combining affordable hardware with robust open-source libraries.
