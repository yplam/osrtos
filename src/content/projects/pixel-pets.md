---
title: Pixel Pets
summary: Pixel Pets is an open-source virtual pet ecosystem built for the M5Stack
  hardware family, featuring interactive digital companions with adaptive behaviors.
  It utilizes FreeRTOS for task management and the M5Unified library for hardware
  abstraction, supporting advanced features like ESP-NOW inter-device communication,
  offline LLM-based voice control, and real-time environment syncing. The project
  targets various ESP32 platforms including the CoreS3, Core2, and M5StickC PLUS2.
slug: pixel-pets
codeUrl: https://github.com/marceld23/Pixel-Pets
siteUrl: https://marceld23.github.io/Pixel-Pets/
version: v1.0.3
lastUpdated: '2026-05-17'
licenses:
- NOASSERTION
image: /202605/Pixel-Pets_1.avif
rtos: freertos
libraries:
- littlefs
- lwip
topics:
- digital-pet
- embedded
- esp-now
- esp32
- iot
- kids
- m5stack
- maker
- offline-ai
- open-source
- platformio
- qwen
- tamagotchi
- virtual-pet
- whisper
isShow: true
createdAt: '2026-05-22T01:02:26+00:00'
updatedAt: '2026-05-22T01:02:26+00:00'
---

Pixel Pets is a family of virtual pets designed to run on M5Stack hardware. The ecosystem consists of three primary pet variants—**Muffin** (CoreS3 + LLM), **Visu** (CoreS3), and **Goo-Goo** (Core2)—plus an optional pocket-sized companion device called **Pip** (M5StickC PLUS2). The project is built from a single source tree supporting five different build environments, sharing core pet logic, animations, and mini-games across all targets while leveraging specific hardware capabilities like voice processing and cameras on the CoreS3. 

### A Maker's Journey
The project originated as a collaborative effort between a father and his 10-year-old son, Justus. It serves as a unique showcase of modern AI-assisted development, as every line of firmware was co-authored with Claude (Anthropic) under their direction. This approach allowed a young designer to drive the product's feel and interactions while managing the technical complexities of real-time embedded systems.


### Virtual Companions and Animals
Users can choose between three distinct animal types—Bear, Cat, or Dog—during the initial boot process. These pets are rendered with custom pixel art and fluid animations. The system includes eleven different moods and gestures, such as Happy, Excited, Sleepy, and Startled, which are driven by a simulated needs system tracking happiness, energy, and fullness.

![Goo-Goo close-up showing the bear pet on a meadow scene](/202605/Pixel-Pets_3.avif)

### Key Features and World Awareness
Pixel Pets are designed to be "world-aware." Upon booting, the device uses IP geolocation to determine the user's location and pulls real-time weather, sunrise/sunset times, and moon phases from Open-Meteo. The background scene adapts dynamically to the actual time of day, transitioning through morning, day, evening, and night phases. All data is cached in NVS to ensure the environment remains consistent even during offline periods.

Advanced interaction features include:
- **Voice Control (Muffin only):** Uses an offline Whisper speech-to-text engine and a Qwen3-0.6B intent classifier running on the Module-LLM expansion.
- **Front Camera & Selfies:** Proximity-based wake-up and a photo gallery for pet-overlay selfies on CoreS3 devices.
- **ESP-NOW Friends:** A localized wireless mode that allows two pets to pair and exchange gifts, hearts, or toys without requiring a Wi-Fi router.
- **Web Radio:** Support for streaming radio stations like WDR Die Maus, where the pet sways to the music.

### Hardware Targets and the Pip Accessory
The project supports a variety of M5Stack hardware configurations. Muffin represents the advanced tier, combining a CoreS3 with a Module-LLM for voice capabilities. Visu provides a standard CoreS3 experience, while Goo-Goo brings the pets to the Core2 platform. 

![Pixel Pets demo](/202605/Pixel-Pets_2.avif)

The **Pip** accessory is a specialized M5StickC PLUS2 device that acts as a pocket-sized remote. It allows users to "throw" treats—such as apples, carrots, or bones—to a home pet via ESP-NOW broadcasts. When a treat is thrown with a wrist-flick gesture, the home pet reacts within 200ms by eating the item and increasing its fullness levels.

### Software Architecture and Safety
Designed with families in mind, Pixel Pets requires no cloud accounts or subscriptions. The firmware includes a parent dashboard accessible via a captive portal, allowing for Wi-Fi configuration and the setting of daily play-session limits. Technically, the project uses PlatformIO for builds and includes a modular architecture where pet state and rendering logic are decoupled from hardware-specific drivers. 

The repository also features a robust continuous integration pipeline that performs matrix builds for all targets and runs native unit tests for the core logic modules using the Unity framework. For developers, the firmware includes a built-in canvas dumper to capture high-quality screenshots directly from the device hardware.
