---
title: CH32V003 FM Radio Receiver with RDS
summary: A portable, battery-powered FM radio receiver based on the CH32V003 RISC-V
  microcontroller and the RDA5807MP tuner IC. It features RDS support, an OLED display,
  an integrated audio amplifier, and a built-in Li-Ion charging circuit.
slug: ch32v003-fm-radio-receiver-with-rds
codeUrl: https://github.com/wagiminator/CH32V003-FM-Receiver
siteUrl: https://oshwlab.com/wagiminator/ch32v003-fm-radio-receiver
lastUpdated: '2024-11-24'
licenses:
- NOASSERTION
image: /202604/CH32V003-FM-Receiver_0.avif
rtos: ''
topics:
- ch32v003
- fm
- oled
- radio
- rda5807
- risc-v
- tuner
isShow: true
createdAt: '2026-04-07T23:33:00+00:00'
updatedAt: '2026-04-07T23:33:00+00:00'
---

The CH32V003 FM Radio Receiver is a portable, Li-Ion battery-powered device that allows you to listen to your favorite radio stations with the added benefit of RDS (Radio Data System) functionality. This project is a port of an earlier ATtiny412-based design, now leveraging the cost-effective and capable CH32V003 32-bit RISC-V microcontroller. The receiver is a complete system, integrating a tuner, audio amplifier, display, and power management into a compact, 3D-printed enclosure.


## Hardware Components

### Core Microcontroller
The device is powered by the CH32V003 series, an industrial-grade general-purpose microcontroller utilizing the QingKe RISC-V2A core. Running at 48MHz with 16KB of flash and 2KB of SRAM, it provides ample performance for managing the I2C communication required for the tuner and display, as well as handling user input via buttons.

### Radio and Audio Selectivity
Reception is handled by the RDA5807MP, a single-chip broadcast FM stereo radio tuner. This IC is highly integrated, containing a synthesizer, IF selectivity, and an RDS/RBDS decoder. It communicates with the CH32V003 over I2C, allowing the firmware to control frequency tuning and volume digitally.

![Hardware Schematic for the FM Receiver](/202604/CH32V003-FM-Receiver_1.avif)

For audio output, the project uses the TC8871, a versatile Class AB/Class D selectable power amplifier. It can drive a 3W / 4Ω speaker with minimal peripheral components. The gain of the amplifier is adjustable via specific resistor values, which also determine the cut-off frequency of the integrated high-pass filter.

### Power and Display
The system is designed for portability, using a TP4054 (or MCP73831) constant-current/constant-voltage linear charger for single-cell Li-Ion batteries. Charging is conveniently handled via a USB-C connector. A ME6209A33 3.3V linear voltage regulator ensures a stable power supply for the digital components with extremely low quiescent current. Visual feedback is provided by a standard 128x32 or 128x64 SSD1306 OLED display module.

## Building and Assembly

Constructing the receiver involves soldering components onto a custom PCB. The design emphasizes a slim profile; for instance, the OLED module pins are trimmed so it can be soldered flush against the board. A 40mm speaker is glued into a dedicated cutout on the PCB using hot glue to ensure an airtight seal, which significantly improves sound quality.

![Internal assembly showing speaker and PCB mounting](/202604/CH32V003-FM-Receiver_3.avif)

The enclosure is 3D-printed, with various STL files available to match the specific height of the chosen battery and speaker. To optimize reception, a 75cm flexible wire antenna is used, representing a λ/4 length for the FM band.

## Software and Firmware

### Tuning Control
The RDA5807MP is controlled via I2C through six writable and six readable 16-bit registers. The firmware manages these registers to set the frequency and read back station information. The implementation supports both sequential and indexed I2C access methods, allowing for efficient communication between the MCU and the tuner IC.

### Development and Deployment
The firmware can be compiled and uploaded using several methods. For Linux users, a standard Makefile is provided for use with the RISC-V GCC toolchain and the `rvprog` utility. Alternatively, the project is compatible with PlatformIO using the `platform-ch32v` package. Programming requires a WCH-LinkE device, which utilizes a proprietary single-wire serial debug interface (SDI) to communicate with the CH32V003.

## Operation

Using the radio is simple and intuitive. After powering on the device, the OLED displays the current frequency and battery status. Users can adjust the volume across 16 levels or seek the next available station using the "CH+" button. 

![OLED display showing radio frequency and volume](/202604/CH32V003-FM-Receiver_10.avif)

The device consumes between 100mA and 125mA during operation. With a standard 1200mAh battery, users can expect approximately 10 hours of playtime. When the display indicates that the battery is weak, it can be recharged via any standard USB-C power source.
