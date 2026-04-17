---
title: Breeze
summary: Breeze is a modular embedded software framework based on Zephyr RTOS, specifically
  designed for RoboMaster competition robots. It provides specialized drivers for
  DJI motors and CAN bus management, along with integrated logging and system monitoring.
  The framework utilizes the West meta-tool for workspace management and incorporates
  libraries like littlefs to provide a robust environment for complex robotic systems.
slug: breeze
codeUrl: https://github.com/RobotPilots-SZU/breeze
lastUpdated: '2026-04-10'
rtos: zephyr
libraries:
- littlefs
topics:
- robomaster
- robotics
- szu
- zephyr
isShow: false
createdAt: '2026-04-17T09:58:24+00:00'
updatedAt: '2026-04-17T09:58:24+00:00'
---

Breeze serves as the core embedded development framework for the RobotPilots team at Shenzhen University. Built on top of the Zephyr RTOS, it provides a structured and modular environment tailored for the high-stakes world of RoboMaster competition robotics. By leveraging Zephyr’s robust ecosystem, Breeze offers a standardized way to manage drivers, libraries, and application code across different robot platforms.

The framework is designed to solve one of the most common issues in robotics development: the lack of visibility into system state. As the project's documentation notes, "diagnosing problems without information or logs is like driving with your eyes closed." To address this, Breeze integrates comprehensive logging and kernel enhancements to ensure developers have the telemetry they need during both development and competition.

### A Modular Driver Ecosystem

At the heart of Breeze is a set of specialized drivers and management modules. Since RoboMaster robots rely heavily on CAN (Controller Area Network) communication, Breeze includes dedicated CAN TX and RX managers. These modules abstract the hardware layer, allowing multiple software handlers to register for specific frames. The RX manager uses message queues for asynchronous dispatching, while the TX manager provides a unified queuing layer to prevent bus congestion and manage priority.

Motor control is another critical area where Breeze excels. The framework includes drivers specifically for DJI motors, which are standard in the competition. These drivers don't just send commands; they incorporate automated heartbeat monitoring using Zephyr’s system workqueues. This ensures that the robot can safely detect and react to communication losses or hardware failures without the overhead of creating separate threads for every device.

Beyond communication, the framework includes utility drivers like a PWM-based buzzer driver for the MLT5020, providing audible feedback for system states, battery warnings, or error codes.

### Built on Zephyr and West

Breeze is managed as a Zephyr module, utilizing the `west` meta-tool for workspace management. The repository acts as a manifest, pulling in necessary dependencies like the Zephyr kernel, various Hardware Abstraction Layers (HALs), and essential libraries such as `littlefs` for persistent storage and the Embedded Template Library (ETL) for enhanced C++ functionality.

The project structure is designed to separate the framework itself from end-user applications. A typical workspace includes the Breeze framework, the Zephyr SDK, and a dedicated application folder. This separation allows the team to maintain a stable core framework while iterating rapidly on specific robot behaviors in separate application repositories.

### Getting Started with Breeze

Setting up a development environment for complex RTOS projects can often be a hurdle. Breeze simplifies this with an automated initialization script that configures the Python virtual environment, installs the Zephyr SDK, and sets up the toolchain. For developers who prefer a hands-on approach, the framework follows standard Zephyr initialization patterns using the West tool:

```bash
# Initialize the workspace
west init -m https://github.com/RobotPilots-SZU/breeze.git .
west update
west sdk install --toolchains arm-zephyr-eabi
```

Once initialized, developers can use VS Code to work on specific applications within the `breeze-app` directory. The framework's reliance on Kconfig allows for granular control over which features—like specific CAN managers or motor drivers—are compiled into the final binary, ensuring that the firmware remains lightweight and optimized for the target microcontroller.
