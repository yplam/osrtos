---
title: 'NX-Radar-CS2-DMA: External Hardware Radar for Counter-Strike 2'
summary: A hardware-assisted radar system that uses a Windows kernel driver to stream
  Counter-Strike 2 game data to an ESP32-S3. The project bypasses user-mode anti-cheat
  restrictions by reading memory at Ring 0 and rendering player positions on an external
  ST7789 SPI display.
slug: nx-radar-cs2-dma-external-hardware-radar-for-counter-strike-2
codeUrl: https://github.com/N1xUser/NX-Radar-CS2-DMA
lastUpdated: '2026-06-07'
image: /202606/NX-Radar-CS2-DMA_0.avif
rtos: ''
libraries:
- micropython
topics:
- arduino
- counter-strike-2
- dma
- dumper
- esp32-s3
- kdmapper
- kernel
- radar
- st7789
isShow: true
createdAt: '2026-06-09T00:26:55+00:00'
updatedAt: '2026-06-09T00:26:55+00:00'
relatedProjects:
- esp32-flight-tracker
- bbmonitor
- wifiexe-esp32-s3-based-badusb
- deck
- wifi-remote-display-adv
- lilygo-t-display-s3-boilerplate
---

## Overview

NX-Radar-CS2-DMA is an educational project that demonstrates how to build a high-performance external game radar using affordable hardware. While traditional Direct Memory Access (DMA) solutions often require expensive FPGA hardware and PCIe cards, this project achieves a similar result by combining a Windows kernel driver with an ESP32-S3 microcontroller. 

The system functions by reading game memory directly from kernel space, processing the coordinates on a host PC, and streaming that data over USB serial to an external 240x240 IPS display. This approach serves as a practical exploration of memory management, kernel-to-user-mode communication, and real-time embedded graphics rendering.

## System Architecture

The project is divided into three distinct layers that work in tandem to provide a real-time tactical overlay:

### 1. The Kernel Driver (Ring 0)
Most modern anti-cheat systems operate by hooking standard Windows APIs like `ReadProcessMemory`. To bypass these user-mode restrictions, this project employs a kernel driver that utilizes `MmCopyVirtualMemory`. Because the driver operates at Ring 0, it can access the process memory of Counter-Strike 2 without triggering standard API hooks that would otherwise be monitored.

### 2. The User-Mode Client
The C++ client acts as the bridge between the kernel and the hardware. It performs several critical tasks:
*   **Memory Parsing:** Using offsets provided by tools like `cs2-dumper`, it locates player positions, health, and bomb states.
*   **Coordinate Transformation:** It converts 3D world coordinates from the game engine into 2D radar coordinates.
*   **Serial Communication:** It implements a handshake protocol to auto-detect the ESP32-S3 and streams the processed data over a COM port.

### 3. The ESP32-S3 Firmware
The hardware layer acts as a dedicated rendering terminal. The project supports two different firmware implementations:
*   **Arduino (C++):** Utilizes the LovyanGFX library for high-speed SPI communication, capable of achieving 60+ FPS for smooth movement.
*   **CircuitPython:** A more accessible version that allows for quick modifications to the rendering logic and projection math using MicroPython-based libraries.

## Hardware Implementation

The project targets the ESP32-S3 (specifically DevKitC models) due to its native USB support and high clock speeds. It interfaces with an ST7789 1.3" or 1.54" IPS LCD via the SPI protocol. The wiring configuration uses standard GPIOs for the CLK, MOSI, Reset, Data/Command, and Chip Select lines, providing a straightforward setup for those interested in embedded hardware design.

## Handshake & Data Protocol

To ensure seamless connectivity, the project uses a text-based serial handshake. This allows the PC client to scan available COM ports and verify the hardware is ready before streaming data:

| Step | Direction | Data | Purpose |
|------|-----------|------|---------|
| 1 | ESP32 → PC | `RADAR_READY` | Hardware beacon sent every 500ms |
| 2 | PC → ESP32 | `RADAR_INIT` | Client requests synchronization |
| 3 | ESP32 → PC | `RADAR_ACK` | Hardware confirms connection |
| 4 | PC → ESP32 | `p,x,y,ang;e...` | Continuous stream of player/bomb data |

## Coordinate Projection Math

Rendering the radar requires translating game units into screen pixels. The firmware applies a scale factor to define the zoom level and rotates the dots based on the player's forward direction to ensure the radar always matches the player's perspective.

```python
# Example of the scaling logic used in the firmware
# Lower value = Zoom In | Higher value = Zoom Out
scale = (WIDTH / 2) / 2100.0 

# Adjusting the player position to see more of what's in front
RADAR_CY = RADAR_Y_START + (RADAR_HEIGHT // 2) + 50 
```

## Educational Value

Beyond its functional application, NX-Radar-CS2-DMA serves as a comprehensive learning resource for several advanced computing topics:
*   **OS Internals:** Understanding the privilege levels between Ring 3 (User) and Ring 0 (Kernel).
*   **Memory Forensics:** Learning how data structures are stored in a running process and how to navigate them using offsets.
*   **Embedded Graphics:** Implementing efficient 2D rendering on low-power microcontrollers.
*   **Serial Protocols:** Designing robust communication flows between desktop software and embedded devices.
