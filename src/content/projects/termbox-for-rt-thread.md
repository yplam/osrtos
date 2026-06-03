---
title: Termbox for RT-Thread
summary: A lightweight text-based user interface (TUI) library ported to the RT-Thread
  RTOS. It provides a simple API for terminal drawing and input handling, supporting
  Unicode characters, mouse events, and double-buffered rendering optimized for low-bandwidth
  channels like serial ports.
slug: termbox-for-rt-thread
codeUrl: https://github.com/mysterywolf/termbox
star: 6
version: v1.0.0
lastUpdated: '2022-06-21'
rtos: rt-thread
topics:
- rt-thread
- termbox
- terminal
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- rt-u8g2-u8g2-graphics-library-for-rt-thread
- littlevgl2rtt
- micro-ros-for-rt-thread
- aclock-for-rt-thread
- rt-thread-fbtft-framebuffer-drivers-for-tft-lcds
- arduino-rt-thread-library
---

## Overview

Termbox for RT-Thread is a port of the popular minimalist TUI (Text-based User Interface) library, specifically optimized for embedded systems running the RT-Thread RTOS. Originally a staple of the Linux world for creating terminal applications, this implementation brings powerful terminal-based graphics and input handling to microcontrollers and embedded devices.

At its core, Termbox is designed around the philosophy of simplicity. The entire interface consists of only 12 primary functions, yet it provides enough power to create complex interactive menus, dashboards, and diagnostic tools over standard serial connections.

## Key Features and Capabilities

One of the standout features of this port is its sophisticated input analysis. Unlike simple serial parsers, Termbox can handle complex keyboard events, including single keys, combination keys, and even mouse interactions such as clicks and scroll wheel movements. This makes it possible to build highly interactive embedded consoles that feel like desktop terminal applications.

**Core capabilities include:**
- **Unicode Support:** The library uses Unicode encoding for output, allowing for multi-language interfaces and automatic character width detection.
- **Double Buffering:** Termbox utilizes a "memory device" mechanism with internal front and back buffers. It compares the two and only transmits the differences to the terminal. This significantly reduces the amount of data sent over low-baud rate serial ports, preventing screen flickering.
- **Termbox2 Extensions:** This repository includes extended functionality from the Termbox2 project, adding convenient functions for drawing strings and formatted text (`printf` style) without manual Unicode conversion.

## Technical Implementation

The library is highly efficient but does require a memory footprint proportional to the terminal window size. For a standard 80x24 terminal, the double-buffering system typically consumes about 50KB of RAM. For memory-constrained devices, the library provides a `TB_NO_MEMDEV` macro to disable the memory device mechanism, allowing users to manage redrawing manually to save space.

## Getting Started

Integrating Termbox into an RT-Thread project is handled through the RT-Thread package manager. Once enabled in Kconfig, the library can be initialized and used within a thread to drive a terminal interface.

### Basic Drawing Workflow

The typical workflow involves initializing the library, clearing the buffer, placing "cells" (characters with foreground and background attributes), and then presenting the buffer to the screen.

```c
tb_init(); // Initialize termbox
tb_clear(); // Clear the internal buffer

// Draw a character at (0,0) with white text on default background
tb_change_cell(0, 0, 0x250C, TB_WHITE, TB_DEFAULT); 

// Draw a string using Termbox2 extensions
tb_string(5, 5, TB_GREEN, TB_DEFAULT, "RT-Thread TUI");

tb_present(); // Sync the buffer to the actual terminal

// Wait for an event (key press or mouse)
struct tb_event event;
tb_poll_event(&event);

tb_shutdown(); // Restore terminal state
```

## Event Handling

Termbox provides both blocking (`tb_poll_event`) and non-blocking (`tb_peek_event`) methods to handle user interaction. The library abstracts away the complexities of ANSI escape sequences, providing a clean `tb_event` structure that identifies the type of event, the specific key or character pressed, and coordinates for mouse actions.
