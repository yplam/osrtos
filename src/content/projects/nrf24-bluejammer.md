---
title: NRF24-BlueJammer
summary: A wireless signal jammer project that utilizes the NRF24L01 transceiver and
  Arduino to disrupt communications in the 2.4GHz band. It specifically targets Bluetooth
  Low Energy (BLE) advertising channels by broadcasting a continuous carrier wave
  across multiple frequencies.
slug: nrf24-bluejammer
codeUrl: https://github.com/jbalagiya/NRF24-BlueJammer
lastUpdated: '2025-07-08'
image: /202603/NRF24-BlueJammer_0.avif
rtos: ''
topics:
- arduino
- arduino-uno
- jammer
- nrf24l01
isShow: true
createdAt: '2026-03-31T13:01:20+00:00'
updatedAt: '2026-03-31T13:01:20+00:00'
---

The NRF24L01 is a staple in the hobbyist electronics world, known for its low cost and reliable point-to-point wireless communication. However, its flexibility allows it to operate in ways beyond simple data transmission. This project demonstrates how to repurpose the NRF24L01 module as a signal jammer, specifically targeting the 2.4GHz spectrum used by Bluetooth and other wireless protocols.

At its core, the jammer works by exploiting the radio's ability to broadcast a continuous carrier wave. By rapidly switching across different frequencies, the module creates enough noise to disrupt legitimate traffic. This implementation covers a wide range of channels from 0 to 79, with a strategic focus on Bluetooth Low Energy (BLE) advertising channels 37, 38, and 39. These specific channels are critical for device discovery and connection establishment, making them high-priority targets for signal disruption.

### Hardware Architecture

The setup is remarkably simple, requiring only an Arduino (UNO or Nano) and the NRF24L01 module itself. Because the NRF24L01 is sensitive to power fluctuations, a 10 µF capacitor is often recommended between the VCC and GND pins to ensure a stable supply, especially when the radio is operating at high power levels for jamming. 

The wiring follows the standard SPI interface:

| NRF24L01 Pin | Arduino UNO Pin |
|--------------|----------------|
| VCC          | 3.3V           |
| GND          | GND            |
| CE           | Pin 9          |
| CSN          | Pin 10         |
| SCK          | Pin 13         |
| MOSI         | Pin 11         |
| MISO         | Pin 12         |

It is vital to remember that the NRF24L01 operates at 3.3V. While the logic pins are often 5V tolerant on many versions of the chip, connecting the VCC pin to 5V will likely destroy the module.

### Implementation and Software

The firmware leverages the popular TMRh20 RF24 library, which provides low-level access to the radio's registers. Instead of sending formatted data packets, the code configures the radio to output a constant carrier. By iterating through the frequency registers, the jammer sweeps across the 2.4GHz band. 

When targeting Bluetooth, the jammer focuses on the specific frequencies where advertising occurs. Since BLE devices must hop between these channels to find each other, a jammer that cycles through these frequencies quickly can effectively prevent devices from "seeing" one another, even if it isn't broadcasting on every single channel simultaneously.

### Practical Considerations

For those looking to experiment with this setup, the effectiveness of the jammer depends heavily on the proximity to the target devices and the antenna quality of the NRF24L01. Modules with an external antenna (SMA connector) generally provide significantly better range and interference potential than those with a simple PCB trace antenna. 

This project serves as an excellent educational tool for understanding radio frequency (RF) interference, the structure of the 2.4GHz ISM band, and the vulnerabilities of wireless protocols. It highlights how easily consumer-grade hardware can be used to influence the wireless environment around us.
