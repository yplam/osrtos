---
title: X-CUBE-IOTA1 Firmware Package
summary: An expansion software package for STM32Cube that enables IOTA Distributed
  Ledger Technology (DLT) on STM32 microcontrollers. It integrates Azure RTOS ThreadX
  and NetXDuo with middleware for secure hardware root of trust, encryption, and IOTA
  Client APIs for interacting with the Tangle.
slug: x-cube-iota1-firmware-package
codeUrl: https://github.com/STMicroelectronics/x-cube-iota1
siteUrl: http://www.st.com/stm32cube
star: 16
version: v3.0.0
lastUpdated: '2024-02-15'
rtos: threadx
libraries:
- lwip
topics:
- azure-rtos
- b-u585i-iot02a
- iot-platform
- iota
- netxduo
- stm32
- stm32cube
- threadx
- x-cube
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- x-cube-azrtos-wl-azure-rtos-software-expansion-for-stm32wl
- x-cube-azrtos-f4-azure-rtos-software-expansion-for-stm32cube
- x-cube-azrtos-wb-azure-rtos-software-expansion-for-stm32cube
- x-cube-azrtos-l4-azure-rtos-software-expansion-for-stm32cube
- x-cube-azrtos-g0-azure-rtos-software-expansion-for-stm32cube
- x-cube-azrtos-g4-azure-rtos-software-expansion-for-stm32cube
---

The X-CUBE-IOTA1 is a comprehensive expansion software package designed for the STM32Cube ecosystem. It provides the necessary middleware and drivers to enable IOTA Distributed Ledger Technology (DLT) functionalities directly on STM32 microcontrollers. IOTA is a transaction settlement and data transfer layer specifically optimized for the Internet of Things (IoT), allowing for fee-less data and value transfer in a decentralized environment.

## Core Architecture and Middleware

The software stack is built on STM32Cube technology, ensuring portability across various STM32 MCU families. The architecture is divided into several layers, starting from the hardware abstraction layer (HAL) and board support packages (BSP) up to the application-level examples. 

In its latest iterations, the package leverages the Azure RTOS suite, specifically ThreadX for real-time kernel services and NetXDuo for advanced networking capabilities. This provides a robust foundation for handling the complex asynchronous tasks required for blockchain-like interactions on resource-constrained devices.

## Security and Trust

Security is a primary focus of the X-CUBE-IOTA1 package. It features integration with the STSAFE secure element, which provides a hardware-based root of trust. This is critical for DLT applications where private key management and secure digital signing are paramount. The middleware includes several cryptographic libraries:

- **libsodium**: Used for high-level encryption, decryption, and signatures.
- **mbedCrypto / MbedTLS**: Provides standard cryptographic primitives and secure communication protocols.
- **STSAFE_Axx0**: Specialized drivers for STMicroelectronics' secure elements to offload sensitive operations.

## IOTA Integration

The heart of the package is the IOTA Client API. This middleware allows the STM32 to interact with the IOTA Tangle, enabling the device to send transactions, attach data to the ledger, and query the network status. 

One of the standout features is the implementation of the L2Sec protocol. L2Sec is a Layer 2 lightweight security protocol designed specifically for embedded IoT devices. It allows for the creation of encrypted and authenticated message streams, ensuring that data sent from a sensor to the Tangle remains private and tamper-proof throughout its journey.

## Hardware Support and Examples

The package is optimized for modern STM32 platforms, with primary support for the B-U585I-IOT02A Discovery kit (STM32U5) and the B-L4S5I-IOT01A Discovery kit. These boards come equipped with a variety of motion and environmental sensors, and X-CUBE-IOTA1 includes the necessary drivers to access this data and transmit it to the DLT network.

Included examples demonstrate how to:
- Build a basic IOTA DLT Client application.
- Send encrypted sensor data to the Tangle using L2Sec.
- Manage WiFi connectivity and secure cloud interactions.

## Evolution and Status

Throughout its development, the project evolved from using FreeRTOS and LwIP in earlier versions to adopting the Azure RTOS ecosystem in version 3.0.0. This transition reflects the broader shift in the STM32 ecosystem toward integrated, high-performance RTOS solutions. 

Note: As of the latest updates, this repository has been marked as deprecated by STMicroelectronics. While it remains a valuable reference for implementing DLT on microcontrollers, users should consult the latest STM32CubeU5 or related packages for new development.
