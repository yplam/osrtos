---
title: Echo-Mate Desktop Robot
summary: A feature-rich desktop robot and development platform based on the Rockchip
  RV1106 SoC. It integrates an LVGL-based menu system, AI-powered chat and translation,
  and hardware-accelerated AI camera features using the onboard 1TOPS NPU.
slug: echo-mate-desktop-robot
codeUrl: https://github.com/No-Chicken/Echo-Mate
siteUrl: https://no-chicken.com/
star: 277
version: V250329
lastUpdated: '2025-12-28'
rtos: ''
libraries:
- lvgl
topics:
- ai
- bot
- linux
- lvgl
- rv1106
- yolo
isShow: true
image: /202602/echo-mate.webp
createdAt: '2026-03-01'
updatedAt: '2026-03-01'
---

Echo-Mate is an advanced, open-source desktop robot designed as both a functional assistant and a powerful development platform. Built around the Rockchip RV1106 SoC, it leverages a single-core Cortex-A7 processor and a dedicated 1TOPS NPU to deliver a range of intelligent features, from AI-driven conversations to real-time computer vision tasks.

### Hardware Architecture

The heart of Echo-Mate is the RV1106, a highly integrated SoC designed for AIoT applications. It is paired with 256MB of DDR3L memory and supports storage via SD card or NAND Flash. The hardware design is fully open-source, featuring a 2.4-inch SPI display with IIC touch support (P024C128-CTP), integrated Wi-Fi and Bluetooth via the RTL8723bs module, and dedicated interfaces for speakers and microphones. For developers, the board also breaks out 8 GPIO pins for custom hardware expansions.

### Intelligent Features and UI

The project stands out for its sophisticated software stack. It utilizes the LVGL (Light and Versatile Graphics Library) to provide a smooth, touch-optimized menu system. Users can interact with the robot for various tasks:

- **AI Chat & Translation**: Leveraging the NPU and network connectivity for natural language processing and real-time communication.
- **Desktop Assistance**: Providing real-time weather updates, system status, and interactive widgets.
- **AI Camera**: Utilizing the 1TOPS NPU (supporting int4, int8, and int16) for vision-based AI demonstrations and edge computing tasks.

### Development Ecosystem

Echo-Mate is designed with a modern development workflow in mind. The project provides a comprehensive SDK based on the Luckfox Pico environment. To simplify setup, the repository includes a Dockerfile and Docker Compose configuration, allowing developers to build the firmware in a consistent, containerized Ubuntu 22.04 environment. This environment comes pre-configured with essential dependencies like CMake, Ninja, and various multimedia libraries required for the robot's advanced audio and visual features, such as SDL2, Opus, and PortAudio.

### Getting Started

The repository is structured to separate the core SDK from specific application demos. The `Demo/` directory contains the "DeskBot" application, which serves as the primary showcase for the robot's capabilities. Developers can clone the repository recursively to pull in all submodules and LFS (Large File Storage) assets required for the AI models and high-resolution graphics. Detailed documentation for burning the firmware and configuring the SDK is provided in the project's subdirectories, ensuring a smooth path from assembly to application development.

Whether you are looking for a cute desktop companion or a robust platform for exploring embedded AI and Linux development, Echo-Mate provides the hardware and software foundation to build sophisticated edge-computing devices.
