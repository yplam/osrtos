---
title: Loongcat40 Keyboard
summary: A 4x10 gasket-mounted mechanical keyboard powered by the Raspberry Pi Pico
  (RP2040). It features a large 2.08-inch SH1122 OLED display and utilizes QMK firmware
  for extensive customization.
slug: loongcat40-keyboard
codeUrl: https://github.com/ChrisChrisLoLo/loongcat40
star: 34
lastUpdated: '2026-01-08'
rtos: chibios-rt
topics:
- 3d-models
- 3d-printing
- 4x10
- firmware
- freecad
- gasket
- hotswap
- keyboard
- kicad
- oled
- ortholinear
- ortholinear-keyboard
- pcb
- raspberry-pi-pico
- sh1122
- step
- stl
isShow: true
image: /202601/loongcat40.webp
createdAt: '2026-01-14'
updatedAt: '2026-01-14'
relatedProjects:
- gesture-detecting-macro-keyboard
- clawtype
- hd2-macropad
- kmk-firmware
- aw-1-keyboard
- claude-buddy-pico
---

## Overview

The Loongcat40 is a custom 40% mechanical keyboard project that represents the culmination of five years of design evolution. Featuring a 4x10 ortholinear-style layout, the board is designed with a gasket-mounted plate system to provide a premium typing experience. A standout feature of the design is the integration of a large 2.08-inch OLED display, providing significantly more screen real estate than the standard 0.91-inch or 0.96-inch displays commonly found on custom keyboards.

## Hardware Architecture

The project is built around the Raspberry Pi Pico (RP2040), chosen for its availability and powerful dual-core ARM Cortex-M0+ processor. The Pico is integrated into the PCB design using its castellated pins, allowing for a low-profile assembly without the need for bulky pin headers. 

**Key hardware specifications include:**
- **Controller:** Raspberry Pi Pico 1 (RP2040)
- **Display:** 2.08" SH1122 OLED LCD
- **Mounting:** Gasket mount using 3mm poron strips
- **Switch Support:** 40 hotswap sockets with individual diodes
- **Case Design:** Multi-part 3D printed assembly including top case, bottom case, and plates

The PCB design has gone through several iterations, with the v0.0 version successfully tested and the v0.1 version refining the circuit, specifically addressing GPIO pull-up requirements for the RP2040.

## Firmware and Customization

The Loongcat40 runs on the industry-standard QMK (Quantum Mechanical Keyboard) firmware. This allows users to fully customize their keymaps, layers, and OLED behavior. The firmware implementation leverages ChibiOS-RT to manage the RP2040's resources and the SH1122 display driver. Because it uses QMK, the board supports advanced features like tap-dance, mod-tap, and complex macros, which are essential for navigating a compact 40-key layout.

## Mechanical Design and Assembly

The keyboard utilizes a gasket mount system, where the plate is sandwiched between poron foam strips. This isolates the plate from the case, dampening vibrations and creating a more consistent sound profile. The assembly process is unique due to the large OLED; the project includes custom 3D-printed TPU standoffs to ensure the display is perfectly aligned during the soldering process.

The case is designed to be 3D printed in PLA or similar materials, consisting of a top and bottom shell secured by M2 screws. The design emphasizes accessibility, allowing enthusiasts to produce the case and plates on standard hobbyist 3D printers while sourcing the PCB and components from common vendors.
