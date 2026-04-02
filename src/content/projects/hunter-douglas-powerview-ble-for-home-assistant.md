---
title: Hunter Douglas PowerView BLE for Home Assistant
summary: This project provides a Home Assistant integration and an ESP32-based emulator
  for Hunter Douglas PowerView Gen 3 window shades. It enables local Bluetooth Low
  Energy control, battery monitoring, and features a specialized tool for extracting
  device encryption keys using the WolfSSL library.
slug: hunter-douglas-powerview-ble-for-home-assistant
codeUrl: https://github.com/patman15/hdpv_ble
lastUpdated: '2026-01-01'
licenses:
- Apache-2.0
rtos: freertos
topics:
- bluetooth-le
- bluetooth-low-energy
- home-assistant
- homeassistant
- hunter-douglas-blinds
- powerview
isShow: false
createdAt: '2026-04-02T11:54:51+00:00'
updatedAt: '2026-04-02T11:54:51+00:00'
---

Integrating smart window treatments into a local automation ecosystem can often be a challenge due to proprietary protocols and encryption. The `hdpv_ble` project addresses this for Hunter Douglas PowerView Gen 3 devices, providing a robust Home Assistant integration that communicates directly over Bluetooth Low Energy (BLE). By moving away from cloud-dependent APIs, users gain faster response times and improved privacy for their motorized shades.

## Bridging the Connectivity Gap

One of the primary hurdles with BLE-based smart home devices is range. This project solves that by supporting the ESPHome Bluetooth Proxy. This allows users to scatter inexpensive ESP32 devices throughout their home to act as BLE-to-WiFi bridges, ensuring that shades in distant rooms remain responsive to Home Assistant commands. The integration is designed for zero-configuration, automatically discovering shades within range while providing detailed information such as battery state-of-charge, charging status, and precise cover position control.

## Solving the Encryption Puzzle

PowerView Gen 3 devices utilize a secure communication layer that requires a specific "Home Key" for authentication. To facilitate this, the repository includes a unique utility: a BLE shade emulator. Located in the `emu/PV_BLE_cover` directory, this ESP32-based firmware mimics a real Hunter Douglas shade. 

When a user adds this emulated shade to the official PowerView mobile app, the app transmits the home's encryption key to the device. The emulator, built using the ESP32 Arduino core and the WolfSSL library for AES encryption/decryption, captures this key and outputs it via the serial port. This clever "man-in-the-middle" approach allows users to retrieve the necessary credentials to authorize their Home Assistant instance without needing to compromise their physical hardware.

## Technical Implementation and Features

The integration exposes several entities to Home Assistant for each detected shade:
- **Cover Entity**: Provides full control over the shade's position, where 100% represents a fully open state.
- **Sensor Entity**: Reports the battery's State of Charge (SoC) in increments (100%, 50%, 20%, 0%).
- **Binary Sensor**: Indicates whether the battery is currently charging.
- **Identify Button**: Triggers a physical response from the shade (an LED flash and three beeps) to help users identify which device they are configuring.

The project supports a wide array of Hunter Douglas product types, including Designer Roller, Roman, Duette, Vignette, and Parkland shades. Because the integration is built on top of the standard Home Assistant BLE components, it benefits from the stability and performance of the underlying `bluetooth` and `esphome` stacks.

## Device Compatibility

The integration is verified to work with various PowerView type IDs, including:
- **Roller Blinds**: Designer Roller (Type 1), M25T (Type 42), and AC Roller (Type 49).
- **Specialty Shades**: Bottom Up (Type 5), Duette and Applause SkyLift (Type 10), and Sonnette (Type 53).
- **Woven and Banded**: Provenance Woven Wood (Type 19) and Banded Shades (Type 52).

For those looking to move their window treatments into a fully local, high-performance smart home environment, this project provides both the integration logic and the specialized tools needed to overcome the initial hurdles of BLE encryption.
