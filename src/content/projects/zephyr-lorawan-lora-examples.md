---
title: Zephyr LoRaWAN & LoRa Examples
summary: A collection of example applications for the Zephyr RTOS demonstrating LoRaWAN
  network connectivity and LoRa point-to-point communication. It targets various hardware
  platforms including STM32WL and nRF52/nRF91 series microcontrollers paired with
  Semtech SX1276 radios.
slug: zephyr-lorawan-lora-examples
codeUrl: https://github.com/craigpeacock/Zephyr_LoRaWAN
star: 25
lastUpdated: '2025-10-09'
rtos: zephyr
topics:
- lemon-iot
- lora
- loramac-node
- lorawan
- nrf52832
- nrf52840
- nrf9160
- rak3172
- rfm95w
- rfm96w
- stm32wl
- sx1276
- sx1278
- zephyr
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- zephyr-rtos-lorawan-node
- zephyr-rtos-for-dwm1001
- lorawan-test-app-for-apache-nuttx
- anjay-zephyr-client
- zephyr-wifi-example
- building-wireless-sensor-networks-with-openthread
---

## Overview

The Zephyr LoRaWAN & LoRa Examples project provides a practical starting point for developers looking to implement Long Range (LoRa) wireless communication using the Zephyr RTOS. The repository contains two primary application examples: a full LoRaWAN network node and a simpler LoRa point-to-point communication tool. These examples are particularly valuable for developers working with the STM32WL series or Nordic nRF devices interfaced with external LoRa transceivers like the RFM95W (SX1276).

## LoRaWAN Integration

The LoRaWAN example is designed to connect to The Things Network (TTN). It demonstrates a complete sensor-to-cloud workflow by reading temperature and humidity data from a Sensirion SHTC3 sensor via I2C and transmitting it over the LoRaWAN network. 

A key technical feature of this implementation is its adherence to the LoRaWAN 1.0.4 specification regarding security and connectivity. Specifically, the application utilizes Zephyr's Non-Volatile Storage (NVS) subsystem to store the DevNonce. This ensures that the device can successfully rejoin the network after power cycles without reusing nonces, a common pitfall in LoRaWAN development.

### Configuration and Setup

To get started with the LoRaWAN application, developers need to configure their device credentials in `lorawan.h`, including the Device EUI, Join EUI, and Application Key. Regional frequency settings are managed through the Zephyr configuration system (`prj.conf`), with support for various global regions such as AU915, EU868, and US915.

```c
// Example output of the LoRaWAN join process
*** Booting Zephyr OS build zephyr-v3.2.0 ***
Zephyr LoRaWAN Node Example
Board: lemon_iot_lora_rak3172
NVS: ID 1, DevNonce: 8
Starting LoRaWAN stack.
Joining network using OTAA, dev nonce 8, attempt 1: Timed-out waiting for response.
Joining network using OTAA, dev nonce 9, attempt 2: Join successful.
Sending Temp 27.77 RH 50.1
```

## LoRa Point-to-Point Communication

Before deploying a full LoRaWAN stack, it is often useful to validate the hardware and radio environment. The project includes a LoRa point-to-point example that allows two devices to communicate directly. This application listens for incoming packets on a configured frequency and transmits a 'Hello' packet whenever a user button (SW1) is pressed. This is an essential tool for range testing and hardware debugging, providing immediate feedback on RSSI (Received Signal Strength Indicator) and SNR (Signal-to-Noise Ratio).

## Supported Hardware

The project has been tested on several popular embedded platforms, showcasing Zephyr's hardware abstraction capabilities:

- **Lemon IoT LoRa RAK3172**: Based on the STM32WL5ECC, featuring an integrated LoRa radio.
- **Lemon IoT BLE nRF52832 / LTE nRF9160**: Paired with an external RFM95W (SX1276) transceiver.
- **Nordic nRF52840 Dongle**: Also paired with an RFM95W transceiver.

For the STM32WL5E, the project notes ongoing work to utilize the hardware's unique IEEE 64-bit EUI as the Device EUI, which would simplify mass deployment by removing the need to hard-code unique identifiers for every device.
