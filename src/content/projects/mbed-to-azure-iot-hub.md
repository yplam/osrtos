---
title: Mbed to Azure IoT Hub
summary: An Mbed OS example application demonstrating secure connectivity to Azure
  IoT Hub using MQTT over TLS. It supports both X.509 certificate and symmetric key
  authentication, targeting various hardware platforms like STM32 Discovery and Renesas
  RZ/A1H boards.
slug: mbed-to-azure-iot-hub
codeUrl: https://github.com/coisme/Mbed-to-Azure-IoT-Hub
siteUrl: https://os.mbed.com/users/coisme/notebook/azure-iot-hub-from-mbed-os-device/
star: 7
lastUpdated: '2020-04-22'
rtos: mbed-os
topics:
- azure-iothub
- mbed-os
- mqtt
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- mbed-to-ibm-watson-iot-platform
- mbed-to-aws-iot-example
- mbed-to-google-cloud-iot
- losant-mqtt-example-for-mongoose-os
- aws-iot-with-the-l475vg-iot01a-on-mbed-os
- losant-mqtt-mongoose-os-example
---

## Connecting Mbed OS Devices to Azure IoT Hub

The Mbed-to-Azure-IoT-Hub project provides a robust template for developers looking to integrate ARM Mbed OS devices with Microsoft's Azure IoT ecosystem. By leveraging MQTT over Transport Layer Security (TLS), the project ensures that telemetry data sent from the edge to the cloud remains encrypted and secure. This example is particularly useful for developers working with resource-constrained microcontrollers that need to navigate the complexities of modern cloud authentication.

## Authentication Methods

One of the project's strengths is its flexibility in device identity management. It supports two primary authentication schemes:

*   **X.509 Certificates**: This is the more secure, enterprise-grade method. It uses public-key infrastructure to authenticate the device. The project provides specific configuration headers to handle the RSA-based certificate verification required by Azure.
*   **Symmetric Keys (SAS Tokens)**: For simpler deployments or development phases, the project allows for symmetric key authentication. Users can generate Shared Access Signature (SAS) tokens via tools like the Azure IoT Hub Toolkit and configure them directly within the application code.

## Technical Configuration and Memory Management

Connecting to Azure IoT Hub is computationally expensive for small devices, primarily due to the memory requirements of RSA encryption. The project documentation provides transparent heap requirements to help developers select appropriate hardware:

*   **Symmetric Key Connection**: Requires approximately 36 KB of heap during the connection phase and 30 KB once established.
*   **X.509 Certificate Connection**: Requires significantly more memory, peaking at roughly 54 KB during the handshake and settling at 42 KB post-connection.

The project includes a specialized `mbedtls_azure_config.h` file. This header is a tailored configuration for the mbedTLS library, optimized to reduce the binary footprint and RAM usage by disabling unnecessary features and tuning buffer sizes (such as `MBEDTLS_SSL_MAX_CONTENT_LEN`).

## Hardware Support and Build System

The repository is structured for the Mbed build system, utilizing `mbed_app.json` for target-specific overrides. It includes pre-configured settings for several popular development boards:

*   **STMicroelectronics DISCO_L475VG_IOT01A**: Configured to use the ISM43362 Wi-Fi component.
*   **Renesas RZ_A1H**: Configured for Ethernet connectivity with specific entropy source overrides for mbedTLS.
*   **STMicroelectronics DISCO_F413ZH**: Another Wi-Fi enabled target with optimized stack sizes for the Wi-Fi driver thread.

## Getting Started

To use this project, developers need to configure their IoT Hub credentials in `MQTT_server_setting.h`. This includes setting the `DEVICE_ID`, `MQTT_SERVER_HOST_NAME`, and the appropriate authentication method. For those using certificates, the file provides placeholders for the Root CA, Client Certificate, and Private Key in PEM format. The project also includes an NTP client to ensure the device clock is synchronized, which is a prerequisite for valid TLS handshake and certificate expiration checks.
