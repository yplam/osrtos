---
title: Espframe for Immich
summary: A standalone digital photo frame firmware built with ESPHome for the ESP32-P4,
  designed to stream photos directly from an Immich server. It features smart portrait
  pairing, automatic tone adjustment, and local network privacy without requiring
  external hubs or cloud services.
slug: espframe-for-immich
codeUrl: https://github.com/jtenniswood/espframe
siteUrl: https://jtenniswood.github.io/espframe/
version: v1.8.0
lastUpdated: '2026-04-20'
image: /202604/espframe_0.avif
rtos: freertos
libraries:
- lwip
topics:
- esp32
- esphome
- immich
isShow: true
createdAt: '2026-04-21T05:22:42+00:00'
updatedAt: '2026-04-21T05:22:42+00:00'
---

Modern digital photo frames often come with strings attached—proprietary cloud subscriptions, privacy concerns, or the need for a central home automation hub to manage the logic. Espframe takes a different approach by providing a completely standalone firmware for the Guition ESP32-P4 touchscreen that communicates directly with your Immich photo library over a local network.

### High-Performance Hardware Integration

The project is specifically optimized for the ESP32-P4, a high-performance microcontroller from Espressif designed for multimedia applications. By leveraging the P4's capabilities, Espframe can handle high-resolution image decoding and display tasks that would struggle on lesser hardware. It integrates specialized ports of `libjpeg-turbo` and `libwebp` specifically adapted for the ESP-IDF framework, ensuring that even large, modern smartphone photos are processed efficiently and displayed smoothly.

### Intelligent Display Features

One of the most impressive technical aspects of Espframe is how it handles different photo orientations. Traditional digital frames often struggle with portrait-oriented photos on landscape displays, typically leaving large black bars on either side. Espframe implements a "Smart Portrait Pairing" system that detects portrait photos and pairs them side-by-side if they were taken on the same day. This creates a cohesive, edge-to-edge display that feels intentional rather than a compromise.

For single photos that do not perfectly fit the screen's aspect ratio, the project uses an "Accent Color Fill" technique. Instead of standard black letterboxing, the system samples colors from the photo itself to create a muted, tinted background for the letterboxed areas, resulting in a more immersive viewing experience.

### Seamless Immich Integration

Espframe connects directly to your self-hosted Immich server via HTTP or HTTPS. Because it runs on bare hardware without a middleman, your photo library remains private and accessible only over your local network. Users can configure the frame to pull from various sources within their Immich library, including:

*   All photos or favorites
*   Specific albums or people
*   "On this day" memories
*   Custom date-filtered ranges

### Configuration and Customization

Despite being a firmware project, Espframe is designed for ease of use. It includes a built-in web UI for configuration, allowing you to update your Immich API keys, server URLs, and slideshow intervals directly from a browser. It also features advanced display management, such as screen scheduling to turn off the display at night and automatic tone adjustment. The "Night Tone" feature automatically warms the screen's color temperature between sunset and sunrise, reducing blue light exposure in dark rooms.

For those looking to build their own, the project supports the JC8012P4A1 10-inch panel and provides links to 3D-printable stands, making it a complete DIY solution for a high-quality, privacy-focused digital photo frame.
