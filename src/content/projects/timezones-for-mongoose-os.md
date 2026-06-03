---
title: Timezones for Mongoose OS
summary: A C-based library for Mongoose OS that manages timezone data and converts
  Olson notation into POSIX TZ strings. It allows developers to configure device timezones
  using standard names like 'America/New_York' while handling the underlying POSIX
  string generation automatically.
slug: timezones-for-mongoose-os
codeUrl: https://github.com/mamuesp/timezones
star: 6
version: v0.4
lastUpdated: '2019-08-18'
rtos: mongoose-os
topics:
- c
- library
- miniz
- mongoose-os
- olson
- timezone
- tzget
- tzset
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- timezone-generic-library
- ds3231-rtc-driver-for-mongoose-os
- adafruit-e-paper-e-ink-library-for-mongoose-os
- common-tools-for-mongoose-os
- c-clk-for-rt-thread
- ltc68xx-battery-monitoring-library-for-mongoose-os
---

## Overview

The Timezones library for Mongoose OS provides a streamlined way to handle timezone settings on embedded devices. Managing timezones in embedded systems can be complex, often requiring manual entry of cryptic POSIX TZ strings. This library simplifies the process by allowing developers to use standard Olson notation (e.g., "Europe/Berlin") to automatically generate the correct POSIX strings required by the system.

Inspired by Pavel Gurenko's work on extracting POSIX TZ strings from Olson data, this library operates in the background of a Mongoose OS application. Once integrated, it handles the conversion and configuration of the `sys.tz_spec` setting based on user-defined parameters in the project configuration.

## Key Features

- **Olson to POSIX Conversion**: Automatically translates human-readable timezone names like `America/New_York` into strings like `EST5EDT,M3.2.0,M11.1.0`.
- **Background Operation**: Works seamlessly in the background once configured in the `mos.yml` file.
- **Resource Efficient**: Uses a small compressed ZIP archive (~5KB) to store timezone data, which can be moved to external file systems to save space on the primary flash partition.
- **Flexible Storage**: Supports mounting the timezone data archive on different paths, such as an external SD card or a secondary flash mount.

## Technical Implementation

The library is written in C and integrates directly into the Mongoose OS build system. It utilizes a configuration schema defined in `mos.yml` to manage its behavior. When the device initializes, the library checks the `timezone.olson` setting and updates the system's timezone specification accordingly.

### Configuration Options

Developers can control the library through several configuration keys:

- `timezone.enable`: A boolean to toggle the library's functionality.
- `timezone.olson`: The desired timezone in Olson notation (e.g., `Etc/UTC`, `Europe/Berlin`).
- `timezone.data_path`: Specifies where the timezone ZIP archive is stored. This is particularly useful for devices with limited internal storage that utilize external filesystems.
- `timezone.arch_file`: The filename of the timezone data archive (defaults to `tz-archive.zip`).

## Usage Example

To use the library, you simply add it to your `mos.yml` dependencies and configure your desired timezone. For example, to set a device to Berlin time, you would add the following to your configuration:

```yaml
config_schema:
  - ["timezone.enable", true]
  - ["timezone.olson", "Europe/Berlin"]
```

Upon building and flashing, the library will automatically resolve this to `CET-1CEST,M3.5.0,M10.5.0/3` and apply it to the system settings.

## Future Development

The project has several planned enhancements to further simplify timezone management in IoT applications:
- **MJS Support**: Implementation of functions for Mongoose OS JavaScript (MJS) for easier information retrieval.
- **Geographic Lookup**: Functions to retrieve timezones based on GPS coordinates (longitude and latitude).
- **Address Resolution**: Integration with external APIs (like Google Maps) to determine timezones from physical addresses.
- **Update Mechanisms**: Adding the ability to update timezone data over-the-air (OTA) as global timezone rules change.
