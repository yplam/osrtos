---
title: Desk Weather Clock (GeekMagic-S3)
summary: An ESP32-S3 firmware for the GeekMagic-S3 hardware that displays time, date,
  and weather data. It leverages FreeRTOS and LVGL to provide a responsive 240x240
  UI, features a web configuration interface, and supports remote image and text notifications
  via HTTP endpoints.
slug: desk-weather-clock-geekmagic-s3
codeUrl: https://github.com/timschneeb/esp32-weather-clock-cube
lastUpdated: '2025-10-29'
licenses:
- GPL-3.0
rtos: freertos
libraries:
- lvgl
- spiffs
- tft-espi
topics:
- clock
- esp32
- esp32-s3
- freertos
- geekmagic
- geekmagic-s3
- iot
- lvgl
- weather
isShow: true
image: /202604/esp32-weather-clock.webp
createdAt: '2026-04-25T00:38:51+00:00'
updatedAt: '2026-04-25T00:38:51+00:00'
---

The Desk Weather Clock project transforms the GeekMagic-S3, a compact ESP32-S3-based display cube, into a versatile and highly customizable desktop information hub. While the original hardware is often sold as a simple clock accessory, this custom firmware significantly expands its capabilities, turning it into a networked device capable of displaying real-time weather, system notifications, and custom images pushed from other devices on the local network.

## Hardware and Architecture

Built specifically for the GeekMagic-S3 hardware, the project takes full advantage of the ESP32-S3-DevKitM-1 platform, which features 16MB of flash and 8MB of PSRAM. This ample memory is essential for driving the 240x240 TFT display (ST7789) and handling the graphical assets required for a modern user interface. 

Technically, the project is a hybrid application utilizing both the ESP-IDF and Arduino frameworks. It relies on FreeRTOS for managing concurrent tasks, such as background networking, sensor data fetching, and UI rendering. The visual experience is powered by the LVGL (Light and Versatile Graphics Library), which provides smooth animations and a polished look for the time, date, and weather metrics.

## Key Features

One of the standout features of this firmware is its integration with remote devices. It functions as more than just a standalone clock; it acts as a secondary notification display for your workstation or smart home setup. Notable capabilities include:

- **Remote Image Display**: By calling the `/show_image` endpoint, users can push remote images to the cube's display. This is particularly useful for security camera snapshots or status icons.
- **Overlay Notifications**: A simple HTTP GET request to `/show_message` allows for text overlays to appear on the screen for a specified duration, perfect for home automation alerts.
- **Weather Integration**: Using the OpenWeatherMap API, the device displays current temperature, humidity, and daily min/max values.
- **Power Syncing**: The device can synchronize its power state with a computer. By using a keep-alive mechanism, the display stays active as long as the host computer is running and calling the endpoint.

## Web-Based Configuration

To ensure ease of use, the project includes a comprehensive web configuration UI. Users can manage WiFi credentials, MQTT settings, and API keys directly through a browser. If the device is unable to connect to a configured network, it automatically falls back to an Access Point (AP) mode, allowing users to connect directly to the cube to update settings without needing to reflash the firmware.

## Development Workflow

The project adopts a modern embedded development workflow. UI layouts are defined using XML markup files within the `lib/gui` directory. These are then converted into C sources using the LVGL-Editor or its CLI, ensuring that the interface remains modular and easy to iterate upon without manual pixel-pushing in code. 

For developers who want to test changes without hardware, the project supports the Wokwi simulator. This allows for logic verification and UI testing directly in the browser or an IDE extension. Building the project is streamlined via PlatformIO:

```bash
pio run -t uploadfs     # Upload SPIFFS flash image
pio run -t upload       # Upload firmware
```

By combining robust hardware with a flexible software stack, the Desk Weather Clock serves as an excellent example of how to build feature-rich, networked embedded displays using the ESP32-S3 ecosystem.
