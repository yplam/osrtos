---
title: Pycopy
summary: A minimalist and lightweight Python 3 implementation optimized for microcontrollers
  and embedded systems. It provides a highly portable core written in C, supporting
  a wide range of architectures from STM32 and ESP32 to POSIX-compliant systems.
slug: pycopy
codeUrl: https://github.com/pfalcon/pycopy
siteUrl: https://pycopy.github.io/
star: 819
version: v3.6.1
lastUpdated: '2021-12-14'
rtos: ''
libraries:
- micropython
topics:
- embedded
- iot
- micropython
- micropython-ports
- minimalist
- minimalistic
- pycopy
- python
- suckless
- unbloated
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- pycopy-standard-library-pycopy-lib
- pikapython
- picoweb
- semito-v-micropython-compatibility-layer-mcl
- microdot
- micropython-esp32-ulp
---

Pycopy is a minimalist, lightweight, and extensible implementation of the Python programming language, specifically designed to scale from powerful cloud servers down to resource-constrained microcontrollers. Originally based on MicroPython, Pycopy follows a philosophy of simplicity and efficiency, aiming to provide a "core" Python experience that is both powerful and small enough for embedded use.

### The Pycopy Philosophy

The project is guided by the "Pycopy Zen," which emphasizes minimalism and light-weightedness. Unlike larger Python implementations that include extensive standard libraries in the core, Pycopy maintains a well-defined, lightweight core written in C. Additional functionality is provided through optional modules and separate projects like `pycopy-lib`, allowing developers to tailor the environment to their specific hardware constraints. This multi-level approach ensures that the core remains efficient while still being compatible with the wider Python ecosystem.

### Language Support and Features

Despite its small footprint, Pycopy implements the entire Python 3.4 syntax, including exceptions, `with` statements, `yield from`, and classes. It also incorporates the `async` and `await` keywords from Python 3.5, making it suitable for modern asynchronous programming in embedded contexts. 

Core datatypes provided include:
- `str` (with basic Unicode support) and `bytes`
- `list`, `dict`, `set`, and `frozenset`
- `bytearray` and `array.array` for memory-efficient data handling
- `collections.namedtuple` and standard classes/instances

### Hardware and Portability

One of Pycopy's greatest strengths is its portability. The repository includes support for a wide variety of platforms:
- **Microcontrollers**: STM32 (PyBoard), ESP8266, ESP32, Nordic nRF51/nRF52, and TI CC3200.
- **Desktop and Server**: Linux, macOS, FreeBSD, and Windows.
- **Mobile**: Android (via the reference Unix port).
- **Bare Metal**: A minimal port is provided as a template for developers looking to bring Pycopy to new microcontroller architectures.

### Development Tools and Workflow

Pycopy includes `mpy-cross`, a cross-compiler that converts Python scripts into precompiled bytecode (.mpy files). This bytecode can be "frozen" into the firmware executable, which significantly reduces RAM usage and startup time on microcontrollers by allowing the code to execute directly from flash memory.

For package management, Pycopy features `upip`, a lightweight tool compatible with PyPI. This allows developers to install standard library modules and third-party packages directly onto the target device. 

### Extensibility and Performance

The project encourages the use of a Foreign Function Interface (FFI) to interact with non-Python libraries, rather than writing extensive C extensions. This approach keeps the core runtime clean while allowing deep integration with system-level features. For performance-critical applications, Pycopy supports inplace, buffer, and stream operations to minimize memory allocation and garbage collection overhead.
