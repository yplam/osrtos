---
title: ESP32-RTSPServer
summary: A comprehensive RTSP server library for the ESP32 platform that enables streaming
  of video, audio, and subtitles. It supports multiple transport protocols including
  UDP, TCP, Multicast, and HTTP tunneling, with specific optimizations for ESP32 camera
  sensors and I2S audio interfaces.
slug: esp32-rtspserver
codeUrl: https://github.com/rjsachse/ESP32-RTSPServer
star: 69
version: 1.3.5
lastUpdated: '2025-08-27'
rtos: freertos
libraries:
- lwip
topics:
- arduino
- arduino-library
- audio
- audio-streaming
- camera
- esp32
- esp32-cam
- esp32-s3
- esp32cam
- esp32s3
- iot
- multimedia
- rtsp
- rtsp-server
- rtsp-stream
- rtspserver
- subtitles
- subtitles-streamer
- video
- video-streaming
isShow: false
createdAt: '2026-01-12'
updatedAt: '2026-01-12'
relatedProjects:
- esp32-mjpeg-multiclient-streaming-server
- https-server-generic-library
- esp32cam-pir-mqtt-spiffs-webserver
- webserver-esp32-w5500
- webserver-esp32-enc
- esp32-web-radio-evo3
---

The ESP32-RTSPServer library is a powerful solution for developers looking to implement multimedia streaming on ESP32 microcontrollers. It provides a robust RTSP (Real-Time Streaming Protocol) server capable of handling video, audio, and even subtitle tracks simultaneously. This makes it an ideal choice for building DIY IP cameras, baby monitors, or remote sensing devices using low-cost hardware.

One of the standout features of this library is its versatility in transport protocols. While many embedded RTSP implementations are limited to simple UDP, this project supports Unicast UDP, Multicast, TCP, and even HTTP Tunneling. This flexibility ensures that streams can be viewed across different network conditions and through various firewalls, providing a reliable connection even in complex network environments.

### Multimedia Capabilities
The library is designed to work seamlessly with the ESP32's hardware peripherals. For video, it integrates with the standard ESP32 camera driver, supporting popular sensors like the OV2640. Performance benchmarks on the ESP32-S3 show impressive results, achieving up to 50 FPS at QVGA resolution and maintaining a usable 12.5 FPS at HD (720p) resolutions. This performance is achieved through efficient buffer management and tight integration with the underlying hardware.

Audio streaming is handled via the I2S interface, allowing for high-quality audio capture from digital or analog microphones. A unique addition is the support for subtitle streaming, which can be used to overlay real-time telemetry data—such as frame rates, sensor readings, or timestamps—directly onto the video stream in players like VLC. This is particularly useful for debugging or for applications requiring data-rich video feeds.

### Architecture and Integration
Built on top of the ESP32 Arduino core, the library leverages FreeRTOS for task management. Users typically create separate tasks for video and audio processing, ensuring that the RTSP server remains responsive without blocking the main application logic. The library provides helper methods like `readyToSendFrame()` and `sendRTSPFrame()` to simplify the data pipeline and prevent buffer overflows.

Security is addressed through support for basic authentication, allowing developers to set a username and password for the RTSP stream. For advanced users, the library offers several compile-time defines to enable logging, override client limits, or enable non-blocking video modes to optimize performance for specific use cases.

### Getting Started
Setting up the server involves initializing the `RTSPServer` object and configuring the desired transport type. The library allows for fine-grained control over port assignments (defaulting to 554) and multicast settings. Integration with popular media players like VLC is well-documented, including specific configuration steps for handling network caching and RTP/RTSP settings to ensure low-latency playback.

```cpp
// Basic Setup Example
#include <ESP32-RTSPServer.h>

RTSPServer rtspServer;

void setup() {
  // Initialize the RTSP server with video and audio support
  if (rtspServer.begin(RTSPServer::VIDEO_AND_AUDIO, 554)) {
    Serial.println("RTSP server started successfully");
  }
}

void sendVideo(void* pvParameters) {
  while (true) {
    if(rtspServer.readyToSendFrame()) {
      camera_fb_t* fb = esp_camera_fb_get();
      rtspServer.sendRTSPFrame(fb->buf, fb->len, quality, fb->width, fb->height);
      esp_camera_fb_return(fb);
    }
    vTaskDelay(pdMS_TO_TICKS(1));
  }
}
```
