---
title: CHRZ Watch Firmware
summary: A custom firmware for the NRF52832-based I6HRC smartwatch built on ARM Mbed
  OS. It provides a full BLE stack, power-optimized sensor drivers, and integration
  with the Gadgetbridge Android app for activity tracking and notifications.
codeUrl: https://github.com/StarGate01/chrzwatch-firmware
siteUrl: https://github.com/StarGate01/chrzwatch-firmware
isShow: false
rtos: mbed-os
libraries: []
topics:
- ble
- bluetooth
- bluetooth-low-energy
- firmware
- mbed
- mbed-os
- nrf52
- smartwatch
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- chronos-watchy
- twatch-v3-firmware-for-esp32
- zephyrwatch
- zswatch
- lunokiotwatch-firmware-for-lilygo-twatch-2020
- infinitime
---

The CHRZ Watch project is a comprehensive custom firmware implementation for the I6HRC smartwatch, a wearable device powered by the Nordic NRF52832 SoC. While many budget smartwatches ship with limited, proprietary software, CHRZ Watch leverages the ARM Mbed RTOS to provide a modern, extensible, and power-efficient alternative. This project is particularly notable for its deep integration with the open-source Android companion app, Gadgetbridge, allowing for a fully private and customizable wearable experience.

## Hardware Capabilities

The firmware is designed to squeeze every bit of functionality out of the I6HRC hardware. The core of the device is the NRF52832, featuring 512K ROM and 64K RAM. The firmware manages a variety of peripherals including:

*   **Display**: A 0.96-inch 80x160 LCD driven by the ST7735 IC via high-speed SPI.
*   **Sensors**: The KX023 acceleration sensor for step counting and wrist-turn detection, and the TI AFE4404 for heart rate monitoring.
*   **Input/Output**: Two capacitive touch buttons for navigation and a vibration motor for haptic alerts.
*   **Power**: Battery voltage sensing via ADC and charging detection via GPIO.

## Technical Architecture and Mbed OS

One of the technical highlights of CHRZ Watch is its use of a custom fork of Mbed OS 6.7. This fork is specifically modified to support deep sleep modes even while the Bluetooth stack is active, a critical requirement for wearable longevity. To handle the complexities of real-time sensor data, the project utilizes `UnsafeI2C`—an I2C implementation that bypasses standard mutex locking. This allows sensors to be read directly within interrupt contexts, ensuring that motion events and heart rate ADC samples are captured with minimal latency.

To avoid bus contention between the LCD and the font flash (GT24L24A2Y), the firmware uses standard bus locking for SPI. Rendering is handled gracefully by deferring calls from interrupt contexts to a main `EventQueue`, ensuring the UI remains responsive without crashing the system.

## Connectivity and Features

The firmware implements a robust BLE stack using Mbed's CORDIO APIs. It supports several standard GATT profiles, including:
*   **Battery and Heart Rate**: Standardized reporting for health apps.
*   **Current Time**: Synchronizing the watch clock with a smartphone.
*   **Steps and Cadence**: Real-time activity tracking.
*   **Immediate Alert**: Enabling notifications for incoming messages.

For developers, the project includes a SEGGER J-Link RTT interface. Since the physical UART pins are repurposed for other hardware, RTT provides a vital window into the system's behavior over the SWD debug interface, allowing for real-time logging without extra wires.

## Hacking the Hardware

Transitioning from stock firmware to CHRZ Watch requires some hardware modification. The repository provides detailed instructions on soldering SWD test points to the internal USB data lines, effectively turning the charging cable into a programming interface. Because the NRF52832 is often locked by manufacturers, the documentation guides users through the process of mass-erasing the chip using a J-Link, CMSIS-DAP, or Black Magic Probe to unlock the flash for new firmware.

## Getting Started with Development

The project is configured for the PlatformIO ecosystem, making it accessible for developers using Visual Studio Code. To build the project, you will need to initialize the environment and install specific Python dependencies for the Mbed patching system:

```bash
# Install required python packages for the Mbed patcher
$ <python path> -m pip install -r patch/requirements.txt

# Use PlatformIO to flash the i6hrc environment
$ pio run -e i6hrc -t upload
```

With its focus on power efficiency, open-source integration, and hardware-level control, CHRZ Watch serves as an excellent template for anyone looking to build professional-grade firmware for NRF52 wearables.
