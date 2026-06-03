---
title: ESP32 Webserver with Firebase Integration
summary: An ESP32 application that hosts an asynchronous web server and logs BME280
  sensor data to Firebase. It utilizes SPIFFS for file storage and WiFiManager for
  easy network provisioning.
codeUrl: https://github.com/Joaosilgo/Esp32-Webserver
isShow: false
rtos: freertos
libraries:
- spiffs
topics:
- asyncwebserver
- bme280
- esp32
- firebase
- mdns
- spiffs
- watchdog
- wifimanager
star: 0
lastUpdated: '2021-02-03'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- esp-datalogger-with-firebase-and-spiffs
- esp32-async-web-server-with-spiffs-and-ota
- esp32-web-server-using-spiffs
- esp8266-dht22-spiffs-web-server
- esp32cam-pir-mqtt-spiffs-webserver
- esp-fs-webserver
---

## Building a Connected Environmental Monitor with ESP32

The ESP32-Webserver project is a practical implementation of an IoT node that combines local monitoring with cloud connectivity. By leveraging the dual-core capabilities of the ESP32, this project creates a responsive web interface while simultaneously pushing sensor data to Google's Firebase platform. It serves as an excellent template for developers looking to build robust, connected sensor nodes.

### Hardware and Sensing

At its core, the system interfaces with an **Adafruit BME280** sensor via I2C. This allows the device to capture precise temperature, humidity, and atmospheric pressure readings. The project also defines pins for an onboard LED, a buzzer for alerts, and a reset button, making it a complete hardware prototype for environmental monitoring. The use of the `Adafruit_Sensor` and `Adafruit_BME280` libraries ensures reliable data acquisition from the sensor hardware.

### Robust Connectivity and Configuration

One of the standout features of this project is the integration of **WiFiManager**. Instead of hardcoding credentials into the source code, the device can enter an Access Point (AP) mode if it cannot find a saved network. This allows users to configure WiFi settings through a captive portal on their smartphone or PC. 

For remote data storage and real-time updates, the project integrates the **FirebaseESP32** library. This enables the ESP32 to push sensor readings directly to a Firebase Realtime Database, allowing for historical tracking and remote visualization without needing a dedicated middle-ware server.

### Asynchronous Web Architecture

Unlike standard synchronous web servers that can block the main loop during network operations, this project utilizes `ESPAsyncWebServer`. This ensures that the ESP32 remains responsive even when handling multiple client connections or during slow network conditions. The web assets, such as the `index.html` file found in the repository, are stored efficiently in the **SPIFFS** (Serial Peripheral Interface Flash File System) partition of the ESP32's flash memory. This separation of code and content makes the web interface easier to maintain and update.

### Technical Implementation

The code is structured to handle initialization and periodic tasks effectively. For instance, the Firebase setup includes timeout configurations and write size limits to ensure stability over long-term operation:

```cpp
void setFirebase() {
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
  Firebase.reconnectWiFi(true);
  // Set database read timeout to 1 minute
  Firebase.setReadTimeout(firebaseData, 1000 * 60);
  // Size and its write timeout e.g. tiny (1s)
  Firebase.setwriteSizeLimit(firebaseData, "tiny");
}
```

Additionally, the project utilizes hardware timers (`hw_timer_t`) for precise interrupt-based control, which is essential for tasks requiring strict timing or periodic sampling in an embedded environment.

### Getting Started

To deploy this project, you will need to:
1.  Configure your Firebase project credentials (`FIREBASE_HOST` and `FIREBASE_AUTH`) in the main sketch.
2.  Upload the contents of the `data` folder to the ESP32's SPIFFS filesystem using the ESP32 Sketch Data Upload tool.
3.  Connect a BME280 sensor to the I2C pins of your ESP32.

Once powered on, the device handles the rest—from establishing a connection via WiFiManager to serving a live dashboard of environmental data to any device on the local network.
