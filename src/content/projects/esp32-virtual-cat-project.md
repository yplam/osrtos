---
title: ESP32 Virtual Cat Project
summary: An interactive virtual pet built with Rust on the ESP32-C3, featuring environmental
  sensing and a state-driven animation system. It utilizes DHT and LDR sensors for
  environmental awareness and NVS for persistent statistics.
slug: esp32-virtual-cat-project
codeUrl: https://github.com/Joshuajrodrigues/esp-pet
lastUpdated: '2026-05-07'
licenses:
- GPL-3.0
rtos: freertos
topics:
- esp-idf
- esp32
- rust
isShow: true
image: /202605/virtual-cat.webp
createdAt: '2026-05-11T01:43:12+00:00'
updatedAt: '2026-05-11T01:43:12+00:00'
relatedProjects:
- pixel-pets
- tamafi-wifi-powered-virtual-pet
- raising-hell-cardputer-adv-edition
- xiaozhi-ai-desk-buddy-esp32-s3
- esp32-cyd-aquarium
- esp32-rex-dinosaur-game-in-rust
---

The ESP32 Virtual Cat is a delightful project that brings a digital companion to life using the power of Rust and the ESP32-C3 microcontroller. Far from being a simple static animation, this project implements a reactive system that responds to its environment and user interaction through a variety of sensors, demonstrating how modern systems programming can be applied to create charming, interactive embedded devices.

### Core Functionality and State Management

At its heart, the virtual cat operates using a robust state machine. This architecture allows the pet to transition naturally between different behaviors—such as being awake, asleep, or purring—based on real-time data inputs. The logic is handled within a main loop that polls various sensors and updates the internal state, which then drives the visual output on an SSD1306 OLED display and auditory feedback via a buzzer.

The cat's behavior is influenced by several hardware components:
- **Light Sensing**: Using an LDR (Light Dependent Resistor), the cat determines if it should be awake or asleep based on ambient light levels.
- **Environmental Tracking**: A DHT11 or DHT22 sensor monitors the surrounding humidity and temperature, allowing the cat to stay aware of its environment.
- **Interactive Touch**: A touch module allows users to interact directly with the pet. A quick touch makes the cat purr, while a long-press toggles a specialized "work timer" mode, transforming the cat into a productivity tool.

### Technical Architecture

The project is built using the Rust standard library (`std`), which is supported on the ESP32-C3 via the `esp-idf-svc` and `esp-idf-hal` crates. These libraries act as a wrapper around the ESP-IDF C SDK, providing a safe and idiomatic Rust interface to the hardware. Because ESP-IDF is built upon FreeRTOS, the project benefits from the underlying RTOS's task management, as seen in the custom stack size configurations required for the Rust main task.

One of the more sophisticated features is the use of Non-Volatile Storage (NVS). The project utilizes NVS to ensure the cat "remembers" its history; interaction counts and specific settings are saved to the flash memory. This persistence means that even after a reboot or power cycle, the cat retains its stats and settings.

### Hardware and Setup

To build this project, several common components are required:
- **ESP32-C3**: The primary microcontroller.
- **SSD1306 OLED**: For displaying the cat's animations and status.
- **Sensors**: A DHT11/22 for climate data, an LDR for light detection, and a touch module for user input.

Development is streamlined through the ESP Rust toolchain. The project is designed to be run using the cargo release profile, which optimizes the binary for better performance and a smaller footprint on the chip's storage. This project serves as an excellent reference for developers interested in combining sensor fusion, persistent storage, and state-machine-based logic in an embedded Rust environment.
