---
title: ESP32FMRadio
summary: An embedded project that repurposes the ESP32's internal Audio PLL and I2S
  Master Clock to create a functional FM radio transmitter. By dynamically adjusting
  the APLL frequency via a high-resolution timer, it achieves real-time frequency
  modulation of an 8kHz audio signal. The project demonstrates advanced peripheral
  manipulation for RF generation without external transmitter chips.
slug: esp32fmradio
codeUrl: https://github.com/Alexxdal/ESP32FMRadio
star: 37
lastUpdated: '2025-08-06'
rtos: freertos
libraries:
- lwip
topics:
- esp-idf
- esp32
- fm
- fm-transmitter
- hacking
- radio
- transmitter
isShow: false
createdAt: '2026-01-13'
updatedAt: '2026-01-13'
relatedProjects:
- si4732-radio
- fmoto-motorola-fm-transmitter-moto-mod
- tinyradio9-for-wt32-sc01-plus
- esp32-custom-hardware-synthesizer
- espri-esp-radio-interface
- radiojkk32-multifunctional-internet-radio-player
---

## Overview

ESP32FMRadio is a fascinating exploration of the ESP32's hardware capabilities, demonstrating how to transform a standard microcontroller into a functional FM radio transmitter. Rather than relying on external RF hardware or traditional PWM/DAC methods, this project exploits the ESP32’s internal Audio PLL (APLL) and the I2S peripheral’s Master Clock (MCLK) output to generate a high-frequency RF carrier directly on a GPIO pin.

By modulating this carrier with an audio signal in real-time, the ESP32 can broadcast audio—such as the classic Rick Astley "Never Gonna Give You Up"—to any nearby FM radio receiver. This project serves as an excellent case study in advanced peripheral configuration and digital signal processing on the ESP32 platform.

## The Audio PLL and Frequency Synthesis

The heart of the project is the ESP32’s dedicated Audio PLL (APLL). Unlike the standard CPU clock PLLs, the APLL is designed for high-precision audio clock generation and can be tuned to arbitrary frequencies. The project uses a specific formula involving the 40 MHz crystal oscillator (XTAL) and programmable dividers (sdm0, sdm1, sdm2, and o_div) to target a carrier frequency in the commercial FM band, typically around 100 MHz.

To achieve a stable 100 MHz carrier, the system configures the APLL such that the internal Voltage Controlled Oscillator (VCO) operates within its stable range (350 MHz to 500 MHz). By setting `o_div = 0` and adjusting the fractional dividers, the project generates a precise high-frequency clock that serves as the foundation for the FM signal.

## I2S MCLK as an RF Carrier

To output this high-frequency signal to a physical pin, the project repurposes the I2S (Inter-IC Sound) peripheral. While I2S is usually used for digital audio data, it provides a Master Clock (MCLK) output intended for external DACs. By configuring the I2S driver to use the APLL and setting a fixed MCLK frequency, the ESP32 routes the 100 MHz signal to GPIO0.

This is achieved through low-level register manipulation, specifically using `PIN_FUNC_SELECT` to map the `CLK_OUT1` signal to GPIO0. Once configured, GPIO0 outputs a continuous square wave at the target frequency, which acts as the unmodulated RF carrier. A simple wire attached to this pin functions as a low-power antenna.

## Real-Time Frequency Modulation

Frequency Modulation (FM) requires varying the carrier frequency in proportion to the amplitude of an audio signal. ESP32FMRadio achieves this by dynamically updating the APLL's fractional synthesizer (`sdm0`) on the fly. 

**The modulation process follows these steps:**
- **High-Resolution Timer**: An `esp_timer` is configured to trigger at 8000 Hz, matching the sample rate of the source audio.
- **Sample Processing**: In the timer callback, the system reads an 8-bit PCM sample, converts it to a signed value, and scales it based on a pre-calculated deviation constant.
- **PLL Nudging**: The scaled value is added to the base `sdm0` value and written directly to the APLL configuration registers using `clk_ll_apll_set_config`. 

Because the APLL reacts almost instantly to these register changes, the output frequency shifts slightly higher or lower 8,000 times per second, creating a broadcast-quality FM signal.

## Audio Source and Preparation

The project includes a short audio clip embedded directly into the firmware. A WAV file (8-bit mono, 8000 Hz) was converted into a C header array using the `xxd` tool. This approach eliminates the need for external storage or file systems, allowing the modulation timer to read raw PCM bytes directly from memory. The 125 μs period of the high-resolution timer ensures that the audio is "played" at the correct pitch and speed.

## Hardware and Safety Considerations

This project specifically requires the original ESP32 chip (such as the D0WD found in WROOM modules) because newer variants like the ESP32-S2, S3, or C3 do not possess the necessary APLL hardware. 

From an RF perspective, the output is a digital square wave, which naturally contains odd harmonics. While the signal is strongest at the fundamental frequency (e.g., 100 MHz), it also emits energy at higher multiples. Due to the low power of the GPIO output, the range is limited to a few meters, making it a safe and educational demonstration of RF principles within a controlled environment. Users should be aware that GPIO0 is also a strapping pin, so care must be taken not to pull it low during the boot sequence.
