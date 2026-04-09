---
title: Colibri Wallet
summary: Colibri is an open-source DIY hardware wallet firmware targeting ESP32 microcontrollers.
  It provides a secure, encrypted keystore and a BLE-based JSON-RPC interface for
  signing Ethereum transactions and managing mnemonics using affordable, off-the-shelf
  hardware.
slug: colibri-wallet
codeUrl: https://github.com/xtools-at/colibri
siteUrl: https://colibri.diy
version: v0.0.5
lastUpdated: '2026-03-26'
licenses:
- AGPL-3.0
rtos: freertos
topics:
- arduino
- cryptocurrency
- cryptocurrency-wallet
- diy-electronics
- esp32
- hardware-wallet
isShow: false
createdAt: '2026-04-08T23:37:59+00:00'
updatedAt: '2026-04-08T23:37:59+00:00'
---

Colibri is a free and open-source DIY project designed to lower the barrier to entry for secure cryptocurrency self-custody. The project's primary goal is to enable anyone with a modest budget and basic technical tools—specifically a laptop, internet access, and approximately $5 worth of hardware—to create a functional and secure hardware wallet. By utilizing widely available ESP32 development boards, Colibri transforms standard maker hardware into a dedicated cryptographic tool.

### A Philosophy of Accessibility and Security

The project is built on the principle that expensive, proprietary hardware shouldn't be a requirement for security. Instead of relying on specialized secure elements that can be difficult for hobbyists to source or program, Colibri focuses on robust encryption. The project operates under the assumption that "unhackable" hardware is a myth; therefore, it prioritizes making any sensitive data stored on the device functionally impossible to extract through strong encryption of the wallet storage.

Colibri is designed to be beginner-friendly. It leverages the Arduino IDE for building and flashing firmware, making it accessible to those who may not be professional embedded developers. While it currently supports common ESP32 variants like the ESP32-C3 and ESP32-S3, its modular architecture is intended to support a variety of boards and configurations as the project evolves.

### Technical Capabilities

At its core, Colibri functions as a secure keystore and communication interface. The firmware implements several critical features for modern cryptocurrency usage:

*   **Mnemonic Management**: The system can generate truly random mnemonics on-device or allow users to import existing ones. It supports the storage of up to 30 encrypted mnemonics, allowing users to switch between different identities or accounts easily.
*   **Cryptographic Standards**: Colibri supports standard Hierarchical Deterministic (HD) paths and BIP32 passphrases, ensuring compatibility with the broader wallet ecosystem.
*   **Ethereum Integration**: The current version (0.0.x) is heavily focused on the Ethereum ecosystem. It provides the ability to sign Ethereum messages, typed data (EIP-712), and standard transactions.
*   **Communication Interface**: Interaction with the wallet occurs over a Bluetooth Low Energy (BLE) interface using JSON-RPC. This allows the device to communicate with companion applications or web interfaces without requiring a physical cable, though security remains a priority through encrypted storage and password protection.

### Hardware and Development Environment

The project is optimized for the ESP32 ecosystem, which natively runs on the FreeRTOS operating system. This choice provides the necessary performance for cryptographic operations while maintaining low power consumption and built-in wireless connectivity. By targeting the ESP32-C3 and S3, Colibri takes advantage of modern RISC-V and Xtensa architectures that are both powerful and cost-effective.

Developers can interact with the project using the Arduino IDE, and the repository includes a compatibility stub (`colibri.ino`) that facilitates development across both Arduino and PlatformIO environments. The source code is organized modularly, separating core logic from hardware-specific configurations, which simplifies the process of porting the firmware to new ESP32-based dev kits.

### Roadmap and Future Development

The Colibri project is currently in a pre-alpha state, with significant milestones planned for the near future. The upcoming 0.1.x release cycle focuses on stabilizing the core firmware, refining the secure keystore, and launching a trusted companion web app for wallet setup. 

Looking further ahead, the 0.2.x series intends to introduce support for various display types. Adding a GUI will significantly enhance the device's security profile by enabling "What You See Is What You Sign" (WYSIWYS) functionality. This will allow users to verify transaction parameters, enter passwords, and recover mnemonics directly on the device hardware, reducing reliance on the connected host machine. Other prioritized features include USB HID support, Bitcoin signing capabilities, and airgapped communication via QR codes and camera modules.
