---
title: iMX RT1011 Nano Kit
summary: A high-performance development board featuring the NXP iMX RT1011 Crossover
  MCU with an ARM Cortex-M7 core running at 500MHz. It supports the Zephyr RTOS and
  Python environments, offering 128 KB RAM, 128 Mb QSPI Flash, and a compact USB-C
  form factor for rapid prototyping.
slug: imx-rt1011-nano-kit
codeUrl: https://github.com/makerdiary/imxrt1011-nanokit
siteUrl: https://wiki.makerdiary.com/imxrt1011-nanokit
version: 1.0.0
lastUpdated: '2025-02-26'
licenses:
- Apache-2.0
image: /202606/imxrt1011-nanokit_0.avif
rtos: zephyr
libraries:
- littlefs
- lvgl
- micropython
topics:
- circuitpython
- imxrt
- imxrt1010
- mcu
- microcontroller
- nxp
- python
- zephyr
- zephyr-rtos
- zephyros
isShow: true
createdAt: '2026-06-04T00:46:29+00:00'
updatedAt: '2026-06-04T00:46:29+00:00'
relatedProjects:
- micropython-for-pandora-iot-board
- i-mx-rt-cpu-support-package-for-crossworks
- mbed-os-6-port-for-weact-stm32h743vit6
- micropython-for-sparrow-one-board
- nxp-i-mx-rt-development-platform
- stm32h743zi-rust-playground
---

The iMX RT1011 Nano Kit is a high-performance prototyping platform designed around the NXP iMX RT1011 Crossover MCU. This board is built for applications that demand high CPU performance and rapid real-time response, leveraging an Arm Cortex-M7 core that operates at speeds up to 500 MHz.


### Key Features and Hardware Capabilities
The board is equipped with 128 KB of on-chip RAM, which can be flexibly configured as Tightly Coupled Memory (TCM) for the M7 core or as general-purpose memory. It includes 128 Mbit of external QSPI flash that supports Execute-in-Place (XIP) and on-the-fly decryption. The hardware is packaged in a compact 40-pin DIP/SMT form factor, measuring 55.88mm x 20.32mm, making it suitable for both breadboarding and direct surface-mount integration.

For connectivity and expansion, the kit provides up to 33 multi-function GPIO pins, 15 of which can be configured as ADC inputs. It supports a wide array of peripherals, including high-speed USB, UART, SPI, I2C, SAI, and PWM. Power management is handled by an integrated TPS63802 buck-boost converter, allowing the board to operate from input voltages ranging from 1.8V to 5.5V while providing a stable 3.3V output at up to 2A.

![iMX RT1011 Nano Kit hardware diagram and pinout](/202606/imxrt1011-nanokit_1.avif)

### Hardware Architecture
The kit features a reversible USB-C connector for power and data. User interaction is supported by a programmable red LED (mapped to GPIO_SD_4) and a user button (USR/BT) that doubles as a boot mode trigger. A dedicated Reset (RST) button is also included. For professional debugging, the board exposes an Arm Serial Wire Debug (SWD) port via edge pins, requiring 3.3V logic level connections.

Boot configuration is managed through the USR/BT button; holding it during power-up enters the Serial Downloader mode. This ensures that users can recover the device or update firmware even if the primary bootloader becomes corrupted.

### Software Ecosystem and RTOS Support
The iMX RT1011 Nano Kit is built on an open-source foundation and provides first-class support for the Zephyr RTOS. The project's `west.yml` manifest manages a suite of essential modules, including the NXP HAL, CMSIS, and libraries like LVGL for graphics and LittleFS or FatFS for robust filesystem management. 

In addition to RTOS support, the board is compatible with Python-based environments such as CircuitPython, facilitating rapid prototyping for developers who prefer high-level scripting. To simplify the development workflow, the kit is shipped with the UF2 Bootloader. This allows for "drag-and-drop" programming, where the board appears as a standard USB mass storage device, and firmware updates are performed by simply copying a `.uf2` file to the drive.

### Getting Started
An out-of-box demo is pre-flashed on the kit, which blinks the red LED and streams system logs over the USB serial console. To start development, users connect the board via USB-C and can immediately interact with the device through a serial terminal. For more complex projects, the platform is fully integrated into the Zephyr Project ecosystem and can also be managed using the MCUXpresso Secure Provisioning Tool for advanced image preparation.
