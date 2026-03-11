---
title: TOTEMX Split Keyboard
summary: A 38-key column-staggered split keyboard designed for Cherry MX spacing.
  It supports Seeed Studio XIAO RP2040 or nRF52840 microcontrollers and is a replica
  of the original TOTEM keyboard design adapted for 19.05x19.05mm switch spacing.
slug: totemx-split-keyboard
codeUrl: https://github.com/azhizhinov/TOTEMX
star: 50
lastUpdated: '2025-11-30'
rtos: zephyr
topics:
- ergonomic-keyboard
- mechanical-keyboard
- nrf52840
- split-keyboard
isShow: true
image: /202603/totemx.webp
createdAt: '2026-03-11'
updatedAt: '2026-03-11'
---

## Overview

TOTEMX is an open-source hardware project providing a 38-key column-staggered split keyboard. It is a specialized replica of the well-known TOTEM keyboard originally designed by GEIGEIGEIST. While the original TOTEM was designed for low-profile switches, the TOTEMX modification adapts the layout for standard MX spacing (19.05x19.05mm), allowing enthusiasts to use Cherry MX-compatible switches.

## Hardware and Design

The project is centered around the Seeed Studio XIAO form factor, offering flexibility in terms of processing power and connectivity. The design supports two primary microcontroller options:

- **Seeed Studio XIAO RP2040**: Ideal for high-performance wired builds.
- **Seeed Studio XIAO nRF52840**: Enables wireless Bluetooth connectivity for a cable-free split setup.

The PCB design includes a matrix of 38 keys, utilizing a column-staggered layout that conforms to the natural ergonomics of the hand. The schematic reveals a standard keyboard matrix using diodes for ghosting prevention and a TRRS (Audio Jack) connection for communication between the two halves in wired configurations. It also includes power management features like an SPDT switch for battery control in wireless builds.

## Firmware Compatibility

One of the strengths of the TOTEMX is its firmware compatibility. It shares the same firmware configuration as the original TOTEM. For wireless builds using the nRF52840, this typically involves the ZMK Firmware, which is built on the Zephyr RTOS. For wired builds using the RP2040, users can leverage QMK or KMK frameworks. This compatibility ensures that users have access to advanced features like layers, macros, and complex keymaps out of the box.

## Case Options and Customization

The repository provides several mechanical design options for the keyboard case. These include:
- **Integrated Nails Case**: A design where the structural 'nails' are part of the main body.
- **Independent Nails Case**: A variant for different assembly preferences.
- **Wireless-Specific Cases**: Contributions from the community, such as those by felixJR123 and yungcheng, provide cases optimized for battery fitment and low-profile aesthetics. 

The low-profile wireless case by yungcheng introduces specific tweaks like magnet insert holes for screw-less assembly and snug cut-outs for sockets, demonstrating the project's active community evolution.

## Technical Implementation

The repository contains complete KiCad source files, including schematics and PCB layouts. The electronic design is optimized for the XIAO's compact footprint, routing the matrix rows and columns to the available GPIO pins while maintaining a slim profile suitable for 3D-printed or CNC-milled enclosures. The use of standard TRRS jacks for the split interconnect makes it compatible with existing custom keyboard cables.
