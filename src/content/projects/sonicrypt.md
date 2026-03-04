---
title: Sonicrypt
summary: An open-source hardware tool for real-time auditory and visual confirmation
  of Solana blockchain transactions. Built on the ESP32-S3 platform using the Arduino
  framework, it monitors wallet addresses via WebSockets to provide immediate feedback
  upon payment finalization.
slug: sonicrypt
codeUrl: https://github.com/Sonicrypt/sonicrypt
star: 11
version: v0.0.2-alpha
lastUpdated: '2024-04-03'
rtos: freertos
topics:
- arduino-websocket
- arduinojson
- ble
- cpp
- esp32
- esp32-idf
- esp32-s3
- http-client
- platformio
- solana
- solana-token
- wifimanager
isShow: false
createdAt: '2026-03-04'
updatedAt: '2026-03-04'
---

Sonicrypt is an innovative open-source project designed to bridge the gap between digital blockchain transactions and physical confirmation. In retail or face-to-face environments, waiting for a crypto transaction to finalize can be an uncertain experience for both buyers and sellers. Sonicrypt solves this by providing immediate, standalone auditory and visual cues the moment a payment is confirmed on-chain.

## Technical Architecture

The system is built around the ESP32-S3 microcontroller, leveraging its integrated Wi-Fi capabilities to maintain a persistent connection to the Solana blockchain. Unlike many IoT solutions that rely on centralized middleman servers or proprietary APIs, Sonicrypt is designed as a standalone device. It communicates directly with blockchain nodes, ensuring user privacy and eliminating subscription fees.

The firmware is developed using the Arduino framework within the PlatformIO ecosystem. It utilizes WebSockets to maintain a real-time link with a Solana RPC node, specifically listening for `accountChange` events associated with the seller's wallet address.

## How It Works

The device follows a streamlined logic flow to verify transactions without requiring heavy local processing:

1.  **WebSocket Monitoring**: The device establishes a connection to the Solana network and subscribes to updates for a specific public key.
2.  **Event Detection**: When the blockchain detects a change in the account state (such as an incoming transfer), a notification is pushed to the ESP32.
3.  **Signature Retrieval**: Upon receiving a notification, the device fetches the latest transaction signature for that account.
4.  **Transaction Validation**: The device retrieves the full transaction details and parses the JSON payload to confirm the transaction status is successful and finalized.
5.  **Physical Feedback**: Once validated, the ESP32 triggers a buzzer for auditory confirmation and an LED for visual confirmation.

## Hardware and Components

The standard Sonicrypt build is intentionally minimalist to keep costs low and assembly simple. The primary components include:
*   **ESP32-S3 DevKit**: The core processor handling networking and logic.
*   **LED**: Provides visual status and success indicators.
*   **Buzzer**: Provides the auditory 'ping' upon successful payment.

## Future Development

While the current iteration provides essential confirmation features, the project has a roadmap for more advanced versions. The 'Sonicrypt Plus' and 'Sonicrypt Pro' models aim to introduce voice confirmations, multi-wallet support, and multi-chain compatibility. Additionally, future hardware iterations may include screens for on-the-fly QR code generation, allowing sellers to create transaction requests directly on the device.
