---
title: FlipDeFlock
summary: FlipDeFlock is a specialized counter-surveillance and site survey tool for
  the Flipper Zero that utilizes an external ESP32 module for advanced wireless monitoring.
  It provides passive detection of Flock Safety ALPR cameras, Bluetooth tracker monitoring,
  and comprehensive Wi-Fi and NFC security auditing. The project features a custom
  'Net Guardian' interface for real-time threat assessment and supports signal-based
  device homing without the need for directional antennas.
slug: flipdeflock
codeUrl: https://github.com/ReconGrunt/FlipDeFlock
siteUrl: https://github.com/ReconGrunt/FlipDeFlock/releases/latest
version: v0.42
lastUpdated: '2026-07-14'
licenses:
- MIT
image: /202607/FlipDeFlock_1.avif
rtos: freertos
topics:
- alpr
- anti-stalking
- bluetooth-le
- contributions-welcome
- counter-surveillance
- deflock
- esp32
- flipper-zero
- flipper-zero-app
- flipperzero
- flock-safety
- nfc
- surveillance
- wardriving
- wifi-security
- work-in-progress
isShow: true
createdAt: '2026-07-15T05:06:06+00:00'
updatedAt: '2026-07-15T05:06:06+00:00'
relatedProjects:
- flock-detector-3-0
- ghost-esp
- plume-m5cardputer-adv-edition
- pathshield
- antihunter
- marauder-centauri
---

FlipDeFlock transforms the Flipper Zero into a powerful tool for counter-surveillance and wireless site surveys by pairing it with any standard ESP32 board. While the Flipper's internal radio is limited to BLE, this project leverages the ESP32's capability for Wi-Fi monitor mode to detect and track surveillance infrastructure that would otherwise be invisible. It is designed for researchers and security professionals to conduct authorized assessments and increase awareness of surrounding surveillance hardware.

### Multi-Layered Surveillance Detection

The primary focus of the application is the detection of Flock Safety and ALPR (Automated License Plate Recognition) cameras. These devices are identified by sniffing the Wi-Fi probe requests they emit while attempting to connect to their home networks. The system categorizes detections by confidence levels, ranging from simple OUI prefix matches to confirmed signatures based on SSID patterns and specific 802.11 information element (IE) fingerprints.

![Flock / ALPR Detect interface](/202607/FlipDeFlock_2.avif)

Beyond static cameras, the tool includes a robust BLE and Tracker Scan feature. This module continuously monitors for AirTags, Tile trackers, and other Bluetooth beacons. To assist in anti-stalking efforts, the application can flag trackers that consistently follow the user across multiple GPS waypoints, providing a detailed track history including distance and time.

### The Net Guardian Interface

A standout feature of the project is the Net Guardian, an always-on monitoring mode inspired by the Pwnagotchi project. Designed to be left running on a desk or carried during a survey, it automatically rotates the ESP32 through different detection modes, including dual-band Flock detection, BLE tracking, and Wi-Fi security auditing. 


Net Guardian uses a fused scoring system to determine if the user is being watched, displaying a pwnagotchi-style face that shifts from 'CLEAR' to 'WATCHFUL' or 'ELEVATED' based on correlated signals. It provides live counters for detected cameras, active wireless attacks (such as deauth floods), and nearby Flipper Zero devices.

### Wireless and NFC Auditing

For broader security assessments, the application includes a dedicated WiFi Audit tool. This module scans nearby networks and grades their security posture, highlighting critical vulnerabilities such as Open, WEP, or weak WPA configurations. It also detects 'evil-twin' access points where multiple BSSIDs share the same name with mismatched security settings.

![WiFi Audit results screen](/202607/FlipDeFlock_6.avif)

The auditing capabilities extend to physical access control via the NFC and RFID Audit module. This feature can identify card protocols and perform a 'Deep' check on MIFARE Classic cards by testing for default factory keys, helping users determine if their access cards are susceptible to trivial cloning.

### Technical Hardware Integration

The project is built as a distributed system: the ESP32 handles the intensive radio monitoring and packet sniffing, while the Flipper Zero provides the user interface, GPS logging, and data storage. Communication between the two is handled via a custom serial line protocol. 

Users can manage the ESP32 firmware directly from the Flipper, with built-in tools to backup existing firmware and flash the FlipDeFlock companion binary or other tools like ESP32 Marauder. For geographic tracking, the system supports external GPS modules connected via LPUART, enabling the live on-device map which plots detected cameras relative to the user's bearing and distance.

### Signal Homing and Reporting

When a suspicious device is identified, the Locator tool allows users to hunt it down using live signal strength (RSSI). This 'hot/cold' meter approach works without a directional antenna, allowing the operator to close in on a transmitter by observing signal trends while moving. 

Documentation and data sharing are central to the project's ecosystem. FlipDeFlock can export survey data in multiple formats, including Markdown, CSV, and WiGLE CSV. It also facilitates contributions to the DeFlock community by generating QR codes for detected cameras, allowing users to easily submit findings to the global database via their mobile phones without the Flipper itself ever needing a network connection.
