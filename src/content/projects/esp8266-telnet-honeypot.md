---
title: ESP8266 Telnet Honeypot
summary: A MicroPython-based honeypot designed for the ESP8266 microcontroller that
  emulates a Telnet server. It features a simulated command-line interface with fake
  system information and logs attacker activity to external services like dweet.io.
slug: esp8266-telnet-honeypot
codeUrl: https://github.com/gbafana25/esp8266_honeypot
star: 318
version: v1.0
lastUpdated: '2020-08-12'
rtos: ''
libraries:
- micropython
topics:
- honeypots
- micropython
- micropython-esp8266
- pentesting
- python3
isShow: true
image: /202512/honeypots.webp
createdAt: '2025-12-28'
updatedAt: '2025-12-28'
---

## Overview

The ESP8266 Honeypot is a security research tool programmed in MicroPython that transforms an ESP8266 microcontroller into a deceptive Telnet server. By emulating a vulnerable or interesting piece of infrastructure, the project aims to attract and monitor unauthorized access attempts. This lightweight implementation is particularly effective for observing automated bots and scripts that scan the internet for open Telnet ports.

## Features and Functionality

Despite the resource constraints of a microcontroller, this honeypot provides a convincing facade for potential attackers. It emulates a standard Telnet protocol interaction without the overhead of encryption, which is ideal for the ESP8266's processing capabilities.

**Key features include:**
- **Fake Terminal Interface:** Provides an all-uppercase command prompt and simulated system responses.
- **Deceptive Content:** Includes fake system details, a mock database, and simulated FDIC warnings to deter or further intrigue intruders.
- **Activity Logging:** Uses the `urequests` library to log the IP addresses of connecting clients to the dweet.io service, allowing for remote monitoring of attack attempts.
- **Session Management:** Automatically handles client connections and reboots the hardware upon disconnection to ensure the honeypot remains fresh and responsive.

## Technical Implementation

The project is built on the MicroPython framework, leveraging its robust networking and hardware control libraries. The core logic resides in `esp8266_honeypot.py`, which manages the socket lifecycle and command parsing.

```python
# Socket initialization and listening
sk = socket(AF_INET, SOCK_STREAM)
sk.setsockopt(SOL_SOCKET, SO_REUSEADDR, 1)
sk.settimeout(60)
sk.bind(('192.168.0.200', 23))
sk.listen(5)
conn, addr = sk.accept()
```

The system uses a `boot.py` file to configure the network environment, including static IP assignment and WiFi credentials. Once a connection is established, the script enters a loop that compares user input against a list of predefined "fake" commands stored in `sys_messages.py`. If an attacker enters a recognized command, the system returns simulated data; otherwise, it displays a list of "valid" commands to encourage further exploration.

## Hardware and Deployment

The project targets the ESP8266 platform, such as the NodeMCU or Wemos D1 Mini. Deployment is handled via `ampy` (Adafruit MicroPython Tool), with provided shell and batch scripts (`install.sh` and `install.bat`) to automate the process of flashing the scripts to the device.

**Deployment Steps:**
1. Configure WiFi and network settings in `boot.py`.
2. Update the `AMPY_PORT` in the installation scripts to match your local environment.
3. Run the installation script to upload `boot.py`, `sys_messages.py`, and the main logic (renamed to `main.py`).
4. Reset the board to begin hosting the honeypot.

By utilizing a low-cost microcontroller, this project demonstrates how embedded systems can be used as effective, low-power security sensors within a network architecture.
