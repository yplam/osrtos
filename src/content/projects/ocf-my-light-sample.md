---
title: OCF My Light Sample
summary: A smart home light sample application implementing the Open Connectivity
  Foundation (OCF) standard using the IoTivity framework. It targets the ARTIK 053
  Starter Board running TizenRT and supports virtual light resources on Linux environments.
slug: ocf-my-light-sample
codeUrl: https://github.com/webispy/ocf_mylight
star: 2
version: v0.1
lastUpdated: '2017-09-18'
rtos: tizenrt
libraries:
- lwip
topics:
- ctt
- iot
- iotivity
- ocf
- oic
- smart-home
- tizenrt
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- home-smart-mesh-sdk-for-thingy53
- eclipse-threadx-iot-devkit-starter-application
- m5nanoc6-zigbee-test
- openthread-rtos
- contiki-simple-traffic-light
- mbed-os-client-example
---

## Overview

The OCF My Light project is a practical implementation of a Smart Home Light device based on the Open Connectivity Foundation (OCF) standard. By leveraging the IoTivity framework, this sample provides a blueprint for developers looking to build interoperable IoT devices that can communicate across different platforms and network environments. 

The project is primarily designed to run on the **Samsung ARTIK 053 Starter Board** using the **TizenRT** (TinyARA-based) operating system. It also maintains compatibility with Linux (specifically Ubuntu 16.04), allowing for rapid prototyping and testing of virtual light resources before deploying to physical embedded hardware.

## Key Features

- **OCF Resource Model**: Implements standard light resources accessible via `/a/light/0` and `/a/light/1` URIs.
- **Dual Platform Support**: Native support for TizenRT on ARTIK hardware and a virtualized version for Linux.
- **IoTivity Integration**: Uses IoTivity 1.2.1 for TizenRT and IoTivity 1.3 for Linux, demonstrating the framework's cross-version capabilities.
- **Hardware Control**: On the ARTIK 053 board, the application directly controls two physical LEDs to reflect the state of the OCF resources.
- **TASH Integration**: For TizenRT users, the application integrates with the TizenRT Shell (TASH), allowing users to launch the OCF stack directly from the serial console.

## Technical Implementation

The project structure is modular, separating device logic, resource handling, and platform-specific porting. 

### Resource Handling
Core logic for the light resources is found in `ocf_mylight_light.c`. This file manages the state of the lights and handles OCF requests (GET, PUT, POST). The application uses the IoTivity C-SDK to register resources and define entity handlers that respond to network discovery and CRUDN operations.

### Platform Porting
A critical component for embedded deployment is `port_tinyara.c`. This file provides the necessary glue between the IoTivity stack and the TizenRT/TinyARA environment. It implements UUID generation, network interface discovery using `getifaddrs`, and mapping of IoTivity stack results to human-readable strings. It specifically interacts with the **lwIP** stack provided by TizenRT to manage network communication.

### Build Systems
The project supports two distinct build environments:
1. **TizenRT (Kconfig/Makefile)**: Integrated into the TizenRT build system, it uses `Kconfig` for feature selection and a standard `Makefile` for compilation within the TizenRT application directory.
2. **Linux (SCons)**: Uses the SCons build tool common in the IoTivity ecosystem, allowing the sample to be built as part of the IoTivity resource stack.

## Getting Started on TizenRT

To deploy this on an ARTIK 053 board, the project must be cloned into the TizenRT `apps/examples` directory. After configuring the build via `make menuconfig` to enable the "OCF My Light sample application," the resulting binary can be flashed to the board.

Once running, the device can be managed via the TASH console:

```sh
TASH> wifi join {SSID} {PASSWORD}
TASH> ifconfig wl1 dhcp
TASH> ocf_mylight
```

This sequence initializes the WiFi station, acquires an IP address via DHCP, and starts the OCF server. Once started, the light resources become discoverable by any OCF-compliant client on the same network.

## Security and Maintenance

The project includes hooks for OCF security and maintenance resources (`ocf_mylight_security.c` and `ocf_mylight_maintenance.c`). While the TizenRT version currently focuses on non-secured mode for simplicity in development, the Linux version supports secured builds using `mbedtls` and `tinycbor`. This provides a path for developers to implement Just-Works or Random PIN-based onboarding for their smart home devices.
