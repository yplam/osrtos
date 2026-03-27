---
title: M5 Keyboard and Mouse Emulator
summary: A firmware for the M5Cardputer that emulates USB and BLE HID keyboard and
  mouse devices. It features mode switching via physical buttons and utilizes the
  ESP32-S3's wireless capabilities for remote input control.
slug: m5-keyboard-and-mouse-emulator
codeUrl: https://github.com/geo-tp/Bluetooth-Keyboard-Mouse-Emulator
star: 48
version: v1.1
lastUpdated: '2025-10-21'
rtos: freertos
topics:
- ble
- bluetooth
- keyboard-emulation
- m5stack
- m5stack-cardputer
- mouse-emulation
isShow: false
createdAt: '2026-03-24'
updatedAt: '2026-03-24'
---

The M5 Keyboard and Mouse Emulator is a specialized firmware designed for the M5Cardputer, a portable development kit based on the ESP32-S3. This project transforms the compact device into a versatile Human Interface Device (HID) capable of controlling computers, tablets, or smartphones via Bluetooth Low Energy (BLE) or USB.

### Functionality and Modes

The core of the project is its ability to toggle between two primary operating modes: Keyboard and Mouse. By using the "Btn GO" located on the edge of the M5Cardputer, users can instantly switch the device's behavior. In Keyboard mode, the M5Cardputer's integrated physical keyboard functions as a standard input device. In Mouse mode, the arrow keys are repurposed to control cursor movement, while specific keys like 'OK' and the backslash key function as mouse buttons.

### Technical Foundation

The project is built using the Arduino framework and managed via PlatformIO. It targets the `m5stack-stamps3` board configuration, leveraging the ESP32-S3's native USB and Bluetooth capabilities. The implementation relies on the `M5Cardputer` library for hardware abstraction and `FastLED` for managing visual feedback on the device's LEDs. Because it runs on the ESP32-S3 platform within the Arduino environment, it utilizes the underlying FreeRTOS kernel for task management and wireless stack operations.

### Installation and Deployment

Users have multiple paths for installation. For a streamlined experience, the firmware is available via M5Burner, the official flashing tool from M5Stack. Advanced users can compile the source code using PlatformIO or flash the pre-compiled `firmware.bin` directly from the repository's releases. 

### Use Cases

This emulator is particularly useful for several scenarios:
- **Remote Control:** Acting as a remote for presentations or media centers.
- **Accessibility:** Providing a compact, handheld input device for users with specific ergonomic needs.
- **Testing:** Verifying HID stack compatibility on various operating systems without needing multiple physical peripherals.
- **Maintenance:** Serving as a portable "emergency" input device for headless servers or kiosks.

The keyboard layout depends on the configuration of the connected PC, making it a flexible tool for international users.
