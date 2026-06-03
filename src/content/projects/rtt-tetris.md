---
title: RTT Tetris
summary: A Tetris game implementation ported to the RT-Thread RTOS, designed to be
  played directly within the FinSH shell. It features customizable controls, adjustable
  game speed, and seamless integration with the RT-Thread package management system.
slug: rtt-tetris
codeUrl: https://github.com/volatile-static/rtt_tetris
star: 4
version: v1.0.0
lastUpdated: '2020-11-30'
rtos: rt-thread
topics:
- rt-thread
- tetris
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- c2048-for-rt-thread
- threes-for-rt-thread
- lua2rtt
- micropython-port-for-rt-thread
- donut-for-rt-thread
- freertos-port-for-teensy-3-6-4-0-4-1
---

## Overview

RTT Tetris is a specialized port of the [Cross-Platform Tetris](https://github.com/volatile-static/CrossPlatformTetris) engine specifically designed for the RT-Thread real-time operating system. Unlike traditional graphical games, this implementation runs directly within the RT-Thread FinSH (msh) console, allowing developers to play the classic puzzle game over serial connections using terminal emulators like PuTTY or XShell.

## Key Features

The project provides a lightweight, terminal-based gaming experience that demonstrates the interactive capabilities of the RT-Thread shell. 

**Core capabilities include:**
- **Console Integration**: Runs as a standard msh command (`tetris_demo`).
- **Adjustable Difficulty**: Users can specify the falling speed (in milliseconds) as a command-line argument.
- **Customizable Controls**: Keybindings for movement and rotation are easily configurable in the source code.
- **Flexible Canvas**: The game board dimensions (default 24x32) can be modified via header definitions.
- **Package Management**: Fully integrated with the RT-Thread ENV tool for easy installation as an online package.

## Technical Architecture

The project is split into two main components: the core game logic and the RT-Thread wrapper. The core logic resides in `Tetris.c` and `Tetris.h`, which provide a clean API for game state management. The RT-Thread specific implementation in `tetris_demo.c` handles user input from the shell and renders the game state to the terminal.

### Core API

The game engine exposes six primary functions that manage the Tetris lifecycle:
```c
void NewGame(TCmd *Messenger);
void MoveLeft(TCmd *Messenger);
void MoveRight(TCmd *Messenger);
bool MoveDown(TCmd *Messenger);
void Transform(TCmd *Messenger);
bool GameOver(void);
```

Communication between the engine and the display driver is handled via a `TCmd` structure. This structure tracks specific coordinate changes (Erase and Paint operations), allowing the system to perform efficient incremental updates to the terminal screen rather than redrawing the entire board every frame.

## Configuration and Usage

RTT Tetris is designed to be highly customizable. Developers can modify the default controls in `tetris_demo.c` by changing the following macros:

```cpp
#define KEY_UP    ('w')
#define KEY_LEFT  ('a')
#define KEY_DOWN  ('s')
#define KEY_RIGHT ('d')
```

To run the game, users simply enter the command in the RT-Thread shell. An optional parameter allows for speed adjustment, where the number represents the millisecond interval between gravity drops:

```shell
msh> tetris_demo 200
```

## Integration with RT-Thread

As a member of the RT-Thread miscellaneous packages ecosystem, it can be enabled through the menuconfig interface under `miscellaneous packages -> games`. The build system uses SCons, as evidenced by the `SConscript` file, making it compatible with standard RT-Thread development workflows. While currently single-threaded, the project roadmap includes plans to implement multi-threading to improve input responsiveness during block descent.
