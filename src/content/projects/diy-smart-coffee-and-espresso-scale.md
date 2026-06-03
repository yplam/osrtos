---
title: DIY Smart Coffee and Espresso Scale
summary: A high-precision smart coffee scale project featuring ESP32 firmware written
  in Rust and a Svelte-based Progressive Web App. It utilizes an HX711 load cell with
  Kalman filtering for real-time weight tracking and communicates via Bluetooth Low
  Energy to provide live extraction curves and timer functionality.
codeUrl: https://github.com/beeb/coffee-scale-app
siteUrl: https://coffee.beeb.li
isShow: false
rtos: freertos
libraries:
- nimble
topics:
- coffee
- coffee-scale
- esp32
- js
- micropython
- vuejs
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- la-marzocco-round-controller
- espgaggia-smart-coffee-machine-controller
- gaggimate
- smart-flask-thermos-with-round-display-and-esp32-c3
- coffee-bin-mqtt
- esphome-cosori-kettle-ble-component
---

For coffee enthusiasts and home baristas, precision is everything. The DIY Smart Coffee and Espresso Scale project bridges the gap between high-end commercial smart scales and DIY hardware, providing a robust ecosystem for tracking espresso extractions in real-time. This project consists of two main components: a high-performance Rust-based firmware for the ESP32 microcontroller and a modern Svelte-powered Progressive Web App (PWA).

### The Hardware and Firmware
At the heart of the scale is an ESP32 microcontroller interfaced with an HX711 load cell amplifier. Unlike many DIY projects that rely on MicroPython, this project leverages the power of Rust. The firmware, located in the `rs` directory, utilizes the ESP-IDF framework (built on FreeRTOS) to handle multi-core processing. This allows the scale to maintain a high sampling rate for the load cell while simultaneously refreshing a 128x32 OLED display and managing Bluetooth Low Energy (BLE) communications.

To ensure the weight readings are both responsive and stable, the project implements a Kalman filter via the `signalo_filters` crate. This helps smooth out the noise inherent in high-sensitivity load cells, which is critical when trying to hit a specific target ratio during a fast-flowing espresso shot.

### Real-time Extraction Tracking
The scale communicates with a web-based interface using the Web Bluetooth API. This allows users to access the scale's data from any compatible browser (like Chrome or Opera) without needing to install a native app. The web application, hosted at [coffee.beeb.li](https://coffee.beeb.li), provides a visual dashboard for the brewing process.

Key features of the application include:
- **Reference Curves**: A grey reference curve is displayed to help users match their extraction flow to a target profile.
- **Auto-Timer**: The timer automatically triggers as soon as the scale detects more than 0.5g of liquid in the cup, accounting for user-defined pre-infusion times.
- **Settings Persistence**: User parameters such as coffee weight, target ratio, and pre-infusion time are saved in the browser's local storage.

### Workflow and Usage
The project is designed with a specific workflow for espresso preparation:
1. The user tares the portafilter and weighs the coffee grounds.
2. The "Read" button in the app captures the ground weight to calculate the target yield based on a chosen ratio.
3. Once the cup is placed and tared, the user starts recording. The app waits for the first drop to hit the cup to start the timer.
4. During extraction, the user can follow the live graph to ensure the flow rate is consistent with their goals.

### Technical Stack
The project is a showcase of modern embedded and web technologies:
- **Firmware**: Written in Rust using `esp-idf-svc`, `esp32-nimble` for BLE, and `ssd1306` for display management.
- **Web App**: Built with Svelte 5, Tailwind CSS, and Chart.js for data visualization.
- **Hardware Support**: Primarily targets the ESP32, with 3D design files available for the physical scale body.

Whether you are looking to build your own precision scale or interested in how Rust can be applied to real-time embedded systems, this project provides a comprehensive and open-source blueprint for high-quality coffee gear.
