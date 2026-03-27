---
title: EasyLogger
slug: easylogger
summary: EasyLogger is an ultra-lightweight, high-performance C/C++ logging library
  specifically designed for resource-constrained IoT and embedded systems. It provides
  a flexible, thread-safe logging framework with support for dynamic filtering, multiple
  output modes including asynchronous and buffered, and extensibility through specialized
  plugins for Flash storage and file rotation.
codeUrl: https://github.com/armink/EasyLogger
siteUrl: https://github.com/armink/EasyLogger
star: 4514
version: 2.2.0
lastUpdated: '2024-12-26'
components:
- Storage
- FileSystem
- Shell
platforms:
- ARM
- Linux
- Windows
- POSIX
- Native
licenses:
- MIT
libraryType: Tracing
createdAt: '2024-12-26'
updatedAt: '2026-03-27'
---

### Features


- Extremely small footprint with ROM usage under 1.6KB and RAM usage under 0.3KB.

- Supports multiple log levels including Assert, Error, Warn, Info, Debug, and Verbose.

- Thread-safe design ensuring log integrity in multi-threaded environments.

- Dynamic runtime filtering based on tags, log levels, and keywords.

- Static compile-time filtering via macros to minimize code size in production builds.

- Supports asynchronous output mode to prevent logging from blocking time-critical application execution.

- Buffered output mode to improve performance by reducing the frequency of physical I/O operations.

- Color-coded log output for enhanced readability in supported terminal emulators.

- Supports RAW format and hexdump for logging binary or unformatted data.

- Extensible architecture allowing for custom output methods like serial, Flash, or network.

- Independent output format configuration for each priority level (time, tag, level, thread, etc.).

- Built-in assertion system with support for custom hook functions for error handling.

- Plugin support for direct Flash storage without a file system via the EasyFlash library.

- Plugin support for file rotation and circular logging in file-system-based environments.

- Compatible with RT-Thread, uC/OS, Linux, Windows, Nuttx, and bare-metal platforms.



### Architecture

EasyLogger is designed with a modular and layered architecture to ensure high performance and portability across diverse embedded environments. The core of the library is the **Kernel**, which manages log levels, dynamic filtering (by tag, level, or keyword), and formatting logic. It utilizes a singleton pattern for global configuration, allowing users to define output formats and filtering rules that apply across the entire system. The kernel is designed to be extremely lean, minimizing the overhead of log processing before it reaches the output stage.

To facilitate hardware and OS independence, EasyLogger employs a **Porting Layer** (`elog_port.c`). This layer abstracts platform-specific functionalities such as output locking (mutexes or interrupt disabling), time retrieval, and the final output interface (e.g., UART, File, or Flash). Furthermore, the library supports **Asynchronous and Buffered Modes** through optional modules, which decouple the logging call from the physical I/O operation using internal buffers and dedicated tasks. The system is highly extensible via a **Plugin System**, which allows developers to add complex features like Flash-based circular logging or file rotation without bloating the core kernel.

### Use Cases

This library is ideal for:

- **IoT and Wearable Devices**: Resource-constrained devices requiring a logging system with a minimal ROM/RAM footprint.
- **Industrial Controllers**: Systems needing thread-safe logging to track state changes and errors across multiple concurrent tasks.
- **Bare-Metal Embedded Systems**: Applications without an operating system that require a simple, reliable way to output debug information via UART.
- **Flash-Based Data Logging**: Devices without a file system that need to store historical logs directly into Flash memory for post-mortem analysis.
- **Multi-Platform Development**: Projects that are developed on Windows/Linux simulators but deployed on ARM-based hardware, benefiting from consistent logging APIs.
- **High-Performance Applications**: Systems where logging must not block the main execution flow, utilizing the asynchronous output mode.

### Getting Started

To integrate EasyLogger, developers should first include the source files and the `inc` directory in their project build system. The porting process involves implementing the functions in `elog_port.c`, specifically `elog_port_output` for the physical data transmission and `elog_port_output_lock/unlock` for thread safety. Configuration is handled in `elog_cfg.h`, where users can enable features like asynchronous output or color support. A typical initialization sequence involves calling `elog_init()`, configuring the desired log format for each level using `elog_set_fmt()`, and finally invoking `elog_start()` to enable output. For detailed API usage and porting examples for platforms like RT-Thread or STM32, refer to the documentation in the `docs/zh/` directory of the repository.
