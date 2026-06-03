---
title: ESP32 Bluetooth Signal Jammer
summary: An experimental signal jamming device built with an ESP32 microcontroller
  and dual NRF24L01 radio transmitters. It targets the 2.4GHz ISM band to interfere
  with Bluetooth and WiFi signals for educational research. The project is implemented
  using the Arduino framework and the RF24 library.
slug: esp32-bluetooth-signal-jammer
codeUrl: https://github.com/stuartbnz/ESP32BluetoothJammer
star: 79
version: Prod
lastUpdated: '2025-05-28'
rtos: freertos
topics:
- arduino
- bluetooth
- bluetooth-low-energy
- esp32
- nrf24l01
isShow: false
createdAt: '2026-01-12'
updatedAt: '2026-01-12'
relatedProjects:
- esp32-2-4ghz-jammer
- esp32-bluejammer
- nrf24-bluejammer
- c3mini-bluejammer
- nrf24-jammer
- espnrf24-jammer
---

The ESP32 Bluetooth Jammer is a hardware-focused project that demonstrates how common off-the-shelf components can be used to manipulate wireless signals in the 2.4GHz spectrum. By combining the processing power of an ESP32 with the transmission capabilities of NRF24L01 modules, this project creates a device capable of disrupting Bluetooth and WiFi communications.

## Hardware Architecture

The core of the system relies on the NRF24L01+PA+LNA modules. These are high-power versions of the standard NRF24L01 transceiver, featuring a Power Amplifier (PA) and a Low Noise Amplifier (LNA) to extend signal strength. In this application, they are used not for data transmission, but for generating interference across the frequency hopping spread spectrum (FHSS) used by Bluetooth. 

The project is designed to be built on a breadboard or perfboard. It requires specific attention to power stability, hence the inclusion of capacitors (10µF – 47µF) to handle the current spikes of the radio modules. A critical safety note for builders: the antennas must be connected before powering the NRF24L01 modules to prevent burning out the amplifiers.

## Software Implementation

The project is built within the Arduino ecosystem, making it accessible to hobbyists and students. It leverages the `RF24` library by TMRh20, which provides the low-level SPI communication logic needed to control the radio registers. The ESP32 manages the logic for sweeping through frequencies or targeting specific channels to maximize interference effectiveness. Because the ESP32 runs FreeRTOS under the hood in the Arduino environment, the system maintains stable execution while handling the high-speed SPI transactions required for the radio modules.

## Technical Considerations

The default setup uses two transmitters to increase the density of the interference. While the primary target is Bluetooth, the code can be tweaked to interfere with anything using the 2.4GHz band, including RC toys, drones, and standard WiFi networks. This flexibility makes it a powerful tool for understanding how wireless protocols handle noise and packet loss.

## Legal and Safety Warning

It is important to note that this project is intended strictly for educational purposes. Signal jamming is highly regulated and often illegal in many jurisdictions because it can disrupt critical infrastructure, emergency services, and public safety communications. Intentional interference with wireless signals can result in severe legal penalties. Users should only explore these concepts in controlled, legal environments for research purposes.
