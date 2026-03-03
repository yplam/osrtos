---
title: DIY Arcade Machine
summary: A MicroPython-based arcade system for RP2040 microcontrollers and 64x64 HUB75
  LED matrices. It supports physical hardware via the Pimoroni Interstate 75 and a
  desktop emulator using PyGame. The project includes over 16 classic-inspired games
  with persistent high scores and memory-optimized graphics handling.
slug: diy-arcade-machine
codeUrl: https://github.com/SimonWaldherr/DIY-Arcade-Machine
star: 18
version: v3.0.0
lastUpdated: '2025-12-29'
rtos: ''
libraries:
- micropython
topics:
- arcade-game
- arcade-machine
- diy-electronics
- game
- hacktoberfest
- hacktoberfest-accepted
- interstate75
- pygame
- pygame-games
- raspberry-pi-pico
- rp2040
isShow: true
image: /202603/diy-arcade-machine.webp
createdAt: '2026-03-03'
updatedAt: '2026-03-03'
---

## Overview

The DIY Arcade Machine is a comprehensive mini-arcade ecosystem designed to run on both physical embedded hardware and desktop environments. At its core, the project targets the RP2040-based Pimoroni Interstate 75 driver board, which controls a 64x64 RGB LED matrix via the HUB75 protocol. By leveraging MicroPython for the embedded side and CPython with PyGame for the desktop, the project allows developers to build and test games on a computer before deploying them to the physical console.

## Hardware and Architecture

The physical build is centered around the **Pimoroni Interstate 75 (W)**, a specialized RP2040 board designed to drive HUB75 LED panels. The display is a standard 64x64 RGB matrix, providing a 58-pixel playfield with a dedicated 6-pixel HUD at the bottom for scores and a real-time clock. 

For input, the system utilizes a **Wii Nunchuk-style I2C controller**. The software includes a robust I2C driver that auto-detects different controller variants, including newer third-party signatures. This choice of controller provides an analog stick for 8-directional movement and two primary buttons (Z and C) for actions and menu navigation.

## Software Implementation

The project is written in highly optimized Python, ensuring it fits within the RAM constraints of the RP2040. Key technical features include:

- **Dual Runtime Support**: A unified codebase (`arcade_app.py`) detects whether it is running under MicroPython or CPython. It abstracts the display and input layers, using `hub75` on hardware and `pygame` on the desktop.
- **Memory Optimization**: To handle the 64x64 framebuffer and game logic simultaneously, the project uses nibble-packed grid storage for games like Maze and Qix, lazy-loaded fonts, and a buffered framebuffer that only pushes changed pixels to the hardware.
- **Bootstrap Loading**: To avoid memory errors during compilation on the device, the project uses a tiny `main.py` bootstrap that loads a pre-compiled `.mpy` bytecode version of the main application.

## Built-in Games

The arcade comes pre-loaded with over 16 games, ranging from simple logic puzzles to complex shooters:

- **Doom-Lite**: A mini raycaster FPS implementation.
- **R-Type & Asteroids**: Space-themed shooters with scrolling and physics.
- **Tetris & Breakout**: Classic arcade staples with full high-score support.
- **Maze Explorer**: A fog-of-war exploration game with enemies and gems.
- **Demos**: Zero-player simulations including Conway's Game of Life and Langton's Ants.

## Getting Started

For desktop users, the setup is as simple as installing PyGame and running `python main.py`. For embedded deployment, the repository provides an `upload.sh` script that automates the process of compiling the Python code to bytecode using `mpy-cross` and flashing it to the Interstate 75 board. 

The project also supports persistent high scores via a `highscores.json` file, allowing players to enter 3-letter initials using the joystick, mimicking the classic arcade experience. Whether you are looking for a retro gaming project or a study in MicroPython optimization, this repository provides a complete, polished framework for LED-based gaming.
