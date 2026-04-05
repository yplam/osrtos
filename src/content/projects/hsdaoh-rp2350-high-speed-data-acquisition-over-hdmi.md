---
title: 'hsdaoh-rp2350: High Speed Data Acquisition over HDMI'
summary: A high-performance data acquisition framework for the Raspberry Pi Pico 2
  (RP2350) that leverages the HSTX peripheral to stream up to 175 MByte/s via HDMI.
  It enables real-time data transfer to a PC using low-cost USB3 HDMI capture sticks,
  supporting applications like logic analyzers, SDR, and high-speed ADC sampling.
slug: hsdaoh-rp2350-high-speed-data-acquisition-over-hdmi
codeUrl: https://github.com/steve-m/hsdaoh-rp2350
lastUpdated: '2026-01-25'
licenses:
- BSD-3-Clause
image: /202604/hsdaoh-rp2350_0.avif
rtos: ''
topics:
- dvi
- hdmi
- hsdaoh
- hstx
- ms2130
- raspberry-pi-pico-2
- rp2350
isShow: true
createdAt: '2026-04-05T00:58:03+00:00'
updatedAt: '2026-04-05T00:58:03+00:00'
---

The Raspberry Pi Pico 2, powered by the RP2350 microcontroller, introduced a powerful new peripheral: the High-Speed Serial Transmit (HSTX) port. While primarily intended for digital video output, the hsdaoh-rp2350 project repurposes this interface to solve a classic problem in embedded systems—getting massive amounts of data off a microcontroller and into a PC in real time without the overhead or bandwidth limitations of standard USB CDC or UART.

By leveraging the HSTX port to emulate HDMI signals, this project allows users to stream up to 175 MByte/s of raw data. The magic happens on the receiving end using inexpensive, widely available USB3 HDMI capture sticks based on the MacroSilicon MS2130 chipset. This setup effectively turns a $5 microcontroller and a $5 capture stick into a professional-grade data acquisition system.

## How it Works

At the heart of the project is `libpicohsdaoh`, a library that manages the complex task of encoding data into HDMI-compatible packets. It utilizes a DMA ring buffer to ingest data from various sources—such as the Programmable I/O (PIO) blocks or the internal ADC—and streams it out via the HSTX port. 

The project also implements HDMI data island encoding, which is necessary for sending the info frames that capture sticks require to recognize the incoming stream as valid video data. On the host PC, the data is received as a raw video stream, which can then be processed back into its original digital form using a companion host library.

## Versatile Applications

The repository includes several example applications that demonstrate the breadth of what 175 MByte/s of bandwidth enables:

*   **Logic Analyzer**: By sampling 16 GPIOs with the PIO, the system can function as a 16-bit logic analyzer running at 32 MHz.
*   **External ADC Sampling**: There is extensive support for high-speed parallel ADCs like the AD9226 (12-bit) and AD9238 (dual-channel). These are particularly useful for Software Defined Radio (SDR) or capturing legacy video signals for projects like `vhsdecode`.
*   **Internal ADC Overclocking**: The project demonstrates how to push the RP2350's internal ADC far beyond its rated specifications, achieving up to 7.9 MS/s by overvolting the internal regulator and using the USB PLL.
*   **SDR Integration**: Support for the AD9218 allows the RP2350 to act as a front-end for high-speed radio applications, replacing more expensive FPGA-based solutions.

## Hardware Support

While the primary target is the Raspberry Pi Pico 2, the project is designed to be compatible with other RP2350-based hardware. It has been tested with the Pico-DVI-Sock and is compatible with the Adafruit Feather RP2350 HSTX. For more complex setups, such as those requiring the extra GPIOs of the RP2350B, the project supports boards like the Solder Party RP2350 Stamp XL.

## Getting Started

Building the project requires the standard Raspberry Pi Pico SDK. Because the library is designed to be highly configurable, it is implemented as an INTERFACE library in CMake, allowing individual applications to define their own compile-time parameters for data packing and throughput. 

```cmake
# Example of linking the library in a CMakeLists.txt
target_link_libraries(my_app
    pico_stdlib
    hardware_pio
    hardware_dma
    libpicohsdaoh
)
```

Once built, the resulting UF2 file can be flashed to the board. The PIO programs included in the examples (such as `counter.pio` or `adc_12bit_input.pio`) show how to efficiently pack various bit-widths (10-bit, 12-bit, or 24-bit) into 32-bit words to maximize the efficiency of the DMA transfers to the HSTX hardware.
