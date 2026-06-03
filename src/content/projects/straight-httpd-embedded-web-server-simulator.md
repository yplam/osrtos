---
title: 'Straight-HTTPD: Embedded Web Server Simulator'
summary: A lightweight HTTP/HTTPS server solution for embedded systems based on the
  lwIP TCP/IP stack and mbedtls. It provides a Windows-based simulation environment
  using pcap to develop and debug web services before deploying to microcontrollers
  like the Cortex-M4.
slug: straight-httpd-embedded-web-server-simulator
codeUrl: https://github.com/straight-coding/straight-httpd-lwip-mbedtls-simulator
star: 16
version: go_public
lastUpdated: '2020-11-22'
rtos: ''
libraries:
- lwip
topics:
- chunked
- discover
- embedded
- event
- gzip
- http
- httpd
- https
- lwip
- mbedtls
- parser
- pcap
- raw
- server
- simulator
- ssdp
- ssi
- tcp
- virtual
- web
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- lpc407x-noos-lwip-mbedtls-httpd-for-keil
- ip-over-usb
- uht-micro-http-toolkit
- lwip-contrib-unix-port
- lwip-http-server-netconn-rtos-application
- lwip-for-linux
---

## Overview

Straight-HTTPD is a specialized HTTP server prototype designed for embedded systems development. By leveraging the lwIP (Raw/TCP) stack and mbedtls, it provides a robust foundation for web services on resource-constrained hardware. A standout feature of this project is its Windows-based simulation environment, which allows developers to build and debug complex web interfaces using Microsoft Visual Studio before porting the code to actual microcontrollers.

The simulator creates a "Virtual Device" on a Windows machine using `pcap`. This approach offers several advantages: it utilizes the powerful debugging tools of the Windows platform, enables parallel development when hardware or J-TAG emulators are scarce, and allows for rapid experimentation with lwIP and mbedtls configuration parameters to find the optimal balance for the target system.

## Key Features

Straight-HTTPD is packed with features typically required in modern embedded web interfaces:

- **Security**: Full support for HTTPS with automatic redirection of HTTP requests. It handles self-signed certificates and private keys via mbedtls.
- **Protocol Support**: Implements SSDP (Simple Service Discovery Protocol) for network neighbor detection and supports HTTP/1.1 features like pipelining and keep-alive.
- **Efficient Data Handling**: Supports `chunked` responses, which is critical for memory-limited devices that cannot buffer large files before transmission. It also supports `range` requests for multi-threaded downloading or video seeking.
- **Dynamic Content**: Includes a simple SSI (Server Side Includes) engine using the `<!--#TAG_NAME-->` syntax, allowing C variables to be injected directly into HTML or JavaScript.
- **CGI Mapping**: A flexible structure for binding request paths and HTTP events to specific C handler functions.

## Technical Architecture

The project is structured to bridge the gap between a desktop simulation and an embedded target. The `lwip-port` folder contains the necessary glue code to interface the lwIP stack with the Windows environment, providing abstractions for Mutexes, Semaphores, and System Ticks. 

### CGI Mapping Structure

The core of the application logic resides in the `CGI_Mapping` structure. This allows developers to define how the server responds to specific URLs and methods (GET/POST). Each mapping can define callbacks for header reception, content reception, and response generation.

```c
struct CGI_Mapping
{
    char path[MAX_CGI_PATH];
    unsigned long optionsAllowed;
    void (*OnHeadersReceived)(REQUEST_CONTEXT* context);
    int  (*OnContentReceived)(REQUEST_CONTEXT* context, char* buffer, int size);
    void (*OnRequestReceived)(REQUEST_CONTEXT* context);
    int  (*ReadContent)(REQUEST_CONTEXT* context, char* buffer, int maxSize);
    // ... other callbacks
};
```

## Simulation and Deployment

To run the simulator, the host machine requires the `npcap` or `wpcap` driver (often installed with Wireshark). Once running, the Virtual Device appears in the Windows "Network Neighbors" via SSDP. This allows a browser on a separate machine (or the same machine with modern drivers) to access the embedded web server as if it were a physical piece of hardware.

While the simulator runs on Windows, the code is designed for portability. The project includes references for porting to NoOS (bare-metal) environments on ARM Cortex-M4 platforms, such as the LPC40xx series. Developers can tune performance parameters like `MEM_SIZE`, `TCP_MSS`, and `TCP_WND` within the simulator to match the constraints of their final hardware target.

## Example Use Cases

The repository provides several comprehensive examples of common embedded web tasks:
- **Firmware Upload**: A demo for uploading large files to a specific device directory with flow control.
- **File Explorer**: A RESTful API example using chunked JSON responses to browse device directories.
- **Configuration Forms**: A typical pattern for GETting existing settings and POSTing modifications back to the device's internal database.
- **Authentication**: A session-based sign-in/sign-out system with a 3-minute timeout.
