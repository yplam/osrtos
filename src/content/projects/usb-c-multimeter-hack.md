---
title: USB-C Multimeter Hack
summary: This project details the reverse engineering and firmware development for
  repurposing a YOJOCK/Kowsi USB-C multimeter as a PY32F002A development board. It
  features a custom firmware implementation that provides power sensing, a stopwatch,
  and games, leveraging a bit-banged SPI interface for its 160x180 color display.
slug: usb-c-multimeter-hack
codeUrl: https://github.com/dc336/USB-C-Multimeter-Hack
lastUpdated: '2026-05-11'
image: /202605/USB-C-Multimeter-Hack_0.avif
rtos: ''
topics:
- c
- swd
isShow: true
createdAt: '2026-05-12T01:14:58+00:00'
updatedAt: '2026-05-12T01:14:58+00:00'
---

## Hacking a USB-C Multimeter

This project explores the transformation of a common, low-cost YOJOCK/Kowsi USB-C multimeter into a versatile development board based on the PY32 microcontroller. By reverse engineering the device, it becomes possible to repurpose its built-in USB-C power sensing circuitry, display, and ADC inputs for custom applications, turning a simple tool into a compact platform for embedded experimentation.


The current firmware implementation expands the device's utility far beyond its original scope, adding a variety of functions including a counter with persistent storage, a stopwatch, and even a Flappy Bird game, alongside its primary role as a USB-C power display.

## Hardware Overview

At its core, the board is powered by a PY32F002A microcontroller in a TSOP-20 package. This 32-bit ARM Cortex-M device is equipped with 20 KB of Flash and 3 KB of SRAM. The board also features a 160x180 SPI TFT display capable of RGB565 color, which is central to the user interface. 

![PCB teardown](/202605/USB-C-Multimeter-Hack_1.avif)

The hardware design includes enough I/O to support various interfaces such as ADC, SPI, I2C, and SWD. The compact nature of the device, combined with its existing sensing circuitry, makes it an ideal target for hacking and learning about ARM Cortex-M0 systems.

## Firmware and Development Setup

The firmware is built upon a modified version of the `py32f0-template`, specifically adapted for this hardware. The development environment relies on the ARM GNU Toolchain and `pyOCD` for flashing and debugging the target over the Serial Wire Debug (SWD) interface. 

The build system is managed via a Makefile that allows for modular configuration of the MCU type and toolchain paths. For this specific implementation, the ST7735S display startup sequence was referenced from existing open-source implementations to ensure compatibility with the onboard TFT.

## Display and Performance

One of the technical highlights of the project is the optimization of the display interface. To achieve better performance on the 160x180 SPI TFT, bit-banging was utilized to create a faster SPI interface. This approach, aided by research into the reference manual for GPIO port addresses and offsets, allows for smoother rendering of the multimeter UI and games like Flappy Bird.

## Reverse Engineering the PCB

A significant portion of this project involved documenting the physical hardware. The PCB has been partially reverse-engineered, with most components identified and matched against the JLCPCB/JLC Parts library. 

![Reverse engineered PCB](/202605/USB-C-Multimeter-Hack_2.avif)

While the process is ongoing, the project includes KiCad schematics to assist others in the community who may wish to contribute their expertise to complete the hardware mapping. This effort serves as a bridge for those interested in both the electrical engineering and software aspects of embedded hacking.
