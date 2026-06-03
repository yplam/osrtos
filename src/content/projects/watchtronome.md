---
title: WatchTronome
summary: An open-source metronome application for the Huawei Watch GT2 Pro running
  LiteOS. It provides a tactile metronome experience by utilizing the watch's vibration
  motor to signal beats, allowing musicians to feel the tempo directly on their wrist.
slug: watchtronome
codeUrl: https://github.com/samlach2222/WatchTronome
star: 5
lastUpdated: '2023-12-01'
rtos: liteos
topics:
- huawei
- liteos
- metronome
- music
- watch
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- opentimewatch-os
- zephyrwatch
- wasp-os
- zswatch
- leta
- lvgl-watch-firmware-for-open-smartwatch
---

WatchTronome is an open-source application specifically designed for the Huawei Watch GT2 Pro. It transforms the smartwatch into a discreet, tactile metronome by leveraging the device's internal vibration motor. Unlike traditional metronomes that rely on audible clicks or visual cues, WatchTronome allows musicians to feel the tempo directly on their wrist, making it an ideal tool for live performances or practice sessions where audio clarity or silence is paramount.

The application is built for LiteOS, the lightweight real-time operating system that powers many of Huawei's wearable devices. By targeting this specific platform, WatchTronome can provide precise timing and efficient power management, ensuring that the metronome remains consistent throughout long practice sessions without significantly draining the watch's battery.

### Key Features and Functionality

The primary interface of WatchTronome is designed for ease of use on a small wearable screen. Users can adjust the beats per minute (BPM) and start or stop the vibration sequence with simple touch controls. The core innovation lies in its haptic feedback; by using vibrations instead of sound, it provides a private rhythm reference that doesn't interfere with the music being played or recorded. This is particularly useful for drummers, conductors, or any performer who needs to maintain a steady tempo in a loud environment.

### Technical Implementation

The project follows the standard structure for HarmonyOS and LiteOS wearable applications. It utilizes the Gradle build system, as evidenced by the inclusion of `gradlew` and `settings.gradle` files, and is typically developed using Huawei's DevEco Studio. The application logic is contained within the `entry` module, which is the standard entry point for HarmonyOS-based feature abilities (HAPs).

### Availability and Installation

WatchTronome is intended to be distributed through the Huawei Health app ecosystem. Users with a compatible Huawei Watch GT2 Pro can access the application via the AppGallery icon within the Huawei Health smartphone app. This integration allows for seamless deployment from the smartphone to the wearable device. 

As an open-source project, WatchTronome provides a clear example of how to develop functional, hardware-integrated applications for the LiteOS platform, specifically focusing on haptic feedback and user interface design for smartwatches. It serves as both a practical tool for musicians and a reference for developers interested in the Huawei wearable ecosystem.
