---
title: AWatch
summary: AWatch is a retro-inspired smartwatch firmware for the ESP32-based TTGO T-Watch,
  featuring a user interface modeled after the Amiga Workbench 1.x. It leverages FreeRTOS
  for task management and integrates LVGL for its graphical interface, providing functionality
  such as countdown timers, MOD music playback, and speech synthesis.
codeUrl: https://github.com/stevelord/AWatch
isShow: false
rtos: freertos
libraries:
- lvgl
- tft-espi
topics:
- esp32
- lvgl
- t-watch
- ttgo
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- zephyrwatch
- twatch-v3-firmware-for-esp32
- lvgl-watch-firmware-for-open-smartwatch
- dt78-esp32-firmware
- opentimewatch-os
- lunokiotwatch-firmware-for-lilygo-twatch-2020
---

If you grew up with the Commodore Amiga, the blue and orange aesthetic of Workbench 1.x is likely etched into your memory. **AWatch** brings that classic retro aesthetic to the wrist, transforming the ESP32-powered LilyGO TTGO T-Watch into a functional, Workbench-inspired timepiece. Originally developed as a countdown timer for measuring time during COVID-19 lockdowns, the project evolved into a feature-rich proof-of-concept that pays homage to 1980s computing.

### Hardware and Architecture
AWatch is designed specifically for the **LilyGO TTGO T-Watch**, supporting both the 2019 and 2020 models. The hardware is based on the ESP32, which provides the dual-core processing power and connectivity required for the watch's diverse feature set. 

Technically, the project is built on the Arduino framework but makes extensive use of **FreeRTOS** for task management. This allows the watch to handle background audio playback and timer logic while maintaining a responsive user interface. The graphical layer is powered by **LVGL** (Light and Versatile Graphics Library), which has been customized with custom fonts and icons to replicate the look of the original Amiga Workbench.

### Key Features and Capabilities
Despite its self-described "proof-of-concept" status, AWatch packs a surprising amount of functionality into its Amiga-style windows:

*   **Workbench UI**: A faithful recreation of the Amiga 1.x environment, including the iconic disk icons, window borders, and color palette.
*   **Countdown Timer**: The core utility of the watch, allowing users to set and track time with a custom alarm.
*   **MOD Music Player**: Using the `ESP8266Audio` library, the watch can play Protracker-style MOD files, a staple of the Amiga demo scene.
*   **Speech Synthesis**: Integration with the `ESP8266SAM` (Software Automatic Mouth) engine allows the watch to speak, providing a truly unique 8-bit interaction experience.
*   **Spectrum Emulator**: The repository includes a ZX Spectrum emulator sub-project, demonstrating the versatility of the ESP32 hardware.
*   **Power Management**: The firmware includes implementations for low-power standby modes, aiming for a current draw of approximately 4mA when the screen is off.

### Technical Deep Dive
The project is organized into several sub-folders, each targeting different levels of complexity or specific tests:
- **AWatch**: The main application folder containing the full Workbench experience.
- **BasicWatch**: A simplified clock display for those wanting lower power consumption (approx. 20mA).
- **Spectrum**: A dedicated ZX Spectrum emulator implementation.
- **TalkingClockI2S**: A demonstration of the speech synthesis capabilities using the I2S DAC.

In the main `AWatch.ino`, you can see how the system initializes the TTGO hardware and sets up the FreeRTOS environment:

```c
#define LILYGO_TWATCH_2020_V1
#include <TTGO.h>
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "gui.h"

void setup() {
    ttgo = TTGOClass::getWatch();
    ttgo->begin();
    ttgo->openBL();
    ttgo->lvgl_begin();
    setupGui();
}

void loop() {
    lv_task_handler();
    delay(5);
}
```

### Getting Started
To deploy AWatch, you will need the Arduino IDE and several specific libraries:
1.  **TTGO_TWatch_Library**: The official hardware abstraction layer for the watch.
2.  **ESP8266Audio**: Required for MOD and MP3 playback.
3.  **ESP8266SAM**: Required for the speech synthesis features.
4.  **ArduinoJson**: Used for configuration and data handling.

Users should be aware that this project is a "labor of love" and a proof-of-concept. As the author notes, it is not production-grade software, but it serves as an excellent foundation for anyone looking to build a custom OS for the T-Watch or for those who simply want to carry a piece of Amiga history on their wrist.
