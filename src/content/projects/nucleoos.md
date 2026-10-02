---
title: NucleoOS
summary: NucleoOS is a web-native operating system designed for the M5Stack Cardputer
  (ESP32-S3), featuring both a native firmware UI and a desktop-class web shell. Built
  on the ESP-IDF framework and FreeRTOS, it optimizes constrained hardware (512 KB
  RAM) by offloading heavy tasks like AI and image generation to the browser via WebAssembly
  and WebGPU. The system includes a wide array of applications ranging from offline
  AI assistants and media players to a suite of security-testing tools.
slug: nucleoos
codeUrl: https://github.com/indecenti/NucleoOs
version: v0.2.11
lastUpdated: '2026-07-23'
licenses:
- NOASSERTION
image: /202607/NucleoOs_6.avif
rtos: freertos
libraries:
- lwip
- nimble
topics:
- cardputer
- embedded
- esp-idf
- esp32
- esp32-s3
- firmware
- iot
- m5stack
- offline-ai
- operating-system
- pwa
- rtos
- wasm
isShow: true
createdAt: '2026-07-29T04:15:51+00:00'
updatedAt: '2026-07-29T04:15:51+00:00'
relatedProjects:
- purplx-cyberdeck-os-for-m5stack-cardputer-adv
- loadout-for-m5stack-tab5
- minios-esp
- xc-os-a-lightweight-graphical-os-for-mcus
- m5apps
- bruce-firmware
---

NucleoOS is a modern, multi-app operating system designed specifically for the M5Stack Cardputer. Despite the hardware constraints of the ESP32-S3—which features no PSRAM and only approximately 512 KB of RAM—NucleoOS provides a rich, desktop-class experience. It achieves this through a unique "web-native" architecture where the firmware runs on the device while a browser serves as a powerful operator console.

### The Dual-Interface Design

The core innovation of NucleoOS is its split interface strategy. Heavy computational work is offloaded to the browser to preserve the limited 18 KB device heap. This results in two distinct but integrated user experiences:

*   **Native Firmware:** Optimized for the Cardputer’s 240x135 screen, this interface uses large fonts and autocomplete features for quick access to games, security tools, and media players.
*   **NucleoOS Web:** Served directly from the device to any browser on the local network, this interface provides a desktop-class environment with windows, mouse support, and drag-and-drop functionality for complex tasks like file management and spreadsheets.


### Hardware and Universal Compatibility

NucleoOS is designed to run on both the original M5Stack Cardputer and the newer Cardputer ADV. The system uses a universal binary that automatically detects the hardware version at boot, adjusting the keyboard mapping and audio codec HAL accordingly. This allows developers to build a single firmware image that supports multiple board revisions.

![M5Stack Cardputer (original) and Cardputer ADV](/202607/NucleoOs_8.avif)

### AI and Offline Capabilities

A standout feature is ANIMA, an integrated AI assistant that operates fully offline. It utilizes a retrieval cascade architecture (L0-L2) to ensure grounded, hallucination-free responses. ANIMA runs in three identical environments: the device firmware (C), the browser (WebAssembly), and a PC host harness. For more demanding tasks, the system can integrate with frontier models like Claude or Gemini, or use local WebGPU-accelerated models in the browser for image generation and editing.

![NucleoOS native UI on the Cardputer — launcher, music and video](/202607/NucleoOs_7.avif)

### Security and Multimedia Features

The operating system includes an extensive suite of native applications. For multimedia, it features a film player capable of MJPEG/MP3 playback, an MP3 player, and an internet radio. For utility, it provides pocket instruments like a bubble level, pedometer, and IR remote. 

NucleoOS also includes a dedicated security lab. This toolkit provides capabilities for authorized research and testing across various protocols, including Wi-Fi (sniffing and deauthentication), Bluetooth LE, and Ethernet. The Ethernet engine is particularly noteworthy, featuring a hand-rolled MACRAW driver for the W5500 module that bypasses standard TCP/IP stacks for low-level network interactions.

### Technical Innovations and Memory Management

To survive on 512 KB of SRAM, NucleoOS employs several advanced memory management techniques. It uses an "exclusive mode" where background services are suspended to reclaim heap for demanding apps. Additionally, the system utilizes an event-sourced bus for observability and state management across ESP-NOW peers. The "retrieval cascade" for the AI assistant uses binary embeddings and integer math, making it highly efficient for a microcontroller without a floating-point unit (FPU).

### Development and Deployment

The project emphasizes a "host first, flash last" development workflow. Developers can test the ANIMA C core on a PC or use a zero-dependency device simulator to iterate on web shell applications without touching the hardware. Deployment is handled via a robust OTA (Over-the-Air) update system with A/B partitions and automatic rollback to prevent bricking during updates.
