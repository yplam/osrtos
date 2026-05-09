---
title: Open Wink Headlight Mod
summary: An open-source hardware and software suite for Mazda Miata MX-5 enthusiasts
  to customize pop-up headlight behavior. The project utilizes an ESP32-S3 running
  FreeRTOS to manage BLE communication, custom animations, and OTA updates via a dedicated
  React Native application.
slug: open-wink-headlight-mod
codeUrl: https://github.com/seasaltsaige/openwink
siteUrl: https://miatawinktech.netlify.app
lastUpdated: '2026-05-03'
licenses:
- GPL-3.0
rtos: freertos
topics:
- ble
- cars
- miata
- wink
isShow: false
createdAt: '2026-05-09T00:22:22+00:00'
updatedAt: '2026-05-09T00:22:22+00:00'
---

The Mazda Miata MX-5 is iconic for its pop-up headlights, and the "wink"—where one headlight remains down while the other pops up—is a favorite gesture among owners. The Open Wink project modernizes this classic modification by providing a community-driven, open-source alternative to proprietary kits. It offers a sophisticated ecosystem consisting of a custom hardware module, a cross-platform mobile application, and a dedicated update server.

## The Wink Module

At the core of the system is the Wink Module, a custom PCB powered by the ESP32-S3 microcontroller. This choice of MCU provides robust Bluetooth Low Energy (BLE) capabilities, including support for Coded PHY, which ensures reliable communication even in the electrically noisy environment of a vehicle's engine bay. The module is designed for a plug-and-play installation, allowing users to integrate it into their Miata's headlight circuitry without the need for destructive wire splicing.

The firmware is developed in C++ using the Arduino framework and leverages FreeRTOS to manage concurrent operations. This RTOS-based architecture allows the module to simultaneously monitor physical hardware button inputs and handle incoming BLE commands from the mobile app without latency. This ensures that headlight actuations remain crisp and responsive.

## Intelligent Control and Customization

The project goes far beyond simple winking. Through the React Native controller application, users can access a variety of advanced features:

*   **Sleepy Eye Mode:** Allows for precise, per-headlight positioning to achieve a custom "half-up" look.
*   **Wave Delay:** Users can fine-tune the timing between headlight actuations to create a personalized waving style.
*   **Custom Commands:** The app allows for the creation and storage of unique headlight animations, which can be triggered on demand.
*   **OEM Button Remapping:** One of the most powerful features is the ability to assign custom actions to the original dashboard retractor button. By detecting sequential presses (from 2 to 9), the module can execute complex animations or custom commands without the user ever needing to open the mobile app.

## Connectivity and Maintenance

Maintaining embedded hardware in a vehicle can often be cumbersome, but Open Wink simplifies this through a dedicated Update Server. The system supports Over-the-Air (OTA) firmware updates, allowing users to push bug fixes and new features to the module via the mobile app. This ensures the hardware stays up to date with the latest community-driven improvements without requiring the owner to remove the module from the car or connect it to a computer.

By combining modern wireless technology with real-time task management on the ESP32-S3, Open Wink provides Miata owners with a high level of control over their vehicle's personality while maintaining the spirit of open-source collaboration.
