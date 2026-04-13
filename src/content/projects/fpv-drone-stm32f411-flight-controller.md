---
title: FPV Drone STM32F411 Flight Controller
summary: An open-source avionics stack for FPV drones featuring a custom STM32F411
  flight computer and an STM32F405 power distribution board. The project includes
  full KiCad 9.0 hardware designs, STM32 HAL-based firmware, and a robust 3D-printable
  airframe optimized for 935 KV brushless motors.
slug: fpv-drone-stm32f411-flight-controller
codeUrl: https://github.com/FPV-Drone-STM32F411/DroneController
lastUpdated: '2026-02-08'
rtos: ''
topics:
- 3d-models
- 3d-printing
- drone
- hardware
- stm32
isShow: true
image: /202604/drone-controller.webp
createdAt: '2026-04-12T09:32:19+00:00'
updatedAt: '2026-04-12T09:32:19+00:00'
---

## A Complete Open-Source FPV Ecosystem

Building a high-performance FPV drone from scratch requires a tight integration between hardware, firmware, and structural design. The FPV-Drone-STM32F411 project provides a comprehensive, fully open-source platform that bridges these gaps. Centered around a two-board avionics stack, this project offers everything from the PCB schematics and layouts created in KiCad 9.0 to the specialized firmware and a lightweight, robust airframe. 

The project is designed for versatility, providing compatibility with industry-standard firmware like Betaflight for racing, INAV for GPS-assisted flight, and Ardupilot for autonomous missions. By focusing on the STM32 chipset, the platform ensures high-speed processing and reliable sensor fusion necessary for stable flight dynamics.

## Hardware Architecture: The MKII Flight Computer

The heart of the system is the MKII Flight Computer, built around the STM32F411CEU6 microcontroller. This ARM Cortex M4 processor manages a suite of high-speed peripherals via SPI communication to minimize latency. Key onboard sensors include the ICM-42605 gyroscope and accelerometer for precise motion tracking, a BMP280 barometer for altitude hold, and an L86-M33 GPS module for positional data.

For long-range communication, the board integrates an SX1276 LoRa 915MHz transceiver. The hardware design emphasizes debuggability and ease of assembly, featuring oscilloscope-friendly SPI test pads, JST connectors for peripheral wiring, and multiple flashing options via UART or SWD. A dedicated backup coin cell battery port ensures that GPS data and system settings remain persistent between power cycles.

## Power Distribution and ESC

Complementing the flight computer is a custom Power Distribution and Electronic Speed Controller (ESC) board. Driven by an STM32F405, this board is designed to handle the high-current demands of 3S-4S LiPo batteries (11.1V–16.8V). It includes an integrated DC-DC buck converter for efficient voltage regulation to the flight controller and other peripherals.

The ESC section is AM32 compatible, supporting 10A current draw for 935 KV brushless motors. The design incorporates thermal management strategies to ensure reliability during high-throttle maneuvers, using an XT-60 connector for robust battery input.

## Airframe and Mechanical Design

Beyond the electronics, the project includes a custom airframe designed for 5-inch class geometry. The frame is engineered to be both lightweight and durable, featuring integrated landing legs and structural reinforcements. 

Material choice is critical for drone performance; the project recommends using carbon-fiber reinforced nylon or strong PLA+/PETG for the main arms and plates to maintain rigidity, while TPU is suggested for the landing legs to provide impact absorption. The CAD files are provided in an open format, allowing pilots to modify clearances for specific motor and propeller combinations.

## Firmware and Development

The firmware for the DroneController is developed in C using the STM32CubeIDE environment. It leverages the STM32 HAL (Hardware Abstraction Layer) drivers to manage low-level peripheral interaction and the STM32 USB Device Library for CDC-class communication. This approach provides a clean foundation for developers looking to customize control loops or integrate new sensors while maintaining a professional development workflow. 

Testing is a core component of the project's documentation, outlining a rigorous procedure from initial power system verification and SPI signal analysis via oscilloscope to controlled hover tests and full flight validation. This ensures that the custom-designed electronics meet the high-performance standards required for modern FPV flight.
