---
title: ESP32 MPY-Jama
summary: ESP32 MPY-Jama is a cross-platform desktop IDE and management tool designed
  for Espressif ESP32 microcontrollers running MicroPython. It provides a graphical
  interface for file management, real-time system monitoring, network configuration,
  and firmware flashing. The project simplifies IoT development by offering built-in
  'Jama Funcs' for rapid testing of peripherals like sensors, LEDs, and displays.
codeUrl: https://github.com/jczic/ESP32-MPY-Jama
isShow: true
image: /202512/screen-system.webp
rtos: ''
libraries:
- micropython
topics:
- app
- boot
- esp32
- esptool
- ethernet
- firmware
- flash
- ide
- linux
- mac
- macos
- micropython
- mip
- pypi
- python
- repl
- sdcard
- serial
- wifi
- windows
star: 477
version: v1.2.0
lastUpdated: '2023-05-03'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
---

Developing for the ESP32 using MicroPython often involves juggling multiple command-line tools for flashing, file transfers, and terminal access. **ESP32 MPY-Jama** aims to consolidate this workflow into a single, powerful, and lightweight cross-platform application. Designed by Jean-Christophe Bos, this tool provides a comprehensive graphical interface for managing your IoT projects on MacOS, Windows, and Linux.

## A Complete Development Environment

At its core, ESP32 MPY-Jama is more than just a code editor. It is a full-featured management suite that includes:

- **Integrated IDE**: A lightweight editor for writing MicroPython programs directly on the device, featuring common keyboard shortcuts (save, undo, search) and a command history terminal.
- **File Manager**: A browser for the device's flash memory and SD card, allowing for native file transfers and management.
- **Real-Time Dashboards**: Visual interfaces to monitor system health, including MCU frequency, memory allocation, and internal temperature.
- **Network Control**: A dedicated dashboard to configure Wi-Fi (Station and Access Point modes), Ethernet PHY interfaces, and even BLE states in just a few clicks.

## Rapid Prototyping with Jama Funcs

One of the most unique features of this project is the **Jama Funcs** system. These are small, dedicated MicroPython functions that run on the ESP32 to perform specific tasks. They allow developers to quickly test external components without writing boilerplate code from scratch. 

Included Jama Funcs cover a wide range of hardware interactions:
- **Sensors & I/O**: 1-Wire device scanning, ADC/DAC readers, and GPIO input/output testing.
- **Communication**: I2C slave scanning, UART testing, and Wi-Fi/BLE scanning.
- **Peripherals**: Support for NeoPixel and DotStar RGB strips, KT403A MP3 players, and PWM-driven servo motors.
- **System Tools**: NTP time synchronization, memory stress tests, and thread capacity checks.

Developers can also create their own Jama Funcs using a provided template, making the tool highly extensible for custom hardware setups.

## Hardware Management and Firmware Updates

ESP32 MPY-Jama simplifies the lower-level aspects of ESP32 development. It integrates **Espressif's esptool**, allowing users to put the device into bootloader mode to erase flash or load new binary images directly from the GUI. It also provides interactive pinout diagrams for popular ESP32 boards, helping developers verify their wiring without constantly referring to external datasheets.

## Getting Started

The application is built using Python and relies on `pywebview` for the interface and `pyserial` for communication. 

### Installation for Linux
For Linux users (tested on Ubuntu 22.04), the setup involves cloning the repository and installing several system dependencies for the GUI backend:

```bash
# Install system requirements
sudo apt install libcairo2-dev libgirepository1.0-dev python3-pyqt5 python3-pyqt5.qtwebengine python3-pyqt5.qtwebchannel libqt5webkit5-dev gir1.2-webkit2-4.0

# Initialize environment
cd ESP32-MPY-Jama
python3 -m venv venv
. venv/bin/activate
pip3 install pyserial pywebview[qt] pycairo PyGObject pyinstaller
```

Once installed, the application can be launched simply by running:

```bash
python3 src/app.py
```

For Windows and MacOS users, the project provides pre-built binaries available in the GitHub releases section, ensuring a smooth setup process regardless of the operating system. Whether you are a hobbyist testing a new sensor or a professional developer managing a fleet of ESP32 devices, ESP32 MPY-Jama offers a streamlined, visual approach to MicroPython development.
