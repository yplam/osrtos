---
title: STM32 UID Helper for Mbed
summary: A lightweight Mbed OS library for retrieving the unique identifier (UID)
  from STM32 microcontrollers. It provides methods to obtain the raw 96-bit UID or
  a URL-safe Base64 encoded version for easy identification in IoT applications.
slug: stm32-uid-helper-for-mbed
codeUrl: https://github.com/pilotak/stm32-uid
star: 1
lastUpdated: '2018-07-24'
rtos: mbed-os
topics:
- mbed
- mbed-os
- stm32
- uid
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- minimal-mbed-os-template-for-stm32f103
- bluepill-board-support-for-mbed-os-6
- stm32f103-low-power-library-for-mbed-os
- minimal-mbed-os-template-for-stm32f030
- mbed-quadrature-encoder-library
- single-stm32-header
---

The `stm32-uid` library is a specialized utility for developers working with STM32 microcontrollers within the Mbed OS ecosystem. Its primary purpose is to provide a clean, high-level interface for accessing the unique 96-bit device identifier (UID) that is factory-programmed into every STM32 chip.

In many embedded and IoT applications, having a globally unique identifier for each device is crucial for tasks such as provisioning, cloud registration, or generating unique MAC addresses. While the STM32 hardware provides this ID in a specific memory-mapped register (`UID_BASE`), accessing and formatting it consistently across different STM32 families can be repetitive. This library abstracts that process into a simple C++ class.

## Key Features

The library offers two primary ways to retrieve the device ID:

- **Raw Binary Access**: The `get()` method retrieves the 12-byte (96-bit) unique ID directly into a provided buffer.
- **Base64 Encoding**: The `get_base64()` method converts the 12-byte ID into a 16-character Base64 string. This is particularly useful for transmitting the ID over text-based protocols like MQTT or HTTP, or for displaying it in logs.

The implementation uses a URL-safe Base64 encoding scheme, substituting the standard `+` and `/` characters with `-` and `_`. This ensures the resulting string can be safely used in URLs or filenames without further encoding.

## Technical Implementation

The library is designed to be lightweight and easy to integrate. It directly interacts with the STM32 hardware by casting the `UID_BASE` address to a pointer and reading the three 32-bit words that comprise the unique ID. It handles the byte ordering to ensure a consistent representation regardless of the specific STM32 target. Because it is provided as a header-only implementation, it minimizes build complexity.

## Getting Started

Integrating the library into an Mbed application is straightforward. After instantiating the `STM32uid` class, you can populate buffers with the ID data as shown in the following example:

```cpp
#include "mbed.h"
#include "stm32-uid.h"

STM32uid uid;

int main() {
    char id[12], base[16];

    // Retrieve raw bytes
    uid.get(id);

    // Retrieve Base64 encoded string
    uid.get_base64(base);

    printf("UID (Hex): ");
    for (int i = 0; i < 12; ++i) {
        printf("%02X", id[i]);
    }

    printf("\nBase64: ");
    for (int i = 0; i < 16; ++i) {
        printf("%c", base[i]);
    }
    printf("\n");
}
```

This library is a small but essential tool for STM32 developers who need a reliable way to identify their hardware in the field. By leveraging the built-in hardware UID, developers can avoid the need for external EEPROMs or manual serial number flashing during production, simplifying the manufacturing and deployment process for IoT devices.
