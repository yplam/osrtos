---
title: Mbed to AWS IoT Example
summary: A reference application for connecting Mbed OS devices to AWS IoT Core using
  MQTT over TLS. It demonstrates secure cloud connectivity across Ethernet, Wi-Fi,
  and Cellular interfaces for various ARM Cortex-M microcontrollers.
slug: mbed-to-aws-iot-example
codeUrl: https://github.com/coisme/Mbed-to-AWS-IoT
siteUrl: https://os.mbed.com/users/coisme/notebook/aws-iot-from-mbed-os-device/
star: 4
lastUpdated: '2020-04-20'
rtos: mbed-os
libraries:
- lwip
topics:
- aws-iot
- mbed-os
- mqtt
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- mbed-to-ibm-watson-iot-platform
- aws-iot-with-the-l475vg-iot01a-on-mbed-os
- mbed-to-google-cloud-iot
- mbed-to-azure-iot-hub
- mbed-os-client-example
- pelion-device-management-client-example-for-mbed-os
---

Connecting microcontrollers to cloud services requires a robust combination of networking stacks, security protocols, and application logic. The Mbed-to-AWS-IoT project serves as a practical example for developers looking to integrate Mbed OS devices with the AWS IoT Core ecosystem. By leveraging MQTT over a secure TLS connection, it ensures that data transmitted between the edge device and the cloud remains encrypted and authenticated.

### Secure Connectivity with MQTT and TLS

At the heart of the project is the use of the MQTT protocol, the standard for IoT messaging. To meet the security requirements of AWS IoT, the application implements TLS (Transport Layer Security) using Mbed OS's `TLSSocket` capabilities. This setup involves configuring the device with the necessary Amazon Root CA certificates and, optionally, client certificates for mutual authentication.

The `MQTTNetwork` class acts as a wrapper around the Mbed `TLSSocket`, providing the necessary `read` and `write` interfaces required by the MQTT client library. This abstraction allows the application to handle the complexities of TLS handshakes and socket management while maintaining a clean interface for the MQTT protocol.

### Multi-Platform and Interface Support

One of the strengths of this example is its broad hardware support. Through the `mbed_app.json` configuration file, the project provides tailored settings for several popular development boards:

- **NXP FRDM-K64F**: Utilizing the onboard Ethernet interface.
- **ST DISCO_L475VG_IOT01A**: Using the integrated Wi-Fi module (ISM43362).
- **Renesas RZ_A1H**: Demonstrating support for high-performance Mbed targets.
- **Seeed Wio 3G / Wio BG96**: Showcasing cellular connectivity via LTE Cat.1 or NB-IoT/Cat.M1.

This flexibility is achieved through the Mbed OS `NetworkInterface` abstraction, which allows the same application code to run over different physical layers by simply changing the underlying interface type in the configuration.

### Configuration and Deployment

To get started, developers need to populate the `MQTT_server_setting.h` file with their specific AWS IoT endpoint, client ID, and topic information. The project also requires the inclusion of the Amazon Root CA certificate in PEM format to verify the server's identity. 

The application logic in `main.cpp` handles the high-level flow: initializing the network interface, synchronizing time via NTP (essential for certificate validation), and establishing the MQTT connection. Once connected, the device can publish messages to a specified topic and subscribe to incoming commands or updates from the AWS cloud.

### Technical Components

The project integrates several key Mbed components and libraries:

- **Mbed OS**: The underlying RTOS providing scheduling and hardware abstraction.
- **Mbed MQTT Library**: A lightweight MQTT client implementation for embedded devices.
- **NTP Client**: Used to ensure the system clock is accurate for TLS handshake validation.
- **LWIP**: The underlying TCP/IP stack used for many of the network interfaces.

This example provides a solid foundation for building production-grade IoT firmware, demonstrating best practices for secure cloud integration on resource-constrained embedded systems.
