---
title: SMS Server
summary: A self-hosted SMS gateway designed for GSM modem hardware, specifically targeting
  Raspberry Pi setups with GSM HATs. It provides HTTP and WebSocket APIs for messaging,
  GNSS location tracking, and modem control with encrypted database persistence using
  SQLite.
slug: sms-server
codeUrl: https://github.com/morgverd/sms-server
siteUrl: https://morgverd.github.io/sms-server
star: 15
version: v3.5.4
lastUpdated: '2026-02-04'
rtos: ''
libraries:
- sqlite
topics:
- gsm
- gsm-modem
- raspberry-pi
- rust
- sms
- sms-api
- sms-gateway
- sms-server
isShow: false
createdAt: '2026-02-05'
updatedAt: '2026-02-05'
relatedProjects:
- sistema-de-apertura-de-port-n-con-m-dulo-gsm
- esp32-gps-gateway-with-rtk-ntrip-support
- meshadv-pi-hat
- mbed-cellular-boilerplate
- m66-gsm-module-integration-with-avr-microcontroller
- quectel-gsm-lte-modem-driver
---

## Overview

SMS Server is a robust, self-hosted SMS gateway designed to bridge the gap between cellular modem hardware and modern software integrations. Built primarily for the Raspberry Pi platform equipped with GSM HATs, it transforms a physical SIM card into a powerful messaging hub. The project provides a comprehensive suite of tools for handling SMS messages, GNSS (GPS) data, and real-time modem status monitoring without the need for inefficient SIM polling.

By leveraging the Rust programming language and the Tokio asynchronous runtime, SMS Server offers high performance and reliability, ensuring that incoming messages and events are processed and dispatched with minimal latency.

## Key Features and Capabilities

The server is packed with advanced features that go beyond simple text messaging:

- **Advanced SMS Handling**: It automatically manages multipart (long) SMS messages and tracks delivery reports, providing status updates as messages move through the cellular network.
- **Location Services**: Built-in support for GNSS/GPS tracking allows for real-time position reporting. This data can be integrated directly into SMS workflows or monitored via live events.
- **Secure Storage**: All messages stored within the internal database are encrypted by default using AES-GCM, ensuring privacy even if the physical storage is compromised.
- **Real-time Events**: Using WebSockets and HTTP Webhooks, the server pushes events (like incoming messages or signal strength changes) to connected clients instantly.
- **Flexible Integration**: With full OpenAPI support, developers can easily interact with the REST API, or use the dedicated Rust client library for faster development.

## Technical Architecture

SMS Server is built on a modular architecture where features can be toggled during the build process to optimize for specific hardware constraints. It uses `sqlx` with an SQLite backend for persistent storage, providing a lightweight yet reliable database solution for embedded environments.

For hardware interaction, the project utilizes the `rppal` library to manage Raspberry Pi GPIO pins, which is particularly useful for automatic power management of GSM HATs. Communication with the modem occurs over serial interfaces using `tokio-serial`, handling standard AT commands and Unsolicited Result Codes (URCs) for asynchronous event notification.

## Hardware Compatibility

While designed to be flexible, the project is optimized for the **Waveshare GSM/GPRS/GNSS HAT** on a Raspberry Pi. It requires a GSM modem capable of a serial connection and a SIM card with an active data/SMS plan. The software handles the complexities of carrier-specific APN configurations and network registration internally.

## Getting Started

Setting up the SMS Server involves connecting your GSM hardware, configuring the `config.toml` file, and launching the binary. The project supports various build configurations via Cargo features:

```shell
# Standard build with default features (GPIO, HTTP, SQLite, Rustls)
cargo build -r

# Minimal build for specific use cases
cargo build -r --no-default-features -F gpio,db-sqlite,tls-native
```

Once running, the server provides a Swagger UI (if the `openapi` feature is enabled) at `/docs`, allowing developers to test endpoints for sending messages, checking signal strength, or retrieving GNSS coordinates immediately.
