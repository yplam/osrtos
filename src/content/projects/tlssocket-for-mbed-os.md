---
title: TLSSocket for Mbed OS
summary: A TLS socket implementation for Mbed OS that provides secure communication
  capabilities by wrapping standard socket interfaces with TLS encryption. It leverages
  Mbed TLS to enable secure data transmission for IoT devices and embedded platforms.
slug: tlssocket-for-mbed-os
codeUrl: https://github.com/coisme/TLSSocket
star: 1
lastUpdated: '2018-09-03'
rtos: mbed-os
topics:
- mbed
- mbed-os
- ssl
- tls
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- aws-iot-with-the-l475vg-iot01a-on-mbed-os
- mbed-to-aws-iot-example
- mbed-os-client-example
- mqtt-client-and-https-server-using-mbedtls
- mbed-to-google-cloud-iot
- mbed-to-azure-iot-hub
---

TLSSocket is a networking library designed for Mbed OS, providing a secure transport layer for embedded applications. It serves as a wrapper around the standard Mbed OS Socket API, integrating TLS (Transport Layer Security) to ensure data integrity and confidentiality for IoT devices.

In the resource-constrained world of embedded systems, implementing secure communication can be complex. TLSSocket simplifies this by providing an interface that feels familiar to developers already accustomed to the Mbed Socket API. By leveraging Mbed TLS under the hood, it allows microcontrollers to establish encrypted connections with web servers, cloud platforms, and other secure endpoints.

## Technical Implementation

The project includes a `mbed_lib.json` configuration file, which is standard for Mbed OS libraries. This file defines specific macros like `MBEDTLS_SHA1_C`, indicating its reliance on the Mbed TLS cryptographic library for hashing operations. It also specifies target features such as `COMMON_PAL` (Platform Abstraction Layer), ensuring compatibility across various hardware targets supported by Mbed OS.

The implementation focuses on providing a `Socket` compatible interface. This means that code written for standard TCP sockets can be migrated to secure TLS sockets with minimal changes to the application logic. The library handles the handshake process, certificate verification, and the encryption/decryption of data streams transparently.

## Project Status

While this specific repository is now deprecated, its architecture laid the groundwork for secure socket handling in the Mbed ecosystem. Developers are encouraged to transition to the official `ARMmbed/TLSSocket` repository, which maintains the same core philosophy of providing a seamless, secure socket interface for the Mbed OS networking stack.

## Key Features

- **Integration with Mbed OS**: Designed specifically to work within the Mbed OS networking stack and event loops.
- **Secure Communication**: Provides robust TLS encryption via the Mbed TLS library.
- **Standardized Configuration**: Uses `mbed_lib.json` for easy integration into Mbed CLI and Online Compiler projects.
- **Platform Abstraction**: Utilizes the Mbed Common PAL to ensure portability across different MCU architectures.

This library is particularly useful for developers building IoT gateways, secure sensors, or any embedded device that needs to communicate over the public internet where encryption is a mandatory requirement.
