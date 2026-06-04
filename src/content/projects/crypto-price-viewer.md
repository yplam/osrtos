---
title: Crypto Price Viewer
summary: A standalone DIY cryptocurrency price display built around the Seeed Studio
  XIAO ESP32C6 and a 240x320px TFT screen. The project leverages Wi-Fi connectivity
  to fetch real-time market data and provides a captive portal for easy configuration
  via smartphone.
slug: crypto-price-viewer
codeUrl: https://github.com/market-viewer/market-viewer-v1
lastUpdated: '2026-05-26'
licenses:
- Apache-2.0
image: /202606/market-viewer-v1_0.avif
rtos: ''
libraries:
- tft-espi
topics:
- cryptocurrency
- microcontroller
- microelectronics
- tft-display
isShow: true
createdAt: '2026-06-04T00:46:28+00:00'
updatedAt: '2026-06-04T00:46:28+00:00'
relatedProjects:
- tibber-price-e-ink-display
- cyd-ansi-vt100-serial-terminal
- esp32-mfa-authenticator
- esp32-remote-for-victron
- esptimecast
- colibri-wallet
---

The Crypto Price Viewer is a dedicated hardware project designed to provide real-time cryptocurrency market data on a standalone device. Unlike desktop widgets or phone apps, this device operates independently of a computer, housing its components in a custom 3D-printed case with a vibrant color screen.


## Core Features

The device is built to track and display up-to-date cryptocurrency prices using a 240x320px screen. Navigation is handled through physical tactile buttons, allowing users to cycle through different coins. Beyond visual data, the system includes a buzzer for audible alerts and integrated Wi-Fi for internet access. One of the standout features is its ease of setup; users can connect to the device's Access Point (AP) and configure network settings and coin preferences directly from a smartphone.

## Hardware Architecture

The project is powered by the Seeed Studio XIAO ESP32C6, a compact and capable microcontroller. The visual output is handled by a 2-inch TFT Display (ST7789). The physical interface consists of two B3F-4055 tactile switches, while a simple buzzer provides sound feedback. For users in areas with weaker signals, the design supports an optional mini antenna with a uFL connector. The entire assembly is mounted on a 30x70mm perfboard and enclosed in a two-part 3D-printed case secured with screws.

## Setup and Configuration

Upon initial boot, the device enters a configuration mode, presenting a setup screen. Users connect to the device's broadcasted Wi-Fi network to access a captive portal. This interface allows for the selection of local Wi-Fi credentials and the customization of up to three specific cryptocurrencies to be tracked on the display.

![Smartphone configuration interface](/202606/market-viewer-v1_3.avif)

## Operation and Logic

Once configured, the device refreshes the price of the currently displayed coin every 10 minutes. This interval is chosen to prevent hitting API rate limits but can be adjusted in the firmware. 

The control scheme is intuitive:
*   **Left Button Press:** Cycles to the next configured coin.
*   **Left Button Hold:** Forces an immediate price refresh for the current coin.
*   **Right Button Press:** Resets the device.
*   **Right Button Hold:** Re-enters configuration mode for changing Wi-Fi or coin settings.

## Software Design

The firmware is developed in C++ using the Arduino framework. It relies on several key libraries, most notably `TFT_eSPI` for high-performance display rendering, `ArduinoJson` for parsing API responses, and `WiFiManager` for handling the initial configuration portal. 

![Electronic wiring diagram for the ESP32C6 and display](/202606/market-viewer-v1_4.avif)

To ensure proper display performance, the project requires specific configuration of the `User_Setup.h` file within the `TFT_eSPI` library to define the SPI pins (MOSI, SCLK, CS, DC, RST) and the ST7789 driver settings. Due to the size of the firmware and its graphical assets, the Arduino IDE must be configured with a "Huge APP" partition scheme to accommodate the compiled binary.

## Assembly and Integration

Assembly involves soldering the XIAO controller and components onto the perfboard according to a specific wiring map. The display connects via SPI, while the buttons and buzzer occupy standard GPIOs. 

![Side view of the 3D-printed case](/202606/market-viewer-v1_1.avif)

The final physical build involves sliding the completed perfboard into the 3D-printed housing, placing the button caps, and securing the assembly. This modular approach makes it an accessible project for those looking to combine embedded programming with custom hardware design.
