---
title: Relive
summary: Relive is an AI-driven photo curation and management system designed to rediscover
  memories stored on NAS devices. It features a distributed architecture with Go-based
  services, Python ML workers for facial recognition, and a custom ESP32-S3 color
  e-ink photo frame for daily content display.
slug: relive
codeUrl: https://github.com/davidhoo/relive
version: v1.5.2
lastUpdated: '2026-04-14'
licenses:
- MIT
image: /202604/relive.webp
rtos: freertos
topics:
- dithering
- diy
- e-ink
- e-paper
- esp32
- image-processing
- iot
- memories
- open-source
- photo-frame
- photography
- self-hosted
- smart-home
isShow: true
createdAt: '2026-04-20T08:16:56+00:00'
updatedAt: '2026-04-20T08:16:56+00:00'
---

Relive is a comprehensive, self-hosted ecosystem designed to solve the problem of "digital hoarding." While many users store thousands of family photos on Network Attached Storage (NAS) devices, these images often sit unvisited for years. Relive breathes life back into these archives by using artificial intelligence to understand photo content and proactively presenting meaningful moments on dedicated hardware displays.

### Modular Architecture
The system is built with a highly modular design, allowing users to distribute the computational load across different machines. The core components include:

*   **Web Management Backend**: A Go-based service that orchestrates photo scanning, metadata management, and display strategies.
*   **AI Microservices**: Utilizing **InsightFace**, the system performs face detection and automated clustering to identify family and friends. For users with large libraries, the `relive-analyzer` and `relive-people-worker` can be offloaded to high-performance hardware, such as a Mac with M-series silicon or a dedicated GPU server, to accelerate processing.
*   **Smart Curation Engine**: Instead of simple random slideshows, Relive uses an event-driven engine with six "nomination channels." It intelligently selects photos based on "On This Day" logic, aesthetic scores, geographic locations, and seasonal themes.

### Custom Hardware: The E-Ink Photo Frame
A standout feature of the Relive project is its dedicated hardware integration. The repository provides full open-source support for a physical photo frame based on the **ESP32-S3** microcontroller and a 7.3-inch **Spectra 6 color e-ink display** (800x480). 

This hardware is designed for home environments where aesthetics and battery life are paramount. The frame utilizes the ESP32's deep sleep capabilities to achieve a standby current of approximately 10μA, allowing it to run for extended periods on battery power. It connects to the Relive server via Wi-Fi, automatically waking up at scheduled intervals to fetch and render the day's curated memory. The hardware design—including schematics, PCB layouts, and BOM—is publicly available, making it a true Open Source Hardware (OSHW) project.

### Intelligent Memory Discovery
Relive goes beyond basic EXIF data. By integrating various AI providers (including Ollama, vLLM, and OpenAI), the system generates descriptive tags and aesthetic ratings for every image. The facial recognition system is particularly robust, supporting iterative feedback-driven clustering. This allows the system to "learn" who the most important people in your life are, ensuring that the most relevant faces appear more frequently on your display.

### Deployment and Extensibility
Designed for the self-hosting community, Relive is primarily deployed via Docker Compose. The setup is flexible enough to support local model execution for privacy-conscious users or cloud-based APIs for those who prefer not to manage local AI infrastructure. While the current primary display target is the ESP32 e-ink frame, the project's roadmap includes expanding to mobile apps, screen savers, and web-based viewers, making your photo library accessible across all your devices.
