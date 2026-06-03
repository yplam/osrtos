---
title: OV-Watch
summary: A feature-rich open-source smartwatch based on the STM32F411CEU6 microcontroller.
  It utilizes FreeRTOS for task management and LVGL v8.2 for its graphical user interface,
  supporting health tracking, environmental sensing, and Bluetooth connectivity.
slug: ov-watch
codeUrl: https://github.com/No-Chicken/OV-Watch
siteUrl: https://no-chicken.com
star: 1949
version: v2.4.3
lastUpdated: '2025-12-15'
rtos: freertos
libraries:
- lvgl
topics:
- freertos
- lvgl
- smartwatch
- stm32
isShow: true
image: /202601/ov-watch.webp
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- watchx-open-source-smartwatch
- watchx-ii-smart-watch
- leta
- zephyrwatch
- zswatch
- opentimewatch-os
---

## Overview

OV-Watch is a comprehensive open-source smartwatch project that demonstrates the integration of high-performance microcontrollers with modern embedded software frameworks. Built around the STM32F411CEU6 (ARM Cortex-M4), the project provides a complete hardware and software solution for a wearable device. It features a sophisticated UI, power management strategies, and various sensors for health and environmental monitoring.

## Technical Architecture

The project is built on a robust software stack designed for efficiency and responsiveness. At its core, **FreeRTOS** manages system tasks, ensuring that background processes like sensor polling and Bluetooth communication do not interfere with the user interface. The graphical interface is powered by **LVGL v8.2**, providing a smooth, smartphone-like experience on a small embedded display.

### Hardware Components
- **MCU**: STM32F411CEU6
- **Display**: 1.69-inch touch screen
- **Sensors**: MPU6050 for motion and step counting, EM7028 for heart rate monitoring, and sensors for altitude, temperature, and humidity.
- **Connectivity**: KT6368A Bluetooth module for SPP communication and wireless firmware updates.
- **Storage**: External EEPROM for persistent settings and data storage.

## Key Software Features

### Power Management
One of the most critical aspects of the OV-Watch is its three-tier power strategy:
1.  **Normal Mode**: Full functionality with the MCU and display active.
2.  **Sleep Mode**: The MCU enters STOP mode to conserve energy while the MPU6050 continues to track steps. The system uses RTC timed interrupts to periodically check for wrist-lift gestures to wake the screen.
3.  **Shutdown Mode**: The TPS63020 regulator is disabled, cutting power to the 3.3V rail. Only the RTC remains powered by the battery (Vbat) to maintain time.

### UI Navigation and Logic
The watch implements a custom stack-based navigation system to handle page transitions. This allows users to navigate deep into menus and return to previous screens reliably. The project also includes a classic calculator implementation using a two-stack (operator and operand) shunting-yard algorithm to handle mathematical expressions.

```c
// Example of the stack-based page switching logic
if(keystr == 1)
{
    user_Stack_Pop(&ScrRenewStack);
    if(user_Stack_isEmpty(&ScrRenewStack))
    {
        ui_MenuPage_screen_init();
        lv_scr_load_anim(ui_MenuPage, LV_SCR_LOAD_ANIM_MOVE_RIGHT, 0, 0, true);
        user_Stack_Push(&ScrRenewStack, (long long int)&ui_HomePage);
        user_Stack_Push(&ScrRenewStack, (long long int)&ui_MenuPage);
    }
    else if(ScrRenewStack.Data[ScrRenewStack.Top_Point-1] == (long long int)&ui_HomePage)
    {
        ui_HomePage_screen_init();
        lv_scr_load_anim(ui_HomePage, LV_SCR_LOAD_ANIM_MOVE_RIGHT, 0, 0, true);
    }
}
```

### Firmware and Updates
The project utilizes a split architecture consisting of a **Bootloader** and the main **Application (APP)**. This separation enables In-Application Programming (IAP) via Bluetooth (OTA), allowing users to upgrade the watch firmware wirelessly without needing a physical debug probe.

## Development and Simulation

To streamline UI development, the project supports LVGL simulation within VSCode on Windows. This allows developers to design and test interface elements, animations, and logic in a desktop environment before deploying to the physical STM32 hardware. A hardware abstraction layer (`HWDataAccess.c`) facilitates this by providing a consistent interface for both the simulator and the actual hardware.
