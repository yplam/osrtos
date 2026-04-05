---
title: Leta
summary: Leta is an open-source smartwatch project built on the STM32F103 microcontroller,
  featuring a custom-written mini RTOS and a sophisticated monochrome GUI library.
  It integrates a variety of sensors including an IMU, magnetometer, and environmental
  sensors, alongside Bluetooth connectivity and a 1.3-inch OLED display.
slug: leta
codeUrl: https://github.com/snoopy3921/Leta
lastUpdated: '2025-12-29'
licenses:
- MIT
image: /202604/Leta_4.avif
rtos: ''
topics:
- gui
- microcontroller
- oled-display
- rtos
- stm32f103
- wristwatch
isShow: true
createdAt: '2026-04-04T10:02:39+00:00'
updatedAt: '2026-04-04T10:02:39+00:00'
---

Leta, named after the Russian word for summer, is a custom-built wrist watch project that started during the summer months. It represents a comprehensive exercise in embedded systems design, combining hardware engineering, real-time operating system development, and user interface design to create a functional, wearable device.

### Hardware Architecture
The project is powered by an STM32F103xx microcontroller, which provides 128 kB of ROM and 20 kB of RAM, along with a built-in Real-Time Clock (RTC) for accurate timekeeping. The hardware suite is quite capable for its size, featuring several sophisticated components:

*   **Sensors:** An MPU6050 IMU and HMC5883L magnetometer for motion and orientation tracking, and an HTU21D for ambient temperature and humidity monitoring.
*   **Connectivity:** Bluetooth communication via the RF-BM-4044B4 (RF-Star) module.
*   **Display:** A 1.3-inch SH1106 OLED screen with a resolution of 128x64.
*   **Power Management:** A TP4056 charger IC paired with an AP2112 3.3V regulator.


### PCB and Enclosure Design
The electronics are mounted on a custom 2-layer PCB designed for a compact form factor. The board includes a USB interface for charging, an SWD port for firmware debugging, and four physical buttons for user input. 

![Leta 2-layer PCB Layout](/202604/Leta_1.avif)

![Leta PCB 3D Render](/202604/Leta_2.avif)

To complete the watch, the project includes a custom-designed enclosure that houses the PCB and the battery, ensuring the device is wearable and protected.

![Leta Custom Enclosure Design](/202604/Leta_5.avif)

### Software Layers
The firmware architecture of Leta is divided into distinct layers, ensuring modularity and ease of development. It relies on two primary custom software components: AK-mOS and a specialized GUI library.

#### AK-mOS
Leta runs on AK-mOS, a mini Real-Time Operating System (RTOS) written specifically for ARM Cortex-M3 devices. While created for learning purposes, it is a capable kernel with a context-switching mechanism based on FreeRTOS. Its features include:
*   Preemptive and Round-robin scheduling.
*   Inner-task communication mechanisms.
*   Software timers for managing periodic events.

#### Monochrome OLED GUI
To overcome the limitations of a small monochrome display, the project utilizes a custom GUI library designed to provide a rich, animated user experience. The library supports various widgets such as switches, checkboxes, sliders, and pop-up notifications. It also includes an animation engine capable of handling fading, moving, and resizing transitions for UI elements, significantly improving the visual quality of the watch interface.
