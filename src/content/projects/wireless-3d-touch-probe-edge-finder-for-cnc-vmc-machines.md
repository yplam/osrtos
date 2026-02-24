---
title: Wireless 3D Touch Probe Edge Finder for CNC/VMC Machines
summary: A wireless 3D touch probe system for CNC and VMC machines based on ESP32
  microcontrollers. It utilizes WLAN UDP communication between a battery-powered sensor
  probe and a basestation to provide automated edge finding and center detection,
  specifically designed for machines with automatic tool changers.
slug: wireless-3d-touch-probe-edge-finder-for-cnc-vmc-machines
codeUrl: https://github.com/HeikoKa/Wireless-3D-Touch-Probe-Sensor
star: 14
version: V1.0
lastUpdated: '2025-05-29'
rtos: freertos
topics:
- 3d-touch
- 3d-touch-device
- 3d-touch-sensor
- centerline-detection
- cnc
- cnc-controller
- cnc-machine
- cnc-programming
- d1-mini-pro
- diy
- edge-detection
- esp32
- esp8266
- fusion360
- probing
- udp
- wireless
isShow: false
createdAt: '2026-02-24'
updatedAt: '2026-02-24'
---

## Overview

The Wireless 3D Touch Probe Edge Finder is an open-source hardware and software project designed to bring professional-grade automated workpiece referencing to hobbyist and semi-professional CNC machines. In machining environments, finding the center or edge of a workpiece is a critical setup task. While wired touch probes are common, they are incompatible with Automatic Tool Changers (ATC) because the wires interfere with the carousel or tool-changing mechanics. 

This project solves that challenge by implementing a wireless connection between the probe (the client) and a basestation (the server) using WLAN UDP communication. Both components are powered by ESP32 microcontrollers, providing a robust and low-latency link suitable for precision machining operations.

## System Architecture

The system consists of two primary hardware components:

### The Sensor Client
Designed to be mounted in a tool holder (such as a BT30), the sensor client is a highly integrated device built around the ESP32-PICO-V3-02. It features sophisticated power management to ensure long battery life when powered by a Lithium Polymer (LiPo) battery. 

Key hardware features of the sensor include:
- **Wake-up Logic**: The device can wake from deep sleep via a physical touch of the sensor mechanic or automatically when disconnected from a charger.
- **Power Management**: Integrated LiPo charging IC and DC-DC converters for efficient operation.
- **Status Feedback**: An RGB LED provides visual cues for power, WLAN initialization, sensor status, and battery health.
- **Antenna Options**: Support for both on-board ceramic antennas and external BNC connectors for use in fully enclosed metallic mechanical designs.

### The Basestation Server
The basestation acts as the bridge between the wireless probe and the CNC controller. It typically uses an ESP32-WROOM-32N and is designed to fit into a standard DIN rail terminal enclosure. 

Key features of the basestation include:
- **Industrial I/O**: Multiple transistor-protected outputs to signal sensor events, WiFi readiness, and battery status to the CNC controller.
- **Flexible Power**: Support for 5V to 24V power supplies (in later hardware revisions).
- **User Interface**: Six status LEDs for immediate visual diagnostics and physical switches for reset and boot modes.
- **Connectivity**: USB-to-UART bridge for easy firmware updates and debugging.

## Technical Capabilities

The project implements several advanced features to ensure reliability in the electrically noisy environment of a CNC mill:

- **Wireless Reliability**: The system uses UDP over WiFi for low-latency communication. It includes signal strength monitoring and "alive" monitoring for both the client and server to prevent crashes or missed triggers.
- **Deep Sleep Optimization**: To maximize battery life, the sensor uses a custom hardware deep sleep implementation where almost everything is powered down except for the essential trigger circuitry.
- **Adaptability**: The firmware includes many parameters for debouncing, timeout settings, and polarity switching, making it compatible with various CNC controllers and mechanical probe designs.
- **Webserver Integration**: An optional webserver provides a modern interface for monitoring the probe's status and configuring parameters.

## Hardware Evolution

The project has undergone several iterations, moving from simple prototypes to the current Basestation 4.0 and Sensor 3.0 revisions. These updates have introduced improvements such as 4-layer PCB designs for better noise immunity, improved DC-DC layouts for efficiency, and dedicated JTAG ports for advanced debugging. The modular nature of the code and electronics means they can be adapted to almost any mechanical 3D-touch probe housing.
