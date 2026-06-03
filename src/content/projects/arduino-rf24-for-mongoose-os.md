---
title: Arduino RF24 for Mongoose OS
summary: A port of the popular nRF24/RF24 Arduino library for Mongoose OS, enabling
  low-power 2.4GHz wireless communication via nRF24L01 transceivers. It provides a
  bridge for Mongoose OS developers to use familiar RF24 APIs in both C and JavaScript.
codeUrl: https://github.com/eduardb/arduino-rf24
isShow: false
rtos: mongoose-os
libraries: []
topics:
- rf24
- nrf24l01
- esp8266
- esp32
- mongoose-os
- arduino
- c-plus-plus
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- nrf24-driver-for-contiki-os
- arduino-ir-for-mongoose-os
- max17263-library-for-mongoose-os
- hx711-library-for-mongoose-os
- lis3dh-accelerometer-library-for-mongoose-os
- ant-arduino
---

The nRF24L01+ is one of the most popular low-cost 2.4GHz wireless transceivers in the maker community, largely due to the robust and feature-rich `RF24` library available for Arduino. For developers moving into the world of IoT with **Mongoose OS**, having access to these same reliable communication primitives is essential. The `arduino-rf24` repository provides exactly that: a dedicated port of the nRF24/RF24 library specifically tailored for the Mongoose OS ecosystem.

## Bringing Familiar Wireless to Mongoose OS

Mongoose OS is known for its ability to simplify IoT development on microcontrollers like the ESP32 and ESP8266, offering features like OTA updates, remote management, and a choice between C and JavaScript (mJS) development. By porting the RF24 library, this project allows developers to integrate nRF24L01 radios into their Mongoose OS projects without having to rewrite low-level SPI drivers or logic for packet handling, retries, and acknowledgments.

## Key Features and Capabilities

This port maintains the core functionality of the original RF24 library while integrating seamlessly with the Mongoose OS build system and runtime:

- **Full RF24 Logic**: Includes the standard logic for managing radio pipes, power levels, data rates, and payload sizes.
- **C and JavaScript Support**: One of the standout features of this port is the inclusion of mJS bindings. This allows developers to control the radio hardware directly from JavaScript code, making it accessible for rapid prototyping.
- **Mongoose OS Integration**: The project includes a `mos.yml` configuration file, making it easy to add as a dependency to any Mongoose OS project.
- **Hardware Abstraction**: It leverages the Mongoose OS SPI and GPIO abstractions to ensure compatibility across different hardware platforms supported by the OS.

## Technical Architecture

The repository is structured to serve both as a library and a Mongoose OS module. The `include/` and `src/` directories contain the core C++ logic of the RF24 library, while `mgos_arduino_rf24.cpp` and `mgos_arduino_rf24_c.c` act as the glue code between the original library and the Mongoose OS environment.

For those working in JavaScript, the `mjs_fs/api_arduino_rf24.js` file provides the necessary API definitions to call into the underlying C functions. This dual-language support ensures that whether you are writing high-performance firmware or high-level application logic, the radio remains easily accessible.

## Getting Started

To use this library in a Mongoose OS project, you typically add it to your `mos.yml` file under the `libs` section. Once included, you can initialize the radio using the standard RF24 constructor patterns. 

In a C++ environment, the usage mirrors the original Arduino library closely:

```cpp
#include "RF24.h"

// CE, CSN pins
RF24 radio(D4, D5);

void setup() {
  radio.begin();
  radio.setPALevel(RF24_PA_LOW);
  radio.openWritingPipe(0xF0F0F0F0E1LL);
}
```

For JavaScript users, the API is exposed through the `RF24` object, allowing for simple scripts to send or receive data over the air. This makes it an excellent choice for building sensor nodes or gateways that need to bridge 2.4GHz proprietary protocols with Wi-Fi or MQTT.

## Conclusion

The `arduino-rf24` port is a vital bridge for developers who want the reliability of the nRF24L01 hardware combined with the modern management features of Mongoose OS. By maintaining the familiar API of the original Arduino library, it significantly lowers the barrier to entry for building complex, multi-protocol IoT devices.
