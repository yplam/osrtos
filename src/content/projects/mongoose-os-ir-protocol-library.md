---
title: Mongoose OS IR Protocol Library
summary: An infrared protocol library for Mongoose OS that enables decoding of IR
  signals, specifically supporting the NEC protocol. It provides both C and JavaScript
  APIs for integrating IR remote control functionality into embedded applications.
slug: mongoose-os-ir-protocol-library
codeUrl: https://github.com/dvv/mongoose-os-libs-ir
star: 1
lastUpdated: '2018-01-01'
rtos: mongoose-os
topics:
- ir-library
- mongoose-os
isShow: false
createdAt: '2025-12-31'
updatedAt: '2025-12-31'
relatedProjects:
- arduino-ir-for-mongoose-os
- mongoose-os-relay-library
- mel-ac-library-for-mongoose-os
- telegram-bot-api-for-mongoose-os
- lis3dh-accelerometer-library-for-mongoose-os
- sgp30-gas-sensor-library-for-mongoose-os
---

The Mongoose OS IR Protocol Library is a specialized module designed to handle infrared communication within the Mongoose OS ecosystem. It simplifies the process of receiving and decoding IR signals, which is a common requirement for IoT devices interacting with standard consumer electronics remotes.

### Protocol Support
The library primarily focuses on the NEC protocol, one of the most widely used formats for infrared remote controls. It handles the timing-sensitive task of capturing pulses from an IR receiver (such as a TSOP sensor) and translating them into 32-bit hex codes that applications can easily process.

### Multi-Language API
One of the strengths of Mongoose OS is its dual-language support, and this library follows that pattern by providing interfaces for both C and JavaScript (mJS). This allows developers to choose the environment that best fits their project's needs.

#### C Implementation
In C, developers can initialize a receiver on a specific GPIO pin and register a callback function that triggers whenever a valid IR code is detected. This is ideal for performance-critical applications or those already written in C.

```c
#include "mgos.h"
#include "mgos_ir.h"

static void irrecv_cb(int code, void *arg)
{
  LOG(LL_INFO, ("IR: %08X", code));
  (void) arg;
}

enum mgos_app_init_result mgos_app_init(void)
{
  // TSOP on pin 14, NEC protocol
  mgos_irrecv_nec_create(14, irrecv_cb, NULL);

  return MGOS_APP_INIT_SUCCESS;
}
```

#### JavaScript Implementation
For those using the built-in JavaScript engine for rapid prototyping or logic scripting, the library provides a clean wrapper that makes IR integration straightforward.

```js
load("api_ir.js");

// TSOP on pin 14, NEC protocol
let ir = IR.Receiver.NEC.create(14, function(code) {
    print("IR", code);
}, null);
```

### Configuration and Reliability
The library includes configuration options to ensure data integrity. Through the `mos.yml` configuration, developers can toggle CRC (Cyclic Redundancy Check) for both the address and the command code. By default, the library is configured to check the code CRC to prevent false triggers from noise or incomplete signals. This level of control allows developers to balance between strict signal validation and compatibility with various remote control hardware.

### Integration
As a standard Mongoose OS library, it integrates seamlessly into the `mos` build tool workflow. While this specific repository has transitioned to the official Mongoose OS libraries organization, it remains a core component for developers building IR-enabled hardware on ESP32, ESP8266, or other microcontrollers supported by the Mongoose OS framework.
