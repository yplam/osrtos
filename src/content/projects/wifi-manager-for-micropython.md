---
title: WiFi Manager for MicroPython
summary: A web-based WiFi configuration tool for ESP8266 and ESP32 microcontrollers
  running MicroPython. It provides a captive portal interface to scan for networks,
  enter credentials, and persist them to the device's local storage.
slug: wifi-manager-for-micropython
codeUrl: https://github.com/tayfunulu/WiFiManager
star: 406
lastUpdated: '2025-08-08'
rtos: ''
libraries:
- micropython
topics:
- esp32
- esp8266
- espressif
- micropython
- pico
- raspberry-pi-pico
- wifi-configuration
- wifimanager
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- wifimanager-rp2040w-lite
- wifimanager-rp2040w
- esp32-wi-fi-provision-care
- rtkrovermanager
- ayreswifimanager-awm
- rtkbasemanager
---

## Overview

WiFi Manager is a lightweight utility designed for ESP8266 and ESP32 microcontrollers running MicroPython. It simplifies the process of connecting embedded devices to local wireless networks by providing a web-based configuration interface. This eliminates the need to hardcode WiFi credentials into the firmware, making projects more portable and user-friendly.

The project is particularly useful for IoT applications where a device might be deployed in different environments. Instead of re-flashing the device to change network settings, users can interact with a hosted web page to select an SSID and enter a password.

## Key Features

- **Web-Based Connection Management**: Automatically hosts a web server to facilitate network selection when no known networks are available.
- **Persistent Storage**: Saves WiFi credentials in a local `wifi.dat` file in CSV format, allowing the device to reconnect automatically after a reboot.
- **Broad Hardware Support**: Tested and compatible with ESP8266, ESP-12, and ESP32 modules.
- **MicroPython Compatibility**: Designed for MicroPython versions 1.8 through 1.9.3.

## Technical Logic

The WiFi Manager follows a straightforward four-step execution flow to ensure connectivity:

1. **Profile Check**: The system first attempts to read the `wifi.dat` file. If saved credentials exist, it tries to connect to those networks.
2. **Configuration Mode**: If no saved networks are found or connection attempts fail, the device switches to Access Point (AP) mode and starts a web server.
3. **Credential Capture**: Users connect to the device's AP and use the web interface to select a network and provide a password. These details are then saved back to `wifi.dat`.
4. **Application Execution**: Once a connection is established, the manager hands control back to the user's main application code.

## Implementation and Usage

Integrating the WiFi Manager into a MicroPython project involves uploading `wifimgr.py` and a `main.py` script to the ESP module. The manager abstracts the complexity of the `network` and `socket` libraries, providing a simple entry point for network initialization.

### Example Usage

In your `main.py`, you can initialize the connection with just a few lines of code:

```python
import wifimgr

# This call handles the entire connection logic
wlan = wifimgr.get_connection()

if wlan is None:
    print("Could not initialize the network connection.")
    while True:
        pass

# Once connected, the script continues with your application logic
print("ESP connected and ready")
```

## Architecture

The core logic resides in `wifimgr.py`, which utilizes the standard MicroPython `network` module for station and access point management. The web server component is based on work by CPOPP, providing a robust enough implementation to handle HTTP POST requests from modern browsers, including specific handling for Safari on macOS and iOS. 

By storing credentials in a simple semicolon-separated format within `wifi.dat`, the library ensures that network profiles are easy to manage even without complex database overhead, making it ideal for resource-constrained ESP8266 modules.
