---
title: ESP 4diac FORTE Library
summary: A standard ESP-IDF component that integrates the 4diac FORTE open-source
  PLC runtime framework for ESP32 and ESP32-S2 microcontrollers. It utilizes FreeRTOS
  and LwIP to provide an IEC 61499 compliant execution environment for distributed
  industrial control applications.
slug: esp-4diac-forte-library
codeUrl: https://github.com/hikiku/esp-4diac-forte
siteUrl: https://www.eclipse.org/4diac/en_rte.php
lastUpdated: '2024-02-04'
licenses:
- EPL-2.0
image: /202603/esp-4diac-forte_1.avif
rtos: freertos
libraries:
- lwip
- spiffs
topics:
- 4diac
- esp
- esp-idf
- esp-idf-component
- esp32
- forte
- iec-61499
- iec61499
- iot
- iot-device
isShow: true
createdAt: '2026-03-31'
updatedAt: '2026-03-31'
---

The ESP 4diac FORTE Library brings the power of the IEC 61499 standard to the Espressif ecosystem. 4diac FORTE is an open-source PLC (Programmable Logic Controller) runtime framework designed for distributed automation. By packaging this framework as a standard ESP-IDF component, this project enables developers to execute complex control logic on affordable ESP32 and ESP32-S2 hardware, leveraging the underlying FreeRTOS and LwIP stacks for multitasking and networking.

## Overview and Requirements

This library is built upon the foundation of 4diac FORTE for FreeRTOS and LwIP, specifically tailored for the ESP32 platform. It allows for the execution of Function Blocks, the core unit of IEC 61499, directly on the microcontroller. To use this repository, developers need a Linux-based environment (Ubuntu, Debian, or Arch), Visual Studio Code with the Espressif IDF extension, and standard build tools including Git, Make, and CMake.

## Compiling 4diac FORTE to a Static Library

The integration process begins by compiling the 4diac FORTE source code into a static library (`.a` file) that the ESP-IDF build system can link against. This involves a cross-compilation workflow using CMake-GUI.


During the setup, users must specify options for cross-compiling and point the configuration to the Xtensa GCC and G++ compilers provided by the Espressif toolchain. The target architecture is set to `FreeRTOSLwIP`, which triggers the inclusion of specific networking and threading logic compatible with the ESP32 environment.

### Configuration Details

Configuring the build requires setting several critical variables in CMake:
- **FORTE_ARCHITECTURE**: Must be set to `FreeRTOSLwIP`.
- **Include Paths**: The `FORTE_FreeRTOSLwIP_INCLUDES` variable must be populated with absolute paths to the various FreeRTOS and LwIP headers within the ESP-IDF directory.
- **Compiler Flags**: Specific flags such as `-mlongcalls`, `-ffunction-sections`, and `-fno-exceptions` are required to ensure the resulting binary runs correctly on the Xtensa architecture.
- **Build Type**: Setting the library to build as a static library rather than an executable is mandatory for component integration.

![Successful compilation of the FORTE static library](/202603/esp-4diac-forte_6.avif)

Once generated, the `make` command produces `libforte-static.a`, which is the core binary used by the ESP component.

## Integrating with ESP-IDF

After the static library is built, it is added to the `esp-4diac-forte` component directory. The project suggests using symbolic links to reference the library, ensuring that any future rebuilds of the FORTE core are automatically reflected in the ESP-IDF project without manual file copying. The component's `CMakeLists.txt` handles the registration and linking of this prebuilt library to the main application.

## Testing the Application

The repository includes a sample application, `TestApplication`, located in the `test_apps` directory. This sample serves as a template for deploying a 4diac FORTE runtime on the device. It includes configurations for Wi-Fi softAP mode, allowing the ESP32 to act as a network node for the PLC runtime.

To run the test, developers use the standard ESP-IDF workflow: setting the target device, configuring the SPI flash and partition table, and then building, flashing, and monitoring the project. When successful, the serial monitor displays the initialization of the Wi-Fi interface followed by the FORTE runtime start-up sequence, signaling that the device is ready to receive and execute IEC 61499 control applications.
