---
title: LVGL Terminal for PinePhone on Apache NuttX
summary: A touchscreen terminal application for the PinePhone running the Apache NuttX
  RTOS. It utilizes the LVGL graphics library to provide a graphical interface for
  interacting with the NuttX NSH shell, enabling command execution directly on the
  device's display.
slug: lvgl-terminal-for-pinephone-on-apache-nuttx
codeUrl: https://github.com/lupyuen/lvglterm
siteUrl: https://lupyuen.github.io/articles/terminal
star: 4
lastUpdated: '2023-10-02'
rtos: nuttx
libraries:
- lvgl
topics:
- allwinner-a64
- lvgl
- nuttx
- pinephone
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- lvgl-test-app-for-apache-nuttx
- apache-nuttx-rtos-for-pinephone
- zig-lvgl-touchscreen-app-on-apache-nuttx-rtos
- lvgl-for-pinephone-and-webassembly-with-zig-and-apache-nuttx-rtos
- st7789-and-lvgl-demo-for-apache-nuttx-rtos
- lvgl-demo-printer-for-raspberry-pi-3
---

## Overview

LVGL Terminal, or `lvglterm`, is a specialized touchscreen application designed for the PinePhone running the Apache NuttX RTOS. It serves as a graphical bridge to the NuttX Shell (NSH), allowing users to run commands and interact with the operating system directly from the device's screen. By leveraging the Light and Versatile Graphics Library (LVGL), the project provides a functional terminal emulator within a modern embedded GUI environment.

## Technical Architecture

The application functions by creating a graphical interface using LVGL widgets that capture user input and display shell output. Under the hood, it relies on several core NuttX features to facilitate communication with the system shell:

- **FIFO and Named Pipes**: These are used to redirect standard input and output between the graphical terminal and the NSH shell.
- **POSIX Spawn**: The application uses `posix_spawn()` or `exec()` support to launch the shell process and manage its execution.
- **LVGL Integration**: The terminal UI is built using LVGL's text area and keyboard components, specifically utilizing the `UNSCII 16` font for a classic terminal aesthetic.

## Integration with Apache NuttX

`lvglterm` is designed to be built as part of the NuttX ecosystem. It is integrated into the NuttX build system via `Kconfig` and `Makefiles`, allowing it to be enabled through the standard `menuconfig` interface. The project is currently part of the mainline NuttX apps repository, making it a standard example for developers working with graphics on mobile-style hardware like the PinePhone.

### Configuration and Build Process

Setting up the terminal requires specific configuration within the NuttX RTOS environment. This includes setting the application entry point to `lvglterm_main`, enabling FIFO drivers, and ensuring that the LVGL library is configured with the necessary built-in fonts. A common technical hurdle addressed in the documentation involves the integration of LVGL fonts within the NuttX build process, specifically ensuring the `lv_font_unscii_16` reference is correctly linked during the final build stage.

## Hardware Target: PinePhone

While the code is portable to other NuttX-supported platforms with touchscreens, its primary target is the PinePhone. This demonstrates the capability of Apache NuttX to handle complex mobile hardware, including high-resolution displays and touch input, while maintaining the responsiveness required for a command-line interface. The project serves as an excellent reference for developers looking to build interactive graphical tools on top of a POSIX-compliant RTOS.
