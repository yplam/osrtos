---
title: ESP32 SRAM PUF Authentication
summary: A hardware-based authentication system for ESP32 microcontrollers using SRAM
  Physical Unclonable Functions (PUF). It leverages unique manufacturing variations
  in RTC SLOW memory to generate authentication tokens without storing credentials
  on-device. The project includes ESP32 firmware, a measurement server, and analysis
  tools for identifying stable bits.
slug: esp32-sram-puf-authentication
codeUrl: https://github.com/xtncl/esp32-sram-puf-authentication
siteUrl: https://phaidra-ui.fhstp.ac.at/detail/o:5828
star: 45
lastUpdated: '2025-10-08'
rtos: freertos
topics:
- authentication
- esp32
- iot-security
- physical-unclonable-functions
- research
- rtc-memory
- sram-puf
isShow: false
createdAt: '2026-01-30'
updatedAt: '2026-01-30'
relatedProjects:
- esp32-u2f-security-key
- esp32-mfa-authenticator
- securegen
- open-authenticator-app
- freebees-access-control-for-esp32
- ghost-esp
---

## Overview

ESP32 SRAM PUF Authentication is a proof-of-concept project demonstrating hardware-based device authentication using Physical Unclonable Functions (PUF). Unlike traditional authentication methods that store sensitive credentials in non-volatile memory (where they might be extracted if a device is compromised), this system derives authentication tokens directly from the physical characteristics of the silicon. 

By leveraging the unique manufacturing variations at the atomic level, each ESP32 chip produces a distinct "fingerprint" in its SRAM memory upon power-up. This project specifically targets the 8KB RTC SLOW Memory (at address 0x50000000) to generate stable, unique tokens for secure IoT communication.

## Technical Foundation

The project is based on extensive research involving 16 ESP32 microcontrollers and over 44,000 power cycles. This research validated that approximately 94% of SRAM bits remain stable across power cycles at constant temperatures. The system uses a bit-selection approach rather than complex error correction codes (ECC), identifying the most reliable bits for each specific chip to ensure consistent authentication.

### Key Research Findings:
- **Bit Stability**: ~94% at constant temperature.
- **Uniqueness**: ~50% Hamming distance between different devices.
- **Randomness**: ~50% Hamming weight (balanced distribution of 0s and 1s).
- **Environmental Impact**: Approximately 10% deviation at extreme temperatures (-20°C).

## How It Works

The authentication flow is divided into two main phases: Enrollment and Authentication.

### Enrollment Phase
1. **Data Collection**: The ESP32 is power-cycled multiple times (30+ recommended) to collect SRAM measurements.
2. **Stable Bit Identification**: A Python-based tool analyzes the measurements to find bits that consistently power on to the same state.
3. **Challenge Generation**: A "PUF Challenge" is created, which acts as a map for the ESP32 to find its stable bits.
4. **Token Registration**: An API token is derived using PBKDF2 and stored on the authentication server.

### Authentication Phase
1. **SRAM Read**: On boot, the ESP32 reads the RTC SLOW Memory.
2. **Bit Extraction**: Using the PUF Challenge, the device extracts only the stable bits.
3. **Key Derivation**: The extracted bits are processed through PBKDF2-HMAC-SHA256 (10,000 iterations) with a specific salt to generate a Bearer token.
4. **Validation**: The token is sent to the server via standard protocols (HTTP, MQTT, etc.), where it is validated against the registered device ID.

## Implementation Details

The repository provides a full-stack implementation for testing:

- **Hardware**: Arduino sketches for reading SRAM, uploading measurements, and performing the final authentication.
- **Server**: A Node.js environment (available via Docker) containing both a measurement server for data collection and an authentication server for token validation.
- **Tools**: Python utilities for generating challenges and performing Hamming distance analysis to verify PUF quality.

```cpp
// Example of the authentication logic on the ESP32
[1/4] Reading RTC SLOW Memory...
      Address: 0x50000000
      Size: 128 bytes

[2/4] Extracting PUF bits...
      Challenge: ff2ee7f75f7effeffefbfffbe7ffe5fe
      Bit count: 107

[3/4] Generating PBKDF2 key...
      Iterations: 10000
      Derived Key: 260f1105f729c7afcd71b62eacb5c0b94fcca4c16f6be36c4b2a297a975d358a

[4/4] Connecting to WiFi...
[AUTH] Attempting authentication...
[INFO] HTTP Response Code: 200
✓ AUTHENTICATION SUCCESSFUL!
```

## Security Considerations

By using PBKDF2 for key derivation, the system ensures that raw SRAM bits are never exposed. Even if an authentication token is intercepted, the original hardware fingerprint cannot be reversed. This approach allows for the generation of multiple unique tokens from the same hardware by simply changing the salt or derivation parameters. For production environments, the project recommends implementing HTTPS/TLS, replay protection, and rate limiting on the server side.
