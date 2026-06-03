---
title: Flipper RS485 Modbus Plugin
summary: A specialized Flipper Zero application for interacting with Modbus RTU networks.
  It enables users to sniff bus traffic, inject packets as a Master, and log data
  to an SD card, requiring the Electronic Cats Modbus hardware expansion.
slug: flipper-rs485-modbus-plugin
codeUrl: https://github.com/ElectronicCats/flipper-rs485modbus
siteUrl: https://electroniccats.com/?s=Flipper+Add-On&post_type=product&product_cat=
star: 26
version: v1.1.3.4
lastUpdated: '2026-01-02'
rtos: freertos
topics:
- flipper-app
- flipper-plugin
- flipper-zero
- flipper-zero-firmware
- flipperzero
- modbus
- rtu
isShow: true
image: /202602/flipper-rs485modbus.webp
createdAt: '2026-02-18'
updatedAt: '2026-02-18'
relatedProjects:
- flipper-lora-relay-app
- esp32-bus-expander
- esp32-bus-pirate
- matter-esp32-modbus-adapter
- esphome-flexit-modbus-server
- riden-dongle
---

The Flipper RS485 Modbus plugin is a powerful extension for the Flipper Zero, transforming the handheld multi-tool into a diagnostic and interaction device for industrial Modbus RTU networks. Developed by Electronic Cats, this plugin bridges the gap between portable security tools and industrial automation systems.

To utilize this software, users require the Electronic Cats Flipper Modbus Add-on, which provides the necessary RS485 transceiver hardware to interface with the physical bus. Once equipped, the Flipper Zero can perform a variety of tasks ranging from passive monitoring to active control.

### Sniffing and Analysis

One of the core features of the plugin is its ability to sniff data directly from the RS485 bus. It displays captured packets in real-time, allowing users to observe the communication between existing Masters and Slaves on the network. For better readability, the app includes a data output format selector, enabling users to switch between standard text and hexadecimal views depending on the nature of the data being analyzed.

To facilitate long-term analysis or troubleshooting, the plugin supports exporting sniffing sessions. These are saved as log files directly to the Flipper Zero's SD card, making it easy to transfer the data to a PC for further inspection or documentation.

### Packet Injection and Master Functionality

Beyond passive observation, the plugin allows the Flipper Zero to act as a Modbus Master. Users can inject custom packets into the network to query Slaves or trigger specific actions. A particularly useful feature is the ability to save recent packet structures. This allows a user to capture a command, modify its parameters (such as changing a register value or a slave ID), and re-inject it into the bus without having to manually reconstruct the entire frame.

### Customization and Connectivity

Industrial environments often use varying communication parameters. The Flipper RS485 Modbus plugin addresses this by offering customizable UART parameters. Users can adjust baud rates and other serial settings to match the specific requirements of the target Modbus network, ensuring compatibility across different systems.

### Hardware Integration

The project is designed specifically for the Electronic Cats Modbus Shield, which handles the voltage level shifting and differential signaling required for RS485. This integration allows the Flipper Zero to safely interact with industrial equipment that typically operates at different logic levels than the Flipper's native GPIO. The plugin is maintained by Electronic Cats and is part of their broader ecosystem of Flipper Zero shields and tools designed for hardware exploration and security auditing.
