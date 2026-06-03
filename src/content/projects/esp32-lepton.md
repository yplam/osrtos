---
title: ESP32-Lepton
summary: A high-performance ESP-IDF driver for FLIR Lepton 3.5 thermal imaging cameras.
  It provides full support for VoSPI frame capture and CCI camera control, optimized
  for ESP32 and ESP32-S3 microcontrollers.
slug: esp32-lepton
codeUrl: https://github.com/Kampi/ESP32-Lepton
siteUrl: https://www.kampis-elektroecke.de
star: 10
version: r0.0.1
lastUpdated: '2025-12-29'
rtos: freertos
topics:
- c
- cpp
- esp-idf
- espressif
- espresso-framework
- flir-lepton
- lepton
- lwir
- thermal
- thermal-camera
- thermal-imaging
isShow: true
image: /202601/lepton.webp
createdAt: '2026-01-05'
updatedAt: '2026-01-05'
relatedProjects:
- micropython-camera-driver-for-esp32
- esp32-thermal-camera-viewer
- micropython-camera-api-for-esp32
- st7789-driver-for-micropython
- fastled-idf
- esp32-i2c-mpu6050-driver
---

The ESP32-Lepton project provides a robust, high-performance driver specifically designed for the FLIR Lepton 3.5 thermal imaging camera within the ESP-IDF ecosystem. As thermal imaging becomes more accessible for embedded applications—ranging from industrial monitoring to DIY thermography—having a dedicated driver that leverages the specific hardware features of the ESP32 series is crucial.

### High-Speed Thermal Data Acquisition
At the heart of the driver is support for **Video over SPI (VoSPI)**. This protocol allows for high-speed frame capture, essential for the Lepton 3.5's 160x120 resolution. By utilizing the ESP32's SPI peripherals, the driver can achieve native frame rates of approximately 8.6 Hz. For developers using the ESP32-S3, the driver is optimized to handle both the raw data capture and the subsequent RGB conversion at around 9 Hz, making it suitable for real-time visualization.

### Comprehensive Camera Control
Beyond just capturing frames, the driver implements the **Command & Control Interface (CCI)** over I2C. This allows for deep integration with the Lepton's internal features, including:
- **Automatic Gain Control (AGC)**: Optimizing the dynamic range of the thermal image.
- **Flat Field Correction (FFC)**: Ensuring image uniformity across the sensor.
- **Radiometry**: Accessing temperature data for specific pixels, enabling the creation of actual measurement tools rather than just visualizers.

### Flexible Hardware Integration
The driver is built with the ESP-IDF component architecture in mind, making it easy to integrate into existing projects. It offers extensive configuration through **Kconfig**, allowing developers to define:
- **GPIO Mapping**: Custom pins for V-Sync, Reset, and Power-Down.
- **Task Management**: Fine-grained control over the capture task, including core affinity (pinning the task to a specific CPU core), stack size, and task priority.
- **VoSPI Settings**: Selection of SPI host and buffer counts to balance memory usage and performance.

### Optimized for ESP32-S3
While the driver is compatible with the standard ESP32, the ESP32-S3 is the recommended platform. The driver takes advantage of the S3's performance and can optionally use `esp_timer` for precise timing operations. The inclusion of built-in color palettes, such as the classic "Iron" palette, simplifies the process of converting raw thermal data into human-readable images.

### Getting Started
Integration is streamlined through the ESP-IDF Component Manager. Developers can simply add the repository as a dependency in their `idf_component.yml` or clone it directly into their project's components directory. With the provided examples for initialization and capture, setting up a thermal imaging pipeline on an ESP32 becomes a straightforward task.
