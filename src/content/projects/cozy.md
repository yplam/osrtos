---
title: Cozy
summary: Cozy is a lightweight COSE (CBOR Object Signing and Encryption) library designed
  as an external module for the Zephyr RTOS. It provides implementations for signing
  and encrypting data using mbedTLS and NanoCBOR, targeting resource-constrained embedded
  systems.
codeUrl: https://github.com/lindemer/cozy
isShow: false
rtos: zephyr
libraries: []
topics:
- cbor
- cose
- ietf
- zephyr
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- libedhoc
- zephyr-coaps-client-with-tinydtls
- jsonx-lightweight-embedded-json-serializer
- crypto-implementations-example-for-contiki-os
- embedmcp-embedded-mcp-server-library
- tinycbor-test-app-for-apache-nuttx
---

## Securing Embedded Communications with Cozy

In the world of IoT and embedded systems, security is often a trade-off between robust protection and limited resources. **Cozy** is a library designed to bridge this gap by providing a streamlined implementation of the COSE (CBOR Object Signing and Encryption) standard, specifically tailored for the Zephyr RTOS ecosystem.

COSE, defined in RFC 8152, is the binary equivalent of the JSON Object Signing and Encryption (JOSE) suite. By using CBOR (Concise Binary Object Representation) instead of JSON, COSE significantly reduces the overhead of security headers and payloads, making it ideal for low-power wide-area networks (LPWAN) and microcontrollers with limited memory and bandwidth.

### Key Features and RFC 8152 Coverage

Cozy currently focuses on the most essential parts of the COSE specification required for secure device-to-device or device-to-cloud communication. Its current coverage includes:

- **COSE Sign1**: Support for encoding and decoding single-signer signature structures.
- **COSE Encrypt0**: Support for encoding and decoding encryption structures with a single recipient or pre-shared keys.
- **Cryptographic Algorithms**: Support for EC signature algorithms using NIST P-256 and NIST P-384 curves.
- **AEAD Algorithms**: Support for Authenticated Encryption with Associated Data using AES-GCM (128, 192, and 256-bit variants).

### Built on Proven Foundations

Rather than reinventing the wheel, Cozy stands on the shoulders of giants. It utilizes **mbedTLS** for its underlying cryptographic primitives, ensuring that the heavy lifting of signatures and encryption is handled by a well-vetted, industry-standard library. For serialization, it integrates **NanoCBOR**, a tiny CBOR library designed specifically for constrained devices.

Because it is built for Zephyr, Cozy leverages the Zephyr build system (Kconfig and CMake) to manage dependencies. For example, enabling Cozy automatically selects the necessary mbedTLS configurations, such as heap support and specific cipher modes, simplifying the developer experience.

### Integrating Cozy into Your Zephyr Project

One of the primary strengths of Cozy is its seamless integration as a Zephyr module. You can include it in your application without manually copying source files into your tree. To get started, add the following line to your application's `CMakeLists.txt`:

```cmake
set(ZEPHYR_EXTRA_MODULES <absolute_path_to>/cozy)
```

Then, enable the library in your project configuration (`prj.conf`):

```conf
CONFIG_COZY=y
```

Once configured, the API is accessible via a single header inclusion:

```c
#include <cozy/cose.h>
```

### Testing and Examples

The repository includes a comprehensive test suite that can be run using the Zephyr `native_posix` board. This allows developers to verify the library's functionality on their local machine before deploying to hardware. The tests also serve as functional examples; by examining `tests/src/tests.c`, developers can see exactly how to construct, sign, and encrypt COSE objects using the Cozy API.

### Project Roadmap

Cozy is an evolving project with a clear roadmap for expanding its capabilities. Future updates are expected to include:
- Support for ECDH key agreement algorithms.
- Support for countersignatures.
- Support for NSA Suite B algorithms listed in RFC 6460.
- Full coverage of the COSE specification described in RFC 8152.

For developers working within the Zephyr ecosystem who need to implement standardized, interoperable security, Cozy provides a lightweight and easy-to-use foundation.
