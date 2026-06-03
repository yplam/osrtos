---
title: ESP32 Web Server using SPIFFS
summary: This project demonstrates how to host a web server on an ESP32 using the
  SPI Flash File System (SPIFFS) to serve static HTML and CSS files. It provides a
  practical example of controlling hardware GPIOs through a web interface, allowing
  users to toggle LEDs remotely.
codeUrl: https://github.com/SimonCrA/ESP32_WEB-SERVER_SPIFFS
isShow: false
rtos: freertos
libraries:
- spiffs
topics:
- arduino
- esp32
- spiffs
- webserver
- wifi
star: 1
lastUpdated: '2020-08-28'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- esp8266-web-server-and-spiffs-integration
- esp32-monaco-editor-spiffs
- esp32-async-web-server-with-spiffs-and-ota
- esp8266-dht22-spiffs-web-server
- esp32-remote-control-with-websocket
- esp32-asyncwebserver-file-upload-example
---

Building a web interface for an embedded device often involves messy string concatenation within the source code to serve HTML content. The **ESP32 Web Server using SPIFFS** project offers a cleaner, more professional approach by utilizing the ESP32's onboard flash memory to store and serve web assets directly.

### The Power of SPIFFS
SPIFFS (SPI Flash File System) is a lightweight file system designed for SPI flash devices on embedded systems. By using SPIFFS, developers can separate the web design (HTML/CSS) from the application logic (C++). This project demonstrates how to upload a `data` folder containing `index.html` and `style.css` to the ESP32, which the web server then retrieves and serves to connected clients.

### Project Structure
The repository is organized to support the PlatformIO ecosystem, with a clear separation between the source code and the web assets. The web files are located in a specific directory structure:

```
- src
  - data
    ---- index.html
    ---- style.css
```

### Technical Implementation
The project is built on the Arduino framework for the ESP32. Upon booting, the ESP32 attempts to connect to a specified WiFi network using the credentials provided in the code:

```cpp
const char* ssid = "noShar3";
const char* password = "holacomoestas";
```

Once connected, the device outputs its local IP address to the Serial Monitor. Users can navigate to this IP address in any web browser to access the control panel. The interface features two buttons that interact with the ESP32's hardware, specifically targeting GPIO 26 and GPIO 27. 

### Hardware Interaction
The primary goal of this demo is to control physical components. By clicking the buttons on the served web page, the ESP32 toggles the state of the connected LEDs. This demonstrates a full-stack IoT interaction: from the user's browser, through the network, into the ESP32's file system and logic, and finally to the physical GPIO pins.

### Getting Started
To deploy this project, you will need an ESP32 development board and the PlatformIO IDE. 
1. Clone the repository.
2. Configure your WiFi credentials in `src/main.cpp`.
3. Use the PlatformIO "Upload File System Image" task to flash the contents of the `data` folder to the SPIFFS partition.
4. Upload the firmware to the ESP32.
5. Open the Serial Monitor to find the device IP and start controlling your LEDs.
