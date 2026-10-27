---
title: jRadio
summary: jRadio is an all-in-one open-source audio player firmware for the ESP32-S3
  microcontroller, supporting internet radio, local audio from USB and SD storage,
  DLNA media servers, Yandex Music, and FM radio. Built on ESP-IDF and FreeRTOS, it
  utilizes LVGL for graphical displays and lwIP for networking. The system features
  a responsive web interface, infrared remote learning, alarms, and browser-based
  OTA configuration.
slug: jradio
codeUrl: https://github.com/jmper-ha/jradio
siteUrl: https://jmper-ha.github.io/jradio/
version: v1.8.9
lastUpdated: '2026-10-24'
rtos: freertos
libraries:
- littlefs
- lvgl
- lwip
topics:
- bluetooth
- dlna-player
- esp32-s3
- pcm1808
- pcm5102
- radio-player
- rda5807fp
- rda5807m
- usb
- usb-host-msc
- yandex-music
isShow: true
image: /202610/jradio.webp
createdAt: '2026-10-27T03:57:22+00:00'
updatedAt: '2026-10-27T03:57:22+00:00'
---

## An All-in-One Embedded Audio Station

jRadio transforms an ESP32-S3 module into a feature-packed audio workstation. Rather than requiring specialized single-purpose commercial hardware or multi-board setups, jRadio consolidates internet radio streaming, FM radio reception, network audio streaming (DLNA and Yandex Music), and local music playback from USB flash drives or microSD cards into a single cohesive player.

Designed to be built using readily available off-the-shelf components, jRadio is fully controllable via hardware rotary encoders, pushbuttons, infrared remotes, or directly through a web browser on a phone or desktop within the local network.

## Playback Sources and Format Support

jRadio supports a wide array of multimedia inputs and container formats:

- **Internet Radio:** Manages up to 99 customizable radio stations with ICY stream metadata, album art parsing, and automatic reconnection on dropped connections over HTTP and HTTPS.
- **Local File Playback:** Reads audio files from USB Mass Storage (via USB Host) and microSD cards formatted in FAT16/FAT32. It supports `.m3u`, `.m3u8`, and `.pls` playlists as virtual folders, alongside `.cue` sheet splitting for single-file album rips.
- **Audio Codecs:** Plays MP3, AAC (ADTS streams), FLAC (including 24-bit streams), Ogg (FLAC, Vorbis, or Opus containers), and 16-bit uncompressed WAV files.
- **Network Media & Cloud:** Features integrated DLNA client capabilities with SSDP/SOAP discovery to browse local media servers, as well as native integration with Yandex Music (including personalized streams like "My Wave" and track feedback).
- **FM Tuner Support:** Supports RDA5807FP (I2S audio) and RDA5807M FM tuner modules with RDS station identification, radiotext display, frequency scanning, and preset management.
- **Bluetooth Link:** Integrates with an auxiliary ESP32 Bluetooth module running companion firmware for bidirectional audio (streaming from phones with track metadata and outputting to wireless speakers or headphones).

## Hardware and Display Architecture

The firmware is targeted at the ESP32-S3 with 16 MB of Flash and 8 MB of octal PSRAM. Audio rendering is driven via I2S to external high-fidelity DACs such as the PCM5102, outputting 16-bit stereo audio with optional hardware amplifier mute control.

Visuals and user interaction are powered by LVGL v9, allowing high-performance UI rendering on SPI displays with orientation adaptability (portrait or landscape). Supported controller chips include:

- ILI9341 and ST7789 (320×240)
- ILI9488 and ST7796S (480×320)
- ST7789 ultra-wide displays (320×170, 1.9" modules)

jRadio allocates dedicated PSRAM memory pools (`lvgl_pool`) to keep graphics rendering smooth while maintaining enough dynamic headroom for network buffers, SSL handshakes, and audio decoders.

## Software Design and Key Technologies

Developed under the ESP-IDF framework (v5.5.x) on top of FreeRTOS, jRadio uses a highly modular component architecture:

- **FreeRTOS & lwIP:** Manages concurrent networking, web socket communication, audio stream fetching, and GUI tasks without audio stutter.
- **LittleFS & NVS:** Stores configuration parameters, station metadata, Wi-Fi credentials, and learned IR codes in non-volatile flash memory.
- **Embedded Web Server:** Hosts a complete web UI providing real-time player controls, station list management with Radio Browser catalog search, icon fetching, system backup/restore, and remote control training.
- **Everyday Utility Features:** Includes clock synchronization via NTP or RTC hardware (DS3231/DS1307), weather reporting (Open-Meteo, wttr.in, or OpenWeatherMap), screensavers, deep-sleep standby, sleep timers, and weekday alarms that automatically wake the unit.

## Web-Based Flashing and Provisioning

jRadio offers browser-based installation and configuration without requiring local toolchains. Users can select their display type, pinouts, and optional peripheral modules through a web tool using Web Serial to flash the firmware directly to the ESP32-S3 and configure initial Wi-Fi credentials via Improv Wi-Fi serial provisioning. For developers, standard ESP-IDF compilation and custom board configurations are maintained through dedicated CMake components and header definitions.
