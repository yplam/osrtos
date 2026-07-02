---
title: Quectel GSM/LTE Modem Driver
summary: A C library providing a CMSIS-compliant driver API for Quectel LTE and GPRS
  modules such as the EG915 and EC21. It facilitates modem operations including power
  control, network registration, and HTTP requests via AT commands. Designed for ARM
  Cortex-M microcontrollers, it leverages CMSIS-RTOS features for thread-safe operation.
slug: quectel-gsm-lte-modem-driver
codeUrl: https://github.com/MrZahaki/GSM
star: 10
lastUpdated: '2024-08-02'
rtos: cmsis
topics:
- arm
- cmsis
- cmsis-drivers
- ec21
- eg915
- gsm-modem
isShow: false
createdAt: '2025-12-29'
updatedAt: '2025-12-29'
relatedProjects:
- avnet-wnc14a2a-cellular-driver
- cicada-iot-communications-module-for-energy-access
- m66-gsm-module-integration-with-avr-microcontroller
- cmsis-drivers-for-efm32-and-stm32
- quectel-uniknect-project
- mbed-cellular-boilerplate
---

## Overview

The GSM Modem Driver is a portable C library designed to interface ARM-based microcontrollers with Quectel LTE-FDD, LTE-TDD, and GPRS modules, including the EG915 and EC21 series. Built upon the ARM CMSIS-Driver standard, this library provides a structured API to manage modem hardware via AT commands, abstracting the complexity of serial communication into high-level functional blocks.

The library is particularly useful for developers working with ARM Cortex-M processors who require reliable cellular connectivity for IoT applications. By adhering to CMSIS standards, it ensures a degree of portability across different MCU vendors while providing specific implementations for common modem tasks like PDP context activation and HTTP communication.

## Architecture and Components

The library is divided into two primary layers to balance low-level hardware control with application-level ease of use:

1.  **Modem Driver**: This component handles the raw serial interface (typically UART or SPI), managing the transmission and reception of AT commands. It is responsible for parsing responses and handling the asynchronous nature of modem communication.
2.  **Modem API**: This higher-level layer provides functions for common operations. Instead of manually formatting AT strings, developers can call functions to activate a PDP context, send an SMS, or perform an HTTP GET/POST request.

## Key Features

### Comprehensive Interface Support
The driver exposes several specialized interfaces:
- **Control Interface**: Manages the basic setup and power state of the modem module.
- **Management Interface**: Handles data connectivity configurations for LTE and GPRS networks.
- **HTTP Interface**: A lightweight API for interacting with web services, supporting URI-based requests and structured data exchange.
- **Socket Interface**: (Planned for future release) Intended to provide direct access to the modem's internal IP stack.

### Power Management
Efficient power usage is critical in embedded systems. The driver supports multiple power profiles, including `MOD_POWER_FULL` for active operation, `MOD_POWER_LOW` for sleep modes where the modem can still wake up on external events, and `MOD_POWER_OFF` for complete shutdown.

### Asynchronous Event Handling
The library utilizes a callback mechanism (`MOD_SignalEvent`) to notify the application of hardware events, such as RF failures, soft resets, or data arrival. This prevents the application from polling the modem and allows for more efficient, interrupt-driven designs.

## Usage Example: HTTP GET Request

The following example demonstrates how to initialize the driver and perform a simple HTTP GET request to retrieve data from a server:

```c
// Initialize the modem driver
MOD_DRIVER *modem = &MOD_DRIVER0;
modem->Initialize(NULL);
modem->PowerControl(MOD_POWER_FULL);

// Configure TCP/IP and APN
MOD_CONTEXT_CONFIG tcp;
tcp.contextID = MOD_DEFAULT_CONTEXT;
tcp.context_type = MOD_PDP_CONTEXT_TYPE_IPV4;
tcp.APN = (uint8_t *)"your_apn";

// Activate PDP context
MOD_PDP_CONTEXT pdp;
int32_t socket = modem->Activate(&tcp, &pdp);

if(socket >= 0 && pdp.state == MOD_PDP_CONTEXT_ACTIVATED) {
    MOD_HTTP_t httpd = {0};
    httpd.method = MOD_HTTP_GET;
    httpd.url = (uint8_t *)"http://example.com";
    httpd.response = (uint8_t *)buffer;
    httpd.response_length = 1000;

    // Execute HTTP request
    int32_t status = modem->HTTP(socket, &httpd);
    if(status > 0) {
        // Process response
    }
}
```

## Integration Requirements

To use this driver, the target system should support CMSIS-RTOS features, specifically mutexes, to ensure thread safety when multiple tasks access the modem. The physical connection typically requires a UART or SPI interface. Because the driver is designed for privileged mode on Cortex-M processors, developers should ensure that RTOS threads calling these functions have the appropriate execution permissions.
