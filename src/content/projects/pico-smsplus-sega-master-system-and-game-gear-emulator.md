---
title: 'pico-smsplus: Sega Master System and Game Gear Emulator'
summary: A high-performance Sega Master System and Game Gear emulator for RP2040 and
  RP2350 microcontrollers. It features HDMI video and audio output, SD card support
  for ROMs and save games, and extensive compatibility with USB and legacy game controllers.
slug: pico-smsplus-sega-master-system-and-game-gear-emulator
codeUrl: https://github.com/fhoedemakers/pico-smsplus
star: 39
version: v0.24
lastUpdated: '2026-01-29'
rtos: ''
topics:
- adafruit
- adafruit-feather-dvi
- emulator
- game-gear
- master-system
- pimoroni-pico-dv
- raspberry-pi-pico
- rp2040
- sega
- sega-game-gear
- sega-master-system
- waveshare
- waveshare-rp2040-pizero
isShow: true
image: /202603/pico-smsplus.webp
createdAt: '2026-03-23'
updatedAt: '2026-03-23'
---

## Overview

pico-smsplus is a specialized port of the SmsPlus emulator, optimized specifically for the Raspberry Pi Pico (RP2040) and the newer Raspberry Pi Pico 2 (RP2350). This project transforms these affordable microcontrollers into capable retro gaming consoles, delivering Sega Master System and Game Gear emulation with modern conveniences like HDMI output and SD card storage.

While the emulator runs on the original RP2040, it truly shines on the RP2350. The increased performance of the Pico 2 allows for full-speed emulation across the entire library, including demanding titles that might struggle on the original hardware. Furthermore, the RP2350 version leverages the hardware's HSTX (High-Speed Serial Transmit) capabilities for efficient video output and supports advanced features like themed borders and bezels.

## Key Features and Capabilities

The project is designed to provide a complete console experience, moving beyond simple emulation to include a full menu system and peripheral support.

**Core features include:**
- **HDMI Output:** Video and audio are transmitted over HDMI, utilizing the PicoDVI library for RP2040 and HSTX for RP2350.
- **Storage & ROM Management:** Supports FAT32 and exFAT formatted SD cards. Users can organize ROMs in directories and navigate them via an on-screen menu.
- **Save Game Support:** For Master System games that originally featured battery-backed RAM, progress is automatically saved to the SD card in the `/SAVES` directory.
- **Metadata and Box Art:** The emulator can display box art and game information in the menu, and even show themed bezels around the game screen on RP2350-based boards.
- **Audio Recording:** On RP2350 boards with PSRAM, users can record up to 30 seconds of in-game audio directly to the SD card as a WAV file.

## Hardware Support

pico-smsplus supports a wide variety of development boards and custom hardware configurations:
- **Raspberry Pi Pico / Pico 2:** Standard boards used with the Pimoroni Pico DV Demo Base or custom PCBs.
- **Specialized Boards:** Native support for the Adafruit Feather RP2040 with DVI, Waveshare RP2040-PiZero, Adafruit Fruit Jam, and the Metro RP2350.
- **PSRAM Utilization:** On boards equipped with PSRAM (like the Pimoroni Pico Plus 2), the emulator can load ROMs into RAM instead of running them from flash, improving performance and flexibility.

## Controller Compatibility

One of the project's strengths is its flexible input handling. It supports two-player games using a combination of USB and legacy controllers:
- **USB Controllers:** Supports XInput (Xbox), Sony DualShock 4, DualSense, and various Retro-bit USB pads via the TinyUSB stack.
- **Legacy Controllers:** Original NES and Wii Classic controllers can be wired directly to the GPIO pins.
- **Keyboard Support:** Standard USB keyboards can be used for both menu navigation and gameplay.

## Technical Implementation

The project is built using the Raspberry Pi Pico SDK and utilizes a multicore architecture. One core typically handles the emulation logic and audio generation, while the second core manages the DVI/HDMI bitstream generation. This separation is critical for maintaining stable video timing while the CPU is under heavy load from the Z80 and VDP emulation.

For video, the project uses the PicoDVI library on the RP2040 to generate a DVI signal over GPIO pins using PIO (Programmable I/O). On the RP2350, it takes advantage of the HSTX peripheral, which is significantly more efficient for high-speed digital video output. Audio is handled either through the HDMI stream or via external I2S DACs, depending on the hardware configuration.
