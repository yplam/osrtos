---
title: DCF77 Transmitter
summary: An ESP8266-based signal generator that synchronizes radio-controlled clocks
  by mimicking the German DCF77 longwave time station. It fetches precise time via
  NTP over Wi-Fi and uses PWM harmonics to broadcast a localized 77.5 kHz signal.
slug: dcf77-transmitter
codeUrl: https://github.com/ORelio/DCF77-Transmitter
lastUpdated: '2024-08-11'
licenses:
- GPL-3.0
image: /202606/DCF77-Transmitter_0.avif
rtos: ''
libraries:
- lwip
topics:
- dcf77
- esp8266
- low-frequency-radio
- time-sig
- time-signals
isShow: true
createdAt: '2026-06-02T09:59:36+00:00'
updatedAt: '2026-06-02T09:59:36+00:00'
relatedProjects:
- atomic-clock-ntp-modification
- esp32fmradio
- esptimecast
- esp-graber
- esp8266-electronic-timekeeper
- esp-ppb
---

The DCF77 time signal is a cornerstone of precise timekeeping in Europe, broadcasting from Mainflingen, Germany, to millions of radio-controlled clocks. However, signal reception can be spotty or non-existent in shielded buildings, basements, or regions outside the transmitter's range. This DCF77-Transmitter project offers a clever solution: using an affordable ESP8266 microcontroller to create a localized "mini-transmitter" that keeps these clocks perfectly synchronized.

### Simulating a Longwave Station
The project functions by bridging the gap between modern internet time protocols and legacy radio hardware. By connecting to a local Wi-Fi network, the ESP8266 fetches high-precision time data via NTP (Network Time Protocol). It then encodes this data according to the DCF77 protocol—a bit-per-second signaling scheme where each minute-long frame contains the current time, date, and parity bits.

The most significant technical hurdle for the ESP8266 is generating the 77.5 kHz carrier frequency required by DCF77 receivers. Due to limitations in the ESP8266 SDK's PWM capabilities, generating a stable 77.5 kHz signal directly is difficult. To overcome this, the project employs a brilliant workaround: running the PWM at 25.833 kHz. This frequency produces a strong third harmonic exactly at 77.5 kHz, which the clock's internal circuitry can detect and decode as a valid time signal.

### Hardware and Antenna Design
Building the transmitter requires minimal components. A standard ESP8266 board, such as the Weimos D1 Mini, serves as the brain. The antenna is a simple coil of magnet wire. Because the goal is short-range transmission—often just a few centimeters to a meter—a small coil of approximately 10 loops is sufficient. A 330 Ohm resistor is used in series with the coil to limit the current to approximately 10mA, protecting the ESP8266's GPIO pins from damage.

### Intelligent Power Management
For users running the transmitter on battery power, the firmware includes an "Intermittent Mode." This mode utilizes the ESP8266's deep sleep functionality, allowing the device to wake up, synchronize via NTP, transmit for a few minutes to update the clock, and then return to a low-power state. 

Since the ESP8266 lacks a high-precision real-time clock (RTC) for deep sleep timing, the project implements a software-based correction factor. This allows users to calibrate for clock drift caused by temperature fluctuations during sleep cycles, ensuring the transmitter wakes up at exactly the right moment to catch the clock's synchronization window.

### Configuration and Setup
The firmware is highly configurable through the Arduino IDE. Users can define Wi-Fi credentials, select specific NTP servers, and set their local time zone using standard POSIX strings. 

```cpp
// NTP configuration
const char* ntp_server = "pool.ntp.org";
const char* time_zone = "CET-1CEST-2,M3.5.0/02:00:00,M10.5.0/03:00:00";
const int ntp_sync_interval_hours = 3;
```

Status monitoring is handled via the built-in LED and serial output, providing real-time feedback on NTP sync status and signal transmission. Whether used to revive a vintage radio-controlled clock or to ensure time consistency across a home, this project provides a robust, low-cost bridge between the internet and the radio-frequency world.
