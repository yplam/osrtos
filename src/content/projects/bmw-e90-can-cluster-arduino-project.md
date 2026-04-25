---
title: BMW E90 CAN Cluster Arduino Project
summary: This project enables the use of a physical BMW E90 instrument cluster as
  a display for PC driving simulators using an Arduino-compatible microcontroller.
  It bridges game telemetry to the cluster via CAN bus, supporting a wide range of
  features including gauges, gear indicators, and warning lights.
slug: bmw-e90-can-cluster-arduino-project
codeUrl: https://github.com/veikkos/e90-can-cluster
version: mbed_last
lastUpdated: '2026-04-07'
licenses:
- MIT
image: /202604/e90-can-cluster_0.avif
rtos: ''
topics:
- arduino
- bmw
- canbus
- cluster
- e90
- mbed
- simhub
isShow: true
createdAt: '2026-04-25T00:41:09+00:00'
updatedAt: '2026-04-25T00:41:09+00:00'
---

The e90-can-cluster project is a sophisticated bridge between the digital world of driving simulators and the tactile reality of automotive hardware. By utilizing an Arduino or Teensy microcontroller, this project allows enthusiasts to repurpose a genuine BMW 3-series (E90) instrument cluster for use with PC games like BeamNG.drive, Euro Truck Simulator 2, and American Truck Simulator.

At its core, the project emulates the CAN bus environment of a BMW vehicle. Instrument clusters in modern cars do not operate on simple analog signals; they are nodes on a Controller Area Network (CAN) that receive data packets from various Electronic Control Units (ECUs). This firmware acts as those missing ECUs, translating telemetry data from a computer into the specific CAN frames the cluster expects to see. 

### Comprehensive Capabilities

The level of integration achieved here goes far beyond basic speedometer and RPM needles. The firmware manages complex cluster behaviors, including the backlight, turn signals, and high beams. It even supports advanced features like the dynamic gear selection display found in automatic gearbox clusters—showing P, R, N, D, and even manual or sport modes (M1, M2, S1, S2). For clusters equipped with an oil temperature gauge or fuel consumption needle, the project provides calibrated data to keep those functional as well.

One of the most impressive aspects is the Check Control system support. The firmware can trigger a variety of warning symbols on the cluster's LCD and dedicated LEDs. This includes everything from "Check Engine" and "Low Oil Pressure" to sim-racing relevant warnings like "High Brake Temperature" or "Tire Deflated" signals. It even handles the suppression of "nuisance" warnings that would naturally occur when the cluster is removed from a car, such as ABS, SOS call, or Airbag errors.

### Hardware and Setup

The hardware requirements are accessible but specific. Users need a 12V regulated power supply for the cluster and a CAN bus interface. The project supports two main paths for CAN communication:

*   **MCP2515 SPI Adapter**: A common and inexpensive module used with many Arduino projects.
*   **Serial CAN Bus Adapter**: A UART-based module (such as the Longan Labs adapter) that simplifies communication for boards with limited SPI capabilities.

On the microcontroller side, the code has been validated on a wide range of boards, including the Arduino Uno, Nano, SparkFun Pro Micro, and the more powerful Teensy 4.1. The cluster itself is typically a Siemens VDO unit from an E90-era BMW, with specific support for models from cars with automatic gearboxes to take advantage of the gear display.

### Software Integration

The project offers multiple ways to feed data to the cluster. For users who want a streamlined experience, there is experimental support for SimHub, a popular dashboard software in the sim-racing community. By using a custom protocol, SimHub can drive the cluster as a standard Arduino device.

For those seeking more advanced features, the project includes a custom binary API and a Node.js-based proxy. This proxy receives telemetry via a UDP socket from game-specific plugins (like the provided BeamNG protocol) and forwards it to the Arduino over a high-speed serial connection. This setup supports a compact binary frame structure that includes timestamping, fuel injection data, and bitfields for dozens of different light and warning states.

### Configuration and Customization

The project is highly configurable via a central configuration file. Users can calibrate the speedometer for different cluster variants (using the `MAX_SPEED_KMH_X10` setting), define the number of gears, and even enable support for external hardware like an AD5272 digital potentiometer to simulate ambient temperature readings. This level of detail ensures that the cluster feels like a native part of the gaming setup rather than a simple peripheral.
