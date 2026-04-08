---
title: ESPer CDP
summary: An ESP32-based high-performance CD player firmware and hardware project that
  interfaces with IDE-based CD-ROM drives. It features a sophisticated audio path
  using the PCM5102 DAC and Wolfson WM8805, running on FreeRTOS with extensive use
  of PSRAM for audio buffering.
slug: esper-cdp
codeUrl: https://github.com/vladkorotnev/cd-player
version: v1.2.6
lastUpdated: '2025-06-10'
image: /202604/cd-player_0.avif
rtos: freertos
libraries:
- esp32-targz
topics:
- a2dp
- cd
- cd-audio
- cd-player
- esp32
- internet-radio
- internet-radio-player
- iot
- music-player
- platformio
isShow: true
createdAt: '2026-04-07T23:30:42+00:00'
updatedAt: '2026-04-07T23:30:42+00:00'
---

The ESPer CDP project bridges the gap between vintage optical media and modern microcontroller capabilities. At its core, it is a DIY CD player built around the ESP32, specifically designed to interface with standard IDE-based CD-ROM drives. This isn't just a simple controller; it's a full-featured audio playback system that leverages the ESP32’s processing power to handle digital audio streams with high fidelity.

### High-Fidelity Audio Path

The project places a significant emphasis on audio quality. Instead of relying on the ESP32's internal DAC, which is often insufficient for audiophile-grade playback, the ESPer CDP utilizes a dedicated PCM5102 DAC. To handle digital audio signals effectively, the design incorporates a Wolfson WM8805 S/PDIF transceiver. This combination allows for precise clocking and low-jitter audio output, making it a serious contender for high-quality home audio setups.

### Hardware and Interfacing

The hardware architecture is quite sophisticated. It uses an IDE bus to communicate with CD-ROM drives, a feat managed by the ESP32 despite the high pin count typically required for parallel communication. To expand the available I/O, the project employs two PCA9555D I/O expanders. 

The user interface is equally impressive, featuring a Futaba GP1232A02 VFD (Vacuum Fluorescent Display) which provides that classic high-end audio equipment aesthetic. Control is handled through a custom keypad PCB featuring eight 12x12mm buttons and support for a PS2 DVD remote via an IR receiver.

### Firmware and Memory Management

On the software side, the firmware is built using a hybrid approach, combining the robust ESP-IDF framework with the Arduino environment. Since audio buffering and processing are memory-intensive, the project requires an ESP32-WROVER module with at least 4MB of PSRAM. 

The firmware utilizes custom forks of the ESP32-A2DP and ArduinoAudioTools libraries to manage the data flow from the CD drive to the DAC. It also integrates the libhelix MP3/AAC decoder and the `esp32-targz` library for filesystem operations, ensuring that the system can handle various data formats and compressed archives if needed.

### Technical Configuration

The project's build system is managed via PlatformIO and CMake, with specific optimizations for the ESP32 platform. The configuration reveals a focus on performance, with the FreeRTOS tick rate set to 1000Hz (via `CONFIG_FREERTOS_HZ`) to ensure responsive task switching during real-time audio playback. The use of PSRAM is critical here, as it provides the necessary headroom for large audio buffers, preventing playback stutters that could occur during drive seek operations or heavy processing tasks.

### Components and BOM

For those looking to replicate the build, the project provides a rough Bill of Materials (BOM) including:
- **ESP32-WROVER (REV3+)**: With 8MB QIO Flash and 4MB QIO PSRAM.
- **Wolfson WM8805**: A high-performance S/PDIF transceiver.
- **PCM5102**: A 24-bit stereo DAC.
- **Futaba GP1232A02**: A VFD display for the track information and UI.
- **PCA9555D**: I2C I/O expanders for managing the IDE bus and keypad.
