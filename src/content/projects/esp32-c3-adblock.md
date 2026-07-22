---
title: esp32-c3-adblock
summary: A memory-efficient DNS ad-blocker designed for the ESP32-C3 that operates
  without the need for PSRAM. It utilizes a custom 40-bit hash-in-flash storage technique
  to filter over 140,000 domains using just 50 KB of RAM and 0.7 MB of flash memory.
slug: esp32-c3-adblock
codeUrl: https://github.com/M-Abozaid/esp32-c3-adblock
lastUpdated: '2026-07-15'
licenses:
- MIT
rtos: freertos
libraries:
- littlefs
topics:
- adblocker
- arduino
- dns
- dns-sinkhole
- esp32
- esp32-c3
- iot
- pi-hole
- platformio
isShow: false
createdAt: '2026-07-20T10:49:25+00:00'
updatedAt: '2026-07-20T10:49:25+00:00'
---

## Rethinking DNS Filtering on Embedded Hardware

Most DNS sinkholes designed for microcontrollers face a significant hurdle: memory. Typical implementations attempt to load massive blocklists of domain strings directly into RAM. On a standard ESP32, this often mandates the use of PSRAM, driving up hardware costs and complexity. The **esp32-c3-adblock** project takes a different approach, proving that you can run a Pi-hole-style blocker on a $2 ESP32-C3 with zero PSRAM and a tiny RAM footprint.

The core innovation lies in how the blocklist is stored and queried. Instead of storing raw strings, the project converts domain names into sorted 40-bit (5-byte) FNV-1a hashes stored in flash memory. When a DNS query arrives, the system extracts the domain, hashes it, and performs a binary search against the flash-resident table. This method allows 140,000+ domains to fit into roughly 0.7 MB of flash while maintaining lookup times of approximately 10 ms.

## Technical Efficiency and Hash Collisions

Choosing a 40-bit hash is a calculated trade-off. While a 32-bit hash would save flash space, it increases the risk of collisions, which would result in "over-blocking" (unintentionally sinkholing a legitimate site). At 140,000 domains, a 40-bit hash offers a collision probability of near zero. Even at 537,000 domains, the statistical likelihood is only one collision. This approach is significantly more efficient than string-in-RAM methods:

| Metric | String-in-RAM | Hash-in-Flash |
| :--- | :--- | :--- |
| **Hardware** | ESP32 + PSRAM (~$8) | ESP32-C3 (~$2) |
| **141k Domains** | ~2.5 MB RAM | ~0.67 MB Flash |
| **RAM Usage** | Nearly all available | ~50 KB |
| **Lookup** | String comparison | ~18 flash reads |

This architecture isn't just a workaround for the C3; it scales effectively to larger chips. For instance, an ESP32-S3 with 16 MB of flash could theoretically handle 2.7 million domains using this method, far exceeding what could be stored as strings in 8 MB of PSRAM.

## Hardware and Deployment

The project is optimized for the ESP32-C3 SuperMini, a compact board that can be powered directly from a router's USB port. Because the device functions as a network service, stable power is critical; cheap USB adapters can cause brownouts during WiFi transmissions. The repository even includes a 3D-printable enclosure design that ensures proper ventilation and signal integrity for the PCB antenna.

## Features and Management

Despite its small footprint, the project includes a robust set of features managed through a web dashboard accessible at `http://c3adblock.local`. 

*   **Web Dashboard**: Provides per-client block/allow counts and allows users to ban specific clients or add custom domains.
*   **Over-the-Air (OTA) Updates**: Both the firmware and the blocklist can be updated over WiFi. Users can upload a new `blocklist.bin` manually or configure a remote URL for automated scheduled updates.
*   **mDNS Discovery**: Simplifies network integration by making the device discoverable without needing to track IP assignments.
*   **Flexible Partitioning**: The project uses a custom `partitions.csv` to balance firmware storage and blocklist capacity. With standard OTA support (two app slots), the device can hold approximately 250,000 domains on a 4 MB flash chip.

## How It Works

The workflow of a DNS request is streamlined for speed:
1.  **Query In**: The ESP32 receives a DNS request.
2.  **Extract Domain**: The domain name and its parent suffixes are extracted.
3.  **Hash**: The domain is processed using the FNV-1a algorithm.
4.  **Binary Search**: The system searches the sorted hash table in flash.
5.  **Action**: If a hit is found, the device returns `0.0.0.0` (sinkholed). If it's a miss, the query is forwarded to an upstream resolver (like Cloudflare or Google), and the reply is relayed back to the client.

```cpp
// Example of how the device responds to queries
dig @<c3-ip> doubleclick.net   // -> 0.0.0.0  (blocked)
dig @<c3-ip> github.com        // -> real IP  (forwarded)
```

By moving the heavy lifting from RAM to Flash and utilizing efficient binary search algorithms, this project demonstrates the power of optimized data structures in embedded systems, turning a simple microcontroller into a capable network security appliance.
