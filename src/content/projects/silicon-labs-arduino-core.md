---
title: Silicon Labs Arduino Core
summary: An Arduino core implementation for Silicon Labs microcontrollers, enabling
  support for Matter, BLE, and low-power wireless applications. It provides a comprehensive
  set of libraries and drivers for EFR32 and MGM24 series hardware, integrating Silicon
  Labs' Gecko SDK and FreeRTOS for advanced protocol stacks.
slug: silicon-labs-arduino-core
codeUrl: https://github.com/SiliconLabs/arduino
siteUrl: https://github.com/arduino-libraries/ArduinoBLE
star: 148
version: 3.0.0
lastUpdated: '2025-07-28'
rtos: freertos
libraries:
- tensorflow-micro
- open-thread
- lwip
topics:
- arduino
- arduino-core
- ble
- efr32
- iot
- matter
- mg24
- nano
- smarthome
- sparkfun
- thingplus
- xiao
isShow: true
image: /202603/xiao_mg24.webp
createdAt: '2026-03-03'
updatedAt: '2026-03-03'
---

## Overview

The Silicon Labs Arduino Core brings the power of Silicon Labs' professional-grade wireless SoCs to the accessible Arduino ecosystem. By bridging the gap between the Silicon Labs Gecko SDK (GSDK) and the Arduino API, this project enables developers to build sophisticated IoT devices using familiar tools. It specifically targets the EFR32 and MGM24 series of microcontrollers, which are renowned for their high-performance radio capabilities and energy efficiency.

## Key Features and Radio Protocols

One of the most innovative aspects of this core is its flexible approach to wireless connectivity. Through a dedicated "Protocol Stack" menu in the Arduino IDE, developers can select the specific radio implementation required for their project:

- **Matter**: This variant includes the full Matter and OpenThread stacks, allowing devices to join the unified smart home ecosystem. It is the recommended choice for building Matter-compliant lights, sensors, and controllers.
- **BLE (Arduino)**: Provides a compatibility layer for the standard `ArduinoBLE` library, making it easy to port existing Bluetooth Low Energy sketches to Silicon Labs hardware.
- **BLE (Silabs)**: Exposes the native Silicon Labs Bluetooth stack and BGAPI, offering advanced control for developers who need specific Bluetooth features not covered by the standard Arduino library.
- **None**: A "radioless" mode that disables the wireless hardware to maximize available Flash and RAM for standard microcontroller tasks.

## Supported Hardware

The core supports a wide range of development boards and modules, including:
- **Arduino Nano Matter**: The flagship board for Matter development within the Arduino lineup.
- **Silicon Labs xG24 and xG27 Dev Kits**: Professional-grade development platforms for EFR32 wireless SoCs.
- **SparkFun Thing Plus Matter (MGM240P)**: A popular Feather-compatible board for IoT prototyping.
- **Seeed Studio XIAO MG24**: A compact form-factor module suitable for wearable and space-constrained applications.

## Technical Architecture

Under the hood, the core is built upon the Silicon Labs Gecko SDK. For complex protocol stacks like Matter, the system utilizes the **FreeRTOS** kernel to manage multi-threaded operations, ensuring that time-critical wireless tasks are handled reliably alongside user code. The core also integrates **LwIP** for networking and **OpenThread** for mesh connectivity in Matter-over-Thread applications.

## Integrated Libraries and AI/ML

The core comes bundled with several specialized libraries designed to take advantage of Silicon Labs' hardware features:
- **SilabsTFLiteMicro**: An implementation of TensorFlow Lite for Microcontrollers, enabling edge AI capabilities like gesture recognition or voice activity detection.
- **ArduinoLowPower**: Provides easy access to the advanced energy-saving modes of the EFR32 series.
- **ezBLE**: A user-friendly library for simplified Bluetooth data exchange.
- **WatchdogTimer**: Ensures system reliability by monitoring for software hangs.

## Additional APIs

Beyond the standard Arduino functions, the core provides several hardware-specific APIs for better system control:

```cpp
void setup() {
  Serial.begin(115200);
  
  // Get unique device information
  Serial.print("Device ID: ");
  Serial.println(getDeviceUniqueIdStr());
  
  // Monitor internal hardware
  Serial.print("CPU Temperature: ");
  Serial.print(getCPUTemp());
  Serial.println(" C");
  
  // Check memory usage
  Serial.print("Free Heap: ");
  Serial.println(getFreeHeapSize());
}
```

## Debugging and Development

To support professional development workflows, the core includes built-in support for hardware debugging. Most Silicon Labs boards feature an onboard SEGGER J-Link debugger, which can be used directly from the Arduino IDE 2.x. For boards like the Nano Matter, OpenOCD support is provided via the Atmel SAMD11 board controller, allowing for real-time breakpoints and variable inspection.
