---
title: MQTT Client and HTTPS Server using MbedTLS
summary: A demo application for the TWR-K64F120M board featuring an HTTPS server and
  an MQTT client. It utilizes FreeRTOS, the lwIP TCP/IP stack, and MbedTLS for secure
  communication. The project demonstrates secure web hosting and MQTT pub/sub functionality
  on embedded hardware.
slug: mqtt-client-and-https-server-using-mbedtls
codeUrl: https://github.com/AngeloAlifano/mqtt-https-mbedtls
star: 5
lastUpdated: '2020-03-06'
rtos: freertos
libraries:
- lwip
topics:
- freertos
- https-server
- lwip
- mbedtls
- mqtt
- mqtt-client
- nxp
isShow: false
createdAt: '2025-12-31'
updatedAt: '2025-12-31'
relatedProjects:
- freertos-mqtt-client-demo
- stm32-lwip-mqtt-demo
- stm32-https-wolfssl-demo
- stm32h750b-dk-touchgfx-freertos-mqtt-example
- mbed-to-ibm-watson-iot-platform
- lwip-http-server-netconn-rtos-application
---

## Overview

The mqtt-https-mbedtls project is a comprehensive demonstration of secure networking on embedded systems. It combines two major communication patterns—web serving via HTTPS and messaging via MQTT—into a single application running on FreeRTOS. By leveraging the lwIP TCP/IP stack and the MbedTLS cryptographic library, the project provides a blueprint for building secure, connected IoT devices.

## Key Features

The application serves two primary roles simultaneously:

### HTTPS Server
The board acts as a secure web server. When a user navigates to the board's IP address in a standard web browser, the system handles the TLS handshake and serves a static web page. This functionality is built on top of the lwIP HTTPS server implementation, providing a secure interface for device configuration or status monitoring.

### MQTT Client
In addition to the web server, the project includes a robust MQTT client. It connects to a specified MQTT broker using a secured socket (TLS). Once connected, the client performs several actions:
- Resolves the broker's hostname if a DNS name is provided.
- Subscribes to multiple topics (e.g., `lwip_topic/#` and `lwip_other/#`).
- Publishes messages to specific topics, which are then received back by the board due to its own subscriptions.
- Continues to process incoming messages from other clients in the background.

## Technical Architecture

The project is designed for the NXP TWR-K64F120M development board and is built using the MCUXpresso IDE. The software stack is composed of several critical layers:
- **RTOS**: FreeRTOS manages the multi-threaded environment, allowing the HTTPS server and MQTT client to operate concurrently.
- **Network Stack**: lwIP (Lightweight IP) provides the TCP/IP implementation.
- **Security**: MbedTLS handles the encryption, decryption, and certificate management required for both HTTPS and secure MQTT (MQTTS).
- **Hardware Interface**: The project utilizes the RMII mode on the TWR-SER board for Ethernet connectivity.

## Getting Started

To run the demo, the hardware must be configured with specific jumper settings for RMII mode. The board is typically assigned a static IP (e.g., `192.168.0.102`) to communicate with a host PC on the same subnet. 

Upon startup, the serial terminal provides real-time feedback on the initialization of the PHY, the assignment of IPv4 addresses, and the status of the MQTT connection. Users can interact with the system by accessing the HTTPS URL in a browser or by using an MQTT broker/client on their PC to exchange messages with the board.

### Modifying Web Content
The project includes a workflow for updating the web server's content. Static files located in the middleware directory can be modified or replaced. A provided Perl script (`mkfs.pl`) is used to pack these files into a C-based file system (`httpsrv_fs_data.c`), which is then compiled directly into the firmware image. This allows for custom dashboards and interfaces to be embedded within the device.
