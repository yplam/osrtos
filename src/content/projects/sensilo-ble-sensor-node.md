---
title: Sensilo BLE Sensor Node
summary: A generic Bluetooth Low Energy (BLE) sensor node based on the nRF52832 microcontroller.
  The firmware is implemented in Rust using the RTIC framework, providing a robust
  and concurrent environment for sensor data collection and transmission.
slug: sensilo-ble-sensor-node
codeUrl: https://github.com/dbrgn/sensilo
star: 3
version: v1
lastUpdated: '2022-12-29'
rtos: rtic
topics:
- ble
- nrf52
- nrf52832
- rtic
- rust
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- ruuvitag-firmware-for-zephyr-os
- rust-ir-thermometer-firmware
- airgradient-pro-rust-firmware
- lilygo-higrow-esp32-plant-monitoring-sensor-firmware-hardware-v1
- uart-communication-between-nrf52840-and-stm32f401-nucleo
- lilygo-higrow-esp32-plant-monitoring-sensor-firmware
---

Sensilo is an open-source project designed as a generic Bluetooth Low Energy (BLE) sensor node. Named after the Esperanto word for "sensor," the project provides a complete ecosystem including hardware designs, firmware, and a gateway for data collection.

### Hardware and Architecture

The project is built around the Nordic Semiconductor nRF52832, a powerful SoC featuring an ARM Cortex-M4 processor with floating-point support and an integrated 2.4 GHz transceiver. This choice of hardware makes it ideal for low-power wireless sensor applications where battery life and connectivity are paramount.

The repository is organized into three primary components:
- **Firmware**: The logic running on the nRF52832.
- **Gateway**: Software designed to interface with the sensor nodes and collect data.
- **Hardware**: PCB designs and schematics for the physical sensor node.

### Rust and RTIC

One of the most notable technical aspects of Sensilo is its firmware implementation. It is written entirely in Rust, leveraging the language's safety guarantees to prevent common embedded programming errors like null pointer dereferences or buffer overflows. 

The firmware utilizes the **RTIC (Real-Time Interrupt-driven Concurrency)** framework. RTIC is a concurrency framework for building real-time systems on ARM Cortex-M microcontrollers. It provides several advantages for embedded developers:
- **Task-based concurrency**: Efficient management of hardware interrupts and software tasks.
- **Resource sharing**: Safe sharing of data between tasks without the need for complex mutexes, thanks to Rust's ownership model and RTIC's priority-based scheduling.
- **Low overhead**: Minimal runtime footprint compared to traditional RTOS kernels, as it uses the hardware's built-in Nested Vectored Interrupt Controller (NVIC) for scheduling.

### Project Evolution

While Sensilo provides a solid foundation for BLE sensing, the project is currently marked as obsolete. It has been succeeded by **sensilo-v2**, which continues the evolution of the platform. However, the original Sensilo remains a valuable reference for developers interested in Rust-based firmware development for the nRF52 series and those looking to implement BLE communication using the RTIC framework. It serves as a practical example of how to structure a multi-component embedded project involving hardware, firmware, and gateway software.
