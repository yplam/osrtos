---
title: SimpleFTPServer Library
summary: A lightweight FTP server library for Arduino and embedded platforms including
  ESP32, ESP8266, RP2040, and STM32. It enables devices to expose internal flash or
  external SD card filesystems for remote management via standard FTP clients.
slug: simpleftpserver-library
codeUrl: https://github.com/xreef/SimpleFTPServer
siteUrl: https://www.mischianti.org/category/my-libraries/simple-ftp-server/
star: 162
version: v3.0.0
lastUpdated: '2025-11-28'
rtos: ''
libraries:
- littlefs
- spiffs
topics:
- arduino
- esp32
- esp8266
- ethernet
- fat
- ftp
- ftp-server
- littlefs
- microcontroller
- raspberry-pi-pico-w
- rp2040
- spiffs
- stm32
- wemos-d1-mini
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- multiftpserver-library
- ftp-server-teensy41
- esp-fs-webserver
- ftp-server-with-littlefs-for-wfi32-iot-board
- stm32-ftp-server
- devfsuploadesp
---

## Overview

SimpleFTPServer is a lightweight library designed for the Arduino ecosystem and various embedded platforms. It allows developers to expose a device's filesystem—whether internal flash or external storage—over the FTP protocol. This enables standard FTP clients like FileZilla, WinSCP, or Windows Explorer to connect to the device for uploading, downloading, and managing files remotely. 

The library is particularly useful for IoT devices that need a simple way to update configuration files, retrieve logs, or manage assets without requiring physical access to an SD card or a specialized serial interface.

## Key Features

Despite its small footprint, SimpleFTPServer provides a robust set of features for embedded file management:

- **Standard FTP Operations**: Supports file upload, download, deletion, renaming, and directory listing.
- **Session Management**: Supports a single active FTP session, optimized for the limited RAM of microcontrollers.
- **Resume Support**: Implements the `REST` command, allowing interrupted transfers to resume from where they left off.
- **Modern Standards**: Includes support for UTF-8 filenames and RFC-like commands such as `ALLO`, `STAT`, `SYST`, and `HELP`.
- **Configurable Performance**: Users can tune transfer buffers and inactivity timeouts via a dedicated configuration header (`FtpServerKey.h`).

## Extensive Platform Support

One of the library's greatest strengths is its broad compatibility across the embedded landscape. It supports a variety of architectures and network interfaces:

- **Microcontrollers**: Full support for ESP32, ESP8266, Raspberry Pi Pico (RP2040), STM32, and classic Arduino AVR boards (though RAM-constrained boards like the Uno are limited to basic transfers).
- **Network Interfaces**: Works seamlessly with integrated WiFi (ESP/RP2040), WiFiNINA, and various Ethernet controllers including W5x00, W5500, and ENC28J60.
- **Storage Systems**: Integrates with internal flash filesystems like SPIFFS, LittleFS, and FFAT, as well as external storage using the standard SD library or the high-performance SdFat library.

## Technical Implementation

The library is designed with a simple API consisting primarily of `begin()` and `handleFTP()`. The latter is called within the main loop to process incoming network packets and manage the FTP state machine. 

### Basic Usage Example

Setting up a server on an ESP32 using SPIFFS is straightforward. After connecting to WiFi and mounting the filesystem, the server is initialized with a username and password:

```cpp
#include <WiFi.h>
#include "SPIFFS.h"
#include <SimpleFTPServer.h>

FtpServer ftpSrv;

void setup(){
  Serial.begin(115200);
  WiFi.begin("YOUR_SSID", "YOUR_PASS");
  
  // Wait for connection...
  
  if (SPIFFS.begin(true)) {
      // Start FTP server with credentials
      ftpSrv.begin("admin","password");
  }
}

void loop(){
  // Handle FTP requests
  ftpSrv.handleFTP();
}
```

## Configuration and Optimization

For advanced users, the `FtpServerKey.h` file provides several defines to customize the library's behavior. Developers can adjust `FTP_BUF_SIZE` to balance transfer speed against RAM usage, or toggle `UTF8_SUPPORT` to save flash space on highly constrained devices. The library also includes a debug mode that can be routed to any `Print` stream, such as `Serial`, to monitor connection events and command exchanges in real-time.
