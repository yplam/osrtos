---
title: ESP32 RISC-V Bare-Metal SDK
summary: A minimal bare-metal SDK for Espressif RISC-V microcontrollers, specifically
  the ESP32-C6 and ESP32-P4, designed to operate independently of the ESP-IDF framework.
  It provides low-level hardware access through direct register-level programming,
  custom startup code, and linker scripts while integrating the lwIP and NimBLE stacks
  for networking and Bluetooth functionality.
slug: esp32-risc-v-bare-metal-sdk
codeUrl: https://github.com/pdlsurya/esp32-riscv-bare-metal-sdk
lastUpdated: '2026-06-08'
licenses:
- MIT
rtos: ''
libraries:
- lwip
- nimble
topics:
- bare-metal-programming
- esp32
- esp32-c6
- esp32-p4
- microcontroller
- risc-v
- riscv
- sdk
isShow: false
createdAt: '2026-06-12T00:50:33+00:00'
updatedAt: '2026-06-12T00:50:33+00:00'
relatedProjects:
- blinky-pico-2-dual-core-bare-metal
- stm32f1xx-bare-metal-template
- bare-metal-programming-guide
- micropython-for-bare-metal-raspberry-pi
- stm32-bare-metal-learning-labs
- ameba-rtos-sdk
---

Developing for Espressif's RISC-V microcontrollers typically involves the robust but heavy ESP-IDF framework. For developers seeking a leaner approach or those who need absolute control over the hardware, the ESP32 RISC-V Bare-Metal SDK offers a compelling alternative. This SDK provides a minimal development environment that bypasses the standard ESP-IDF entirely, allowing for direct register-level programming and custom runtime environments.

## Low-Level Control and Architecture

The core philosophy of this SDK is to provide a thin layer over the hardware. It avoids the complexity of a second-stage bootloader by utilizing direct boot modes and provides its own custom startup code and linker scripts. This approach is ideal for high-performance applications where every cycle counts or for learning the intricacies of the RISC-V architecture as implemented by Espressif.

Currently, the SDK supports two primary SoCs:
- **ESP32-C6**: A WiFi and BLE-capable MCU.
- **ESP32-P4**: A high-performance application processor designed for more demanding tasks.

Because the SDK is bare-metal, it follows a polling-based main loop model. There is no mandatory RTOS dependency, though the project structure is flexible enough to allow for the integration of external schedulers if required. The runtime environment handles essential core platform tasks such as interrupt setup, timer management, and SoC-specific peripheral register access.

## Comprehensive Driver Support

Despite its minimal footprint, the SDK includes a wide array of drivers to facilitate rapid hardware bring-up. These drivers are designed with a focus on low-level access:

- **GPIO & Communication**: Standard drivers for GPIO (direction, pull-up/down), I2C master-mode transactions, and low-level SPI transfers.
- **UART**: Polling-based high-power UART support with configurable pin routing.
- **Audio & DMA**: An I2S driver featuring a TX path with DMA streaming support, enabling continuous PCM playback. This is complemented by an ES8311 codec driver for register-level initialization and playback control.
- **Storage**: Support for both SD/MMC and SD SPI paths, allowing for block reads and writes, alongside a custom FAT32 library (`sdFat32`) for basic file operations.
- **Visuals**: A WS2812 LED strip library that utilizes RMT or SPI backends for precise timing control.

## Networking and Bluetooth on ESP32-P4

One of the most impressive aspects of the SDK is its ability to host complex stacks without the standard ESP-IDF infrastructure. On the ESP32-P4 target, the SDK supports:

- **lwIP Hosted Networking**: A hosted station data path with DHCP flow, allowing for TCP/IP networking.
- **NimBLE Bluetooth**: The NimBLE host stack is integrated over an HCI transport, providing BLE functionality.
- **ESP-Hosted Integration**: It includes a host driver for co-processor integration via SDIO transport, managing both control and data channels.

## Development Workflow

The project utilizes modern build tools like CMake and Ninja. It is designed to be used either as a standalone repository for the provided examples or as a dependency for external projects. For those who prefer containerized environments, the SDK includes Docker support to ensure reproducible builds across different host systems.

To integrate the SDK into an external project, developers can point their CMake configuration to the SDK path. A typical minimal `CMakeLists.txt` for an application looks like this:

```cmake
cmake_minimum_required(VERSION 3.13)

# Set path to the bare-metal SDK
set(SDK_PATH "/path/to/esp32-rv-bare-metal-sdk")
set(TARGET_SOC "esp32c6" CACHE STRING "Target SOC")
set(CMAKE_TOOLCHAIN_FILE "${SDK_PATH}/cmake/toolchain-${TARGET_SOC}.cmake")

project(my_bare_metal_app LANGUAGES C ASM)

include(${SDK_PATH}/cmake/sdk-utils.cmake)
add_executable(app.elf main.c)

sdk_config(app.elf)
add_extra_outputs(app.elf)
```

By providing the necessary HAL headers and register definitions (adapted from ESP-IDF for accuracy), this SDK empowers developers to build efficient, independent firmware for the latest generation of Espressif RISC-V hardware.
