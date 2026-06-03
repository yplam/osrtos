---
title: STM32F7 HTTPS Client
summary: A simple HTTPS client implementation for the STM32F7 microcontroller using
  mbedtls and FreeRTOS. It features DHCP support via LwIP, certificate authority management,
  and basic HTTPS GET functionality on the STM32F746NG Discovery Kit.
slug: stm32f7-https-client
codeUrl: https://github.com/anon767/STM32F7HTTPS
star: 8
lastUpdated: '2019-10-28'
rtos: freertos
libraries:
- lwip
topics:
- dhcp
- freertos
- https-client
- lwip
- mbedtls
- mcu
- stm32
- stm32f7
- stm32f746g-discovery
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- stm32-https-wolfssl-demo
- stm32h745-ethernet-with-lwip-and-freertos
- lwip-tcp-ip-stack-on-stm32-microcontroller
- stm32-lwip-mqtt-demo
- mqtt-client-and-https-server-using-mbedtls
- stm32-ftp-server
---

## Overview

The STM32F7HTTPS project provides a functional example of an HTTPS client running on the STM32F7 series of microcontrollers. Developed specifically to address the lack of standard mbedtls client/server samples for this specific controller family, it serves as a practical reference for developers needing secure web communication in their embedded applications.

The project was originally tested on the STM32F746NG Discovery Kit. While this specific hardware does not utilize crypto hardware acceleration in this implementation, the software-based approach using mbedtls provides a robust foundation for secure data exchange.

## Key Features

- **Secure Communication**: Utilizes mbedtls to handle the complexities of TLS/SSL, enabling secure HTTPS GET requests.
- **Multithreaded Architecture**: Built on FreeRTOS, allowing the networking stack and application logic to run in a threaded environment for better responsiveness.
- **Network Management**: Includes DHCP support via the LwIP stack, simplifying network configuration on local networks.
- **Certificate Management**: Supports a list of Certificate Authorities (CAs) to verify server identities.
- **User Interface**: Features an LCD display log, providing real-time feedback and debugging information directly on the Discovery Kit's screen.

## Technical Implementation

The project integrates several critical middleware components to achieve its functionality. LwIP (Lightweight IP) manages the TCP/IP stack, while mbedtls sits on top of the transport layer to provide the encryption necessary for HTTPS. FreeRTOS orchestrates these components, ensuring that network operations do not block other system tasks.

For developers using different environments, the repository includes project files for several popular IDEs, including ST System Workbench (SW4STM32), IAR Embedded Workbench (EWARM), and Keil MDK-ARM.

## Getting Started

To test the client, you can set up a local HTTPS server using OpenSSL. This allows you to verify the connection and data retrieval without needing a public web server. The process involves generating a self-signed certificate and running the OpenSSL `s_server` utility:

```bash
openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout key.pem -out cert.pem
echo "success!!" > test.html
openssl s_server -key key.pem -cert cert.pem -accept 44330 -WWW
```

Once the server is running, you simply need to adjust the `SERVER_NAME` in `main.h` to match your host's IP address, compile the project, and flash it to the MCU. The device will then attempt to connect, perform the handshake, and fetch the `test.html` file, displaying the progress on the LCD.
