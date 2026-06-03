---
title: Bitcraze Crazyflie 2.0/2.1 Mbed OS Firmware
summary: A firmware implementation for the Bitcraze Crazyflie 2.0 and 2.1 nano-quadcopters
  utilizing the ARM Mbed OS platform. It provides a modular driver architecture for
  various inertial, pressure, and distance sensors while targeting STM32F4 series
  microcontrollers.
codeUrl: https://github.com/Insper/crazyflie-firmware
siteUrl: https://www.bitcraze.io/crazyflie-2/
isShow: false
rtos: mbed-os
libraries: []
topics:
- bitcraze
- bitcraze-crazyradio-pa
- crazyflie
- crazyflie-drone
- crazyflie-firmware
- mbed-os
- mbed-studio
- microcontroller
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- droners
- arm-control-framework-acorns-rover
- smoothieware-for-stm32
- kw41z-rf-driver-for-arm-mbed-nanostack
- micro-ros-module-for-zephyr
- stm32-m-nuttx-custom-board-mod
---

The Bitcraze Crazyflie is one of the most popular platforms for nano-drone research and development. While the official firmware typically relies on FreeRTOS, this repository from Insper provides an alternative implementation built on top of **ARM Mbed OS**. This transition allows developers to leverage the Mbed ecosystem, including its standardized APIs and build tools like Mbed Studio.

### Hardware and Targets
The firmware is designed for the Crazyflie 2.0 and 2.1, which are powered by the **STM32F405RG** microcontroller. Interestingly, because the STM32F405RG is not natively supported as a target in Mbed OS, the project utilizes the **Seeed Arch Max (STM32F407VE)** target as a base. This requires some clever low-level adjustments, such as modifying the scatter file (`.sct`) to define the application start address at `0x08004000` and manually configuring peripheral pins for PWM and timer functionality.

### Driver Support
One of the strengths of this repository is its comprehensive collection of sensor drivers located in the `src/drivers` directory. The firmware supports a wide array of hardware often found in the Crazyflie ecosystem and its expansion decks:
- **IMUs:** BMI088 and MPU9250 for motion tracking.
- **Barometers:** BMP388 and LPS25H for altitude sensing.
- **Distance/Range:** VL53L0X and VL53L1X Time-of-Flight sensors.
- **Optical Flow:** PMW3901 for position hold and navigation.

### Getting Started with Mbed Studio
To get the firmware running, the project is designed to be imported directly into **Mbed Studio**. After forking and importing the repository, users must select the `Seeed Arch Max (ARCH-MAX)` target. 

Because the Crazyflie uses a custom bootloader, specific memory mapping is required. Developers need to navigate into the Mbed OS target files and update the `MBED_APP_START` definition. Additionally, pin configurations in `PeripheralPins.c` must be updated to ensure the motors and sensors communicate correctly with the STM32 chip.

### Building and Flashing
Once the environment is configured, building the project generates a binary file. Flashing is handled wirelessly using the **Crazyradio PA** USB dongle. By putting the Crazyflie into bootloader mode (holding the power button until the blue LED blinks), users can use the `make flash` command, which invokes the `cfloader` utility to send the new firmware to the drone.

```bash
# Example of flashing the firmware
cd crazyflie-firmware
make flash
```

### Project Structure
The repository is organized to separate core logic from application-specific code:
- `main.cpp`: The entry point for the application.
- `src/`: Contains the core drivers and utility files (parameters, pin names).
- `programs/`: Includes a variety of examples and chapter-based labs, ranging from simple LED and motor tests to complex IMU and optical flow implementations. 

This structure makes it an excellent resource for students and researchers looking to understand drone control systems through the lens of a modern RTOS like Mbed OS.
