---
title: ESP32-C5 ITS Logger
summary: A specialized V2X and ITS G5 message logger that utilizes the ESP32-C5 to
  capture IEEE 802.11p traffic at 5.9GHz. It supports GPS integration for synchronized
  time and positioning, logging raw data to SD cards or USB for analysis in Wireshark
  and CANalyzer.
slug: esp32-c5-its-logger
codeUrl: https://github.com/MuellerA/esp32-c5-its
siteUrl: https://opentrafficmap.org/
version: v1.1.1
lastUpdated: '2026-07-05'
licenses:
- MIT
image: /202607/esp32-c5-its_0.avif
rtos: freertos
topics:
- 802-11p
- car2x
- esp32-c5
- its-g5
- platformio
- v2x
isShow: true
createdAt: '2026-07-10T02:05:14+00:00'
updatedAt: '2026-07-10T02:05:14+00:00'
relatedProjects:
- mcp2518fd-can-fd-logger-for-raspberry-pi-pico
- esp32-wifi-logger
- m5cardputer-gps-logger
- meindatalogger
- wardriver3000
- periscope-os-v2-0-0-sigint
---

The ESP32-C5 ITS Logger is a specialized tool designed to capture and record Intelligent Transport Systems (ITS) G5, IEEE 802.11p, and V2X (Vehicle-to-Everything) messages. Operating at the 5.9GHz frequency band, this project pushes the ESP32-C5 hardware beyond its standard specifications to monitor vehicular communication, providing a mobile solution for recording data while on the move.

### Hardware and Operation

The project is built around the ESP32-C5, utilizing its radio capabilities to intercept Car2X messages. While many similar projects focus on stationary measurement points, this logger is optimized for mobility. It can be powered by a mobile phone via USB, which also serves as a data recording interface. For a more standalone setup, a power bank combined with an optional SD card module allows for long-duration logging without an external computer.

To enhance the logged data, the system supports an optional GPS receiver. When a GPS module is connected and has a fix, the logger records UTC time and the current position alongside the raw ITS messages. This is particularly useful for mapping vehicular traffic patterns or analyzing communication range in real-world scenarios.

### Firmware and Indicators

The core firmware, known as ESP32-C5-ITS-RX, is developed using the ESP-IDF framework. It leverages unofficial framework functions to enable 802.11p communication, which is not typically exposed in standard consumer Wi-Fi stacks. The firmware handles the complexities of capturing raw frames and managing storage across different media.

To provide feedback during headless operation, the project supports both standard and RGB LEDs with specific signaling patterns:
- **Standard LED**: Flashes upon receiving an ITS message or a position update.
- **RGB LED**: Uses color coding to indicate the status of the GPS fix. For example, a dim blue light indicates a GPS time fix, while dim green indicates both time and position are locked. Bright flashes indicate data activity, with different colors representing the logging destination (yellow for USB, blue for SD card, and green for both).

### Data Processing and Integration

Since the logger records raw messages, decoding is handled by external tools. The repository includes a Linux-based converter that transforms recorded data files into industry-standard formats:
- **Wireshark PCAPNG**: For deep packet inspection of V2X protocols. Optional GPS data is added as a Beacon message to preserve spatial context within the packet capture.
- **CANoe/CANalyzer BLF**: For automotive-grade analysis using Vector tools, where GPS data is integrated as GNSS system variables.

Additionally, a dedicated Linux client allows the ESP32-C5 to act as a feeder for the Open Traffic Map (OTM) project. When connected to a host machine, it can transmit captured messages to OTM via MQTT, contributing to a global view of traffic data.

### Technical Data Format

The log files are stored in a structured binary format using little-endian byte ordering. Each entry includes a header with packet type, body size, and a microsecond-resolution timestamp. The body can contain raw ITS payloads, GPS coordinates (latitude, longitude, altitude, speed, and heading), or system version information.

```c
struct
{
  uint32_t magic;          // 0xAA5555AA (USB log only)
  struct
  {
    uint8_t  pkt_type;     // 0 Time / 1 ITS / 2 GPS / 254 Info / 255 Version
    uint8_t  reserved;     
    uint16_t body_size;    
    uint64_t timestamp_us; // UTC time in µs after GPS fix
  } header ;

  // ... union of its, gps, version, or info structures
}
```

This project serves as a powerful bridge between low-cost embedded hardware and professional vehicular communication analysis tools, making V2X research and signal monitoring more accessible to developers and researchers.
