---
title: Duet
summary: Duet is an open-source firmware for the Xteink X3 and X4 e-readers, built
  on the ESP32-C3 microcontroller using the Arduino framework and PlatformIO. It features
  a unique serverless device-to-device sync via ESP-NOW, a comprehensive reading statistics
  suite with 33 data pages, and a highly customizable interface supporting StarDict
  dictionaries and specialized E-Ink font systems.
slug: duet
codeUrl: https://github.com/lauren-alexandra/duet-xteink
version: v0.1.0-alpha.9
lastUpdated: '2026-08-05'
licenses:
- MIT
image: /202608/duet-xteink_0.avif
rtos: freertos
topics:
- ebook-reader
- eink
- esp32-c3
- firmware
- open-source
- xteink
isShow: true
createdAt: '2026-08-12T13:58:21+00:00'
updatedAt: '2026-08-12T13:58:21+00:00'
relatedProjects:
- crumble
- papyrix-reader
- midad
- open-display-firmware
- zereader
- lunokiotwatch-firmware-for-lilygo-twatch-2020
---

Duet is an independent, open-source firmware designed specifically for the Xteink X3 and X4 e-reading devices. It offers a complete overhaul of the reading experience, focusing on privacy-centric synchronization, deep reading analytics, and a highly customizable user interface. Currently in its early alpha stage, the project is undergoing active physical-device testing to ensure stability across different hardware variants.


## The Reading Experience

At its core, Duet provides a polished reader inherited from projects like CrossPoint and CrossInk. It supports EPUB, XTC/XTCH, TXT, and Markdown formats, featuring hyphenation support for ten languages. The interface includes a quick overlay menu for rapid access to chapter pickers, dictionaries, and reading statistics. 

Technical enhancements like guarded chapter pre-indexing allow the device to build the next chapter silently in the background, yielding to user input to maintain responsiveness. For visual comfort, it includes various refresh modes, text darkness settings, and a "Bionic Reading" mode. The system also utilizes a specialized font system that provides device-specific sizes to ensure real layout reflow on both X3 and X4 screens.

## Nearby Sync: Two Readers, One Life

One of Duet's standout features is its ability to sync two devices directly using ESP-NOW radio. This approach eliminates the need for WiFi networks, cloud accounts, or external servers. 

*   **Nearby Stats Sync**: Exchanges complete reading histories, including global totals, per-book time, and achievement milestones. The merge protocol is designed to be idempotent, ensuring data consistency even after repeated sync sessions.
*   **Nearby Position Sync**: Allows users to see the reading progress of both devices side-by-side and manually apply the furthest position to the current device.

## The Reading Statistics Lab

For users who love data, Duet includes a "Statistics Lab" consisting of 33 top-level pages. This suite provides a granular look at reading habits, ranging from a hexagonal "Reader DNA" radar chart to a "Reading Wrapped" annual summary. 

![Duet reading heatmap](/202608/duet-xteink_7.avif)

The system tracks everything from weekday fingerprints and 30-day pace trends to exact session durations. It even supports true Words-Per-Minute (WPM) tracking when EPUBs are prepared with location enrichment metadata. The data is stored using CRC-checked files to ensure repairability and prevent a single corrupt record from erasing a user's entire history.

## Home and Library Customization

Duet offers eight distinct home themes, ranging from minimal layouts to the feature-rich Dashboard Extended. Users can customize their experience using the Home Stats picker, assigning specific metrics to various slots on the dashboard.

![Duet Dashboard](/202608/duet-xteink_1.avif)

The library system supports multiple views, including cover grids and a five-cover carousel. It features smart search with autocomplete that doesn't require opening EPUB files to generate suggestions. For large libraries, the system includes a "Clean Library Cache" utility and support for desktop-side cover prefilling to maintain high performance.

## Apps and System Features

Beyond reading, Duet includes a suite of built-in applications and system utilities. This includes a system of 108 achievements to track milestones, a Tetris adaptation, and a contact card for lost devices. 

![Duet achievements](/202608/duet-xteink_12.avif)

The firmware also features advanced sleep modes, including a "Quick Resume" that preserves the visible page and "Page Overlay" for custom artwork. Performance engineering is a priority, with breadcrumb telemetry and hot-system-file relocation used to minimize FAT directory scans and improve boot times on large SD cards.

## Lineage and Technical Foundation

Duet is built upon a chain of community projects. It utilizes the reader core and web portal from CrossInk, the carousel engine from CrossInk Carousel, and dictionary patterns from CrumBLE and SEEK Reader. Original contributions to this fork include the Nearby statistics merge protocol, the extensive statistics lab, and significant performance optimizations for the ESP32-C3 platform.
