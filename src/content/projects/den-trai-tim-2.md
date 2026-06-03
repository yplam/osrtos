---
title: Den Trai Tim 2
summary: Den Trai Tim 2 is an ESP8266-based decorative heart lamp project powered
  by Mongoose OS. It features a web-based control interface and utilizes JavaScript
  for application logic, allowing for easy customization of LED patterns and device
  behavior.
codeUrl: https://github.com/dentraitim/Den_Trai_Tim
isShow: false
rtos: mongoose-os
libraries: []
topics:
- mongoose-os
star: 1
version: v2.0
lastUpdated: '2018-08-28'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- rainnow-core
- moonlight-8266
- electricitydisplay-mqtt-remote-control-for-esp8266-esp32
- iot-framework-for-nodemcu
- sonoff-http-firmware
- leilei-mongoose-os-sensing-device
---

Den Trai Tim 2 (Heart Lamp 2) is a creative embedded project designed to control a heart-shaped LED arrangement. Built specifically for the ESP8266 platform, this project leverages the power of Mongoose OS to create a modern, connected device experience. By using Mongoose OS, the developer has moved away from traditional low-level C programming in favor of a more accessible stack involving JavaScript and web technologies.

### Technical Architecture
The project is structured around the Mongoose OS framework, which is highly efficient for IoT applications. The core logic of the lamp is handled by `init.js`, which runs on the mJS engine (a restricted JavaScript engine for microcontrollers). This allows for rapid prototyping and easier management of the lamp's state and animations.

The user interface is served directly from the device's filesystem (`fs` directory). It includes a responsive web dashboard built with HTML, CSS, and JavaScript. Communication between the web browser and the ESP8266 is handled via WebSockets (`ws.js`), ensuring low-latency control over the lamp's lighting effects.

### Key Features
- **Web-Based Control**: Users can interact with the lamp through a browser-based UI, making it accessible from smartphones or PCs.
- **Mongoose OS Integration**: Benefits from the robust features of Mongoose OS, including its filesystem management and simplified build process.
- **Frontend Optimization**: The project includes a build pipeline using `package.json` with tools like `cssnano`, `html-minifier`, and `uglify-es` to compress the web assets, ensuring they fit within the limited storage of the ESP8266.
- **Cross-Platform Build Tools**: Includes scripts (`build.js`, `build.cmd`, `flash.cmd`) to streamline the development and deployment process.

### Getting Started
To work with this project, you need the Mongoose OS command-line tool (`mos`). The build process is straightforward, targeting the ESP8266 platform:

```bash
# Build the firmware
mos build --platform esp8266

# Flash the firmware to the device
mos flash --platform esp8266 --esp-flash-params "dio,32m,80m" --port COM8 --esp-erase-chip
```

The repository provides both a development filesystem (`fs_dev`) and a production-ready filesystem (`fs`) containing minified assets. This separation highlights a professional approach to embedded web development, where asset size is a critical constraint.

### Hardware Support
The project is specifically tailored for the **ESP8266**, a popular and cost-effective Wi-Fi-enabled microcontroller. While the README focuses on the ESP8266, the use of Mongoose OS theoretically allows for portability to other platforms like the ESP32 with minimal changes to the core logic.
