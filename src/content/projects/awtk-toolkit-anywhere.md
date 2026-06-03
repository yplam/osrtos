---
title: AWTK (Toolkit AnyWhere)
summary: AWTK is a high-performance, cross-platform GUI engine developed by ZLG for
  embedded systems, mobile, and desktop platforms. It features a powerful MVVM framework,
  support for multiple programming languages via IDL, and hardware acceleration for
  various GPUs and MCUs.
codeUrl: https://github.com/zlgopen/awtk
siteUrl: https://awtk.zlg.cn
isShow: false
rtos: ''
libraries:
- awtk
topics:
- djyos
- embedded
- gui
- liteos
- ms-rtos
- rt-thread
- stm32
- sylixos
- zephyr
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- luavgl
- gooey-gui-library
- eclipse-simulator-for-lvgl-using-sdl
- lvgl-port-for-arm-cortex-m55-and-mps3-an547
- awtk-fs-adapter
- micropython-and-lvgl-firmware-for-esp32
---

AWTK, which stands for **Toolkit AnyWhere**, is an open-source GUI engine developed by ZLG (ZhouLiGong). Designed with versatility in mind, it serves as a cross-platform solution for creating beautiful and efficient user interfaces across embedded systems, web browsers, mobile devices, and desktop environments. Beyond being a standalone library, AWTK is also the built-in GUI engine for AWorksOS, ZLG's IoT operating system.

## A Truly Cross-Platform Engine

One of AWTK's most significant strengths is its broad compatibility. The core code is designed to be portable, running seamlessly on Windows, Linux, MacOS, Android, iOS, and HarmonyOS. For embedded developers, it supports raw systems (bare metal) and various RTOS platforms. 

To facilitate this portability, AWTK includes a comprehensive library of basic tools, including:
- Dynamic arrays and linked lists
- UTF8 and wide-character string handling
- Event emitters and object systems
- File system abstractions and thread/mutex management
- Formula and string analysis utilities

## Performance and Efficiency

AWTK is optimized for resource-constrained embedded devices without sacrificing visual quality. It achieves high performance through several key techniques:
- **Dirty Rectangle Algorithm**: Only the parts of the screen that have changed are updated, significantly reducing CPU load.
- **GPU Acceleration**: It supports modern graphics APIs like OpenGL, DirectX, Vulkan, and Metal. For embedded hardware, it provides native support for NXP's PXP and STM32's DMA2D interfaces.
- **Efficient Formats**: UI descriptions and theme files are stored in binary formats for rapid parsing during runtime.
- **Multi-Framebuffer Support**: Optional support for up to three framebuffers ensures the highest possible frame rates and tear-free rendering.

## Developer-Centric Features

Developing with AWTK is streamlined by the **AWTK Designer**, a drag-and-drop UI design tool. This allows developers to create interfaces visually, eliminating the need to manually write XML. The engine uses a declarative UI description language, enabling complex features like window animations and widget transitions with minimal code.

For those who prefer languages other than C, AWTK uses an IDL (Interface Description Language) to generate native-style bindings for:
- C++
- Go
- Lua
- Java
- Python
- JavaScript (via JerryScript, QuickJS, or NodeJS)

## Architecture and Stability

Stability is a core pillar of the project. The AWTK team employs rigorous testing methodologies, including static analysis with `cppcheck` and Facebook `infer`, dynamic memory checking with `valgrind`, and a suite of approximately 20,000 lines of unit tests. 

Furthermore, AWTK implements a sophisticated **MVVM (Model-View-ViewModel) framework**. This framework thoroughly separates the user interface from the business logic, leading to cleaner codebases that are easier to maintain and port. The MVVM layer is remarkably lightweight, requiring only about 5,000 lines of code while maintaining high performance.

## Getting Started

AWTK uses the SCons build system for easy compilation across different environments. 

### Ubuntu Setup
To compile on Ubuntu (16.04 or later), you can install the necessary dependencies and build with:

```bash
sudo apt-get install gcc g++ scons libsndio-dev libgtk-3-dev libglu1-mesa libglu1-mesa-dev libgl1-mesa-glx libgl1-mesa-dev libasound2-dev libibus-1.0-dev fcitx-libs-dev git vim clang-format libharfbuzz-dev nodejs libreadline-dev
git clone https://github.com/zlgopen/awtk.git
cd awtk
scons
./bin/demoui
```

### Windows Setup
On Windows, ensure you have Python, SCons, and Visual Studio (2017 or later) installed. Then run:

```cmd
pip install pywin32
scons
bin\demoui
```

AWTK is licensed under LGPL 2.0, making it freely available for both open-source and commercial purposes.
