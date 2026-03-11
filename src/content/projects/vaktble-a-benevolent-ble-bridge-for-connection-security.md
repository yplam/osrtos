---
title: 'VaktBLE: A Benevolent BLE Bridge for Connection Security'
summary: VaktBLE is a security framework that acts as a benevolent Man-in-the-Middle
  bridge to protect BLE peripherals from malicious central devices. It utilizes non-compliant
  BLE firmware on nRF52840 hardware to validate link-layer packets in real-time, shielding
  targets like ESP32 from protocol-level attacks without requiring modifications to
  the target's firmware.
slug: vaktble-a-benevolent-ble-bridge-for-connection-security
codeUrl: https://github.com/asset-group/vakt-ble-defender
siteUrl: https://asset-group.github.io/papers/vaktble.pdf
star: 13
lastUpdated: '2024-12-26'
rtos: zephyr
libraries:
- nimble
topics:
- ble
- ble-defense
- blediff
- bluetooth-low-energy
- injectable
- jamming
- mitm
- sweyntooth
- vaktble
isShow: false
createdAt: '2026-03-11'
updatedAt: '2026-03-11'
---

## Overview

Bluetooth Low Energy (BLE) is ubiquitous in the IoT ecosystem, but its complex protocol stack often harbors vulnerabilities. **VaktBLE** introduces an innovative defense framework that prevents malicious BLE central devices from establishing direct connections with intended peripherals. By acting as a benevolent Man-in-the-Middle (MiTM) bridge, VaktBLE validates and forwards link-layer packets in real-time, effectively shielding the peripheral from unforeseen attack surfaces.

The project is particularly notable because it performs defense completely over-the-air. It does not require any modification to the firmware of the BLE target being protected, making it an ideal solution for legacy devices or closed-source commercial products.

## Technical Architecture

VaktBLE leverages non-compliant BLE firmware running on Nordic Semiconductor hardware—specifically the **nRF52840 DK** and **nRF52840 Dongle**. This setup allows the bridge to intercept, decode, and filter raw link-layer packets that standard, compliant BLE controllers would typically handle internally or discard.

The system is designed with two primary configurations:
1.  **Anchored Setup**: Utilizes a standard x86_64 PC (running Ubuntu) to manage the validation logic via Python scripts.
2.  **Portable Setup**: A lightweight implementation in C++ designed for embedded Linux systems, such as the Orange Pi Zero 3 (ARM Cortex-A53), which reduces the latency overhead introduced by the MiTM bridge.

## Key Features and Validation Logic

VaktBLE categorizes incoming traffic into several validation types to ensure the safety of the protected peripheral:

-   **Valid**: Packets that meet all protocol requirements and are safe to forward.
-   **Malformed**: Packets rejected by the decoding or filtering components due to structural errors.
-   **Flooding**: Packets rejected to prevent resource exhaustion on the target device.
-   **Out-of-Order**: Packets that violate the expected Finite State Machine (FSM) sequence.
-   **MIC Error**: Packets that fail encryption integrity checks.

## Hardware and Software Integration

The framework integrates several industry-standard embedded technologies:
-   **RTOS & Stacks**: It utilizes the **Zephyr Bluetooth Stack Architecture** and the **Apache NimBLE** stack for its portable implementation.
-   **Target Hardware**: While it can protect various devices, it includes specific support and sample firmware for **ESP32** and **ESP32-C3** SoCs using the **Espressif IoT Development Framework (ESP-IDF)**.
-   **Attacker Simulation**: The repository includes firmware to turn an nRF52840 Dongle into a malicious central for testing purposes.

## Defending Against Real-World Attacks

VaktBLE has been validated against a wide array of known BLE vulnerabilities, including:
-   **SweynTooth**: CVEs such as Link Layer Length Overflow and LLID Deadlock.
-   **CyRC**: Assertion failures on repeated LL packets.
-   **BLEDiff**: Bypassing passkey entry and legacy pairing vulnerabilities.
-   **InjectaBLE**: Preventing central hijacking via impersonation.

### Running the Portable Setup

To launch the portable C++ version of the bridge, users can specify the target peripheral name and the desired BLE channel:

```cpp
// Example command to run the portable setup
sudo bin/vaktble --debug-pkt-peripheral --name nimble-bleprph --channel 39
```

This command initializes the bridge to look for a peripheral named `nimble-bleprph` on channel 39, providing real-time debugging of packets moving between the central and the peripheral. 

## Conclusion

VaktBLE represents a significant step forward in embedded security by providing a transparent, hardware-assisted layer of protection for BLE devices. By moving the security boundary to an external, non-compliant bridge, developers can mitigate complex link-layer attacks that are otherwise difficult to patch in existing firmware stacks.
