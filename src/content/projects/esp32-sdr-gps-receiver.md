---
title: ESP32 SDR GPS Receiver
summary: A software-defined GPS receiver implemented on the ESP32 platform, utilizing
  the MAX2769 RF frontend for raw signal capture. It performs all GPS signal processing
  on-chip and features a graphical user interface built with LVGL for satellite tracking
  and status monitoring.
slug: esp32-sdr-gps-receiver
codeUrl: https://github.com/iliasam/ESP32_SDR_GPS
siteUrl: https://habr.com/ru/articles/789382/
lastUpdated: '2024-03-06'
licenses:
- MIT
rtos: freertos
libraries:
- lvgl
- lwip
topics:
- dsp
- esp32
- gps
- lvgl
- sdr
isShow: true
image: /202603/esp32_sdr_gps.webp
createdAt: '2026-03-31T09:33:34+00:00'
updatedAt: '2026-03-31T09:33:34+00:00'
---

Traditional GPS receivers are often treated as "black boxes" that output NMEA sentences over a serial port, hiding the complex mathematics of signal acquisition and tracking. The ESP32 SDR GPS project breaks this convention by implementing the entire signal processing chain—from raw radio frequency (RF) samples to a position fix—directly on the ESP32 microcontroller. This project serves as a powerful demonstration of the ESP32's digital signal processing capabilities, proving that a general-purpose MCU can handle the intensive demands of a Software Defined Radio (SDR) GPS receiver.

### Hardware Architecture

The project is designed around the ESP32-2432S024C development board, commonly known in the maker community as the "Cheap Yellow Display" (CYD). This board integrates an ESP32 with a 2.4-inch ILI9341 SPI display and a CST820 capacitive touchscreen. To bridge the gap between the digital MCU and the analog GPS satellite signals, the system uses the MAX2769 RF frontend. 

The connection is straightforward: the MAX2769 provides the raw I/Q samples to the ESP32 via SPI. Specifically, the CLKOUT from the MAX2769 drives the SPI clock, while the signal data is fed into the ESP32's MOSI pin. This setup allows the ESP32 to capture the high-frequency bitstream required for GPS correlation and decoding.

### Software and Signal Processing

Running on ESP-IDF 5.0 and backed by FreeRTOS, the firmware utilizes -O2 optimization to meet the real-time requirements of signal processing. The software architecture leverages components from well-known GNSS projects like RTKLIB and GNSS-SDRLIB, adapted specifically for the ESP32's architecture. 

One of the most impressive aspects of this project is that all "raw" signal processing happens on-chip. This includes searching for satellite signals, tracking the carrier and code phases, and decoding the navigation message. Because these tasks are computationally expensive, the project provides a graphical interface where users can manually enter PRN (Pseudo-Random Noise) codes for four satellites to focus the receiver's resources. Users can also input Doppler frequency offsets to significantly accelerate the signal acquisition process.

### User Interface and Interaction

The user interface is built using the LVGL (Light and Versatile Graphics Library) version 8.3.0. It provides a clean, touch-driven environment for monitoring the receiver's status. Through the GUI, users can see real-time feedback on satellite tracking and signal strength. The integration of the `lvgl_esp32_drivers` ensures smooth performance on the ILI9341 display, while the capacitive touch interface makes it easy to interact with the system without needing external buttons or a computer terminal.

### Technical Specifications

The project makes efficient use of the ESP32's memory, utilizing approximately 74% of the available static DRAM (134 KB) and 45% of the static IRAM (58 KB). The total flash image size is roughly 547 KB, which includes the application logic, the LVGL library, and the necessary drivers for the display and RF frontend. This footprint demonstrates that even complex SDR applications can fit comfortably within the constraints of modern microcontrollers when properly optimized.
