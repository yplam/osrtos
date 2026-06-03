---
title: SPINC - DIY Automatic Battery Charger
summary: An open-source NiMH battery charging station featuring automatic cell loading
  and ejection. It supports fast-charging AA cells at up to 1A with electronic polarity
  correction and comprehensive monitoring of voltage, temperature, and charge time.
  The device also functions as a desk clock using an LVGL-based monochrome LCD interface.
slug: spinc-diy-automatic-battery-charger
codeUrl: https://github.com/CoretechR/SPINC
star: 427
version: '1.0'
lastUpdated: '2025-06-11'
rtos: ''
libraries:
- lvgl
topics:
- battery
- charger
- clock
- display
- nimh
- rp2040
isShow: true
image: /202602/SPINC_assembled.webp
createdAt: '2026-02-14'
updatedAt: '2026-02-14'
relatedProjects:
- battery-health-monitor
- bitclock
- noteit-uart-datalogger
- esp32-remote-for-victron
- shelf-edge-clock
- ch32v003-usb-meter
---

## Overview

SPINC (Sequential Polar-Independent NiMH Charger) is an innovative open-source charging station designed to automate the management of AA NiMH batteries. Unlike traditional chargers that require manual placement and correct orientation, SPINC allows users to simply drop batteries into the device. Its internal mechanism handles the rest, picking up one cell at a time, correcting for polarity electronically, and fast-charging them sequentially.

Beyond its primary function as a charger, SPINC serves as a functional desk accessory. It features a high-resolution monochrome LCD that displays the date and time, integrated into a compact, fully 3D-printed enclosure.

## Key Features

SPINC is packed with features that bridge the gap between a DIY project and a consumer-grade appliance:

- **Automatic Handling**: The device features a mechanical system for automatic cell loading and ejection, reducing the manual effort required to manage large batches of batteries.
- **Polarity Correction**: One of the standout technical features is electronic polarity correction, which allows batteries to be inserted in any orientation without risk of damage or failure to charge.
- **High-Speed Charging**: It supports fast-charging AA NiMH cells at currents up to 1A, ensuring batteries are ready for use quickly.
- **Comprehensive Monitoring**: The system tracks critical safety and health metrics, including battery voltage, temperature, and total charge time to ensure optimal battery longevity.
- **Integrated Storage**: The internal mechanism can store up to seven fully charged batteries, providing a convenient dispenser for ready-to-use cells.

## Technical Implementation

The project is built using a combination of custom hardware and sophisticated software. The firmware is developed using the PlatformIO ecosystem, leveraging the **LVGL (Light and Versatile Graphics Library)** to drive its 240x400px monochrome LCD. This allows for a polished user interface that displays both charging status and real-time clock information.

The hardware side of the project is equally robust, consisting of:
- **3D-Printed Components**: The entire chassis and mechanical loading system are designed for 3D printing, making the project accessible to makers.
- **Custom PCB**: The electronics are housed on a dedicated PCB designed to handle the 1A charging current and the logic required for polarity detection and correction.
- **CAD Files**: The repository includes full CAD data, allowing for modifications or repairs to the mechanical structure.

## User Interface and Aesthetics

The use of LVGL enables a high-quality graphical experience on a monochrome screen. The interface provides clear feedback on the charging process while doubling as a minimalist desk clock when the device is idle. The combination of the mechanical "click-clack" of the battery loader and the sleek digital display makes SPINC a unique addition to any workspace.

## Getting Started

For those interested in building their own SPINC, the repository provides the necessary building blocks, including the PCB design files, CAD models for the 3D-printed parts, and the source code. The project is organized for use with PlatformIO, making it straightforward to compile and flash the firmware once the hardware is assembled.
