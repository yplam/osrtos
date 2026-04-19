---
title: 'Retro Video Synthesizer: ESP32 & Pure Data'
summary: A real-time composite video generation system for the ESP32 that renders
  3D wireframes, starfields, and geometric tunnels directly to CRT televisions. It
  utilizes a custom C++ engine controllable via a web interface or Pure Data with
  MIDI support for live visual performances.
slug: retro-video-synthesizer-esp32-pure-data
codeUrl: https://github.com/antodale/CompositeVideoSynth
siteUrl: https://reboot-the-rise-of-the-robots.neocities.org/tools
lastUpdated: '2026-04-12'
licenses:
- AGPL-3.0
rtos: freertos
topics:
- aesthetic
- esp32
- experimental
- microcontroller
- music
- puredata
- retro
- visuals
- vj
- vjing
isShow: true
image: /202604/compositevideosynth.webp
createdAt: '2026-04-19T08:41:58+00:00'
updatedAt: '2026-04-19T08:41:58+00:00'
---

The Retro Video Synthesizer project transforms a standard ESP32 microcontroller into a dedicated graphics engine for vintage hardware. By leveraging the ESP32's internal Digital-to-Analog Converters (DAC), this project generates a live composite video signal, allowing users to connect modern microcontrollers directly to classic CRT televisions or analog monitors. It is designed for VJs, circuit benders, and retro-hardware enthusiasts who want to create dynamic, low-latency visual art without the need for a full-sized computer in the rendering chain.

### System Architecture

The project is built on a dual-component architecture. The rendering engine runs on an ESP32 (typically the standard WROOM-32 module), utilizing custom firmware based on the Bitluni Composite Video library. This engine handles the heavy lifting of rendering 3D primitives and geometric patterns. 

Control is handled externally to ensure the rendering loop remains uninterrupted. Users can choose between two primary control methods:
1.  **Web Interface:** By adding a second ESP32 (such as an ESP32-C3) to act as a wireless server, users can control visual parameters through a browser-based UI over Wi-Fi.
2.  **Pure Data:** A provided `.pd` patch allows for direct control over USB. This method is particularly powerful for performers, as it enables the mapping of physical MIDI controllers to the synthesizer's visual parameters.

### Visual Scenes and Capabilities

The synthesizer features several distinct visual modes, or "Scenes," each of which is highly customizable in real-time:

*   **3D Wireframes:** Renders rotating cubes, pyramids, and spheres in customizable grid layouts.
*   **Hyper Tunnels:** Generates infinite, accelerating geometric line tunnels with adjustable thickness and angles.
*   **Starfield:** A classic warp-speed simulation with variable star density.
*   **Cascading Text:** Designed for high-impact typography and long-form messaging.
*   **Solid Colors:** Generates full-screen color blocks or grayscale gradients for strobe and mood effects.

### High-Performance Serial Communication

To maintain a smooth framerate on the CRT, the project employs an optimized serial communication protocol. Rather than using heavy JSON or complex string parsing, the Pure Data patch translates slider positions into raw ASCII mathematical values. A typical command consists of a scene identifier followed by 3-padded numerical values for Size, Speed, Shape, and Multiplication. This allows the ESP32 to read the hardware buffer instantly, preventing memory overhead and ensuring that visual changes happen in sync with the performer's inputs.

### Hardware Integration

Setting up the hardware is straightforward but requires basic wiring. The composite video signal is output from Pin 25 of the ESP32. This pin connects to the center signal conductor of an RCA cable, while the ESP32 ground connects to the RCA outer shield. When using the dual-board wireless setup, the two microcontrollers communicate via UART (pins 16/17 on the rendering board and 4/5 on the server board), sharing a common power rail to simplify the setup.

### Live Performance with MIDI

One of the standout features of this project is its integration with the Pure Data ecosystem. By selecting a MIDI controller within Pure Data, users can map physical faders to the visual parameters. This turns the ESP32 into a tactile instrument where the "Size" of a 3D cube or the "Speed" of a starfield warp can be manipulated with physical sliders, providing a level of responsiveness that is essential for live VJing.
