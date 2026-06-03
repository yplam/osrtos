---
title: DS323x_Generic
summary: A comprehensive Arduino library for DS3231 and DS3232 extremely accurate
  I2C real-time clocks. It provides a unified API for timekeeping, alarms, and square
  wave generation across a vast range of hardware architectures including ESP32, STM32,
  nRF52, and RP2040.
codeUrl: https://github.com/khoih-prog/DS323x_Generic
siteUrl: https://github.com/khoih-prog/DS323x_Generic
isShow: false
rtos: ''
libraries:
- littlefs
- lwip
topics:
- alarm
- ds323x
- esp32
- esp8266
- ethernet-generic
- littlefs
- nano-rp2040-connect
- nrf52
- ntp
- ntp-client
- ntp-server
- portenta-h7
- rp2040
- rpi-pico
- rtc
- samd
- spiffs
- stm32
- time
- timezone
star: 12
version: v1.3.1
lastUpdated: '2022-12-05'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- timezone-generic-library
- ds3231-rtc-driver-for-rt-thread
- multiresetdetector-generic-library
- doubleresetdetector-generic
- elekstube-ips-custom-firmware
- rx8900-high-precision-rtc-driver-for-rt-thread
---

The DS3231 and DS3232 are staples in the embedded world for a reason: they are low-cost, extremely accurate I2C real-time clocks (RTC) featuring an integrated temperature-compensated crystal oscillator (TCXO). However, as the Arduino ecosystem has expanded far beyond the original AVR chips, developers often struggle with library compatibility across different architectures. The **DS323x_Generic** library solves this by providing a robust, cross-platform implementation that works seamlessly on everything from an ESP32 to a Raspberry Pi Pico.

### Why Use DS323x_Generic?

While many RTC libraries exist, this "Generic" version is specifically designed to handle the nuances of modern hardware. It doesn't just support the basic time-reading functions; it integrates deeply with various storage methods and connectivity shields. Whether you are using a built-in WiFi module on an ESP8266 or an external ENC28J60 Ethernet shield on an nRF52, this library provides the scaffolding needed to keep your system time synchronized with NTP servers and maintained by the hardware RTC during power loss.

### Extensive Hardware Support

One of the most impressive aspects of this project is its broad compatibility list. It supports:
- **Espressif**: ESP8266 and ESP32 (including S2, S3, and C3 variants).
- **ARM Cortex-M**: SAMD21/SAMD51, STM32 (F1, F3, F4, H7, etc.), and nRF52 boards.
- **RP2040**: Raspberry Pi Pico and Arduino Nano RP2040 Connect using both Mbed and Earle Philhower cores.
- **Teensy**: Versions 3.x and 4.x.
- **Legacy**: Standard Arduino AVR and MegaAVR boards.

### Getting Started

Using the library is straightforward. It follows the familiar `Wire` interface for I2C communication. Below is a basic example of how to initialize the RTC and read the current timestamp:

```cpp
#include <DS323x_Generic.h>

DS323x rtc;

void setup()
{
  Serial.begin(115200);
  Wire.begin();
  rtc.attach(Wire);
  
  // Manually set the time: Year, Month, Day, Hour, Minute, Second
  rtc.now(DateTime(2023, 10, 27, 12, 0, 0));
}

void loop()
{
  DateTime now = rtc.now();
  Serial.println(now.timestamp());
  delay(1000);
}
```

### Advanced Features: Alarms and Square Waves

The DS323x series is more than just a clock; it includes programmable alarms and a square wave output pin. This library exposes these features through a clean API. You can configure the square wave frequency (1Hz, 1.024kHz, 4.096kHz, or 8.192kHz) or set up alarms to trigger interrupts on specific time matches. This is particularly useful for low-power applications where the RTC can wake up a sleeping microcontroller at a specific interval.

### Integration with NTP and Timezones

A common use case for this library is creating a self-correcting clock. By combining this library with the `Timezone_Generic` library, you can fetch UTC time from an NTP server via WiFi or Ethernet, apply local timezone rules (including Daylight Savings Time), and then update the DS323x hardware. This ensures that even if the network is lost, the device continues to track the correct local time with high precision.

### Installation

The library is available via the Arduino Library Manager—simply search for "DS323x_Generic". For PlatformIO users, you can add it to your `platformio.ini` dependencies. The repository also includes a variety of patches for specific core versions to ensure that even the most complex board configurations compile without errors.
