---
title: osillyscope
summary: A compact, inexpensive digital oscilloscope built around the CH32V003 RISC-V
  microcontroller and an SSD1306 OLED display. It features a maximum sample rate of
  1.6MSa/s and an analog frontend supporting signal ranges from -3.3V to +3.3V. The
  project leverages the ch32fun framework and utilizes DMA and analog watchdog features
  for efficient signal processing.
slug: osillyscope
codeUrl: https://github.com/tvlad1234/osillyscope
lastUpdated: '2025-12-27'
licenses:
- MIT
image: /202604/osillyscope_0.avif
rtos: ''
topics:
- analog
- ch32v003
- ch32v003fun
- frontend
- oled
- oled-display-ssd1306
- opamp
- oscilloscope
- pcb
- pcbway
isShow: true
createdAt: '2026-04-06T23:56:41+00:00'
updatedAt: '2026-04-06T23:56:41+00:00'
---

The osillyscope is a miniature digital oscilloscope designed to provide a low-cost, portable solution for basic signal analysis. Built around the ultra-affordable CH32V003A4M6 RISC-V microcontroller, this project demonstrates how much utility can be squeezed out of a low-pin-count, entry-level MCU. The device uses a standard SSD1306 I2C OLED display and three pushbuttons to provide a functional user interface for checking signal presence, levels, and waveforms.

### Hardware Architecture and Frontend

The core of the osillyscope's performance lies in its analog frontend. To handle a signal range of -3.3V to +3.3V, the design incorporates a 2x attenuator, a TL082 dual opamp buffer stage, and a DC offset stage. To manage the negative voltage requirements of the opamp, an ICL7660 voltage converter IC is used to generate a negative supply rail. This allows the device to be powered from a simple 5V source or even a 9V battery.

One of the impressive aspects of this design is its input impedance. By maintaining a 1MOhm impedance, the osillyscope can be used with standard 10x oscilloscope probes, effectively extending its input range for higher voltage applications. Despite the simplicity of the components, the analog frontend achieves a measured bandwidth of approximately 2.5MHz.

### Firmware and Signal Processing

On the software side, the project is built using the `ch32fun` framework, a lightweight development environment for the CH32V003. To maximize the sampling performance of the 10-bit ADC, the firmware operates in continuous conversion mode. Data is transferred from the ADC to a circular buffer using Direct Memory Access (DMA), which offloads the processing burden from the CPU and ensures the system can keep up with the 1.6MSa/s sample rate.

Triggering—a critical feature for any oscilloscope—is implemented using the CH32V003's analog watchdog feature. This hardware-level monitoring allows the system to detect trigger conditions efficiently without constant polling in software. This architecture enables the time base to go as low as 5us/div, providing clear visualization of high-frequency signals.

### PCB Design and Implementation

The project provides two distinct hardware paths for builders. For those looking for professional results, there is a 2-layer PCB design suitable for fabrication services. For hobbyists who prefer DIY manufacturing, the repository also includes a single-layer "etchable" design optimized for home fabrication. Both designs emphasize a low component count to keep the bill of materials (BOM) minimal and the assembly process straightforward.

The osillyscope serves as an excellent reference for developers working with RISC-V microcontrollers, showing how to implement real-time signal acquisition, processing, and visualization on extremely resource-constrained hardware.
