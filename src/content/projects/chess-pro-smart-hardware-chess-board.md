---
title: Chess Pro — Smart Hardware Chess Board
summary: A sophisticated physical chess board utilizing Hall effect sensors for piece
  detection and dual displays for game status and clock. It runs on Go-powered Raspberry
  Pi or Orange Pi hardware, featuring deep Lichess integration, local Stockfish analysis,
  and a custom DietPi-based OS image with power-loss protection.
slug: chess-pro-smart-hardware-chess-board
codeUrl: https://github.com/shyhirt/chess-pro
lastUpdated: '2026-05-06'
licenses:
- GPL-3.0
image: /202605/chess-pro_0.avif
rtos: ''
libraries:
- sqlite
topics:
- chess
- chess-board
- dietpi
- diy
- e-paper
- embedded
- golang
- hall-effect-sensors
- hardware
- iot
- lichess
- oled
- physical-computing
- raspberry-pi
- raspberry-pi-zero
- smart-chessboard
- stockfish
- ws2812b
isShow: true
createdAt: '2026-05-25T00:23:30+00:00'
updatedAt: '2026-05-25T00:23:30+00:00'
---

Chess Pro is an ambitious open-source project that bridges the gap between traditional over-the-board chess and the modern digital ecosystem. Built around a Raspberry Pi Zero 2W or Orange Pi Zero 2W, this smart board transforms a physical chess set into a connected device capable of playing online matches on Lichess, analyzing positions with a local Stockfish engine, and providing real-time visual feedback through a combination of displays and LED lighting.

## Hardware Architecture and Sensing

At the heart of the board's input system is a matrix of 64 A3144 Hall effect sensors—one embedded beneath every square. By placing small neodymium magnets into the base of standard chess pieces, the system can detect piece presence and movement without the need for specialized, expensive electronic pieces. These sensors are polled via four PCF8575 16-bit I2C GPIO expanders, allowing the software to compute board state differences in real-time.

The board provides feedback through a dual-display system. A 1.54-inch SSD1681 e-paper display shows the current board position with custom pixel-art pieces, utilizing fast partial refreshes to update only the squares involved in a move. Simultaneously, a 1.3-inch SH1106 OLED display functions as the chess clock and status center, showing engine evaluations, game events, and connection status. For move highlights and alerts, a WS2812B RGB LED strip is routed around the perimeter or under the squares to indicate valid moves, last moves, and check conditions.

## Software and Intelligence

Written in Go, the firmware manages a complex state machine that handles move validation, capture detection, and premove queuing. The system integrates directly with the Lichess Board API, allowing players to play against human opponents online where the opponent's moves are signaled on the physical board. For offline play, a local instance of the Stockfish engine provides high-level analysis and an adjustable-strength opponent.

One of the most interesting technical aspects is the inclusion of a hardware safety circuit. To prevent the high current draw of 64 LEDs from tripping power bank protections, an Arduino Nano monitors current via an INA219 sensor and controls a power MOSFET. This provides a soft-start PWM ramp and an independent hardware cutoff that protects the system even if the primary application firmware encounters a bug.

## Robust Embedded Linux Environment

Recognizing the challenges of running a Linux-based system in a "plug-and-play" hardware device, Chess Pro utilizes a custom-built DietPi image. This environment is specifically optimized for power-loss protection, featuring a read-only root overlay that prevents SD card corruption. Persistent data, such as PGN game history and configuration files, are stored on a dedicated journaled partition. 

Data integrity is further ensured through a Go-based storage API that uses SQLite in WAL mode with atomic "SafeWrite" operations. This ensures that the board can be unplugged at any moment without risking the loss of game history or system stability.

## Connectivity and Configuration

To keep the user experience seamless, the project includes a BLE GATT server for WiFi provisioning. Users can configure network credentials via a companion Android app, eliminating the need to connect a keyboard or edit configuration files manually. The project also features a web-based UI for reviewing saved games, complete with a PGN viewer and Stockfish analysis, making it a comprehensive tool for both play and improvement.
