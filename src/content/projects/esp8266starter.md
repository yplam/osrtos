---
title: Esp8266Starter
summary: An integrated starter framework for ESP8266 projects that provides essential
  IoT features out of the box. It includes a web-based dashboard for system monitoring,
  a LittleFS-backed configuration manager, and SMTP email integration for remote alerts.
slug: esp8266starter
codeUrl: https://github.com/magellannh/Esp8266Starter
star: 0
lastUpdated: '2021-07-18'
rtos: ''
libraries:
- littlefs
topics:
- arduino
- esp8266
- esp8266webserver
- esp8266wifi
- littlefs
- ntp-client
- preferences
- wifimanager
isShow: false
createdAt: '2025-12-28'
updatedAt: '2025-12-28'
relatedProjects:
- esp8266-mywidget
- esp8266-web-server-and-spiffs-integration
- esp-fs-webserver
- iot-esp8266-serial-forwarder
- iot-framework-for-nodemcu
- arduino-esp-utils
---

Esp8266Starter is designed to jumpstart the development of ESP8266-based IoT applications by providing a robust, pre-configured foundation. Instead of rewriting boilerplate code for WiFi connectivity, web servers, and configuration management for every new project, developers can use this repository as a base to focus immediately on their specific application logic.

### A Comprehensive Web Dashboard
One of the standout features of Esp8266Starter is its fully functional web control panel. This interface allows users to monitor the system status in real-time, view event logs, and modify settings without needing to reflash the firmware. The dashboard includes:
- **Home**: Displays system uptime, free heap memory, and recent activity statistics.
- **History**: A dedicated page for viewing the event log, complete with timestamps.
- **Settings**: A web-based editor for the configuration file, allowing for on-the-fly adjustments to application parameters.
- **System Controls**: Buttons for soft restarts, hard resets, and clearing WiFi credentials.

### Connectivity and Configuration
The project leverages the popular WiFiManager library, ensuring that devices can be easily provisioned in the field. If the ESP8266 cannot connect to a known network, it automatically enters Access Point (AP) mode, providing a captive portal for the user to enter new credentials.

For application-specific settings, the system implements a simple yet effective preferences manager based on LittleFS. This system stores configuration data in a plain-text format on the internal flash memory. The `prefsMgr.ino` module provides an API to retrieve these settings as strings, integers, booleans, or floats, making it easy to integrate custom parameters into any project.

### Notifications and Logging
Esp8266Starter includes built-in support for sending email alerts via the SMTP2GO service. This is particularly useful for remote monitoring applications where immediate notification of system events is required. The email system is integrated with the preferences manager, allowing users to configure SMTP server details and recipient addresses through the web interface.

Complementing the notification system is a RAM-based event history logger. It records significant system events—such as successful email transmissions or configuration changes—along with timestamps derived from NTP (Network Time Protocol).

### Technical Foundation
The project is built for the NodeMCU 1.0 (ESP-12E) using the Arduino IDE. It relies on several core libraries and utilities:
- **ESP8266WiFi & ESP8266WebServer**: For networking and hosting the dashboard.
- **LittleFS**: For persistent file storage of configuration data.
- **NTPClient**: For accurate timekeeping and event timestamping.
- **ElapsedMillis**: For non-blocking timing logic and uptime tracking.

By organizing the code into modular files such as `webserver.ino`, `prefsMgr.ino`, and `sendMail.ino`, the project remains easy to navigate and extend. Developers can simply add their own logic to the main loop or create new modules to build upon this established framework.
