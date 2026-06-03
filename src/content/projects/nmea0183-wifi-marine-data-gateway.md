---
title: NMEA0183-WiFi Marine Data Gateway
summary: An ESP32-based marine data gateway that captures NMEA0183 messages over UDP
  and serves them through a real-time web interface. It features environmental monitoring
  using M5Stack sensors, historical data logging to SPIFFS, and integrated Over-The-Air
  (OTA) update capabilities.
slug: nmea0183-wifi-marine-data-gateway
codeUrl: https://github.com/AndrasSzep/NMEA0183-WiFi
star: 3
lastUpdated: '2023-07-05'
rtos: freertos
libraries:
- spiffs
topics:
- arduino
- asynchronous
- charts-js
- esp32
- nmea0183
- nmea2000
- spiffs
- webserver
- websockets
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- bbn-m5stack-tough-sailing-instruments
- espmonitor-iot-environmental-monitoring-system
- esp32-webserver-with-firebase-integration
- iot-esp8266-serial-forwarder
- dtugateway-for-hoymiles-hms-inverters
- esp-datalogger-with-firebase-and-spiffs
---

# NMEA0183-WiFi: A Modern Marine Data Gateway

NMEA0183-WiFi is an innovative ESP32-based project designed to bridge traditional marine electronics data with modern mobile devices. By capturing NMEA0183 messages broadcast over UDP, the system provides a seamless way to visualize critical boat data—such as depth, heading, and GPS position—through a standard web browser. This approach eliminates the need for expensive proprietary displays, allowing sailors to use smartphones or tablets as secondary instrument clusters.

## Real-Time Visualization and Connectivity

At its core, the project leverages the ESP32's dual-core capabilities to handle high-frequency network traffic and sensor data simultaneously. The system acts as a UDP listener, parsing standard NMEA sentences and pushing updates to connected clients via WebSockets. This ensures that data such as Speed Over Ground (SOG), Course Over Ground (COG), and Depth Below Transducer (DBT) are updated in real-time without requiring manual page refreshes.

The web interface is served directly from the ESP32's internal flash memory using the SPIFFS filesystem. This makes the device entirely self-contained, creating its own local ecosystem for data distribution on the vessel.

## Integrated Environmental Sensing

Beyond standard marine data, NMEA0183-WiFi incorporates environmental monitoring. Using the M5Stack ENVIII Hat (featuring SHT30 and QMP6988 sensors), the system tracks:
- Air Temperature
- Humidity
- Atmospheric Pressure

A standout feature is the historical data logging. The system stores environmental readings for the last 24 hours directly in SPIFFS. This data is then visualized in the background of the web interface as charts, providing the crew with valuable trends in weather conditions and barometric pressure changes.

## Robust Firmware Management

Maintenance and updates are simplified through a dedicated Over-The-Air (OTA) update mechanism. Operating on port 8080, the OTA interface allows users to upload new firmware or update the static web files and configuration data without needing a physical USB connection. This is particularly useful for devices installed in hard-to-reach locations on a boat. The project also stores local WiFi credentials in SPIFFS, allowing for easy configuration of network parameters.

## Supported NMEA0183 Sentences

The parser is designed to handle a wide array of standard marine sentences, including:
- **Navigation**: GGA (GPS Fix), GLL (Geographic Position), RMC (Recommended Minimum Navigation Information).
- **Depth & Environment**: DBT (Depth Below Transducer), MTW (Water Temperature).
- **Vessel Dynamics**: HDG/HDM/HDT (Heading), MWV (Wind Speed and Angle), RPM (Engine Revolutions).

## Technical Foundation

The project was developed using the Arduino framework for ESP32 and was notably assisted by AI (ChatGPT) during its creation. It utilizes several key libraries to manage its complex feature set:
- **ESPAsyncWebServer**: For high-performance, non-blocking web serving.
- **ArduinoJson**: For efficient data serialization between the ESP32 and the web client.
- **SPIFFS**: For persistent storage of configuration, web assets, and historical logs.

Whether used with a physical NMEA0183 network or a software simulator, NMEA0183-WiFi offers a flexible, open-source solution for modernizing marine data accessibility.
