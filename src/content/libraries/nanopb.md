---
title: nanopb
slug: nanopb
summary: Nanopb is a lightweight, ANSI C implementation of Google Protocol Buffers
  optimized for microcontrollers and memory-constrained systems. It enables efficient
  serialization and deserialization by generating C code from .proto files, supporting
  static memory allocation to eliminate the need for dynamic memory management.
codeUrl: https://github.com/nanopb/nanopb
siteUrl: https://jpa.kapsi.fi/nanopb/
star: 5258
version: nanopb-0.4.9.1
lastUpdated: '2026-03-03'
components:
- gRPC
platforms:
- ARM Cortex-M
- AVR
- Linux
- Windows
- macOS
- STM32
- POSIX
- x86
- x86_64
licenses:
- Zlib
libraryType: Middleware
createdAt: '2025-11-30'
updatedAt: '2026-03-17'
---

### Features


- Small code footprint (5–20 kB) and low RAM usage (typically ~1 kB stack).

- Pure ANSI C runtime for maximum portability across different compilers and platforms.

- Support for static allocation of strings and arrays via maximum size specifications.

- No mandatory dependency on malloc, though optional support is available.

- Compatible with standard Protocol Buffers .proto file format and version 3 syntax.

- Python-based generator for creating .pb.c and .pb.h files from protocol definitions.

- Lightweight stream-based abstraction for reading and writing encoded data.

- Callback mechanism for handling messages or fields larger than available RAM.

- Support for most protobuf features including nested submessages, oneofs, and extensions.

- Native integration with Zephyr RTOS and Arduino platforms.

- Customizable header generation using .options files for field-level configuration.

- Support for gRPC through generated service descriptors.

- Extensive test suite with support for hardware-in-the-loop testing on STM32 and AVR.

- Multiple build system support including CMake, Bazel, Meson, SCons, and Make.

- Ability to use encoder or decoder independently to reduce binary size.

- Static assertions at compile time to verify structure sizes and configuration.



### Architecture
Nanopb follows a dual-component architecture consisting of a compile-time code generator and a lightweight C runtime library. The generator, written in Python, leverages the standard Google `protoc` compiler to parse `.proto` files and produces C source (`.pb.c`) and header (`.pb.h`) files. These generated files contain message structures and field descriptors (`pb_msgdesc_t`) that define the layout and types of the data. The runtime library is designed for portability and minimal resource usage, providing the core logic for encoding and decoding through a stream-based abstraction.

The system is built around the concept of static memory management. By using `.options` files, developers can specify maximum sizes for variable-length fields, allowing the generator to produce C structures that can be allocated on the stack or in static memory. The runtime interacts with data through `pb_ostream_t` and `pb_istream_t` structures, which use callback functions to handle data I/O, enabling the processing of messages that are larger than the available RAM.

#### Core Components
- **pb_common.c/h**: Contains shared functions and types used by both the encoder and decoder.
- **pb_encode.c/h**: Implements the serialization logic for converting C structures into Protocol Buffers format.
- **pb_decode.c/h**: Implements the deserialization logic for parsing Protocol Buffers data into C structures.
- **nanopb_generator.py**: The Python script that transforms `.proto` definitions into C code.


### Use Cases
This library is ideal for:
- **IoT Sensor Data**: Efficiently serializing sensor readings for transmission over low-bandwidth networks like LoRaWAN or NB-IoT.
- **Configuration Management**: Storing and retrieving device settings in non-volatile storage using a structured and version-compatible format.
- **Inter-processor Communication**: Exchanging structured data between a main application processor and a low-power co-processor or peripheral.
- **Bootloaders and Firmware Updates**: Implementing robust update protocols where code space is extremely limited and reliability is critical.
- **gRPC for Embedded**: Providing lightweight gRPC service implementations on resource-constrained microcontrollers.
- **Telemetry Systems**: Streaming real-time diagnostic data from embedded systems to remote monitoring platforms.


### Getting Started
To begin using Nanopb, first ensure you have the necessary dependencies by running `pip install protobuf grpcio-tools`. Define your data structures in a `.proto` file, then use the `nanopb_generator.py` script to generate the C source and header files for your project. Integrate the core library files—`pb_encode.c`, `pb_decode.c`, and `pb_common.c`—into your build system (e.g., CMake, Make, or Zephyr).

Detailed documentation, including API references and advanced configuration options, is available at the official Nanopb documentation site: https://jpa.kapsi.fi/nanopb/docs/. For practical examples, the `examples/simple` directory in the repository provides a complete working demonstration of the encoding and decoding process.
