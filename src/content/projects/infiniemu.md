---
title: InfiniEmu
summary: InfiniEmu is a high-fidelity emulator for the PineTime smartwatch, simulating
  the nRF52832 SoC and its complete peripheral suite including I2C sensors and SPI
  displays. It enables developers to run production firmware like InfiniTime in both
  native desktop environments and web browsers using WebAssembly, featuring integrated
  support for FreeRTOS debugging and LittleFS storage.
slug: infiniemu
codeUrl: https://github.com/pipe01/InfiniEmu
siteUrl: https://infiniemu.pipe01.net/
lastUpdated: '2026-03-13'
licenses:
- GPL-3.0
image: /202604/InfiniEmu_0.avif
rtos: freertos
libraries:
- littlefs
topics:
- arm
- armv7
- armv7m
- emulator
- pinetime
- pinetime-smartwatch
isShow: true
createdAt: '2026-04-02T12:01:59+00:00'
updatedAt: '2026-04-02T12:01:59+00:00'
---

InfiniEmu provides a specialized emulation environment tailored specifically for the PineTime smartwatch ecosystem. Rather than offering a generic ARM emulator, this project focuses on the precise hardware interactions required to run production-grade firmware binaries, such as InfiniTime, without modification. By simulating the intricate dance between the nRF52832 microcontroller and its various peripherals, InfiniEmu creates a bridge between embedded development and the convenience of modern desktop and web environments.

### Comprehensive Hardware Simulation

At the core of InfiniEmu is a detailed implementation of the PineTime's hardware stack. This includes the ARM Cortex M4 CPU and its associated peripherals, but extends much further into the external components that define the smartwatch experience. The emulator supports:

*   **Sensors**: I2C-based peripherals including the BMA425 accelerometer and the HRS3300 heart rate sensor.
*   **Interface**: The CST816S touch screen controller, allowing for interactive testing of UI gestures.
*   **Display**: The ST7789 SPI LCD controller, ensuring that the visual output matches what a user would see on their wrist.
*   **Storage**: A generic SPI flash based on the XT25F32B-S, with integrated support for the LittleFS file system.

### Cross-Platform Accessibility

One of the most powerful aspects of InfiniEmu is its versatility in deployment. It is designed to function as a native command-line application, often distributed as an AppImage for Linux users, providing a fast and local development loop. However, it also compiles to WebAssembly using the Emscripten toolchain. This enables a web-based previewer that can take a firmware URL and a script, execute the firmware in the browser, and generate screenshots or interactive sessions. This is particularly useful for CI/CD pipelines where developers can automatically generate visual previews of pull requests.

### Scripting and Automation

Beyond simple execution, InfiniEmu incorporates a Lua scripting engine. This allows developers to automate interactions with the virtual hardware—such as simulating button presses, swipes, or specific sensor data inputs—and then capturing the results. The scripting system is robust enough to handle timing-sensitive operations, such as running the emulator for a specific duration before triggering a touch event.

### Firmware Debugging and RTOS Integration

InfiniEmu is built with the developer in mind. When running firmware binaries (ELF files) that include symbol information, the emulator can extract and display internal state information. A key feature is its awareness of FreeRTOS; the emulator can monitor and report the FreeRTOS free heap size, which is a critical metric for long-term stability in resource-constrained embedded environments. This level of insight is often difficult to achieve on physical hardware without specialized debugging probes.

### Practical Application

The primary goal of the project is binary compatibility. Developers can take the same image they would flash to a real device and run it within InfiniEmu. This makes it an invaluable tool for UI design, logic testing, and regression testing. While the project is continuously evolving—with features like Bluetooth and advanced power management on the roadmap—it already provides a stable foundation for the PineTime development community to iterate faster and with greater visibility into their code's behavior.
