---
title: ant-arduino
summary: A comprehensive Arduino and Mbed-compatible library for interfacing with
  ANT radios, specifically targeting nRF51 and nRF52 hardware. It provides a structured
  API for managing ANT channels, network keys, and data transmission/reception using
  both hardware and software serial interfaces.
codeUrl: https://github.com/cujomalainey/ant-arduino
siteUrl: https://github.com/cujomalainey/ant-arduino/wiki/Developer's-Guide
isShow: false
rtos: mbed-os
libraries: []
topics:
- arduino
- ant
- ant-arduino
- ant-radios
- rf
- nrf52832
- nrf51822
- antplus
- driver
- callback
- mbed
- mbed-os
- nrf52840
- esp-idf
- ant-softdevice
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- qn8066-fm-dsp-rx-tx-arduino-library
- arduino-serial-ble
- silicon-labs-arduino-core
- arduino-rf24-for-mongoose-os
- esp32-ble-uart-mx
- spektrum-receiver-library-for-mbed
---

The **ant-arduino** library is a robust solution for developers looking to integrate ANT wireless protocol capabilities into their embedded projects. Originally forked from the xbee-arduino project, it has evolved into a specialized driver for ANT radios, supporting a wide array of packet types and providing a clean, object-oriented interface for both Arduino and Mbed OS environments.

### Bridging the Gap to ANT Wireless
ANT is a proven ultra-low-power (ULP) wireless protocol, widely used in sports, fitness, and health monitoring. While many modern microcontrollers focus on Bluetooth Low Energy (BLE), ANT remains a staple for many legacy and specialized sensors. This library simplifies the complexity of the ANT protocol by providing high-level abstractions for channel management, network configuration, and data handling. 

One of the standout features of the library is its flexibility regarding hardware. It is designed to work with external ANT radios (like the nRF51 or nRF52 series) connected via serial, or even internal radios on chips like the Adafruit nRF52840 Express when loaded with the appropriate ANT softdevice.

### Key Features and Architecture
The library is organized into several functional modules that mirror the ANT protocol's structure:
- **Base Classes**: Provides the foundation for Serial, SPI, and Native ANT implementations.
- **TX/RX Modules**: Handles the construction of requests (TX) and the parsing of responses (RX), including broadcast data and channel events.
- **Callback System**: A sophisticated callback mechanism allows developers to react to specific ANT events without polling, making the code more efficient and readable.
- **Multi-Platform Support**: With the release of version 2.0.0, the library officially supports Mbed OS alongside the traditional Arduino framework.

### Getting Started with Channel Configuration
Setting up an ANT channel involves several steps: resetting the system, setting the network key, assigning the channel type, and defining the channel ID and frequency. The library uses a declarative approach where you create request objects and send them via the ANT instance.

```cpp
// Create an ANT object
ANT ant = ANT();

// Initialize Serial for the radio
Serial.begin(9600);
ant.setSerial(Serial);

// Configure a Network Key
SetNetworkKey snk = SetNetworkKey();
snk.setNetwork(0);
snk.setKey((uint8_t*)NETWORK_KEY);
ant.send(snk);

// Assign a Bidirectional Receive Channel
AssignChannel ac = AssignChannel();
ac.setChannel(0);
ac.setChannelType(0);
ac.setChannelNetwork(0);
ant.send(ac);

// Open the channel to start receiving data
OpenChannel oc = OpenChannel();
oc.setChannel(0);
ant.send(oc);
```

### Hardware Considerations
For those just starting out, the developer recommends using an Arduino with multiple hardware serial ports, such as the **Teensy 3.2** or **Arduino Leonardo**. This allows you to use one port for the ANT radio and another for debugging via the Serial Monitor. 

If you are using 5V microcontrollers, remember that ANT radios typically operate at 3.3V, requiring logic level shifters to prevent damage. For advanced users, the library supports "Native ANT" on nRF52 devices, though this requires specific bootloaders and the ANT softdevice, which must be obtained directly from Dynastream/ThisIsAnt due to licensing restrictions.

### Current Status and Future
While the repository is currently in maintenance mode—reflecting Garmin's shift in the ANT/ANT+ ecosystem—it remains a stable and feature-complete choice for existing ANT projects. The project maintainer continues to review pull requests, and the roadmap includes potential future support for Zephyr and ESP-IDF, ensuring that legacy ANT hardware can still find a home in modern IoT stacks.
