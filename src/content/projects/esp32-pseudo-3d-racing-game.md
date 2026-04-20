---
title: ESP32 Pseudo-3D Racing Game
summary: A high-performance OutRun-style racing game for the ESP32-S3 featuring procedural
  tracks, 3D mesh rendering, and a dynamic day/night cycle. It utilizes the TFT_eSPI
  library and PSRAM double-buffering to achieve smooth visuals on an ILI9341 display.
slug: esp32-pseudo-3d-racing-game
codeUrl: https://github.com/davidmonterocrespo24/esp32s3-arcade-3d
lastUpdated: '2026-03-04'
rtos: ''
libraries:
- tft-espi
topics:
- 3d
- arduino
- esp32
- game
isShow: false
createdAt: '2026-04-20T08:18:27+00:00'
updatedAt: '2026-04-20T08:18:27+00:00'
---

Classic arcade racing games like *OutRun* or *Pole Position* defined an era with their high-speed pseudo-3D visuals. Recreating that experience on modern microcontrollers requires a clever blend of geometry, sprite manipulation, and efficient rendering pipelines. This project brings that retro aesthetic to the ESP32-S3, delivering a feature-rich racing engine that handles everything from procedural track generation to texture-mapped 3D models.

### Rendering the Road

The heart of the engine is a segment-based back-to-front painter's algorithm. By dividing the track into discrete segments, the game can simulate curves and elevation changes without the overhead of a full 3D environment. The visual depth is significantly enhanced by an atmospheric fog system that uses exponential density toward the horizon. 

To make the world feel alive, the engine includes a dynamic day/night cycle. Every 180 km of distance traveled, the game smoothly transitions the color palette through day, sunset, and night phases. This isn't just a simple overlay; the colors of the road, grass, and sky are lerped to maintain a consistent atmosphere.

### 3D Assets and Geometry

While the road uses pseudo-3D techniques, the player's car and the surrounding environment utilize more advanced geometry. The player's vehicle is a genuine 3D OBJ mesh consisting of 428 vertices and 312 triangles. The rendering pipeline performs Z-sorting on these triangles and applies scanline affine texture mapping to wrap a 128x128 RGB565 texture around the model. 

Similarly, the track is populated with 3D buildings that feature randomized window patterns, alongside static scenery like pine trees, bushes, and lamp posts. A traffic system manages six AI-controlled cars, each with independent speeds and lane positions, adding a layer of challenge to the gameplay.

### Physics and World Logic

The game features a robust physics model that governs vehicle behavior. It accounts for standard variables like acceleration and friction coast-down, but also integrates environmental factors. Centrifugal drift pushes the car outward on curves, and gravity effects provide a noticeable speed boost when traveling downhill or a penalty when climbing. 

The track itself is procedurally generated at startup. This system randomizes curves, elevation changes, and the placement of tunnels and buildings, ensuring that the course feels different with every reset. A HUD overlay provides the player with a circular speedometer and lap timing tracking current and best performances.

### Technical Implementation

Performance is a primary concern when pushing 320x240 16-bit graphics on an SPI display. The project is optimized for the ESP32-S3, specifically utilizing its 8 MB of PSRAM for hardware-accelerated double buffering. The entire frame is composed in memory before being pushed to the ILI9341 display via the TFT_eSPI library, effectively eliminating screen tearing.

One of the most interesting architectural choices is the dual-target build system. The project is designed to compile for both the physical ESP32 hardware and a Windows-based emulator. The emulator uses the Raylib library to mock the Arduino API and TFT draw calls, allowing for rapid iteration of game logic and physics without needing to flash the microcontroller for every change.

### Tunable Constants

Much of the game's behavior is defined in `config.h`, allowing developers to easily tweak the experience:

```cpp
// Key constants for game feel
#define SPEED_MULTIPLIER 65.0   // Max speed (~246 km/h)
#define FRICTION         0.996  // Coast-down rate
#define ROAD_W           2000   // Road half-width in world units
#define SEG_LEN          200    // Segment length in world units
```

This modular approach, combined with Python scripts to convert OBJ meshes and PNG textures into C headers, makes the project a highly flexible framework for anyone interested in retro-style game development on embedded systems.
