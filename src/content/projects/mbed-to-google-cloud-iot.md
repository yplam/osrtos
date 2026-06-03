---
title: Mbed to Google Cloud IoT
summary: An example application for Mbed OS that demonstrates how to connect to Google
  Cloud IoT Core using MQTT over TLS. It features JWT-based authentication, NTP time
  synchronization, and secure communication for IoT devices.
slug: mbed-to-google-cloud-iot
codeUrl: https://github.com/coisme/Mbed-to-Google-Cloud-IoT
siteUrl: https://os.mbed.com/users/coisme/notebook/google-cloud-iot-from-mbed-os-device/
star: 4
lastUpdated: '2019-11-25'
rtos: mbed-os
topics:
- google-cloud-iot
- mbed-os
- mqtt
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- mbed-to-ibm-watson-iot-platform
- mbed-to-aws-iot-example
- mbed-to-azure-iot-hub
- aws-iot-with-the-l475vg-iot01a-on-mbed-os
- mbed-os-client-example
- losant-mqtt-example-for-mongoose-os
---

Connecting microcontrollers to cloud services requires a robust combination of networking, security, and protocol handling. The Mbed-to-Google-Cloud-IoT repository provides a complete example of how to bridge an Mbed OS device to Google Cloud IoT Core. By utilizing MQTT over TLS, the project ensures that data transmitted between the edge device and the cloud remains encrypted and authenticated.

### Secure Authentication with JWT

Google Cloud IoT Core uses JSON Web Tokens (JWT) for device authentication. Since JWTs are time-bound, the device must have an accurate sense of the current time. This project integrates an NTP client to fetch the current timestamp from `time.google.com` before generating the JWT. The `jwtgen` library then creates the token using the device's private key, which is used as the password in the MQTT connection phase.

### MQTT over TLS

The core of the communication logic resides in `main.cpp`, which orchestrates the setup of the network interface and the secure socket. The application uses the `TLSSocket` class to handle the TLS handshake, verifying the Google Cloud root certificates provided in the configuration. Once the secure layer is established, the `MQTTClientMbedOs` library manages the MQTT protocol, allowing the device to subscribe to configuration topics and publish telemetry data to event topics.

### Configuration and Hardware Support

The project is designed to be portable across various Mbed-enabled hardware. The `mbed_app.json` file includes target-specific overrides for boards like the Renesas RZ/A1H, Hexiwear, and various STM32 Nucleo boards (F401RE, F411RE). Users can configure their specific Google Cloud project details, including the Project ID, Region, Registry ID, and Device ID, within the `MQTT_server_setting.h` header file.

### Application Workflow

The application follows a structured sequence to ensure a reliable connection:

1.  **Initialization**: Initialize Mbed Trace for debugging and set up status LEDs.
2.  **Networking**: Bring up the default network interface (Ethernet or Wi-Fi depending on the target).
3.  **Time Sync**: Use the NTP client to set the system clock, which is a prerequisite for valid JWT generation.
4.  **Security**: Generate a JWT and configure the TLS socket with the required root CA certificates.
5.  **Connection**: Establish the MQTT connection to `mqtt.googleapis.com` on port 8883.
6.  **Interaction**: Subscribe to the device configuration topic and use a physical button (BUTTON1) to trigger telemetry publishing.

This example serves as a practical starting point for developers looking to integrate Mbed OS devices into the Google Cloud ecosystem, providing a clear path from hardware initialization to secure cloud messaging.
