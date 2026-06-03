---
title: Mongoose OS Cron App Skeleton
summary: A skeleton application for Mongoose OS designed to facilitate the creation
  of cron-based tasks on embedded devices. It integrates core libraries for WiFi connectivity,
  SNTP time synchronization, and AWS IoT support to enable scheduled job execution.
slug: mongoose-os-cron-app-skeleton
codeUrl: https://github.com/sumancvb/mongoose-cron-app
star: 0
lastUpdated: '2021-04-05'
rtos: mongoose-os
topics:
- cron-job
- cronjob
- cronjob-scheduler
- mongoose-os
- mongoose-os-app
isShow: false
createdAt: '2025-12-31'
updatedAt: '2025-12-31'
relatedProjects:
- mongoose-os-app-skeleton
- mongoose-os-app-on-stm32f446re
- websocket-client-for-mongoose-os
- empty-mongoose-os-app
- esp8266-electronic-timekeeper
- mongoose-os-library-skeleton
---

Mongoose OS is a specialized framework designed for the development of IoT firmware, specifically targeting microcontrollers like the ESP32 and ESP8266. The `mongoose-cron-app` project serves as a comprehensive skeleton for developers who need to implement time-based task scheduling—commonly known as cron jobs—within their embedded applications.

### The Role of Cron in Embedded Systems

In the world of IoT, devices often need to perform actions at specific intervals or at certain times of the day. Whether it is waking up a sensor to take a reading every hour, syncing logs to a server at midnight, or toggling a smart light based on a schedule, the ability to manage time-based events is critical. This project leverages the Mongoose OS `cron` library to provide a familiar, Unix-like scheduling interface for embedded developers.

### Key Components and Libraries

The project's functionality is defined in the `mos.yml` file, which pulls in several essential libraries that provide a robust foundation for IoT development:

- **Cron & SNTP**: The `cron` library handles the scheduling logic, while the `sntp` library ensures the device maintains an accurate real-world time by synchronizing with network time servers. Without SNTP, an embedded device's internal clock would drift, making scheduled tasks unreliable.
- **Cloud Connectivity**: With the inclusion of the `aws` and `wifi` libraries, the skeleton is ready to connect to Amazon Web Services IoT Core. This allows scheduled tasks to trigger cloud-based events or update a device's "shadow" state.
- **Remote Management**: The `rpc-service-config`, `rpc-service-fs`, and `rpc-uart` libraries enable developers to manage the device remotely. You can change configurations or inspect the filesystem over a network connection without needing a physical serial attachment.
- **Security**: The `ca-bundle` library provides a set of trusted root certificates, which are necessary for establishing secure TLS connections to cloud providers like AWS.

### Technical Architecture

The repository follows the standard Mongoose OS structure, making it easy to build using the `mos` toolchain. 

- **Source Code (`src/`)**: This is where the C code resides. Developers can define their cron jobs here using the Mongoose OS API, specifying the schedule in standard cron format (e.g., `0 0 * * *` for midnight).
- **Filesystem (`fs/`)**: Any files placed here are automatically packed into the firmware's filesystem image. This is ideal for storing static configuration files or web resources.
- **Configuration (`mos.yml`)**: This file acts as the project's manifest. It not only lists dependencies but also allows for custom configuration schemas that can be modified at runtime without a full firmware re-flash.

### Getting Started with the Skeleton

To begin development, you would typically clone this repository and use the Mongoose OS command-line tool (`mos`) to build the firmware for your specific hardware target. Because the skeleton includes the `rpc-uart` and `wifi` libraries, the initial setup for networking and remote debugging is already handled. This allows developers to jump straight into implementing their specific application logic, using the provided structure as a reliable foundation for robust, production-ready IoT firmware.
