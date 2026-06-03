---
title: Audio Input Selector
summary: An ESP32-based firmware designed for audio input selection using Mongoose
  OS. It leverages the Mongoose OS framework to provide a programmable interface for
  managing audio signals, utilizing JavaScript for application logic.
codeUrl: https://github.com/spinningarrow/audio-input-selector
isShow: false
rtos: mongoose-os
libraries: []
topics:
- esp32
- iot
- mongoose-os
- smart-home
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- mongoose-os-configurable-sensor-node
- esp32-rtsp-mic-for-birdnet-go
- esp32-i2s-microphone-stream
- pixlpal-m1-firmware
- iot-framework-for-nodemcu
- sonoff-basic-firmware-for-openhab
---

Managing audio signals in embedded systems often requires a delicate balance between low-level hardware control and high-level logic. The **Audio Input Selector** project provides a firmware solution specifically for the ESP32, built on top of the Mongoose OS framework. This project aims to simplify the process of selecting between different audio sources, making it a useful building block for DIY audio switchers, pre-amplifiers, or smart home audio systems.

### Built on Mongoose OS
The choice of Mongoose OS is a defining characteristic of this project. Mongoose OS is an Internet of Things (IoT) firmware development framework that allows developers to write application logic in JavaScript while maintaining the performance of C for system-level operations. In this repository, the core logic is housed within `fs/init.js`, which indicates that the application behavior—such as responding to user inputs or network commands to switch audio channels—is handled via the Mongoose OS JavaScript API.

### Hardware and Architecture
The firmware is tailored for the ESP32, a versatile and powerful microcontroller with integrated Wi-Fi and Bluetooth. By using Mongoose OS, the project benefits from a robust set of built-in features, including a virtual file system (VFS) and easy integration with cloud services. While the project is focused on audio input selection, the underlying architecture allows for significant extensibility, such as adding a web-based control interface or integrating with home automation protocols.

### Getting Started
To work with this firmware, developers utilize the Mongoose OS toolchain (`mos`). The build process is designed to be simple and efficient for developers:

```bash
mos build
```

This command compiles the firmware, bundling the JavaScript files from the `fs` directory and the Mongoose OS kernel into a single flashable image for the ESP32 hardware.

### Conclusion
The Audio Input Selector is a focused example of how modern RTOS frameworks like Mongoose OS can be used to create functional audio utilities with minimal boilerplate. By leveraging the ESP32's capabilities and the flexibility of JavaScript, it provides a solid foundation for anyone looking to build a programmable, network-aware audio routing device.
