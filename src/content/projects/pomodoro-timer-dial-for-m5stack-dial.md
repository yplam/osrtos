---
title: Pomodoro Timer Dial for M5Stack Dial
summary: An efficient and modular Pomodoro timer implementation specifically designed
  for the M5Stack Dial v1.1. It leverages the ESP32-S3 to provide a smooth rotary-based
  user interface, smart break calculations, and a high-performance display engine
  with SPIFFS-based asset management.
slug: pomodoro-timer-dial-for-m5stack-dial
codeUrl: https://github.com/sfrechette/pomodoro-timer-dial
lastUpdated: '2026-03-03'
licenses:
- MIT
rtos: ''
libraries:
- spiffs
topics:
- c
- cpp
- esp32
- esp32-s3
- m5dial
- m5stack
- platformio
- pomodoro
- pomodoro-timer
isShow: true
image: /202606/pomodoro-timer.webp
createdAt: '2026-06-04T23:38:17+00:00'
updatedAt: '2026-06-04T23:38:17+00:00'
relatedProjects:
- tomato32
- pomodesk-physical-pomodoro-timer
- focus-dial
- geek-magic-firmware
- flatsphere-clock
- deck
---

The Pomodoro Timer Dial is a sophisticated implementation of the popular productivity technique, tailored specifically for the M5Stack Dial v1.1 hardware. By combining the ESP32-S3's processing power with the unique physical form factor of a rotary encoder and a circular touch display, this project offers a tactile and intuitive way to manage focus sessions and breaks.

### Hardware Synergy

This project is built to take full advantage of the M5Stack Dial's features. The rotary dial serves as the primary input for adjusting work durations, while the central button handles state transitions like starting, pausing, and resetting the timer. The circular 240x240 display provides rich visual feedback, including a progress ring that shrinks as time elapses and tomato icons that track completed sessions.

### Intuitive User Experience

The interface is designed for minimal friction. In the "Ready" state, users can simply rotate the dial to set their desired work duration. A short press of the button starts the countdown. The UI is color-coded to provide instant status awareness: red for work sessions, green for short breaks, and orange for long breaks. 

One of the standout features is the **Smart Break Calculation**. By default, the system follows a 1/5 rule: if you adjust your work duration using the dial, the timer automatically recalculates the short break to be one-fifth of that time. For example, setting a 20-minute work session will automatically configure a 4-minute short break, ensuring your rest periods scale naturally with your effort.

### Technical Architecture

The codebase is organized into a modular structure that emphasizes maintainability and performance. The logic is separated into several key components:

- **TimerManager**: This module encapsulates the core logic of the Pomodoro technique. It manages transitions between work, short breaks, and long breaks, handles the buzzer alerts, and maintains the pomodoro counter.
- **Display**: A dedicated module for rendering the UI. It implements smart redrawing techniques to minimize CPU usage, only updating elements that have actually changed. It also handles the loading of icons from the SPIFFS filesystem.
- **InputHandler**: This component processes multi-modal input, including the rotary encoder, capacitive touch, and physical button presses. It includes software debouncing and distinguishes between short and long presses to prevent accidental resets.

### Performance and Optimization

Despite the rich visual interface, the project is highly optimized for the ESP32-S3. It achieves a consistent frame rate of approximately 60 FPS while implementing adaptive loop timing. During idle states, the system reduces its polling frequency, leading to a 40% reduction in CPU usage. The memory footprint is also remarkably low, utilizing only about 22KB of RAM and 15% of the available flash memory.

### Customization and Configuration

For users who want to dive deeper, the project offers extensive customization through a dedicated on-device settings menu accessed via a gear icon. Users can adjust work and break durations, set the number of sessions required before a long break, and tune the display brightness across six levels. 

Advanced users can further modify the `src/config.h` file to change the visual theme or default hardware constants:

```cpp
constexpr uint16_t SCREEN_WIDTH = 240;
constexpr uint16_t SCREEN_HEIGHT = 240;
constexpr uint8_t CIRCLE_RADIUS = 90;
constexpr uint8_t CIRCLE_THICKNESS = 12;

// Default Timer Settings
constexpr uint16_t DEFAULT_WORK_DURATION = 25 * 60; // 25 minutes
constexpr uint16_t DEFAULT_SHORT_BREAK = 5 * 60;    // 5 minutes
constexpr uint16_t DEFAULT_LONG_BREAK = 25 * 60;    // 25 minutes
```

By utilizing the SPIFFS filesystem, the project stores high-quality PNG icons for the Pomodoro and settings icons, ensuring a professional look that goes beyond simple geometric shapes. This combination of thoughtful hardware integration, smart logic, and optimized code makes the Pomodoro Timer Dial an excellent example of a modern embedded productivity tool.
