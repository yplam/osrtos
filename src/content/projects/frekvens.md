---
title: Frekvens
summary: Frekvens is an open-source ESP32 firmware modification for IKEA Frekvens
  and Obegränsad LED displays. It adds smart-home integrations, 35+ display modes,
  and real-time connectivity via MQTT and WebSockets, transforming static hardware
  into internet-connected IoT displays.
slug: frekvens
codeUrl: https://github.com/VIPnytt/Frekvens
version: v2.3.2
lastUpdated: '2026-04-17'
licenses:
- MIT
rtos: freertos
libraries:
- lwip
- spiffs
topics:
- arduiono
- display
- esp32
- ikea
- ikea-frekvens
- ikea-obegransad
- led
- mod
- swedish-house-mafia
- teenage-engineering
isShow: false
createdAt: '2026-04-18T01:38:57+00:00'
updatedAt: '2026-04-18T01:38:57+00:00'
---

The IKEA Frekvens and Obegränsad series are beloved for their minimalist aesthetic, but their stock functionality is often limited to basic patterns or sound-reactive modes. **Frekvens** is a comprehensive open-source firmware project designed to unlock the full potential of these displays by replacing their factory controllers with the powerful ESP32 microcontroller. This modification transforms simple LED panels into sophisticated, internet-connected smart home displays capable of showing weather, clocks, animations, and real-time notifications.

### Hardware Integration and Modifications

The project is a hardware-focused modification that requires internal access to the IKEA devices. For both the Frekvens and Obegränsad models, the process involves desoldering the original controller chips—the 89F112 or similar—to gain direct access to the LED driver interface. This allows the ESP32 to take over the signaling for the display's SCT2024 driver chips.

A critical technical requirement for this mod is the use of logic level shifters. While the ESP32 operates at 3.3V, the IKEA panels typically use 4V or 5V logic with internal pull-up resistors. Connecting the ESP32 directly risks hardware damage or communication instability. By bridging signal lines for SPI communication (CS, SCLK, MOSI) and Output Enable (OE) through a level shifter, the system achieves stable 5V signaling.

Power management is another key consideration. These displays can draw significant current, especially during high-brightness PWM dimming. The project recommends adding decoupling capacitors (totaling approximately 85 µF) near the driver chips to mitigate electrical noise and prevent the unexpected reboots that often plague underpowered ESP32 projects.

### Features and Smart Home Connectivity

Once the hardware is prepared, the firmware provides a massive leap in functionality over the stock IKEA experience. It includes 35 distinct display modes, ranging from digital clocks and weather forecasts to complex animations and text scrolling.

The inclusion of the ESP32 brings modern connectivity to the forefront:

- **Smart Home Ecosystem**: Deep integration with Home Assistant and Amazon Alexa allows users to control brightness, toggle power, and switch modes via voice or automation.
- **Extensible APIs**: For developers, the project exposes four different API interfaces: MQTT, RESTful, Server-Sent Events (SSE), and WebSockets. This makes it easy to push custom data to the display from external scripts or services.
- **Web-Based Management**: A built-in web application allows for over-the-air (OTA) updates and configuration of Wi-Fi credentials, eliminating the need to connect the device to a computer after the initial setup.

### Configuration and Development

Frekvens is built using the PlatformIO ecosystem, which simplifies dependency management and cross-board compatibility. Configuration is handled through a dual-file system: a `.env` file for shared environment variables and a `secrets.h` file for hardware-specific pin assignments and private credentials.

```h
// Example pin mapping in secrets.h
#define PIN_CS 1   // Chip Select (LAK/CLA)
#define PIN_SCLK 2 // SPI Clock (CLK)
#define PIN_MOSI 3 // Data Input (DA/DI)
#define PIN_OE 4   // Output Enable (EN)
#define PIN_SW1 5  // Button 1
#define PIN_MIC 7  // Microphone Input
```

The firmware is designed to be modular, allowing users to disable features like OTA to save memory on 4MB flash boards, while fully utilizing the 8MB flash available on newer ESP32-S3 variants.

### Expanding Capabilities

The modular nature of the firmware extends to optional hardware. Users can add IR receivers for traditional remote control, photocells for automatic brightness adjustment, or RTC modules for precise timekeeping without an internet connection. For the Frekvens model, the firmware can even tap into the existing integrated microphone to drive music-reactive visualizations.

By combining clever hardware repurposing with a modern software stack, Frekvens turns affordable furniture into a high-end, customizable IoT display platform.
