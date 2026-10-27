---
title: ESP32 AirPlay 2 Surround
summary: An open-source audio receiver firmware for ESP32-S3 microcontrollers that
  decodes and plays wireless 5.1 and 7.1 multichannel surround streams from Apple
  TV over AirPlay 2. Running on FreeRTOS and ESP-IDF with LwIP networking, each board
  synchronizes via Precision Time Protocol (PTP) and efficiently isolates and outputs
  a single target channel to an I2S DAC or amplifier.
slug: esp32-airplay-2-surround
codeUrl: https://github.com/Kristian8606/esp32-airplay2-surround
version: v4.5.5-aac32
lastUpdated: '2026-10-26'
image: /202610/esp32-airplay2-surround_0.avif
rtos: freertos
libraries:
- lwip
isShow: true
createdAt: '2026-10-27T00:54:20+00:00'
updatedAt: '2026-10-27T00:54:20+00:00'
---

Building a synchronized wireless home cinema setup usually requires proprietary, expensive audio gear. **ESP32 AirPlay 2 Surround** takes a distinct approach: it leverages standard ESP32-S3 development boards to construct a synchronized 5.1 or 7.1 wireless surround sound speaker setup driven directly by an Apple TV.

### The Multichannel Architecture

Apple TV can broadcast multichannel surround streams over AirPlay 2, but only to endpoints that explicitly announce surround support. When streaming surround audio, Apple TV sends the entire multichannel stream to every receiving unit in the playback group. Synchrony across the network is maintained through the Precision Time Protocol (PTP), which keeps every receiver locked to the same clock.

Driving eight discrete speaker outputs from a single microcontroller is impractical, but driving a single speaker from a dedicated board is well within the capabilities of the dual-core ESP32-S3. By placing one ESP32-S3 board inside each active speaker or amplifier enclosure, the system functions as a distributed array:

- **Universal Broadcast:** Every board advertises support for 5.1 and 7.1 AAC-LC alongside stereo ALAC and AAC profiles.
- **Targeted Decoding:** While the bitstream for all channels is parsed, only the selected speaker channel is inverse quantised and synthesized. This optimization reduces CPU overhead to roughly a third of a single core instead of stalling the processor.
- **Mono-Duplicated Output:** The decoded channel is copied to both I2S slots (L = R) so that either output can drive an amplified speaker, or both channels can feed dual drivers or an active subwoofer.
- **Independent Nodes:** The ESP32 nodes never communicate with one another. Timing is locked via Apple TV's PTP master clock, allowing seamless addition of surrounds, a center channel, or a subwoofer at any time.

### Audio Pipeline and Codec Handling

Multichannel streams are decoded using a modified build of Fraunhofer FDK AAC that outputs signed 32-bit PCM audio, converted directly into 32-bit floating-point samples. Lossless ALAC playback is handled via Espressif's ALAC decoder, allowing 24-bit samples to flow straight into the floating-point DSP pipeline without downsampling.

Supported audio configurations include:

- **Realtime UDP (type 96):** ALAC 16-bit at 44.1 kHz (stereo, 352 frames/packet)
- **Buffered TCP (type 103):** ALAC 16-bit / 44.1 kHz, ALAC 24-bit / 48 kHz, and AAC-LC 44.1 / 48 kHz (stereo, 1024 frames/packet)
- **Multichannel Buffered TCP (type 103):** AAC-LC 48 kHz 5.1 (6 channels) and 7.1 (8 channels)

The receiver tracks dynamic format switches over buffered TCP via SSRC identifiers without requiring a full RTSP renegotiation. When sample rate shifts occur between 44.1 kHz and 48 kHz, the I2S hardware clock re-anchors to the new RTP timeline.

### Speaker Assignment and Configuration

Speaker roles are assigned by name rather than hardcoded channel indices, providing interchangeable assignments between 5.1 and 7.1 formats:

- **Front Left / Front Right (L / R):** Main stereo staging
- **Centre (C):** Primary dialogue delivery
- **Subwoofer (LFE):** Low-frequency effects track
- **Side Left / Side Right (Ls / Rs):** 5.1 surround pair and 7.1 side staging
- **Rear Left / Rear Right (Lrs / Rrs):** 7.1 back surround positioning
- **Mono Mix:** Full decode combining non-LFE channels

Assignments can be selected at compile time via `menuconfig` or altered on the fly without a device reboot using the onboard web UI at `/eq`.

### Hardware Requirements and Core Task Allocation

The firmware is built using **ESP-IDF v6.0.2** and targets the **ESP32-S3** with **8 MB flash** and **8 MB octal PSRAM**. The extra memory bandwidth is critical, as buffered TCP streams maintain a 6 MB compressed audio ring buffer in external PSRAM alongside audio decoder scratchpads.

Workloads are balanced across both Xtensa LX7 processor cores to maintain clean real-time playback:

- **Core 0:** FDK AAC decoding tasks, RTSP control protocol processing, and PTP synchronization.
- **Core 1:** Wi-Fi driver, LwIP TCP/IP stack execution, AAC TCP socket reader, I2S output driver, status monitoring, and LED tasks.

Output audio flows via standard I2S pins (defaulting to BCLK on GPIO 5, LRCK/WS on GPIO 6, and DATA on GPIO 4) to an external I2S DAC or I2S Class-D amplifier module. Optional peripherals include a WS2812 status/VU LED, mute/power control GPIOs, and local playback control buttons.
