---
title: CMSIS-DAP over TCP for ESP32
summary: A firmware implementation for ESP32 that enables remote ARM microcontroller
  debugging and flashing via the CMSIS-DAP protocol over TCP/IP. It supports both
  JTAG and SWD interfaces, allowing OpenOCD to connect to target hardware over WiFi.
  The project includes a UART-to-TCP bridge for remote serial console access.
slug: cmsis-dap-over-tcp-for-esp32
codeUrl: https://github.com/bkuschak/cmsis_dap_tcp_esp32
star: 10
lastUpdated: '2025-09-28'
rtos: freertos
libraries:
- lwip
topics:
- arm
- cmsis-dap
- cmsis-dap-v2
- debugger
- esp-idf
- esp32
- esp32c6
- esp32s3
- esp32s3-devkitc-1
- flash
- jtag
- jtag-adapter
- jtag-probe
- openocd
- programmer
- swd
- swd-probe
isShow: true
image: /202602/cmsis_dap_tcp_diagram.webp
createdAt: '2026-02-03'
updatedAt: '2026-02-03'
relatedProjects:
- esp32-wifi-logger
- airfrog
- esp32-usb-over-ip
- ip-over-usb
- esp32-bus-expander
- esp32-bus-pirate
---

## Overview

Debugging and flashing ARM microcontrollers typically requires a local USB connection to a JTAG or SWD programmer. The `cmsis_dap_tcp_esp32` project changes this paradigm by implementing the CMSIS-DAP protocol over TCP/IP. By using an ESP32 as a remote programmer, developers can connect OpenOCD to a target board over a WiFi network, enabling remote firmware updates and real-time debugging without physical proximity to the hardware.

This project is particularly useful for hardware-in-the-loop (HIL) testing, remote laboratory setups, or debugging devices installed in hard-to-reach locations. It leverages the high-speed GPIO capabilities of the ESP32 to emulate the timing required for JTAG and SWD protocols while handling network communication via the ESP-IDF's networking stack.

## Key Features

- **Dual Protocol Support**: Full support for both JTAG (minimum 4 GPIOs) and the two-wire Serial Wire Debug (SWD) interface.
- **High Performance**: Achieves SRAM read/write speeds up to 200 KB/sec. Flashing a 512 KB image to an STM32F4 can be completed in approximately 13 to 20 seconds depending on the specific ESP32 variant used.
- **Integrated UART Bridge**: Includes a UART-to-TCP/IP bridge, allowing the target board's serial console to be accessed remotely via a pseudo-tty on the host machine.
- **Broad Hardware Compatibility**: Tested with modern ESP32 chips including the ESP32-C6 and ESP32-S3, targeting popular ARM platforms like the STM32 Blue Pill and Nucleo boards.
- **Configurable I/O**: GPIO assignments for SWCLK, SWDIO, TDI, TDO, and reset signals are fully configurable through the ESP-IDF menuconfig system.

## Technical Implementation

The project is built on the ESP-IDF framework and utilizes FreeRTOS for task management. The core CMSIS-DAP logic is derived from the official ARM CMSIS-DAP repository, with a modified `DAP_config.h` to map protocol actions to ESP32-specific GPIO operations. 

Communication with the host PC relies on a specific OpenOCD backend (`cmsis_dap_tcp`). Instead of looking for a USB device, OpenOCD initiates a TCP connection to the ESP32's IP address on a designated port (default 4441). The ESP32 then translates these network packets into bit-banged or peripheral-driven JTAG/SWD signals for the target microcontroller.

## Performance and Optimization

Performance is highly dependent on the ESP32's clock speed and WiFi signal quality. The ESP32-S3, running at 240 MHz, generally provides higher throughput compared to the ESP32-C6. To ensure stability on slower or congested networks, the project supports a `min_timeout` parameter in the OpenOCD configuration to prevent command mismatch errors during high-latency spikes.

### Example OpenOCD Configuration

To use the ESP32 as a remote programmer, the OpenOCD configuration file must be set to use the TCP backend:

```tcl
adapter driver cmsis-dap
cmsis-dap backend tcp
cmsis-dap tcp host 192.168.1.107
cmsis-dap tcp port 4441
transport select swd
```

## Getting Started

Building the firmware requires the ESP-IDF build toolchain. The project provides pre-configured `sdkconfig` files for common boards like the Xiao ESP32-C6 and ESP32-S3-DevKitC-1. Users can configure their WiFi credentials and GPIO assignments through the `idf.py menuconfig` interface under the "CMSIS-DAP configuration" menu. Once flashed, the ESP32 will output its IP address via the serial monitor, at which point it is ready to accept connections from a network-enabled OpenOCD instance.
