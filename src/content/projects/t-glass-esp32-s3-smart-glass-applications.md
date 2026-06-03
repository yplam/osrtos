---
title: T-Glass ESP32-S3 Smart Glass Applications
summary: A collection of custom applications for the T-Glass v2, an ESP32-S3-powered
  smart glasses platform. It features support for BLE notifications, image capture,
  and sensor integration using the ESP-IDF framework.
slug: t-glass-esp32-s3-smart-glass-applications
codeUrl: https://github.com/0015/T-Glass-Applications
star: 11
lastUpdated: '2025-02-19'
rtos: freertos
topics:
- esp-idf
- esp32-s3
- iot-application
- prism
- smartglasses
- t-glass
- wearable-devices
isShow: true
image: /202602/t_glass_v2.webp
createdAt: '2026-02-08'
updatedAt: '2026-02-08'
relatedProjects:
- esp32-tux
- develop-your-own-bluetooth-low-energy-applications
- ameba-freertos-pro2-sdk
- twatch-v3-firmware-for-esp32
- echolens-ai-powered-smart-glasses
- esp-e-paper-component
---

The T-Glass v2 project offers a specialized ecosystem for developers looking to build and deploy applications on an affordable, ESP32-S3-based smart glasses platform. Priced at a fraction of high-end wearables, it provides a feature-rich environment for exploring IoT, wearable interfaces, and sensor integration.

### High-Performance Wearable Hardware

At the heart of the T-Glass v2 is the ESP32-S3-FN4R2 SoC, which provides robust processing power along with 4MB of Flash and 2MB of PSRAM. The device is equipped with a 1.1-inch JD9613 LTPS AMOLED display, ensuring that information is crisp and readable even in a compact form factor.

Beyond the display, the hardware suite includes:
- **Bosch BHI260AP**: A smart sensor hub that handles motion tracking and IMU data efficiently.
- **PCF85063A RTC**: Ensures accurate timekeeping for standalone wearable functions.
- **Audio and Input**: An integrated microphone and a touch-sensitive button allow for multi-modal user interaction.

### Specialized Applications

The repository is organized into specific application modules, each targeting different capabilities of the wearable platform:

- **iOS Notification System (ANCS)**: By implementing the Apple Notification Center Service (ANCS) over Bluetooth Low Energy (BLE), the glasses can act as a secondary display for iPhone notifications, keeping users informed without needing to check their mobile devices.
- **Image Capture**: This application demonstrates the device's ability to interface with external systems via BLE to trigger or manage image capture tasks.
- **Motion and Time Tracking**: Leveraging the onboard Bosch sensors and Real-Time Clock, the platform is capable of sophisticated activity monitoring and time-based alerts.

### Development Environment

The project is built on the ESP-IDF (Espressif IoT Development Framework). This choice provides developers with deep access to the ESP32-S3's hardware features, including its dual-core architecture and advanced power management. Because ESP-IDF is built on FreeRTOS, the applications benefit from a mature real-time operating system environment, enabling efficient task scheduling for sensor polling, display updates, and wireless communication.

For those interested in the intersection of wearable hardware and open-source software, the T-Glass Applications repository provides both a starting point and a set of functional tools to transform a programmable device into a custom smart wearable.
