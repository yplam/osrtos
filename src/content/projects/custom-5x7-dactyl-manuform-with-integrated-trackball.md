---
title: Custom 5x7 Dactyl Manuform with Integrated Trackball
summary: An ergonomic split keyboard project featuring a 5x7 Dactyl Manuform layout
  and an integrated PMW3610 trackball. It runs on ZMK Firmware powered by the Zephyr
  RTOS and utilizes an nRF52840 microcontroller for wireless connectivity.
slug: custom-5x7-dactyl-manuform-with-integrated-trackball
codeUrl: https://github.com/trentrand/ergonomic-keyboard
siteUrl: https://www.trentrand.com
version: v1.0
lastUpdated: '2026-01-20'
rtos: zephyr
topics:
- ergonomic-keyboard
- handwired-keyboard
- nrf52840
- pmw3610
- zmk
- zmk-config
isShow: true
image: /202604/ergonomic-keyboard.webp
createdAt: '2026-04-06T23:51:31+00:00'
updatedAt: '2026-04-06T23:51:31+00:00'
---

The Dactyl Manuform is a legendary design in the ergonomic keyboard world, known for its concave key wells that follow the natural curvature of the fingers. This project takes that foundation and enhances it with a seamlessly integrated trackball, creating a comprehensive input device that keeps your hands in a neutral position while providing precise pointer control.

### Hardware Architecture

The build is centered around the SuperMini nRF52840, a Pro Micro-compatible microcontroller that provides Bluetooth Low Energy (BLE) support. The physical enclosure is generated using the Cosmos Dactyl Generator and 3D printed in PLA. To accommodate the trackball, the design incorporates a PMW3610 optical sensor. This sensor is particularly well-suited for wireless builds due to its ultra-low power consumption.

The PMW3610 is mounted on a custom breakout board. Because the sensor itself is a specialized component, the breakout board simplifies the integration by providing accessible pins for SPI communication. The wiring utilizes 28 AWG enameled copper wire, which is ideal for the tight spaces within a 3D-printed keyboard shell as the insulation can be melted away during soldering, allowing for cleaner and more compact cable management.

### Software and Firmware

This keyboard runs on ZMK Firmware, a modern keyboard framework built on the Zephyr Real-Time Operating System (RTOS). ZMK is specifically designed for wireless keyboards, leveraging Zephyr's power management features to maximize battery life. 

To enable the trackball functionality, the project uses a custom branch of ZMK that implements pointer movement and scrolling. This is paired with a dedicated Zephyr driver for the PMW3610 sensor. The integration between the sensor and the firmware is handled over an SPI interface, with the following pin configuration:

*   **SDIO (P1.00):** Bidirectional data line for SPI.
*   **SCLK (P0.24):** SPI clock signal.
*   **NCS (P0.22):** Chip select.
*   **MOT (P0.20):** Motion interrupt pin to signal the MCU when the trackball is moved.

### Build and Assembly

The assembly process involves a mix of 3D printing, hand-wiring, and mechanical assembly. The switch matrix is constructed using Kailh hot-swap sockets and 1N4148 Schottky diodes. For the trackball mechanism, the project uses a 1.34-inch trackball resting on MR63ZZ mini ball bearings and a stainless steel dowel pin, ensuring a smooth and responsive feel.

Power is provided by a 3.7V 2600mAh battery, which is substantial for a BLE keyboard and ensures that the device can operate for long periods without recharging, even with the optical sensor active. The combination of high-end ergonomic design and integrated navigation makes this a powerful tool for power users looking to minimize repetitive strain while maintaining high productivity.
