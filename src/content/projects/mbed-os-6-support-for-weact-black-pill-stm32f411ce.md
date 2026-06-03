---
title: Mbed OS 6 Support for WeAct Black Pill (STM32F411CE)
summary: A custom target implementation for Mbed OS 6 that enables support for the
  WeAct Black Pill board. It provides the necessary hardware abstraction layers, pin
  mappings, and clock configurations for the STM32F411CEU6 microcontroller.
slug: mbed-os-6-support-for-weact-black-pill-stm32f411ce
codeUrl: https://github.com/vznncv/TARGET_BLACKPILL_F411CE
star: 7
version: v0.2.2
lastUpdated: '2023-04-16'
rtos: mbed-os
topics:
- mbed-os
- stm32
- stm32f4
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- mbed-os-6-support-for-weact-black-pill-stm32f401cc
- blackpill-stm32f401ce-support-for-mbed-os-6
- mbed-os-6-port-for-weact-stm32h743vit6
- bluepill-board-support-for-mbed-os-6
- mcudev-black-stm32f407vet6-micropython-support
- stm32-m-nuttx-custom-board-mod
---

The WeAct Black Pill is a popular, affordable development board featuring the STM32F411CEU6 microcontroller. While it offers significantly more RAM, flash memory, and a floating-point unit compared to the classic Blue Pill, it is not always supported out-of-the-box by standard RTOS frameworks. This project bridges that gap by providing a custom target definition for Mbed OS 6.

## Hardware Capabilities

The target board is powered by an ARM Cortex-M4 CPU running at up to 100 MHz. Key hardware features supported by this target definition include:
- **Memory**: 512 KB Flash and 128 KB SRAM.
- **Peripherals**: Support for 32 GPIOs (all 5V tolerant), 12-bit ADC, RTC, and multiple communication interfaces including 3x I2C, 3x USART, 3x SPI, and 3x I2S.
- **Connectivity**: USB 2.0 full-speed support via a Type-C connector.
- **Clocking**: Configuration for the 25 MHz high-speed external (HSE) quartz and the 32.768 KHz low-speed external (LSE) oscillator.

## Technical Implementation

This repository provides the essential files required by the Mbed build system to recognize the Black Pill as a valid target. The core of the implementation resides in several key configuration files:

- **custom_targets.json**: Defines the `BLACKPILL_F411CE` target, inheriting from the standard `MCU_STM32F411xE` while overriding specific clock sources and HSE values (25MHz).
- **PinNames.h**: Maps the physical pins of the UFQFPN48 package to Mbed-friendly names, including aliases for Arduino-style pin numbering (A0, D0, etc.) and standard peripheral roles like `CONSOLE_TX` and `CONSOLE_RX` (defaulting to PA_2 and PA_3).
- **system_clock.c**: Configures the System Clock (SYSCLK) to ensure the MCU runs at its intended frequency using the external oscillators.

## Integration and Usage

The project is designed to work with both Mbed CLI 1 and Mbed CLI 2 (mbed-tools). For modern CMake-based workflows (Mbed CLI 2), users can integrate this target by adding the repository as a subdirectory and linking the `mbed-blackpill-f411ce` library. 

```cmake
add_subdirectory(${CMAKE_CURRENT_SOURCE_DIR}/TARGET_BLACKPILL_F411CE)
target_link_libraries(${APP_TARGET} mbed-blackpill-f411ce)
```

Default pin mappings are provided for immediate use, such as the user LED on `PC_13` and the user button on `PA_0`. For debugging and console output, the project defaults to using `PA_2` and `PA_3` for UART communication, which is essential for `printf` functionality and Greentea testing within the Mbed ecosystem.

## Compatibility

This target has been verified with Mbed OS 6.17 and is expected to be compatible with versions 6.12 and higher. Currently, the project specifically supports the GCC ARM toolchain.
