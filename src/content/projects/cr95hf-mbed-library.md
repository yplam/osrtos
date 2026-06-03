---
title: CR95HF Mbed Library
summary: A C++ library for the Mbed framework designed to interface with the CR95HF
  (X-Nucleo NFC03A1) NFC transceiver. It currently supports the ISO/IEC 14443A protocol
  and has been verified with MIFARE Classic and Ultralight tags.
codeUrl: https://github.com/pilotak/CR95HF
isShow: false
rtos: mbed-os
libraries: []
topics:
- cr95hf
- iso14443a
- mbed-os
- mifare
- nfc
- nfc-card-reader
- x-nucleo-nfc03a1
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- spektrum-receiver-library-for-mbed
- ds248x-1-wire-library
- herald-for-c
- xf-extension-to-freertos
- spirit-motor-driver-library
- ublox-gnss-api-for-mbed
---

The CR95HF is a versatile 13.56 MHz contactless transceiver from STMicroelectronics, often found on the X-Nucleo NFC03A1 expansion board. While powerful, integrating these chips into an embedded project requires a robust driver layer. The CR95HF library for Mbed OS provides a clean, object-oriented interface to interact with this hardware, specifically targeting ISO/IEC 14443A communication.

### Supported Protocols and Hardware
Currently, the library focuses on the **ISO/IEC 14443A** protocol. This makes it an ideal choice for projects involving common proximity cards and tags. It has been explicitly tested and verified with:
- **MIFARE Classic 1K** (utilizing 4-byte UIDs)
- **MIFARE Ultralight** (utilizing 7-byte UIDs)

The library is designed to work seamlessly within the Mbed ecosystem, making it compatible with a wide range of ARM Cortex-M microcontrollers supported by Mbed OS.

### Getting Started
To use the library, you simply need to initialize the `CR95HF` object with the appropriate pins for your hardware setup. The following example demonstrates a basic loop that initializes the chip, sets the protocol, and polls for tags in range to read their Unique Identifiers (UIDs).

```cpp
#include "mbed.h"
#include "CR95HF.h"

CR95HF nfc(D8, D2);

int main() {
    if (nfc.init() != CR95HF_ERROR_OK) {
        return -1;
    }

    if (nfc.setProtocol(CR95HF::ISO14443A) != CR95HF_ERROR_OK) {
        return -1;
    }

    while (true) {
        ThisThread::sleep_for(500ms);

        if (!nfc.isTagInRange()) {
            continue;
        }

        uint8_t *uid = new uint8_t[10];
        uint8_t tag_len = nfc.getTagUID(uid);

        if (tag_len > 0) {
            printf("UID: %s
", tr_array(uid, tag_len));
        }

        delete[] uid;
    }
}
```

### Advanced Debugging and Tracing
For developers needing deeper insight into the communication between the MCU and the CR95HF chip, the library supports `mbed-trace`. By configuring your `mbed_app.json`, you can enable various trace levels (Error, Warn, Info, Debug) to monitor the internal state and command flow. This is particularly useful when troubleshooting signal integrity issues or unsupported tag types.

To enable tracing, you can add a configuration block to your project:

```json
{
  "target_overrides": {
    "*": {
      "mbed-trace.enable": true,
      "target.printf_lib": "std"
    }
  }
}
```

Once enabled, the library can provide detailed feedback on the card type detected, such as distinguishing between standard MIFARE tags and ISO14443-4 compliant cards, allowing for more complex logic in your application's firmware.
