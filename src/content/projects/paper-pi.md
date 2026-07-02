---
title: Paper Pi
summary: Paper Pi is a modular, asynchronous dashboard designed for Waveshare E-Ink
  displays, built with Python 3.14+. It targets Raspberry Pi and other Linux-based
  boards, providing a variety of widgets such as GitHub stats, weather, and HackerNews
  with support for 4-level grayscale rendering.
slug: paper-pi
codeUrl: https://github.com/palemoky/paper-pi
siteUrl: https://gist.github.com/palemoky/b04f3dcfb8431784cddc648d1af6dd4c
version: v0.4.1
lastUpdated: '2026-05-23'
licenses:
- GPL-3.0
image: /202605/paper-pi_14.avif
rtos: ''
topics:
- eink
- epaper
- raspberry-pi
- waveshare
isShow: true
createdAt: '2026-05-24T00:36:00+00:00'
updatedAt: '2026-05-24T00:36:00+00:00'
relatedProjects:
- esphome-e-ink-4-color-dashboard
- ai-desk-card
- micropython-waveshare-e-paper-drivers
- git-contributions-e-ink-display
- esp32-p4-home-assistant-display
- esp-e-paper-component
---

Paper Pi is a modern, modular, and highly customizable dashboard for Waveshare E-Ink displays. Powered by Raspberry Pi and rendered in pixels, it is built using Python 3.14+ with async/await patterns and a clean, testable architecture. The project is designed to be easy to deploy and maintain, utilizing Docker to handle complex dependencies and hardware driver setups automatically.

### Quick Start and Deployment
The easiest way to get started with the system is through Docker. This approach ensures that all necessary drivers and dependencies are pre-configured for supported platforms, primarily the Raspberry Pi 3, 4, and 5 (64-bit). By using a containerized environment, users can quickly pull the latest image and run the dashboard with minimal manual intervention.


### Dashboard Widgets and Display Modes
The core functionality revolves around a versatile dashboard that can display various information widgets. These include customizable to-do lists with strikethrough support, auto-rotating HackerNews stories, and real-time weather updates via OpenWeatherMap. It also features integrations for GitHub contributions, Bitcoin prices, and VPS data usage monitoring.

![Dashboard Todo list widget](/202605/paper-pi_0.avif)

Beyond the primary dashboard, the system supports several specialized display modes. Users can switch to a "Quote" mode for daily inspiration, a "Poetry" mode featuring classical Chinese verses, or a "Wallpaper" mode for displaying custom images. 

![HackerNews display mode](/202605/paper-pi_1.avif)

### Smart Features and Automation
The system includes several intelligent features designed for a seamless user experience. It automatically triggers holiday greetings for birthdays, anniversaries, and major festivals such as the Lunar New Year, Mid-Autumn Festival, and Christmas. On December 31st, it generates an automatic Year-End Summary of GitHub contributions. 

To optimize for home use, it includes configurable "Quiet Hours" where the display can sleep, and time-based switching to toggle between different views (like moving from a TODO list to HackerNews in the evening). The rendering engine supports 4-level grayscale (white, light gray, dark gray, and black) to improve visual quality on E-Ink hardware. Additionally, it can integrate with Xiaomi speakers for audio notifications and alerts.

### Modular System Architecture
The software follows a modular, event-driven architecture with a clear separation of concerns. The system is organized into several layers:

*   **Control Layer**: Features a main orchestrator, task manager, and a configuration system that supports hot reloading via `watchdog`.
*   **Data Layer**: Handles data acquisition from external APIs and local sources, utilizing a TTL-based caching system with LRU eviction to manage state.
*   **Render Layer**: An image builder uses various layout strategies to construct the visual output, employing primitive renderers for text, icons, and shapes.
*   **Hardware Layer**: A driver factory manages communication with the E-Paper driver. It also includes a mock system that generates PNG files for testing without physical hardware.

### Hardware and Quality Standards
While optimized for the Waveshare 7.5-inch E-Paper HAT (V2), the project is configurable to support most Waveshare models by adjusting the `EPD_MODEL` environment variable. It is designed to run on Raspberry Pi Zero, 3, 4, or 5, or any Linux board with SPI/GPIO support. The codebase maintains high quality through strict type checking with mypy, linting with Ruff, and a robust suite of over 90 unit tests covering critical components.
