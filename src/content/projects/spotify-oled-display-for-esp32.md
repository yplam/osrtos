---
title: Spotify OLED Display for ESP32
summary: This project displays real-time Spotify track information and synchronized
  lyrics on a 1.3" OLED display using an ESP32. It utilizes a Python backend to bridge
  Discord's Rich Presence data and fetches lyrics from the LRCLIB API, featuring a
  custom UI with animations and a progress bar.
slug: spotify-oled-display-for-esp32
codeUrl: https://github.com/EkiZR/Spotify-ESP32
lastUpdated: '2026-05-23'
rtos: ''
libraries:
- u8g2
topics:
- arduino
- discord-bot
- esp32
- iot
- lyrics
- spotify
isShow: false
createdAt: '2026-10-06T01:36:03+00:00'
updatedAt: '2026-10-06T01:36:03+00:00'
---

Building a dedicated hardware display for music adds a tactile dimension to the digital listening experience. This project creates a real-time "Now Playing" dashboard for Spotify using an ESP32 and a 1.3-inch SH1106 OLED display. Beyond simply showing the track title and artist, the system features synchronized lyrics, an animated idle expression system, a music progress bar, and an on-screen equalizer visualization.

### System Architecture

The project uses a clever multi-stage pipeline to bypass the complexities of direct Spotify API integration. Instead of authenticating directly with Spotify on the microcontroller, it leverages Discord's Rich Presence feature. When you play a track on Spotify, Discord automatically broadcasts the metadata. 

A Python-based Discord bot acts as the bridge, capturing this presence data and serving it through a local HTTP JSON API. This backend also fetches timestamped lyrics from the LRCLIB database. The ESP32 then polls this local server every two seconds, parsing the JSON payload to update the OLED display. This approach simplifies the networking requirements for the ESP32 and allows the Python backend to handle the heavy lifting of data scraping and lyric synchronization.

### Hardware and Graphics

The hardware setup is centered around the ESP32 DevKit and a 128×64 SH1106 OLED screen connected via I2C. The firmware utilizes the high-performance **U8g2** library for graphics rendering, which is essential for managing the smooth scrolling of lyrics and the animated UI elements. 

Because the ESP32 needs to handle network requests and complex JSON parsing simultaneously, memory management is a key consideration. The project documentation suggests using the "Huge APP" partition scheme in the Arduino IDE to accommodate the flash requirements of the cryptographic blocks and JSON buffers used in the firmware.

### Firmware Implementation

The ESP32 firmware is written in C++ and handles several critical tasks:
- **WiFi Connectivity**: Establishing a stable link to the local network.
- **HTTP Polling**: Fetching track data from the Python API endpoint.
- **JSON Parsing**: Using the ArduinoJson library to extract track position, duration, and lyric lines.
- **Dynamic Rendering**: Calculating the precise timing for lyric highlights and progress bar movement.

```cpp
// Example configuration in esp32.ino
const char* WIFI_SSID  = "Your_WiFi_Network_Name";
const char* WIFI_PASS  = "Your_WiFi_Password";
const char* SERVER_URL = "http://192.168.3.37:3000/now-playing";
```

### Backend Setup

The Python backend (`bot.py`) is designed to run on a PC or a VPS for 24/7 uptime. It requires `discord.py` and `aiohttp`. Users must create a Discord Application and Bot via the Developer Portal to acquire a token and enable the necessary "Presence" and "Server Members" intents. This allows the bot to monitor the user's Spotify activity in real-time. The backend also includes a `LYRIC_LEAD` offset setting, which can be adjusted to deliver lyrics slightly early to account for network latency, ensuring the display remains perfectly in sync with the audio.
