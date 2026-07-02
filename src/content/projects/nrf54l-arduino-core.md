---
title: nRF54L Arduino Core
summary: A high-performance bare-metal Arduino core for Nordic's next-generation nRF54L
  series, bypassing the overhead of Zephyr and the nRF Connect SDK. It provides direct
  hardware access to the Cortex-M33 and RISC-V coprocessor, supporting BLE, Thread,
  Zigbee, and Matter with minimal binary footprints.
slug: nrf54l-arduino-core
codeUrl: https://github.com/lolren/nrf54-arduino-core
version: v0.9.213
lastUpdated: '2026-06-30'
image: /202607/nrf54-arduino-core_1.avif
rtos: ''
libraries:
- nimble
- open-thread
topics:
- arduino
- clean-room
- no-zephyr
- nrf54l15
- xiao
isShow: true
createdAt: '2026-07-01T12:34:05+00:00'
updatedAt: '2026-07-01T12:34:05+00:00'
relatedProjects:
- n-able-arduino-core
- silicon-labs-arduino-core
- nimble-arduino
- esp32-risc-v-bare-metal-sdk
- arduino-pico
- nrf52-mbed-pwm
---

The nRF54L Arduino Core provides a streamlined, bare-metal development environment for Nordic Semiconductor's latest generation of SoCs. Unlike the standard vendor-provided nRF Connect SDK, which relies heavily on the Zephyr RTOS and complex DeviceTree configurations, this core offers a direct path to the hardware. It targets developers who require full control over peripherals, low-latency execution, and the smallest possible binary sizes—demonstrated by a simple "blink" sketch requiring only ~12 KB compared to the 100 KB+ typical of RTOS-based implementations.

### Quick Integration and Setup
Getting started with the nRF54L series is simplified through standard Arduino package management. By adding the project's board manager URL to the Arduino IDE, users can quickly install support for the nRF54L15 family. For command-line enthusiasts, the core is fully compatible with `arduino-cli`, allowing for automated updates and headless build environments. Uploading firmware is handled by the native nRF OCD tool, which works out-of-the-box on Linux and Windows without requiring external Python dependencies for the primary upload path.


### Supported Hardware Platforms
The core supports a variety of boards based on the nRF54L15 and nRF54LM20A SoCs. Notable entries include the Seeed Studio XIAO nRF54L15 and the advanced XIAO nRF54LM20A Sense. The latter features a powerful 128 MHz M33 core, 2 MB of non-volatile memory, and 512 KB of RAM, supplemented by an nPM1300 PMIC for sophisticated power management and onboard sensors like the LSM6DS3TR-C IMU. Additionally, compact modules from Holyiot (25007 and 25008) are supported, providing small-form-factor options for custom PCB designs.

![XIAO nRF54LM20A Sense with integrated PMIC and sensors](/202607/nrf54-arduino-core_2.avif)

### High-Performance Wireless and Peripheral Support
At the heart of the core is a robust feature matrix covering wireless protocols and hardware peripherals. The wireless stack includes a mature BLE implementation with support for advertising, scanning, and GATT services via the familiar Bluefruit API. Experimental support is also provided for 802.15.4 protocols, including Thread and Zigbee. 

A unique advantage of this core is its ability to utilize the VPR RISC-V coprocessor alongside the primary Cortex-M33. Peripheral support is extensive, ranging from standard GPIO, PWM, and ADC to high-speed 32 MHz SPI. The core also implements advanced Nordic-specific features like Distributed Programmable Peripheral Interconnect (DPPI), tamper detection, and the Key Management Unit (KMU).

![Holyiot-25008 nRF54L15 module board](/202607/nrf54-arduino-core_3.avif)

### Advanced Power Management and Storage
For battery-powered applications, the core exposes deep-sleep and system-off APIs. It includes specialized drivers for the nPM1300 PMIC, allowing for precise control over battery charging and input current limits. Onboards QSPI flash, such as the 8 MB PY25Q64 on the LM20A, is supported through both low-level drivers and an Adafruit_SPIFlash compatibility layer, ensuring that sketches can easily manage data persistence while maintaining low-current sleep states.

### Maturity and Technical Considerations
While the core is production-ready for standard Arduino functionality and BLE, certain advanced stacks like Thread, Matter, and Channel Sounding are currently in a staged or experimental status. Developers should note that while hardware acceleration is used for many cryptographic functions through the CRACEN engine, secp256r1 ECC remains software-only due to proprietary microcode requirements. Despite these limitations, the core represents a powerful alternative for developers seeking the efficiency of bare-metal programming within the accessible Arduino ecosystem.
