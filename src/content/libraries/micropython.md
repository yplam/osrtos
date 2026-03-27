---
title: MicroPython
slug: micropython
summary: MicroPython is a lean and efficient implementation of the Python 3 programming
  language specifically optimized to run on microcontrollers and constrained embedded
  environments. It provides a complete Python compiler and runtime, a cross-compiler
  for bytecode, and a robust set of hardware-abstraction modules, allowing developers
  to write high-level code for hardware with as little as 16kiB of RAM.
codeUrl: https://github.com/micropython/micropython
siteUrl: http://micropython.org/
star: 21582
version: v1.27.0
lastUpdated: '2026-03-20'
components:
- FileSystem
- Network
- Wireless
- Bluetooth
- BLE
- USBDevice
- CAN
- Shell
- TLS/SSL
- TCP
- UDP
- OTA
- Cryptography
platforms:
- ARM Cortex-M
- ARM Cortex-A
- RISC-V
- Xtensa
- x86
- x86_64
- PIC
- PowerPC
- QEMU
- Linux
- Windows
- macOS
- POSIX
- WebAssembly
licenses:
- MIT
libraryType: Language
createdAt: '2025-12-11'
updatedAt: '2026-03-27'
---

### Features


- Implements Python 3.4 syntax including exceptions, 'with', and 'yield from' statements.

- Supports 'async' and 'await' keywords from Python 3.5 for asynchronous programming.

- Includes a core Python compiler and runtime that can execute scripts directly on-device.

- Provides a cross-compiler (mpy-cross) to turn scripts into precompiled bytecode (.mpy) for faster execution.

- Supports freezing Python scripts into the firmware executable to significantly reduce memory usage.

- Offers hardware-specific modules for low-level control of GPIO, Timers, ADC, DAC, and PWM.

- Includes built-in support for communication protocols including SPI, I2C, UART, CAN, and I2S.

- Provides networking capabilities through dedicated socket, ssl, and network modules.

- Supports multithreading on select hardware ports via the _thread module.

- Includes a comprehensive asyncio implementation for cooperative multitasking.

- Features an interactive REPL (Read-Eval-Print Loop) for real-time programming and debugging.

- Supports on-device filesystems for script storage and data logging.

- Provides specialized modules for Bluetooth (BLE) and USB Device functionality.

- Allows extending the language with custom modules implemented in C via the extmod system.

- Includes advanced hardware support for Pulse Counters and Quadrature Encoders on specific architectures.

- Targets devices with as little as 256kiB flash and 16kiB RAM.



### Architecture

MicroPython is designed with a highly modular architecture that separates the core Python language implementation from platform-specific hardware logic. The system is centered around the **py/** directory, which contains the core compiler, runtime, and virtual machine (VM). This core is written in highly portable C and is responsible for parsing Python source code, generating bytecode, and managing the object model and garbage collection.

To support diverse hardware, MicroPython utilizes a **Ports** system. Each port (found in the `ports/` directory) contains the glue code necessary to interface the core VM with a specific microcontroller's Hardware Abstraction Layer (HAL) or an operating system. Additionally, the **extmod/** directory provides optional C-based modules that implement non-core functionality, such as filesystem support, networking stacks, and specialized hardware protocols, ensuring that the core remains lean while allowing for feature-rich builds.

#### Core Components
- **py/**: The core Python implementation, including the compiler, runtime, and core library.
- **mpy-cross/**: A cross-compiler tool used to pre-compile Python scripts into bytecode for embedded execution.
- **ports/**: Platform-specific code for various architectures (e.g., STM32, ESP32, RP2).
- **extmod/**: Non-core modules implemented in C for performance and hardware access.
- **lib/**: Submodules for external dependencies and vendor-provided HALs.

### Use Cases

This library is ideal for:

- **IoT Development**: Rapidly creating connected devices using high-level networking and security modules like `socket`, `ssl`, and `mqtt`.
- **Rapid Prototyping**: Using the interactive REPL to test hardware peripherals and logic in real-time without the need for a full compile-flash-reboot cycle.
- **Education**: Teaching Python programming and electronics simultaneously on affordable, physical hardware.
- **Industrial Automation**: Implementing complex control logic, sensor data processing, and communication protocols (CAN, Modbus) on robust microcontroller platforms.
- **Embedded Scripting**: Adding a user-accessible scripting interface to existing C/C++ projects by embedding the MicroPython engine.
- **Low-Power Monitoring**: Utilizing deep-sleep modes and hardware interrupts to create battery-operated sensor nodes.

### Getting Started

To begin developing with MicroPython, the first step is typically to build the cross-compiler by running `make` within the `mpy-cross/` directory. Following this, you can navigate to the specific port directory corresponding to your hardware (e.g., `ports/stm32/`) and run `make submodules` followed by `make` to generate the firmware image. Once flashed, the device provides a Read-Eval-Print Loop (REPL) over a serial connection, allowing for immediate Python command execution.

Comprehensive documentation, including API references for hardware-specific modules like `machine` and `network`, is available at the [official MicroPython documentation site](https://docs.micropython.org/). For community support and project discussions, developers are encouraged to use the [GitHub Discussions](https://github.com/micropython/micropython/discussions) and the official Discord server.
