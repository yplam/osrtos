---
title: ESP-Datalogger with Firebase and SPIFFS
summary: A data-logging application for the ESP8266 that records system metrics and
  sensor data to local SPIFFS storage in CSV format. It features a web-based interface
  for file management and visualization, while simultaneously synchronizing data to
  a Firebase Realtime Database.
slug: esp-datalogger-with-firebase-and-spiffs
codeUrl: https://github.com/iotlearner0level/ESP-Datalogger
star: 5
lastUpdated: '2019-04-28'
rtos: ''
libraries:
- spiffs
topics:
- arduino
- datalogger
- esp-webserver
- esp8266
- firebase
- spiffs
isShow: false
createdAt: '2025-12-28'
updatedAt: '2025-12-28'
relatedProjects:
- esp32-webserver-with-firebase-integration
- meindatalogger
- spiffslogger
- esp8266-dht22-spiffs-web-server
- esp8266-web-server-and-spiffs-integration
- iot-esp8266-serial-forwarder
---

The ESP-Datalogger is a versatile proof-of-concept project designed for the ESP8266 microcontroller. It serves as a comprehensive solution for logging data both locally and to the cloud, providing a robust framework for monitoring environmental sensors or system performance metrics.

## Local Storage and File Management

At its core, the project utilizes the SPIFFS (Serial Peripheral Interface Flash File System) to store data in CSV format. To prevent individual files from becoming unmanageable, the system includes an automatic file rotation mechanism. When a CSV file exceeds a predefined size, the logger creates a new file, ensuring that data remains organized and accessible even during long-term operation. Users can browse, download, and even delete these files directly through a web browser.

## Cloud Integration with Firebase

Beyond local storage, the ESP-Datalogger integrates with the Firebase Realtime Database. This allows for remote monitoring and data persistence beyond the physical device. The system "pushes" logged data to Firebase at configurable intervals, enabling real-time data access from anywhere in the world. The project includes settings to adjust sync timeouts, which is critical for maintaining stability on the resource-constrained ESP8266.

## Web Interface and Live Visualization

The project leverages the `ESPAsyncWebServer` library to provide a responsive web interface. Key features of the web portal include:

- **File Browser**: View and manage CSV files stored on the ESP8266 flash memory.
- **Data Viewing**: Inspect the contents of CSV files directly in the browser.
- **Live Data**: Experimental support for viewing real-time data streams using WebSockets.
- **Web-based Editor**: An integrated SPIFFS editor for modifying HTML and JavaScript files on the fly without re-flashing the firmware.

## Technical Implementation

The firmware is built using the Arduino framework for ESP8266. It handles several concurrent tasks, including WiFi connectivity, NTP time synchronization, web server management, and data logging. It specifically monitors system health metrics such as VCC voltage, free heap memory, and heap fragmentation.

```cpp
// Example of the logging logic used in the project
void logReadings(){
  if(!SPIFFS.exists(pathname)){ 
    // Initialize file with headers if it doesn't exist
    File f = SPIFFS.open(pathname, "w");
    f.println("Time,Vcc,heap,heapfrag");
    f.close();
  }
  
  File f = SPIFFS.open(pathname, "a");
  if (f) {
    f.print(dataLog[0]); // Timestamp
    f.print(",");
    f.print(dataLog[1]); // Vcc
    f.println();
    f.close();
  }
}
```

## Getting Started

To deploy the datalogger, users need to configure their WiFi and Firebase credentials in the `credentials.h` file. The project also requires the upload of web assets (HTML/JS) to the ESP8266's flash memory using the ESP8266FS plugin. Once running, the device hosts a local web server accessible via mDNS at `http://esp-datalogger.local/`.

## Experimental Status and Optimization

As a proof-of-concept, the project notes that the high volume of background tasks (WiFi, WebServer, Firebase, SPIFFS I/O) can lead to stability issues. It serves as an excellent starting point for developers looking to build complex IoT logging systems, with opportunities for optimization in task scheduling and memory management to prevent system crashes during heavy network activity.
