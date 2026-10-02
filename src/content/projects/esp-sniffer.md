---
title: ESP-Sniffer
summary: A real-time Wi-Fi packet capture and analysis tool built for the ESP32 platform.
  It utilizes the microcontroller's promiscuous mode to intercept raw 802.11 frames,
  which are then streamed over serial in PCAP format to a Python host for live decoding
  and color-coded visualization.
slug: esp-sniffer
codeUrl: https://github.com/77axel/ESP-Sniffer
lastUpdated: '2026-07-30'
licenses:
- MIT
image: /202608/ESP-Sniffer_0.avif
rtos: freertos
topics:
- embedded-systems
- esp-idf
- esp32
- esp32-arduino
- promiscuous
- promiscuous-mode
- python
- tools
- wifi-scanner
- wifi-security
isShow: true
createdAt: '2026-08-02T06:40:09+00:00'
updatedAt: '2026-08-02T06:40:09+00:00'
relatedProjects:
- linkscope-bpu-uart-analyzer
- esp32-sniffer
- marauder-centauri
- esp-scope
- periscope-os-v2-0-0-sigint
- esp32-network-scanner
---

## Overview

Monitoring Wi-Fi traffic usually requires specialized hardware or specific network cards that support monitor mode. **ESP-Sniffer** turns a standard, inexpensive ESP32 development board into a powerful, real-time 802.11 packet sniffer. By leveraging the native radio capabilities of the ESP32, this project provides a window into the wireless traffic surrounding you, from management beacons to data exchanges.

## System Architecture

The project is elegantly split into two halves: the hardware firmware and a software host tool. 

On the hardware side, the ESP32 runs a C++ firmware (compatible with Arduino and PlatformIO) that puts the Wi-Fi radio into **promiscuous mode**. In this state, the radio ignores traditional SSID filtering and captures every raw 802.11 frame it can hear. To ensure broad coverage, the firmware includes a background channel-hopper that cycles through channels 1 through 13 in the 2.4 GHz spectrum every 500 milliseconds.

To bridge the gap between the embedded device and the analysis environment, the ESP32 wraps every captured frame in a standard 16-byte PCAP packet header. This data is then streamed over UART at a high baud rate of 921600. This choice of format is significant because PCAP is the industry standard for packet captures, making the stream theoretically compatible with tools like Wireshark.

## The Python Host Tool

While the ESP32 handles the raw capture, the Python-based host tool serves as the primary interface for the user. It synchronizes with the incoming serial stream by looking for the PCAP magic bytes (`D4 C3 B2 A1`). Once synced, it performs several sophisticated tasks in real-time:

1.  **Frame Decoding**: It parses the 802.11 Frame Control field to determine the category (Management, Control, or Data) and the specific subtype (Beacon, RTS, ACK, etc.).
2.  **Vendor Resolution**: The tool integrates with a Wireshark OUI database (`manuf.txt`). It looks up the Organizationally Unique Identifier (OUI) from the MAC addresses to identify the manufacturer of the devices being captured (e.g., Apple, Samsung, or Espressif).
3.  **Live Visualization**: The terminal output is color-coded for instant recognition—cyan for Management frames, yellow for Control frames, and green for Data traffic.

### Live Output Format

Each line in the terminal provides a detailed breakdown of the captured packet:

- `[000001]`: Sequential packet number
- `0.18s`: Elapsed time since the start of the capture
- `Category`: The 802.11 category (e.g., Management)
- `Subtype`: The specific frame type (e.g., Beacon)
- `len=318`: The size of the captured frame in bytes
- `src/dst/bssid`: MAC addresses with resolved vendor names

Every 50 packets, the tool prints a summary line displaying the current packet rate and a breakdown of the top frame types encountered, providing a high-level view of network congestion and activity.

## Getting Started

The project is designed for ease of use. Once the firmware is flashed to an ESP32 via the Arduino IDE or PlatformIO, the Python tool can often auto-detect the correct serial port by scanning for common USB-to-UART bridge hardware (like CP2102 or CH340 chips).

```bash
# Install dependencies
pip install -r requirements.txt

# Run the sniffer
python sniffer.py
```

For advanced users, the tool supports manual port selection and a database update command (`--update 1`) that fetches the latest vendor list directly from Wireshark's automated data repository.

## Technical Considerations

Because the ESP32 streams raw frames at high speeds, the project uses a baud rate of 921600 to prevent buffer overflows. The system is optimized for the 2.4 GHz band and supports a maximum frame size of 1600 bytes, covering the standard MTU for most 802.11 networks. This makes it an excellent tool for educational purposes, security research, or debugging complex wireless connectivity issues in IoT environments.
