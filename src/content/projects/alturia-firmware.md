---
title: Alturia Firmware
summary: Alturia Firmware is the flight control software for the Alturia rocket flight
  computer, built on the Zephyr RTOS. It features advanced sensor fusion using Kalman
  and Mahony filters, a modular event system, and support for data logging and Lua
  scripting, targeting STM32-based hardware.
codeUrl: https://github.com/rckTom/alturia-firmware
isShow: false
rtos: zephyr
libraries: []
topics:
- zephyr
- rocketry
- altimeter
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- filtered-inertial-rotation-module-firm
- droners
- flight-controller-rev2
- james-rocket-controller
- airgradient-pro-rust-firmware
- protoflight
---

Alturia Firmware is the sophisticated flight control system powering the Alturia rocket flight computer. Designed for high-performance rocketry, it leverages the Zephyr RTOS to provide a reliable, multi-threaded environment capable of handling complex sensor fusion, data logging, and real-time control tasks simultaneously.

### The Architecture of a Flight Computer
At its core, Alturia is built to manage the high-stakes environment of a rocket launch. The firmware is structured around several key modules defined in its Kconfig and source tree:
- **DAQ (Data Acquisition)**: A dedicated system for high-frequency sensor sampling.
- **Datalogger**: A robust logging system with configurable buffers and thread priorities to ensure flight data is preserved even during high-G maneuvers.
- **Event System**: An asynchronous event handler that manages state transitions and time-critical triggers.
- **Pyros and Servos**: Logic for triggering recovery systems (parachutes) and controlling flight surfaces.

### Symbolic Code Generation: From Python to C
One of the most unique aspects of the Alturia project is its approach to algorithm development. Rather than hand-coding complex mathematical filters, the developers use Python and SymPy to prototype algorithms. 

The project includes a custom CMake integration that uses `symbolic_codegen()` to transform Python-defined symbolic equations into optimized C code. This is used for:
- **Kalman Filters**: Including altitude estimation, vertical dynamics, and constant altitude filters.
- **Attitude Estimation**: Implementing Mahony filters and transformations for precise orientation tracking.

This workflow allows the team to verify the math in a high-level environment like Python before deploying the performance-critical implementation to the STM32 hardware.

### Simulation and Testing
Rocketry offers little room for error, and the Alturia project addresses this through Software-In-the-Loop (SIL) testing. The repository includes extensive Renode simulation profiles (`.repl` files) for the `alturia_v1_2` board. This allows developers to simulate the STM32F4 MCU alongside peripherals like the BMI088 accelerometer, MS5607 barometer, and SPI flash memory, enabling full firmware testing without risking hardware.

### Getting Started
To build the firmware, you need the Zephyr RTOS environment and the SymPy Python package. The project uses the `west` meta-tool for building and flashing:

```bash
git clone https://github.com/rckTom/alturia-firmware.git
cd alturia-firmware
git submodule init && git submodule update

# Build for the Alturia v1.2 hardware
west build -b alturia_v1_2
west flash
```

### Extensibility with Lua
Interestingly, the project includes a Lua execution engine (`zephyr-lua`). This suggests a high degree of flexibility, potentially allowing users to script custom flight logic or mission parameters without recompiling the entire firmware stack. Combined with a shell-based configuration system, Alturia provides a professional-grade platform for experimental rocketry.
