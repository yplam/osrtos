---
title: LVGL Port for Raspberry Pi Pico (MDK-ARM)
summary: An MDK-ARM project template for the Raspberry Pi Pico featuring the LVGL
  graphics library. It leverages Arm Compiler 6, CMSIS-Packs for modular component
  management, and provides a ready-to-use configuration for the Waveshare 1.3-inch
  LCD module.
slug: lvgl-port-for-raspberry-pi-pico-mdk-arm
codeUrl: https://github.com/lvgl/lv_port_raspberry_pi_pico_mdk
star: 33
lastUpdated: '2023-02-19'
rtos: ''
libraries:
- lvgl
topics:
- arm-2d
- lvgl
- mdk
- raspberry
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- cmsis-rp2040
- lvgl-demo-printer-for-raspberry-pi-3
- lvgl-port-for-stm32f429-discovery-kit
- lvgl-for-raspberry-pi-pico-hub75-led-matrix
- lvgl-port-for-stm32f769-discovery
- rp2040-lvgl-8-demo-with-ili9488-and-xpt2046
---

## Overview

The `lv_port_raspberry_pi_pico_mdk` project provides a professional development template for the Raspberry Pi Pico (RP2040) using the Keil MDK-ARM environment. It is specifically designed to offer a "Comfortable Zone" for traditional MCU developers who prefer the MDK ecosystem over command-line-heavy SDKs. By integrating the LVGL graphics library with the latest Arm Compiler 6 (AC6), this repository enables high-performance GUI development on the RP2040 platform.

## Key Features

One of the standout features of this project is its use of the **Arm Compiler 6**, which often provides superior optimization compared to the standard arm-gcc. It also utilizes the **MDK Community License**, making professional-grade tools accessible for non-commercial open-source projects without code size limitations.

To simplify deployment, the project relies on **CMSIS-Packs**. This modular approach allows developers to manage LVGL and other dependencies like `perf_counter` through a graphical interface (the Run-Time-Environment window), making updates and component selection straightforward.

## Technical Implementation

### Tick Management and Performance
The project includes a module called `perf_counter` to handle system timing. This is particularly useful for LVGL, as it automates the tick increment process. When `perf_counter` is detected, the template automatically sets `LV_TICK_CUSTOM` to `1` and uses the `get_system_ms()` API. This removes the need for the developer to manually call `lv_tick_inc()` in a timer interrupt, simplifying the porting layer significantly.

### Hardware Support
While the template is flexible, it comes with a pre-implemented port for the popular **Waveshare 1.3-inch LCD module** (240x240 resolution). Since this specific hardware lacks a touch screen, the project includes logic to mimic a mouse using the onboard joystick and buttons, demonstrating how to map physical inputs to LVGL's input device (indev) system.

### Memory Configurations
Developing for the RP2040's 264KB SRAM requires careful memory management. The project provides several build configurations to handle different scenarios:
- **AC6-flash**: Runs code directly from the 2MB external flash.
- **AC6-RunInSRAM**: Places code in SRAM for maximum speed while keeping read-only data in flash.
- **AC6-DebugInSRAM**: Entirely SRAM-based for fast debugging, though limited by the 248KB usable space (which may be too small for large demos like the LVGL Widgets demo).

## Getting Started

The main application loop is designed to be clean and efficient. After initializing the system and the LVGL port, the application enters a super-loop that handles the LVGL timer task:

```c
int main(void)
{
    system_init();
    
    printf("Hello Pico-Template\r\n");
    
    lv_init();
    lv_port_disp_init();
    lv_port_indev_init();

#if !defined(PICO_NO_FLASH)
#   if LV_USE_DEMO_BENCHMARK
    lv_demo_benchmark();
#   endif
    
#   if LV_USE_DEMO_WIDGETS
    lv_demo_widgets();
#   endif
#endif
    
    while(1) {
        lv_timer_handler_run_in_period(5);
    }
}
```

## Debugging and Tooling

For debugging, the project recommends using **CMSIS-DAP**, which allows for high-speed debugging directly within the MDK environment without requiring an external Raspberry Pi Pico as a Debug Probe (Pico-Debug). This integration ensures that developers can use the full suite of MDK's debugging tools, including watch windows and memory inspectors, to refine their LVGL applications.
