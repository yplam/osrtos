---
title: Awesome MicroPython
summary: A curated collection of libraries, frameworks, and resources for the MicroPython
  ecosystem. It serves as a comprehensive directory for developers working with Python
  on microcontrollers like the ESP32, ESP8266, and RP2040.
codeUrl: https://github.com/mcauser/awesome-micropython
siteUrl: https://awesome-micropython.com/
isShow: false
rtos: ''
libraries:
- micropython
- lvgl
topics:
- awesome
- awesome-list
- collection
- micropython
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- awesome-circuitpython
- awesome-zephyr-rtos
- micropython-lib
- micropython-samples-and-drivers
- micropython-examples-for-01studio-development-boards
- sparkfun-python-examples
---

MicroPython has revolutionized the way developers approach embedded systems by bringing the ease and power of Python 3 to microcontrollers. However, as the ecosystem grew, finding the right driver or library for a specific sensor or protocol became a challenge. **Awesome MicroPython** solves this by providing a curated, community-driven directory that organizes the vast landscape of MicroPython resources into a single, navigable repository.

### A Comprehensive Ecosystem Map
The project acts as a central hub for anyone working with constrained environments. Whether you are building a simple IoT sensor or a complex AI-driven edge device, the list provides categorized links to high-quality libraries. The repository covers an impressive range of technical domains:

*   **Artificial Intelligence**: From neural network multilayer perceptrons like MicroMLP to ChatGPT integrations and efficient machine learning engines like emlearn.
*   **Communications & Networking**: Extensive support for protocols including MQTT, LoRaWAN, HTTP, Bluetooth Low Energy (BLE), and even specialized industrial protocols like Modbus and CAN bus.
*   **Display & Graphics**: Drivers for everything from simple character LCDs and OLEDs to advanced e-Paper displays and the high-performance LVGL graphics library.
*   **IoT Frameworks**: Integrations for Home Assistant, Google Cloud IoT, and AWS IoT, enabling rapid development of connected devices.

### Hardware and Development Tools
Beyond just software libraries, Awesome MicroPython provides resources for the entire development lifecycle. It includes sections on:

*   **Firmware**: Custom builds and specialized firmware for various boards.
*   **IDEs and Shells**: Tools like Thonny, uPyCraft, and various REPL enhancements that make the developer experience smoother.
*   **Hardware Support**: While MicroPython runs on many chips, the list highlights specific drivers for popular modules like the ESP32, ESP8266, Raspberry Pi Pico (RP2040), and WIZnet Ethernet controllers.

### Why It Matters
For the embedded developer, time is often the most constrained resource. Instead of rewriting a driver for a DS3231 RTC or an ILI9341 TFT display, developers can browse the "Awesome" list to find battle-tested implementations. The project also emphasizes "resilient" libraries—such as asynchronous MQTT clients that can recover from WiFi outages—which are critical for professional-grade IoT deployments.

### Contributing to the Community
As an open-source resource, Awesome MicroPython thrives on community contributions. Developers are encouraged to submit new libraries, update existing links, and help maintain the quality of the list. By centralizing these resources, the project ensures that the MicroPython community remains vibrant, collaborative, and accessible to newcomers and experts alike.
