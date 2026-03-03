---
title: ESP32 I2S Microphone Stream
summary: A firmware project for the ESP32-S3-EYE development board that streams audio
  from an attached I2S microphone directly to a web browser. It utilizes the Arduino
  framework on the ESP32-S3 platform to create a simple web server for real-time audio
  monitoring.
slug: esp32-i2s-microphone-stream
codeUrl: https://github.com/Sadteeto/ESP32-I2S-Microphone-Stream
star: 10
lastUpdated: '2024-04-09'
rtos: freertos
topics:
- esp32
- esp32-arduino
- esp32-c3
- esp32-c6
- esp32-h2
- esp32-s2
- esp32-s3
- platformio
isShow: true
image: /202603/esp32-i2s-microphone.webp
createdAt: '2026-03-03'
updatedAt: '2026-03-03'
---

# ESP32 I2S Microphone Stream

The ESP32-I2S-Microphone-Stream project provides a straightforward solution for streaming live audio from an I2S-based microphone connected to an ESP32-S3-EYE development board. By leveraging the ESP32's built-in Wi-Fi capabilities and the I2S (Inter-IC Sound) protocol, this project turns the microcontroller into a network-accessible audio source that can be monitored directly through a standard web browser.

## Hardware and Platform

This project is specifically designed for the **ESP32-S3-EYE**, a multimedia development board from Espressif that features an ESP32-S3 SoC. The S3 variant is particularly well-suited for this task due to its high-performance dual-core processor and native USB support. The firmware is built using the **Arduino framework** within the **PlatformIO** ecosystem, ensuring a modular and maintainable codebase.

The core of the audio capture relies on the I2S peripheral, which is the industry standard for connecting digital audio devices. The ESP32 reads raw PCM data from the microphone and prepares it for transmission over the network. Because the Arduino framework for ESP32 runs on top of **FreeRTOS**, the system can handle both the high-speed I2S data acquisition and the network stack operations concurrently.

## Audio Streaming over HTTP

One of the key features of this project is its simplicity in delivery. Instead of requiring complex custom client software, the ESP32 hosts a basic web server. Once the device is connected to a local Wi-Fi network, users can access the live audio stream by navigating to a specific URL: `http://YOUR.IP.ADDRE.SS/stream`.

This approach uses standard HTTP streaming, allowing the browser to treat the incoming data as an audio source. This makes it highly compatible with various devices, including smartphones, tablets, and desktop computers, without needing additional apps.

## Technical Configuration

The project configuration is managed via `platformio.ini`, which specifies the `esp32-s3-devkitc-1` board and the `espressif32` platform version 6.6.0. It also enables USB CDC on boot, which is helpful for debugging and monitoring the device's status via the serial console at 115200 baud.

## Getting Started

To deploy this project, users typically need to:

1.  Configure their Wi-Fi credentials within the source code.
2.  Flash the firmware to the ESP32-S3-EYE using PlatformIO.
3.  Identify the IP address assigned to the ESP32 via the serial monitor.
4.  Open a web browser and enter the streaming URL.

This project serves as an excellent starting point for building IoT audio devices, such as baby monitors, voice assistants, or remote environmental sensors.
