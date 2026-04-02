---
title: CH32V003 USB Meter
summary: An open-source USB power meter based on the CH32V003 RISC-V microcontroller
  and INA219 sensor. It monitors voltage, current, and power (up to 100W/20V/5A) and
  displays data on a 0.96-inch OLED screen. The project features a compact design
  with PD 2.0 pass-through support and includes comprehensive hardware, firmware,
  and 3D enclosure files.
slug: ch32v003-usb-meter
codeUrl: https://github.com/ohdarling/CH32V003-USBMeter
lastUpdated: '2024-05-12'
licenses:
- MIT
image: /202604/CH32V003-USBMeter_0.avif
rtos: ''
libraries:
- platformio-platformio-core
topics:
- ch32v003
- ina219
- oled
- powermeter
- usb
- wch
isShow: true
createdAt: '2026-04-02T03:40:12+00:00'
updatedAt: '2026-04-02T03:40:12+00:00'
---

The CH32V003-USBMeter is a complete, open-source solution for monitoring USB power delivery, built around the ultra-affordable WCH CH32V003 RISC-V microcontroller. This project demonstrates how much functionality can be packed into a device using a "7-cent MCU" with just 16KB of Flash and 2KB of RAM, making it a perfect case study for resource-constrained embedded development.

## Hardware Architecture

At the heart of the device is the CH32V003F4U6, which manages data acquisition, user interaction, and display. For sensing, it utilizes the Texas Instruments INA219 high-side current shunt and power monitor. This allows the meter to handle a wide range of USB power profiles, supporting up to 26V and 5A (though typically used within the 20V/5A PD 2.0 limit). 

To ensure the device can operate directly from the USB line it is measuring, it incorporates an LGS5145 DC-DC converter. This component steps down the VBUS voltage—which can vary from 5V to 20V—to a stable 3.3V for the MCU and display. The physical design uses USB Type-C 16P connectors, and the PCB layout is specifically optimized for high-current pass-through. Wide 8mm traces and strategically placed vias are used to minimize heat generation and voltage drop when handling 100W loads.

## Display and User Interface

Data visualization is handled by a standard 0.96-inch SSD1306 OLED display connected via I2C. Despite the limited memory of the CH32V003, the firmware supports several sophisticated features:
- **Real-time Monitoring**: Displays voltage (V), current (A), and power (W).
- **Energy Statistics**: Tracks cumulative energy consumption (mAh/mWh).
- **Power History**: Renders a graphical curve of power usage over time.
- **Interactive Control**: Uses two physical buttons for switching between UI screens and resetting accumulated data.

## Firmware Development

Developing for the CH32V003 requires a lean approach. Because the chip only has 16KB of Flash, the project avoids heavy frameworks like Arduino. Instead, it is built using the `noneos-sdk` within the PlatformIO ecosystem. This bare-metal approach allows for fine-grained control over the hardware and ensures the firmware remains compact.

Key technical challenges addressed in the firmware include:
- **I2C Implementation**: Efficiently driving both the INA219 sensor and the OLED display on the same bus.
- **Flash Emulation**: Using the MCU's internal Flash memory to simulate EEPROM, allowing the device to save cumulative energy data even when power is disconnected.
- **Optimization**: Leveraging PlatformIO's inspection tools to analyze and minimize the binary size to fit within the 16KB limit.

## Getting Started

The project is managed by PlatformIO, providing a streamlined workflow for compilation and flashing. To upload the firmware, a WCH-LinkE programmer is required, connected to the device via the SWDIO and NRST pins.

```bash
# Navigate to the firmware directory
cd firmware

# Compile and upload using PlatformIO
pio run --target upload
```

Beyond the code, the repository is a comprehensive DIY guide. It includes Gerber files for PCB production, a full Bill of Materials (BOM), and STL files for 3D printing a custom enclosure. For those interested in the design process, the project is supported by an extensive series of articles detailing everything from schematic capture in LCEDA to final assembly and debugging.
