---
title: pocket-dial
summary: A self-contained SIP PBX designed for the ESP32-S3 that manages VoIP signaling
  without requiring external servers or cloud dependencies. It leverages C++17 and
  the ESP-IDF framework to provide a full-featured telephony environment where RTP
  media flows peer-to-peer, ensuring the microcontroller never becomes an audio bottleneck.
slug: pocket-dial
codeUrl: https://github.com/GlomarGadaffi/pocket-dial
version: v1.2.0
lastUpdated: '2026-07-01'
licenses:
- Apache-2.0
rtos: freertos
libraries:
- lvgl
- lwip
topics:
- embedded
- embedded-systems
- esp-idf
- esp32
- esp32-s3
- firmware
- iot
- microcontroller
- pbx
- rtp
- sip
- telephony
- voice
- voip
isShow: false
createdAt: '2026-07-08T00:11:47+00:00'
updatedAt: '2026-07-08T00:11:47+00:00'
relatedProjects:
- bbtalkie
- claude-pocket
- la-marzocco-round-controller
- espframe-for-immich
- echokit-firmware
- esp-hosted-open
---

## A Standalone PBX in Your Pocket

pocket-dial is an ambitious project that transforms a single ESP32-S3 microcontroller into a fully functional SIP Private Branch Exchange (PBX). Unlike traditional VoIP setups that rely on heavy server software or cloud-based trunks, pocket-dial is designed to be self-contained and field-deployable. Whether you are using a hardware desk phone, an Analog Telephone Adapter (ATA), or a softphone on your smartphone, you can point your device at this tiny microcontroller and start making calls immediately.

The project is built on a high-performance C++17 engine. One of its most significant architectural advantages is that it only brokers signaling. By ensuring that **RTP media flows peer-to-peer** between the connected phones, the system avoids the common pitfall of bottlenecking audio traffic through the MCU's limited bandwidth. This makes it a robust solution for hobbyists and developers looking for a lightweight, off-grid communication tool.

## Versatile Hardware and Connectivity

While the primary target is the ESP32-S3, pocket-dial is highly adaptable to various hardware configurations. It supports multiple transport layers through a flexible build system:

*   **Ethernet/PoE**: Support for W5500 (found on LilyGO T-ETH-ELITE) and LAN8720 (classic ESP32) allows for stable, wired installations.
*   **WiFi**: The system can bring up its own SoftAP, creating an instant, local VoIP network in the field.
*   **Display Integration**: Support for the Guition JC3248W535 (and similar AXS15231B touch displays) provides a graphical dashboard powered by the LVGL library.

Because the core engine is cross-platform, developers can also build and run the server as a desktop binary. This allows for rapid iteration and debugging on a laptop before deploying the firmware to the actual hardware.

## Enterprise-Grade Telephony Features

Despite its small footprint, pocket-dial packs a surprising amount of call control logic. It handles the standard SIP registrar and proxy duties while implementing features typically found in much larger systems:

*   **Call Management**: Support for blind transfers (REFER), hold/resume (re-INVITE), and session timers (RFC 4028).
*   **Advanced Routing**: Call parking (orbits 700-709), paging zones (980-989), and ring groups (ring-all or hunt) enable complex office-like setups.
*   **Presence**: BLF (Busy Lamp Field) support via SUBSCRIBE/NOTIFY allows phones to monitor the status of other extensions.
*   **Star Codes**: Classic PBX functionality like echo tests (dial 777), Do-Not-Disturb (DND), and call forwarding are built-in.

## Management and Security

The project includes a retro-styled web UI and an HTTP API for managing extensions and system status. For power users, it even offers an optional SSH sysop terminal—a TUI console served over SSH using wolfSSH—allowing for remote administrative access without a browser.

Provisioning is handled via NVS (Non-Volatile Storage), meaning you can inject credentials and configurations without needing to rebuild the entire firmware. It also supports dual-OTA (Over-the-Air) updates to ensure the device remains maintainable once deployed.

## Getting Started

If you want to test the logic without hardware, you can build the project on a Linux or macOS machine using CMake:

```bash
cmake -B build -S . -DCMAKE_BUILD_TYPE=Release
cmake --build build --config Release
./build/SipServer --ip 127.0.0.1 --port 5060 --web 8080
```

For hardware deployment, the project uses the standard ESP-IDF toolchain. For example, to build for a touch-display enabled board:

```bash
idf.py set-target esp32s3
idf.py -D SIP_TRANSPORT=display build
idf.py -p <PORT> flash monitor
```

Whether you are building a private intercom system for your home, an emergency communication node, or just exploring the complexities of the SIP protocol, pocket-dial provides a sophisticated, modern C++ foundation for embedded VoIP.
