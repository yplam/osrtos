---
title: Denki Kurage
summary: An interactive 3D jellyfish animation project designed for the ESP32-based
  Cheap Yellow Display (CYD). It features a low-poly rendering engine, touch-based
  camera and color controls, and a custom 3D-printable enclosure designed with OpenSCAD.
slug: denki-kurage
codeUrl: https://github.com/likeablob/denki-kurage
siteUrl: https://likeablob.github.io/denki-kurage/
lastUpdated: '2026-04-12'
licenses:
- MIT
image: /202604/denki-kurage_1.avif
rtos: ''
libraries:
- tft-espi
topics:
- cheap-yellow-display
- cyd
- denki-kurage
- esp32
isShow: true
createdAt: '2026-04-21T05:37:26+00:00'
updatedAt: '2026-04-21T05:37:26+00:00'
---

Denki Kurage (電気くらげ, or electric jellyfish) is a digital art project that brings a stylized, low-poly 3D jellyfish to life on the Cheap Yellow Display (CYD), a popular ESP32 development board with an integrated screen. The project is designed as a relaxing visual piece, allowing users to watch the jellyfish swim in a virtual environment with retro-style graphics.

### Interactive Features
The experience is more than just a static animation. Users can interact with the jellyfish and its environment through the resistive touchscreen. The interface allows for changing color modes, adjusting the simulated water current speed, and manipulating the camera. This interactivity turns the CYD into a small, self-contained digital aquarium.

### Hardware and Enclosure
The project specifically targets the ESP32-2432S028, known as the Cheap Yellow Display. While there are several variants of this hardware, this project is optimized for the CYD2USB version, which features both USB-C and Micro USB ports. To complete the aesthetic, the repository includes a custom enclosure designed in OpenSCAD. This stand transforms the bare PCB into a finished desk accessory.


Assembly is straightforward, requiring only the CYD module and four M2x3 self-tapping screws to secure the board into the 3D-printed frame.

### Interactive Controls
The touch interface is divided into specific zones to manage the 3D scene without the need for physical buttons:

*   **Navigation**: The left side of the screen (top and bottom strips) allows the user to move the view up or down.
*   **Camera**: Tapping the middle left or middle right areas rotates the camera around the jellyfish.
*   **Customization**: The center area cycles through different color palettes, while the top-right corner toggles between solid rendering and a wireframe mode.
*   **Diagnostics**: The bottom-right corner provides access to debug information for those interested in the technical performance of the rendering.


### Technical Implementation
The software is built using the Arduino framework and managed via PlatformIO. It leverages the `TFT_eSPI` library for high-speed graphics rendering on the ILI9341 display and the `XPT2046_Touchscreen` library for input handling. The 3D geometry and animation are optimized for the ESP32's processing capabilities to maintain a smooth frame rate.

![Side view of the Denki Kurage device in its stand](/202604/denki-kurage_3.avif)

### Acknowledgements
The project draws inspiration from "Artificial Jellyfish" (人工くらげ) and takes its name from a reference to Philip K. Dick’s *Do Androids Dream of Electric Sheep?*. It utilizes several open-source components, including the BOSL2 library for its enclosure design and M+ FONTS for its typography.
