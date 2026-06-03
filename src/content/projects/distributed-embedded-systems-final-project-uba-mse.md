---
title: Distributed Embedded Systems Final Project (UBA MSE)
summary: A distributed embedded system project developed for the UBA Master in Embedded
  Systems, featuring ESP32 firmware built with ESP-IDF. It implements MQTT-based communication
  for remote data logging and includes Octave scripts for measurement analysis.
slug: distributed-embedded-systems-final-project-uba-mse
codeUrl: https://github.com/mauriciobarroso/UBA_MSE-6Co2021_SED-TPI
star: 0
lastUpdated: '2022-05-06'
rtos: freertos
libraries:
- lwip
topics:
- esp-idf
- esp32s2
- http-server
- mpu6050
- octave
- spiffs
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- electricitydisplay-mqtt-remote-control-for-esp8266-esp32
- esp32-webserver-with-firebase-integration
- esp32-wifi-logger
- embedded-proto-mbed-os-to-server-example
- micropython-and-lvgl-firmware-for-esp32
- esp32-freertos-examples
---

## Overview

This repository contains the final integrated project (Trabajo Práctico Integrado) for the Distributed Embedded Systems course at the University of Buenos Aires (UBA). The project demonstrates a complete end-to-end distributed system, encompassing firmware development, network communication via MQTT, and automated data analysis.

The system is designed around an embedded node that performs measurements and transmits data to a central broker. The project is structured to handle the entire lifecycle of the data, from acquisition on the hardware to visualization and analysis on a workstation.

## Technical Architecture

The project is divided into several functional components that work together to form the distributed system:

### Firmware and Node Operations

The core of the project is the firmware, which is organized according to the standards recommended by Espressif for the ESP-IDF framework. Running on an ESP32, the firmware utilizes FreeRTOS for task management and the lwIP stack for network connectivity. The node is responsible for collecting sensor data or measurements and formatting them for transmission.

### Communication and Data Logging

Communication between the node and the application layer is handled via the MQTT protocol. The project includes specialized scripts to manage this interaction:
- **Broker Logging**: A script is provided to record all MQTT messages exchanged between the node and the application, saving them to a local log file for auditing and debugging.
- **Node File Management**: The system includes mechanisms to download generated CSV files containing measurement samples directly from the node.

### Data Analysis with Octave

Once the data is retrieved from the embedded system, it is processed using GNU Octave. The repository includes several `.m` scripts specifically designed to analyze the different types of measurements required by the project specifications. This allows for mathematical verification and visualization of the data collected by the distributed nodes.

## Repository Structure

- **firmware/**: Contains the ESP-IDF source code and components.
- **broker_files/**: Stores MQTT transaction logs generated during system operation.
- **node_files/**: Contains the raw CSV measurement data and logs retrieved from the hardware.
- **octave/**: Includes the analysis scripts for processing measurement data.
- **scripts/**: Provides automation tools for downloading data and logging broker events.

This project serves as a comprehensive example of integrating embedded firmware with higher-level distributed systems and data analysis tools.
