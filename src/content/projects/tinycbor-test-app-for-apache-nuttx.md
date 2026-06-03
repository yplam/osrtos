---
title: TinyCBOR Test App for Apache NuttX
summary: A demonstration application for Apache NuttX RTOS that showcases how to encode
  sensor data using the TinyCBOR library. It provides practical examples of serializing
  structured data into compact binary formats for efficient transmission on platforms
  like ESP32 and BL602.
slug: tinycbor-test-app-for-apache-nuttx
codeUrl: https://github.com/lupyuen/tinycbor_test
siteUrl: https://lupyuen.github.io/articles/cbor2
star: 1
lastUpdated: '2022-07-12'
rtos: nuttx
topics:
- bl602
- bl604
- cbor
- nuttx
- pinecone
- pinedio
- riscv32
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- lorawan-test-app-for-apache-nuttx
- rust-test-app-for-apache-nuttx-os
- bl602-adc-and-temperature-sensor-test-app
- lvgl-test-app-for-apache-nuttx
- lora-test-app-for-semtech-sx1262-and-apache-nuttx
- zig-on-risc-v-bl602-with-apache-nuttx-rtos
---

## Efficient Data Serialization for Embedded Systems

In the world of IoT and embedded systems, bandwidth and power are precious resources. While JSON is the de facto standard for data exchange on the web, its text-based nature is often too verbose for resource-constrained devices communicating over low-power wide-area networks (LPWAN) like LoRaWAN. The TinyCBOR Test App for Apache NuttX provides a solution by demonstrating the use of Concise Binary Object Representation (CBOR).

CBOR is a binary data serialization format that offers the flexibility of JSON but with significantly smaller message sizes. This project serves as a reference implementation for developers looking to integrate efficient data encoding into their NuttX-based firmware.

## Key Features and Capabilities

The application focuses on two primary test cases that illustrate the efficiency of CBOR:

- **Simple Data Encoding**: Demonstrates how to wrap a single sensor reading (e.g., temperature) into a CBOR map. A structure like `{"t": 1234}` is compressed into a mere 6 bytes.
- **Complex Data Encoding**: Shows the serialization of multiple data points, such as `{"t": 1234, "l": 2345}`, which results in an 11-byte payload. 
- **NuttX Integration**: Built specifically for the Apache NuttX ecosystem, the app integrates seamlessly with the NuttX build system (Kconfig/Makefile) and the NuttX Shell (NSH).

## Technical Implementation

The project relies on a ported version of Intel's TinyCBOR library specifically optimized for NuttX. The core logic is contained within `tinycbor_test_main.c`, which utilizes the TinyCBOR encoder API to construct maps and integer types. 

### Hardware Support

While the application is portable across many NuttX-supported architectures, the repository includes specific guidance for popular wireless SoCs:
- **Bouffalo Lab BL602**: A RISC-V based microcontroller with WiFi and Bluetooth capabilities.
- **Espressif ESP32**: The widely-used dual-core MCU, often found in IoT gateways and sensor nodes.

## Getting Started with TinyCBOR on NuttX

To use this application, it must be added as a submodule within the NuttX `apps/examples` directory. Once added, it can be enabled through the standard NuttX configuration utility:

```bash
make menuconfig
```

Under `Application Configuration` → `Examples`, you can enable the `TinyCBOR Test App`. After compiling and flashing the firmware, the application can be executed from the NuttX Shell by typing `tinycbor_test`.

### Example Output

When the application runs, it outputs the hexadecimal representation of the encoded CBOR data, allowing developers to verify the byte-level structure of their payloads:

```bash
nsh> tinycbor_test
test_cbor: Encoding { "t": 1234 }
CBOR Output: 6 bytes
  0xa1
  0x61
  0x74
  0x19
  0x04
  0xd2
```

This hexadecimal output corresponds to a map with one element, where the key "t" is followed by the integer value 1234. This compact representation is ready to be sent over the air with minimal overhead, making it an essential tool for modern embedded developers working on telemetry and remote sensing applications.
