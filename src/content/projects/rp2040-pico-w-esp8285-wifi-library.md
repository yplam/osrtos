---
title: RP2040 Pico W ESP8285 WiFi Library
summary: A MicroPython library designed for Raspberry Pi Pico boards equipped with
  an ESP8285 WiFi chip instead of the standard Infineon module. It provides an Arduino-inspired
  API for managing WiFi connections, TCP/SSL client sockets, and data transmission
  via an AT-command interface.
slug: rp2040-pico-w-esp8285-wifi-library
codeUrl: https://github.com/JiriBilek/RP2040_PicoW_ESP8285_Library
star: 15
lastUpdated: '2024-11-19'
rtos: ''
libraries:
- micropython
topics:
- esp8285
- micropython
- micropython-rpi-pico
- pico-w
- rp2040
- wifi
isShow: false
createdAt: '2026-02-26'
updatedAt: '2026-02-26'
---

## Overview

The RP2040 Pico W ESP8285 Library addresses a specific hardware variation in the Raspberry Pi Pico ecosystem. While the official Pico W utilizes an Infineon CYW43439 chip for wireless connectivity, several boards on the market use the ESP8285 instead. Because standard MicroPython and Arduino libraries for the Pico W are hardcoded for the Infineon chip, they are incompatible with these ESP8285-based variants. 

This project provides a functional MicroPython driver and an Arduino-inspired API that allows developers to utilize the WiFi capabilities of these specific boards. It operates by communicating with the ESP8285 over a serial interface using AT commands, effectively treating the ESP8285 as a network coprocessor.

## Technical Architecture

The library is structured into two primary components to maintain a clean separation between the user-facing interface and the hardware communication logic:

- **WiFi.py**: This file implements the high-level API. It was designed to mimic the Arduino WiFi library, making it intuitive for developers transitioning from the Arduino ecosystem to MicroPython.
- **EspAtDrv.py**: This is the underlying driver that handles the low-level serial communication with the ESP8285 chip, parsing AT command responses and managing data buffers.

To function correctly, the ESP8285 chip must be flashed with an AT-interpreter firmware. While official Espressif AT firmware works, the project recommends using the `ESP_ATMod` firmware, which provides enhanced support for modern TLS 1.2 ciphers.

## Key Features

Despite being positioned as a proof-of-concept, the library supports the essential features required for IoT applications:

- **Station Mode**: Join existing WiFi access points using DHCP.
- **Connection Management**: Retrieve RSSI, local IP addresses, gateway information, and subnet masks.
- **TCP & SSL Support**: Establish secure or insecure connections to remote servers.
- **Stream-based Communication**: Send and read data using a buffered client approach similar to the Arduino `Client` class.

## Getting Started

Using the library involves a multi-step setup process because the Pico must first act as a bridge to flash the ESP8285. The repository includes a `Serial_port_transmission.uf2` file that turns the Pico into a USB-to-Serial converter for this purpose. Once the ESP8285 is running AT firmware, the user can flash standard MicroPython to the RP2040 and upload the library files.

### Basic Usage Example

Connecting to a server and making an HTTP request is straightforward using the provided API:

```python
import utime  
import WiFi    

# Initialize and connect
WiFi.init(0)
WiFi.begin("YOUR_SSID", "YOUR_PASSWORD")

if (WiFi.status() == WiFi.WL_CONNECTED):
    cli = WiFi.Client()
    # Connect to a secure server
    if (cli.connectSSL("www.example.com", 443)):
        cli.print("GET / HTTP/1.1\r\nHost: www.example.com\r\n\r\n")
        
        # Wait for data
        t = utime.ticks_ms()
        while (cli.available() == 0 and utime.ticks_ms() - t < 5000):
            utime.sleep(0.01)
            
        # Read response
        while (cli.available()):
            print(cli.readBuf(cli.available()))
    cli.stop()
WiFi.disconnect(False)
```

## Future Development

The project roadmap includes expanding the library's capabilities to include UDP support, Access Point (AP) mode, and more advanced TLS features such as certificate chain validation and fingerprinting. It serves as a vital bridge for developers who find themselves with non-standard Pico W hardware but still require robust networking capabilities in MicroPython.
