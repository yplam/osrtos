---
title: Lilka DIY Console
summary: Lilka is an open-source DIY handheld console based on the ESP32-S3 microcontroller,
  designed for education and hobbyist development. It runs the Keira operating system,
  which utilizes FreeRTOS for task management and provides a framework for both C++
  and Lua applications. The platform supports features like NES emulation, SD card
  storage, and wireless connectivity, all while remaining affordable and easy to assemble.
slug: lilka-diy-console
codeUrl: https://github.com/lilka-dev/lilka
siteUrl: https://docs.lilka.dev
version: v2.3-beta-hardware
lastUpdated: '2025-11-19'
licenses:
- GPL-2.0
image: /202604/lilka_0.avif
rtos: freertos
topics:
- console
- devkit
- diy
- esp32
- handheld
- iot
- ukraine
isShow: true
createdAt: '2026-04-01T00:02:50+00:00'
updatedAt: '2026-04-01T00:02:50+00:00'
---

Lilka is a DIY handheld console that bridges the gap between hobbyist electronics and portable gaming. Built around the powerful ESP32-S3-WROOM-1-N16R8 microcontroller, the project is designed with a core philosophy of accessibility and education. Unlike proprietary handhelds, Lilka is meant to be assembled from affordable, off-the-shelf modules, making it an ideal entry point for anyone interested in embedded systems and game development.

## The Hardware Foundation

At its heart, Lilka leverages the ESP32-S3, providing built-in Wi-Fi and Bluetooth capabilities alongside 16MB of Flash and 8MB of PSRAM. This hardware choice ensures the console has enough power to handle demanding tasks, such as NES emulation or running a port of DOOM with respectable frame rates. To keep costs low and assembly simple, the project uses standardized modules for its display, SD card slot, battery management, and audio, allowing users to build a functional device for a fraction of the cost of commercial alternatives.

## Keira OS and FreeRTOS Integration

Lilka runs on a custom operating system known as Keira. This system is built on top of FreeRTOS, which provides the underlying task management and scheduling. In Keira, every application runs as a dedicated FreeRTOS task. This architectural choice allows for clean separation between the system's core functions and user-developed software.

Developers working with C++ can create native applications by inheriting from a base `App` class. These applications implement a `run()` method that is executed within its own task context. The system provides life-cycle management through hooks like `onSuspend`, `onResume`, and `onStop`, giving developers fine-grained control over how their software behaves in a multi-tasking environment.

## Graphics and Rendering

To ensure smooth visuals on its display, Lilka utilizes a double-buffering system. The hardware interaction layer provides a `canvas` pointer representing the front buffer. Developers are responsible for redrawing the entire frame during each iteration of their loop to maintain visual consistency, as buffer contents are not guaranteed between frames. By calling `queueDraw()`, the application synchronizes its rendering with the display hardware, targeting a smooth 30 FPS.

## Lua Scripting for Rapid Prototyping

One of Lilka's most powerful features is its integrated Lua environment. For those who want to avoid the complexities of C++ compilation and firmware flashing, Lilka supports Lua 5.1 scripts executed directly from an SD card. The environment provides a structured lifecycle similar to modern game engines:

- `lilka.init()`: Called once for setup.
- `lilka.update(delta)`: Called 30 times per second for logic and input processing.
- `lilka.draw()`: Dedicated to rendering graphics.

To further accelerate development, Lilka supports a "Live Lua" mode over USB and a REPL (Read-Eval-Print Loop) accessible via a serial connection. This allows developers to push code changes to the device instantly or test hardware commands in real-time without rebooting.

## Expanding the Ecosystem

Beyond gaming, Lilka is designed for expansion. It features an expansion header for connecting custom hardware modules, turning the console into a portable controller or diagnostic tool. Whether you are interested in writing high-performance C++ games, experimenting with Lua scripting, or exploring the intricacies of FreeRTOS task management, Lilka provides a versatile and low-cost platform for embedded exploration.
