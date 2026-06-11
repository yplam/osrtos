---
title: ESP32-CAM MJPEG Streaming and SD Capture
summary: A robust ESP-IDF project for the AI-Thinker ESP32-CAM module featuring real-time
  MJPEG streaming and automated microSD storage. It provides a web interface and REST
  API for remote monitoring and control using the FreeRTOS-based ESP-IDF framework.
slug: esp32-cam-mjpeg-streaming-and-sd-capture
codeUrl: https://github.com/dbunt1tled/esp32-cam
lastUpdated: '2026-05-12'
rtos: freertos
libraries:
- lwip
topics:
- c
- esp32-cam
- idf
- telegram
isShow: false
createdAt: '2026-06-11T00:55:13+00:00'
updatedAt: '2026-06-11T00:55:13+00:00'
---

The ESP32-CAM is one of the most versatile and affordable hardware platforms for IoT vision projects. This repository provides a comprehensive implementation for the AI-Thinker ESP32-CAM module, built on the ESP-IDF (v5.x) framework. It transforms the module into a networked camera capable of simultaneous live streaming, automated image logging, and remote management.

### Core Functionality

The project is designed around two primary objectives: providing a low-latency video feed and ensuring reliable local data storage. It achieves this through a dual-server architecture:
- **Web Interface (Port 80):** A user-friendly portal for viewing the camera feed, checking device status via a JSON API, and triggering manual captures.
- **Stream Server (Port 81):** A dedicated MJPEG streaming endpoint optimized for performance, compatible with media players like VLC and computer vision libraries like OpenCV.

For local storage, the system utilizes the microSD card slot via an SPI interface. It features an auto-capture mechanism that saves a JPEG to the SD card at configurable intervals (defaulting to every 5 seconds). This makes the project an excellent baseline for time-lapse photography or remote security monitoring.

### Technical Architecture

The software is organized into a modular structure within the ESP-IDF environment. Key components include:
- **Camera Driver:** Integration with the `esp32-camera` component to manage frame buffers and image settings like resolution (VGA, SVGA) and JPEG quality.
- **Storage Management:** A dedicated SD card handler that manages the SPI bus and file system operations.
- **Networking:** Utilizes the ESP32's Wi-Fi capabilities and the lwIP stack to host multiple HTTP servers and provide mDNS support for easy network discovery.
- **Configuration:** All critical parameters, including WiFi credentials, capture intervals, and GPIO assignments, are centralized in `main/config.h`, allowing for rapid customization without modifying the core logic.

### Hardware Considerations

The project specifically targets the AI-Thinker ESP32-CAM board, often paired with a Type-C downloader. A notable technical detail mentioned in the documentation is the shared use of GPIO2, which serves as both the SD card's MISO line and the onboard LED. The project advises against enabling the LED during SD operations to prevent data corruption. Additionally, the use of PSRAM is highly recommended to handle the memory-intensive requirements of high-resolution frame buffering.

### Getting Started

To deploy this project, developers need ESP-IDF v5.2 or later. The workflow involves adding the `esp32-camera` dependency via the IDF Component Manager or manual cloning. After configuring the WiFi credentials in `config.h`, the project can be built and flashed using the standard `idf.py` toolchain. 

For those looking to integrate the camera into larger systems, the project includes a Python example using OpenCV to capture and display the MJPEG stream, demonstrating how the ESP32-CAM can serve as a front-end sensor for more complex AI or recording applications.
