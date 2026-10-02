---
title: AWTRIX NG
summary: AWTRIX NG is a comprehensive firmware rewrite for ESP32 and ESP32-S3 microcontrollers
  designed to transform LED matrix displays into networked smart screens. It features
  a dual-operational model supporting external control via HTTP/MQTT and native on-device
  scripting using the Berry language. The project integrates with Home Assistant and
  supports a wide range of visual elements, including scrolling text, icons, and real-time
  sensor data.
slug: awtrix-ng
codeUrl: https://github.com/Blueforcer/awtrix-ng
siteUrl: https://blueforcer.github.io/awtrix-ng/
version: v1.1.1
lastUpdated: '2026-09-16'
licenses:
- NOASSERTION
image: /202609/awtrix-ng_0.avif
rtos: freertos
libraries:
- littlefs
- lwip
topics:
- awtrix
- esp32
- matrix
- pixel
- ws2812
isShow: true
createdAt: '2026-09-17T01:48:55+00:00'
updatedAt: '2026-09-17T01:48:55+00:00'
relatedProjects:
- svitrix-firmware
- esp32-32x32-rgb-matrix-controller
- pixlpal-m1-firmware
- frekvens
- lumifur-controller
- lvgl-esphome-firmware-for-waveshare-esp32-p4-86-panel
---

AWTRIX NG represents a significant evolution in the world of DIY smart displays. As the successor to the popular AWTRIX 3, this project is a complete rewrite from the ground up, optimized for the ESP32 and ESP32-S3 platforms. It turns a simple 32x8 LED matrix into a sophisticated, networked information hub capable of displaying everything from simple time and date to complex data visualizations pushed from a home automation server.

One of the most compelling aspects of AWTRIX NG is its versatility in how it handles data. Users can choose between "pushed" notifications sent via simple HTTP POST requests or MQTT messages, and native applications that run directly on the hardware. For example, a simple `curl` command can scroll red text across the panel instantly:

```bash
curl -X POST http://awtrix-ng.local/api/v1/notifications \
  -H "Content-Type: application/json" \
  -d '{"text":"Hello world","textColor":"#FF0000"}'
```

For developers looking for more autonomy, AWTRIX NG introduces a powerful scripting engine based on Berry, a Python-like language designed specifically for microcontrollers. These scripts run on the device itself, allowing for complex logic, state management across reboots, and high-frequency rendering at approximately 40 frames per second. This means the display can continue to function and update its UI even if the local network or home automation server goes offline. Scripts can fetch data over HTTP, communicate via MQTT, and utilize the firmware's full visual vocabulary.

```berry
class Dashboard
  var level

  def loop()                     # keeps working, even off screen
    self.level = (self.level + 7) % 101
  end

  def draw()                     # ~40×/s while you are on screen
    effect("PlasmaCloud", {"speed": 0.3, "palette": "Ocean"})
    progress(self.level, 0x00FF00, 0x101010)
    ramp_text(1, 6, "NET", [0x00FFAA, 0x0066FF])
  end
end

return Dashboard()
```

The firmware is designed to be hardware-agnostic within the ESP32 ecosystem. Whether using a commercial Ulanzi TC001 clock, a custom AWTRIX 2 conversion, or a DIY WS2812B panel, the same firmware image applies. Pin mappings are handled through a user-friendly web interface rather than being hardcoded at compile time. This web UI also provides a live matrix preview, a built-in script editor, and full control over device settings.

Beyond just text, AWTRIX NG supports a rich visual vocabulary. It can render custom icons, draw charts, apply background effects, and play RTTTL melodies or MP3 files via a DFPlayer. Integration with Home Assistant is seamless thanks to MQTT auto-discovery, making it a favorite for smart home enthusiasts who want a physical dashboard for their sensors and automations. 

Technically, the project leverages the performance of the ESP32-S3 for advanced features like internet radio and increased memory for scripts. It uses an asynchronous networking model to ensure the UI remains responsive even during heavy network activity. With its focus on community-driven content through the AWTRIX Hub, users have access to thousands of icons and ready-made scripts to get started immediately.
