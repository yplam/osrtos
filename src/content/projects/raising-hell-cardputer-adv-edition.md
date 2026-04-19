---
title: Raising Hell — Cardputer ADV Edition
summary: A Tamagotchi-style virtual pet simulator designed specifically for the M5Stack
  Cardputer ADV hardware. Built on the ESP32 platform using the Arduino framework,
  it features complex life stage management, mini-games, and an automated OTA asset
  provisioning system.
slug: raising-hell-cardputer-adv-edition
codeUrl: https://github.com/acpayers-alt/raising-hell-cardputer
version: v2.0.2
lastUpdated: '2026-04-18'
licenses:
- MIT
image: /202604/raising-hell-cardputer_0.avif
rtos: freertos
libraries:
- spiffs
topics:
- arduino
- cardputer
- embedded-game
- esp32
- firmware
- m5stack
- virtual-pet
isShow: true
createdAt: '2026-04-19T00:04:58+00:00'
updatedAt: '2026-04-19T00:04:58+00:00'
---

Raising Hell is a virtual pet experience designed for the M5Stack Cardputer ADV, bringing an infernal twist to the classic Tamagotchi-style gameplay. Players are tasked with raising an infernal companion through various life stages, managing its survival through feeding, play, and sleep cycles. The game explores themes of growth, decay, and resurrection, all within the portable form factor of the ESP32-powered Cardputer.


### Hardware and Interaction

The project is optimized for the M5Stack Cardputer ADV, utilizing its ESP32 processor clocked at 240 MHz. A critical requirement for the game is an SD card, which serves as the primary storage for game assets. Interaction is handled through the Cardputer's integrated keyboard and sensors. While the arrow keys and Enter/G keys provide standard navigation and confirmation, the game also incorporates unique hardware features like "Shake to Wake," which uses the device's IMU to turn the screen back on.

For accessibility and ease of use, the game supports alternate navigation schemes. Players can use E, A, S, D or O, J, K, L keys for one-handed operation. Dedicated hotkeys (Z through M) allow for quick switching between different tabs, such as feeding, games, and health management.

### Technical Architecture and Asset Management

One of the standout technical features of Raising Hell is its automated provisioning system. Rather than requiring users to manually manage image files on an SD card, the firmware is designed to detect missing assets on the first boot. If required files are not found, the game connects to Wi-Fi and downloads the necessary asset packs via Over-the-Air (OTA) updates, storing them directly on the SD card.

![The pet selection screen in Raising Hell](/202604/raising-hell-cardputer_2.avif)

The codebase is currently undergoing a significant architectural refactor. The development direction focuses on moving away from legacy global variables toward a modular state architecture. This includes strict include hygiene and a clear separation between the platform-specific hardware logic and the core gameplay mechanics. The project utilizes a "Huge APP" partition scheme (3MB No OTA / 1MB SPIFFS) to accommodate the game logic while leaving room for local data storage.

### Gameplay Mechanics

Raising your pet involves navigating a series of menus to manage its vital statistics. Players must balance feeding and entertainment through mini-games while monitoring the pet's health to prevent decay. Each stage of the pet's life brings new challenges and visual changes, culminating in either a successful life cycle or the eventual need for resurrection.

![Interface for caring for and feeding your infernal pet](/202604/raising-hell-cardputer_6.avif)

### Installation and Development

There are several ways to deploy Raising Hell to a Cardputer device. The recommended method is via M5Launcher, which handles the firmware flashing directly on the device. Alternatively, developers can use M5Burner for a GUI-based desktop experience or flash the binary manually using PlatformIO or esptool. For those building from source, the project requires the M5Cardputer library, Adafruit NeoPixel for LED feedback, and ArduinoJson for configuration management.

![The mourning screen showing the end of a pet's life cycle](/202604/raising-hell-cardputer_9.avif)

As the project evolves, it continues to refine its open-source readiness, aiming for a clean, modular structure that allows other developers to fork, port, or improve upon the infernal pet simulation engine.
