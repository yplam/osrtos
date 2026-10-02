---
title: TYPE-2 Autonomous Polyphonic Synthesizer
summary: The TYPE-2 is an ESP32-S3-based polyphonic synthesizer featuring a custom
  hybrid dual-rate DSP engine and analog-modeled filters. It utilizes FreeRTOS for
  task management, I2S for high-fidelity audio, and capacitive touch for a responsive
  user interface.
slug: type-2-autonomous-polyphonic-synthesizer
codeUrl: https://github.com/Alxdreee/TYPE-2
version: v1.0.0
lastUpdated: '2026-08-30'
licenses:
- GPL-3.0
image: /202609/TYPE-2_0.avif
rtos: freertos
libraries:
- platformio-platformio-core
topics:
- audio
- diy
- diy-electronics
- diy-project
- dsp
- esp32
- i2s
- mpr121
- music
- synth-diy
- synthesizer
isShow: true
createdAt: '2026-09-17T01:48:51+00:00'
updatedAt: '2026-09-17T01:48:51+00:00'
relatedProjects:
- esp32-custom-hardware-synthesizer
- esp32-s3-soundfont-sf2-sampler-synthesizer
- esp32-sd-sampler
- esp32-s3-sd-sampler
- esp32-soundfont-sf2-sampler-synthesizer
- digital-synth-pra32-u2
---

The TYPE-2 is a sophisticated DIY synthesizer that brings studio-quality polyphonic synthesis to the ESP32-S3 platform. Developed by Alexandre Esnard, this project stands out for its highly optimized DSP core, achieving complex audio processing that typically requires much more expensive hardware. By leveraging the dual-core capabilities of the ESP32-S3, the TYPE-2 separates its high-frequency audio tasks from its visual interface, ensuring a glitch-free performance even during complex modulation.

### High-Performance DSP Architecture

At the heart of the TYPE-2 is a hybrid DSP engine designed for efficiency and character. It employs a dual-rate processing architecture, which is essential for maintaining audio fidelity while managing the computational load of a 7-voice polyphonic system. The signal chain is impressively deep, featuring a factorized 24dB/Oct Moog Ladder Filter, a tube overdrive simulation based on fast polynomial saturation, and a studio-grade digital delay. This combination allows for a "heavy" sound profile that mimics analog warmth with digital precision.

To achieve this level of performance on a microcontroller, the project utilizes specific hardware features of the ESP32-S3, including the 240MHz CPU frequency and OPI PSRAM. The firmware is engineered to run the DSP engine and display tasks in parallel, ensuring that the audio stream remains uninterrupted even when the UI is rendering complex visualizations.

### Interactive User Interface

The user experience is centered around a unique interface that moves away from standard list-based menus. The TYPE-2 features a cylindrical rotary menu and a responsive topological grid visualization on a 128x64 OLED display. This provides real-time visual feedback of the sound's "shape" and parameters, making the synthesis process more intuitive. 

For input, the project uses MPR121 capacitive touch sensors connected to copper tape. This allows makers to create a custom, flexible keyboard layout that supports both individual notes and chord inputs. The integration of a KY-040 rotary encoder and a tactile navigation button provides precise control over the hierarchical menu system.

### Hardware and Build Process

Designed with accessibility in mind, the TYPE-2 is highly affordable, with a total component cost of approximately €35. It utilizes readily available modules, making it an excellent project for the maker community. The hardware BOM includes:

*   **ESP32-S3**: 16MB Flash and PSRAM are strictly required to handle the audio buffers.
*   **PCM5102A**: An I2S DAC module for high-quality audio output.
*   **SSD1306**: A standard 128x64 OLED display for the UI.
*   **MPR121**: Capacitive touch sensors for the keybed.

The build process is designed to be near-zero difficulty, requiring minimal wiring and no custom PCBs in its initial version, though a custom PCB design is on the project's roadmap.

### Technical Implementation

The firmware is built using the Arduino framework and is compatible with both the Arduino IDE and PlatformIO. It relies on the native ESP32 I2S drivers for audio processing and utilizes the Adafruit GFX and SSD1306 libraries for display management. To ensure the DSP engine runs correctly, specific compiler settings are required, such as enabling USB CDC on boot and configuring the partition scheme to accommodate the FATFS filesystem. 

With a roadmap that includes external MIDI communication, Bluetooth integration, and an arpeggiator, the TYPE-2 is a platform that continues to evolve, pushing the boundaries of what is possible with low-cost embedded hardware in the realm of music synthesis.
