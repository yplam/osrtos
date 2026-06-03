---
title: ESP8266 MLX90614 Temperature Monitor
summary: An IoT application for the ESP8266 that reads non-contact temperature data
  from an MLX90614 infrared sensor. It features cloud logging to Thingspeak and includes
  a configurable HTML/JavaScript dashboard for data visualization.
slug: esp8266-mlx90614-temperature-monitor
codeUrl: https://github.com/jxmot/esp8266-MLX90614
star: 2
lastUpdated: '2020-12-30'
rtos: ''
libraries:
- spiffs
topics:
- esp8266
- gauges
- google-gauges
- mlx90614
- spiffs
- thingspeak
isShow: false
createdAt: '2025-12-28'
updatedAt: '2025-12-28'
relatedProjects:
- mongoose-os-mlx90614-ir-temperature-monitor
- mongoose-os-environment-logger
- iot-esp8266-serial-forwarder
- espmonitor-iot-environmental-monitoring-system
- espmonitor-iot-environment-monitoring-system
- esp-temperature-to-losant-using-mongoose-os
---

## Overview

The esp8266-MLX90614 project provides a complete firmware and client-side solution for remote temperature monitoring. By combining the ESP8266 microcontroller with the MLX90614 non-contact infrared (IR) thermometer, the system can measure both ambient temperature and the temperature of a specific object without physical contact. This makes it ideal for industrial monitoring, medical applications, or smart home environments where traditional probes are impractical.

## Technical Architecture

The project is built on the Arduino framework for ESP8266 and utilizes several key components to manage data flow from the sensor to the cloud:

*   **Sensor Interfacing**: The system uses the I2C protocol via the `Wire` library to communicate with the MLX90614. It includes a modified version of the Adafruit MLX90614 library to handle low-level register access and temperature conversion.
*   **Configuration Management**: A custom `configData` class is used to manage system settings such as WiFi credentials (SSID/Password) and Serial baud rates. The code suggests these configurations are stored on the ESP8266's internal SPIFFS (Serial Peripheral Interface Flash File System).
*   **Cloud Integration**: Data is transmitted to the Thingspeak IoT platform using standard HTTP GET requests. The `logSensorData` function handles the connection to the Thingspeak API, formatting the ambient and object temperature readings into field updates.
*   **Web Dashboard**: The repository includes a `client` directory containing HTML and JavaScript files. This client retrieves data from the Thingspeak channel and displays it using configurable gauges, providing a user-friendly interface for real-time monitoring.

## Key Features

*   **Dual Temperature Sensing**: Simultaneously tracks both the ambient environment temperature and the specific target object temperature.
*   **Non-Contact Measurement**: Utilizes infrared technology to measure temperatures from a distance.
*   **Configurable Visualization**: The appearance and quantity of gauges in the web client can be adjusted to match the number of fields active in the Thingspeak channel.
*   **Status Indicators**: The firmware uses onboard GPIO (specifically D7) to provide visual feedback during the data logging process.

## Implementation Details

The main Arduino sketch (`esp8266-MLX90614.ino`) follows a standard setup/loop pattern. In the `setup()` phase, it initializes the serial interface, attempts to connect to the local WiFi access point, and starts the MLX90614 sensor. 

```cpp
void loop() {
    if(wifi_ready)
    {
        digitalWrite(D7, HIGH);
        Serial.print("Ambient = "); Serial.print(mlx.readAmbientTempF()); 
        Serial.print("*F\tObject = "); Serial.print(mlx.readObjectTempF()); 
        Serial.println("*F");
    
        logSensorData(mlx.readAmbientTempF(), mlx.readObjectTempF());
    
        delay(5000);
        Serial.println();
        digitalWrite(D7, LOW);
        delay(10000);
    }
}
```

The loop reads the temperature in Fahrenheit, logs it to the cloud, and then enters a timed delay. The use of `yield()` in the error handling branch ensures that the ESP8266 background tasks (like maintaining the WiFi stack) continue to run even if the main logic fails to proceed.
