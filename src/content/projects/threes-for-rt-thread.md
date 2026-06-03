---
title: Threes for RT-Thread
summary: A port of the popular digital elimination puzzle game Threes to the RT-Thread
  RTOS. It runs within the Finsh command-line component, allowing users to play the
  game directly on an MCU via a serial terminal like Putty.
slug: threes-for-rt-thread
codeUrl: https://github.com/mysterywolf/threes
star: 1
lastUpdated: '2021-11-01'
rtos: rt-thread
topics:
- console-game
- finsh
- game
- rt-thread
- rtthread
- terminal-game
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- c2048-for-rt-thread
- rtt-tetris
- micropython-port-for-rt-thread
- stm32-pocket-game-dev-console
- donut-for-rt-thread
- termbox-for-rt-thread
---

## Overview

Threes for RT-Thread is a port of the classic digital elimination puzzle game originally released in 2014. While the original game was a mobile sensation, this version brings the addictive logic of merging numbers to the embedded world. Specifically designed to run on the RT-Thread real-time operating system, it utilizes the Finsh command-line component to render the game board directly in a serial terminal.

The project is based on a C-language implementation by Harsh Vakharia, which was originally designed for Linux terminals. This port adapts that logic to work within the constraints and environment of an MCU running RT-Thread, providing a lighthearted distraction for developers during the debugging process.

## Gameplay and Mechanics

The rules of Threes are simple yet challenging. The game is played on a 4x4 grid where players slide tiles to merge them:
- Numbers 1 and 2 combine to form 3.
- Two identical multiples of 3 (e.g., 3 and 3, 6 and 6) combine to form their sum.
- Unlike some other merging games, you cannot combine different multiples of 3 (such as 3 and 6).

The goal is to achieve the highest possible score by creating larger numbers before the board fills up and no more moves are possible.

## Technical Integration

This project is fully integrated into the RT-Thread ecosystem. It is available as an online package, making it easy to include in existing RT-Thread projects through the menuconfig system. 

### Build System

The project includes an `SConscript` file, which is the standard build configuration for RT-Thread. This allows the game to be compiled seamlessly alongside the kernel and other components. The source code is contained within `threes.c`, which handles the game logic, input processing, and terminal rendering.

### Terminal Interface

Because the game runs within the Finsh shell (msh), it does not require a graphical display. It uses standard ANSI escape codes or simple text formatting to draw the 4x4 grid in the terminal. Players interact with the game using standard keyboard inputs:
- **W, A, S, D**: Used to simulate the up, left, down, and right swipes from the original mobile game.
- **Q**: Exits the game and returns the user to the RT-Thread command prompt.

## Getting Started

To use this package, users can enable it via the RT-Thread package manager under the entertainment category. Once the project is compiled and flashed to the target MCU, simply type `threes` in the msh terminal to begin. The game is best experienced using a terminal emulator like Putty, which correctly handles the character rendering required for the grid display.
