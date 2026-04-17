---
title: Power-Pico
summary: Power-Pico is a high-precision, low-power analysis tool and USB ammeter designed
  for embedded developers. It features an STM32F411 MCU running FreeRTOS and the LVGL
  graphics library, enabling real-time waveform display and current measurement from
  1μA to 5A through multi-range automatic switching.
slug: power-pico
codeUrl: https://github.com/No-Chicken/Power-Pico
siteUrl: https://no-chicken.com/content/Power-Pico/intro.html
lastUpdated: '2026-04-05'
licenses:
- Apache-2.0
image: /202604/Power-Pico_0.avif
rtos: freertos
libraries:
- lvgl
topics:
- current-meter
- freertos
- lvgl
- power-analyzer
- stm32
- usb-pd
isShow: true
createdAt: '2026-04-17T08:38:57+00:00'
updatedAt: '2026-04-17T08:38:57+00:00'
---

Power-Pico is more than just a standard USB ammeter; it is a product-level portable low-power measurement analyzer specifically engineered for embedded developers. Traditional ammeters often struggle with the physical limitations of measuring micro-ampere level currents. Power-Pico addresses this with an innovative multi-gear automatic switching sampling design, achieving full-range coverage from $1\mu A$ to $5A$.


### Core Features

The device is built around several high-performance characteristics that make it suitable for professional analysis. It utilizes the INA190 zero-drift amplifier paired with three-stage resistance segmented sampling to achieve uA-level precision. Beyond measurement, it supports PD2.0 PPS protocol spoofing (decoy), allowing outputs up to 20V/5A. The user interface is powered by LVGL v9.2 running on an STM32F411, providing smooth real-time waveform displays on a 1.54" TFT screen. For external analysis, the project includes a companion desktop application, Power-Pico Client, developed with PySide6 for data export and real-time power analysis.

### Hardware Architecture

The hardware selection is optimized for both precision and processing power. The STM32F411CEU6 core runs at 100MHz, utilizing DSP instructions to accelerate waveform processing. Current sampling relies on the INA190 for its extremely low 0.5nA input bias current, which is critical for accurate low-power measurements. The internal 12-bit ADC of the STM32 works in tandem with DMA to achieve high-speed, stable sampling rates exceeding 10kHz.

![3D exploded view of the Power-Pico assembly](/202604/Power-Pico_3.avif)

The physical design is equally considered, featuring universal Type-C interfaces for easy connection to various adapters, and a 3D-printed enclosure with an acrylic panel for a professional finish.

### Software and Firmware Design

The project employs a robust BootLoader + App structure to facilitate easy firmware upgrades via USB. The memory is partitioned strategically: the first three sectors (48kB) house the BootLoader, followed by a 16kB sector for upgrade information and application integrity verification. The main application resides in the remaining flash space starting from sector 4. 

![Firmware memory partition layout](/202604/Power-Pico_13.avif)

For data communication, the system uses USB-CDC for high-speed transmission. Data is organized into packets containing 100 sets of measurements, totaling 711 bytes per packet including headers, ensuring that the desktop client receives high-fidelity data for analysis.

### Desktop Integration and Accuracy

The Power-Pico Client serves as the primary gateway for firmware updates and advanced data visualization. It allows users to record, zoom, and export waveforms into CSV or binary formats for secondary processing. The software also handles the "Force Boot" mode, allowing for recovery if the application firmware becomes corrupted.

![Power-Pico Client software interface](/202604/Power-Pico_5.avif)

In practical testing against professional equipment like the SDM3055 six-and-a-half-digit multimeter, Power-Pico demonstrates impressive accuracy. At the low end, it measures 52.03 uA with only a 0.02uA absolute error, while maintaining a relative error of roughly 1.0% to 2.9% across much higher current and voltage ranges.
