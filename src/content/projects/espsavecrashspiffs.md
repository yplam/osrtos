---
title: EspSaveCrashSpiffs
summary: A specialized library for ESP8266 microcontrollers that automatically captures
  and saves crash information, including exception details and stack traces, to SPIFFS
  flash memory. It provides developers with persistent logs for diagnosing software
  exceptions and watchdog timer resets using the ESP Exception Decoder.
slug: espsavecrashspiffs
codeUrl: https://github.com/brainelectronics/EspSaveCrashSpiffs
star: 4
lastUpdated: '2020-01-09'
rtos: ''
libraries:
- spiffs
topics:
- arduino
- arduino-library
- crash-details
- crash-dump
- crash-reporting
- esp8266
- esp8266-arduino
- spiffs
isShow: false
createdAt: '2025-12-28'
updatedAt: '2025-12-28'
relatedProjects:
- spiffslogger
- rtcmemory
- esp-multiresetdetector
- esp-doubleresetdetector-library
- hommie-logger
- effortless-spiffs
---

## Overview

Debugging intermittent crashes on embedded systems like the ESP8266 can be a significant challenge, especially when the device is deployed in the field. EspSaveCrashSpiffs is a lightweight library designed to solve this problem by automatically catching and saving crash information to the module's SPIFFS (SPI Flash File System) every time a failure occurs. This ensures that even after a hardware or software watchdog reset, the diagnostic data remains available for later analysis.

Inspired by the original EspSaveCrash library, this version focuses on utilizing the SPIFFS file system to store multiple crash logs. This approach allows developers to maintain a history of failures rather than just the most recent one, making it easier to identify patterns in system instability.

## Key Features and Functionality

The library registers a callback that triggers immediately upon a crash, capturing critical system state information before the device reboots. The data saved includes:

- **Crash Timestamp**: The time of the crash using the ESP8266's internal millisecond counter.
- **Restart Reason**: The specific hardware reason for the reboot (e.g., power-on, external reset, or software WDT).
- **Exception Cause**: The EXCCAUSE value identifying why the processor halted.
- **Register State**: Values for `epc1`, `epc2`, `epc3`, `excvaddr`, and `depc`.
- **Stack Trace**: A full stack dump formatted for compatibility with the [ESP Exception Decoder](https://github.com/me-no-dev/EspExceptionDecoder).

One of the library's strengths is its automatic arming mechanism. Once initialized, it operates silently in the background after every power-up or restart. It manages log files by saving to a default file and then renaming it to a logical sequence (e.g., `/crashLog-5.log`) upon reboot, preventing buffer overflows and ensuring small, manageable file sizes.

## Implementation and Usage

Integrating EspSaveCrashSpiffs into an existing Arduino sketch is designed to be a two-step process. Developers simply need to include the header and declare the global object:

```cpp
#include "EspSaveCrashSpiffs.h"

// Declare the object to start catching crashes
EspSaveCrashSpiffs SaveCrashSpiffs(0);
```

To retrieve and analyze the logs, the library provides methods to identify the latest log file and print its contents to the Serial monitor. This can be particularly useful for remote diagnostics where the crash log might be served over a web interface or sent to a remote server after the device recovers.

```cpp
// Example of printing the latest crash log
char* _lastCrashFileName = (char*)calloc(255, sizeof(char));
SaveCrashSpiffs.getLastLogFileName(_lastCrashFileName);

Serial.printf("Name of last log file: '%s'\n", _lastCrashFileName);
SaveCrashSpiffs.print(_lastCrashFileName);

free(_lastCrashFileName);
```

## Technical Compatibility

The library is fully compatible with the ESP8266 Arduino core (tested on version 2.3.0 and PlatformIO's framework-arduinoespressif). It supports various development environments including the Arduino IDE, Visual Micro, and PlatformIO. By targeting the SPIFFS file system, it provides a standard way to manage crash data that is consistent with other file-based operations on the ESP8266 platform.
