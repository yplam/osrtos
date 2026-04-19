---
title: MiniOS-ESP
summary: MiniOS-ESP is a lightweight, Unix-like command-line operating system designed
  for ESP32 microcontrollers with ST7789 display support. Built on a FreeRTOS kernel,
  it provides process management, a SPIFFS-based filesystem, and advanced networking
  and mathematical utilities.
slug: minios-esp
codeUrl: https://github.com/VuqarAhadli/MiniOS-ESP
version: v2.1.1
lastUpdated: '2026-04-14'
licenses:
- BSD-3-Clause
rtos: freertos
libraries:
- spiffs
topics:
- embedded
- microcontrollers
- os
isShow: false
createdAt: '2026-04-19T00:03:06+00:00'
updatedAt: '2026-04-19T00:03:06+00:00'
---

MiniOS-ESP is a lightweight, Unix-like command-line operating system specifically designed for ESP32 microcontrollers. While many ESP32 projects function as single-purpose firmware, MiniOS-ESP transforms the hardware into a multi-process environment featuring a full shell, persistent storage, and integrated networking utilities. It targets developers and hobbyists looking for a more structured, interactive way to interact with their embedded hardware, particularly when paired with an ST7789 TFT display.

## System Architecture and Kernel

At its core, MiniOS-ESP leverages FreeRTOS to implement a multi-process architecture. The system manages five core processes with varying priorities and stack allocations:

*   **init**: Handles system initialization.
*   **shell**: The primary command interpreter and user interface.
*   **alarm**: Manages time-based alerts and background monitoring.
*   **watchdog**: Ensures system stability.
*   **scheduler**: Oversees process state management.

This architecture allows the system to maintain a responsive command-line interface while simultaneously handling background tasks like NTP time synchronization and alarm monitoring. The kernel provides standard process states such as running, ready, blocked, sleeping, and terminated, giving users a high-level view of system resources through commands like `ps` or `top`.

## The Shell Environment

The most prominent feature of MiniOS-ESP is its Unix-like shell. For users familiar with Linux or macOS terminals, the environment feels immediately recognizable. It supports case-insensitive commands and a wide array of aliases, such as `rm` for deleting files, `ls` for listing directories, and `ifconfig` for network configuration. 

The system includes a command history (storing the last 10 entries) and a customizable identity system via the `username` command. Visual feedback is provided through both a Serial terminal and a connected ST7789 display, which features automatic screen clearing and cursor management to prevent overflow during long sessions.

## Filesystem and Networking

MiniOS-ESP utilizes the SPIFFS (SPI Flash File System) for persistent storage. Users can create, read, append, rename, and delete files directly from the command line. This makes it possible to store logs, configuration files, or notes directly on the ESP32's flash memory. 

Networking capabilities are equally robust. The system includes an interactive WiFi connection wizard that automatically handles NTP synchronization once connected. Beyond simple connectivity, MiniOS-ESP provides advanced utilities including:

*   **curl**: A tool to fetch web content via HTTP GET, featuring binary content detection and redirect following.
*   **ping**: An ICMP utility that reports round-trip time statistics and packet loss.
*   **dns/nslookup**: For resolving hostnames to IP addresses.
*   **scanwifi**: To list nearby access points and their signal strength.

## Advanced Utilities and Customization

One of the most unique aspects of the project is its mathematical engine. The `calc` command supports complex expressions, trigonometric functions, and rounding operations. This is complemented by a `graph` (or `plot`) command that can render mathematical functions directly onto the TFT display in various colors.

For users who care about aesthetics, MiniOS-ESP includes a theme system with eight built-in color schemes, ranging from the classic "Matrix" (green on black) to "Red Night" and "Light" modes. When the system is idle, users can trigger one of seven animated screensavers, including Matrix-style falling characters, starfields, and fire simulations.

## Getting Started

MiniOS-ESP is built using the PlatformIO ecosystem, though it maintains compatibility with the Arduino IDE. The hardware requirements are minimal: an ESP32 development board and an ST7789 TFT display (240x320). 

```cpp
// Example of how commands are implemented in the shell
void myNewCommand(std::string arg) {
    printLine("Executing: " + arg);
    // Custom logic here
}
```

Developers looking to extend the OS can easily add new commands by registering them in the command parser. Recent updates (v2.0.3+) have migrated the internal string handling to `std::string`, significantly reducing heap fragmentation and improving stability for long-term uptime. Whether you are building a portable network tester, a desktop weather station, or an educational tool, MiniOS-ESP provides a solid, Unix-flavored foundation for ESP32 development.
