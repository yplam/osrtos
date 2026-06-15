---
title: ESP32 MJPEG Multiclient Streaming Server
summary: A high-performance MJPEG streaming webserver for ESP32-CAM and ESP-EYE modules,
  capable of supporting up to 10 simultaneous clients. It leverages FreeRTOS tasks
  to handle concurrent streaming and utilizes the latest ESP32 camera drivers for
  various sensors like OV2640 and OV5640.
codeUrl: https://github.com/arkhipenko/esp32-mjpeg-multiclient-espcam-drivers
siteUrl: https://www.hackster.io/anatoli-arkhipenko/multi-client-mjpeg-streaming-from-esp32-47768f
isShow: false
rtos: freertos
libraries: []
topics:
- blynk
- esp32
- espressif
- freertos
- gstreamer
- mjpeg
- psram
- rtos
- streaming
- video
- vlc
star: 191
lastUpdated: '2024-10-01'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- esp32-cam-mjpeg-streaming-and-sd-capture
- esp32-rtspserver
- esp32cam-pir-mqtt-spiffs-webserver
- netshlix
- esp32-cam-micropython
- stm32n6-camera-capture-application
---

Streaming video from a resource-constrained microcontroller like the ESP32 is a common challenge, often limited by memory and processing power to a single client. The **ESP32 MJPEG Multiclient Streaming Server** project addresses this limitation by providing a robust, FreeRTOS-based implementation that allows up to 10 simultaneous clients to view a live MJPEG stream from an AI-Thinker ESP32-CAM or ESP-EYE module.

### Multi-Client Architecture with FreeRTOS

At the heart of this project is a sophisticated use of the FreeRTOS scheduler. Unlike simpler implementations that block while serving a single frame, this server distributes the workload across dedicated tasks. By pinning tasks to specific cores (APP_CPU and PRO_CPU), the system ensures that camera frame capture and network transmission do not interfere with each other, maintaining a stable frame rate even as more clients connect.

In the provided Arduino sketch, the system initializes three primary task handles:
- `tMjpeg`: Manages client connections to the webserver.
- `tCam`: Handles the camera hardware interface and frame acquisition.
- `tStream`: Manages the actual data transmission to connected clients.

### Extensive Hardware and Sensor Support

One of the standout features of this repository is the inclusion of the latest ESP-CAM drivers. It supports a wide array of camera sensors, making it highly versatile for different hardware configurations. Supported sensors include:
- **OV2640**: 2MP (Standard on most ESP32-CAM boards)
- **OV3660**: 3MP
- **OV5640**: 5MP
- **OV7670**: VGA
- **OV7725**: SVGA
- **NT99141**: HD

The project includes specific configurations for popular boards like the AI-Thinker ESP32-CAM, ESP-EYE, and M5Stack models. Users can easily switch between these by defining the appropriate camera model in the code.

### Getting Started

To deploy the server, you will need the Arduino IDE or PlatformIO. The project requires the ESP32 Arduino Core (tested with version 1.0.6) and PSRAM must be enabled to handle the frame buffers required for MJPEG encoding and multiple client streams.

Configuration is straightforward. You must define your WiFi credentials in a file named `home_wifi_multi.h`:

```c
#define SSID1 "your-wifi-ssid"
#define PWD1 "your-wifi-password"
```

Once configured, the ESP32 will host a web server on port 80. You can view the stream using standard tools like VLC media player, a web browser, or even the Blynk video widget. The server is designed to be highly efficient, utilizing the hardware's capabilities to provide a smooth streaming experience that was previously difficult to achieve on such low-cost hardware.

### Technical Details

The project utilizes a `Minimal SPIFFS` partition scheme and requires the CPU frequency to be set to 240MHz for optimal performance. Because it uses the `esp_camera` driver directly, it provides low-level control over image settings such as resolution, quality, and pixel format, ensuring that the MJPEG stream is as optimized as possible for the available bandwidth.
