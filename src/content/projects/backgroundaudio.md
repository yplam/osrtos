---
title: BackgroundAudio
summary: An optimized Arduino library for background audio playback and speech synthesis
  on Raspberry Pi Pico (RP2040/RP2350) and ESP32. It uses an interrupt-driven architecture
  to support MP3, AAC, WAV, and text-to-speech while keeping the main application
  loop responsive and dropout-free.
slug: backgroundaudio
codeUrl: https://github.com/earlephilhower/BackgroundAudio
siteUrl: https://earlephilhower.github.io/BackgroundAudio/
version: 1.4.4
lastUpdated: '2025-10-31'
licenses:
- GPL-3.0
rtos: freertos
libraries:
- littlefs
topics:
- aac
- arduino-library
- esp32
- espeak
- espeak-ng
- mp3
- pico
- raspberry-pi-pico
- rp2040
- rp2350
- tts
- wav
isShow: true
image: /boards/pico2.webp
createdAt: '2026-04-28T23:53:54+00:00'
updatedAt: '2026-04-28T23:53:54+00:00'
---

Playing audio on a microcontroller often presents a classic scheduling challenge: how do you decode complex formats like MP3 or HE-AAC while simultaneously managing a web server, handling user input, or reading from an SD card? BackgroundAudio is a high-performance Arduino library designed to solve this by moving the heavy lifting of audio decoding and output into the background.

Built as a streamlined successor to the popular ESP8266Audio library, BackgroundAudio targets the Raspberry Pi Pico (RP2040), the newer Pico 2 (RP2350), and the ESP32. It provides a simple "fire and forget" interface where the main application simply pushes raw data into a buffer, and interrupt-driven routines handle the timing-critical task of feeding the I2S, PWM, or Bluetooth A2DP hardware.

### The Interrupt-Driven Advantage

Traditional audio libraries often process data within the main loop or a standard RTOS task. This can lead to audible dropouts if the processor gets bogged down by a slow filesystem read or a blocking network request. BackgroundAudio shifts the decoding process to interrupt (IRQ) level. Because the playback routine manages its own source buffer, the application only needs to ensure that data is provided faster than it is consumed.

This architecture is efficient enough that an original Raspberry Pi Pico can easily stream MP3 web radio stations over HTTPS—a task that usually requires significant optimization due to the overhead of software-based decryption. The Pico 2, with its higher clock rate and improved instruction-per-clock (IPC), can even handle demanding HE-AAC streams under the same conditions.

### Hardware and Output Support

The library is versatile in how it outputs sound. It supports:
- **I2S**: The standard for external DACs.
- **PWMAudio**: High-quality PWM output directly from GPIO pins (popular on the Pico).
- **Bluetooth A2DP**: Streaming decoded audio to Bluetooth speakers or headphones (on supported hardware).

For ESP32 users, the library includes a specialized `ESP32I2SAudio` wrapper that utilizes the latest ESP-IDF 5.x I2S APIs, ensuring compatibility with modern development environments and improved stability compared to older Arduino I2S implementations.

### Integrated Speech Synthesis

Beyond just playing files, BackgroundAudio integrates the ESpeak-NG engine, allowing for real-time text-to-speech. This is particularly useful for UI feedback, such as a reaction timer that speaks the user's score or a serial-to-speech interface. Because it shares the same background architecture, speech synthesis doesn't block your code, allowing for dynamic voice changes and interruptions on the fly.

### Simple Application Integration

Integrating the library involves instantiating a playback object and feeding it data. The following example demonstrates how to play an MP3 file from a filesystem like LittleFS while keeping the main loop free to handle button presses:

```cpp
#include <BackgroundAudio.h>
#include <LittleFS.h>

PWMAudio pwm(0); // Output on pin 0
BackgroundAudioMP3 mp3(pwm);
File f;

void setup() {
    LittleFS.begin();
    mp3.begin();
}

void loop() {
    // Fill the playback buffer if space is available
    while (f && mp3.availableForWrite() > 512) {
        byte buffer[512];
        int len = f.read(buffer, 512);
        mp3.write(buffer, len);
        if (len < 512) f.close();
    }

    // The main loop remains responsive for UI and logic
    if (buttonPressed) {
        f = LittleFS.open("/alert.mp3", "r");
    }
}
```

### Performance and Licensing

The library is highly optimized, especially when compiled with `-O3` settings. On a Pico 2, MP3 decoding takes roughly 527 cycles per sample, while the more complex HE-AAC takes about 1486 cycles. 

It is important to note the licensing of the underlying codecs: MP3 decoding uses `libMAD` (GPL), AAC uses the `Helix` project source (RSPL), and speech synthesis is handled via `ESpeak-NG` (GPL3). Developers should ensure compliance with these licenses, particularly regarding AAC patent licensing for commercial products.
