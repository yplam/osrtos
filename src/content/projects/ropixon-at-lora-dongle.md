---
title: Ropixon AT LoRa Dongle
summary: A firmware project for an STM32L071-based USB dongle that enables LoRa communication
  via AT commands. It utilizes the Semtech SX1262 transceiver and FreeRTOS to provide
  a plug-and-play wireless link for testing, range measurement, and sensor networks.
slug: ropixon-at-lora-dongle
codeUrl: https://github.com/Ropixon/AT-LoRa-USB-Dongle
siteUrl: https://www.tindie.com/products/nn_6394/at-lora-usb-dongle/
star: 0
lastUpdated: '2026-01-25'
rtos: freertos
isShow: true
image: /202601/HW_image.webp
createdAt: '2026-01-27'
updatedAt: '2026-01-27'
relatedProjects:
- lora-test-app-for-semtech-sx1262-and-apache-nuttx
- rnode-firmware-neopixel-edition
- zephyr-rtos-lorawan-node
- x-cube-subg2-firmware-package
- pax-baseboard-stm32l051k8t
- ip-over-usb
---

## Overview

The Ropixon AT LoRa Dongle is a versatile hardware and firmware solution designed to simplify LoRa wireless communication. By providing a high-level AT command interface over a USB-to-Serial bridge, it allows developers to send and receive RAW LoRa packets without writing complex low-level driver code for the radio transceiver. It is an ideal tool for rapid development, testing, and creating wireless links over long distances where standard protocols like Wi-Fi or Bluetooth are insufficient.

## Hardware and Architecture

At its core, the dongle features the **STM32L071** microcontroller (ARM Cortex-M0+) and the **Semtech SX1262** LoRa transceiver. This combination offers a wide frequency range from 150 MHz to 960 MHz, making it suitable for global ISM bands including 868 MHz (EU) and 915 MHz (USA). The firmware is built on **FreeRTOS**, ensuring reliable task management between the serial interface and the RF operations.

The device includes a CP2102 USB-to-UART bridge, allowing it to appear as a standard Virtual COM port on most operating systems. It also features three status LEDs (Red for AT commands, Green for system status, and Blue for RF activity) and eight auxiliary GPIO pins that can be controlled via AT commands, including support for PWM modulation up to 1 kHz.

## Key Features

- **Plug-and-Play LoRa**: No specialized programming tools or IDEs are required for basic operation; configuration is handled entirely through serial commands.
- **High Performance**: Supports transmission power up to +22 dBm and high sensitivity down to -149.1 dBm, enabling link budgets up to 155.1 dB.
- **Flexible Modulation**: Full control over Spreading Factor (SF5-SF12), Bandwidth (7.81 kHz to 500 kHz), and Coding Rate (4/5 to 4/8).
- **Advanced RF Testing**: Includes built-in commands for Continuous Wave (CW) transmission, Time on Air (ToA) calculation, and symbol time measurement.
- **Non-Volatile Memory**: Ability to save packet data and configuration to NVM for periodic transmission or automatic startup.

## AT Command Interface

The dongle uses a standard AT command set for both system management and RF configuration. For example, setting up a transmitter is as simple as sending a few text strings over a serial terminal:

```c
// Configure RF parameters
AT+LR_TX_SET=SF:7,BW:7,CR:45,Freq:869525000,IQInv:0,HeaderMode:0,CRC:1,Preamble:8,LDRO:2,Power:22

// Transmit data
AT+RF_TX_TXT=Hello LoRa!
```

Reception is equally straightforward, with incoming data automatically formatted and sent to the UART in real-time:

```text
+RX:11,48656C6C6F204C6F526121,RSSI:-45
```

## Use Cases

The Ropixon AT LoRa Dongle is particularly effective for rapid prototyping and field testing. It is commonly used for:

- **Range Testing**: Measuring the effective distance of LoRa links in different environments (urban vs. open space).
- **Sensor Networks**: Acting as a gateway or a node to collect data from remote sensors via simple serial integration.
- **RF Scanning**: Capturing and analyzing packets transmitted over the air for debugging or security audits.
- **Point-to-Point Links**: Creating long-distance wireless bridges for low-bandwidth data between two PCs or embedded systems.

For developers looking to automate their workflows, the project includes Python examples using `pyserial`, enabling scripted testing and integration into larger software ecosystems.
