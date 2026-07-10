---
title: Periscope-OS (v2.0.0-SIGINT)
summary: Periscope-OS is a passive 2.4GHz RF spectrum analyzer and signals intelligence
  tool for the M5Stack M5StickS3. It utilizes the ESP32-S3's promiscuous mode for
  deep packet inspection of 802.11 frames, featuring a sonar-style radar UI and IMU-based
  spatial tracking. The project leverages SPIFFS for telemetry logging and the M5Unified
  library for hardware abstraction.
slug: periscope-os-v2-0-0-sigint
codeUrl: https://github.com/M5RogueOps/Periscope-OS
siteUrl: https://www.ethicalhackersden.org/
lastUpdated: '2026-06-26'
licenses:
- MIT
image: /202607/Periscope-OS_0.avif
rtos: freertos
libraries:
- spiffs
topics:
- esp32-s3
- m5stack
- sticks3
- submarine
- wi-fi-tracking
isShow: true
createdAt: '2026-07-10T02:04:19+00:00'
updatedAt: '2026-07-10T02:04:19+00:00'
---

In the world of wireless security auditing, visibility is often the difference between a secure perimeter and a silent breach. Periscope-OS transforms the compact M5Stack M5StickS3 into a specialized signals intelligence (SIGINT) powerhouse, offering a passive 2.4GHz RF spectrum analyzer and tactical sonar radar deck in a handheld form factor. By focusing on passive reconnaissance, it allows security professionals to map the invisible landscape of Wi-Fi traffic without emitting detectable signals themselves.

### Core Signal Intelligence Engine

At its heart, Periscope-OS utilizes the ESP32-S3 radio driver in promiscuous mode. This bypasses standard hardware MAC filtering, allowing the device to ingest raw 802.11 management frames. The Deep Packet Inspection (DPI) engine specifically targets Type 0xC0 (Deauthentication) and 0xA0 (Disassociation) frames. By dissecting these packets in real-time, the tool extracts critical forensic data: attacker MAC addresses, victim client IDs, target BSSIDs, and specific 802.11 reason codes. 

One of the most practical features of this engine is its acoustic fingerprinting capability. By parsing the first three bytes of the MAC address (OUI), the system can classify weaponized hardware in the field. It identifies common offensive tools such as Flipper Zero units, Wi-Fi Marauder builds, Raspberry Pi drop-boxes, and high-power Alfa adapters, providing the operator with immediate context regarding the nature of the threat.

### Visual and Spatial Instrumentation

The user interface is designed for high-stakes environments, featuring a landscape split-screen dashboard. The left pane hosts a phosphor-style CRT circular radar sweep. Utilizing a five-layer ghosting decay trail, it plots targets as glowing red blips. The distance from the crosshairs is dynamically scaled based on the Received Signal Strength Indicator (RSSI), providing a visual representation of proximity. Complementing this is the right pane, which functions as a volumetric traffic equalizer, showing frequency distribution across the 2.4GHz spectrum (Channels 1–11) with peak-hold indicators to catch intermittent or hidden transmitters.

Beyond simple visualization, Periscope-OS employs spatial inertial processing. By integrating data from the internal BMI270 6-axis IMU, the firmware tracks the user’s physical yaw. As the operator rotates, their body acts as a natural RF shield. The system calculates the precise physical angle where signal attenuation is lowest, effectively pinpointing the directional vector of a threat. This "body shielding" math turns the operator into a human antenna array, guiding them toward the source of interference through visual indicators and haptic pulses.

### Tactical Operational Modes

For covert operations, the "Silent Running" mode shifts all telemetry to the internal haptic motor. By cutting the display backlight and muting the speaker, the device provides tactile feedback that increases in frequency as the user aligns with the threat vector. This allows for complete touch-based tracking in low-profile situations where a glowing screen would be a liability.

When a threat is detected, the system can trigger a Perimeter Breach Alarm. If a target crosses a critical signal threshold (≥ -42 dBm), the display flashes red, and the speaker emits a dual-frequency naval klaxon horn. For post-operational analysis, the "Captain’s Logbook" provides an interface to review forensic logs stored on the internal SPIFFS filesystem. These logs include compressed, pipe-delimited strings containing hardware profiles, signal metrics, and micro-script verification, ensuring that every identified breach is documented for later security auditing and defensive validation.
