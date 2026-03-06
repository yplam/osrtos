---
title: Google Phishing with ESP8266
summary: An Arduino-based phishing tool for the ESP8266 that hosts a fake Google login
  page via a captive portal. It captures user credentials, stores them in the device's
  onboard memory (EEPROM), and provides a web interface for the attacker to retrieve
  or clear the data.
slug: google-phishing-with-esp8266
codeUrl: https://github.com/Wraient/Google-Phishing-with-ESP8266
star: 17
lastUpdated: '2024-07-28'
rtos: ''
libraries:
- spiffs
topics:
- esp8266
- gmail
- google
- phishing
isShow: false
createdAt: '2026-03-06'
updatedAt: '2026-03-06'
---

## Overview

The Google Phishing with ESP8266 project is a specialized firmware designed to demonstrate captive portal vulnerabilities using the popular ESP8266 microcontroller. By leveraging the device's ability to act as a standalone Wi-Fi Access Point, the project creates a rogue network that intercepts user traffic and presents a convincing replica of a Google Gmail login page. This project serves as a practical example of how low-cost embedded hardware can be used to perform social engineering attacks in a local environment.

## Captive Portal Mechanism

The core of the project relies on a "Captive Portal" technique common in public Wi-Fi networks. When a client device, such as a smartphone or laptop, connects to the ESP8266's Wi-Fi network, the onboard DNS server is configured to respond to all DNS queries with the ESP8266's own local IP address (172.0.0.1). 

This behavior triggers the operating system's network probe—such as Android's connectivity check or Windows' connection test—forcing the browser to open a login page automatically. Instead of a legitimate login, the user is presented with a phishing page designed to harvest Gmail credentials.

## Technical Implementation

The project is written in C++ using the Arduino framework for ESP8266. It utilizes several key libraries to manage its networking and storage functions:

- **ESP8266WiFi**: Sets the hardware into Access Point (AP) mode, allowing it to broadcast a custom SSID.
- **DNSServer**: Intercepts DNS requests to redirect users to the phishing landing page regardless of the URL they attempt to visit.
- **ESP8266WebServer**: Serves the static HTML content and handles HTTP POST requests containing the captured credentials.
- **SPIFFS (Serial Peripheral Interface Flash File System)**: Used to store the `index.html` and associated assets (CSS/JS) on the ESP8266's internal flash memory.
- **EEPROM**: Provides persistent storage for the captured usernames and passwords, ensuring data is retained even if the device loses power or is restarted.

## Data Management

The firmware includes specific endpoints for the operator to manage captured data. By navigating to the `/getinfo` path, the operator can view a list of all credentials stored in the EEPROM. Conversely, the `/deleteinfo` endpoint allows the operator to wipe the stored data and restart the device. Captured data is formatted as `username:password` for easy retrieval.

## Getting Started

To deploy this project, users need an ESP8266 module, such as a NodeMCU or Wemos D1 Mini. The software setup requires the Arduino IDE (specifically version 1.8.x to maintain compatibility with the SPIFFS upload tool) and the ESP8266 board core. 

### Basic Setup Steps:
1. **Configure SSID**: Open the `.ino` file and set your preferred network name.
2. **Upload Data**: Use the ESP8266 SPIFFS tool to upload the `data/` folder containing the phishing HTML.
3. **Flash Firmware**: Upload the sketch to the ESP8266.
4. **Retrieve Data**: Connect to the network and navigate to the `/getinfo` endpoint to see collected credentials.

*Note: This project is intended strictly for educational purposes and security awareness training.*
