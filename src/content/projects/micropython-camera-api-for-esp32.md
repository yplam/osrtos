---
title: MicroPython Camera API for ESP32
summary: A comprehensive camera API for MicroPython targeting ESP32-based boards.
  It provides a stable interface for various image sensors like the OV2640 and OV5640,
  supporting both synchronous and asynchronous capture modes with ESP-IDF integration.
slug: micropython-camera-api-for-esp32
codeUrl: https://github.com/cnadler86/micropython-camera-API
star: 143
version: v0.6.2
lastUpdated: '2026-01-12'
rtos: freertos
libraries:
- micropython
topics:
- camera
- esp32-cam
- espcam
- micropython
- ov2640
- ov5640
isShow: true
image: /202603/ATOMS3R-Camera.webp
createdAt: '2026-03-17'
updatedAt: '2026-03-17'
---

## Overview

The MicroPython Camera API project provides a robust and standardized interface for using camera sensors with MicroPython on ESP32 microcontrollers. While MicroPython has broad support for many peripherals, camera integration often requires specialized C-modules due to the high-speed data processing and memory management involved in image capture. This project bridges that gap by implementing a general API that supports a wide range of popular sensors, including the OV2640 and OV5640.

## Key Features and Capabilities

The API is designed to be both powerful and easy to use, offering several advanced features for embedded vision projects:

- **Broad Sensor Support**: Out-of-the-box compatibility with sensors such as the OV7670, OV7725, OV2640, OV3660, OV5640, and several others from manufacturers like GalaxyCore and SiliconFile.
- **Dual API Modes**: Supports standard synchronous capture as well as an `acamera` package for `asyncio` integration, allowing for non-blocking image acquisition in complex applications.
- **Flexible Configuration**: Fine-grained control over pixel formats (JPEG, RGB565, GRAYSCALE, YUV422), frame sizes (from QQVGA to UXGA), JPEG quality, and frame buffer counts.
- **I2C Sharing**: Ability to share the I2C bus (SCCB protocol) between the camera sensor and other peripherals, which is critical for pin-constrained ESP32 designs.
- **Performance Optimized**: Includes benchmarks for various frame sizes and formats, specifically optimized for the ESP32-S3's improved peripheral performance.

## Technical Implementation

This project is implemented as an external C module for MicroPython. It leverages the official `esp32-camera` driver from Espressif and requires the ESP-IDF (version 5.2.3 or higher recommended) for compilation. Because image processing is memory-intensive, the driver requires hardware with PSRAM (Pseudo-static RAM) to be installed and activated. 

For users who prefer not to build their own firmware, the project provides over 20 precompiled board images for popular hardware like the AI-Thinker ESP32-CAM, M5Stack series, and Seeed Studio XIAO ESP32S3.

## Using the API

The API follows standard MicroPython conventions. A camera object is created with specific pin definitions or board defaults, after which images can be captured as memoryview objects for efficient processing.

```python
from camera import Camera, PixelFormat, FrameSize

# Initialize camera with JPEG format
cam = Camera(pixel_format=PixelFormat.JPEG, frame_size=FrameSize.QVGA)

# Capture a single frame
img = cam.capture()

# Convert to bytes for storage or transmission
img_bytes = bytes(img)
```

For asynchronous applications, the `acamera` module allows the camera to fit into a modern MicroPython event loop:

```python
from acamera import Camera

async def main():
    cam = Camera()
    img = await cam.acapture()
    # Process image...
```

## Hardware Support and Benchmarking

The project specifically targets the ESP32 family, with significant performance gains noted on the ESP32-S3. Benchmarks show that while raw formats like RGB565 are limited to lower resolutions due to bandwidth, JPEG encoding allows for high-speed capture even at VGA and SVGA resolutions. The project also includes support for the `mp_jpeg` module to assist with encoding and decoding tasks directly within the MicroPython environment.
