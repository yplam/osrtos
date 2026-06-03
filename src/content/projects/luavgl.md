---
title: luavgl
summary: A Lua wrapper for the LVGL graphics library that provides object-oriented
  widget management and class inheritance. It enables rapid UI development for embedded
  systems and includes a cross-platform PC simulator for testing.
slug: luavgl
codeUrl: https://github.com/XuNeo/luavgl
star: 96
version: v0.1.0
lastUpdated: '2025-09-29'
rtos: nuttx
libraries:
- lvgl
topics:
- binding
- embbeded
- gui
- littlevgl
- lua
- luavgl
- lvgl
- nuttx
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- lvgl-c-binding
- lvglpp-a-c-wrapper-for-lvgl
- eclipse-simulator-for-lvgl-using-sdl
- lvgl-emscripten-port
- lvgl-micropython-bindings
- lvgl-rust-bindings
---

## Overview

luavgl provides a powerful bridge between the Lua scripting language and the Light and Versatile Graphics Library (LVGL). By combining the performance of LVGL's C core with the flexibility of Lua, developers can create sophisticated embedded user interfaces with less boilerplate and significantly faster iteration cycles. 

The project is designed as a wrapper around LVGL core functions and widgets, specifically focusing on implementing class inheritance—a concept LVGL approaches in C, but which Lua handles natively and elegantly. This allows developers to extend widgets and manage UI state using standard Lua patterns.

## Key Features and Architecture

Unlike some bindings that simply map C functions to Lua, luavgl is built with an object-oriented mindset. It allows for smooth widget inheritance and property management using Lua tables, making the code more readable and maintainable.

**Core Capabilities:**
- **Widget Management**: Create and manipulate LVGL objects (Labels, Images, Buttons, etc.) directly from Lua using a declarative syntax.
- **Flex Layout Support**: Native support for LVGL's flexbox-style layouts, allowing for responsive UI design directly within scripts.
- **Animation Engine**: A simplified API for creating animations on objects, including support for easing paths like "bounce" and custom execution callbacks.
- **Custom Widgets**: Support for registering custom C-based widgets into the Lua environment, allowing them to be used just like core LVGL components.
- **LuaJIT Compatibility**: Through the use of `lua-compat-5.3`, the library can run on LuaJIT for high-performance requirements on capable hardware.

## Technical Integration

luavgl is intended to be integrated into an existing embedded environment. It does not handle low-level hardware initialization (such as display drivers or touch input); instead, it assumes that LVGL and a Lua interpreter are already initialized on the target system. Once the environment is ready, the `luavgl` module is registered to the global package table using standard Lua C-API calls.

For developers targeting specific RTOS environments, the project has been successfully tested with **NuttX**, and dedicated example repositories are available to demonstrate this integration in a real-world RTOS context.

## Development and Simulation

To streamline the development process, luavgl includes a PC-based simulator. This allows developers to write and test their Lua UI scripts on Linux or macOS before deploying to actual hardware. The simulator can be built using either CMake or xmake. The xmake integration is particularly useful as it automatically handles dependencies like SDL2 and Lua via its package manager.

## Example Usage

The following snippet demonstrates how luavgl simplifies UI creation compared to standard C code, utilizing table-based property setting and nested object creation:

```lua
local root = lvgl.Object()
root:set { w = lvgl.HOR_RES(), h = lvgl.VER_RES() }

-- Create a label with custom font and alignment
local label = root:Label {
    text = "Hello luavgl",
    text_font = lvgl.Font("montserrat", 24, "normal"),
    align = {
        type = lvgl.ALIGN.CENTER,
        y_ofs = 50,
    }
}

-- Add an animation to an image
local img = root:Image {
    src = "res/logo.png",
    align = lvgl.ALIGN.CENTER
}

img:Anim {
    run = true,
    start_value = 0,
    end_value = 3600,
    duration = 2000,
    repeat_count = 2,
    path = "bounce",
    exec_cb = function(obj, value)
        obj:set { angle = value }
    end
}
```

## Getting Started

To use luavgl, you must clone the repository recursively to include the LVGL submodules. For embedded targets, add `src/luavgl.c` to your build system and ensure `luaopen_luavgl` is called during your application's initialization. For PC development, the simulator provides a ready-to-go environment to preview scripts, debug UI logic, and even test complex interactions like the included Flappy Bird game example.
