---
title: 6LoWPAN BLE Bridge
summary: A project based on the Contiki Operating System designed to bridge 6LoWPAN
  and Bluetooth Low Energy (BLE) networks. It targets low-power TI microcontrollers
  like the CC2538 and CC26xx, providing a standardized stack for IoT communication.
codeUrl: https://github.com/SAMUD/6LoWPAN_BLE_Bridge
siteUrl: http://contiki-os.org
isShow: false
rtos: contiki-os
libraries: []
topics:
- contiki-os
- ti-launchpad
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- low-power-wireless-networking-for-iot-lpiot
- 6lbr-on-telecontrolli-devices-x-ip4t-x-ip5
- nrf24-driver-for-contiki-os
- loadng-implementation-on-contiki-os
- thingbot-subghz
- apache-mynewt-sensor-network-for-stm32-blue-pill
---

The 6LoWPAN BLE Bridge project is a specialized implementation of the Contiki Operating System, designed to connect low-power wireless sensor networks with the broader Internet and Bluetooth-enabled devices. Contiki is a premier open-source OS for the Internet of Things, providing a robust environment for microcontrollers with limited memory and power resources.

### Bridging 6LoWPAN and BLE
The primary objective of this project is to serve as a gateway or bridge between two critical IoT communication standards. 6LoWPAN allows for the transmission of IPv6 packets over low-power wireless networks (typically IEEE 802.15.4), enabling every sensor node to have its own IP address. By bridging this with Bluetooth Low Energy (BLE), the project allows for seamless interaction between industrial sensor meshes and consumer-facing devices like smartphones and tablets.

### Supported Hardware
The repository is optimized for several high-performance, low-power wireless SoCs, primarily from Texas Instruments:

*   **TI CC26xx Series**: Including the CC2650 Launchpad, which features a multi-standard wireless MCU supporting both BLE and IEEE 802.15.4.
*   **TI CC2538**: A powerful SoC with an ARM Cortex-M3 core and integrated IEEE 802.15.4 radio, ideal for high-performance IoT nodes.
*   **TI CC2530**: A classic 8051-based SoC widely used for ZigBee and 802.15.4 applications.

The modular architecture of Contiki allows these platforms to share a common core while utilizing specific drivers for their respective radio and power management hardware.

### Key Features and Applications
This distribution includes a wide array of applications and services that extend the functionality of the base OS:

*   **Erbium CoAP Engine**: A powerful implementation of the Constrained Application Protocol, allowing for RESTful web services on tiny devices.
*   **Antelope Database**: A relational database system tailored for sensor nodes, supporting a subset of SQL (AQL) for efficient data management on-device.
*   **Network Stack**: Full support for IPv6, 6LoWPAN, RPL (IPv6 Routing Protocol for Low-Power and Lossy Networks), and the Rime stack for low-level radio communication.
*   **Management Tools**: Includes `collect-view` for network monitoring and `codeprop` for over-the-air code propagation and updates.

### Development and Build System
The project uses a standard Makefile-based build system, making it easy to integrate into existing toolchains. Developers can compile the project for different targets by specifying the `TARGET` and `BOARD` variables. For instance, building a demo for the CC2650 Launchpad is straightforward:

```bash
cd examples/cc26xx
make TARGET=srf06-cc26xx BOARD=launchpad/cc2650
```

This structure encourages rapid prototyping and deployment of complex wireless applications, providing all the necessary components from the physical radio layer up to the application-level web services. Whether you are building city sound monitoring systems, industrial sensors, or smart home bridges, this project provides a standardized foundation for low-power wireless communication.
