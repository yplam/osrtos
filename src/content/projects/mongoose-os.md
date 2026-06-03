---
title: Mongoose OS
summary: Mongoose OS is a comprehensive IoT firmware development framework designed
  for microcontrollers like ESP32, ESP8266, and STM32. It provides built-in support
  for over-the-air (OTA) updates, security via flash encryption and mbedTLS, and seamless
  integration with major cloud providers like AWS IoT and Google Cloud IoT Core.
slug: mongoose-os
codeUrl: https://github.com/meticulousCraftman/mongoose-os-x
siteUrl: https://mongoose-os.com
star: 2
lastUpdated: '2020-07-23'
rtos: mongoose-os
libraries:
- lwip
- spiffs
topics:
- mongoose-os
- stm32f4
isShow: false
createdAt: '2025-12-31'
updatedAt: '2025-12-31'
relatedProjects:
- iot-framework-for-nodemcu
- losant-mqtt-example-for-mongoose-os
- mongoose-os-configurable-sensor-node
- mongoose-os-programs-and-examples
- golioth-firmware-sdk
- ft900-iot-and-smart-home-framework
---

## Introduction to Mongoose OS

Mongoose OS is a professional-grade development framework specifically engineered for the Internet of Things (IoT). It aims to provide a complete environment for building firmware for microcontrollers, addressing the most common and difficult challenges in IoT development: connectivity, security, and remote management. By offering a high-level abstraction over hardware, it allows developers to focus on application logic rather than low-level driver implementation.

## Key Features and Capabilities

One of the standout features of Mongoose OS is its robust Over-The-Air (OTA) firmware update system. In the IoT world, the ability to update devices remotely is critical for maintenance and security. Mongoose OS provides a reliable update mechanism that includes automatic rollback on failure, ensuring that devices remain functional even if an update process is interrupted or contains bugs.

Security is another pillar of the framework. It includes built-in support for flash encryption and integrates with hardware crypto chips. For secure communication, it utilizes mbedTLS, which has been optimized for the small memory footprints typical of microcontrollers. This ensures that even resource-constrained devices can maintain secure, encrypted connections to cloud services.

## Multi-Language Development

Mongoose OS is unique in its support for both C and JavaScript. For performance-critical tasks or low-level hardware interaction, developers can use C. For rapid prototyping or high-level logic, the framework includes mJS, a restricted JavaScript engine designed specifically for microcontrollers. This dual-language approach makes the platform accessible to a wider range of developers, including those coming from a web development background who may not be familiar with embedded C.

## Cloud Integration and Hardware Support

The framework is designed to be "cloud-native," with built-in integrations for major IoT platforms. This includes native support for:
- **AWS IoT**
- **Google Cloud IoT Core**
- **Microsoft Azure IoT**
- **IBM Watson IoT**
- **Adafruit IO**

It also supports generic MQTT and HTTP protocols, providing flexibility for custom backend solutions. In terms of hardware, Mongoose OS supports a variety of popular microcontrollers, including the Espressif ESP32 and ESP8266, Texas Instruments CC3220 and CC3200, and various STMicroelectronics STM32 series (F4, L4, F7).

## Ecosystem and Community

Mongoose OS follows a dual-licensing model, offering a Community Edition under the Apache 2.0 license and an Enterprise Edition for commercial users. The ecosystem is supported by a wide range of ready-to-use applications and libraries, which can be easily integrated into projects to add functionality like sensor interfacing, display support, or advanced networking protocols. 

The project is trusted by industry leaders and is an official partner of major semiconductor manufacturers like STMicroelectronics, Espressif, and Texas Instruments, ensuring that the framework remains compatible with the latest hardware and cloud features.
