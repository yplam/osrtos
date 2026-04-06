---
title: Tibber Price E-Ink Display
summary: An ESP32-based project designed to fetch and display real-time electricity
  prices from the Tibber API on a Lilygo T5 4.7-inch E-Ink display. It utilizes the
  Arduino framework and focuses on providing an accessible, low-cost hardware solution
  for energy price monitoring.
slug: tibber-price-e-ink-display
codeUrl: https://github.com/thebluntblade/Tibberprice_E-Ink-Display
lastUpdated: '2025-09-26'
rtos: freertos
topics:
- esp32
- lilygo
- tibber
- tibberapi
isShow: true
image: /202604/LILYGO-T5-E-PAPER_1.webp
createdAt: '2026-04-06T00:35:40+00:00'
updatedAt: '2026-04-06T00:35:40+00:00'
---

## Visualizing Energy Costs with E-Ink

Managing energy consumption has become increasingly important, especially with the rise of dynamic electricity pricing. The Tibber Price E-Ink Display project provides a dedicated hardware solution for tracking these fluctuations in real-time. By utilizing the Tibber API, this project allows users to see current and upcoming electricity prices at a glance, helping them make informed decisions about when to run high-energy appliances.

At its core, the project is designed for the Lilygo T5 4.7-inch e-paper display. This specific module is an excellent choice for IoT enthusiasts because it combines a high-contrast Electronic Paper Display (EPD) with an integrated ESP32 microcontroller. The use of e-paper is particularly well-suited for this application; the display remains readable in high light conditions and maintains the image without consuming power, making it an aesthetic addition to a home or office environment.

## Hardware and Architecture

The project is an adaptation of the "Preisrahmen" project originally published by Make Magazine. While the original version used a different hardware configuration, this repository focuses on the Lilygo T5 v2.3. This shift offers several advantages for the builder:

*   **Simplicity**: Because the ESP32 and the EPD are integrated onto a single board, there is no need for complex wiring or custom PCBs.
*   **Cost**: Buying a combined unit is generally more affordable than sourcing high-quality e-paper displays and microcontrollers separately.

However, there are trade-offs to consider. The Lilygo T5 features a 4.7-inch screen, which may be smaller than the display used in the original Make Magazine project. Additionally, because the board is a general-purpose development module rather than a custom-optimized low-power device, it may have higher power consumption, making it less ideal for long-term battery operation without frequent charging.

## Software Implementation

The firmware is built using the Arduino framework on the Espressif 32 platform. It leverages several key libraries to handle data and peripherals:

*   **ArduinoJson**: Used to parse the complex JSON responses from the Tibber API.
*   **SensorLib & Button2**: These manage peripheral interactions, allowing for potential UI navigation or sensor integration.
*   **WiFi & HTTPClient**: Standard ESP32 protocols used to connect to the internet and fetch price data.

One of the unique aspects of this repository is the inclusion of a `zlib` component, as seen in the source structure, which suggests handling compressed data or specific graphics routines required by the E-paper driver.

## Setup and Configuration

Getting the display up and running is straightforward for those familiar with the PlatformIO or Arduino ecosystem. The project includes a template for credentials to ensure sensitive information is kept out of the source code. To get started, users must:

1.  Rename `Credentials-example.h` to `Credentials.h`.
2.  Input their WiFi SSID and Password.
3.  Provide their unique Tibber API token.

Once configured, the ESP32 connects to the Tibber servers, retrieves the pricing data for the user's region, and renders it onto the 4.7-inch E-Ink screen. For those looking to house the project, the repository points toward a 3D-printable case on Thingiverse, completing the transition from a desk-bound prototype to a finished household appliance.
