---
title: Eclipse ThreadX NetX Duo
summary: An industrial-grade dual IPv4 and IPv6 TCP/IP network stack designed for
  deeply embedded real-time and IoT applications. It provides a comprehensive suite
  of network protocols and security features, fully integrated with the ThreadX RTOS
  and supported by major semiconductor vendors.
slug: eclipse-threadx-netx-duo
codeUrl: https://github.com/eclipse-threadx/netxduo
siteUrl: https://projects.eclipse.org/projects/iot.threadx
star: 304
version: v6.4.4.202503a
lastUpdated: '2025-10-06'
rtos: threadx
libraries:
- filex
topics:
- eclipse-threadx
- embedded
- iot
- mcu
- microcontroller
- rtos
- tcp
- tls
isShow: false
createdAt: '2025-12-31'
updatedAt: '2025-12-31'
relatedProjects:
- openthread-rtos
- eclipse-threadx-usbx
- eclipse-threadx-iot-devkit-starter-application
- rtems-lwip-stm32-integration
- ameba-rtos-sdk
- uc-modbus-for-rt-thread
---

# Eclipse ThreadX NetX Duo: Advanced Embedded Networking

Eclipse ThreadX NetX Duo is a high-performance, industrial-grade dual IPv4 and IPv6 network stack designed specifically for deeply embedded, real-time, and IoT applications. As a core component of the Eclipse ThreadX ecosystem, it provides developers with a robust and scalable solution for connecting embedded devices to local networks and the cloud.

## Comprehensive Protocol Support

NetX Duo stands out for its extensive support of network protocols and connectivity options. Beyond the core TCP/IP functionality, the stack includes a wide array of application-layer modules provided as addons. These include:

- **IoT Connectivity**: Native support for Azure IoT, MQTT, and HTTP/HTTPS.
- **Network Infrastructure**: DHCP (Client/Server), DNS, SNTP, and Telnet.
- **File Transfer**: FTP and TFTP support.
- **Media & Streaming**: RTP and RTSP for multimedia applications.
- **Legacy Support**: PPP and POP3 client modules.

This modular architecture allows developers to include only the protocols necessary for their specific application, minimizing the memory footprint on resource-constrained microcontrollers.

## Security and Reliability

In the realm of IoT, security is paramount. NetX Duo addresses this through **NetX Secure**, which provides TLS (Transport Layer Security) and DTLS (Datagram Transport Layer Security) capabilities. These modules leverage the **NetX Crypto** library to ensure secure data transmission and device authentication. The stack is designed to work with hardware security modules and MPU/MCU hardware protection mechanisms to create isolated and secure execution environments.

## Hardware Integration and Ecosystem

NetX Duo is highly portable and has been integrated into the SDKs of leading semiconductor manufacturers, including STMicroelectronics, NXP, Renesas, and Microchip. It supports a variety of architectures, with specific ports available for ARM Cortex-M, RISC-V, and other popular embedded processors.

The stack is tightly integrated with other Eclipse ThreadX components. For instance, it can utilize **FileX** for file-based protocol handlers (like FTP or HTTP servers) and relies on the **ThreadX** RTOS for scheduling and synchronization primitives.

## Getting Started with NetX Duo

The project uses a CMake-based build system, making it easy to integrate into modern development workflows. A typical setup involves defining required features in a configuration file named `nx_user.h`.

```c
/* Example nx_user.h configuration */
#define NX_ENABLE_IPV6
#define NX_HTTP_SERVER_MIN_PACKET_SIZE 600
#define NX_TCP_ACK_EVERY_N_PACKETS 2
```

Building the library as a static component for a specific architecture, such as Cortex-M4, can be done using standard CMake commands:

```bash
$ cmake -Bbuild -GNinja -DCMAKE_TOOLCHAIN_FILE=cmake/cortex_m4.cmake .
$ cmake --build ./build
```

For developers looking to jumpstart their projects, the repository includes a `samples` directory containing practical examples of how to implement various protocols and connectivity scenarios. Detailed documentation for each protocol addon is also available to guide implementation.

## Conclusion

Whether building a simple connected sensor or a complex industrial gateway, Eclipse ThreadX NetX Duo provides the reliability, security, and performance required for modern embedded networking. Its dual-stack nature ensures future-proofing for IPv6 environments while maintaining full compatibility with existing IPv4 infrastructure.
