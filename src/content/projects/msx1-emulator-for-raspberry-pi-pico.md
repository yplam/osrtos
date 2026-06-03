---
title: MSX1 Emulator for Raspberry Pi Pico
summary: A high-performance MSX1 emulator designed for the Raspberry Pi Pico (RP2040)
  microcontroller. It supports VDP, PSG, SCC, and FM sound emulation, providing VGA
  video output and USB keyboard/gamepad input for a complete retro computing experience
  on embedded hardware.
slug: msx1-emulator-for-raspberry-pi-pico
codeUrl: https://github.com/shippoiincho/msxemulator
star: 34
lastUpdated: '2025-04-08'
rtos: ''
libraries:
- littlefs
topics:
- raspberry-pi-pico
- retrocomputing
isShow: false
createdAt: '2026-01-28'
updatedAt: '2026-01-28'
relatedProjects:
- pc-6001mkii-emulator-for-raspberry-pi-pico
- pico-smsplus-sega-master-system-and-game-gear-emulator
- picopeanutgb-game-boy-emulator-for-rp2350
- retrojam-multi-retro-game-console-emulator
- usbsid-pico
- esp32-s3-nes-emulator
---

## Overview

The MSX1 Emulator for Raspberry Pi Pico is a specialized project that brings the classic MSX1 home computer architecture to the RP2040 microcontroller. By leveraging the dual-core capabilities and PIO of the Raspberry Pi Pico, this emulator provides a functional MSX environment capable of running ROM cartridges, tape images, and floppy disk files. It is designed for enthusiasts who want to build a compact, dedicated MSX hardware clone using modern, affordable components.

## Technical Implementation and Hardware

The emulator is built using the Raspberry Pi Pico SDK and targets the RP2040's unique architecture. One of the most impressive technical feats of this project is its VGA output implementation. To conserve the limited RAM of the RP2040, the emulator does not use a traditional frame buffer. Instead, it generates the video signal line-by-line in real-time using the CPU. This approach allows the system to support the TMS9918 VDP (Video Display Processor) requirements while leaving enough memory for the MSX system RAM and sound buffers.

**Key Hardware Features:**
- **Video Output:** VGA output via a resistor ladder (supporting Red, Green, and Blue signals) with H-SYNC and V-SYNC.
- **Audio:** Support for standard PWM output (GPIO 10) or high-quality I2S DAC output (tested with PCM5102A) for advanced sound chips.
- **Input:** USB Keyboard support via OTG and DirectInput gamepads.
- **Storage:** Integration with LittleFS for managing ROM, Tape, and Disk images on the Pico's internal flash.

## Emulated Components

The project emulates a wide array of MSX hardware components to ensure compatibility with a broad library of software:
- **CPU:** Z80 emulation.
- **Memory:** 128KB MapperRAM.
- **Video:** VDP (16KB/NTSC) via the `vrEmuTms9918` library.
- **Sound:** Standard PSG (Programmable Sound Generator) and support for Konami SCC and FM-PAC (MSX-MUSIC/OPLL) when using an I2S DAC.
- **Storage Interfaces:** Support for CAS (Tape) and DSK (Floppy Disk, Sony-type MB8877/WD2793) formats.

## Getting Started

To use the emulator, users must provide their own MSX system ROMs due to copyright restrictions. The project is compatible with C-BIOS for those who wish to run ROM cartridges without original system firmware. Firmware and ROM images are flashed to specific offsets on the Pico using `picotool`. 

Once running, the emulator provides an on-screen menu (accessible via F12) that allows users to load ROM files or manage tape and disk images stored in the LittleFS partition. The system also supports USB OTG, allowing a standard USB keyboard to be connected directly to the Pico to act as the MSX keyboard, with specific mappings for MSX-specific keys like STOP, SELECT, and GRAPH.

## Performance and Limitations

While the emulator is highly capable, it pushes the RP2040 to its limits. Enabling FM sound (OPLL) requires significant overclocking, which can impact system stability. Additionally, because the VGA signal is generated in real-time by the CPU, screen updates may briefly pause during flash write operations (such as saving data to LittleFS). The floppy disk emulation is currently read-only, supporting 720KB 2DD disk images.
