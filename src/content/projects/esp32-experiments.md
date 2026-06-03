---
title: ESP32 Experiments
summary: A collection of experimental projects for the ESP32 microcontroller, featuring
  implementations for both the Arduino framework and Mongoose OS. The repository includes
  practical applications such as a cryptocurrency ticker with LCD output and a remote-controlled
  LEGO camera system using WebSockets.
codeUrl: https://github.com/lucabelluccini/esp32-experiments
isShow: false
rtos: mongoose-os
libraries: []
topics:
- arduino
- esp32
- mongoose-os
star: 2
lastUpdated: '2020-05-09'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- mongoose-os-samples-for-esp32
- mongoose-os-programs-and-examples
- seeed-studio-xiao-esp32-project-collection
- map-tiles-projects-for-esp32
- mongoose-os-playground
- esp32-repo
---

The **esp32-experiments** repository by Luca Belluccini serves as a practical playground for developers looking to explore the diverse capabilities of the ESP32 microcontroller. Rather than focusing on a single library, this project provides several standalone experiments that demonstrate how to integrate networking, peripheral control, and real-time data fetching into embedded applications.

### Cryptocurrency Ticker with LCD Output
One of the primary experiments in the repository is the **Kraken Ticker**. This project demonstrates how to use the ESP32 to connect to a secure HTTPS API (Kraken) to fetch real-time price data for the XBT/EUR trading pair. 

Technically, this experiment showcases several critical embedded concepts:
- **Secure Networking**: Using `WiFiMulti` and `HTTPClient` with a Root CA certificate to perform secure SSL/TLS requests.
- **JSON Deserialization**: Utilizing the `ArduinoJson` library to parse complex API responses.
- **I2C Communication**: Interfacing with a 16x2 LiquidCrystal display via the I2C protocol to provide a physical readout of the data.

### LEGO RC Camera
Another highlight of the repository is the **Lego RC Camera** project. This experiment transforms an ESP32-CAM (specifically the AI-Thinker model) into a remote-controlled vehicle controller with a live video feed. It is designed to be integrated with LEGO Power Functions.

Key technical features include:
- **Video Streaming**: Leveraging the `esp_camera` component to serve a live MJPEG stream over HTTP.
- **WebSockets Control**: Implementing a `WebSocketsServer` to receive low-latency control commands from a web-based interface.
- **Infrared Control**: Using the `PowerFunctions` library to translate incoming WebSocket messages into infrared signals that control LEGO motors.

### Mongoose OS Integration
Beyond the standard Arduino framework, the repository explores **Mongoose OS**, an IoT firmware development framework. The `mongoose-os/kraken-ticker` directory provides an alternative implementation of the cryptocurrency ticker using JavaScript (`init.js`). This highlights the ESP32's flexibility in supporting high-level scripting languages for rapid prototyping of IoT applications.

### Hardware and Setup
The experiments are tailored for popular ESP32 development boards, including the **DOIT ESP32 DEVKIT V1** and the **AI-Thinker ESP32-CAM**. For the camera project, the code is configured to utilize PSRAM, which is essential for handling high-resolution image buffers. 

To get started with these experiments, users typically need to configure their local WiFi credentials within the `.ino` or `.js` files and ensure the necessary libraries (like `ArduinoJson`, `WebSockets`, and `LiquidCrystal_I2C`) are installed in their development environment. The repository serves as an excellent reference for building connected devices that require a mix of web technologies and hardware-level control.
