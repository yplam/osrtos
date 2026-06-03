---
title: Mbed OS LoRaWAN TinyShell Application
summary: A LoRaWAN example application for Mbed OS that integrates a command-line
  interface for real-time configuration. It supports both OTAA and ABP activation,
  provides NVM storage for provisioning data on MultiTech modules, and is compliant
  with the LoRaWAN v1.0.2 specification.
slug: mbed-os-lorawan-tinyshell-application
codeUrl: https://github.com/MultiTechSystems/mbed-os-lorawan-tinyshell
star: 3
lastUpdated: '2019-04-04'
rtos: mbed-os
topics:
- lorawan
- mbed-os
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- lorawan-test-app-for-apache-nuttx
- mbed-os-client-example
- pelion-device-management-client-example-for-mbed-os
- zephyr-wi-fi-and-tcp-udp-connection-demo
- zephyr-lorawan-lora-examples
- mongoose-os-aws-iot-uart-and-thing-shadow-example
---

The Mbed OS LoRaWAN TinyShell project is a comprehensive example application designed to demonstrate the LoRaWAN protocol stack within the Mbed OS ecosystem. Compliant with the LoRaWAN v1.0.2 specification, this project provides a robust starting point for developers building long-range, low-power IoT applications using ARM-based microcontrollers.

### Integrated Command-Line Interface
One of the standout features of this repository is the inclusion of "TinyShell," a command-line utility that allows users to configure the device at runtime without re-flashing the firmware. Upon booting, the application provides a one-second window for users to enter command mode by pressing any key. This shell enables the configuration of:

- **Network Credentials**: Set Device EUI, Application EUI, and Application Key.
- **Operational Parameters**: Configure device class (Class A or C), data rates, and Adaptive Data Rate (ADR) settings.
- **Transmission Settings**: Adjust transmission intervals, port numbers, and retry counts for confirmed messages.
- **Persistence**: Save provisioning and application settings to non-volatile memory (NVM).

### Hardware and Radio Support
The application is designed to be portable across various Mbed-enabled hardware platforms. It includes specific support and target overrides in `mbed_app.json` for:

- **MultiTech mDot and xDot**: Includes support for filesystem-based NVM to read factory-provisioned EUIs and store user settings.
- **ST B-L072Z-LRWAN1**: Discovery kit featuring the muRata radio chip.
- **Mbed Enabled Radio Shields**: Compatible with SX1272 and SX1276 shields using the Arduino form factor on boards like the NXP K64F.
- **Advantech and RAK Modules**: Support for WISE-1510 and RAK811 modules.

### Configuration and Provisioning
Configuration is primarily managed through the `mbed_app.json` file, which defines the radio type, pin mappings, and default network settings. The project supports both Over-the-Air Activation (OTAA) and Activation-By-Personalization (ABP). For regional compliance, the Mbed OS LoRaWAN stack allows for compile-time selection of various PHY layers, including EU868, US915, AU915, and AS923.

### Technical Architecture
The application utilizes the Mbed OS `EventQueue` to manage task execution and ISR deferment. This ensures that the LoRaWAN stack and application logic run efficiently within the same thread, which is particularly beneficial for memory-constrained devices as it minimizes stack usage and simplifies synchronization. The project also includes a `DummySensor` class to simulate data transmission, making it easy to test network connectivity immediately after setup.

### Getting Started
To deploy the application, users can import the project using the Mbed CLI. After configuring the `mbed_app.json` with the appropriate radio pins and network credentials, the project can be compiled for a specific target:

```sh
$ mbed import mbed-os-example-lorawan
$ cd mbed-os-example-lorawan
$ mbed compile -m YOUR_TARGET -t ARM
```

Once flashed, the device provides status updates via a serial console at 115200 baud, detailing the connection progress, ADR status, and the transmission of sensor data to the network server.
