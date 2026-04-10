---
title: Macerun
summary: Macerun is a bare-metal Minecraft 1.16.5 server implementation written in
  C for the ESP32-S3 microcontroller. It leverages FreeRTOS and raw lwIP sockets to
  deliver a functional multiplayer experience on highly constrained hardware, featuring
  procedural world generation and NVS-based state persistence.
slug: macerun
codeUrl: https://github.com/4ngel2769/macerun
lastUpdated: '2026-04-09'
licenses:
- GPL-3.0
rtos: freertos
libraries:
- lwip
topics:
- c
- embedded
- embedded-c
- esp32
- minecraft
- minecraft-server
isShow: false
createdAt: '2026-04-09T23:47:33+00:00'
updatedAt: '2026-04-09T23:47:33+00:00'
---

## Minecraft on a Microcontroller

While most Minecraft servers demand gigabytes of RAM and powerful x86 processors, Macerun takes a different approach. It is a proof-of-concept project that brings a Minecraft 1.16.5 server to the ESP32-S3, a microcontroller with only a few megabytes of memory. Inspired by the "bareiron" project, Macerun demonstrates how efficient C code and direct hardware management can recreate complex network protocols and game mechanics in an embedded environment.

## Technical Architecture

Macerun implements a highly constrained subset of the Minecraft Java protocol (version 754). Because it operates without the overhead of standard server wrappers or a traditional operating system, it must handle everything from raw packet framing to entity tracking manually.

### Networking and Concurrency

The networking stack is built on raw lwIP TCP sockets running over FreeRTOS. The server manages asynchronous packet framing to handle chunk distribution and keepalives for up to four concurrent players. By working directly with the lwIP stack, the project minimizes the memory overhead usually associated with high-level socket abstractions.

### Procedural World Generation

One of the biggest challenges in running a world-building game on a microcontroller is memory management. Macerun addresses this by generating chunks procedurally on-the-fly. The engine utilizes 2D biome generation combined with bilinear interpolated heightmaps to construct world sections dynamically. This approach allows the server to send world data to clients without needing to store the entire map in the heap.

### Persistence and State

Despite the "bare-metal" nature of the project, the world is not static. Player modifications, such as block placements and removals (block deltas), as well as player inventories, are tracked in memory. To ensure progress isn't lost, these changes are committed directly to the ESP32’s Non-Volatile Storage (NVS) partition. This allows the server to maintain a persistent state across reboots despite the limited hardware resources.

## Hardware and Software Requirements

The project is specifically targeted at the ESP32-S3 with 16MB of flash and octal SPIRAM (specifically the `esp32s3n16r8` variant). The use of octal SPIRAM is critical for providing the necessary buffer space for networking and world data processing.

On the software side, Macerun is built using the ESP-IDF v6.0.0 framework. The project structure is modular, with dedicated components for networking, protocol handling, world generation, and configuration.

## Current Capabilities and Roadmap

Currently, Macerun supports core game loops including player physics verification, block breaking and placement, a minimal 2x2 inventory crafting system, and chat command interception. While it is not intended to replace a standard survival server, it serves as a robust example of embedded systems programming.

Future development goals for the project include:
- **Enhanced Persistence:** Saving detailed player data including health, hunger, and coordinates.
- **Advanced Crafting:** Support for the full 3x3 crafting grid.
- **Container Management:** Implementation of chests and block-based inventories.
- **Entity AI:** Basic mob spawning and artificial intelligence.
- **Respawn Mechanics:** Handling player death and respawn logic.
