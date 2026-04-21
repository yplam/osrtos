---
title: Magic 8 Ball Toy
summary: This project implements an interactive digital Magic 8 Ball using a Raspberry
  Pi Pico 2 and a 1.28-inch round LCD. It utilizes an MPU-9250 accelerometer to detect
  orientation and shaking gestures, emulating the floating dice behavior of the original
  toy. The firmware leverages both processor cores to manage sensor data and real-time
  graphics visualization simultaneously.
slug: magic-8-ball-toy
codeUrl: https://github.com/lds133/pico_8ball
version: VER_01
lastUpdated: '2026-03-27'
licenses:
- Apache-2.0
image: /202604/pico_8ball_0.avif
rtos: ''
topics:
- 8ball
- magic
- mpu9250
- rp2350
isShow: true
createdAt: '2026-04-21T05:35:55+00:00'
updatedAt: '2026-04-21T05:35:55+00:00'
---

This DIY project was born from a desire to utilize small, round displays in a creative way while experimenting with the Raspberry Pi Pico platform. By integrating a 1.28-inch round LCD into a classic 8-ball shell, the device emulates the floating behavior of a 20-sided dice. 


The device uses an accelerometer to detect its physical orientation and recognize specific gestures like shaking and rotating. It also features idle detection to save power. When the device is rotated face down and shaken, it prepares a prophecy. Once flipped face up, it randomly generates a response from a hardcoded list, displayed on a triangle that fits the round screen perfectly. To ensure longevity, the system monitors battery voltage, dynamically changing the triangle's color from blue to red as the battery level drops.

## Hardware Components

The build is centered around the Raspberry Pi Pico 2 (RP2350 board) and a 1.28-inch LCD module. Motion sensing is handled by an MPU-9250 accelerometer and gyroscope module. Power management is provided by a TP4056 Li-ion battery charger board paired with a standard Li-ion battery.

![Hardware components including RP2350 and LCD](/202604/pico_8ball_3.avif)

### Wiring and Assembly

The components are interconnected using SPI for the display and I2C for the sensor module. The ADC is utilized to monitor battery health, and DMA is employed to handle efficient data transfer to the display.

![Wiring diagram for the Pico 8-ball components](/202604/pico_8ball_4.avif)

The physical housing was repurposed from an original Magic 8-Ball toy. After the internal liquid and components were removed, the shell was cleaned to accommodate the new electronics, with the round screen positioned to align with the toy's original viewing window.

## Firmware Architecture

The firmware is designed to take full advantage of the RP2350's dual-core architecture. One core is dedicated to processing high-frequency accelerometer data to detect shakes and orientation changes, while the second core focuses on visualizing the floating dice and rendering the text output. 

![Close-up of the 20-sided dice visualization](/202604/pico_8ball_1.avif)

Development was conducted in Visual Studio Code using the Pico extension, with hardware debugging performed via a Raspberry Pi Debug Probe. While the software was originally targeted at the RP2040, it has been updated for the RP2350 platform, utilizing the Raspberry Pi Pico SDK and PICO_EXTRAS for hardware abstraction and peripheral management.
