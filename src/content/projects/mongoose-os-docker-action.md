---
title: Mongoose OS Docker Action
summary: A GitHub Action designed to build Mongoose OS firmware using the mos tool
  within a Docker container. It facilitates automated firmware compilation for embedded
  platforms like the ESP8266 directly within CI/CD pipelines.
slug: mongoose-os-docker-action
codeUrl: https://github.com/dea82/mongoose-os-action
star: 1
version: v1.0.1
lastUpdated: '2020-01-18'
rtos: mongoose-os
topics:
- actions
- esp8266
- mongoose-os
isShow: false
createdAt: '2025-12-31'
updatedAt: '2025-12-31'
relatedProjects:
- mongoose-os-docker-image
- mongoose-os-create-bin-file-action
- mgos-combine
- tock-os-docker-build-environment
- nrf-connect-sdk-docker-environment
- mos-native
---

## Streamlining Mongoose OS Development with GitHub Actions

Mongoose OS is a popular framework for IoT firmware development, known for its support of JavaScript (mJS) and C, as well as its robust cloud integration features. However, setting up a consistent build environment across different developer machines and CI/CD pipelines can often be a challenge. The Mongoose OS Docker Action addresses this by providing a containerized environment pre-loaded with the `mos` tool, allowing developers to build firmware directly within GitHub Actions.

## How It Works

This action encapsulates the `mos` command-line tool inside a Docker container based on Alpine Linux. When triggered, it downloads the latest `mos` tool and executes the build command against your project's source code. By using Docker, the action ensures that the build environment is identical every time, eliminating the "it works on my machine" problem and simplifying the setup of automated testing and deployment.

## Key Features and Configuration

The action is designed to be simple and flexible, offering two primary inputs to control the build process:

- **mos-yml-path**: Specifies the location of your `mos.yml` file. This is useful for repositories where the firmware source is located in a subdirectory rather than the root.
- **platform**: Defines the target hardware platform for the firmware. While it defaults to the `esp8266`, it can be configured for any platform supported by Mongoose OS, such as the ESP32.

## Integration Example

Integrating the action into a GitHub workflow is straightforward. Below is a basic example of how to use it to build firmware for an ESP8266 target:

```yaml
uses: dea82/mongoose-os-action@v1.0.0
with:
  mos-yml-path: .
  platform: esp8266
```

## Technical Implementation

Under the hood, the action uses a `Dockerfile` that starts with a lightweight Alpine base. It installs necessary dependencies like `curl`, fetches the official Mongoose OS installation script, and sets up the `mos` tool. The entrypoint is a wrapper script that passes the user-defined arguments (like platform and path) to the `mos build` command. This architecture ensures that the action remains lightweight while providing the full power of the Mongoose OS build system.

By automating the build process, developers can focus on writing code while the CI/CD pipeline handles the heavy lifting of cross-compilation and artifact generation.
