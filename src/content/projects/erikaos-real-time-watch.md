---
title: ErikaOS Real-Time Watch
summary: A real-time digital watch application built on the Erika Enterprise RTOS
  for the STM32F407-Discovery board. It utilizes the Discover-more extension board
  for LCD display and touch interaction, demonstrating OSEK/VDX-compliant task management
  and hardware interfacing.
codeUrl: https://github.com/ckevar/ErikaOS-RealTime-watch
siteUrl: https://www.erika-enterprise.com/index.php/download/erika-v2.x.html
isShow: false
rtos: erika-enterprise
libraries: []
topics:
- c
- embedded
- embedded-c
- embedded-systems
- erika
- erika-enterprise
- real-time
- realtime
- state-machine
- stm32
- stm32f4
- stm32f4-discovery
- stm32f407
- stm32f407vg
star: 1
lastUpdated: '2024-09-13'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- stm32l476g-discovery-rtos-sensor-project
- erikaos-online-weather-station
- echronos-on-stm32f4x-nucleo-board
- zephyrwatch
- lvgl-demo-embarcadores
- ov-watch
---

The ErikaOS Real-Time Watch is an embedded application that transforms an STM32F407-Discovery board into a functional digital watch. By leveraging the Erika Enterprise RTOS, this project demonstrates how to manage real-time tasks, hardware interrupts, and user interface components on a resource-constrained microcontroller.

### Hardware Architecture
The project is designed specifically for the **STM32F407-Discovery** development board. To provide a visual interface, it requires the **Discover-more extension board**, which adds an LCD screen and touch capabilities. The software interacts with these components through the STM32 Standard Peripheral Library, utilizing I2C for touch sensing (STMPE811QTR) and FSMC for the LCD interface.

### Powered by Erika Enterprise
At its core, the project uses **ERIKA2.x**, an OSEK/VDX-compliant open-source RTOS. Erika Enterprise is specifically designed for automotive and industrial applications where timing and predictability are critical. The system configuration is defined in a `conf.oil` (OSEK Implementation Language) file, which specifies the tasks, alarms, and resources used by the application.

### Software Components and UI
The repository includes a custom UI framework located in the `ui/` directory. This framework handles:
- **Event Management**: Processing touch inputs and system events.
- **Widget System**: Managing graphical elements on the LCD.
- **Touch Driver**: Interfacing with the STMPE811QTR controller.
- **Font Rendering**: Custom font support for the digital display.

### Getting Started and Compilation
For users who want to quickly test the project, a pre-compiled binary (`c_mX.bin`) is provided. It can be flashed using the `st-flash` utility:

```bash
$ st-flash write c_mX.bin 0x8000000
```

To recompile the project from source, you must have the Erika Enterprise CLI and the `gcc-arm-none-eabi` toolchain installed. The build process involves two main steps:
1. **Code Generation**: Use `erika-gen` to process the `conf.oil` file and generate the RTOS glue code.
2. **Compilation**: Configure the `makefile` and `usr.mk` to point to your local compiler path and run the make utility.

### Project Structure
- `src/app.c`: Main application logic and RTOS task definitions.
- `src/ui.c`: High-level UI management.
- `conf.oil`: The RTOS configuration file defining tasks and system parameters.
- `ui/inc/`: Headers for the touch, widget, and font systems.
- `ui/src/`: Implementation of the graphical and input drivers.
