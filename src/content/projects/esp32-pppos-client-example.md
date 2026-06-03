---
title: ESP32 PPPoS Client Example
summary: A comprehensive example project for the ESP32 that implements a Point-to-Point
  Protocol over Serial (PPPoS) client. It utilizes the ESP-IDF framework and lwIP
  stack to provide internet connectivity via GSM modules like the SIM800L, supporting
  HTTP, HTTPS, and SMS functionality.
codeUrl: https://github.com/loboris/ESP32-PPPOS-EXAMPLE
isShow: false
rtos: freertos
libraries:
- lwip
topics:
- esp32
- gprs
- gsm
- lwip
- sgm
star: 227
lastUpdated: '2017-11-14'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- pppos-example-for-mongoose-os
- esp-mesh-lite-examples
- micropython-for-esp32-with-psram-support-lobo-port
- ppp-device-for-rt-thread
- freertos-mqtt-client-demo
- blynk-async-gsm-manager
---

Connecting an ESP32 to the internet usually involves Wi-Fi or Ethernet, but in many remote sensing or mobile applications, cellular connectivity is the only option. The **ESP32-PPPOS-EXAMPLE** repository provides a robust implementation of Point-to-Point Protocol over Serial (PPPoS), allowing the ESP32 to establish a full TCP/IP stack connection using a standard GSM/GPRS modem.

### Overview and Hardware Support
This project is designed to work with the **esp-idf** (v2.1 or later) and has been specifically tested with the popular **SIM800L** GSM module. However, its architecture is flexible enough to support other SIMCOM and Telit GSM modules. By using PPPoS, the ESP32 treats the GSM modem as a network interface, enabling the use of standard socket-based libraries for high-level protocols like HTTP and MQTT.

One of the standout features of this repository is the inclusion of **libGSM**, a dedicated library that handles the complexities of GSM modem management. It manages the UART communication, executes the necessary AT commands to initialize the modem, and coordinates with the lwIP stack to bring up the PPP interface.

### Key Features and Capabilities
The example is more than just a simple connection script; it demonstrates a multi-tasking environment where several network operations occur simultaneously:

*   **PPPoS Client Task**: The core task that initializes the modem and maintains the lwIP interaction.
*   **SNTP Synchronization**: Once the internet connection is established, the system automatically retrieves the current time using the SNTP protocol.
*   **HTTP & HTTPS Support**: The project includes tasks for performing standard GET requests and secure TLS-encrypted requests (using MbedTLS). It even includes a JSON parser example to handle responses from services like HowsMySSL.
*   **SMS Management**: A dedicated SMS task allows the system to send messages at defined intervals and process incoming SMS. It can even trigger logic based on message content, such as replying with system status.
*   **WiFi Bridge/AP Mode**: Optionally, the ESP32 can start a WiFi Access Point and a WebServer, allowing local devices to access data retrieved via the cellular connection.

### Technical Configuration
The project utilizes the standard ESP-IDF `menuconfig` system for configuration. Users can easily set their UART pins, baud rates, and carrier-specific information like APN, user, and password without touching the source code. 

```bash
# Example configuration steps
make menuconfig
# Navigate to "GSM PPPoS configuration" to set APN and Pins
make all && make flash
```

### Important Note on lwIP Patching
For users on specific versions of the esp-idf (around late 2017), the project includes a critical patch for `components/lwip/api/pppapi.c`. This patch ensures proper interaction between the PPP API and the rest of the system. While newer versions of ESP-IDF have merged these fixes, the repository provides the `pppapi.c.patch` file for compatibility with older environments.

### Application Workflow
When the application starts, it follows a logical sequence to ensure connectivity:
1.  **Modem Initialization**: Resets the modem, checks for SIM PIN status, and verifies network registration (CREG).
2.  **PPP Negotiation**: Sends the `AT+CGDATA="PPP",1` command to switch the modem from command mode to data mode.
3.  **Network Up**: The lwIP `status_cb` triggers once an IP address is assigned by the carrier.
4.  **Task Execution**: The HTTP, HTTPS, and SMS tasks begin their cycles, synchronized by mutexes to ensure stable operation.

This project serves as an excellent foundation for anyone building cellular-connected IoT devices, providing a clear path from raw AT commands to a fully functional networked application.
