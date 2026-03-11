---
title: mPython Board
summary: An open-source MicroPython-based firmware and hardware project for the mPython
  (掌控板) educational board. Powered by the ESP32 dual-core microcontroller, it provides
  a Python 3 compatible environment designed for STEAM education and maker projects.
slug: mpython-board
codeUrl: https://github.com/labplus-cn/mpython
siteUrl: https://www.mpython.cn
star: 136
version: v2.4.0
lastUpdated: '2025-12-04'
rtos: freertos
libraries:
- micropython
topics:
- education
- esp32
- microbit
- micropython
- python
isShow: true
image: /202512/mpython.webp
createdAt: '2025-12-31'
updatedAt: '2025-12-31'
---

## Introduction to mPython

The mPython Board (掌控板) is a specialized open-source hardware project designed specifically for STEAM education. Developed through a collaboration between educational experts and the maker community, it serves as a bridge between graphical programming and professional software development. At its core, the board is a MicroPython-powered microcontroller that allows students and educators to write Python code that interacts directly with physical hardware.

## Hardware and Performance

The mPython board is built around the powerful ESP32 high-performance dual-core chip. This choice of hardware provides significant processing power, integrated Wi-Fi, and Bluetooth capabilities, making it an ideal platform for IoT (Internet of Things) and robotics projects. The board's design is OSHWA (Open Source Hardware Association) certified, ensuring that both the hardware schematics and the software stack remain accessible to the community for learning and modification.

## Software Ecosystem

The project integrates several layers of technology to create a seamless user experience:

- **MicroPython Core**: The board runs a customized port of MicroPython, allowing users to use standard Python 3 syntax to control hardware peripherals.
- **ESP-IDF Integration**: The underlying firmware is built upon the Espressif IoT Development Framework (ESP-IDF), which utilizes FreeRTOS for task management and system stability.
- **Programming Environments**: Several software tools support the board, ranging from the official mPython editor to Labplus 3 (based on Scratch 3.0) and Mind+. These tools allow users to transition from dragging graphical blocks to writing raw Python code.

## Educational Impact

mPython is more than just a development board; it is a comprehensive educational tool. By providing a high-level language like Python on an embedded system, it lowers the barrier to entry for complex concepts like data logging, wireless communication, and sensor integration. The project is supported by a robust community and extensive documentation, including a dedicated programming reference manual and software guides.

## Open Source Commitment

The project maintains a strict open-source philosophy with a multi-license approach:
- **Software**: Licensed under GPL v3, ensuring the code remains free and open.
- **Hardware**: Licensed under CERN v1.2, allowing for transparent hardware design.
- **Documentation**: Provided under CC0, encouraging widespread sharing and adaptation of educational materials.

Whether you are a teacher looking for a classroom tool or a maker building a connected device, mPython provides a flexible, powerful, and well-documented foundation for embedded Python development.
