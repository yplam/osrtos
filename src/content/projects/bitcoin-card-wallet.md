---
title: Bitcoin Card Wallet
summary: An ESP32-based hardware wallet for the M5Stack Cardputer that enables seed
  generation, address management, and transaction signing. It supports BIP39 standards,
  BIP84 Native SegWit addresses, and secure seed storage using RFID tags or SD cards.
slug: bitcoin-card-wallet
codeUrl: https://github.com/geo-tp/Bitcoin-Card-Wallet
star: 35
version: v1.0
lastUpdated: '2025-01-17'
rtos: freertos
topics:
- bitcoin
- bitcoin-wallet
- coldwallet
- esp32
- hardware-wallet
- m5cardputer
- m5stack
- seed-generator
isShow: true
image: /202601/cardputer.webp
createdAt: '2026-01-22'
updatedAt: '2026-01-22'
relatedProjects:
- colibri-wallet
- trezor-firmware
- esp32-mfa-authenticator
- securegen
- sparkminer
- sonicrypt
---

## Overview

Bitcoin Card Wallet is an open-source hardware wallet project specifically designed for the M5Stack Cardputer. It transforms the ESP32-S3 based portable computer into a functional tool for generating BIP39 seeds, managing Bitcoin addresses, and signing transactions. The project prioritizes security by ensuring that the mnemonic seed is never permanently stored on the device's internal flash memory; instead, it relies on manual entry or external storage via RFID tags and SD cards.

## Key Features and Capabilities

The wallet provides a comprehensive suite of tools for Bitcoin self-custody. It supports the generation of 24-word mnemonic seeds following the BIP39 standard, ensuring compatibility with major wallets like Electrum and Sparrow. By default, the application derives Native SegWit (Bech32) addresses using the BIP84 standard (m/84'/0'/0').

**Core functionalities include:**
- **Transaction Signing:** Users can sign Partially Signed Bitcoin Transactions (PSBT) directly on the device.
- **RFID Integration:** Support for MIFARE 1K tags via the M5Stack RFID2 module allows users to store encrypted or plaintext seeds for quick access.
- **SD Card Support:** Public wallet information (xPubs, addresses, and derivation paths) is stored on an SD card to allow for "watch-only" monitoring without exposing private keys.
- **USB Emulation:** The device can emulate a USB keyboard to automatically type out Bitcoin addresses or public keys into a host computer, reducing manual entry errors.
- **QR Code Generation:** Displays addresses and balance information as QR codes for easy mobile scanning.

## Technical Architecture and Security

Built on the Arduino framework for the ESP32, the project leverages several specialized libraries including `uBitcoin` for blockchain primitives and `Crypto++` for cryptographic operations. 

One of the most critical aspects of any hardware wallet is its Random Number Generator (RNG). Bitcoin Card Wallet employs a multi-layered approach to entropy collection to ensure the cryptographic strength of generated private keys. It combines three distinct sources:
1. **Hardware RNG:** Utilizing the ESP32's built-in hardware random number generator.
2. **Software DRBG:** An mbedTLS Deterministic Random Bit Generator.
3. **User Entropy:** The system tracks the timing of user keyboard inputs down to the nanosecond, using the delta between keystrokes as a source of unpredictable data.

These sources are mixed and hashed using SHA-256 to produce the final private key, ensuring that even if one source were compromised, the resulting seed remains secure.

## Workflow and Integration

The project is designed to work seamlessly in an air-gapped or semi-air-gapped workflow. Users typically use a "Watch-only" wallet on a desktop application like Sparrow Wallet to monitor balances and prepare transactions. The unsigned PSBT file is then transferred via SD card to the Cardputer. 

To sign the transaction, the user must provide the seed—either by typing the 24 words manually or by scanning a previously prepared RFID tag. Once signed, the Cardputer saves a new version of the file with a "-signed" suffix to the SD card, which can then be broadcast to the network from a connected computer. This architecture ensures that the private keys never touch an internet-connected device.
