---
title: Pyrinas Zephyr
summary: An open-source companion cloud client for the Pyrinas Server, designed for
  the nRF9160 Feather and other Zephyr-based platforms. It provides a structured framework
  including drivers, libraries, and subsystems to facilitate IoT connectivity and
  data encoding using QCBOR.
slug: pyrinas-zephyr
codeUrl: https://github.com/pyrinas-iot/pyrinas-zephyr
star: 4
version: 0.2.1
lastUpdated: '2021-02-28'
rtos: zephyr
topics:
- iot
- mqtt
- zephyr
- zephyr-rtos
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- golioth-zephyr-sdk
- zephyr-coaps-client-with-tinydtls
- anjay-zephyr
- infuse-iot-sdk
- anjay-zephyr-client
- bridle
---

Pyrinas Zephyr is an open-source companion cloud client designed to connect embedded devices to the Pyrinas Server. Specifically optimized for the nRF9160 Feather—a popular development board for LTE-M and NB-IoT applications—this project leverages the power of the Zephyr RTOS to provide a robust and scalable IoT solution.

The project is structured as a Zephyr module, making it easy to integrate into existing Nordic Connect SDK (NCS) or pure Zephyr environments. By providing a set of drivers, libraries, and subsystems, Pyrinas Zephyr simplifies the process of sending and receiving data from the cloud, allowing developers to focus on their application logic rather than the intricacies of network protocols and serialization.

## Key Components and Architecture

The repository is organized into several functional areas that extend Zephyr's capabilities:
- **Drivers**: Custom hardware abstractions required for the Pyrinas ecosystem.
- **Libraries (lib)**: Core logic for handling cloud communication and data processing.
- **Subsystems (subsys)**: Higher-level services that integrate with the Zephyr kernel to provide seamless background operations.
- **Extensions (ext)**: Integration with external libraries like QCBOR for efficient data serialization.

## Data Serialization with QCBOR

One of the technical highlights of Pyrinas Zephyr is its use of Concise Binary Object Representation (CBOR). Through the integration of the QCBOR library, the client can encode and decode complex data structures with minimal overhead. This is particularly crucial for cellular IoT devices like the nRF9160, where data usage and power consumption are primary concerns. Using a binary format instead of JSON significantly reduces the payload size, leading to faster transmissions and longer battery life.

## Integration and Build System

Pyrinas Zephyr is designed to be managed using `west`, Zephyr's meta-tool. The provided `west.yml` manifest demonstrates how the project pulls in dependencies like `qcbor` and the `pyrinas-codec`. This approach ensures that all necessary components are version-locked and compatible, providing a reproducible build environment.

The project uses CMake and Kconfig to allow for granular configuration. Developers can enable or disable specific features of the Pyrinas client directly through the Zephyr configuration menu (`menuconfig` or `guiconfig`), making it highly adaptable to different hardware constraints and application requirements.

## Target Hardware

While the primary target is the nRF9160 Feather, the codebase is designed with portability in mind. Because it is built on Zephyr, it can theoretically be adapted to other cellular or Wi-Fi-enabled microcontrollers supported by the RTOS. The nRF9160's integrated LTE-M/NB-IoT modem and GPS make it an ideal candidate for the low-power, wide-area network (LPWAN) applications that Pyrinas is built to serve.
