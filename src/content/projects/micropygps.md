---
title: micropyGPS
summary: A full-featured GPS NMEA-0183 sentence parser written in pure Python 3.x
  for MicroPython and embedded platforms. It provides robust parsing for various GPS
  messages, including position, time, and satellite data, with specific support for
  the PyBoard and ESP32.
slug: micropygps
codeUrl: https://github.com/inmcm/micropyGPS
star: 384
lastUpdated: '2022-01-07'
rtos: ''
libraries:
- micropython
topics:
- gps
- gps-library
- micropython
- python
- python3
isShow: true
image: /202512/micropy-gps.webp
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
---

## Overview

micropyGPS is a comprehensive GPS NMEA sentence parser designed specifically for MicroPython and the PyBoard embedded platform, while maintaining full compatibility with Python 3.x. It provides a robust solution for interpreting NMEA-0183 output messages, converting raw serial data into easily handled Python data structures. 

Modeled after the popular TinyGPS Arduino library, micropyGPS is implemented as a single class within a single file. This design makes it exceptionally easy to integrate into embedded projects where resource management and simplicity are paramount. The parser is optimized for serial UART data sources, processing information one character at a time to ensure reliable performance in noisy embedded environments.

## Key Features

The library supports a wide array of NMEA-0183 sentences, ensuring compatibility with most modern GPS modules. Supported sentences include:

*   **Position and Transit**: RMC (Recommended Minimum), GLL (Geographic Position - Lat/Long), and GGA (Fix Data).
*   **Velocity and Course**: VTG (Track Made Good and Ground Speed).
*   **Satellite Information**: GSA (DOP and Active Satellites) and GSV (Satellites in View).

Beyond simple parsing, micropyGPS includes helper methods to interpret, present, log, and manipulate GPS data. It can automatically handle local timezone offsets, calculate compass directions based on course, and format coordinates into various styles such as Decimal Degrees (DD), Degrees Minutes Seconds (DMS), or Decimal Degree Minutes (DDM).

## Technical Implementation

One of the strengths of micropyGPS is its resilience. It tracks sentence statistics, including the number of successfully parsed sentences and CRC (Cyclic Redundancy Check) failures. This allows developers to monitor the health of the GPS data stream in real-time. 

For logging, the library provides built-in methods to save raw NMEA data to a file. This is particularly useful for post-processing or debugging, though the author recommends using an SD card for storage on microcontrollers like the STM32 to avoid wearing out internal flash memory.

## Embedded Platform Support

While developed with the PyBoard in mind, micropyGPS is versatile enough to run on any platform with a Python 3 interpreter. Specific considerations are provided for:

*   **PyBoard**: Includes test scripts for UART echo, sentence parsing, and GPIO interrupt-driven updates.
*   **ESP32**: Recommended for use as a "frozen module" to conserve heap space and prevent memory exceptions.
*   **Linux/Unix**: Fully compatible with Raspberry Pi and BeagleBone for high-level embedded applications.

## Basic Usage

Integrating micropyGPS into a script is straightforward. After initializing the `MicropyGPS` object, data is fed into the `update()` method character by character. Once a valid sentence is completed, the object's internal attributes are updated.

```python
from micropyGPS import MicropyGPS

# Initialize GPS object
my_gps = MicropyGPS()

# Example NMEA RMC sentence
my_sentence = '$GPRMC,081836,A,3751.65,S,14507.36,E,000.0,360.0,130998,011.3,E*62'

# Feed characters to the parser
for x in my_sentence:
    my_gps.update(x)

# Access parsed data
print(f"Latitude: {my_gps.latitude}")
print(f"Longitude: {my_gps.longitude}")
print(f"Speed: {my_gps.speed_string('kph')}")
```

## Advanced Formatting

The library excels at making GPS data human-readable. It provides several string conversion methods to turn raw tuples into formatted strings:

```python
# Readable coordinate strings
my_gps.latitude_string()   # "41° 24.8963' N"

# Compass direction
my_gps.compass_direction() # "NE"

# Formatted dates
my_gps.date_string('long') # "September 13th, 2098"
```

Whether you are building a simple data logger or a complex navigation system on MicroPython hardware, micropyGPS offers a lightweight yet powerful toolset for handling satellite positioning data.
