---
title: ESP32 Controller for Charlton & Jenrick Fireplace
summary: An ESP32-based firmware for controlling Charlton & Jenrick fireplaces using
  a CC1101 433 MHz transceiver. It supports multiple RF modulation profiles (2-FSK
  and ASK/OOK) and integrates with Home Assistant via MQTT while offering a standalone
  web interface.
slug: esp32-controller-for-charlton-jenrick-fireplace
codeUrl: https://github.com/Cian911/esp32-fireplace-controller
star: 33
lastUpdated: '2025-12-31'
rtos: freertos
topics:
- cc1101
- esp32
- fireplace
- homeassistant
- mqtt
- radio
- reverse-engineering
isShow: true
image: /202601/cc1101.webp
createdAt: '2026-01-14'
updatedAt: '2026-01-14'
relatedProjects:
- esp32-jarolift-controller
- mitsubishi-ecodan-air-to-water-bridge-for-cn105-to-mqtt
- genius-gateway
- esp32-balboa-spa-controller
- everblu-cyble-enhanced-rf-meter-reader
- pellet-stove-aws-iot-bridge-for-esp32
---

The ESP32 Controller for Charlton & Jenrick Fireplace is an open-source firmware project designed to modernize the control of domestic fireplaces. By combining an ESP32-WROOM-32 microcontroller with a CC1101 433 MHz transceiver, this project reverse-engineers the RF signals used by proprietary remotes to allow for smart home integration and web-based control.

## Hardware and RF Capabilities

The project leverages the CC1101 module to transmit captured RF payloads. Because Charlton & Jenrick fireplaces utilize different modulation schemes depending on the model, the controller supports two distinct "families":

- **iRange remotes**: These utilize a 2-FSK (Frequency Shift Keying) profile.
- **Non-iRange remotes**: These utilize an ASK/OOK (Amplitude Shift Keying / On-Off Keying) profile, common in models like the 1250E, 1500E, and 1800E.

The hardware setup is straightforward, requiring only an ESP32 dev kit and a CC1101 module. It is critical that the CC1101 is powered via the 3.3V rail, as it is not 5V tolerant. The wiring uses the standard SPI bus (GPIO 18, 19, 23, and 5) along with a GDO0 pin for library-specific signaling.

## Smart Home Integration

One of the primary strengths of this project is its seamless integration with modern smart home ecosystems. It provides two main interfaces for user interaction:

1.  **Home Assistant via MQTT**: The controller supports MQTT auto-discovery. Once configured, the fireplace appears in Home Assistant as switch and button entities. This allows for automation, such as turning on the fireplace based on room temperature or time of day.
2.  **Web Interface**: For users who do not use a central hub, the ESP32 hosts a simple, mobile-friendly web UI. By visiting the device's IP address, users can access buttons for power, navigation, flame effects, and sound settings.

## Technical Implementation

The project is built using the PlatformIO ecosystem and the Arduino framework. It relies on the `mfurga/cc1101` library for low-level transceiver management and `knolleary/PubSubClient` for MQTT communication. 

A key architectural feature is the use of compile-time profiles. Users select their specific fireplace type (iRange or non-iRange) via PlatformIO environments. This selection determines which payload headers (`irange_payloads.h` or `non_irange_payloads.h`) are included and which modulation settings are applied to the CC1101. 

```cpp
#if defined(REMOTE_PROFILE_IRANGE)
  #include "irange_payloads.h"
#elif defined(REMOTE_PROFILE_NON_IRANGE)
  #include "non_irange_payloads.h"
#else
  #error "Select a payload profile"
#endif
```

## Supported Functions

The project has successfully reverse-engineered several core functions from the original remotes, including:
- Power ON/OFF
- Navigation (Left/Right arrows)
- Setting adjustments (Plus/Minus)
- Flame effect toggling
- Sound control

While the project is highly functional, it does note a limitation regarding synchronization. Because the original remotes transmit data at high speeds, the CC1101 may not always catch manual remote presses, meaning the software state and the physical remote state can occasionally drift out of sync. However, for automated smart home use, the controller provides a reliable way to manage fireplace settings without the original hardware remote.
