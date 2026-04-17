---
title: PixelRoot32 Game Engine
summary: PixelRoot32 is a lightweight, modular 2D game engine written in C++17 for
  ESP32 microcontrollers and PC simulation. It features a scene-based architecture,
  NES-style audio synthesis, and a high-performance rendering pipeline optimized for
  embedded hardware using DMA transfers.
slug: pixelroot32-game-engine
codeUrl: https://github.com/PixelRoot32-Game-Engine/PixelRoot32-Game-Engine
siteUrl: https://pixelroot32.org
version: 1.2.1
lastUpdated: '2026-04-15'
licenses:
- MIT
image: /202604/PixelRoot32-Game-Engine_0.avif
rtos: ''
libraries:
- tft-espi
- u8g2
topics:
- cpp17
- embedded-systems
- esp32
- esp32-arduino
- game-engine
- pixel-editor
- platformio
- sdl2
isShow: true
createdAt: '2026-04-17T08:43:45+00:00'
updatedAt: '2026-04-17T08:43:45+00:00'
---

PixelRoot32 is a comprehensive 2D game engine designed to bring modern development workflows to the world of embedded systems. Developed primarily for the ESP32, it offers a cross-platform environment that allows developers to build and test games on PC (Windows, Linux, or macOS) using SDL2 before deploying the same code to microcontroller hardware. This dual-target approach significantly speeds up the development cycle by removing the need for constant hardware flashing.

### Engine Philosophy and Architecture

The engine is built with a clear philosophy: determinism over convenience and performance as a core constraint. It avoids runtime memory allocations to prevent heap fragmentation, a critical consideration for long-running embedded applications. Instead, it favors object pooling and smart memory management. The architecture is heavily inspired by the Godot Engine, utilizing a Scene-Entity-Actor system that makes it intuitive for developers familiar with modern game engines to transition into the embedded space.

To maintain performance on microcontrollers without a Floating Point Unit (FPU), such as the ESP32-C3, PixelRoot32 implements a dual numeric backend. It uses a custom fixed-point math system (`Scalar`) to ensure consistent behavior and high speed across different hardware variants. Developers are encouraged to use these fixed-point types and centralized logging abstractions to keep the codebase portable and efficient.

### High-Performance Graphics and Rendering

PixelRoot32 is optimized for speed, utilizing DMA (Direct Memory Access) transfers and IRAM-cached rendering to squeeze the most out of the ESP32's hardware. The engine supports a variety of display drivers, including the ST7789 and ILI9341 via `TFT_eSPI`, and monochrome OLEDs through the `u8g2` library. 

Key graphical features include:
- **Independent Resolution Scaling**: Render at a low logical resolution (like 128x128) and scale it to fit larger physical displays.
- **Advanced Sprite System**: Support for 1bpp, 2bpp, and 4bpp sprites with features like flipping, rotation, and multi-palette selection.
- **Tilemap Support**: Includes viewport culling and an optimized tile animation system that achieves O(1) frame resolution.
- **Indexed Color Palettes**: Pre-configured support for retro palettes such as NES, GameBoy, and PICO-8.

### Physics and Audio Subsystems

Beyond graphics, the engine includes a robust AABB physics system. This "Flat Solver" handles kinematic and rigid actors, sensors, and one-way platforms, providing stable stacking and iterative collision resolution. A dedicated `PhysicsScheduler` ensures a stable 60Hz simulation even when the ESP32 is under heavy interrupt load from WiFi or Bluetooth tasks.

The audio subsystem provides a retro experience with a built-in 4-channel synthesizer. It emulates NES-style sound generation with Pulse, Triangle, and Noise channels, allowing for procedural SFX and music without the overhead of heavy audio files.

### Getting Started

PixelRoot32 is designed to be used with PlatformIO and VS Code. To integrate the engine into a project, users must configure their environment for C++17 and disable exceptions. The repository provides a wealth of examples ranging from simple "Hello World" projects to complete games like Space Invaders, Brick Breaker, and Flappy Bird. Each example serves as a standalone project, demonstrating features like spatial partitioning, touch screen support (for CYD devices), and modular compilation using `PIXELROOT32_ENABLE_*` flags to minimize firmware size.
