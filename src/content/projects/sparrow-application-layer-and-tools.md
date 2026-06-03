---
title: Sparrow Application Layer and Tools
summary: An application layer protocol and toolset for IoT devices built on top of
  Contiki OS. It provides an IPv6/UDP-based encapsulation format using TLV payloads
  and an object model for device management, discovery, and over-the-air updates.
slug: sparrow-application-layer-and-tools
codeUrl: https://github.com/sics-iot/sparrow
star: 26
version: v1.0.0
lastUpdated: '2018-08-31'
rtos: contiki-os
topics:
- contiki-os
- iot
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- openthread-rtos
- 6lbr-on-telecontrolli-devices-x-ip4t-x-ip5
- anjay-zephyr
- coap-eap-with-eap-noob-in-contiki
- 6lowpan-ble-bridge
- zephyr-wi-fi-and-tcp-udp-connection-demo
---

## Overview

Sparrow is a comprehensive application layer protocol and suite of tools designed specifically for the Internet of Things (IoT). Developed by Yanzi Networks and maintained by SICS Swedish ICT, it provides a structured way for IoT devices to communicate and manage data over IPv6 and UDP. The implementation is deeply integrated with Contiki OS, leveraging its networking stack while providing a higher-level abstraction for application data.

## The Sparrow Protocol Stack

At its core, Sparrow defines an encapsulation format known as "encap." This format allows for different types of payloads to be transmitted across the network, with the most significant being the TLV (Type-Length-Value) payload. This approach is technically similar to the OMA TLVs used in the LWM2M standard, making it efficient for resource-constrained devices that need to exchange structured data.

### Object Model and Discovery

Sparrow introduces a runtime object model where each device presents itself as a collection of object instances. This architecture facilitates a standardized discovery procedure:

- **Instance 0**: Every Sparrow-compatible device implements Instance 0, which serves as the management and discovery hub.
- **Discovery**: By querying Instance 0, a controller can determine the total number of instances available on the device. 
- **Introspection**: Once the instance count is known, other instances can be queried to discover their specific types and parameters, allowing for dynamic interaction with diverse hardware sensors and actuators.

## Hardware Support and OTA Updates

The project provides robust support for popular IoT platforms, with a particular focus on the Zolertia Zoul RE-MOTE. One of the standout features of the Sparrow ecosystem is its integrated Over-the-Air (OTA) update mechanism. 

The OTA system uses a dual-image approach to ensure reliability. Devices are initially programmed with a "rescue image" containing the Sparrow bootloader. During normal operation, developers can create image archives and deploy them wirelessly. The system includes safety checks, such as incrementing version numbers (INC) to ensure the bootloader always selects the most recent valid firmware image. For development and deployment, Sparrow provides different update rules like `upload-fast` for single-hop local updates and a standard `upload` for more complex multihop mesh networks.

## Development Environment

Building applications with Sparrow requires the Contiki OS source, which is managed as a git submodule within the repository. The build system is based on a modular Makefile structure that allows developers to easily include Sparrow's core modules, system services, and device drivers. 

### Example Workflow

To get started with a platform like the Zolertia RE-MOTE, the workflow involves initializing submodules and using the provided makefiles to generate rescue images and application binaries:

```bash
# Initialize the environment
git submodule update --init --recursive

# Build and upload a rescue image for Zolertia Zoul
cd examples/zoul/remote
make IMAGE=1
make rescue-image
make upload-rescue-image
```

Once the rescue image is in place, the device can be managed and updated over the network using the Sparrow tools, allowing for seamless lifecycle management of IoT nodes in the field.
