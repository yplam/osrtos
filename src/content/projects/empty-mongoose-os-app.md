---
title: Empty Mongoose OS App
summary: A minimal skeleton application for Mongoose OS, providing the basic structure
  needed to start building IoT firmware from scratch. It includes the essential configuration
  and source files required by the Mongoose OS build system.
codeUrl: https://github.com/meticulousCraftman/empty-mos-app
isShow: false
rtos: mongoose-os
libraries: []
topics:
- c
- esp32
- esp8266
- mongoose-os
- stm32
star: 1
lastUpdated: '2020-05-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- mongoose-os-app-skeleton
- mongoose-os-library-skeleton
- uart-out-test-app
- mongoose-os-app-on-stm32f446re
- websocket-client-for-mongoose-os
- mongoose-os-cron-app-skeleton
---

## A Clean Slate for IoT Development

Mongoose OS is a powerful framework for IoT device development, designed to reduce the complexity of building connected products. While many developers start with feature-rich examples, there are times when you need a clean slate. The `empty-mos-app` repository provides exactly that: a blank canvas for building Mongoose OS applications from the ground up.

This project serves as a skeleton, stripping away the clutter of complex demos to give developers full control over their application's architecture from the very first line of code. It is particularly useful for those who prefer a "bottom-up" approach to firmware design or for projects with highly specific requirements that don't align with standard templates.

## Project Structure

The repository follows the standard Mongoose OS project layout, containing only the bare essentials:

- **mos.yml**: The manifest file that defines the application's configuration. This is where you specify metadata, hardware targets, and include the specific libraries your project requires.
- **src/**: The directory dedicated to C source code.
- **src/main.c**: The primary entry point of the application.

In a Mongoose OS environment, the `mgos_app_init` function within `main.c` is the starting point for your logic. By starting with this empty app, you can incrementally add only the libraries you need—such as MQTT, WiFi, or specific sensor drivers—via the `mos.yml` file, ensuring your firmware footprint remains as lean as possible.

## Why Use a Skeleton App?

Starting with a minimal skeleton offers several advantages for embedded developers:

- **Reduced Complexity**: You aren't forced to navigate or delete code from a pre-existing demo that isn't relevant to your use case.
- **Learning Tool**: It is an excellent way to understand the core mechanics of the Mongoose OS build system and lifecycle.
- **Customization**: It provides the freedom to implement custom drivers or business logic without interference from default configurations.

Whether you are targeting the ESP32, ESP8266, TI CC3200, or other supported microcontrollers, this skeleton provides the necessary foundation to begin your development journey with Mongoose OS.
