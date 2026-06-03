---
title: ds18b20-mgos-test
summary: A test application for the DS18B20 digital thermometer sensor running on
  Mongoose OS. It demonstrates how to interface with 1-Wire sensors and provides a
  web-based interface for monitoring temperature data.
codeUrl: https://github.com/Podnet/ds18b20-mgos-test
isShow: false
rtos: mongoose-os
libraries: []
topics:
- c
- ds18b20
- esp32
- esp8266
- mongoose-os
star: 0
lastUpdated: '2020-06-01'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- mongoose-os-mlx90614-ir-temperature-monitor
- hx711-testing-app-for-mongoose-os
- max17263-test-app-for-mongoose-os
- esp-temperature-to-losant-using-mongoose-os
- esp8266-mlx90614-temperature-monitor
- mcp2515-can-testing-app-for-mongoose-os
---

Integrating environmental sensors into IoT applications is a fundamental task for many developers. The **ds18b20-mgos-test** project provides a clear, functional example of how to achieve this using the DS18B20 digital thermometer and the Mongoose OS framework. 

The DS18B20 is a popular choice for temperature sensing because it uses the 1-Wire interface, allowing multiple sensors to coexist on a single data line while providing high-accuracy digital readings. This project serves as a bridge between the raw sensor data and a user-friendly interface.

### Technical Architecture

The project is built on **Mongoose OS**, a purpose-built operating system for connected products. The core logic is contained within `src/main.c`, which handles the initialization of the hardware and the periodic polling of the temperature sensor. 

A key feature of this repository is the inclusion of a web server component. The `fs/` directory contains an `index.html` file, which is served by the Mongoose OS built-in web server. This allows users to view real-time temperature data directly through a browser, making it an excellent starting point for building smart home dashboards or industrial monitoring tools.

### Configuration and Build System

The project uses the standard Mongoose OS configuration format. The `mos.yml` file defines the application's identity, its dependencies (such as the DS18B20 driver and the 1-Wire library), and the specific hardware pins used for communication. 

To get started with this project, developers typically use the `mos` toolchain. The workflow involves:
1. Cloning the repository.
2. Running `mos build` to compile the firmware for the target architecture (such as ESP32 or ESP8266).
3. Using `mos flash` to upload the binary to the microcontroller.

### Documentation and Code Quality

Unlike many simple test scripts, this project includes a `Doxyfile`, suggesting a commitment to code documentation. The repository even includes pre-generated HTML documentation in the `docs/` folder, which details the internal function calls and global variables used in `main.c`. This makes it significantly easier for other developers to fork the project and adapt it for more complex multi-sensor environments.
