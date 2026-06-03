---
title: ESP32 Monaco Editor SPIFFS
summary: A project demonstrating a VSCode-like Monaco editor interface for the ESP32,
  allowing users to edit files stored on the SPIFFS filesystem via a web browser.
  It utilizes WebSockets for real-time communication and the ESPAsyncWebServer for
  handling file operations.
codeUrl: https://github.com/JakubAndrysek/ESP32-monaco-editor-spiffs
isShow: false
rtos: freertos
libraries:
- spiffs
topics:
- arduino
- esp32
- javascript
- monaco-editor
- spiffs
- transpiler
- typescript
- vscode
star: 1
lastUpdated: '2023-08-20'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- esp32-web-server-using-spiffs
- esp8266-web-server-and-spiffs-integration
- esp32-remote-control-with-websocket
- esp32-async-web-server-with-spiffs-and-ota
- esp-fs-webserver
- espxwebflmgr
---

Bringing a modern development experience to embedded systems can be a challenge, but the **ESP32-monaco-editor-spiffs** project demonstrates that it is entirely possible to host a VSCode-like editor directly on an ESP32. By leveraging the power of Microsoft's **Monaco Editor**, this project provides a sophisticated web-based interface for managing and editing files stored on the ESP32's internal flash memory.

### How It Works
The system is split into two primary components: the ESP32 firmware (the backend) and a web-based frontend. 

1.  **The Backend (ESP32):** Built using the Arduino framework and PlatformIO, the ESP32 runs an asynchronous web server and a WebSocket server. It manages the **SPIFFS** (Serial Peripheral Interface Flash File System) to store user files like `.ts` or `.js` scripts. When the frontend requests a file, the ESP32 reads it from flash and sends the content over a WebSocket connection.
2.  **The Frontend:** This is a web application that includes the Monaco Editor and a TypeScript compiler. It communicates with the ESP32 to list files, load their contents into the editor, and (eventually) save changes back to the device.

### Technical Stack
The project utilizes several key libraries to maintain high performance and low overhead:
- **ESPAsyncWebServer:** Handles HTTP requests without blocking the main loop.
- **arduinoWebSockets:** Provides the real-time bridge between the browser and the hardware.
- **ArduinoJson:** Used for structured communication, such as sending file lists or status updates.
- **SPIFFS:** The underlying filesystem used to persist data on the ESP32 flash.

### Getting Started
To get this project running, you need an ESP32 development board and the PlatformIO IDE. The setup involves two main steps:

1.  **Firmware Upload:** Build and upload the code in the `arduino-webserver` directory to your ESP32.
2.  **Filesystem Upload:** Use the `pio run -t uploadfs` command to upload the initial data files (like `example.ts`) to the SPIFFS partition.

Once the ESP32 is connected to your WiFi, it will output its IP address to the serial monitor. You can then open the `index.html` from the `html-webserver` folder in your browser. By configuring the `webSocketAddress` to match your ESP32's IP, you can begin interacting with the files on the device.

```bash
Connecting to WiFi...
Connected to WiFi
IP address: 192.168.0.175
SPIFFS mounted
{"action":"list","files":["/example.ts","/Xtest.ts"]}
Opening file: /Xtest.ts
{"action":"load","content":"console.log(\"Hi there!\");
"}
```

### Current Limitations and Future Potential
As it stands, the project is a powerful proof-of-concept. Currently, the Monaco editor and TypeScript compiler are served separately (or locally), but the author notes that since the entire frontend is smaller than 4MB, it could eventually be stored entirely within the ESP32's SPIFFS partition. This would create a truly standalone "IDE-on-a-chip" that requires no external internet access or local server to operate.
