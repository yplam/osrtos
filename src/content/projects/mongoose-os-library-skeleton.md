---
title: Mongoose OS Library Skeleton
summary: A boilerplate repository for creating Mongoose OS libraries. It provides
  the standard directory structure and configuration files required for the Mongoose
  OS build system, including a pre-configured manifest and configuration schema.
slug: mongoose-os-library-skeleton
codeUrl: https://github.com/kotelnikov/mgos_libskeleton
star: 0
lastUpdated: '2023-06-22'
rtos: mongoose-os
topics:
- boilerplate
- mongoose-os
- skeleton
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- mongoose-os-app-skeleton
- empty-mongoose-os-app
- mongoose-os-app-on-stm32f446re
- mongoose-os-cron-app-skeleton
- common-tools-for-mongoose-os
- uart-out-test-app
---

## Overview

The Mongoose OS Library Skeleton is a foundational boilerplate designed to accelerate the development of custom libraries for Mongoose OS. Mongoose OS is an IoT firmware development framework that simplifies the process of building connected devices on microcontrollers like the ESP32, ESP8266, and TI CC3200. This skeleton provides the necessary scaffolding to ensure compatibility with the `mos` tool and the Mongoose OS build system.

## Project Structure

The repository follows the standard Mongoose OS library layout, ensuring that the build system can correctly locate headers, source files, and filesystem assets. The structure includes:

- **include/**: The directory for public header files (.h) that will be exposed to applications using the library.
- **src/**: The location for C/C++ source files (.c, .cpp) containing the library implementation.
- **fs/**: A directory for files that should be included in the device's filesystem (SPIFFS/LFS).
- **mos.yml**: The core manifest file that defines the library's metadata, dependencies, and configuration schema.

## The mos.yml Manifest

The heart of any Mongoose OS library is the `mos.yml` file. In this skeleton, the manifest is pre-configured with a version 2020-01-29 schema. It defines the library type, versioning, and source paths. 

One of the most useful features included in this skeleton is the `config_schema`. Mongoose OS uses a structured configuration system that allows developers to define settings that can be managed via the command line or web UI. The skeleton includes a sample configuration object:

```yaml
config_schema:
  - ["libskeleton", "o", {title: "Lib configuration object"}]
  - ["libskeleton.enable", "b", true, {title: "Lib enable option"}]
```

This example demonstrates how to create a boolean configuration flag (`enable`) nested within a library-specific object, providing a template for developers to add their own custom settings.

## Getting Started

This repository is intended to be used as a template. Developers can clone the repository and rename the configuration keys and directories to match their specific library requirements. By starting with this skeleton, you ensure that your library is immediately compatible with the remote build services and dependency management features of Mongoose OS.

Whether you are building a driver for a new sensor, a protocol implementation, or a middleware component, this skeleton removes the friction of setting up the initial file structure and manifest syntax.
