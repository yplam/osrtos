---
title: libedhoc
summary: A lightweight C implementation of the Ephemeral Diffie-Hellman Over COSE
  (EDHOC) protocol (RFC 9528) designed for constrained IoT devices. It provides mutual
  authentication and forward secrecy with a minimal footprint, featuring native Zephyr
  RTOS integration and stack-only memory allocation.
slug: libedhoc
codeUrl: https://github.com/kamil-kielbasa/libedhoc
siteUrl: https://kamil-kielbasa.github.io/libedhoc/
version: v1.7.1
lastUpdated: '2026-03-23'
licenses:
- MIT
rtos: zephyr
topics:
- authentication
- c
- coap
- constrained-devices
- cryptography
- edhoc
- embedded
- ietf
- iot
- key-exchange
- oscore
- rfc9528
- rfc9529
- security
- zephyr
isShow: false
createdAt: '2026-03-31T23:34:03+00:00'
updatedAt: '2026-03-31T23:34:03+00:00'
---

Secure communication in the Internet of Things (IoT) often faces a difficult trade-off between robust security and limited hardware resources. While traditional protocols like DTLS provide strong protection, their overhead can be prohibitive for the most constrained devices. The Ephemeral Diffie-Hellman Over COSE (EDHOC) protocol, standardized as RFC 9528, was designed to solve this problem by providing a very low-overhead authenticated key exchange. libedhoc is a specialized C implementation of this protocol, built specifically to bring these security benefits to the smallest embedded systems.

### Security and Architecture

At its core, libedhoc facilitates mutual authentication, forward secrecy, and identity protection. It is built with a security-first mindset, ensuring that sensitive cryptographic material remains protected throughout the handshake process. One of its standout features is the context-based API, which uses safe handles to manage protocol state and prevent unauthorized access. 

A significant security advantage of libedhoc is its approach to key management. Private keys are accessible only by identifier, meaning raw key material is never exposed to the user application. This design allows the library to interface with secure elements or hardware security modules (HSMs) where keys are kept in isolated environments.

### Designed for Constrained Environments

For developers working with resource-constrained hardware, memory management is often the biggest hurdle. libedhoc addresses this by utilizing stack-only allocations. By leveraging Variable Length Arrays (VLA) and avoiding the heap entirely, the library eliminates the risk of heap fragmentation and memory leaks. This makes the library's behavior highly predictable, a critical requirement for safety-critical and high-reliability embedded applications.

The library's footprint is impressively small. In a standard configuration using cipher suite 2 (P-256/ES256), the library occupies approximately 20 KiB of flash. Because all state is maintained on the stack during the handshake, it requires zero bytes of static RAM (data/bss).

### Key Features and Protocol Support

libedhoc is a comprehensive implementation that supports all four EDHOC authentication methods (0–3), combining Signature Keys and Static DH Keys for both initiators and responders. It includes support for common cipher suites:

*   **Suite 0**: AES-CCM-16-64-128, SHA-256, X25519, and EdDSA.
*   **Suite 2**: AES-CCM-16-64-128, SHA-256, P-256, and ES256.

Beyond the handshake itself, the library simplifies the transition to secure data transfer by supporting OSCORE session export. This allows developers to immediately establish secure communication channels using Object Security for Constrained RESTful Environments (OSCORE) once the EDHOC exchange is complete. All CBOR encoding and decoding are encapsulated using the `zcbor` library, shielding the user from the complexities of data serialization.

### Integration and Ecosystem

Integration is a primary focus of the project. It features native support for the Zephyr RTOS, including `west` manifest integration and `Kconfig` support for easy build-time configuration. For projects outside of the Zephyr ecosystem, the library remains highly portable and can be integrated into standard Linux environments or other RTOS platforms.

To ensure the highest level of reliability, the codebase is subjected to a rigorous verification pipeline. This includes 100% function coverage, verification against RFC 9529 test vectors, and continuous testing using modern analysis tools such as AddressSanitizer (ASan), UndefinedBehaviorSanitizer (UBSan), Valgrind, and LibFuzzer. This robust testing strategy ensures that the protocol implementation is resilient against both malformed inputs and potential memory safety issues.
