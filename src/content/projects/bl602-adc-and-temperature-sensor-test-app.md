---
title: BL602 ADC and Temperature Sensor Test App
summary: A test application for the BL602 RISC-V microcontroller designed to run on
  the Apache NuttX RTOS. It demonstrates reading the internal temperature sensor via
  the ADC using a dedicated driver library.
codeUrl: https://github.com/lupyuen/bl602_adc_test
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
- bl602-adc-and-temperature-sensor-library-for-apache-nuttx
- rust-test-app-for-apache-nuttx-os
- lvgl-test-app-for-apache-nuttx
- tinycbor-test-app-for-apache-nuttx
- lora-test-app-for-semtech-sx1262-and-apache-nuttx
- lorawan-test-app-for-apache-nuttx
---

The BL602 is a popular RISC-V SoC known for its Wi-Fi and Bluetooth capabilities, but it also features a variety of internal peripherals, including an Analog-to-Digital Converter (ADC) and an internal temperature sensor. The **bl602_adc_test** project provides a straightforward way for developers to verify these hardware features when running the Apache NuttX RTOS.

### Project Overview

This repository contains a sample application that interfaces with the BL602's internal temperature sensor. Rather than being a standalone driver, this app acts as a consumer of the [bl602_adc library](https://github.com/lupyuen/bl602_adc), showcasing how to integrate ADC readings into a NuttX-based firmware project. The application is structured as a standard NuttX "built-in" application, meaning it can be launched directly from the NuttX Shell (NSH).

### Technical Details

The application is built using the standard NuttX build system components:
- **Kconfig**: Defines the configuration options, such as the program name (`bl602_adc_test`), stack size, and task priority.
- **Makefile**: Integrates the source code into the NuttX build process using the `Application.mk` framework.
- **bl602_adc_test_main.c**: The main entry point that initializes the ADC and loops to read and display temperature data.

When executed, the app calculates the temperature in Celsius and outputs both the raw offset and the converted temperature value to the console. This is particularly useful for debugging thermal management or verifying that the ADC driver is correctly calibrated.

### Getting Started

To use this application, it should be added to an existing NuttX environment as a submodule within the `apps/examples` directory:

```bash
cd nuttx/apps/examples
git submodule add https://github.com/lupyuen/bl602_adc_test
```

Once added, you must update your NuttX configuration. This involves running `make menuconfig` and enabling the app under `Application Configuration → Examples → BL602 ADC Test App`. The project is compatible with the `bl602evb:nsh` configuration, though the README also suggests potential compatibility with ESP32 boards if the underlying ADC drivers are present.

### Example Output

Once the firmware is flashed and the NuttX Shell is active, running the command `bl602_adc_test` will produce a log similar to the following:

```text
nsh> bl602_adc_test
offset = 2209
temperature = 14.317039 Celsius
Internal Temperature: 14.317039 deg C
offset = 2209
temperature = 14.575004 Celsius
Internal Temperature: 14.575004 deg C
```

This project serves as an excellent reference for developers looking to implement sensor monitoring on RISC-V hardware using the Apache NuttX ecosystem.
