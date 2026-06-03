---
title: LILYGO T-Display-S3 Boilerplate
summary: A boilerplate project for the LILYGO T-Display-S3 using the Arduino framework
  and LVGL graphics library. It features hardware initialization, DMA-backed twin
  framebuffers, PSRAM integration, and internal flash storage mapping for the ESP32-S3.
slug: lilygo-t-display-s3-boilerplate
codeUrl: https://github.com/KamranAghlami/T-Display-S3
siteUrl: https://www.lilygo.cc/products/t-display-s3
star: 50
version: v1.0.0
lastUpdated: '2024-12-02'
rtos: freertos
libraries:
- lvgl
- spiffs
topics:
- arduino
- esp32s3
- lvgl
- platformio
- t-display-s3
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- lvgl-8-on-wt32-sc01-with-arduino
- jc3248w535-lvgl-v9-test-project
- rp2040-lvgl-8-demo-with-ili9488-and-xpt2046
- esp32-st7789v-ft6236u-arduino-lvgl-demo
- jc4827w543-lvgl-v9-implementation
- esp32-lvgl-8-x-sdspi-template
---

The T-Display-S3 boilerplate provides a robust starting point for developing applications on LILYGO's ESP32-S3 based display module. By integrating the Arduino framework with the LVGL graphics library, it abstracts the complexities of hardware initialization and display management, allowing developers to focus on application logic.

One of the standout features of this project is its optimized display pipeline. It utilizes Espressif's LCD driver APIs to implement a twin framebuffer setup in local RAM, leveraging DMA (Direct Memory Access) for high-throughput display updates. To support complex user interfaces, the project initializes external PSRAM and allocates LVGL's working memory there, preserving internal SRAM for critical system tasks.

The boilerplate also simplifies storage and input handling. The internal flash is mounted as a SPIFFS storage medium and exposed to LVGL as a virtual "F:" drive, making it easy to load assets like images or fonts directly from the filesystem. Hardware keys are automatically mapped to an LVGL keypad input device, supporting "Up", "Down", and "Enter" events out of the box. Additionally, the project provides a built-in API for reading battery voltage in millivolts, essential for portable IoT devices.

## Getting Started

Developers can get started by inheriting from the `application` class and overriding two primary methods: `on_create` for initialization and `on_update` for per-frame logic. This structure is demonstrated in the included physics simulation example, which serves as both a starting point and a performance test.

```cpp
#include "application.h"

class my_app : public application {
    void on_create() override {
        // Initialize your UI or logic here
    }

    void on_update() override {
        // Handle per-frame updates
    }
};
```

## Technical Configuration

The project is configured for PlatformIO and includes a custom partition table designed for 16MB flash devices. This table allocates space for NVS, OTA updates (with two app partitions of 2.93MB each), and a large 10.92MB storage partition. This configuration ensures that the device is ready for over-the-air updates and has ample space for user data and assets.

By handling the low-level details of the ESP32-S3's LCD controller and memory mapping, this boilerplate significantly reduces the time required to bring a professional-looking UI to the T-Display-S3 hardware.
