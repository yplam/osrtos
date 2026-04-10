---
title: Politician
summary: Politician is a sophisticated WiFi security auditing library for ESP32 microcontrollers,
  designed for modern 802.11 protocol research. It provides advanced capabilities
  for capturing WPA/WPA2/WPA3 handshakes and enterprise credentials using non-blocking
  state machines and stealthy injection techniques.
slug: politician
codeUrl: https://github.com/0ldev/Politician
siteUrl: https://0ldev.github.io/Politician/
version: v1.0.0
lastUpdated: '2026-04-03'
licenses:
- MIT
rtos: freertos
topics:
- arduino
- esp32
- esp32-c6
- handshake-capture
- library
- marauders-esp
- penetration-testing
- platformio
- pmkid
- pwnagotchi
- wardriving
- wifi-attack
- wifi-auditing
- wifi-hacking
- wifi-security
- wireless
- wpa-enterprise
- wpa-psk
- wpa2
- wpa3
isShow: false
createdAt: '2026-04-09T23:47:15+00:00'
updatedAt: '2026-04-09T23:47:15+00:00'
---

Politician is an embedded C++ library built for the ESP32 platform that transforms the microcontroller into a powerful tool for WiFi security auditing. Unlike legacy tools that rely heavily on disruptive deauthentication attacks, Politician implements modern techniques designed to navigate the complexities of contemporary wireless security, including WPA3 and Protected Management Frames (PMF).

### Modern Auditing Techniques
As wireless security evolves, traditional deauthentication attacks (Reason 7) have become increasingly ineffective against networks using 802.11w (PMF). Politician addresses this by prioritizing modern alternatives:

*   **PMKID Capture**: This technique allows for the extraction of PMKIDs from association responses without requiring a client to be connected or disconnected, making it highly non-intrusive.
*   **Channel Switch Announcement (CSA) Injection**: A sophisticated alternative to deauthentication, CSA injection informs clients that the Access Point is moving to a different channel. This forces clients to re-associate, allowing the auditor to capture the 4-way handshake while bypassing PMF protections.
*   **Enterprise Identity Harvesting**: The library can intercept EAP-Identity frames from 802.1X networks, allowing for the collection of plaintext identities or emails from corporate environments.
*   **Client Stimulation**: By using QoS Null Data frames, the library can "wake up" sleeping mobile devices to encourage network activity and facilitate faster handshakes.

### Architecture and Modular Design
The library is built around a non-blocking state machine that handles the entire audit lifecycle, from channel hopping and target selection to attack execution and capture processing. This design ensures that the main loop remains responsive even during intensive network operations.

Politician is divided into several logical components:
*   **Core Engine**: Manages the state machine and radio control.
*   **PoliticianFormat**: Handles serialization, specifically focusing on PCAPNG—a tool-agnostic format that preserves full frame context—and HC22000 for direct ingestion into Hashcat.
*   **PoliticianStorage**: Provides optional helpers for logging data to SD cards using SPI or high-performance SDMMC interfaces.
*   **PoliticianStress**: An opt-in module for payload delivery, such as flooding WPA3 APs with SAE Commit frames to test anti-clogging mechanisms.

### Practical Implementation
Setting up a basic handshake capture session is straightforward. The library uses a callback-based system to notify the user of successful captures or new AP discoveries. Below is an example of a basic capture setup:

```cpp
#include <Arduino.h>
#include <SD.h>
#include <Politician.h>
#include <PoliticianStorage.h>

using namespace politician;
using namespace politician::storage;

Politician engine;

void onHandshake(const HandshakeRecord &rec) {
    Serial.printf("\n[✓] Captured: %s  ch%d  rssi=%d\n", rec.ssid, rec.channel, rec.rssi);
    // Save to SD card as PCAPNG
    PcapngFileLogger::append(SD, "/captures.pcapng", rec);
}

void setup() {
    Serial.begin(115200);
    SD.begin();
    engine.setEapolCallback(onHandshake);

    Config cfg;
    engine.begin(cfg);
    engine.setAttackMask(ATTACK_ALL);
}

void loop() {
    engine.tick();
}
```

### Advanced Features for Wardriving
For users interested in mapping wireless landscapes, Politician includes features tailored for wardriving. It supports hidden network discovery via probe response interception and can be integrated with GPS modules to generate Wigle-compatible CSV datasets. 

One of its most intelligent features is the **Smart Pivot**. When the engine detects a "half-handshake" (an M2-only capture), it recognizes that an active client is present but a full handshake was missed. It then automatically pivots to a CSA or Deauthentication attack to force a fresh reconnection, ensuring a complete, crackable capture is obtained.

### Hardware and Performance
The library targets the broader ESP32 family, including the S2, S3, and C3 variants. While the core engine is memory-efficient (using approximately 45KB of RAM), high-volume logging (such as beacon logging) can be taxing on the CPU and storage. For these scenarios, the use of hardware with native SDMMC support is recommended to avoid blocking the radio state machine during file I/O operations.
