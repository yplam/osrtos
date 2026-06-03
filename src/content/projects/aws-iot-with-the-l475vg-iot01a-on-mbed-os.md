---
title: AWS IoT with the L475VG-IOT01A on Mbed OS
summary: A cloud-connectivity application for the STMicroelectronics STM32L4 Discovery
  Kit IoT Node using Mbed OS. It enables secure MQTT communication with AWS IoT via
  the on-board ISM43362 WiFi module, featuring TLS encryption and NTP time synchronization.
slug: aws-iot-with-the-l475vg-iot01a-on-mbed-os
codeUrl: https://github.com/jankammerath/L475VG-IOT01A-Mbed-AWS-IoT
star: 9
lastUpdated: '2018-10-22'
rtos: mbed-os
topics:
- amazon-web-services
- arm
- aws
- aws-cloud
- aws-iot
- c
- cpp
- iot
- iot-application
- mbed
- mbed-os
- mbedos
- mbedtls
- mqtt
- mqtt-client
- mqtt-connector
- ntp
- stm32
- tls
- wifi
isShow: false
createdAt: '2025-12-29'
updatedAt: '2025-12-29'
relatedProjects:
- mbed-to-aws-iot-example
- mbed-to-ibm-watson-iot-platform
- mbed-to-google-cloud-iot
- mqtt-demo-for-stm32-iot-discovery-board-with-thingsboard
- mbed-to-azure-iot-hub
- smartlock-for-disco-l475vg-iot01a
---

The L475VG-IOT01A-Mbed-AWS-IoT project provides a robust starting point for developers looking to integrate the STMicroelectronics STM32L4 Discovery Kit IoT Node with the Amazon Web Services (AWS) IoT ecosystem. Built on the ARM Mbed OS platform, this application bridges the gap between embedded hardware and cloud-based device management.

The project was born out of a need for a working example that successfully connects the STM32L4 to AWS IoT, as many existing libraries or examples can be difficult to configure for this specific hardware. It leverages the built-in WiFi capabilities of the Discovery Kit to establish secure MQTT connections, providing a template for IoT sensor data ingestion.

### Secure Connectivity and Cloud Integration

At the heart of the application is a secure communication stack. It utilizes TLS (Transport Layer Security) to ensure that data transmitted between the STM32L4 and AWS IoT remains encrypted and authenticated. The project includes a dedicated configuration for Mbed TLS entropy sources, which is critical for generating the randomness required for secure cryptographic operations on embedded hardware.

The application uses the MQTT protocol, the standard for IoT messaging, to publish sensor data or receive commands from the cloud. To facilitate this, the project integrates several key components:

- **Mbed OS**: The underlying real-time operating system providing the hardware abstraction and networking stack.
- **ISM43362 WiFi Module**: Drivers for the on-board Inventek WiFi module to provide internet access.
- **NTP Client**: Used to synchronize the system clock, which is essential for validating the expiration dates of TLS certificates.
- **MQTT and TLS Libraries**: Specialized libraries for handling the messaging protocol and secure socket layer.

### Hardware Support

While specifically designed for the STM32L475VG-IOT01A (the US model), the codebase is compatible with the Non-US IOT01B model. The Discovery Kit is a feature-rich platform that includes various sensors (motion, environmental, and acoustic), making it an ideal candidate for AWS IoT prototyping and edge computing applications.

### Configuration and Setup

Getting the project running involves configuring both network and cloud credentials. The `mbed_app.json` file handles the WiFi SSID and password, while the `MQTT_server_setting.h` file is used to store the AWS IoT endpoint and the PEM-formatted client certificate and private key.

```cpp
const char MQTT_SERVER_HOST_NAME[] = "INSERT_THING_ENDPOINT_HERE.iot.eu-central-1.amazonaws.com";

const char* SSL_CLIENT_CERT_PEM = "-----BEGIN CERTIFICATE-----\n"
"INSERT YOUR THING CERTIFICATE HERE!\n"
"-----END CERTIFICATE-----\n";

const char* SSL_CLIENT_PRIVATE_KEY_PEM = "-----BEGIN RSA PRIVATE KEY-----\n"
"INSERT YOUR THING PRIVATE KEY HERE!\n"
"-----END RSA PRIVATE KEY-----\n";
```

Once configured, the application can be compiled using the Mbed Online Compiler or the Mbed CLI. The resulting binary provides debug information via the serial console, allowing developers to monitor the connection process and troubleshoot any issues with WiFi association or AWS authentication. This makes it an excellent reference implementation for developers moving from simple sensor examples to production-ready cloud connectivity.
