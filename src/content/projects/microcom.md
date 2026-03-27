---
title: MicroCOM
summary: A lightweight serial UART communication utility for the M5Cardputer. It enables
  users to configure serial settings and communicate with external 3.3V devices through
  the device's Grove port using the ESP32-S3 hardware UART.
slug: microcom
codeUrl: https://github.com/geo-tp/MicroCOM
star: 35
version: v1.1
lastUpdated: '2024-09-08'
rtos: freertos
topics:
- cardputer
- m5stack
- serial-communication
- uart
isShow: true
image: /202603/micro-com.webp
createdAt: '2026-03-24'
updatedAt: '2026-03-24'
---

MicroCOM is a dedicated serial communication utility tailored for the M5Cardputer, a compact portable computer based on the ESP32-S3. This application transforms the M5Cardputer into a handheld serial terminal, allowing developers and hardware hackers to interface with external microcontrollers, sensors, or any UART-compatible hardware directly from the device's keyboard and screen.

The software focuses on providing a lightweight yet flexible interface for managing serial data. Users can navigate a configuration menu to set standard UART parameters, including baud rate, data bits, parity, stop bits, and flow control. A notable feature is the support for inverted signal settings, which is useful when dealing with specific hardware logic requirements.

### Hardware Integration

MicroCOM utilizes the M5Cardputer's Grove connector for physical interfacing. By default, it uses GPIO1 for RX and GPIO2 for TX, though these assignments can be adjusted within the application's configuration menu. This flexibility allows users to adapt the tool to various cabling setups, such as Grove-to-Dupont connectors, to bridge the gap between the Cardputer and external breadboards or development kits.

### User Interface and Control

The application is designed to leverage the M5Cardputer's unique form factor for field work:

- **Configuration Mode**: Users use the arrow keys and the OK button to toggle through various serial settings and hardware pin assignments.
- **Terminal Mode**: The physical keyboard is used to input data, and the OK button sends the commands over the TX line. Received data is displayed on the screen in real-time, providing a portable debugging environment.

### Safety Considerations

A critical aspect of using MicroCOM is voltage compatibility. The M5Cardputer operates at 3.3V logic levels. The documentation explicitly warns users to ensure that any connected UART device also uses 3.3V logic to prevent permanent damage to the ESP32-S3 hardware. Users interfacing with 5V systems should utilize a logic level shifter.

### Technical Foundation

Built using the Arduino framework and the M5Cardputer library, MicroCOM is managed via the PlatformIO ecosystem. It targets the `m5stack-stamps3` board, which is the core module inside the Cardputer. The project is easily deployable via the M5Burner tool or by compiling the source code directly from the repository for custom modifications.
