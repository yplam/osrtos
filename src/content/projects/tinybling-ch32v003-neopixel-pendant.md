---
title: TinyBling - CH32V003 NeoPixel Pendant
summary: TinyBling is a wearable electronic pendant featuring 16 WS2812C-2020 addressable
  LEDs driven by a CH32V003 RISC-V microcontroller. It utilizes custom assembly-optimized
  bit-banging to control NeoPixels without hardware SPI, supporting various light
  animations and interactive games. The project is designed for compact PCB manufacturing
  and runs on a rechargeable LIR2032 coin cell.
slug: tinybling-ch32v003-neopixel-pendant
codeUrl: https://github.com/wagiminator/CH32V003-NeoPixel-Pendant
siteUrl: https://oshwlab.com/wagiminator/ch32v003-sparkly-pendant
lastUpdated: '2024-11-24'
licenses:
- NOASSERTION
image: /202604/CH32V003-NeoPixel-Pendant_0.avif
rtos: ''
libraries:
- platformio-platformio-core
topics:
- ch32v003
- led
- neopixel
- pendant
- risc-v
- wch
isShow: true
createdAt: '2026-04-07T23:53:12+00:00'
updatedAt: '2026-04-07T23:53:12+00:00'
---

TinyBling is a decorative wearable device designed to provide a sparkly, eye-catching effect through a ring of 16 addressable LEDs. While seemingly simple, the project serves as a practical demonstration of the CH32V003 microcontroller's capabilities, particularly in handling strict timing requirements with limited hardware resources.


## Hardware Architecture

The pendant is built around the CH32V003 series, an industrial-grade 32-bit RISC-V microcontroller. This MCU utilizes the QingKe RISC-V2A core, supporting the RV32EC instruction set with a 48MHz system frequency. Despite its small footprint, it includes 16KB of flash and 2KB of SRAM, making it an efficient choice for low-power consumer electronics.

For the display, the project uses WS2812C-2020 addressable LEDs. These are specialized "NeoPixels" that integrate the control IC and LED chip into a tiny 2020 package. They operate on a single-line return-to-zero protocol, where each pixel consumes 24 bits of data before forwarding the rest to the next LED in the chain. This specific model is chosen for its low current consumption (5mA), which is critical for battery-powered operation.

![TinyBling Hardware Schematic](/202604/CH32V003-NeoPixel-Pendant_1.avif)

Power is provided by a rechargeable LIR2032 coin cell battery. It is important to note that standard CR2032 batteries are insufficient for this project as they cannot provide the peak current necessary to power 16 LEDs simultaneously.

## Software Implementation and NeoPixel Control

The primary technical challenge of using the 8-pin variant of the CH32V003 is the lack of available hardware SPI pins. Standard NeoPixel libraries often rely on SPI or DMA to meet the strict 800kHz timing requirements. To overcome this, the firmware implements a custom software bit-banging protocol.

![NeoPixel Bit-Banging Timing Diagram](/202604/CH32V003-NeoPixel-Pendant_3.avif)

While the WS2812 datasheet suggests very tight tolerances, practical implementation reveals more flexibility. The critical requirement is ensuring that a "0" bit high-time (T0H) does not exceed 500ns, and a "1" bit high-time (T1H) stays above 625ns. The project uses an optimized inline assembly function to handle this transmission, ensuring the CPU frequency (8MHz in this configuration) is sufficient to toggle the GPIO pins within these windows. To prevent timing jitter, interrupts are disabled during the data transmission cycle.

```c
// Send one data byte to the pixels string (works at 8MHz CPU frequency)
void NEO_sendByte(uint8_t data) {
  asm volatile(
    " c.li a5, 8                \n"   // 8 bits to shift out
    " li a4, %[pin]             \n"   // neopixel pin bitmap
    " li a3, %[base]            \n"   // GPIO base address
    "1:                         \n"   // ... bit-banging logic ...
    // (Refer to source for full assembly implementation)
  );
}
```

## Firmware Variations

The repository provides three distinct firmware versions to demonstrate different use cases for the pendant:

*   **neo_demo**: Automatically cycles through various decorative light animations. If the user holds the button during power-up, they can manually switch animations with each press.
*   **neo_hunt**: A simple one-button reaction game. A green "hunter" LED chases a red "deer" LED. The player must time their button press perfectly to catch the deer, with the speed increasing after each success.
*   **neo_wof**: A digital "Wheel of Fortune" implementation where the LEDs spin and land on a random result after a button press.

## Assembly and Deployment

Building the TinyBling involves manufacturing the PCB using the provided Gerber files and soldering the surface-mount components. Because of the high density of the 2020 LEDs, careful soldering is required.

![PCB assembly and soldering view](/202604/CH32V003-NeoPixel-Pendant_2.avif)

Programming the CH32V003 is performed via the WCH-LinkE debugger using the single-wire serial debug interface (SDI). The project supports multiple build environments, including a standard Makefile-based GCC toolchain and PlatformIO. For developers on Linux, access permissions for the WCH-LinkE must be configured via udev rules to allow the `rvprog` utility to communicate with the hardware. The firmware also utilizes the MCU's standby mode to conserve energy, which may occasionally require a "power cycle erase" or "unbrick" procedure during development if the debug interface becomes unresponsive.
