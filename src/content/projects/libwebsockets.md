---
title: Libwebsockets
summary: A lightweight, pure C library providing client and server support for HTTP/1,
  HTTP/2, WebSockets, MQTT, and other protocols. It is designed for high scalability
  and security, targeting platforms ranging from embedded RTOS like FreeRTOS on ESP32
  to mass cloud serving.
slug: libwebsockets
codeUrl: https://github.com/warmcat/libwebsockets
siteUrl: https://libwebsockets.org
star: 5164
version: valgrind-clean
lastUpdated: '2025-12-29'
rtos: freertos
libraries:
- lwip
- sqlite
topics:
- c
- c-library
- client-server
- embeddable
- freertos
- http2
- libev
- libevent
- libuv
- libwebsockets
- lightweight
- lws
- portable-library
- sshd
- websockets
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- webserver-esp32-enc
- webserver-esp32-w5500
- embedmcp-embedded-mcp-server-library
- embeddedmqttbroker
- nanofish
- lwirax
---

## Overview

Libwebsockets (LWS) is a versatile, lightweight, and security-minded C library designed to handle a wide array of network protocols. While originally focused on WebSockets, it has evolved into a comprehensive networking toolkit supporting HTTP/1, HTTP/2, MQTT, and raw proxying. Its architecture is specifically tailored to be gregarious, allowing it to coexist easily with various event loops such as libuv, libevent, libev, and glib, or operate standalone in resource-constrained embedded environments.

The project is highly configurable via CMake, making it a go-to choice for developers building everything from high-performance cloud services to deeply embedded firmware for microcontrollers like the ESP32 and Raspberry Pi Pico.

## Key Features & Capabilities

Libwebsockets stands out for its breadth of features packed into a small footprint:

- **Multi-Protocol Support**: Native implementations for HTTP/1.1, HTTP/2, WebSockets (client and server), and MQTT.
- **Security First**: Integrated support for OpenSSL, MbedTLS (v2 and v3), WolfSSL, and SChannel. It also includes modern cryptographic helpers for JOSE (JWS/JWE) and COSE.
- **Secure Streams API**: A high-level interface that decouples network policy (endpoints, protocols, retries) from application logic. Policies are defined in JSON, allowing developers to change connection behavior without modifying C code.
- **Embedded Display Stack**: Unique features like a stateful HTML/CSS/JPEG/PNG display stack designed for ESP32-class devices, enabling UI rendering into line buffers to save heap space.
- **Event Loop Flexibility**: Out-of-the-box support for libuv, libevent, libev, sdevent, glib, and uloop, as well as custom event library integration.

## Technical Architecture

LWS is built around a non-blocking, event-driven architecture. For embedded systems, it provides a "low-level" `wsi` (Websocket Interface) API for fine-grained control, and a "Secure Streams" (SS) layer for simplified management. 

One of the most powerful aspects of the Secure Streams API is its **serialization** capability. This allows a client process (like a small MCU) to forward payloads and metadata to an SS Proxy over a simple transport like a UART or Unix Domain Socket. The proxy then handles the complex TLS, HTTP/2 muxing, and protocol state machines, which is ideal for systems where the main application processor lacks a full network stack.

## Hardware and RTOS Support

Libwebsockets is explicitly designed for cross-platform compatibility. It includes specific support for:
- **ESP32**: Integration with ESP-IDF and lwIP.
- **Raspberry Pi Pico**: Support via the Pico SDK, including examples of running complex protocols over UART via the SS Proxy.
- **RTOS Integration**: First-class support for FreeRTOS and OP-TEE, as well as bare-metal configurations.
- **Standard OS**: Linux, Windows, macOS, and various BSD flavors.

## Getting Started

The project maintains over 100 independent "minimal examples" that serve as a public-domain (CC0) resource for developers. These examples cover scenarios from simple HTTP servers to complex MQTT clients with Secure Streams. 

For developers looking to integrate LWS into their project, the library provides a `lws_config.h` generated during the build process to match the specific features enabled. Documentation is extensive, with a dedicated directory of READMEs covering topics like proxying, TLS handling, and memory management. Detailed Doxygen API documentation is also available for deep-dives into the library's interfaces.
