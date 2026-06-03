---
title: uPyCam
summary: A MicroPython-based video streaming application designed for ESP32-CAM and
  M5Camera modules. It provides a web-based interface for real-time video streaming
  and photo capture using a custom MicroPython firmware with integrated camera drivers.
slug: upycam
codeUrl: https://github.com/lemariva/uPyCam
siteUrl: https://lemariva.com/blog/2020/06/micropython-support-cameras-m5camera-esp32-cam-etc
star: 163
lastUpdated: '2022-02-02'
rtos: freertos
libraries:
- micropython
topics:
- esp32
- esp32-cam
- micropython
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- esp32-cam-micropython
- micropython-camera-driver-for-esp32
- micropython-camera-api-for-esp32
- esp32cam-pir-mqtt-spiffs-webserver
- usb-video-class-uvc-for-raspberry-pi-pico
- esp32-mjpeg-multiclient-streaming-server
---

## Overview

uPyCam is an application designed to enable video streaming and image capture on ESP32-based camera modules using MicroPython. Specifically targeting the ESP32-CAM and M5Camera, this project leverages the flexibility of MicroPython to provide a lightweight, browser-accessible camera interface. By running a web server directly on the microcontroller, users can view live streams or take snapshots without needing complex external infrastructure.

## Hardware and Firmware Requirements

The project is optimized for two popular low-cost hardware platforms:
*   **ESP32-CAM**: A small-form-factor module based on the ESP32-S chip with an OV2640 camera.
*   **M5Camera**: A development board from M5Stack that integrates the ESP32 with camera capabilities and often includes additional sensors or a battery.

Because standard MicroPython builds do not natively include camera support for the ESP32, uPyCam requires a specialized firmware. The project utilizes the `micropython-camera-driver` extension, which integrates the ESP32 camera component into the MicroPython environment, allowing Python scripts to interact with the camera hardware directly.

## Key Features

uPyCam provides two primary modes of operation accessible via a web browser:

1.  **Photo Mode**: Accessible at the board's root IP address, this mode allows users to capture and view single still images.
2.  **Streaming Mode**: By appending `?stream=true` to the URL, the application switches to a MJPEG (Motion JPEG) streaming mode, providing a real-time video feed.

Additionally, the repository supports timelapse functionality through a dedicated branch, enabling the boards to function as portable, low-power timelapse cameras that can even communicate over MQTT for remote monitoring.

## Technical Implementation

The core of the application is built around `microWebSrv`, a robust MicroPython web server. The system initialization is handled by `boot.py`, which manages the WiFi connection and time synchronization via NTP. The main application logic resides in `webcam.py` and `webserver.py`, which handle the camera buffer and the HTTP response headers required for MJPEG streaming.

### Configuration

Setting up the project involves configuring the hardware pins and WiFi credentials. A sample configuration file is provided to guide users through the setup:

```python
app_config = {
    'camera': 'M5CAMERA',  # camera -> 'ESP32-CAM' or 'M5CAMERA'
    'led': 14, # led -> 4: ESP32-CAM or 14: M5CAMERA
}

wifi_config = {
    'ssid':'your-ssid',
    'password':'your-password'
}
```

## Getting Started

To deploy uPyCam, users must first flash the extended MicroPython firmware to their ESP32 device. Once the firmware is installed, the Python scripts (including the configured `config.py`) are uploaded to the device. Upon booting, the ESP32 connects to the local network and prints its IP address to the serial console. Users can then navigate to that IP address in any modern web browser to start the stream. The project's modular structure makes it easy to extend, such as adding image processing or integrating with IoT platforms for automated surveillance.
