---
title: 'Nesper: Nim Wrappers for ESP-IDF'
summary: Nesper provides Nim language wrappers for the ESP-IDF SDK, enabling developers
  to program ESP32 microcontrollers using Nim. It leverages Nim's ARC garbage collector
  and provides high-level interfaces for FreeRTOS, LwIP, and various ESP32 hardware
  peripherals.
slug: nesper-nim-wrappers-for-esp-idf
codeUrl: https://github.com/elcritch/nesper
star: 230
version: v0.8.1
lastUpdated: '2025-12-03'
rtos: freertos
libraries:
- lwip
- nimble
topics:
- esp-idf
- esp32
- freertos
- nesper
- nim
isShow: false
createdAt: '2025-12-31'
updatedAt: '2025-12-31'
relatedProjects:
- micropython-and-lvgl-firmware-for-esp32
- klipper-esp32
- openrouter-esp-idf-client
- zig-language-toolchain-for-esp-idf
- lua-rtos-for-esp32
- r2p2-esp32-ruby-rapid-portable-platform-for-esp32
---

Nesper is a library designed to bring the power and elegance of the Nim programming language to the ESP32 ecosystem. By building on top of the official `esp-idf` SDK, Nesper allows developers to leverage Nim's modern features—such as the ARC garbage collector, async/await support, and powerful macros—while maintaining full compatibility with the underlying FreeRTOS and LwIP stacks.

## Why Nim for ESP32?

Programming for embedded systems often involves a trade-off between the low-level control of C/C++ and the developer productivity of high-level languages like Python. Nesper positions Nim as a middle ground. Nim compiles directly to C, ensuring high performance and efficiency, while providing a much cleaner syntax and safer memory management. The introduction of the ARC (Automatic Reference Counting) garbage collector is a game-changer for embedded targets, as it provides deterministic memory management without the overhead or "stop-the-world" pauses of traditional GCs.

## Key Features and Capabilities

Nesper provides a comprehensive set of wrappers for the most commonly used ESP-IDF modules. While many of the underlying C APIs are imported directly, Nesper often provides "Nim-ified" interfaces that feel more natural to Nim developers.

- **Networking**: Full support for Nim's standard library POSIX network APIs, backed by LwIP. This includes support for asynchronous HTTP servers.
- **RTOS Integration**: Deep integration with FreeRTOS, including wrappers for tasks, semaphores, mutexes, and queues. Nim's standard library thread APIs can be used by including `pthread` in the build configuration.
- **Hardware Drivers**: High-level, type-safe wrappers for GPIO, UART, I2C, and SPI. For example, GPIO configuration uses Nim's set notation for defining pin groups.
- **Storage**: Support for NVS (Non-Volatile Storage) and Virtual FAT filesystems with wear leveling, allowing standard Nim file operations like `writeFile` and `readFile` to work on internal flash.

## Technical Implementation

The project uses `c2nim` to generate bindings for ESP-IDF headers. It distinguishes between raw C wrappers (usually in snake_case) and Nim-friendly APIs (usually in camelCase). The build system is integrated with Nimble, Nim's package manager, and provides custom tasks for setting up the ESP-IDF environment, compiling Nim code to C, and flashing the resulting firmware to the board.

## Example: Async HTTP Server

One of the most powerful aspects of Nesper is the ability to run Nim's asynchronous standard library on an ESP32. Below is an example of a simple HTTP server that toggles a GPIO pin:

```nim
import asynchttpserver, asyncdispatch, net
import nesper, nesper/consts, nesper/general, nesper/gpios

const MY_PIN_A* = gpio_num_t(4)

proc http_cb*(req: Request) {.async.} =
    MY_PIN_A.setLevel(not MY_PIN_A.getLevel())
    await req.respond(Http200, "Pin Toggled")

proc run_http_server*() {.exportc.} =
    {MY_PIN_A}.configure(MODE_OUTPUT)
    var server = newAsyncHttpServer()
    waitFor server.serve(Port(8181), http_cb)
```

## Getting Started

To use Nesper, developers need a working Nim installation and the ESP-IDF SDK (v4.0 or v5.5 are recommended). The project provides a set of Nimble tasks to automate the boilerplate, such as `nim espSetup` to generate the necessary CMakeLists.txt and main entry points. Once configured, the standard `idf.py` toolchain is used to flash and monitor the device, ensuring compatibility with existing ESP32 development workflows.
