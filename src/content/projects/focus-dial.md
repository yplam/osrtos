---
title: Focus Dial
summary: Focus Dial is an ESP32-based productivity tool designed to manage focus sessions
  through physical hardware interaction. It integrates with Home Assistant to trigger
  environmental changes like lighting scenes and network-level distraction blocking
  while managing phone notifications via Bluetooth.
slug: focus-dial
codeUrl: https://github.com/sb-ocr/focus-dial
lastUpdated: '2024-12-31'
licenses:
- NOASSERTION
image: /202604/focus-dial_0.avif
rtos: freertos
topics:
- esp32
- focus
- pomodoro
isShow: true
createdAt: '2026-04-04T00:42:50+00:00'
updatedAt: '2026-04-04T00:42:50+00:00'
---

The Focus Dial is a DIY productivity device inspired by the concept of dedicated focus timers like the TimeChi. Built around the ESP32 microcontroller, it serves as a physical gateway to deep work, allowing users to initiate timed focus blocks with a simple tactile interface. By combining local hardware control with smart home integration, it transforms a workspace into a distraction-free zone.

## Deep Work Through Automation

The core functionality of the Focus Dial revolves around its ability to orchestrate a user's environment. When a focus session is activated, the device sends webhook triggers to Home Assistant. This allows for complex automations, such as changing smart lighting to a specific "focus" color, silencing smart speakers, or even blocking distracting websites and applications at the network level using tools like Pi-hole or AdGuard Home. 

Beyond environmental control, the device directly addresses one of the biggest sources of distraction: the smartphone. By leveraging the ESP32's connectivity, it can trigger Do Not Disturb modes on connected devices, ensuring that notifications don't break the user's flow during a critical work block.

## Hardware and UI Design

The device features a minimalist yet functional user interface. It utilizes a rotary encoder for navigation and time selection, paired with an SSD1306 OLED display for visual feedback on timer status and menu options. A NeoPixel ring provides peripheral visual cues, such as a glowing status indicator that changes color based on the current mode (e.g., focusing, on a break, or idle).

Under the hood, the firmware is built using the Arduino framework on the ESP32. It makes extensive use of specialized libraries to handle the hardware interactions:
- **RotaryEncoder & OneButton**: For smooth menu navigation and selection.
- **Adafruit GFX & SSD1306**: For rendering the user interface on the display.
- **NeoPixel**: For managing the visual status ring.
- **WiFiProvisioner**: To simplify the process of connecting the device to a local network without hardcoding credentials.

## Advanced Audio Capabilities

Interestingly, the project incorporates advanced audio features through the `ESP32-A2DP` and `Arduino Audio Tools` libraries. This suggests the hardware is capable of handling Bluetooth audio streaming, potentially allowing the Focus Dial to act as a controller for focus music or ambient noise directly during a session. This adds another layer to the sensory management of the workspace, making it a comprehensive tool for environmental control.

## Integration and Customization

Because the Focus Dial relies on standard webhooks for its Home Assistant integration, it is highly customizable. Users can define exactly what happens when the dial is turned or pressed. Whether it's locking a smart door, turning on a "Do Not Disturb" sign outside an office, or starting a specific Spotify playlist, the device acts as the physical trigger for a customized productivity ecosystem.
