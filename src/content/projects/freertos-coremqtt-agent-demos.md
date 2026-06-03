---
title: FreeRTOS coreMQTT Agent Demos
summary: A collection of demonstration projects showcasing the coreMQTT Agent library's
  ability to share a single MQTT connection across multiple concurrent FreeRTOS tasks.
  It includes practical implementations for AWS IoT Device Shadow, Device Defender,
  and Over-the-Air (OTA) updates targeting Windows and QEMU environments.
codeUrl: https://github.com/FreeRTOS/coreMQTT-Agent-Demos
siteUrl: https://freertos.org/mqtt/mqtt-agent-demo.html
isShow: false
rtos: freertos
libraries: []
topics:
- freertos
- iot
- mqtt
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- freertos-mqtt-client-demo
- esp32-freertos-examples
- coremqtt-agent-library
- mongoose-os-samples-for-esp32
- stm32-lwip-mqtt-demo
- unipg-mbed-os-samples
---

Managing MQTT connections in a multi-threaded RTOS environment often presents a challenge: how do you allow multiple independent tasks to publish and subscribe without complex synchronization or multiple socket connections? The **coreMQTT Agent Demos** repository provides a blueprint for solving this using the coreMQTT Agent library.

### The coreMQTT Agent Concept
At the heart of these demos is the [coreMQTT Agent](https://github.com/FreeRTOS/coreMQTT-Agent), an extension of the standard coreMQTT library. It provides a thread-safe 'Agent' (or daemon) task that manages the MQTT connection. Other application tasks interact with this agent using message queues, allowing them to share a single connection seamlessly. This architecture simplifies application code because individual tasks don't need to manage synchronization primitives or worry about the state of the underlying TCP/IP connection.

### Key Demo Capabilities
This repository isn't just a simple 'Hello World.' It contains sophisticated examples of real-world IoT workflows:

*   **AWS IoT Device Shadow**: Demonstrates how to synchronize a device's state with the cloud using the Shadow service.
*   **AWS IoT Device Defender**: Shows how to collect device metrics and send security reports to AWS.
*   **Over-the-Air (OTA) Updates**: Perhaps the most critical feature for IoT, this demo shows how to run an OTA agent as one of the concurrent tasks sharing the MQTT connection.
*   **Multi-Task Pub/Sub**: Examples of simple and large message handling across different tasks.

### Technical Architecture
The project is built on a robust stack of libraries and protocols:
*   **RTOS**: FreeRTOS Kernel
*   **Networking**: FreeRTOS+TCP
*   **Security**: TLS via mbedTLS
*   **Messaging**: coreMQTT and coreMQTT-Agent
*   **Data Handling**: coreJSON and tinyCBOR

### Getting Started
Because this project relies on several modular components, it uses Git submodules extensively. To get started, you must clone the repository recursively:

```bash
git clone https://github.com/FreeRTOS/coreMQTT-Agent-Demos.git --recurse-submodules
```

### Hardware and Emulation Support
The demos are designed to be accessible without specific physical hardware. They support two primary environments:

1.  **Visual Studio (Windows)**: A Windows port using the FreeRTOS simulator, allowing developers to test logic and cloud connectivity directly from a PC.
2.  **QEMU (Cortex-M3)**: A GCC-based project targeting the ARM Cortex-M3 MPS2 platform. This is ideal for developers wanting to test in a more 'embedded-like' environment using the QEMU emulator.

For the QEMU build, the project provides a Makefile and Eclipse project files. Running the demo in QEMU requires a network tap driver (like OpenVPN's TAP-Windows) to bridge the emulated hardware to your local network.

### Configuration
Configuration is centralized in the `source/configuration-files` directory. Here, you can define your AWS IoT endpoints, Wi-Fi credentials (if applicable), and security certificates. Key files include:
*   `demo_config.h`: General demo settings.
*   `core_mqtt_config.h`: MQTT-specific parameters.
*   `ota_config.h`: Settings for the Over-the-Air update process.
