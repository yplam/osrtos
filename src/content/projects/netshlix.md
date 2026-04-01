---
title: Netshlix
summary: Netshlix is an ESP-IDF-based project that enables high-performance RTP/JPEG
  video streaming on the Smalltv-pro, a compact ESP32-powered display. It features
  a custom, fuzzed RTP/JPEG stack and implements a memory-efficient stripe-based rendering
  system to handle video decoding without a full framebuffer.
slug: netshlix
codeUrl: https://github.com/jo-m/netshlix
lastUpdated: '2025-02-23'
licenses:
- MIT
rtos: freertos
libraries:
- lvgl
- lwip
topics:
- c
- esp-idf
- esp32
- jpeg
- rtp
- rtp-streaming
- videostream
isShow: false
createdAt: '2026-03-31T13:17:04+00:00'
updatedAt: '2026-03-31T13:17:04+00:00'
---

## Streaming Video to the Smalltv-pro

Netshlix is a specialized firmware designed for the Smalltv-pro, a popular miniature monitor based on the ESP32-D0WD-V3 chip. The project allows this tiny device—which features a 240x240 pixel LCD—to act as a remote display for video streams. By utilizing a custom RTP/JPEG stack, Netshlix can receive and decode video frames over a wireless network, effectively turning the Smalltv-pro into a pocket-sized streaming screen.

## Technical Architecture and RFC 2435

At the heart of the project is a roll-your-own RTP/JPEG implementation that adheres to the RFC 2435 standard. This stack is not only designed for the embedded constraints of the ESP32 but is also fully compatible with Linux, where it has been extensively tested and fuzzed for security and stability. 

One of the most notable technical decisions in Netshlix is the avoidance of the standard `esp_jpeg` component or the ESP32's ROM-based decoder. The developers opted for a custom solution because the standard APIs do not easily support block-by-block data delivery. By controlling the decoding process at a granular level, Netshlix can manage memory much more effectively than generic libraries.

## Memory-Efficient Rendering Strategies

The Smalltv-pro's hardware environment is constrained, providing 520 KB of SRAM. Between the WiFi stack, two jitter buffers, and the JPEG data buffer, there is insufficient memory to maintain a full display framebuffer for the 240x240 LCD. To overcome this, Netshlix employs a stripe-rendering technique.

A single pixel buffer is used to hold only a fraction of the screen's pixels at any given time. Both the LVGL (Light and Versatile Graphics Library) and the custom JPEG decoder share this buffer. The system renders one horizontal stripe of the image, sends it immediately to the display via the SPI interface, and then moves on to the next stripe. When a video stream is active, LVGL's timer handler is deactivated to ensure the CPU can focus entirely on the high-throughput task of decoding and pushing pixels.

## Streaming with GStreamer

To feed video to the device, users can use standard tools like GStreamer. The project provides examples of how to transcode and payload video files for the Smalltv-pro. A typical pipeline involves scaling the source video to 240x240, encoding it as JPEG, and sending it via UDP:

```bash
gst-launch-1.0 filesrc location=video.mp4 ! decodebin \
    ! videorate ! "video/x-raw,framerate=10/1" ! videoconvert ! videoscale ! video/x-raw,width=240,height=240 \
    ! jpegenc \
    ! rtpjpegpay seqnum-offset=63000 mtu=1400 \
    ! udpsink host=10.0.0.134 port=1234
```

## Hardware and Build Environment

Netshlix is built using ESP-IDF 5 and targets the ESP32-D0WD-V3. Because the device lacks a complex user interface for setup, WiFi credentials (SSID and password) are configured via KConfig and compiled directly into the binary. 

For developers looking to modify the hardware, the project documentation includes verified pinout information for the Smalltv-pro header, covering GND, TX, RX, 3V3, GPIO0, and RST. To facilitate automatic flashing, the documentation suggests connecting the GND and GPIO0 pads, allowing the programmer to reset the board into bootloader mode automatically.

In the event of network interruptions, the firmware includes a safety mechanism: if no frames arrive within a specific timeout (`FRAME_TIMEOUT_US`), the display automatically switches to showing a SMPTE test pattern, providing immediate visual feedback that the device is powered on but waiting for data.
