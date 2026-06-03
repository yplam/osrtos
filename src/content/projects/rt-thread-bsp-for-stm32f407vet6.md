---
title: RT-Thread BSP for STM32F407VET6
summary: A Board Support Package (BSP) for the STM32F407VET6 development board based
  on the RT-Thread real-time operating system. It provides driver support for essential
  peripherals like GPIO, UART, SPI, and I2C, enabling rapid development on ARM Cortex-M4
  hardware.
slug: rt-thread-bsp-for-stm32f407vet6
codeUrl: https://github.com/IoTSharp/STM32F407VET6
star: 1
lastUpdated: '2022-07-29'
rtos: rt-thread
topics:
- rt-thread
- stm32
- stm32f407
- stm32f407vet6
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- stm32l475-pandora-board-bsp-for-rt-thread
- iotsharp-pandora-stm32l475-bsp
- rt-thread-bsp-for-mh1903x
- mbed-os-6-port-for-weact-stm32h743vit6
- bluepill-board-support-for-mbed-os-6
- b-l475e-iot01a-discovery-board-support-crate
---

The STM32F407VET6 Board Support Package (BSP) provides a robust foundation for running the RT-Thread real-time operating system on STM32 hardware. Originally derived from the STM32F4DISCOVERY BSP, this project is specifically tailored for the STM32F407VETx variant, offering a streamlined environment for embedded developers targeting the ARM Cortex-M4 architecture.

### Hardware Capabilities

The project targets the STM32F407VET6 microcontroller, which operates at a maximum frequency of 168MHz. This high-performance MCU includes 512KB of Flash memory and 128KB of RAM, making it suitable for a wide range of industrial and IoT applications. The BSP includes pre-configured support for several onboard resources:

- **User LEDs**: Four LEDs including LD3 (orange, PD13), LD4 (green, PD12), LD5 (red, PD14), and LD6 (blue, PD15).
- **User Buttons**: Dedicated Reset and User input buttons.
- **Debug Interface**: Integrated support for ST-LINK/V2 using the SWD debugging mode.

### RT-Thread Integration

This BSP leverages RT-Thread's modular architecture, providing a ready-to-use environment that includes the Finsh command-line shell. Upon booting, users are greeted with the RT-Thread MSH (Module Shell) interface over the serial console, allowing for real-time system interaction and debugging. 

The configuration is managed through the standard RT-Thread `rtconfig.h` and Kconfig system. By default, the system is configured with a 1000 Hz tick rate, 32 thread priority levels, and a small memory heap management system. UART1 is utilized as the default console device.

### Peripheral Support and Drivers

The BSP currently supports several essential on-chip peripherals to facilitate rapid prototyping:

- **GPIO**: Full support for pins PA0 through PH1.
- **UART**: UART1 is enabled by default for console output, with UART2 also available in the hardware driver configuration.
- **SPI**: Hardware SPI1 support is included.
- **I2C**: Software-implemented I2C is provided for maximum flexibility across different pin configurations.

### Development Workflow

Developers can choose from multiple toolchains, as the project supports Keil MDK (v4 and v5), IAR, and GCC environments. The build process is managed via SCons, and the RT-Thread ENV tool can be used to customize the kernel and enable additional software packages. 

To get started, developers can open the provided Keil MDK5 project (`project.uvprojx`), compile the source, and flash it to the board using an ST-LINK. Once running, the system provides immediate visual feedback through periodic LED blinking (LD5) and a serial output at 115200 baud:

```c
 \ | /
- RT -     Thread Operating System
 / | \     3.1.1 build Nov 19 2018
 2006 - 2018 Copyright by rt-thread team
msh >
```

### Advanced Configuration

For more complex requirements, the BSP can be extended using the `menuconfig` command within the RT-Thread ENV tool. This allows developers to enable additional drivers, middleware, or third-party software packages from the RT-Thread ecosystem—such as network stacks or file systems—without manually editing configuration headers. The project structure is designed to be compatible with the standard RT-Thread development workflow, making it easy to migrate applications from other STM32 series boards.
