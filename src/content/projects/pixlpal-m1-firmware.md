---
title: PIXLPAL-M1 Firmware
summary: A modular AIoT firmware for the Pixlpal desktop companion based on the ESP32-S3
  SoC. It utilizes the ESP-IDF framework and FreeRTOS to power an interactive 128x64
  RGB LED matrix display with features like Wi-Fi connectivity, BLE control, and audio
  processing.
slug: pixlpal-m1-firmware
codeUrl: https://github.com/Meterbit/PIXLPAL-M1
siteUrl: https://meterbitcyb.com
star: 11
lastUpdated: '2026-01-02'
rtos: freertos
libraries:
- littlefs
- lwip
- nimble
topics:
- ai
- audio-player
- ble
- iot
- smart-home
isShow: true
image: /202601/pixpal.webp
createdAt: '2026-01-18'
updatedAt: '2026-01-18'
relatedProjects:
- svitrix-firmware
- esp32-a2dp-sink-with-ldac-aptx-hd-and-aac-support
- wt32-sc01-plus-smart-desk-companion
- echokit-firmware
- highboy-firmware
- lumifur-controller
---

## Overview

Pixlpal is an interactive AIoT desktop companion featuring a vibrant 128×64 RGB LED matrix display. The Pixlpal-M1 firmware is a sophisticated embedded project built on the ESP-IDF framework, specifically optimized for the ESP32-S3 SoC. It combines the power of FreeRTOS for task management with the flexibility of the Arduino library ecosystem, creating a modular environment for network-enabled visual applications.

The project serves as a platform for various smart desktop tools, including clocks, calendars, financial tickers (stock/crypto), and AI-powered conversational assistants. Each application within the firmware operates as a standalone FreeRTOS task, allowing for seamless switching and remote management via a dedicated mobile app over Bluetooth Low Energy (BLE).

## Modular Application Framework

At the core of Pixlpal-M1 is a modular framework designed for easy expansion. By leveraging FreeRTOS, the system can manage multiple concurrent processes, such as network monitoring, audio processing, and display rendering, without compromising stability. Applications are launched through BLE commands, and the system maintains state by reading the last executed application from Non-Volatile Storage (NVS) upon boot.

The firmware is highly optimized for the ESP32-S3 (specifically the N16R8 variant), taking advantage of its 16 MB of flash and 8 MB of PSRAM. This hardware overhead is essential for handling high-resolution graphics, GIF/PNG/SVG decoding, and complex audio streams.

## Key Features and Capabilities

Pixlpal-M1 is packed with features that bridge the gap between simple display drivers and complex IoT devices:

- **Rich Graphics Engine**: Supports drawing text, shapes, and various image formats including GIF, PNG, and SVG.
- **Advanced Connectivity**: Integrated Wi-Fi for internet-based API integrations and BLE 5.0 for remote configuration and control.
- **Audio Processing**: Features microphone input and DAC audio output via I2S, enabling voice interaction and sound effects.
- **Dual OTA Updates**: Supports remote firmware updates via GitHub releases and offline updates via USB flash drives.
- **USB-OTG Support**: The firmware can read/write to USB storage and supports external input devices like mice or speakers.
- **MQTT Integration**: Built-in support for MQTT allows for easy integration with smart home ecosystems like Home Assistant.

## Technical Implementation

The firmware startup flow is managed in `main.cpp`, where the system initializes LittleFS for the filesystem, sets up the rotary encoder for manual control, and establishes BLE communication before launching the primary application engine.

### Main Program Entry Point

```cpp
extern "C" void app_main(){
    // Initialize Pixlpal System
    mtb_LittleFS_Init();
    mtb_RotaryEncoder_Init();
    mtb_System_Init();
    mtb_Ble_Comm_Init();

    // Attempt OTA Update from USB Flash Drive
    mtb_Launch_This_App(usbOTA_Update_App);
    while(Mtb_Applications::firmwareOTA_Status != pdFALSE) delay(1000);

    // Read the last executed App from NVS
    mtb_Read_Nvs_Struct("currentApp", &currentApp, sizeof(Mtb_CurrentApp_t));

    // Initialize Wifi
    mtb_Wifi_Init();

    // Launch the Last Executed App
    mtb_Launch_This_App(exampleWriteText_App);

    while (1){
        size_t free_sram = heap_caps_get_free_size(MALLOC_CAP_INTERNAL);
        ESP_LOGI(TAG, "############ Free Internal SRAM: %zu bytes\n", free_sram);
        delay(2000);
    }
}
```

### Creating Applications

Developing new applications for Pixlpal involves defining a FreeRTOS task and wrapping it in the `Mtb_Applications` class. This allows the engine to manage the lifecycle of the app, including initialization and cleanup.

```cpp
void exampleWriteTextApp_Task(void* dApplication){
  Mtb_Applications *thisApp = (Mtb_Applications *)dApplication;
  mtb_App_Init(thisApp);

  Mtb_FixedText_t exampleFixedText(24, 15, Terminal8x12, GREEN);
  exampleFixedText.mtb_Write_String("Hello World.");

  while (MTB_APP_IS_ACTIVE == pdTRUE) {
    // App logic here
    delay(15000);
  }

  mtb_End_This_App(thisApp);
}
```

## Hardware and Ecosystem

The project is open-source, with hardware designs licensed under CERN-OHL-W and firmware under LGPL v3.0. The control circuit includes an ESP32-S3 module, a HUB75 interface for the LED matrix, and various peripherals for power management and user input. While currently lacking an onboard battery system, the project is actively evolving with planned features like Matter SDK integration and official Espressif neural network library (`esp-nn`) support for edge AI capabilities.
