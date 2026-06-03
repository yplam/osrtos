---
title: ARM KL25Z mBed IDE Example Programs
summary: A collection of basic programming exercises for the FRDM-KL25Z Freedom Development
  Platform using the mbed framework. The project demonstrates core MCU features like
  GPIO, PWM, and touch sensing on ARM Cortex-M0+ processors.
codeUrl: https://github.com/sarincr/ARM-KL25Z-mBed-IDE-Example-Progrms
isShow: false
rtos: mbed-os
libraries: []
topics:
- embedded-systems
- embedded-c
- arm
- armcotex
- mbed
- mbed-os
- ide
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- mbed-os-unipg-samples-1
- stm32f103rb-templates-and-examples
- stm32-cmsis-zero-to-hero
- simple-cmsis-led-blinking-applications
- embedded-systems-bare-metal-programming-ground-up
- stm32f4-cmsis-lessons
---

The FRDM-KL25Z is an ultra-low-cost development platform for Kinetis L Series MCUs, specifically the KL1x and KL2x families built on the Arm Cortex-M0+ processor. This repository serves as a comprehensive starter kit for developers looking to explore the capabilities of this hardware using the mbed ecosystem. It provides a series of graduated examples that move from basic 'Hello World' style LED blinking to more advanced peripheral control.

### Hardware and Platform Overview
The Freedom KL25Z board is designed for low-power operation and features a standards-based form factor with expansion options for Arduino-compatible shields. It includes a built-in debug interface (OpenSDA) for flash programming and run-control. This project leverages the mbed framework, which allows developers to use either the mbed online compiler or offline environments like PlatformIO and GCC ARM Embedded.

### Key Example Programs
The repository is organized into several standalone project folders, each focusing on a specific aspect of the MCU:

*   **LED Control (Blink Red, RG, RGB):** These examples demonstrate basic DigitalOut functionality. By controlling the onboard tri-color LED, users learn how to interface with GPIO pins and manage basic timing loops.
*   **Digital Output Toggling:** A deeper dive into GPIO manipulation, showing how to toggle pins efficiently.
*   **PWM Output:** The `07.PwmOut` example demonstrates Pulse Width Modulation, which is essential for tasks like dimming LEDs or controlling motor speeds.
*   **Touch Sensor Integration:** One of the standout features of the KL25Z is its capacitive touch slider. The `09.Touch_Sensor` project includes the `TSISensor` library to demonstrate how to read user input from the onboard touch interface.

### Technical Implementation
The projects are structured to be compatible with multiple build systems. You will find `Makefile` configurations for GCC ARM, `.project` files for Eclipse-based IDEs, and a `platformio.ini` file for users who prefer the PlatformIO ecosystem. 

For example, a typical `main.cpp` in this repository follows the clean, object-oriented approach provided by mbed:

```cpp
#include "mbed.h"

// Initialize a digital output on the red LED pin
DigitalOut red_led(LED_RED);

int main() {
    while(1) {
        red_led = !red_led; // Toggle the LED
        wait(0.5);          // Wait for 500ms
    }
}
```

### Getting Started
To use these examples, you can import the individual folders into your preferred IDE. If you are using PlatformIO, the provided configuration supports multiple boards including the `frdm_kl25z`, `frdm_k64f`, and `frdm_kl46z`. The repository also includes pre-configured `mbed_config.h` files and target-specific HAL (Hardware Abstraction Layer) files, ensuring that the environment is ready for compilation out of the box.

Whether you are a student learning embedded systems or a professional prototyping a low-power IoT device, these examples provide a solid foundation for developing on the Kinetis KL25Z platform using modern RTOS and library standards.
