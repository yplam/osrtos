---
title: ESP8266 Wireless Sensor Network (WSN)
summary: A Wireless Sensor Network implementation using ESP8266 microcontrollers to
  collect and visualize environmental data. The system utilizes a client-server architecture
  where remote nodes transmit DHT11 sensor readings via HTTP to a central server that
  stores data and serves a web-based dashboard.
slug: esp8266-wireless-sensor-network-wsn
codeUrl: https://github.com/mssm199996/esp8266-WSN
star: 2
lastUpdated: '2019-10-26'
rtos: ''
libraries:
- spiffs
topics:
- ajax
- embedded-systems
- esp8266
- get
- html
- http-client
- http-server
- iot
- post
- spiffs
- wsn
isShow: false
createdAt: '2025-12-28'
updatedAt: '2025-12-28'
relatedProjects:
- espmonitor-iot-environmental-monitoring-system
- iot-agricultural-data-monitoring-system
- espmonitor-iot-environment-monitoring-system
- esp8266-dht22-spiffs-web-server
- iot-project-on-hvac
- mongoose-os-environment-logger
---

## Overview

The esp8266-WSN project provides a foundational implementation of a Wireless Sensor Network (WSN) using the popular ESP8266 Wi-Fi microcontroller. By leveraging the Arduino framework, the project demonstrates how to create a distributed system where multiple sensor nodes (clients) communicate with a central data aggregator (server). This setup is ideal for home automation, environmental monitoring, or educational purposes in IoT networking.

## System Architecture

The project is divided into two primary components: the **WebClient** and the **WebServer**.

### The Sensor Node (WebClient)

The client node is responsible for environmental sensing. It interfaces with a DHT11 sensor to capture temperature and humidity data. Once the data is collected, the ESP8266 connects to a local Wi-Fi network and transmits the readings to the central server using HTTP POST requests. 

Key features of the client include:
- **Sensor Integration**: Uses the DHT library to read from digital pins.
- **HTTP Communication**: Utilizes `ESP8266HTTPClient` to send data to specific API endpoints on the server.
- **Error Handling**: Basic checks for Wi-Fi connectivity before attempting transmission.

```cpp
// Example of data transmission in the client
void loop() {
 if(WiFi.status()== WL_CONNECTED){ 
   t = dht.readTemperature();
   h = dht.readHumidity();
   
   Stemp = String(t);
   Shum = String(h);
  
   int httpCodeTemp = httpTemp.POST("value="+Stemp);
   int httpCodeHum = httpHum.POST("value="+Shum);
 }
 delay(1000); 
}
```

### The Central Hub (WebServer)

The server node acts as the brain of the network. It performs several critical functions:
1. **Data Collection**: It exposes HTTP endpoints (e.g., `/onTemperatureCollectedCallback`) to receive incoming data from various client nodes.
2. **Data Buffering**: It maintains a circular buffer of the most recent readings for both temperature and humidity.
3. **Web Hosting**: Using the SPIFFS (Serial Peripheral Interface Flash File System), the server hosts static web files (like `index.html`) to provide a user interface.
4. **API Provider**: It serves the collected data as JSON arrays via GET requests, allowing the web interface to dynamically update charts or tables.

## Technical Implementation

The project makes extensive use of the ESP8266's internal flash memory via the **SPIFFS** library. This allows the developer to store HTML, CSS, and JavaScript files directly on the microcontroller, separate from the compiled code. When a user navigates to the ESP8266's IP address, the `ESP8266WebServer` serves these files, creating a professional-looking dashboard without needing an external web server.

Data is exchanged between the backend and the frontend using JSON. The server dynamically constructs JSON strings from its internal buffers:

```cpp
String arrayAsJson(String dataset[], uint8_t datasize) {
  String response = "[\n";
  for(int i = 0; i < datasize; i++) {
    response += "\t{\n\t\t\"index\": \"" + String(i + 1) + "\",\n\t\t\"value\": \"" + dataset[i] + "\"\n\t},\n";
  }
  response = response.substring(0, response.length() - 2);
  return response + "]";
}
```

## Getting Started

To deploy this project, you will need at least two ESP8266 modules (such as the NodeMCU or Wemos D1 Mini) and a DHT11 sensor. 

1.  **Configure the Server**: Flash the `WebServer.ino` to the primary node. Ensure you upload the contents of the `data` folder to the SPIFFS partition using the ESP8266 Sketch Data Upload tool.
2.  **Configure the Client**: Update the `ssid`, `password`, and the server's IP address in `WebClient.ino`. Connect the DHT11 sensor to the designated pin (D9/GPIO3 by default).
3.  **Monitor**: Once both nodes are powered, the client will begin posting data, and you can view the live results by visiting the server's IP address in any web browser.
