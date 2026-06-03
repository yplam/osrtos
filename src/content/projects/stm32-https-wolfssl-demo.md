---
title: STM32 HTTPS WolfSSL Demo
summary: A demonstration project for STM32 microcontrollers implementing HTTPS functionality
  using FreeRTOS, LwIP, and WolfSSL. It features support for DHCP, SNTP for time synchronization,
  and NetBIOS, specifically targeting the STM32F7 series.
slug: stm32-https-wolfssl-demo
codeUrl: https://github.com/PeterH0323/STM32_HTTPs_WolfSSL
siteUrl: https://blog.csdn.net/hxj0323/article/details/108296539
star: 59
version: V1.3
lastUpdated: '2020-09-04'
rtos: freertos
libraries:
- lwip
topics:
- freertos
- https
- lan8720
- lwip
- stm32
- wolfssl
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- stm32f7-https-client
- stm32-lwip-mqtt-demo
- lwip-tcp-ip-stack-on-stm32-microcontroller
- stm32h745-ethernet-with-lwip-and-freertos
- mqtt-client-and-https-server-using-mbedtls
- lwip-http-server-netconn-rtos-application
---

The STM32_HTTPs_WolfSSL project provides a comprehensive demonstration of implementing secure HTTPS communication on STM32 microcontrollers. By integrating a robust stack consisting of FreeRTOS, LwIP, and WolfSSL, this project enables embedded devices to perform secure web requests, which is a fundamental requirement for modern IoT applications.

### Core Components and Architecture

The project is built upon the STM32F767IGTx microcontroller, leveraging its high-performance ARM Cortex-M7 core. The software architecture is layered to provide a stable networking environment:

- **FreeRTOS**: Acts as the real-time operating system, managing tasks and synchronization.
- **LwIP (Lightweight IP)**: Handles the TCP/IP networking stack, configured for version 2.1.2.
- **WolfSSL**: Provides the SSL/TLS layer necessary for HTTPS communication.
- **Hardware RNG**: The STM32's hardware Random Number Generator is utilized to provide high-quality entropy for cryptographic operations.

### Key Features

Beyond basic HTTPS GET requests, the demo includes several essential networking features that make it a production-ready reference:

- **DHCP Support**: Automatically obtains IP addresses and network configuration from the local network.
- **SNTP (Simple Network Time Protocol)**: Synchronizes the system clock with network time servers. This is critical for HTTPS, as SSL certificates have validity periods that require the device to have an accurate current time to pass verification.
- **NetBIOS**: Enables name resolution on local networks, allowing the device to be identified by hostname.
- **Domain Name Resolution (DNS)**: Allows the device to connect to servers using hostnames rather than static IP addresses.

### Configuration and Customization

The project is designed to be easily adaptable to different web services. Users can modify the root certificate and target domain within the source code. The implementation includes a specific example of configuring the project to connect to Baidu's servers, demonstrating how to embed PEM certificates directly into the firmware.

```c
// Example configuration for a specific host
static const unsigned char __ssl_root_certificate[] =
"-----BEGIN CERTIFICATE-----"
"MIIKLjCCCRagAwIBAgIMclh4Nm6fVugdQYhIMA0GCSqGSIb3DQEBCwUAMGYxCzAJ"
// ... certificate data ...
"-----END CERTIFICATE-----";

char s__host_name[] = "www.baidu.com";

#define HTTPS_GET_API "GET / HTTP/1.1\r\n" \
                      "Host: www.baidu.com\r\n" \
                      "\r\n"
```

### Hardware Setup

The project is configured via STM32CubeMX, which defines the pinout for the RMII Ethernet interface, the FMC for external memory, and the internal RTC. The use of the Cortex-M7's instruction and data caches ensures that the computational overhead of encryption and decryption is handled efficiently, maintaining system responsiveness during secure handshakes.

### Getting Started

To use this project, developers typically open the `HTTPS_Demo.ioc` file in STM32CubeMX to review the peripheral configuration and then use the MDK-ARM (Keil) project files provided in the repository to compile and flash the firmware. The project structure follows standard STM32Cube patterns, with custom logic located in the `Bsp` and `Core` directories. Detailed step-by-step instructions and technical explanations regarding the integration of WolfSSL with LwIP are available in the accompanying technical blog post provided by the author.
