---
title: ESP32 and Nextion Powered Binary Clock
summary: A demonstration project using Mongoose OS and JavaScript to drive a Nextion
  HMI display from an ESP32. It implements a binary clock interface, showcasing how
  to bridge high-level scripting with embedded hardware via UART.
codeUrl: https://github.com/aschuma/esp32_nextion_js_binary_clock
isShow: false
rtos: mongoose-os
libraries: []
topics:
- binary-clock
- clock
- esp32
- esp8266
- iot
- iot-device
- javascript
- mjs
- mongoose-os
- nextion
- nextion-display
- uart
- uart-protocol
star: 1
lastUpdated: '2022-01-08'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- electricitydisplay-mqtt-remote-control-for-esp8266-esp32
- mongoose-os-aws-iot-uart-and-thing-shadow-example
- flatsphere-clock
- sanjin-intelligent-mechanical-clock
- shelf-edge-clock
- deck
---

Building embedded applications often involves a steep learning curve with C or C++. However, the **esp32_nextion_js_binary_clock** project offers a different approach by leveraging Mongoose OS and JavaScript (mJS) to create a functional binary clock. This project serves as an excellent demonstration of how to interface an ESP32 with a Nextion Human-Machine Interface (HMI) display using high-level scripting.

### The Tech Stack
The core of the project is built on **Mongoose OS**, an IoT firmware development framework designed for low-power microcontrollers. By using the **mJS engine**, developers can write logic in JavaScript that interacts with hardware peripherals. In this case, the ESP32 communicates with a Nextion 2.8" TFT display over UART. The Nextion display is unique because it handles the UI rendering internally, allowing the ESP32 to simply send commands to update specific elements, such as the dots representing binary time, rather than managing a frame buffer.

### Hardware Requirements
To replicate this project, you will need:
- An **ESP32 Development Board**
- A **Nextion 2.8" TFT 320x240 HMI** (Basic Series)
- Standard breadboard and jumper wires

### Wiring Configuration
The connection between the ESP32 and the Nextion display is handled via UART. It is crucial to use the 5V pin for the Nextion display, as 3.3V may not provide sufficient power for the backlight and logic.

```text
ESP32 5V      <-> Nextion 5V
ESP32 GND     <-> Nextion GND
ESP32 GPIO16  <-> Nextion TX (Optional for feedback)
ESP32 GPIO17  <-> Nextion RX (Command transmission)
```

### Getting Started with Software
The project is structured to work seamlessly with the `mos` tool. After cloning the repository, you navigate to the `src/mos` directory to manage the build process. 

1. **Configuration**: Adjust the `mos.yml` file to set your WiFi credentials and local timezone (`sys.tz_spec`).
2. **Build**: Run the local build command:
   ```bash
   mos build --platform esp32 --local
   ```
3. **Flash**: Connect your ESP32 and flash the firmware:
   ```bash
   mos flash
   ```

### The Nextion Component
The repository includes a `src/nextion` directory containing the visual assets. This includes the `default.HMI` source file (editable with the Nextion Editor) and the `default.tft` binary file. The UI features a classic FuBK-Testbild background, giving the clock a retro-technical aesthetic. The JavaScript logic in `init.js` calculates the current time and sends the appropriate serial commands to the Nextion display to toggle the visibility or state of the binary indicators.

### Why This Matters
For developers coming from a web background or those who prefer rapid prototyping, this project highlights the power of Mongoose OS. It abstracts away the complexities of RTOS task management and hardware registers, allowing the developer to focus on application logic in a familiar language. It also serves as a practical guide for using Nextion displays, which are popular in the maker community for adding professional-grade touch interfaces to DIY projects without taxing the host microcontroller's resources.
