---
title: ESP8266 Config Data Management
summary: A demonstration project for the ESP8266 that uses SPIFFS to store and retrieve
  application configuration data in JSON format. It provides a structured way to manage
  sensitive information like WiFi credentials and system settings outside of the source
  code using the Arduino framework.
slug: esp8266-config-data-management
codeUrl: https://github.com/jxmot/ESP8266-config-data
star: 3
lastUpdated: '2017-09-26'
rtos: ''
libraries:
- spiffs
topics:
- arduinojson
- esp8266
- spiffs
isShow: false
createdAt: '2025-12-28'
updatedAt: '2025-12-28'
relatedProjects:
- esp8266-configuration-data-v2
- settings-manager
- esp8266-web-server-and-spiffs-integration
- esp8266-dht22-spiffs-web-server
- esp8266-littlefs-file-handler
- easyini
---

Managing configuration data in embedded projects often presents a challenge: how to store sensitive information like WiFi credentials or API keys without hardcoding them into the source code. The ESP8266-config-data project provides a practical solution for ESP8266 developers by leveraging the Serial Peripheral Interface Flash File System (SPIFFS) and the ArduinoJson library.

### The SPIFFS Approach
Instead of defining constants in header files, this project stores configuration parameters in a JSON file named `config.dat` located within the ESP8266's flash memory. This approach offers several advantages for IoT development:
- **Security**: Sensitive data is separated from the application logic, reducing the risk of accidentally committing credentials to version control.
- **Flexibility**: Configuration can be updated by uploading a new data file without the need to recompile the entire firmware.
- **Scalability**: Adding new configuration parameters is as simple as updating the JSON structure and the corresponding parser class.

### Technical Implementation
The project is centered around the `configData` class, which encapsulates the logic for interacting with the filesystem. Upon initialization, the class opens the configuration file from SPIFFS, reads its contents into a buffer, and uses the ArduinoJson library to parse the data into accessible member variables.

The implementation handles several critical aspects of embedded development:
- **Memory Management**: It demonstrates the use of `StaticJsonBuffer` for stack-based allocation, which is common in memory-constrained environments like the ESP8266. The project specifically discusses the trade-offs between stack and heap allocation for JSON parsing.
- **Error Handling**: The class includes robust checks for file existence, file size limits (defaulting to 1024 bytes), and JSON parsing success, ensuring the system doesn't crash on malformed data.
- **Data Retrieval**: It provides clean getter methods for common configuration items such as WiFi SSID, password, and serial baud rate, returning them in formats suitable for standard ESP8266 libraries (like `const char *` for `WiFi.begin()`).

### Workflow and Tooling
To use this system, developers utilize the Arduino IDE along with the `arduino-esp8266fs-plugin`. This tool allows the contents of a local `data` folder to be uploaded directly to the ESP8266's SPIFFS partition. The main sketch then instantiates the `configData` object to retrieve these settings at runtime. 

This workflow is particularly useful during development and deployment, as it allows for per-device configuration without changing the binary. For example, a developer can maintain a single firmware image while deploying different `config.dat` files to different physical units to handle unique IDs or local network settings.

### Getting Started
The repository includes a sample `config.dat` and a main `.ino` file that shows the initialization sequence. After uploading the sketch and the data folder, the ESP8266 will automatically read the JSON, configure its serial baud rate, and attempt to connect to the WiFi network specified in the flash memory. This project serves as an excellent architectural template for developers looking to implement professional-grade configuration management in their ESP8266-based IoT devices.
