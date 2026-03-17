---
title: Wardriver3000
summary: A portable wardriving device designed for real-time Wi-Fi network scanning
  and data logging. It integrates GPS for location tracking, an OLED display for a
  user interface, and a micro SD card for storing captured network data in a format
  compatible with Wigle.net.
slug: wardriver3000
codeUrl: https://github.com/cifertech/wardriver3000
siteUrl: https://cifertech.net/wardriver3000-build-your-own-wardriving-machine/
star: 115
lastUpdated: '2024-04-28'
rtos: freertos
libraries:
- u8g2
topics:
- esp32
- hack
- hacktoberfest
- iot
- wardriving
isShow: true
image: /202603/wardriver3000.webp
createdAt: '2026-03-17'
updatedAt: '2026-03-17'
---

The wardriver3000 is a specialized portable tool designed for enthusiasts and security researchers interested in wireless network mapping. By combining Wi-Fi scanning capabilities with precise GPS positioning, the device allows users to catalog wireless access points while on the move. The collected data—including SSIDs, signal strength, and geographic coordinates—can be exported and uploaded to platforms like Wigle.net to contribute to global wireless network maps.

The project is built around a custom PCB and features a modular design that incorporates several key hardware components. An OLED display provides a real-time interface for monitoring scan progress and system status, while a micro SD card slot ensures that all captured data is logged locally for later analysis. The integration of GPS technology is central to the project, as it provides the necessary spatial context for every detected network.

### Key Features

- **Real-time Wi-Fi Detection**: Scans for nearby networks continuously, capturing pertinent data such as signal strength and encryption types.
- **GPS Integration**: Syncs network discovery with precise latitude and longitude coordinates for accurate mapping.
- **Local Storage**: Uses a micro SD card to store logs, allowing for long-duration scanning sessions without needing a constant network connection.
- **Visual Interface**: An intuitive OLED screen displays active statistics, GPS lock status, and device health.

### Technical Implementation

The firmware manages the orchestration of the Wi-Fi radio, the GPS module via serial communication, and the SPI-based SD card interface. The project is designed to be accessible to the maker community, providing not just the source code but also the hardware design files. This includes the schematic and PCB layouts, as well as 3D-printable STL files for a custom enclosure, making it a complete hardware-software solution.

Future updates for the wardriver3000 aim to expand the device's capabilities by adding Bluetooth Low Energy (BLE) scanning and refining the user interface with more interactive elements. The current iteration serves as a robust platform for anyone looking to build their own wardriving machine and explore the wireless landscape.

### Getting Started

Assembly involves populating the custom PCB with the required modules, including the microcontroller, GPS unit, and OLED screen. Once the hardware is prepared, the firmware can be flashed to begin scanning. Detailed build instructions, component lists, and tutorials are available through the project's official documentation, which guides users through the entire process from soldering to data visualization.
