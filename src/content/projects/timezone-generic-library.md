---
title: Timezone_Generic Library
summary: A comprehensive Arduino library for handling timezone conversions and automatic
  Daylight Saving Time (DST) adjustments across a wide range of embedded platforms.
  It supports numerous microcontrollers including ESP32, ESP8266, STM32, and RP2040,
  integrating with various storage and networking modules.
slug: timezone-generic-library
codeUrl: https://github.com/khoih-prog/Timezone_Generic
star: 14
version: v1.10.1
lastUpdated: '2022-11-18'
rtos: mbed-os
libraries:
- littlefs
- spiffs
- lwip
topics:
- alarm
- esp32
- esp8266
- ethernet-generic
- littlefs
- nrf52
- ntp-client
- ntp-server
- portenta-h7
- rp2040
- rpi-pico
- rtc
- rtl8720dn
- sam-due
- samd
- spiffs
- stm32
- time
- timezone
- timezone-generic-library
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- ds323x-generic
- multiresetdetector-generic-library
- onewireng
- esp32-targz
- supladevice-library
- timezones-for-mongoose-os
---

Managing time in embedded systems is notoriously difficult, especially when dealing with Daylight Saving Time (DST) and local offsets. The Timezone_Generic library simplifies this by providing a robust framework for converting Universal Coordinated Time (UTC) to local time. Based on Jack Christensen's original Timezone library, this generic version expands support to a vast ecosystem of modern microcontrollers and networking shields.

## Core Functionality

The primary goal of the library is to take a UTC timestamp—whether sourced from a GPS receiver, an NTP server, or a hardware Real-Time Clock (RTC)—and convert it to the correct local time. It handles the logic of determining whether the system should currently be in Daylight Saving Time (summer time) or Standard Time based on user-defined rules.

The library implements two main objects to facilitate these conversions:
- **TimeChangeRule**: Describes when local time changes (e.g., "the last Sunday in March at 02:00").
- **Timezone**: Uses these rules to perform the actual conversions and provides methods to read or write rules to non-volatile storage.

## Extensive Hardware Support

True to its name, Timezone_Generic is designed to be architecture-agnostic within the Arduino ecosystem. It supports a wide variety of boards, including:
- **ESP32 & ESP8266**: Including variants like the WT32-ETH01.
- **Arm Cortex-M**: Support for SAMD21 (Zero, MKR), SAMD51, and SAM DUE.
- **STM32**: Comprehensive support for F/L/H/G/WB/MP1 series via the STM32duino core.
- **RP2040**: Support for Raspberry Pi Pico and Pico W using both the official Arduino-mbed core and the Earle Philhower arduino-pico core.
- **nRF52**: Adafruit Feather nRF52840 and related Bluefruit modules.
- **Portenta H7**: High-performance support for both Ethernet and WiFi modes.

## Persistence and Storage

A standout feature of this library is its ability to persist timezone rules across reboots. Depending on the hardware platform, the library can interface with various storage backends to save and load `TimeChangeRule` objects:
- **LittleFS & SPIFFS**: Used on ESP32, ESP8266, nRF52, and RP2040.
- **EEPROM**: Standard for AVR, Teensy, and MegaAVR boards.
- **FlashStorage**: Specialized implementations for SAMD, STM32, and RTL8720DN.

## Getting Started

To use the library, developers define rules for their specific locale. For example, a typical configuration for Central European Time might look like this:

```cpp
// Australia Eastern Time Zone (Sydney, Melbourne)
TimeChangeRule aEDT = {"AEDT", Last, Sun, Oct, 2, 660};    // UTC + 11 hours
TimeChangeRule aEST = {"AEST", First, Sun, Apr, 3, 600};    // UTC + 10 hours
Timezone auET(aEDT, aEST);

time_t utc = now();
time_t local = auET.toLocal(utc);
```

The library also provides methods to check if a specific timestamp is in DST (`utcIsDST`), convert local time back to UTC (`toUTC`), and interact with hardware RTCs like the DS3231. By combining this library with an NTP client, developers can ensure their IoT devices maintain perfect local time without manual intervention.
