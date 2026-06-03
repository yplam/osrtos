---
title: Energy Consumption Monitor (energymon-c)
summary: A Mongoose OS-based application designed to monitor energy consumption by
  counting LED pulses from a standard power meter. It provides a non-intrusive way
  to track electricity usage using ESP8266 or ESP32 microcontrollers and features
  a built-in web dashboard.
codeUrl: https://github.com/infrat/energymon-c
isShow: false
rtos: mongoose-os
libraries: []
topics:
- c
- esp8266
- mongoose-os
star: 0
lastUpdated: '2017-12-31'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- energy-consumption-monitor
- hlw8012-and-bl0937-energy-meter-library-for-mongoose-os
- mongoose-os-esp8266-pir-monitor
- ofmon-offline-first-smart-energy-monitoring
- energyme-home
- zigbee-gas-counter
---

Monitoring home energy consumption doesn't always require invasive electrical work or expensive smart meters. The **energymon-c** project provides a clever, non-intrusive solution by leveraging the optical pulse output found on most modern utility meters. By counting these flashes, the system can accurately calculate energy usage in real-time and present it to the user.

### How It Works
The core logic of the application revolves around interrupt-driven pulse counting. Digital energy meters typically have an LED labeled with a constant, such as 1000 imp/kWh. This means every 1000 flashes represent one kilowatt-hour of energy consumed. By monitoring these pulses with a phototransistor or light sensor connected to a GPIO pin, `energymon-c` tracks consumption patterns without ever needing to touch high-voltage wiring.

### Technical Architecture
The project is built on **Mongoose OS**, a robust framework specifically designed for IoT devices. The repository structure reveals several key components of the system:

- **mos.yml**: This configuration file defines the Mongoose OS environment, including dependencies and hardware configuration, making the project easy to build and flash using the `mos` toolchain.
- **src/main.cpp**: The application logic is written in C++, handling the high-priority task of detecting pulses and calculating the time intervals between them to determine instantaneous power demand.
- **fs/index.html**: The project includes a web-based interface stored in the device's local filesystem. Mongoose OS serves this file, allowing users to view their energy statistics directly through a web browser on their local network.

### Key Features
- **Non-Invasive Monitoring**: Uses optical sensors to read existing meter data.
- **Real-time Tracking**: Calculates power usage based on the frequency of LED pulses.
- **Embedded Web Server**: Provides a dashboard for data visualization without requiring a separate cloud service.
- **IoT Ready**: Built on a framework that supports Wi-Fi, OTA updates, and MQTT integration.

### Getting Started
To deploy this project, you typically need an ESP8266 or ESP32 development board and a simple light sensor (like a phototransistor or an LDR). After configuring the GPIO pins in the source code or configuration file, the project is built and flashed using the Mongoose OS CLI. Once running, the device connects to your local Wi-Fi and begins broadcasting the energy data through its internal web server. 

This project is an excellent example of how simple embedded systems can be used to solve real-world problems, providing homeowners with the data they need to better understand and reduce their electricity footprint.
