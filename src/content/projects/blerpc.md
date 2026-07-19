---
title: bleRPC
summary: bleRPC is a high-performance framework for type-safe Remote Procedure Calls
  (RPC) over Bluetooth Low Energy, supporting platforms ranging from Zephyr-based
  microcontrollers to mobile and desktop environments. It leverages Protocol Buffers
  for code generation and implements a robust three-layer protocol stack to handle
  MTU-aware fragmentation and optional end-to-end encryption. The project is designed
  for efficiency, capable of running on devices with only 32 KB of RAM while achieving
  throughput up to 59 KB/s.
slug: blerpc
codeUrl: https://github.com/tdaira/blerpc
siteUrl: https://blerpc.net
lastUpdated: '2026-07-19'
licenses:
- NOASSERTION
rtos: zephyr
libraries:
- nanopb
topics:
- ble
- bluetooth
- bluetooth-low-energy
- code-generation
- embedded
- gatt
- iot
- nrf54
- protobuf
- protocol-buffers
- rpc
- zephyr
isShow: false
createdAt: '2026-07-19T07:14:43+00:00'
updatedAt: '2026-07-19T07:14:43+00:00'
---

## Type-Safe Remote Procedure Calls over BLE

Bluetooth Low Energy (BLE) is the backbone of modern IoT communication, but developing custom protocols on top of GATT characteristics often leads to significant boilerplate and fragile data handling. developers frequently find themselves manually managing packet fragmentation, serialization, and security. bleRPC addresses these challenges by providing a comprehensive framework for defining and executing type-safe RPC calls over BLE, bringing the ease of use found in gRPC to the world of embedded systems.

At its core, bleRPC allows developers to define services once using Protocol Buffers (`.proto` files) and generate specialized client and handler code for a wide array of platforms. This approach ensures that both the central (client) and peripheral (server) agree on the data structure, preventing runtime errors caused by mismatched message formats.

## A Robust Three-Layer Protocol Stack

To ensure reliability and security across different hardware, bleRPC implements a structured protocol stack that operates through a single GATT characteristic using Write Without Response and Notify operations:

1.  **Command Layer**: This layer wraps the Protocol Buffer payloads with necessary metadata to identify the specific RPC being called.
2.  **Encryption Layer**: For security-sensitive applications, bleRPC offers optional end-to-end encryption. It utilizes X25519 for key exchange, Ed25519 for identity verification, and AES-128-GCM for authenticated encryption. This stack is specifically designed to resist man-in-the-middle attacks through public key pinning.
3.  **Container Layer**: BLE has inherent Maximum Transmission Unit (MTU) limitations. The container layer automatically fragments larger RPC payloads into MTU-sized chunks and reassembles them on the receiving end, abstracting away the complexities of the underlying transport.

## Cross-Platform Ecosystem

One of the most impressive aspects of bleRPC is its broad platform support. It enables seamless communication between embedded firmware and high-level applications. 

On the firmware side, bleRPC is deeply integrated with the **Zephyr RTOS**. It provides peripheral and central implementations for modern hardware like the Nordic Semiconductor nRF54L15 and Silicon Labs EFR32xG22E. The firmware utilizes the **Nanopb** library for efficient, low-memory Protocol Buffer serialization, allowing the stack to run on devices with as little as 32 KB of RAM.

For the central (client) side, bleRPC provides libraries for:
- **Mobile**: Kotlin (Android), Swift (iOS), Flutter (Dart), and React Native (TypeScript).
- **Desktop/Web**: Python (macOS/Linux) and Web Bluetooth (TypeScript).
- **Embedded**: C (Zephyr RTOS) for device-to-device communication.

## Development Workflow

Using bleRPC starts with a standard `.proto` definition. By naming message pairs with `*Request` and `*Response` suffixes, the bleRPC generator automatically derives the corresponding RPC commands. 

On the peripheral (Zephyr) side, the generator produces weak handler stubs. Developers simply need to override these functions to implement their custom logic, such as reading a sensor or controlling an actuator. On the client side, the generated code provides high-level asynchronous methods that look and feel like standard function calls, hiding the underlying BLE scanning, connection management, and data serialization logic.

## Performance and Security

Despite the abstraction layers, bleRPC is optimized for performance. It can achieve throughput rates of up to 59 KB/s on Android and 30-32 KB/s on iOS and Python. The security model is equally rigorous, requiring identity keys to be configured at build-time for secure targets. By pinning the peripheral's Ed25519 public key in the central's firmware or application, the system ensures that connections are only established with trusted devices, providing a secure foundation for industrial and consumer IoT products.
