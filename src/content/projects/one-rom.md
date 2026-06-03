---
title: One ROM
summary: A flexible, low-cost ROM replacement for retro computers based on Raspberry
  Pi RP2350 or STM32F4 microcontrollers. It emulates 24-pin and 28-pin ROMs with software-defined
  chip selects and supports serving multiple images simultaneously from a single device.
slug: one-rom
codeUrl: https://github.com/piersfinlayson/one-rom
siteUrl: https://onerom.org
star: 190
version: v0.5.10
lastUpdated: '2026-01-11'
rtos: ''
topics:
- commodore
- one-rom
- onerom
- raspberry-pi
- rom
- stm32
- stm32f4
isShow: true
image: /202601/one-rom.webp
createdAt: '2026-01-12'
updatedAt: '2026-01-12'
relatedProjects:
- msx1-emulator-for-raspberry-pi-pico
- pc-6001mkii-emulator-for-raspberry-pi-pico
- retrojam-multi-retro-game-console-emulator
- japi-base
- t-hmi-c64-emulator
- pico-smsplus-sega-master-system-and-game-gear-emulator
---

One ROM (formerly known as Software Defined Retro ROM or SDRR) is a versatile hardware and firmware solution designed to replace obsolete or failing ROM chips in vintage computers. By leveraging modern microcontrollers, One ROM provides a highly configurable alternative to traditional EPROMs, offering features that were impossible with original hardware, such as software-defined chip selects and multi-image serving.

## Hardware Flavors: Fire and Ice

The project is available in two primary hardware configurations based on the choice of microcontroller:

- **One ROM Fire (🔥):** Powered by the Raspberry Pi RP2350. This version utilizes the RP2350's Programmable I/O (PIO) blocks to serve ROM data autonomously. This allows for extremely low latency and high-speed emulation even at lower clock frequencies, making it ideal for systems with tight timing requirements.
- **One ROM Ice (❄️):** Based on the STM32F4 series (including F401, F405, F411, and F446). This version relies on high-speed interrupt handling and optimized assembly loops to meet the timing demands of retro systems.

Both versions are designed to fit the exact footprint of original 24-pin and 28-pin ROMs, ensuring they do not overhang or interfere with other components on the host motherboard.

## Key Features and Capabilities

One ROM is designed to be a "drop-in" replacement for a wide array of systems, including the Commodore 64, VIC-20, PET, Atari 8-bit series, BBC Micro, and various disk drives. 

### Software-Defined Configuration
Unlike traditional ROM replacements that require physical jumpers to configure chip select (CS) pins, One ROM is entirely software-configurable. This allows users to emulate various ROM types (2704 through 27512 and 2316 through 23512) and their specific active-high or active-low logic requirements without hardware modifications.

### Multi-ROM and Bank Switching
A single One ROM device can store up to 16 different ROM images. Furthermore, it can replace multiple physical chips simultaneously. For example, a single One ROM can serve the Kernel, BASIC, and Character ROMs for a Commodore 64 at the same time. It also supports dynamic bank switching via external pins (X1/X2), allowing users to switch between different character sets or OS versions while the host computer is running.

### Modern Tooling and Debugging
The project includes **One ROM Studio**, a desktop application for Windows, Mac, and Linux that simplifies the process of creating firmware images and flashing devices. For advanced users, the system supports **Airfrog** or other SWD probes, enabling runtime telemetry and the ability to hack ROM images while they are being served.

## Technical Implementation

The firmware is built using a combination of C and Rust. The build system is managed via a comprehensive Makefile that handles everything from image collation to binary generation. On the RP2350, the project pushes the boundaries of the hardware by using PIO and DMA to serve data without CPU intervention, which significantly reduces power consumption and improves stability in high-speed retro systems.

For those interested in the hardware design, the repository includes KiCad files for various PCB revisions, including USB-enabled versions that allow for programming directly from a web browser without needing an external programmer.
