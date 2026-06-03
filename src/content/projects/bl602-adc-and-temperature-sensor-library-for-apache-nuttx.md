---
title: BL602 ADC and Temperature Sensor Library for Apache NuttX
summary: A hardware abstraction library for Apache NuttX that enables access to the
  BL602 microcontroller's ADC and internal temperature sensor. Ported from the official
  BL602 MCU SDK, it provides a functional bridge for developers until a native NuttX
  ADC driver is available for the platform.
codeUrl: https://github.com/lupyuen/bl602_adc
siteUrl: https://github.com/lupyuen/bl602_adc
isShow: false
rtos: nuttx
libraries: []
topics:
- bl602
- bl604
- nuttx
- pinecone
- pinedio
- riscv32
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- bl602-adc-and-temperature-sensor-test-app
- rust-stub-library-for-apache-nuttx
- apache-nuttx-driver-for-bosch-bme280-sensor
- bl602-gpio-expander-for-apache-nuttx
- pinedio-stack-bl604-on-apache-nuttx-rtos
- rust-i2c-driver-for-bosch-bme280-on-apache-nuttx
---

The BL602 is a popular RISC-V SoC from Bouffalo Lab, widely used in IoT applications due to its integrated Wi-Fi and Bluetooth capabilities. While Apache NuttX provides a robust RTOS environment for this chip, native driver support for specific peripherals like the Analog-to-Digital Converter (ADC) and the internal temperature sensor is sometimes a work in progress. The **bl602_adc** library fills this gap by providing a ported version of the BL602 MCU SDK's standard drivers specifically tailored for the NuttX ecosystem.

### Bridging the Gap in NuttX

As noted by the project maintainer, this library is intended as a functional stopgap. While the ideal way to access hardware in NuttX is through the standard character driver interface (e.g., `/dev/adc0`), this library allows developers to interact with the hardware using the logic from the original Bouffalo Lab SDK. This ensures high compatibility with the hardware's specific registers and timing requirements while running within a NuttX task.

The library includes core components for managing the ADC, the Global Register (GLB) for clock and pin configuration, and the EFuse Controller (EF_CTRL) which is often necessary for reading calibration data required by the temperature sensor.

### Key Features and Components

- **ADC Support**: Enables multi-channel analog data acquisition on the BL602.
- **Temperature Sensing**: Provides the necessary logic to read the internal SoC temperature sensor, including calibration offset handling.
- **SDK Portability**: The code is ported from the `bl_mcu_sdk` with minimal changes, making it easier for developers familiar with the vendor's original tools to transition to NuttX.
- **NuttX Integration**: Includes `Kconfig` and `Makefile` templates to integrate seamlessly into the NuttX build system as a library routine.

### Getting Started with Integration

To use this library, it must be added to the `libs` directory of your NuttX source tree. The recommended approach is using git submodules:

```bash
cd nuttx/nuttx/libs
git submodule add https://github.com/lupyuen/bl602_adc libbl602_adc
```

After adding the source, you must update the parent Makefiles and Kconfig files to recognize the new library. Once configured, the library can be enabled via the standard NuttX configuration menu:

```bash
make menuconfig
```

Under "Library Routines," you will find the option to enable the **BL602 ADC Library**. For those looking for a concrete implementation example, the project points to a companion test application, `bl602_adc_test`, which demonstrates how to initialize the peripheral and poll for data.

### Technical Architecture

The library consists of several low-level drivers that interact directly with the BL602 hardware registers:
- `bl602_adc.c`: Handles the ADC state machine, channel selection, and data conversion.
- `bl602_glb.c`: Manages global peripheral resets and clock gating.
- `bl602_ef_ctrl.c`: Interfaces with the internal eFuse to retrieve factory-programmed calibration values.

While this library bypasses the standard NuttX ADC subsystem, it provides a reliable path for developers who need immediate access to analog sensing capabilities on the BL602 platform today.
