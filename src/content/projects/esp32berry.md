---
title: ESP32Berry
summary: A comprehensive handheld OS-like application for the LilyGO T-Deck, leveraging
  LVGL for its user interface and LovyanGFX for high-performance display driving.
  It features a ChatGPT client, dynamic WiFi configuration, and system-level controls
  for audio and brightness.
codeUrl: https://github.com/0015/ESP32Berry
isShow: true
image: /202512/t-deck.webp
rtos: freertos
libraries:
- lvgl
topics:
- arudino
- cyberdeck
- diyproject
- esp-idf
- esp32
- esp32berry
- keyboard
- lvgl
- t-deck
- thatproject
star: 236
lastUpdated: '2024-05-24'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
---

ESP32Berry is an ambitious project that transforms the LilyGO T-Deck—a portable ESP32-S3 based handheld with a keyboard and screen—into a functional, miniature computing device. Developed by Eric Nam (ThatProject), the project aims to provide a cohesive user experience similar to a mobile operating system, tailored specifically for the constraints and capabilities of embedded hardware.

### The Evolution of ESP32Berry
The project has seen significant architectural shifts to improve performance and usability. While earlier versions experimented with VNC clients and ESP-NOW chat applications, the current iteration (Version 0.5 and beyond) focuses on a robust UI framework. A key technical decision in the recent updates was the migration from the standard TFT_eSPI library to LovyanGFX. This change was driven by the need for faster screen updates and better integration with the LilyGO T-Deck's hardware, allowing for a much smoother user interface experience.

### Core Features and Capabilities
ESP32Berry is more than just a simple demo; it is a multi-app environment. Key features include:
- **LVGL-Based Interface:** Utilizing LVGL 8.4.0 (with preparations for LVGL 9), the project features a home screen, an app drawer, and a control panel.
- **ChatGPT Client:** A built-in application that allows users to interact with OpenAI's ChatGPT directly from their handheld device, utilizing the T-Deck's physical keyboard for input.
- **System Controls:** A dedicated control panel for managing hardware parameters like screen brightness and speaker volume.
- **Dynamic Networking:** A WiFi selection tool that allows users to scan for and connect to access points through the GUI, rather than hardcoding credentials.
- **Hardware Integration:** Full support for the T-Deck's peripherals, including the keyboard, trackball, SD card slot, and audio I2S interface.

### Technical Architecture
The software is structured around an `AppBase` class, which facilitates the creation of modular applications within the ESP32Berry ecosystem. This object-oriented approach allows the system to manage different states—such as the home screen, settings, or the ChatGPT client—efficiently. The project relies on the ESP32's dual-core architecture, typically running the UI tasks on one core while handling network requests or background system tasks on the other, managed by the underlying FreeRTOS kernel.

### Hardware Requirements and Setup
The project is specifically optimized for the LilyGO T-Deck. To compile the project, developers need to configure the Arduino IDE with specific settings to handle the ESP32-S3's OPI PSRAM and the 16MB Flash size. The partition scheme is particularly important, requiring a large FATFS area to store system assets and user data.

```cpp
// Example of the board initialization sequence in ESP32Berry
void initBoard(){
  pinMode(BOARD_POWERON, OUTPUT);
  digitalWrite(BOARD_POWERON, HIGH);

  pinMode(BOARD_SDCARD_CS, OUTPUT);
  pinMode(RADIO_CS_PIN, OUTPUT);
  pinMode(BOARD_TFT_CS, OUTPUT);

  digitalWrite(BOARD_SDCARD_CS, HIGH);
  digitalWrite(RADIO_CS_PIN, HIGH);
  digitalWrite(BOARD_TFT_CS, HIGH);

  pinMode(BOARD_SPI_MISO, INPUT_PULLUP);
  SPI.begin(BOARD_SPI_SCK, BOARD_SPI_MISO, BOARD_SPI_MOSI);
}
```

### Future Directions
The developer is currently working on integrating LVGL 9 to further enhance the visual fidelity and performance of the system. With its open-source MIT license, ESP32Berry serves as both a functional tool for T-Deck owners and a comprehensive reference for developers looking to build sophisticated, multi-app GUI environments on ESP32 hardware.
