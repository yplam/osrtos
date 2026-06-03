---
title: WebSocket Implementation for Raspberry Pi Pico W
summary: A C++ implementation of the WebSocket protocol (RFC6455) for the Raspberry
  Pi Pico W. It extends the standard LwIP TCP client example to handle HTTP upgrades
  and WebSocket frame parsing/construction on the RP2040 microcontroller.
slug: websocket-implementation-for-raspberry-pi-pico-w
codeUrl: https://github.com/samjkent/picow-websocket
star: 37
lastUpdated: '2022-07-04'
rtos: ''
libraries:
- lwip
topics:
- http-client
- lwip
- pi
- picow
- picoweb
- rp2040
- websocket
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- rp2040-hat-lwip-c
- asynchttprequest-rp2040w-library
- pico-w-connection-manager-demo
- websocket-client-for-mongoose-os
- picoosc
- rp2040-pico-w-esp8285-wifi-library
---

## Overview

The Raspberry Pi Pico W has become a popular choice for IoT projects due to its integrated wireless capabilities. While the Pico SDK provides robust examples for TCP and UDP communication, many modern web-based applications require the full-duplex, persistent connection provided by WebSockets. This project provides a lightweight WebSocket implementation specifically designed for the Pico W, enabling the RP2040 to communicate with modern web servers and browsers using the RFC6455 protocol.

## Technical Implementation

This project is built upon the Raspberry Pi Pico SDK and utilizes the LwIP (Lightweight IP) stack. It specifically targets the `pico_cyw43_arch_lwip_threadsafe_background` architecture, which allows for efficient network handling on the Pico W's CYW43439 wireless chip.

The implementation follows a two-stage process to establish a connection:

### 1. The HTTP Upgrade

Before WebSocket communication can begin, the client must perform a handshake. The project takes a standard TCP connection and immediately sends an HTTP GET request with specific headers to request a protocol upgrade. This includes the required `Upgrade: websocket` and `Connection: Upgrade` headers, along with a `Sec-WebSocket-Key`.

```cpp
static err_t tcp_client_connected(void *arg, struct tcp_pcb *tpcb, err_t err) {
    TCP_CLIENT_T *state = (TCP_CLIENT_T*)arg;
    if (err != ERR_OK) {
        printf("Connect failed %d\n", err);
    }
 
    // Write HTTP GET Request with Websocket upgrade 
    state->buffer_len = sprintf((char*)state->buffer, "GET / HTTP/1.1\r\nHost: REMOVED:8082\r\nUpgrade: websocket\r\nConnection: Upgrade\r\nSec-WebSocket-Key: x3JJHMbDL1EzLkh9GBhXDw==\r\nSec-WebSocket-Protocol: test\r\nSec-WebSocket-Version: 13\r\n\r\n");
    err = tcp_write(state->tcp_pcb, state->buffer, state->buffer_len, TCP_WRITE_FLAG_COPY);

    state->connected = TCP_CONNECTED;
    printf("Connected\r\n");
    return ERR_OK;
}
```

### 2. WebSocket Framing

Once the server accepts the upgrade, the connection shifts from standard stream-based TCP to frame-based WebSocket communication. The project includes a dedicated `WS` class (`ws.h` and `ws.cpp`) that handles the complexities of the WebSocket frame format, including opcodes, payload length encoding, and masking.

## Key Features

- **Packet Parsing**: The implementation iterates over LwIP `pbuf` chains, copying payloads into a contiguous buffer to handle fragmented TCP packets and extract WebSocket data.
- **Frame Construction**: A `BuildPacket` function allows developers to easily wrap raw data into a valid WebSocket frame with the appropriate opcode (e.g., Text or Binary).
- **LwIP Integration**: By hooking directly into the LwIP callback system, the project maintains a small memory footprint suitable for the RP2040's 264KB of SRAM.

## Usage Example

Sending data over an established WebSocket connection is straightforward using the `BuildPacket` utility:

```cpp
char test[20] = "test";
state->buffer_len = WS::BuildPacket((char *)state->buffer, BUF_SIZE, WEBSOCKET_OPCODE_TEXT, test, sizeof(test), 1);
err_t err = tcp_write(state->tcp_pcb, state->buffer, state->buffer_len, TCP_WRITE_FLAG_COPY);
```

## Hardware Support

The project is configured for the **Raspberry Pi Pico W** using the `pico_w` board definition in CMake. It leverages the CYW43439 wireless driver and the LwIP stack configured in `lwipopts.h` for non-OS (bare-metal) operation, ensuring maximum performance and minimal overhead.
