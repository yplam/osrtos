---
title: MicroCanvas
summary: MicroCanvas is a 2D retained-mode graphics engine designed for microcontrollers
  to facilitate the development of portable video games and GUI applications. It utilizes
  a universal object model where graphical elements are managed as persistent entities,
  allowing developers to update screen content by simply modifying object properties
  rather than managing manual redraw loops.
slug: naitiksanas-microcanvas
codeUrl: https://github.com/NaitikSanas/MicroCanvas
star: 57
version: v1.0.0-beta
lastUpdated: '2026-02-14'
licenses:
- MIT
libraryType: Graphics
createdAt: '2026-02-28'
updatedAt: '2026-04-19'
---

### Features


- Retained-mode graphics architecture that maintains a persistent model of the scene for automatic rendering.

- Universal object system allowing elements to morph between types like rectangles, circles, and textboxes at runtime.

- Scene-based management for organizing and switching between different UI layouts or game states.

- Property-driven API where changes to position, color, and visibility are reflected instantly on the display.

- Integrated background renderer task that handles display refreshing independently of application logic.

- Support for multiple display instances and viewports to manage complex screen layouts.

- Built-in display driver support for controllers such as the EK79007 and ST7789.

- Configurable render buffers and framebuffers for optimized memory usage on resource-constrained hardware.

- Hardware acceleration support via Pixel Processing Accelerator (PPA) initialization.

- Support for basic 2D primitives including rectangles, circles, sprites, and textboxes.

- Flexible coordinate system with viewport positioning and refresh delay configuration.

- Seamless integration with ESP-IDF 5.x and FreeRTOS-based environments.

- Decoupled rendering logic that eliminates the need for explicit 'clear-draw-update' commands in user code.



MicroCanvas follows a retained-mode architectural pattern, distinguishing it from traditional immediate-mode embedded graphics libraries. In this design, the library maintains an internal model of all graphical elements within a structure called a Scene. When an application modifies an object's properties—such as its coordinates, fill status, or color—the library's internal renderer task automatically detects these changes and updates the display buffer. This abstraction removes the burden of managing the display refresh cycle from the developer, allowing for more focus on application logic.

The core of the system is the Universal Object, a polymorphic structure that can represent any supported primitive. By feeding different property data into a universal object, it can function as a rectangle, sprite, or text element. These objects are contained within Scenes, which are then attached to a uCanvas Instance. The Instance acts as the bridge between the logical scene and the physical hardware, binding together the display panel driver, the render buffer, and the viewport settings.

**Core Components**
- **uCanvas Instance**: The top-level controller that manages the relationship between a scene, a render buffer, and the hardware panel.
- **Scene Manager**: Handles the storage and lifecycle of universal objects, enabling easy transitions between different UI screens.
- **Universal Object (uCanvas_universal_obj_t)**: The base primitive type that stores dimensions, position, color, and visibility data.
- **Renderer Task**: An asynchronous background process that refreshes the display based on the current state of the active scene.
- **Display Panel Driver**: An abstraction layer for hardware-specific communication, supporting interfaces like SPI and RGB.

### Use Cases

This library is ideal for:
- **Handheld Gaming**: Developing 2D portable video games where sprite manipulation and scene transitions are frequent and require a simplified API.
- **Industrial HMI**: Building graphical user interfaces for embedded controllers that need to display real-time status updates without complex manual redraw logic.
- **IoT Dashboards**: Creating interactive screens for smart home devices that display sensor data through textboxes and geometric primitives.
- **Rapid Prototyping**: Quickly developing UI layouts on ESP32-S3 hardware using a property-based approach rather than low-level pixel manipulation.

### Getting Started

To begin using MicroCanvas, developers must first initialize the hardware abstraction layer (such as the PPA) and create a `uCanvas2D_Instance_t`. The setup involves attaching a render buffer, configuring a display panel driver (e.g., `uCanvas2D_Get_Panel_Driver_EK79007`), and defining a scene. Once a scene is set as active using `uCanvas_set_active_scene`, objects can be added using factory functions like `New_uCanvas_2DRectangle`. Detailed configuration for ESP32-S3 targets is managed via `sdkconfig`, and the project is built using the standard ESP-IDF CMake build system. For a visual introduction and video demonstration, developers can refer to the [Intro to MicroCanvas](https://www.youtube.com/watch?v=HkStWmnj7VE) tutorial.
