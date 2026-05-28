---
title: Shrike FPGA Development Boards
summary: Shrike is a family of low-cost, open-source FPGA development boards paired
  with microcontrollers like the RP2040, RP2350, and ESP32-S3. These boards feature
  a Renesas FPGA with 1120 LUTs, designed to bridge the gap between embedded microcontrollers
  and reconfigurable logic for learners and hobbyists.
slug: shrike-fpga-development-boards
codeUrl: https://github.com/vicharak-in/shrike
siteUrl: https://vicharak-in.github.io/shrike/
version: v1.0.0
lastUpdated: '2026-05-26'
licenses:
- GPL-2.0
image: /202605/shrike_0.avif
rtos: ''
libraries:
- micropython
topics:
- esp32
- fpga
- fpga-board
- open-source
- opensource-projects
- opensource-toolchain
- rp2040
- rp2350
- shrike
- shrike-devboard
- shrike-fpga
- shrike-lite
isShow: true
createdAt: '2026-05-27T01:54:07+00:00'
updatedAt: '2026-05-27T01:54:07+00:00'
---

The Shrike family represents a thoughtful approach to making FPGA technology accessible to the broader maker community. Born from a passion project at Vicharak, these boards combine the versatility of popular microcontrollers with the power of reconfigurable logic. By pairing a Renesas FPGA with ubiquitous MCUs like the Raspberry Pi RP2040 or the ESP32-S3, Shrike provides a stepping stone for those moving from standard embedded programming into the world of heterogeneous computing.

The lineup consists of three primary members: the Shrike-lite, powered by the RP2040; the standard Shrike, featuring the newer RP2350; and the Shrike-fi, which utilizes an ESP32-S3 to provide integrated Wi-Fi and Bluetooth connectivity. Despite the different host controllers, the core FPGA remains consistent across the family: a Renesas device offering 1120 5-input LUTs. This consistency ensures that logic designs can be easily ported across the different variants depending on the connectivity or processing needs of the project.

One of the most compelling aspects of the Shrike architecture is the dedicated FPGA-to-MCU interface. This link (typically 4-bit or 6-bit) allows the microcontroller to act as a manager for the FPGA, handling tasks like bitstream loading, data processing, or providing a bridge to external peripherals. This hybrid approach is ideal for applications where the FPGA handles high-speed, parallel logic tasks while the MCU manages higher-level protocols or user interfaces.

The hardware is designed with the hobbyist in mind. Each board is breadboard-compatible and includes a standard PMOD connector, making it easy to expand the system with existing peripheral modules. Power and programming are handled through a single USB Type-C port. For those using the Shrike-fi, there are even options for onboard battery management and PSRAM expansion, though these are typically DIY additions to the base model.

Developing for Shrike involves two distinct workflows. On the microcontroller side, developers can leverage familiar environments like the Pico SDK, Arduino, or MicroPython. For the FPGA logic, users utilize the Renesas "Go Configure" hub to write Verilog and generate bitstreams. This dual-environment setup allows for a flexible development process where software and hardware logic can be iterated upon independently.

True to its mission of accessibility, the Shrike project is entirely open-source. The software is licensed under GPL-2.0, while the hardware designs—including schematics, PCB layouts, and RTL—are released under the CERN Open Hardware License v1.2. This commitment ensures that the community can not only use the boards but also learn from their design and contribute back to the ecosystem.
