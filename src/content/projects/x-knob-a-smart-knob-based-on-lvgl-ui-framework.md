---
title: 'X-Knob: A Smart Knob Based on LVGL UI Framework'
summary: X-Knob is an open-source smart knob project featuring a brushless motor for
  haptic feedback and a circular LCD for a dynamic UI. It is built using the ESP32-S3
  microcontroller, the LVGL graphics library, and the X-TRACK UI framework, supporting
  features like MQTT integration for Home Assistant and Surface Dial functionality.
slug: x-knob-a-smart-knob-based-on-lvgl-ui-framework
codeUrl: https://github.com/SmallPond/X-Knob
star: 829
version: v1.3.1
lastUpdated: '2024-04-14'
rtos: freertos
libraries:
- lvgl
topics:
- arduino
- esp32
- knob
- lvgl
- mqtt
- simplefoc
- smart
- surface-dial
- wifi
- x-track
isShow: true
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- deck
- openhasp-firmware
- esp32-s3-smart-home-control-panel
- flatsphere-clock
- project-aura
- omote-open-universal-remote
---

X-Knob is a sophisticated open-source hardware project that reimagines the user interface of a traditional rotary encoder. By combining a brushless DC motor with a circular LCD and a magnetic encoder, it creates a "smart knob" capable of providing dynamic haptic feedback and a rich graphical user interface. The project is a spiritual successor to the well-known smart_knob project, but it optimizes the design by using more accessible hardware and a more powerful UI framework.

At the heart of X-Knob is the ESP32-S3 WROOM-1U, a powerful microcontroller that handles both the motor control and the display rendering. The display is a 1.28-inch GC9A01 circular LCD, which fits perfectly into the knob's form factor. For haptic feedback, the project utilizes a 3205 brushless motor paired with an MT6701CT magnetic encoder, allowing for precise control over the knob's rotation and the creation of various "virtual" mechanical behaviors through software-defined haptics.

One of the standout features of X-Knob is its integration of the LVGL (Light and Versatile Graphics Library) framework. This allows for smooth, high-quality animations and complex menu systems that were previously difficult to implement on resource-constrained embedded devices. The project also incorporates the X-TRACK UI framework, which provides a robust message communication mechanism based on a Publisher/Subscriber model, facilitating interaction between the UI components and the underlying hardware events.

X-Knob supports seven distinct knob modes, which are achieved through the SimpleFOC library and precise magnetic encoding. These modes include:
- **Boundary limits**: The knob stops at specific physical points.
- **Ratchet/Detents**: Simulates the feel of a mechanical click or gear.
- **Rebound/Spring**: The knob returns to a center position when released.
- **Combinations**: Various configurations to simulate different physical controls like volume sliders or mode selectors.

Beyond its physical interface, X-Knob is a fully connected IoT device. It supports MQTT, enabling it to integrate seamlessly with Home Assistant. This allows users to control smart home devices—such as lights, fans, or thermostats—directly from the knob. It also supports the Surface Dial protocol, making it a versatile peripheral for PC applications like design software or media controllers.

The project is designed with power management in mind, featuring battery management for a 600mAh lithium battery, system deep sleep modes, and automatic screen dimming. The latest hardware revision (V2) even includes UPS (Uninterruptible Power Supply) support, ensuring the device remains functional during power transitions.

For developers looking to build their own, the project is managed via PlatformIO and the arduino-esp32 framework. The repository provides a clear path for configuration, including setting up WiFi and MQTT credentials through a `secrets.h` file. With support for OTA (Over-The-Air) updates, the X-Knob is not just a prototype but a polished, extensible platform for modern embedded UI experimentation.
