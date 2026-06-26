---
title: MeshTNC
summary: A multi-platform LoRa Terminal Node Controller (TNC) firmware supporting
  ESP32, nRF52, RP2040, and STM32. It provides a serial CLI for raw LoRa interaction,
  BLE packet sniffing, and a KISS-TNC mode for APRS, AX.25, and IP-over-LoRa networking.
slug: meshtnc
codeUrl: https://github.com/datapartyjs/MeshTNC
star: 89
version: v0.0.3
lastUpdated: '2025-11-15'
rtos: freertos
libraries:
- h2zero-esp-nimble-cpp
- littlefs
- nimble
topics:
- hamradio
- kiss-tnc
- lora
- mesh-networks
- packet-radio
- radio
- tnc
isShow: false
createdAt: '2026-01-21'
updatedAt: '2026-01-21'
relatedProjects:
- esp32-reticulum-network-stack-gateway-node
- zephyr-native-meshtastic-stack
- esp32-mesh-control
- meshcore-mqtt-gateway
- rnode-firmware-neopixel-edition
- x-cube-subg2-firmware-package
---

MeshTNC is a versatile firmware solution designed to turn common LoRa-enabled development boards into functional Terminal Node Controllers (TNC). By providing a bridge between LoRa radio hardware and standard computing interfaces, it allows users to pipe data across long distances using low-power radio technology. The project is built to be highly portable, supporting a wide array of hardware architectures including ESP32, nRF52, RP2040, and STM32.

At its core, MeshTNC offers a human-readable serial Command Line Interface (CLI) that allows for direct interaction with the radio hardware. Users can transmit raw hex packets, configure radio parameters like frequency and spreading factor, and monitor incoming LoRa or BLE traffic in real-time. This makes it an excellent tool for both developers debugging LoRa networks and radio enthusiasts building custom communication links.

## Key Features

- **Serial CLI**: A built-in interface for manual control and configuration.
- **KISS-TNC Mode**: Compatibility with standard radio software via the KISS protocol.
- **Packet Logging**: Real-time logging of LoRa and BLE packets in hex format.
- **Multi-Platform Support**: Optimized for ESP32, nRF52, RP2040, and STM32 microcontrollers.
- **Advanced Networking**: Support for APRS, AX.25, and Ethernet-over-LoRa.

## Technical Implementation

The project leverages several robust libraries to achieve its functionality. It uses **RadioLib** for flexible radio transceiver control, supporting a variety of LoRa chips like the SX1262 and SX1276. For Bluetooth capabilities on supported hardware like the ESP32, it utilizes the **NimBLE** stack to provide efficient BLE packet sniffing and connectivity. Data persistence and configuration management are handled via **LittleFS** on platforms like STM32.

One of the most powerful features of MeshTNC is its KISS (Keep It Simple, Stupid) mode. By implementing the KISS protocol, the firmware becomes compatible with a vast ecosystem of existing amateur radio software. This enables advanced use cases such as APRS (Automatic Packet Reporting System) over LoRa, allowing users to track positions and send messages using tools like Xastir or APRSisce32.

## Networking Capabilities

Beyond simple messaging, MeshTNC supports more complex networking stacks. It can be used to establish AX.25 links, a data link layer protocol widely used in amateur radio. On Linux systems, this allows the creation of network interfaces (like `ax0`) that can carry standard IPv4 traffic. 

For users looking for even simpler setups, the project facilitates Ethernet-over-LoRa, effectively creating a wireless bridge for IP networking over long-range, low-bandwidth radio. This is achieved by using tools like `tncattach` to map the serial KISS interface to a virtual network device.

```bash
# Example: Setting up a LoRa radio and entering KISS mode via CLI
minicom -D /dev/ttyACM0
set radio 918.25,500.0,7,5,0x16
serial mode kiss
```

## Getting Started

MeshTNC is designed for easy deployment using PlatformIO. It includes predefined configurations for numerous popular boards, such as the Heltec WiFi LoRa series, LilyGo T3S3, and RAK4631. Users can compile the firmware using VS Code and flash it using standard OEM tools or the dedicated MeshCore flasher. Whether you are building a simple LoRa repeater, a companion radio for a mobile device, or a complex room server, MeshTNC provides a robust foundation for LoRa-based data communication.
