---
title: XenoParticles
summary: A real-time particle simulation application built using the Xenomai real-time
  framework and SDL2 for graphics. It serves as a learning resource for developers
  exploring hard real-time programming on Linux with the Xenomai native skin.
slug: xenoparticles
codeUrl: https://github.com/tentone/xenoparticles
star: 3
lastUpdated: '2017-03-15'
rtos: xenomai
topics:
- sdl2
- xenomai
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- xenomai-hello-world-application
- str-xenomai-real-time-systems-practices
- xenomai-3-exercises-for-raspberry-pi-4
- xenomai-3-exercises
- xenomai-on-raspberry-pi
- real-time-spi-on-xenomai-3
---

## Overview

XenoParticles is a real-time particle simulation designed to demonstrate the capabilities of the Xenomai real-time framework. Developed as a learning tool, it provides a practical example of how to integrate high-performance graphics with a hard real-time environment. The project specifically targets Xenomai 2.6.5 and uses the framework's native skin to manage real-time tasks.

## Technical Architecture

The project is built using C++11 and leverages several key technologies to achieve its performance goals:

- **Xenomai V2.6.5**: Provides the real-time sub-kernel and API (native skin) required for deterministic task execution.
- **SDL V2.0**: Used for the graphical frontend, including SDL2_image for textures, SDL2_gfx for primitive drawing, and SDL2_ttf for font rendering.
- **Modular Design**: The source code is organized into logical components, including math utilities, graphics wrappers, and object management, making it easy to follow for those new to the codebase.

## Real-Time Implementation

The core of the simulation relies on Xenomai's ability to provide low-latency scheduling. By using the `xeno-config` tool within the build system, the project correctly links against the Xenomai libraries and sets the appropriate compiler flags for the native skin. This ensures that the particle physics and simulation logic can run with the determinism required for real-time systems, while the SDL2 library handles the non-real-time visualization aspects.

## Building the Project

The project includes a straightforward Makefile that automates the compilation process. It requires that the Xenomai installation path is correctly added to the system's PATH variable so that `xeno-config` can retrieve the necessary flags. 

```makefile
# Get compiler and linker flags
CC := $(shell xeno-config --cc)
CFLAGS := $(shell xeno-config --skin=native --cflags)
LDFLAGS := -lnative $(shell xeno-config --skin=native --ldflags)

constellations: src/* src/object/* src/math/* src/graphics/*
	g++ -O1 --std=c++11 -lm -o constellations $< -lSDL2 -lSDL2_image -lSDL2_gfx -lSDL2_ttf $(CFLAGS) $(LDFLAGS)
```

## Educational Value

For developers transitioning into embedded Linux or hard real-time programming, XenoParticles serves as an excellent starting point. It bridges the gap between theoretical real-time concepts and practical application development. By examining the source code, users can learn how to initialize a Xenomai task, manage shared resources between real-time and non-real-time domains, and handle high-frequency updates for simulation data.
