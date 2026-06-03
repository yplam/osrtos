---
title: Develop your own Bluetooth Low Energy Applications
summary: A comprehensive collection of Bluetooth Low Energy (BLE) application examples
  for Raspberry Pi, ESP32, and nRF52. It demonstrates BLE functionality including
  advertisements, connections, security, and power optimization using Python (Bleak),
  Arduino (NimBLE), and the Zephyr RTOS.
codeUrl: https://github.com/koenvervloesem/bluetooth-low-energy-applications
siteUrl: https://koen.vervloesem.eu/books/develop-your-own-bluetooth-low-energy-applications/
isShow: false
rtos: zephyr
libraries:
- nimble
topics:
- arduino
- ble
- bleak
- bluetooth
- bluetooth-low-energy
- esp32
- esp32-arduino
- nimble-arduino-library
- nordic-semiconductor
- nordicsemi
- nrf52
- nrf52840
- nrf52840-dk
- nrf52840-dongle
- nrf5x
- python
- raspberry-pi
- zephyr
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- building-wireless-sensor-networks-with-openthread
- seeed-studio-xiao-esp32-project-collection
- micropython-examples-for-01studio-development-boards
- xiao-esp32c6-sketches
- esp32-ble-ota-arduino
- zephyr-lorawan-lora-examples
---

## Mastering Bluetooth Low Energy Across Platforms

Bluetooth Low Energy (BLE) has become the standard for low-power wireless communication, found in everything from fitness trackers to smart home sensors. However, the specification is vast and can be intimidating for beginners. The repository `bluetooth-low-energy-applications` by Koen Vervloesem serves as a practical companion to his book, offering a hands-on approach to mastering BLE using three distinct ecosystems: Python, Arduino, and Zephyr RTOS.

## A Multi-Platform Approach

One of the most valuable aspects of this project is its cross-platform nature. It doesn't just stick to one language or hardware platform. Instead, it demonstrates how to achieve the same BLE goals using different tools:

*   **Python with Bleak**: Ideal for Raspberry Pi or PC-based applications where rapid development and high-level logic are required.
*   **Arduino with NimBLE**: Targets the popular ESP32, leveraging the NimBLE-Arduino library for a balance between ease of use and performance.
*   **Zephyr RTOS**: Aimed at professional-grade development on boards like the Nordic nRF52, providing deep control over the BLE stack and power management.

## From Advertisements to Secure Connections

The code is organized by chapter, following a progressive learning path. You start with the basics of BLE advertisements—learning how to scan for iBeacons or create your own Microsoft Beacon scanner. 

As you progress, the project dives into active connections. You'll find examples of heart rate monitors and environmental sensors (like the BME280) that use GATT services to transmit data. The repository also covers more advanced topics like:

*   **Security**: Implementing encrypted and authenticated connections to protect data.
*   **Standard Profiles**: Working with established BLE profiles like the Proximity Reporter.
*   **Reverse Engineering**: A particularly interesting section focuses on reverse-engineering proprietary BLE devices, such as LED badges, to control them with custom software.

## Low Power Optimization

Since BLE is often used in battery-powered devices, the repository includes a dedicated section on low-power techniques. Using the Zephyr RTOS, developers can learn how to minimize energy consumption, ensuring that their BLE applications can run for months or even years on a single coin cell.

## Getting Started

The repository is structured to make it easy to find the specific code you need. For instance, if you are looking for a Zephyr-based iBeacon implementation, you can find it under `3-advertisements/zephyr/ibeacon`. 

To clone the entire repository and start experimenting:

```shell
git clone https://github.com/koenvervloesem/bluetooth-low-energy-applications.git
```

Whether you are a hobbyist looking to connect an ESP32 to your phone or a professional developer building a sensor network on nRF52, this repository provides a wealth of tested, documented examples to kickstart your BLE journey.
