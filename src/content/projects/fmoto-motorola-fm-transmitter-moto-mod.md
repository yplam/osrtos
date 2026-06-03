---
title: FMoto - Motorola FM Transmitter Moto Mod
summary: A hardware modification for the Motorola Moto Z that implements an FM transmitter
  using the NuttX RTOS. It leverages the Si4713 transmitter and UDA1334 DAC to broadcast
  audio via I2C and I2S signals. The project is built using the Moto Mods Developer
  Kit and follows the Greybus protocol for Android integration.
slug: fmoto-motorola-fm-transmitter-moto-mod
codeUrl: https://github.com/vixadd/FMoto
star: 5
lastUpdated: '2020-05-08'
rtos: nuttx
topics:
- android
- audio
- firmware
- fm-transmitter
- i2c
- mdk
- muc
- nuttx
- openocd
- signal
isShow: false
createdAt: '2025-12-28'
updatedAt: '2025-12-28'
relatedProjects:
- esp32fmradio
- si4732-radio
- jackal-modernized-sony-fx-300-audio-system
- espri-esp-radio-interface
- qn8066-fm-dsp-rx-tx-arduino-library
- ic-705-ci-v-band-decoder-and-transverter-controller
---

FMoto is an innovative hardware modification designed for the Motorola Moto Z ecosystem, developed as a CPEN Capstone project. The project transforms the Moto Z into a portable FM transmitter, allowing users to broadcast audio from their device to nearby FM radio receivers. This is achieved by creating a custom "Moto Mod" that interfaces directly with the smartphone's backplane using the Moto Mods Developer Kit (MDK).

### Hardware Architecture

The FMoto mod relies on two primary integrated circuits to handle audio processing and transmission:

*   **Si4713 FM Transmitter**: This chip acts as the core broadcast engine. It is controlled via I2C by the Mod Microcontroller (MuC), which serves as the I2C master. The Si4713 handles the modulation and RF transmission of the audio signal.
*   **UDA1334 I2S DAC**: This component receives high-quality digital audio signals from the Moto Highspeed Bridge (MHB) via the I2S interface. It converts the digital stream into analog signals (OUTL and OUTR), which are then fed into the Si4713 transmitter.

### Software Stack and RTOS

The system is built upon the NuttX real-time operating system (RTOS), which is the standard platform for Moto Mod firmware development. The project utilizes the Greybus protocol, a hardware-independent communication standard that allows the Android host to discover and control external hardware modules as if they were internal components.

A significant portion of the project involves configuring the RTOS to support the specific hardware interfaces required for FM transmission. This includes enabling Greybus support and I2S drivers through the NuttX configuration system. The project includes a dedicated driver for the SI4713 (`SI4713.c`), which implements the V4L2 (Video4Linux2) sub-device interface. This driver manages power states, frequency tuning (76-108 MHz), power levels, and RDS (Radio Data System) data transmission.

### Development and Build Process

Setting up the FMoto development environment involves several specialized tools common in embedded Linux and RTOS development:

*   **Toolchain**: Uses `gcc-arm-none-eabi` for cross-compilation targeting the ARM-based MuC.
*   **OpenOCD**: Used for hardware debugging and flashing via FTDI interfaces.
*   **Kconfig**: The project uses `kconfig-frontends` to manage system configuration, mirroring the configuration style of the Linux kernel.
*   **Android Integration**: Developers use Android Studio and Motorola's mod-lib packages to create the Android-side application that controls the transmitter's frequency and power settings.

The build process generates several output formats, including `nuttx.bin`, `nuttx.hex`, and `nuttx.tftf`. These files can be flashed to the mod using either OpenOCD or Motorola's MDK Utility application directly from an Android device, providing a flexible workflow for both low-level firmware engineers and application developers.
