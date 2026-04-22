---
title: nRF54L15 Connect Kit
summary: The nRF54L15 Connect Kit is a rapid prototyping platform for next-generation
  IoT devices based on the Nordic nRF54L15 multiprotocol SoC. It utilizes the Zephyr
  RTOS and nRF Connect SDK to support Bluetooth Low Energy 6.0, Thread, Matter, and
  Zigbee. The hardware features an integrated nRF52820-based Interface MCU for onboard
  debugging and a high-efficiency TPS63901 buck-boost converter for flexible power
  management.
slug: nrf54l15-connect-kit
codeUrl: https://github.com/makerdiary/nrf54l15-connectkit
siteUrl: https://wiki.makerdiary.com/nrf54l15-connectkit
version: v3.1.0
lastUpdated: '2025-08-31'
licenses:
- Apache-2.0
image: /202604/nrf54l15-connectkit_0.avif
rtos: zephyr
libraries:
- mcuboot
- open-thread
topics:
- bluetooth
- bluetooth-le
- iot
- microcontrollers
- nfc
- nrf-connect-sdk
- nrf54l
- nrf54l15
- openthread
- zephyr-rtos
- zephyros
- zigbee
isShow: true
createdAt: '2026-04-22T00:26:48+00:00'
updatedAt: '2026-04-22T00:26:48+00:00'
---

The nRF54L15 Connect Kit is a versatile rapid prototyping solution designed for developers building next-generation IoT devices. At its core is the Nordic Semiconductor nRF54L15 SoC, a high-performance multiprotocol chip featuring a dual-processor architecture: a 128 MHz Arm Cortex-M33 and a 128 MHz RISC-V coprocessor. This combination, supported by 1.5 MB NVM and 256 KB RAM, provides the computational power and memory headroom required for advanced wireless stacks and secure edge processing.


## Advanced Hardware Integration
One of the standout features of the kit is the integrated Interface MCU. Built using the nRF52820 SoC, it provides out-of-the-box CMSIS-DAP support for debugging and programming, eliminating the need for external hardware tools. This Interface MCU also functions as a USB-UART bridge for logging and terminal emulation. It includes a specialized Interface Shell that provides helpful commands for accessing board-specific functionality and a self-upgradable UF2 bootloader for easy firmware maintenance.

Power efficiency is a central focus of the hardware design. The board incorporates a TPS63901 buck-boost converter with an ultra-low 75-nA quiescent current. This allows the unit to be powered effectively from USB-C, external supplies, or batteries. Furthermore, the VDD_GPIO rail is configurable to either 1.8V or 3.3V, ensuring compatibility with a wide range of external peripherals and sensors.

## Connectivity and Expansion
The nRF54L15 Connect Kit is a connectivity powerhouse, supporting Bluetooth Low Energy 6.0, Thread, Matter, Zigbee, and 4 Mbps proprietary 2.4 GHz modes. It also features an integrated NFC-A Tag for simplified commissioning and pairing. The physical layout provides up to 31 multi-function GPIOs (including 8 ADC inputs) through edge pins in a compact 2.2" x 0.8" DIP/SMT form factor.

![Hardware Diagram and Pinout Front](/202604/nrf54l15-connectkit_1.avif)
![Hardware Diagram and Pinout Back](/202604/nrf54l15-connectkit_2.avif)

The kit is shipped with U.FL cabled antennas for both the 2.4 GHz radio and 13.56 MHz NFC, allowing developers to begin wireless testing immediately. The dual-row 40-pin layout ensures the board can be easily integrated into breadboards or surface-mounted onto custom carrier boards.

## Mechanical Design
The board is constructed on a 4-layer PCB with a gold finish, ensuring high signal integrity and durability. Its dimensions and castellated pins make it suitable for both prototyping and small-scale production integration.

![Mechanical Dimensions](/202604/nrf54l15-connectkit_3.avif)

## Software Ecosystem
The project is fully integrated with the nRF Connect SDK (NCS) and the Zephyr RTOS. This ecosystem provides a robust foundation for development, offering a wide range of software samples, modules, and libraries. Key components like MCUboot for secure updates and OpenThread for mesh networking are natively supported. The repository includes several sample applications—such as ADC monitoring, BLE GATT services, and low-power system-off demos—to help developers transition quickly from initial hardware validation to custom application development.
