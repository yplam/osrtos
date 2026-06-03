---
title: IoTSharp for RT-Thread
summary: An RT-Thread software package providing a C SDK for the IoTSharp platform.
  It enables embedded devices to communicate via HTTP, MQTT, and CoAP protocols for
  data collection, telemetry, and device management.
slug: iotsharp-for-rt-thread
codeUrl: https://github.com/IoTSharp/iotsharp-rtthread-package
siteUrl: https://docs.iotsharp.net
star: 3
version: 1.0.0
lastUpdated: '2022-05-10'
rtos: rt-thread
topics:
- iot
- iot-device
- iotsharp
- rt-thread
- sdk
isShow: false
createdAt: '2025-12-29'
updatedAt: '2025-12-29'
relatedProjects:
- golioth-firmware-sdk
- bc28-mqtt-package-for-rt-thread
- iotconnect-azure-rtos-sdk
- golioth-zephyr-sdk
- iotsharp-pandora-stm32l475-bsp
- unabto-sdk
---

IoTSharp for RT-Thread is a specialized software package designed to connect RT-Thread-based embedded systems to the IoTSharp platform. IoTSharp itself is a high-performance, open-source IoT foundation platform built on .NET Core, offering robust support for data collection, processing, visualization, and device management.

### Protocol Support and Connectivity
The package provides a C-based SDK that facilitates communication using industry-standard protocols including HTTP, MQTT, and CoAP. This flexibility allows developers to choose the most appropriate protocol based on their network constraints and power requirements. Whether the application requires the lightweight overhead of MQTT or the request-response model of HTTP, the IoTSharp SDK provides a unified interface for handling telemetry and attribute data.

### Integration with RT-Thread
As a native RT-Thread package, it integrates seamlessly into the RT-Thread ecosystem. Developers can easily add the SDK to their projects using the RT-Thread Env tool and `menuconfig`. By navigating to the IoT Cloud section of the online packages, users can select the `iotsharp-c-sdk`, configure its parameters, and use the `pkgs --update` command to automatically download and include the source code in their build environment. The build process is managed via SCons, with a provided `SConscript` that handles source file inclusion and header paths.

### Project Structure
The repository is organized to support both development and learning:
- **iotsharp-c-sdk**: The core source code and headers for the C SDK, containing the logic for protocol handling and data serialization.
- **samples**: Example applications demonstrating how to connect and send data to the IoTSharp platform, which can be enabled via menuconfig.
- **docs**: Local documentation and figures for setup and configuration.
- **SConscript**: The build script for the SCons system used by RT-Thread, ensuring compatibility with the standard RT-Thread build flow.

### Data Management and Backend Support
One of the primary strengths of the IoTSharp ecosystem is its ability to handle diverse data types. The platform supports simple attribute and telemetry data, which can be stored in various backend databases such as PostgreSQL, MySQL, Oracle, SQL Server, and SQLite. This package ensures that RT-Thread devices can participate in this ecosystem with minimal configuration, allowing for rapid deployment of IoT solutions from the edge to the cloud.

### Getting Started
To begin using the package, developers should refer to the official IoTSharp C SDK API documentation. The SDK is licensed under the MIT License, making it suitable for both open-source and commercial applications. By leveraging the provided samples, developers can quickly implement device-to-cloud communication, enabling features like real-time monitoring, remote device management, and data visualization.
