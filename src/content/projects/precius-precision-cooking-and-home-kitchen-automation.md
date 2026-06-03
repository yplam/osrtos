---
title: 'Precius: Precision Cooking and Home Kitchen Automation'
summary: An open-source precision cooking platform built on the ESP32-S3 microcontroller.
  It utilizes PID control loops and dual NTC temperature sensors to manage a 1500W
  heating element, providing professional-grade temperature accuracy for home kitchen
  automation. The system features a tactile interface with a color LCD and physical
  controls, designed for reliability and user modification.
slug: precius-precision-cooking-and-home-kitchen-automation
codeUrl: https://github.com/WEkigai/Precius
siteUrl: https://wekigai.eu/precius
star: 12
version: v0.1
lastUpdated: '2025-09-03'
rtos: freertos
topics:
- automation
- cooking
- embedded
- esp32
- food
- kitchen
- temperature-control
isShow: false
createdAt: '2026-02-02'
updatedAt: '2026-02-02'
relatedProjects:
- reflow-oven-with-micropython-lvgl
- esphome-cosori-kettle-ble-component
- espgaggia-smart-coffee-machine-controller
- ikedrybox-smart-3d-filament-dryer
- elevourer-portable-intelligent-electronic-load
- eight-sleep-control-with-m5stack-atoms3
---

Precius is an ambitious open-source project that brings industrial-grade precision to the home kitchen. Developed by WEkigai, a small Dutch company, the project centers around the "Precius Station"—a smart cooktop designed to replace traditional, power-based heating with precise, temperature-controlled cooking. By focusing on the physical and chemical changes in food, Precius allows home cooks to achieve consistent results in techniques ranging from sous-vide and deep frying to searing and sautéing.

### Hardware Architecture

At its core, the Precius Station is an embedded system powered by the ESP32-S3 microcontroller. The system operates as a sophisticated control loop, bridging the gap between high-power heating and sensitive temperature feedback. It features a 1500W resistive heating element capable of reaching boiling temperatures rapidly, controlled via a Proportional-Integral-Derivative (PID) algorithm. This ensures the target temperature is reached quickly without overshooting, maintaining a steady state for the duration of the cooking process.

The hardware is designed with a "no-compromise" approach to kitchen environments. Eschewing "greasy touch screens," the interface relies on a 2.8-inch color LCD (320x240) paired with a 5-way navigation button and a rotary knob. This tactile approach ensures reliability even with wet or oily hands. Connectivity is handled through the ESP32's native WiFi and USB capabilities, the latter of which allows users to side-load custom firmware or monitor system performance via serial communication.

### Dual-Sensor Precision

One of the standout features of the Precius Station is its dual-sensor architecture. It includes a spring-loaded 100k NTC sensor that makes direct contact with the bottom of the cookware, as well as a 3.5mm jack for an external probe sensor. This allows the system to monitor both the pan temperature and the internal temperature of the food (like a steak) or a liquid (like frying oil) simultaneously, providing the PID controller with the data necessary for sub-degree accuracy.

### Expansion and Automation

Beyond the cooktop itself, the Precius Station includes an auxiliary 9V power port (max 5A). This port is intended to power a future ecosystem of accessories, such as sous-vide water circulators, dehydrator fans, or stirring attachments, effectively turning the station into a central hub for kitchen automation. The body is constructed from powder-coated steel for corrosion resistance, with high-temperature plastic covers for safety.

### Open Source Philosophy

The project is governed by strong open-source principles. The software is licensed under GPLv3, the hardware designs under CERN-OHL-S, and creative assets under CC BY-SA 4.0. This transparency ensures that the product remains repairable, upgradable, and free from the planned obsolescence or subscription models common in modern "smart" appliances. For developers, the project is fully compatible with the Arduino IDE, making it an accessible platform for experimentation in food science and automation.

WEkigai aims to sustain the project through hardware sales and optional services, following a business model inspired by successful open-source companies like Nabu Casa. By making the designs open, they invite the community to contribute to software development, mechanical design, and recipe testing, ensuring the project evolves based on user needs rather than shareholder value.
