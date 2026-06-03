---
title: Puntero34 Pointer Peripheral
summary: A low-profile, 17-switch pointer peripheral designed for Seeed Studio XIAO
  BLE or Pro Micro form factor MCUs. It integrates a PAT9125EL optical sensor with
  a custom magnetic trackball mount and runs on the ZMK firmware framework.
slug: puntero34-pointer-peripheral
codeUrl: https://github.com/badjeff/puntero34
star: 26
lastUpdated: '2025-12-10'
rtos: zephyr
topics:
- keyboard
- nrf52840
- pat9125el
- peripherals
- trackball
- zmk
isShow: false
createdAt: '2026-02-03'
updatedAt: '2026-02-03'
relatedProjects:
- custom-5x7-dactyl-manuform-with-integrated-trackball
- clawtype
- aw-1-keyboard
- gesture-detecting-macro-keyboard
- m5-keyboard-and-mouse-emulator
- polymath-studio-one-handed-keyboard-ps-ohk
---

## Overview

Puntero34 is an innovative, low-profile input peripheral that combines the utility of a 17-key macro pad with a precision optical pointer. Designed for enthusiasts of custom human interface devices (HIDs), it emphasizes a compact footprint and high-quality tactile feedback. The project is built around the Seeed Studio XIAO BLE or other Pro Micro-compatible microcontrollers, making it a versatile choice for wireless or wired setups.

## Design and Hardware

The Puntero34 is engineered with a focus on slim aesthetics and functional density. At its core is the PAT9125EL-TKIT optical sensor, which provides tracking capabilities via a unique trackball implementation. Unlike traditional trackballs, this design uses a tiny 4.75mm stainless steel ball held in place by neodymium disc magnets, ensuring smooth rotation within a 3D-printed housing.

**Key hardware components include:**
- **Microcontroller:** Seeed Studio XIAO BLE (nRF52840) for Bluetooth connectivity.
- **Switches:** 34 Kailh PG1353 Choc v2 switches (across a split or dual-unit setup) providing a low-profile mechanical feel.
- **Sensor:** PAT9125EL-PCB breakout for high-performance optical tracking.
- **Construction:** 3D-printed enclosures with straight-edge aesthetics and stainless steel hardware.

## Firmware and Configuration

The device leverages the powerful ZMK Firmware, an open-source keyboard firmware focused on wireless connectivity and low power consumption. Because ZMK is built on the Zephyr RTOS, the Puntero34 benefits from robust task scheduling and efficient power management, which is critical for battery-powered operation using LiPo cells.

The firmware configuration defines a key scan matrix and integrates the optical sensor data into the HID report. Users looking to build the Puntero34 should be familiar with ZMK's shield configuration system, as the project requires custom mapping of GPIOs for the switch matrix and SPI/I2C communication for the sensor.

## Build Considerations

This project is intended for intermediate to advanced makers. It requires experience with ZMK firmware, precision soldering of SMD components (like the 1N4148W diodes), and fine-tuned 3D printing. The trackball mount, in particular, requires a 0.2mm nozzle for the necessary precision. The repository provides the necessary STL files for the left side, which can be mirrored in a slicer for the right-hand unit, alongside a detailed Bill of Materials (BOM) to guide the sourcing of components.
