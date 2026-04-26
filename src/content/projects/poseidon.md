---
title: POSEIDON
summary: A keyboard-focused pentesting firmware for the M5Stack Cardputer-Adv (ESP32-S3)
  offering over 90 features across WiFi, BLE, sub-GHz, and LoRa. It utilizes FreeRTOS
  and the NimBLE stack to coordinate complex wireless attacks, including 5 GHz deauthentication
  and Zigbee sniffing via a companion ESP32-C5 node.
slug: poseidon
codeUrl: https://github.com/GeneralDussDuss/poseidon
siteUrl: https://github.com/GeneralDussDuss/poseidon/releases/latest
version: v0.5.0
lastUpdated: '2026-04-21'
rtos: freertos
libraries:
- h2zero-esp-nimble-cpp
- nimble
- lwip
topics:
- arduino
- ble
- bluetooth
- cardputer
- cc1101
- deauth
- esp32
- esp32-s3
- firmware
- flipper-zero
- hacking
- lora
- m5stack
- mousejack
- nrf24
- pentesting
- platformio
- security
- subghz
- wifi
isShow: false
createdAt: '2026-04-26T05:04:37+00:00'
updatedAt: '2026-04-26T05:04:37+00:00'
---

## Overview

POSEIDON is an advanced, keyboard-first pentesting firmware specifically engineered for the M5Stack Cardputer-Adv. Positioned as a "commander of the deep," it transforms the ESP32-S3-based handheld into a versatile security auditing tool. While it shares DNA with projects like Flipper Zero, Bruce, and ESP32Marauder, POSEIDON distinguishes itself by leveraging the Cardputer's physical QWERTY keyboard for mnemonic-based navigation and typed parameter input, moving away from simple D-pad interfaces.

The project is designed for extensibility, supporting a range of hardware "hats" to expand its reach into frequencies and protocols that the base ESP32-S3 cannot reach natively, such as 5 GHz WiFi, Zigbee, and LoRa.

## Advanced Wireless Capabilities

One of POSEIDON's most technical achievements is its ability to bypass standard wireless restrictions. By utilizing a custom-patched version of the ESP-IDF's `libnet80211.a`, the firmware can bypass sanity checks for raw frame injection. This enables advanced attacks like 5 GHz deauthentication and PMKID capture when paired with the TRIDENT companion node—an ESP32-C5 satellite that communicates with the main unit over an ESP-NOW mesh.

### Feature Matrix Highlights

With over 90 features, POSEIDON covers a vast spectrum of the RF landscape:

*   **WiFi & Networking**: Beyond standard scanning and deauthentication, POSEIDON includes the "CIW Zeroclick" suite with 157 SSID-based payloads for command injection and XSS. It also features a robust network attack sub-menu (SaltyJack) capable of DHCP starvation, rogue DHCP servers, and Responder-style NTLM credential harvesting over Ethernet via the W5500 SPI module.
*   **Bluetooth (BLE)**: Utilizing the NimBLE stack, the firmware performs OUI scanning, Apple Continuity/Fast Pair spamming, and Bad-KB HID injections. It also includes a "Geiger" mode for finding trackers like AirTags or Tiles.
*   **Sub-GHz & 2.4 GHz RF**: Through the Hydra RF Cap 424 (CC1101 + nRF24L01+), the system supports protocol decoding for common remotes (Princeton, CAME, NICE) and MouseJack attacks against wireless peripherals. It includes a massive library of over 3,190 signal files.
*   **LoRa & GNSS**: Support for the CAP-LoRa1262 hat enables Meshtastic integration, allowing the Cardputer to function as a text-based communicator, node listener, or GPS wardriving tool.

## Autonomous Intelligence: Triton

For hands-off operations, POSEIDON features "Triton," an autonomous "Gotchi" style agent. Triton acts as a reinforcement-learning-driven channel picker that hunts for handshakes and captures them to an SD card. It features four distinct modes—HUNT, STEALTH, SURGICAL, and STORM—each with unique visual indicators and operational logic, allowing the device to perform audits while tucked away in a pocket.

## Hardware Support and Architecture

The firmware is built on the Arduino and PlatformIO framework, targeting the ESP32-S3 at 240 MHz. It makes extensive use of FreeRTOS for task management, ensuring that UI updates remain flicker-free even during intensive background WiFi or BLE scanning. The system supports four primary hardware configurations:

1.  **M5Stack CAP-LoRa1262**: LoRa (SX1262) and GNSS (GPS).
2.  **Hydra RF Cap 424**: CC1101 (Sub-GHz) and nRF24L01+ (2.4 GHz).
3.  **ESP32-C5 Node**: Adds 5 GHz WiFi and 802.15.4 (Zigbee/Thread) capabilities.
4.  **W5500 SPI to Ethernet**: For wired network hijacking and Responder attacks.

## Getting Started

POSEIDON can be built from source using PlatformIO or flashed directly using M5Burner or `esptool`. 

```bash
# Build from source using PlatformIO
git clone https://github.com/GeneralDussDuss/poseidon.git
cd poseidon
pio run -t upload

# Or flash a pre-built binary to an ESP32-S3
esptool.py --chip esp32s3 write_flash 0x0 poseidon-v0.5.0-cardputer-adv.bin
```

Controls are optimized for the Cardputer's layout, using letter mnemonics for menu jumps (e.g., 'W' for WiFi) and symbols like `;` and `.` for scrolling. The interface is highly customizable, offering six visual themes ranging from the classic "Matrix" green phosphor to a high-contrast "E-INK" mode for outdoor visibility.
