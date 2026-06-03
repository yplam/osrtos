---
title: Alexa WEMO Emulation for Mongoose OS
summary: A library for Mongoose OS that emulates Belkin WEMO UPnP plugs, allowing
  Amazon Alexa to discover and control devices locally. It supports multiple virtual
  plug instances on a single ESP32 or ESP8266, mapping voice commands directly to
  GPIO pin toggles.
slug: alexa-wemo-emulation-for-mongoose-os
codeUrl: https://github.com/yaourdt/mgos-alexa-wemo
star: 2
lastUpdated: '2020-09-04'
rtos: mongoose-os
topics:
- amazon-alexa
- mongoose-os
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- electricitydisplay-mqtt-remote-control-for-esp8266-esp32
- arduino-ir-for-mongoose-os
- telegram-bot-api-for-mongoose-os
- mongoose-os-relay-library
- mel-ac-library-for-mongoose-os
- mongoose-os-aws-iot-uart-and-thing-shadow-example
---

## Overview

The Alexa WEMO emulation library for Mongoose OS provides a straightforward way to integrate embedded devices with the Amazon Alexa ecosystem without requiring complex cloud-to-cloud skills or external servers. By emulating the UPnP (Universal Plug and Play) protocol used by Belkin WEMO devices, this library allows Alexa to discover ESP32 and ESP8266 microcontrollers as native smart plugs on the local network.

This approach is particularly useful for developers looking to implement low-latency, local voice control for relays, lights, or other simple switchable hardware. Because the emulation happens locally, the response time is significantly faster than cloud-based alternatives, and the device remains functional even if the external internet connection is interrupted.

## Key Features

- **Multiple Instance Support**: A single physical device can emulate up to 16 separate WEMO plugs. This allows a single ESP8266 or ESP32 to control a multi-channel relay board, with each channel appearing as a distinct device in the Alexa app.
- **GPIO Mapping**: Each emulated instance is directly linked to a specific GPIO pin, simplifying the logic required to toggle hardware.
- **Configurable Metadata**: Through the Mongoose OS configuration schema, users can define the vendor string, model string, and human-readable descriptions for the emulated hardware.
- **Automatic Port Management**: Due to the nature of WEMO's UPnP implementation, each virtual instance binds to its own port, which the library manages automatically starting from a user-defined base port.

## Technical Implementation

The library is built on top of the Mongoose OS networking stack, specifically utilizing the `http-server` and `dns-sd` libraries to handle discovery and control requests. When Alexa performs a device discovery, the library responds to SSDP (Simple Service Discovery Protocol) searches, identifying itself as a WEMO-compatible device.

### Usage Example

Adding a new virtual device is handled via a simple C API. Developers can register a device by providing a friendly name and the target relay pin:

```c
// Add a virtual plug named "Living Room Light" connected to GPIO 12
bool success = alexa_wemo_add_instance("Living Room Light", 12);
```

### Configuration

Fine-tuning the emulation is done via the `mos.yml` configuration file. The library exposes several settings to customize the behavior of the UPnP service:

```yaml
config_schema:
  - ["alexa_wemo.enable", "b", true, {title: "Enable plug emulation"}]
  - ["alexa_wemo.port", "i", 7770, {title: "UPnP port of first instance"}]
  - ["alexa_wemo.vendor", "s", "Alexmo", {title: "Vendor string"}]
```

## Hardware Considerations

While the library supports both ESP32 and ESP8266, there are practical limits to how many instances should be run simultaneously. While the theoretical limit is 16 instances, the README notes that adding more than two instances per device can currently lead to unstable behavior depending on the specific network environment and hardware resources. Each instance requires its own listening port and memory overhead to manage the UPnP state machine.
