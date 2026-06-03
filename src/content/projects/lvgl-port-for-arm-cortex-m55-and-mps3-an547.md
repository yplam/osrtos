---
title: LVGL Port for Arm Cortex-M55 and MPS3 (AN547)
summary: A professional LVGL port for the Arm Cortex-M55 processor, targeting the
  MPS3 FPGA prototyping board and the Corstone-300-FVP emulator. It features hardware
  acceleration using Arm-2D with Helium technology and supports the Ethos-U55 NPU
  for high-performance embedded graphics.
slug: lvgl-port-for-arm-cortex-m55-and-mps3-an547
codeUrl: https://github.com/lvgl/lv_port_an547_cm55_sim
star: 20
lastUpdated: '2024-12-02'
rtos: cmsis
libraries:
- lvgl
topics:
- arm
- arm-2d
- c
- cmsis
- cmsis-pack
- cortex-m
- cortex-m55
- emulation
- fvp
- gui
- helium
- lvgl
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- lvgl-port-for-stm32f429-discovery-kit
- lvgl-port-for-stm32f769-discovery
- lvgl-port-for-m5stack-core2
- lvgl-demo-embarcadores
- lvgl-port-for-raspberry-pi-pico-mdk-arm
- mbed-os-6-port-for-weact-stm32h743vit6
---

## Overview

The lv_port_mps3_an547_cm55 repository provides a comprehensive port of the LVGL (Light and Versatile Graphics Library) for the Arm Cortex-M55 processor. This project is specifically designed to run on the Arm MPS3 FPGA prototyping development board using the AN547 image. For developers without access to physical hardware, the project fully supports the Corstone-300 Fixed Virtual Platform (FVP), a free emulator that allows for functional verification of the firmware.

This port is particularly significant as it demonstrates the integration of LVGL 9.0.0-dev with modern Arm technologies, including Helium (M-Profile Vector Extension) and the Ethos-U55 Neural Processing Unit (NPU). It serves as both a production-ready template and an educational resource for high-performance embedded UI development.

## Key Features and Hardware Support

The project is built around the Cortex-M55 CPU, which includes advanced features like Helium technology, instruction and data caches, and tightly coupled memory (512KB ITCM and 512KB DTCM). The system typically runs at a default clock of 32MHz (up to 50MHz) and includes 4MB of SRAM and 1GB of DDR4 memory.

**Core features include:**
- **LVGL 9.0.0-dev Integration**: Utilizes the latest development version of LVGL via CMSIS-Packs.
- **Arm-2D Acceleration**: Leverages Helium technology to accelerate 2D graphics operations, significantly reducing CPU load for complex UI tasks.
- **Display Support**: Configured for a 320x240 RGB565 LCD display connected via an integrated color LCD parallel interface.
- **Ethos-U55 NPU**: Includes support for the dedicated NPU found in the Corstone-300 subsystem.
- **Keil MDK Integration**: Provides a ready-to-use project for Arm Compiler 6.

## Performance Acceleration with Arm-2D

A standout feature of this port is the inclusion of Arm-2D acceleration. By utilizing Helium-optimized kernels, the project achieves remarkable performance gains in graphical rendering. Benchmarks included in the repository show that for specific tasks like image chroma keying, the Arm-2D accelerated version can be nearly 10 times faster than the standard C implementation. This acceleration is seamlessly attached within the `lv_port_disp_template.c` file, allowing LVGL to offload heavy drawing tasks to the Helium-enabled vector engine.

## Simulation and Development

For developers using the Corstone-300-FVP, the project includes detailed instructions for setting up the model within the Keil MDK environment. The simulation environment allows for the verification of firmware functionality and UI layout before deploying to the MPS3 FPGA board. 

To aid those learning the porting process, the repository features a dedicated `lv_porting_exercise` branch. This branch provides a clean project template with low-level LCD APIs already implemented, such as:

```c
extern int32_t GLCD_DrawBitmap(uint32_t x, uint32_t y, 
                               uint32_t width, uint32_t height, 
                               const uint8_t *bitmap);
```

This allows developers to practice integrating the LVGL CMSIS-Pack into a project without worrying about the underlying hardware driver complexities. It also introduces a unique `__cycleof__()` macro for measuring the exact CPU cycles consumed by specific code segments, which is invaluable for performance tuning.

## Technical Implementation

The project structure follows standard CMSIS conventions, using `lv_conf.h` for library configuration and `lv_port_disp_template.c` for display interface implementation. The memory management is handled by LVGL's built-in allocator, configured with a 128KB memory pool. The project also integrates `perf_counter` for high-resolution timing and custom tick sources, ensuring smooth animations and accurate benchmarking.
