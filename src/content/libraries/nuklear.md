---
title: Nuklear
slug: nuklear
summary: Nuklear is a portable, single-header immediate-mode graphical user interface
  toolkit written in ANSI C (C89). It is designed as a dependency-free, embeddable
  UI library that provides a modular approach, outputting primitive draw commands
  or vertex buffers rather than abstracting platform-specific rendering backends.
codeUrl: https://github.com/Immediate-Mode-UI/Nuklear
siteUrl: https://Immediate-Mode-UI.github.io/Nuklear/
star: 11061
version: 4.13.2
lastUpdated: '2026-04-17'
components:
- GUI
- Graphics
platforms:
- ARM
- ARM Cortex-M
- RISC-V
- x86
- x86_64
- POSIX
- Linux
- Windows
- macOS
- Native
licenses:
- MIT
libraryType: GUI
createdAt: '2025-11-16'
updatedAt: '2026-04-19'
---

### Features


- Immediate-mode paradigm for simplified UI state management and rendering.

- Single-header library architecture for easy integration into C/C++ projects.

- Strict C89 (ANSI C) compatibility ensuring high portability across legacy and modern compilers.

- Zero-dependency design with the ability to exclude the standard C library entirely.

- Manual memory management providing total control over allocation through fixed or custom allocators.

- Thread-safe architecture with no global or hidden state within the library.

- Support for UTF-8 encoded text and customizable font handling.

- Optional vertex buffer output for hardware-accelerated rendering via OpenGL, DirectX, Vulkan, or Metal.

- Built-in font baking and rectangle packing using embedded stb libraries.

- Fully skinnable and customizable widget appearance and behavior.

- Modular compilation allowing users to include only necessary features via preprocessor macros.

- Primitive shape output via draw commands for high-level software rendering backends.

- Flexible layout engine supporting static, dynamic, and custom row-based layouts.

- Low memory footprint suitable for resource-constrained embedded systems.

- Input handling for various devices including mouse, keyboard, and gamepad.



### Architecture

Nuklear follows an **immediate-mode** architectural pattern, which differs from traditional retained-mode GUIs by not storing the UI state (like widget hierarchies or object trees) inside the library. Instead, the UI is described and rendered every frame. The core of the library is the `nk_context` struct, which manages the internal state, input handling, and the command buffer. Because there is no global state, the library is inherently thread-safe as long as each thread operates on its own context.

The library is highly modular and designed to be backend-agnostic. It does not provide a built-in renderer or window management system. Instead, it processes input state provided by the user and generates a list of **draw commands** (primitive shapes like lines, rectangles, and circles) or a **vertex buffer**. This allows developers to integrate Nuklear into any rendering environment, whether it is a software-based frame buffer or a hardware-accelerated API like OpenGL or Vulkan.

#### Core Components
- **Context Management**: Handles the lifecycle of the UI, including memory allocation and state transitions.
- **Input System**: A simple state-based system that consumes mouse, keyboard, and touch events.
- **Layout Engine**: A row-based layout system that supports static, dynamic, and variable-width widget placement.
- **Widget Library**: A comprehensive set of UI elements including buttons, sliders, properties, trees, and color pickers.
- **Draw Command Buffer**: An output queue that stores primitive drawing instructions for the backend.
- **Optional Modules**: Includes a font baker (stb_truetype) and a vertex buffer converter for GPU-based rendering.

### Use Cases

This library is ideal for:

- **Embedded Systems**: Creating lightweight, skinnable interfaces on microcontrollers with limited memory and no standard C library.
- **Game Development Tools**: Building in-game debug menus, editors, and HUDs without the overhead of a heavy GUI framework.
- **Cross-Platform Desktop Apps**: Developing small, portable utilities that need to run on Windows, macOS, and Linux with minimal binary size.
- **Legacy Systems**: Implementing modern UI features on older platforms that only support C89/ANSI C compilers.
- **Real-Time Applications**: Scenarios where the UI must be updated every frame in sync with a simulation or rendering loop.

### Getting Started

To integrate Nuklear, include the `nuklear.h` header in your project. In exactly one C or C++ file, define `NK_IMPLEMENTATION` before including the header to generate the implementation code. You must also decide on your memory and feature requirements by defining optional macros such as `NK_INCLUDE_FIXED_TYPES` or `NK_INCLUDE_DEFAULT_ALLOCATOR`.

Initialization typically involves setting up a `nk_context` using `nk_init_fixed` (for manual memory) or `nk_init_default`. During your application's main loop, you pass input events to the context, wrap your UI code between `nk_begin` and `nk_end` calls, and finally iterate through the command buffer to render the generated shapes using your platform's specific drawing API. Detailed API documentation and examples for various backends are available in the [official documentation](https://Immediate-Mode-UI.github.io/Nuklear/).
