---
title: Lwirax
summary: A lightweight middleware library that provides a glue layer between the lwIP
  raw TCP stack and the axTLS implementation. It enables SSL/TLS support for resource-constrained
  embedded devices, specifically targeting asynchronous environments like the ESP8266.
slug: lwirax
codeUrl: https://github.com/attachix/lwirax
star: 16
lastUpdated: '2019-10-05'
rtos: ''
libraries:
- lwip
topics:
- asynchronous-mode
- axtls
- esp8266
- lwip
- ssl
- tls
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- lwip-for-esp8266
- asynchttpsrequest-esp32-ethernet
- asyncwebserver-ethernet
- embeddedmqttbroker
- https-server-generic-library
- libwebsockets
---

## Overview

Lwirax (a portmanteau of **LW**ip**R**aw and **AX**tls) is a specialized middleware component designed to bridge the gap between two popular embedded networking tools: the Light Weight IP (lwIP) stack and the axTLS library. While lwIP is a staple for microcontrollers like the ESP8266, using its asynchronous "raw" mode in conjunction with axTLS is notoriously difficult. Lwirax simplifies this integration, providing the necessary abstractions to handle TLS/SSL encryption within the event-driven architecture of lwIP.

## The Challenge of Asynchronous TLS

In many embedded systems, networking is handled in a non-blocking, callback-based manner to conserve resources. lwIP's raw mode is the primary way to achieve this, but most TLS libraries expect a standard Berkeley sockets interface (blocking I/O). axTLS is a lightweight TLS implementation, but it still requires significant "glue" code to map lwIP's `pbuf` structures and callback events to the TLS state machine. Lwirax acts as this glue, managing the mapping between TCP Protocol Control Blocks (PCBs) and SSL contexts.

## Key Features

- **Asynchronous Integration**: Specifically designed for lwIP raw mode, ensuring that TLS operations do not block the main execution thread.
- **Resource Efficiency**: Optimized for microcontrollers with limited RAM and processing power.
- **Platform Portability**: While tested extensively on the ESP8266, the library includes a `lwipr_platform.h` header to facilitate porting to other hardware architectures.
- **Compatibility**: Proven to work with axTLS versions 1.4.9 through 2.0.0+.

## Technical Implementation

Lwirax introduces a mapping system that allows developers to associate an lwIP TCP connection with an SSL object. The core workflow involves initializing the library with `axl_init`, appending a TCP connection to the internal mapping via `axl_append`, and then using specialized read/write functions.

### Initialization and Connection

To use Lwirax, the developer initializes the library after the standard lwIP setup. When a connection is established, a client file descriptor (mapping) is created:

```c
// Initialize Lwirax for up to 10 concurrent SSL connections
axl_init(10);

// Inside the lwIP connected callback
int clientfd = axl_append(tcp_pcb);
sslContext = ssl_ctx_new(SSL_CONNECT_IN_PARTS | options, 1);
sslObj = ssl_client_new(sslContext, clientfd, NULL, 0);
```

### Data Handling

Lwirax provides wrappers for reading and writing data that handle the underlying decryption and encryption processes. For example, when data arrives via an lwIP callback, `axl_ssl_read` is used to decrypt the incoming `pbuf` and return the plaintext data in a new buffer.

```c
read_bytes = axl_ssl_read(sslObj, tcp, pbuf_in, &pbuf_out);
if(read_bytes > 0) {
    // pbuf_out now contains decrypted data
    pbuf_free(pbuf_in);
}
```

## Integration and Ecosystem

Lwirax is a core component of the Sming framework (specifically the Sming Tasty branch), where it powers secure TCP connections. It demonstrates how complex cryptographic protocols can be implemented on low-power hardware without sacrificing the performance benefits of asynchronous networking. For developers building IoT devices that require secure communication with cloud services (like Google servers), Lwirax provides the essential infrastructure to implement SSL/TLS with minimal overhead.
