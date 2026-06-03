---
title: ESP32-Watch for OpenHaystack
summary: An ESP32-based smartwatch project that integrates with Apple's Find My network
  using the OpenHaystack protocol. It features a graphical user interface built with
  LVGL and LovyanGFX, providing location tracking capabilities without the need for
  a GPS module by broadcasting via Bluetooth Low Energy (BLE).
codeUrl: https://github.com/0015/ESP32-Watch-Projects
isShow: false
rtos: freertos
libraries:
- lvgl
topics:
- esp-idf
- esp32
- esp32-watch
- firmware
- lvgl
- openhaystack
- thatproject
- traceable
star: 34
lastUpdated: '2022-10-22'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- zephyrwatch
- openhaystack-zephyr-firmware
- twatch-v3-firmware-for-esp32
- chronos-watchy
- ov-watch
- lvgl-watch-firmware-for-open-smartwatch
---

The **ESP32-Watch for OpenHaystack** is a fascinating intersection of DIY hardware and the global tracking ecosystem. Developed by Eric Nam, this project demonstrates how an ESP32-based wearable can be integrated into Apple's "Find My" network, allowing for precise location tracking without the power consumption or hardware requirements of a dedicated GPS module.

### How It Works: Tracking Without GPS
The core innovation of this project is its use of **OpenHaystack**, an open-source framework that allows non-Apple devices to participate in the Find My network. By broadcasting specific Bluetooth Low Energy (BLE) advertisements, the ESP32 can be detected by nearby iPhones or other Apple devices, which then securely report the location to Apple's servers. This allows the watch owner to see their device's location on a map, even if the watch itself has no internet connection or GPS hardware.

### Technical Architecture
The project is built on the **ESP-IDF** framework, utilizing the ESP32's dual-core capabilities and integrated Bluetooth stack. The firmware is structured into several key components:

*   **Display & UI**: The project uses the powerful **LVGL** (Light and Versatile Graphics Library) to manage the user interface, ensuring smooth animations and a professional look on the watch face. This is paired with **LovyanGFX**, a high-performance graphics driver for ESP32.
*   **BLE Broadcasting**: A dedicated `openhaystack.c` component handles the specific BLE payload required for Apple's network.
*   **Hardware Interaction**: The system includes drivers for battery monitoring (via ADC) and button handling to navigate the watch interface.

### Hardware and Software Requirements
To get started with this project, you will need an ESP32-based watch (such as those from the TTGO series) and a Mac to run the OpenHaystack application. The Mac application is necessary to generate the public keys required for the BLE advertisements and to view the device's location.

### Getting Started
The project uses the standard ESP-IDF build system. After cloning the repository and its submodules (LVGL and LovyanGFX), users can configure the project using the following structure:

```cmake
# Example component registration in main/CMakeLists.txt
idf_component_register(
    SRCS 
        main.cpp
        app_display.cpp
        openhaystack.c
    INCLUDE_DIRS
        .
        include
    REQUIRES driver esp_adc_cal LovyanGFX lvgl esp32-button bt
)
```

Once the keys are generated via the OpenHaystack Mac app, they are integrated into the firmware, and the device is flashed using the provided `flash_esp32-watch.sh` script or standard ESP-IDF tools. 

### Privacy and Considerations
As noted by the author, the effectiveness of this tracking method is significant enough to raise privacy considerations. Because it leverages a massive network of existing devices, the tracking is highly accurate in populated areas. The project is designed for personal use, allowing users to experiment with BLE technology and the mechanics of modern tracking ecosystems while maintaining a functional, albeit minimal, digital watch.
