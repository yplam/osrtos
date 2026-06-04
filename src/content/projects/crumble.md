---
title: CrumBLE
summary: CrumBLE is an advanced e-reader firmware for the Xteink X4 and X3, built
  on the ESP32-C3 platform using the Arduino framework and NimBLE. It provides enhanced
  Bluetooth Low Energy (BLE) remote support, a customizable collections system, and
  optimized e-ink rendering through specialized image pre-caching.
slug: crumble
codeUrl: https://github.com/imshentastic/CrumBLE
version: crumble-v3.7.3
lastUpdated: '2026-06-03'
licenses:
- MIT
image: /202606/CrumBLE_0.avif
rtos: freertos
libraries:
- nimble
- h2zero-esp-nimble-cpp
topics:
- ble
- bluetooth-hid
- e-reader
- eink
- epub
- esp32-c3
- firmware
- xteink
isShow: true
createdAt: '2026-06-04T00:44:51+00:00'
updatedAt: '2026-06-04T00:44:51+00:00'
relatedProjects:
- open-display-firmware
- papyrix-reader
- nimble-ota
- highboy-firmware
- chronos-watchy
- bleota-esp32-ota-updates-over-ble
---

CrumBLE is a specialized firmware fork designed for the Xteink X4 e-reader, with support for the X3 currently in development. It serves as a personal evolution of the CrossInk project, integrating features from the CrossInk Carousel while adding deep optimizations for Bluetooth connectivity, library management, and user interface responsiveness. Built for the ESP32-C3 microcontroller, it balances the device's strict RAM limitations with a feature-rich reading experience.


### Enhanced Library Management

The firmware introduces a robust Collections system that moves beyond simple file explorer navigation. Users can group books into default categories like Recently Added, Unopened, and Finished, or create their own custom collections. These collections support persistent sorting by title, author, or date. A key visual feature is the Bookshelf grid, which transforms the library into a 3x3 grid of cover thumbnails. These thumbnails are pre-cached at exact screen dimensions to prevent the flickering or "Loading" popups often associated with e-ink navigation. The system also includes a series collapse feature that folds related books into a single spine glyph on the shelf to reduce clutter.

![Bookshelf 3x3 grid display](/202606/CrumBLE_1.avif)

### Bluetooth Remote Integration

One of the most significant technical additions is full BLE support for wireless page-turners. Because the ESP32-C3 has limited heap space, CrumBLE employs a targeted Bluetooth strategy. Pairing is performed within the book interface, and the BLE stack automatically disables upon exiting a book to free up memory for the document parser. To facilitate quick reconnections, a "BT Quick Connect" action is available in the settings drawer for one-tap bonding to the last used remote.

To overcome the memory overhead of decoding images while the Bluetooth stack is active, CrumBLE includes an EPUB optimizer. This tool pre-renders images into a per-device pixel cache (`.pxc`) and flattens chapter layouts. This allows the reader to bypass the JPEG/PNG decoder entirely during page turns, ensuring that Bluetooth HID commands are processed smoothly even in image-heavy chapters.

![Collection picker interface](/202606/CrumBLE_3.avif)

### Smart Display and Quick Settings

CrumBLE enhances the device's interaction model with on-demand sleep-screen cycling. This feature allows users to tap the power button while the device is asleep to cycle through different sleep images without performing a full system wake. It also supports transparent PNG sleep screens, which can overlay information or artwork on top of the last rendered book page. 

Inside the reader, the Global Book Settings drawer provides a quick-access panel for typography and layout adjustments. By long-pressing the menu button, users can toggle fonts, sizes, hyphenation, and line spacing. The drawer uses e-ink fast-refresh to keep interactions snappy and only triggers a full document re-flow if a setting was actually modified.

![Global Book Settings drawer](/202606/CrumBLE_4.avif)

### Technical Optimizations and Stability

Under the hood, CrumBLE focuses on stability and performance for large libraries. It features a streaming library index to prevent crashes on high book counts and a redesigned Reading Stats system for more accurate time tracking. Memory management has been improved through the use of a PackBits-compressed buffer for grayscale rendering, which reduces fragmentation and prevents the Bluetooth link from dropping during complex page turns. The firmware also includes "Recents auto-heal" logic to maintain library integrity even if the storage files are modified by other firmware versions.

### Ecosystem and Lineage

CrumBLE sits at the end of a developmental lineage starting with the CrossPoint Reader and moving through uxjulia's CrossInk and chintanvajariya's Carousel fork. It inherits a wide range of UI translations supporting 23 languages and includes language-correct hyphenation dictionaries for high-quality justified text. The project is developed using PlatformIO, supporting both hardware flashing and an SDL2-based desktop simulator for rapid UI iteration.
