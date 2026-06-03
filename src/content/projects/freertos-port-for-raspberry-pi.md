---
title: FreeRTOS Port for Raspberry Pi
summary: A foundational port of the FreeRTOS kernel to the Raspberry Pi platform,
  targeting ARMv6-based hardware. It includes the necessary portable layer, interrupt
  management, and basic GPIO drivers for bare-metal RTOS development.
slug: freertos-port-for-raspberry-pi
codeUrl: https://github.com/jameswalmsley/RaspberryPi-FreeRTOS
star: 498
lastUpdated: '2017-12-11'
rtos: freertos
isShow: false
createdAt: '2025-12-28'
updatedAt: '2025-12-28'
relatedProjects:
- freertos-for-raspberry-pi-3-64-bit
- rp2040-freertos-template
- raspberry-pi-rtos-rpi-rtos
- freertos-port-for-risc-v
- rust-fel4-workspace-for-raspberry-pi-3
- micropython-for-bare-metal-raspberry-pi
---

The RaspberryPi-FreeRTOS project provides a foundational port of the FreeRTOS real-time operating system to the Raspberry Pi. While the Raspberry Pi is often associated with full-featured Linux distributions, this project enables developers to leverage the deterministic, low-latency capabilities of an RTOS on the platform's ARM-based hardware.

### Hardware and Architecture

This port specifically targets the ARMv6 architecture found in early Raspberry Pi models, such as the Raspberry Pi 1 and Raspberry Pi Zero. It includes the necessary assembly and C code to handle the ARM-specific context switching, interrupt nesting, and system timer configuration required by FreeRTOS. The project uses a custom linker script (`raspberrypi.ld`) to ensure the binary is correctly mapped for the Pi's bootloader.

### Build System and Toolchain

The project utilizes a custom build system called `dbuild`, which relies on standard Makefiles and Python scripts for a "pretty" build output. It is designed to be compiled using the `arm-none-eabi-` GCC toolchain. The build process generates several key files:

- **kernel.elf**: The linked executable containing symbols.
- **kernel.img**: The binary image ready to be placed on an SD card for booting.
- **kernel.list**: A disassembly of the kernel for debugging and verification.
- **kernel.syms**: A symbol table for the generated kernel.

### Project Structure

The repository is organized into several logical components that separate the RTOS kernel from the platform-specific code:

- **FreeRTOS Core**: The standard FreeRTOS source files, including task management, queues, and list handling.
- **Portable Layer**: The GCC-specific port for the Raspberry Pi, which implements the hardware-dependent side of the scheduler.
- **Drivers**: Basic hardware support for the Raspberry Pi, including an interrupt manager (IRQ) and GPIO drivers located in the `Demo/Drivers` directory.
- **Demo Application**: A sample `main.c` and startup code that demonstrates how to initialize the hardware and start the FreeRTOS scheduler.

### Memory Management

The project includes the `heap_4.c` implementation for memory management. This is one of the more robust schemes provided by FreeRTOS, allowing for dynamic allocation and deallocation of memory while mitigating fragmentation by coalescing adjacent free blocks. This is particularly useful for embedded applications that require dynamic task or queue creation.

### Evolution into BitThunder

As noted by the author, James Walmsley, this project served as a precursor to **BitThunder**, a more comprehensive operating system based on FreeRTOS. While this repository remains a "basic" port, it provides an excellent starting point for developers looking to understand the internals of RTOS porting or those who need a minimal, bare-metal FreeRTOS environment on the Raspberry Pi without the overhead of a full driver model or filesystem.
