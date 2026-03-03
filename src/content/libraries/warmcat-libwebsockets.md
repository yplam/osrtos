---
title: libwebsockets
summary: Libwebsockets (LWS) is a lightweight, high-performance C networking library
  providing client and server implementations for HTTP/1, HTTP/2, WebSockets, MQTT,
  and other protocols. It is designed for high scalability and flexibility, supporting
  both resource-constrained embedded RTOS environments like ESP32 and mass cloud serving
  through a non-blocking, event-driven architecture.
slug: warmcat-libwebsockets
codeUrl: https://github.com/warmcat/libwebsockets
siteUrl: https://libwebsockets.org
star: 5199
version: valgrind-clean
lastUpdated: '2026-03-02'
licenses:
- MIT
libraryType: Network
createdAt: '2025-12-30'
updatedAt: '2026-03-03'
---

### Features


- Full support for HTTP/1.1, HTTP/2, and WebSockets (RFC6455) in both client and server roles.

- Native MQTT client implementation with stream binding for sharing connections over a single TLS tunnel.

- Secure Streams (SS) API for protocol-agnostic connectivity and policy-based configuration via JSON.

- Support for multiple event loops including libuv, libevent, libev, glib, sdevent, and uloop.

- Integrated TLS support for OpenSSL, mbedTLS (v2/v3), wolfSSL, BoringSSL, and Windows SChannel.

- Lightweight stream-based parsers for JSON (LEJP), CBOR (LECP), and HTML5 (LHP).

- Asynchronous, non-blocking recursive DNS resolution (Async DNS) with caching and TTL support.

- Display List Objects (DLO) for linewise rendering of HTML/CSS on constrained displays without framebuffers.

- Support for JOSE (JWS/JWE/JWK) and COSE (signing/encryption) security standards.

- System-level services including tiny NTP client, DHCP client, and captive portal detection.

- Zero-copy ring buffer (lws_ring) and chunked allocation (lwsac) for optimized memory management.

- Fault injection API for testing error paths and system robustness during development.

- Support for Unix Domain Sockets and raw socket/file adoption into the event loop.

- Connection validity tracking with automatic PING/PONG heartbeats for protocol health monitoring.

- Threadpool support for offloading long-running tasks from the main event loop using pthreads.

- JIT Trust for dynamic CA certificate instantiation on memory-constrained devices.

- Stateful JPEG and PNG stream decoders for rendering images in resource-limited environments.

- Lws System Message Distribution (SMD) for lightweight inter-subsystem communication.



Libwebsockets (LWS) utilizes a modular, role-based architecture where each network connection (wsi - WebSocket Instance) is assigned a specific role, such as HTTP, WebSockets, or MQTT. This design allows the library to handle diverse protocols through a unified interface of 'ops' structs. The core is built around a strictly non-blocking, event-driven model that can either use its own internal poll() loop or integrate seamlessly with external event libraries like libuv or libevent.

A key architectural innovation is the Secure Streams (SS) layer, which provides a high-level abstraction for connectivity. SS segregates application logic from connection details, moving protocol, endpoint, and TLS policy into a separate JSON file. This allows the same user code to be fulfilled directly, proxied to another process, or transported over custom links like UART without modification.

**Core Components**
- **Context**: The global environment managing vhosts, event loops, and shared resources.
- **Vhost**: Virtual hosts allowing multiple listeners or client configurations on different interfaces.
- **WSI**: The fundamental object representing a single network connection or file descriptor.
- **Secure Streams**: An optional higher-level API for simplified, serializable connectivity.
- **LWS System**: Centralized services for state management, logging, and network utilities.

### Use Cases

This library is ideal for:
- **IoT Connectivity**: Implementing secure, low-footprint MQTT or WebSocket clients on ESP32 or Raspberry Pi Pico for cloud telemetry.
- **Embedded Web Servers**: Serving configuration interfaces or dashboards using HTTP/2 and WebSockets on RTOS-based industrial controllers.
- **Network Proxies**: Building high-performance HTTP/2 to HTTP/1.1 or WebSocket proxies with custom header manipulation and load balancing.
- **Resource-Constrained UIs**: Driving EPD or TFT displays using the LHP HTML5 parser to render remote web content on devices with minimal RAM.

### Getting Started

To get started with Libwebsockets, developers should first explore the [minimal-examples](https://libwebsockets.org/git/libwebsockets/tree/minimal-examples) directory, which contains over 100 CC0-licensed examples for various scenarios. Building the library requires CMake (3.10+); a typical build involves running `cmake . && make`. For embedded development, LWS provides native support for the ESP-IDF and Raspberry Pi Pico SDK. Comprehensive [Doxygen API documentation](https://libwebsockets.org/lws-api-doc-main/html/index.html) and a collection of [topic-specific READMEs](https://libwebsockets.org/git/libwebsockets/tree/READMEs) are available to guide implementation of specific features like Secure Streams or Async DNS.
