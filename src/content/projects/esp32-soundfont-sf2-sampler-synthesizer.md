---
title: ESP32 SoundFont (SF2) Sampler Synthesizer
summary: A high-performance wavetable synthesizer firmware for ESP32-S3 and ESP32-P4
  microcontrollers that plays SoundFont 2 (SF2) samples. It utilizes PSRAM for large
  sample banks, supports USB MIDI for plug-and-play connectivity, and features real-time
  audio effects like reverb and chorus.
slug: esp32-soundfont-sf2-sampler-synthesizer
codeUrl: https://github.com/copych/ESP32_SF2_Sampler_Synthesizer
lastUpdated: '2026-04-07'
licenses:
- MIT
image: /202604/ESP32_SF2_Sampler_Synthesizer_0.avif
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
createdAt: '2026-04-19T23:06:56+00:00'
updatedAt: '2026-04-19T23:06:56+00:00'
---

The ESP32 SF2 Sampler Synthesizer transforms the ESP32-S3 and ESP32-P4 microcontrollers into powerful, compact wavetable synthesizers capable of playing high-quality SoundFont 2 (SF2) instrument banks. By leveraging the expanded memory capabilities of modern ESP32 variants—specifically Octal SPI (OPI) PSRAM—this project overcomes the memory limitations that previously hindered complex sampling on the ESP32 platform.

At its core, the firmware is designed for real-time performance. It uses the dual-core architecture of the ESP32-S3 to separate audio rendering from control tasks, ensuring low-latency playback. The system functions as a class-compliant USB MIDI device, meaning it can be plugged directly into a computer or a MIDI host and recognized immediately without custom drivers.

### High-Fidelity Audio and Effects

Audio output is handled via I2S, typically paired with an external DAC like the PCM5102. This allows for high-quality audio output far superior to the internal DACs of older ESP32 chips. Beyond simple sample playback, the synthesizer includes a robust processing chain:

- **Per-voice filters**: Configurable biquad low-pass filters (LPF) for each voice.
- **Per-channel control**: MIDI CC#74 and CC#71 mapping for resonance and cutoff.
- **Integrated Effects**: A suite of effects including Reverb (CC#91), Chorus (CC#93), and Delay (CC#95) adds depth and professional polish to the sound.

### Storage and File Management

One of the standout features is the flexible filesystem handling. Users can switch between internal Flash (using LittleFS) and external SD cards (using the high-speed 4-bit SD_MMC interface) at runtime. This allows for a massive library of SF2 files to be stored on an SD card, while keeping essential "boot" sounds on the internal flash. The firmware includes a simple yet effective navigation system: the BOOT button on the development board cycles through files, and a long press switches between the flash and SD storage.

### Hardware Integration

For those looking for a more tactile experience, the project supports an optional OLED GUI powered by the U8g2 library. This interface, combined with a rotary encoder and a dedicated button, allows users to navigate instrument banks and adjust settings without needing a computer. The hardware setup is designed to be minimal, requiring only a few connections for the DAC, SD card, and optional display.

### Technical Setup and Configuration

Building the project requires the Arduino IDE with specific configurations to unlock the hardware's potential. Crucially, the PSRAM must be set to OPI mode to provide the bandwidth necessary for multi-voice wavetable synthesis. The partition scheme should be adjusted to maximize space for SF2 files if using internal storage. 

#### I2S DAC (PCM 5102) Pin Connections

| Signal | GPIO Pin |
|--------|----------|
| BCK    | GPIO5    |
| DTA    | GPIO6    |
| WCK    | GPIO7    |
| CS     | GND      |

This project represents a significant step forward for DIY audio on the ESP32, providing a "cheap and simple, yet powerful" alternative to dedicated hardware samplers. It is an ideal solution for musicians and makers looking to build custom MIDI instruments or compact sound modules.
