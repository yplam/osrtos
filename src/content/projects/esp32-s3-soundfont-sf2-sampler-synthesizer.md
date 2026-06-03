---
title: ESP32-S3 SoundFont (SF2) Sampler Synthesizer
summary: A high-performance wavetable synthesizer firmware for the ESP32-S3 that enables
  high-quality SoundFont 2 (SF2) playback. It leverages PSRAM for sample loading and
  supports USB MIDI, external I2S DACs, and runtime switching between LittleFS and
  SD card storage.
slug: esp32-s3-soundfont-sf2-sampler-synthesizer
codeUrl: https://github.com/copych/ESP32-S3_SF2_Sampler_Synthesizer
star: 18
lastUpdated: '2025-07-06'
rtos: freertos
libraries:
- littlefs
- u8g2
topics:
- arduino
- esp32
- esp32-s3
- esp32s3
- midi
- midi-device
- sampler
- sf2
- soundfont
isShow: true
image: /202601/sampler-synthesizer.webp
createdAt: '2026-01-21'
updatedAt: '2026-01-21'
relatedProjects:
- esp32-soundfont-sf2-sampler-synthesizer
- esp32-sd-sampler
- esp32-s3-sd-sampler
- esp32-custom-hardware-synthesizer
- esper-cdp
- esp32-host-midi
---

The ESP32-S3 SoundFont (SF2) Sampler Synthesizer is a specialized firmware designed to transform the ESP32-S3 microcontroller into a powerful wavetable instrument. By leveraging the specific hardware advantages of the S3 variant—most notably its expanded PSRAM and native USB capabilities—this project provides a low-cost solution for high-quality audio synthesis.

### Hardware and Memory Management

The core of this synthesizer's performance lies in its use of the ESP32-S3's Octal SPI (OPI) PSRAM. Unlike the original ESP32, the S3's memory architecture allows for efficient loading and streaming of SoundFont 2 banks, which can be quite large. The project is optimized for dual-core operation, ensuring that audio processing and MIDI handling do not interfere with each other.

For audio output, the system interfaces with external I2S DACs, such as the PCM5102. This ensures high-fidelity sound compared to built-in DACs. The wiring is straightforward, typically requiring only a few GPIO pins for the I2S clock and data lines (BCK, DTA, and WCK).

### Versatile Storage and MIDI Control

One of the standout features is the flexible filesystem support. Users can store SF2 files on the internal Flash using LittleFS or on an external microSD card via the fast 4-bit SD_MMC interface. The firmware allows for runtime switching between these storage mediums, often mapped to the physical BOOT button on development boards. A long press on the BOOT button toggles between Flash and SD storage, while a short press cycles through the available SF2 files.

The synthesizer functions as a plug-and-play USB MIDI device using the ESP32-S3's internal USB hardware. It supports a wide range of MIDI controls, including:

- **General MIDI (GM)** compatibility and partial GS/XG support.
- **Per-voice and Per-channel filters**: Configurable low-pass filters and resonance controlled via MIDI CC#74 and CC#71.
- **Integrated Effects**: Built-in support for Reverb (CC#91), Chorus (CC#93), and Delay (CC#95).
- **Drum Support**: Dedicated handling for MIDI channel 10.

### User Interface and Configuration

While the device can operate as a "black box" MIDI module, it also supports an optional GUI. By connecting an OLED display (via I2C) and a rotary encoder with a button, users can navigate through SoundFont banks and adjust settings visually. This interface is powered by the popular U8g2 library. 

Configuration is primarily handled through a `config.h` file, where users can redefine pin assignments for the DAC, SD card, and display to match their specific hardware layout. This makes it highly adaptable to various ESP32-S3 development boards.

### Getting Started with Arduino

Building the project requires the Arduino IDE configured specifically for the ESP32-S3. Key settings include:
- **PSRAM**: Must be set to OPI PSRAM to handle the sample buffers.
- **USB Mode**: Must be set to TinyUSB to enable MIDI device functionality.
- **Partition Scheme**: Requires a scheme with significant space for the filesystem if storing samples in internal Flash.

Because the project relies on LittleFS for internal storage, users must also utilize specific filesystem upload plugins (like the Arduino LittleFS upload plugin) to transfer SF2 files to the device's flash memory. Once configured, the device enumerates as a standard MIDI instrument, ready to be played by any DAW or MIDI controller.
