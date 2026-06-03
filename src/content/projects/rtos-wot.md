---
title: rtos-wot
summary: An open-source FreeRTOS distribution for ESP8266 microcontrollers focused
  on Web of Things (WoT) development. It integrates the FreeRTOS kernel with the lwIP
  TCP/IP stack and Contiki's CoAP library to provide a complete IoT development environment.
  Features a component-based programming model inspired by ARM mbed for hardware control.
slug: rtos-wot
codeUrl: https://github.com/jollen/rtos-wot
siteUrl: http://www.jollen.org/blog/2016/01/study-freertos-using-esp8266.html
star: 29
lastUpdated: '2017-07-26'
rtos: freertos
libraries:
- lwip
topics:
- coap
- freertos
- iot
- lwip
- wot
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- esp-open-rtos
- openthread-rtos
- esp8266-rtos-software-development-kit-sdk
- esp-4diac-forte-library
- ameba-rtos-sdk
- rtox-iot-development-platform
---

## Overview

rtos-wot is a specialized distribution of FreeRTOS designed for the ESP8266 microcontroller, specifically tailored for Web of Things (WoT) applications and educational purposes. Originally forked from the `esp-open-rtos` project, it provides a fully open-source alternative to the official ESP8266 RTOS SDK, allowing developers to study and modify the underlying kernel and network stacks.

The project brings together several mature open-source components into a unified framework. At its core is the FreeRTOS kernel, providing multitasking capabilities. Networking is handled by the lwIP TCP/IP stack, while high-level IoT communication is facilitated by the er-coap library from the Contiki operating system. This combination allows for a transparent, source-available stack that covers everything from task scheduling to application-layer messaging.

## Reusable Components and mbed APIs

One of the standout features of rtos-wot is its adoption of a component-based programming model. It ports several C++ class libraries from the ARM mbed project, such as `AnalogIn` and `DigitalOut`. This enables ESP8266 developers to write FreeRTOS applications using a high-level C++ programming model rather than low-level register manipulation.

For example, using the `AnalogIn` component to read sensor data from the ESP8266 A0 pin is straightforward:

```cpp
#include "AnalogIn.h"

// Initialize AnalogIn on pin 17
AnalogIn AIR(17);
int sensorValue = AIR;
```

This abstraction makes it significantly easier to build reusable drivers for GPIO, ADC, I2C, and UART peripherals while maintaining the performance benefits of a real-time operating system.

## Integrated CoAP Library

The framework includes a full port of the *libcoap* library from the Contiki operating system. CoAP (Constrained Application Protocol) is a specialized web transfer protocol for use with constrained nodes and networks in the Internet of Things. rtos-wot simplifies the process of constructing CoAP messages and transmitting them via lwIP.

Developers can initialize a CoAP packet, fill headers, set payloads, and serialize the message for transmission over UDP with just a few lines of code:

```c
#include "er-coap-13.h"

coap_packet_t request[1];
coap_init_message(request, COAP_TYPE_CON, COAP_POST, 0);
coap_set_header_uri_path(request, "/object/123456/send");

const char *payload = "{}";
coap_set_payload(request, (uint8_t *)payload, strlen(payload));

// Serialize and send via lwip socket
transaction->packet_len = coap_serialize_message(request, transaction->packet);
write(s, transaction->packet, transaction->packet_len);
```

## Technical Architecture

The build system is based on a robust Makefile structure defined in `common.mk`. It supports various flash sizes (up to 32Mbit), flash modes (QIO, QOUT, DIO, DOUT), and OTA (Over-The-Air) updates using the rBoot bootloader. The project also includes a custom implementation of `newlib` and supports mbedTLS for secure communication.

By using the `xtensa-lx106-elf-` toolchain, rtos-wot provides a professional-grade development environment that avoids the proprietary blobs often found in vendor SDKs. This makes it an excellent choice for developers who need deep visibility into the system's operation or for educators teaching the fundamentals of RTOS and IoT integration.
