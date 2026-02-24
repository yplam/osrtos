---
title: AWTK = Toolkit AnyWhere
slug: awtk
summary: AWTK (Toolkit AnyWhere) is a high-performance, cross-platform GUI engine
  designed for a wide range of devices from low-end Cortex-M3 microcontrollers to
  high-end desktop and mobile systems. It features a decoupled MVVM architecture,
  hardware acceleration support, and a comprehensive suite of tools including a visual
  UI designer and multi-language bindings.
codeUrl: https://github.com/zlgopen/awtk
siteUrl: https://awtk.zlg.cn
star: 3296
lastUpdated: '2026-02-06'
components:
- GUI
- FileSystem
- Graphics
- Audio
- Database
- Network
- HTTP
- FTP
- TCP
- UDP
- Shell
- Profiling
platforms:
- ARM Cortex-M
- ARM Cortex-A
- x86
- x86_64
- Linux
- Windows
- macOS
- POSIX
- Android
- iOS
- QEMU
licenses:
- LGPL
- LGPL-2.1
libraryType: GUI
createdAt: '2025-12-23'
updatedAt: '2026-02-24'
---

### Features


- Cross-platform compatibility with RTOS, Linux, Windows, macOS, Android, iOS, HarmonyOS, and Web.

- Optimized rendering using dirty rectangle algorithms to minimize screen updates and CPU load.

- Support for triple buffering to achieve high frame rates and eliminate screen tearing.

- Hardware acceleration via OpenGL, DirectX, Vulkan, Metal, and platform-specific 2D engines like DMA2D and PXP.

- Efficient binary formats for UI descriptions and themes to ensure fast loading and low memory footprint.

- Extensive widget library with support for PNG, JPG, GIF, and SVG image formats.

- Built-in MVVM framework for clean separation of UI design and application business logic.

- Native bindings for multiple programming languages including C, C++, Go, Python, Lua, Java, and JavaScript.

- Internationalization support including Unicode, bidirectional text, and input method engines.

- Visual UI design tool (AWTK Designer) for drag-and-drop development and resource management.

- Static and dynamic code analysis integration with cppcheck, Facebook Infer, and Valgrind.

- Support for both bitmap and vector fonts with customizable loaders.

- Window and widget animation systems for fluid user interfaces.

- Scalable architecture suitable for resource-constrained Cortex-M3 devices up to high-end CPUs.

- Support for no-filesystem platforms and custom filesystem implementations.

- Integrated basic tool library including lists, arrays, event emitters, mutexes, and threads.



### Architecture

AWTK is designed with a highly modular and layered architecture that ensures portability across diverse hardware environments. At its core is a cross-platform abstraction layer that handles OS services (threads, mutexes, file systems) and hardware-specific interfaces (LCD, input methods). The engine utilizes a declarative UI description language, which is parsed into efficient binary formats for runtime execution, minimizing memory overhead on resource-constrained devices.

The system is built around a robust rendering pipeline that supports both software rendering and hardware acceleration. It employs a dirty rectangle algorithm to optimize screen updates, ensuring that only modified areas of the UI are redrawn. A unique aspect of AWTK is its integrated MVVM (Model-View-ViewModel) framework, which provides a strict separation between the user interface and business logic. This is facilitated by a data-binding engine that synchronizes the View and Model through a ViewModel, allowing developers to update the UI without direct API calls to the GUI engine.

#### Core Components
- **Window Manager**: Handles window lifecycle, focus management, and event dispatching.
- **Widget Library**: A comprehensive set of UI elements including buttons, lists, charts, and edit boxes.
- **Graphics Engine**: Supports vector graphics, bitmap rendering, and multiple image/font formats.
- **Binding Generator**: An IDL-based tool that automatically generates native bindings for languages like Python, Lua, and JavaScript.
- **AWTK Designer**: A visual design environment that allows for drag-and-drop UI construction and resource packaging.

### Use Cases

This library is ideal for:
- **Industrial Control**: Developing high-reliability HMIs for factory automation and monitoring systems.
- **Smart Home Appliances**: Creating fluid, touch-based interfaces for thermostats, ovens, and home hubs on Cortex-M microcontrollers.
- **Medical Devices**: Building precise and stable user interfaces for diagnostic equipment requiring high graphical fidelity.
- **Cross-Platform Desktop Tools**: Developing lightweight utilities that need to run natively on Windows, macOS, and Linux from a single codebase.
- **IoT Gateways**: Implementing local management interfaces on embedded Linux or RTOS-based edge devices.
- **Mobile Applications**: Rapidly prototyping and deploying apps for Android and iOS using a unified C or JavaScript logic base.

### Getting Started

To begin developing with AWTK, developers should first clone the main repository and its submodules. The build system is based on **SCons**, requiring Python and SCons to be installed on the host machine. For desktop simulation, AWTK supports Windows (Visual Studio), Linux (GCC), and macOS (Clang). After running the initial build, developers can execute the provided `demoui` in the `bin` directory to verify the environment. 

For UI design, it is highly recommended to use **AWTK Designer**, which eliminates the need to manually write XML UI descriptions. Comprehensive documentation, including API references, porting guides, and MVVM tutorials, is available in the `docs` folder of the repository and through the official AWTK online documentation portal at [https://awtk.zlg.cn/docs](https://awtk.zlg.cn/docs).
