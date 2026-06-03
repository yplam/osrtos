---
title: Mongoose OS Relay Library
summary: A hardware abstraction library for Mongoose OS designed to manage relays,
  LEDs, and GPIO-controlled peripherals. It provides a unified API for both C and
  JavaScript (MJS) development, specifically tested on ESP8266 and ESP32 microcontrollers.
slug: mongoose-os-relay-library
codeUrl: https://github.com/kotelnikov/mgos_relay
siteUrl: https://mongoose-os.com/
star: 1
lastUpdated: '2024-04-16'
rtos: mongoose-os
topics:
- c
- esp32
- esp8266
- js
- mongoose-os
- relay
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- telegram-bot-api-for-mongoose-os
- arduino-ir-for-mongoose-os
- mongoose-os-ir-protocol-library
- lis3dh-accelerometer-library-for-mongoose-os
- adafruit-e-paper-e-ink-library-for-mongoose-os
- mongoose-os-programs-and-examples
---

## Overview

The Mongoose OS Relay library is a specialized component for the Mongoose OS framework, designed to simplify the management of digital outputs. While named for relays, the library is equally effective for controlling LEDs, transistor switches, or managing power and reset pins for peripheral devices connected to a main microcontroller. 

Developed primarily for the Espressif ESP8266 and ESP32 platforms, this library abstracts the low-level GPIO operations into a high-level object-oriented interface. This allows developers to focus on application logic rather than pin state management and internal pull-up/pull-down configurations.

## Key Features

- **Dual Language Support**: Full support for both C and JavaScript (via the MJS engine), making it accessible for different development workflows within Mongoose OS.
- **State Management**: Easily track the current state of a relay or GPIO without maintaining external variables.
- **Timed Operations**: The `touch` function allows for momentary state changes (e.g., pulsing a relay for a specific duration), which is ideal for reset triggers or timed power cycles.
- **Flexible Configuration**: Supports defining inactive states (High or Low) and internal MCU pull-up/pull-down resistors during initialization.
- **Memory Efficient**: Provides methods to clear and delete relay instances to free up system memory when they are no longer needed.

## Technical Implementation

The library handles the complexities of GPIO initialization through a single call. When creating a relay instance, developers specify the GPIO pin, the inactive state level (to handle normally-open vs. normally-closed hardware logic), and whether internal pulls should be enabled.

### JavaScript (MJS) Example

For developers using the MJS engine, the library provides an intuitive API. The following snippet demonstrates basic initialization and control:

```js
load("api_relay.js");

let relay_pin = 2;
// create(gpio, inactive_state, pull)
let relay = Relay.create(relay_pin, false, true);

relay.on();
relay.toggle();

// Switch state for 5 seconds then return to original state
relay.touch(5000);
```

### C API Example

In C, the library uses a struct-based approach. The `mgos_relay_initialize` function sets up the hardware, and subsequent calls use the returned pointer to manage the state:

```c
#include "mgos.h"
#include "mgos_relay.h"

#define RELAY_PIN 16

struct mgos_relay *relay;

void test_relay(void) {
    relay = mgos_relay_initialize(RELAY_PIN, false, true);
    
    mgos_relay_on(relay);
    mgos_relay_off(relay);
    mgos_relay_toggle(relay);
    
    // Pulse the relay for 3 seconds
    mgos_relay_touch(3000, relay);
}
```

## Integration

To include the library in a Mongoose OS project, developers simply need to add the repository to the `libs` section of their `mos.yml` file. This triggers the Mongoose OS build tool to fetch the source code and include the necessary headers and MJS wrappers during the build process. The library is designed to be lightweight, making it suitable for resource-constrained IoT applications where multiple relays or status indicators must be managed simultaneously.
