---
title: 'retroJam: Multi-Retro Game Console Emulator'
summary: A multi-system retro console emulator designed for the Raspberry Pi RP2350-based
  Adafruit Fruit Jam. It supports emulation for NES, GameBoy, Game Gear, Master System,
  and Sega Genesis, utilizing PSRAM and HSTX for high-performance video and audio
  output.
slug: retrojam-multi-retro-game-console-emulator
codeUrl: https://github.com/fhoedemakers/retroJam
star: 13
version: v0.4
lastUpdated: '2026-01-25'
rtos: ''
topics:
- adafruit
- adafruit-fruitjam
- game-boy
- game-boy-color
- nes
- nintendo-nes
- rp2350
- sega-game-gear
- sega-genesis
- sega-master-system
isShow: true
image: /202603/retrojam.webp
createdAt: '2026-03-23'
updatedAt: '2026-03-23'
---

## Overview

retroJam is a high-performance multi-console emulator framework specifically optimized for the Raspberry Pi RP2350 microcontroller. While primarily designed for the **Adafruit Fruit Jam** handheld, its architecture leverages the advanced features of the RP2350—such as PSRAM and the High-Speed Transmission (HSTX) peripheral—to deliver smooth emulation of classic 8-bit and 16-bit systems. 

The project provides a unified interface for navigating ROMs on a FAT32-formatted SD card, managing save states, and even playing high-quality WAV music files directly from the menu. It serves as a robust demonstration of the RP2350's capabilities in handling complex emulation tasks that were previously challenging on standard microcontrollers.

## Supported Systems and Emulation Cores

retroJam integrates several optimized emulation cores to support a wide variety of retro hardware:

- **Nintendo Entertainment System (NES):** Powered by the `infones` core, featuring save state support for common mappers (0, 1, 2, 3, and 4).
- **Nintendo GameBoy & GameBoy Color:** Utilizes the `peanut_gb` core for efficient 8-bit handheld emulation.
- **Sega Master System & Game Gear:** Supported via the `smscore`, including save state functionality.
- **Sega Genesis / Mega Drive:** Leverages the `gwenesis` core to bring 16-bit gaming to the RP2350, utilizing PSRAM for the larger memory requirements of Genesis titles.

## Hardware and Peripheral Support

The project is deeply integrated with the Adafruit Fruit Jam hardware but supports various custom configurations. Key hardware features include:

- **Video Output:** Support for DVI output via HSTX or standard PIO-based DVI, allowing for crisp digital video on modern displays.
- **Audio:** High-quality audio output via I2S DACs (like the TLV320DAC3100 or PCM5000A). On the Fruit Jam, it includes unique features like a NeoPixel-based VU meter that syncs with game audio.
- **Storage:** SD card support via SPI or SDIO for ROM storage and metadata.
- **Input Versatility:** Through the use of `Pico-PIO-USB` and `tinyusb`, the project supports a vast array of controllers, including USB DualShock 4, DualSense, XInput (Xbox), and classic NES USB gamepads. It also supports Wii Classic controllers via the I2C-based STEMMA QT connector.

## Technical Implementation

Built on the **Raspberry Pi Pico SDK**, retroJam makes extensive use of the RP2350's dual-core architecture. Typically, one core handles the emulation logic while the second core manages video signal generation and system overhead. The project requires **PSRAM** to function, particularly for Sega Genesis emulation and high-resolution display buffers.

The build system is managed via CMake, with specific hardware configurations (HW_CONFIG) defined to toggle pin mappings and peripheral settings for different boards. This allows the same codebase to target the Fruit Jam, the Murmulator M2, or custom breadboard setups using the Adafruit Feather RP2350 with HSTX.

## User Experience and Metadata

Beyond simple emulation, retroJam focuses on a polished user experience. The menu system supports metadata packs that display box art, publisher information, and release years for selected games. Users can also customize their experience through an in-game settings menu, which allows for real-time adjustments to screen modes, scanline filters, and frame rate displays. For NES and Sega 8-bit systems, the framework includes a robust save state manager with five available slots and auto-save/load capabilities.
