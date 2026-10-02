---
title: CyberKey
summary: CyberKey is a biometric TOTP authenticator built for the M5StickC Plus 2
  (ESP32) that types 2FA codes over Bluetooth. By combining a fingerprint sensor with
  encrypted storage and BLE HID emulation, it provides a seamless and secure way to
  enter one-time passwords without a phone or manual copy-pasting.
slug: cyberkey
codeUrl: https://github.com/thomassimmer/CyberKey
lastUpdated: '2026-05-09'
licenses:
- MIT
rtos: freertos
libraries:
- nimble
topics:
- 2fa
- ble
- embedded
- esp-idf
- esp32
- fingerprint
- hardware-security
- hid
- m5stack
- no-std
- rust
- totp
isShow: false
createdAt: '2026-08-12T14:05:57+00:00'
updatedAt: '2026-08-12T14:05:57+00:00'
relatedProjects:
- esp32-mfa-authenticator
- toothpaste
- esp32-u2f-security-key
- securegen
- esp32-morse-keyer
- open-authenticator-app
---

CyberKey is a hardware security gadget that brings a touch of cyberpunk aesthetic to modern authentication. Built on the M5StickC Plus 2, this project transforms a compact ESP32-based development kit and a fingerprint sensor into a dedicated Time-based One-Time Password (TOTP) generator. Instead of fumbling with a smartphone app or manually typing codes, users simply touch an enrolled finger to the sensor, and the device types the 6-digit code directly into the focused field of a paired computer via Bluetooth Low Energy (BLE).

## Seamless Authentication via BLE HID

The core utility of CyberKey lies in its ability to act as a standard BLE Human Interface Device (HID) keyboard. This allows it to pair with macOS, Windows, and Linux without requiring any specialized drivers or companion software on the host machine. Once a fingerprint is matched, the device calculates the current TOTP code using its internal Real-Time Clock (RTC) and broadcasts the keystrokes as if they were coming from a physical keyboard. This "one finger, one service" model allows users to map different fingers to different accounts, making the login process as simple as a single touch.

## Technical Architecture

The project is implemented in Rust, leveraging a modular architecture that separates hardware-agnostic logic from the firmware. The repository is organized into several distinct crates:

*   **cyberkey-core**: A `no_std` crate containing the TOTP engine (RFC 6238) and BCD helpers.
*   **cyberkey-hid**: A `no_std` utility for mapping ASCII characters to HID keycodes.
*   **fingerprint2-rs**: A custom `no_std` UART driver for the M5Stack Fingerprint2 sensor.
*   **firmware**: The ESP32-specific application that integrates the hardware, manages the BLE stack via NimBLE, and handles the main event loop.
*   **cyberkey-cli**: A desktop tool written in standard Rust for managing enrollment, syncing the clock, and handling secrets over USB-C.

By using the ESP-IDF framework, CyberKey takes advantage of FreeRTOS for task management and the NimBLE stack for efficient Bluetooth communication. The use of Rust ensures memory safety and allows for high-quality unit testing of the core logic on a standard development machine before deploying to the hardware.

## Security at the Forefront

Security is a critical consideration for any device handling TOTP secrets. CyberKey employs several layers of protection to ensure that secrets remain private even if the device is lost or stolen:

*   **Encrypted Storage**: The device uses ESP-IDF's encrypted Non-Volatile Storage (NVS) with AES-256-XTS. The encryption key is generated at first boot and burned into the ESP32's eFuses, making it impossible to read back or recover from a dumped flash image.
*   **Secure BLE Pairing**: Pairing utilizes Low Energy Secure Connections (LESC) with ECDH P-256 and MITM protection. A random 6-digit passkey is displayed on the device's LCD during pairing, ensuring that rogue devices cannot connect silently.
*   **Biometric Gating**: Secrets are only loaded and processed after a successful fingerprint match. Furthermore, the USB CLI is gated behind a fingerprint unlock, preventing unauthorized access to the device configuration.

## User Interface and Interaction

Despite its small form factor, CyberKey provides a clear user interface via the M5StickC Plus 2's built-in display and buttons. During normal operation, the screen displays service labels and generated codes. Physical buttons allow users to toggle pairing windows, clear Bluetooth bonds, or perform a factory reset. For power management, the device supports light sleep and can be powered off via GPIO, while preserving BLE bonds for automatic reconnection upon the next boot.

## Hardware Integration

The project is designed for the M5Stack ecosystem, specifically the M5StickC Plus 2 and the Fingerprint 2 Unit. The sensor connects via the Grove port (UART), requiring no soldering and making the project accessible for those who prefer a plug-and-play hardware experience. The firmware is optimized for the ESP32-S3, utilizing its power management features to maintain BLE links even during low-power states.
