---
title: Mbed OS 6 Support for WeAct Black Pill (STM32F401CC)
summary: This project provides a custom target definition and hardware abstraction
  layer for the WeAct Black Pill board based on the STM32F401CCU6 microcontroller.
  It enables full compatibility with Mbed OS 6, including pin mappings, clock configurations,
  and peripheral support for the ARM Cortex-M4 platform.
slug: mbed-os-6-support-for-weact-black-pill-stm32f401cc
codeUrl: https://github.com/vznncv/TARGET_BLACKPILL_F401CC
star: 2
version: v0.2.0
lastUpdated: '2021-07-27'
rtos: mbed-os
topics:
- mbed-os
- stm32
- stm32f4
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- mbed-os-6-support-for-weact-black-pill-stm32f411ce
- blackpill-stm32f401ce-support-for-mbed-os-6
- mbed-os-6-port-for-weact-stm32h743vit6
- bluepill-board-support-for-mbed-os-6
- mcudev-black-stm32f407vet6-micropython-support
- stm32l475-freertos-iot-project
---

## Bringing Mbed OS 6 to the Black Pill

The WeAct Black Pill, featuring the STM32F401CCU6, has become a favorite among embedded developers due to its compact form factor, affordability, and significant performance boost over the classic Blue Pill. While the Blue Pill relies on the older STM32F1 series, the Black Pill offers an ARM Cortex-M4 core with a floating-point unit (FPU), more RAM, and higher clock speeds. This project bridges the gap between this popular hardware and the Mbed OS 6 ecosystem, providing the necessary configuration files to treat the board as a native Mbed target.

## Hardware Capabilities

The support package is tailored for the STM32F401CCU6 variant, which operates at up to 84 MHz. The board is well-equipped for a variety of embedded tasks, featuring:

- **Memory**: 256 KB Flash and 64 KB SRAM.
- **Connectivity**: USB 2.0 full-speed support via a Type-C connector, 3x I2C, 3x USART, 3x SPI, and 3x I2S.
- **Analog**: A 12-bit ADC with 10 channels.
- **Timing**: 8 timers and an integrated RTC.

The project specifically configures the high-speed external (HSE) quartz oscillator at 25 MHz and the low-speed external (LSE) oscillator at 32.768 KHz, ensuring accurate system timing and RTC functionality.

## Technical Implementation

Integrating a custom board into Mbed OS requires several key components that this repository provides:

### Custom Target Definition
The `custom_targets.json` file defines the `BLACKPILL_F401CC` target. It inherits from the standard `MCU_STM32F4` and specifies the `STM32F401xC` label. It also sets the default ADC reference voltage to 3.3V and configures the clock source to prefer the external crystal (HSE) while falling back to the internal oscillator (HSI) if necessary.

### Pin Mapping and Peripherals
The repository includes comprehensive pin definitions in `PinNames.h` and `PeripheralPins.c`. These files map the physical UFQFPN48 package pins to Mbed's logical names. It includes standard aliases for common interfaces:
- **Console**: UART2 (PA_2/PA_3) is configured as the default STDIO for `printf` debugging.
- **Onboard LED**: Mapped to `LED1` (PC_13).
- **User Button**: Mapped to `BUTTON1` (PA_0).
- **Arduino Compatibility**: The project includes aliases (A0, D0, etc.) to maintain compatibility with the Blue Pill/Arduino pin naming convention.

### Clock Configuration
System timing is handled in `system_clock.c`, which configures the Phase-Locked Loop (PLL) to achieve the maximum 84 MHz CPU frequency. The implementation is robust, offering logic to detect and bypass external clocks if a debugger's Master Clock Output (MCO) is used instead of a crystal.

## Getting Started

To use this target in an existing Mbed OS 6 project, developers can add the library using the Mbed CLI. Once the library is added, the `custom_targets.json` must be moved to the project root. The board can then be targeted using standard Mbed commands:

```bash
mbed add https://github.com/vznncv/TARGET_BLACKPILL_F401CC.git
cp TARGET_BLACKPILL_F401CC/custom_targets.json .
mbed target BLACKPILL_F401CC
mbed toolchain GCC_ARM
```

This setup allows developers to leverage the full suite of Mbed OS features—including the RTOS kernel, event queues, and peripheral APIs—on the Black Pill hardware.
