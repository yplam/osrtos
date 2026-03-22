---
title: contiki-ng
summary: Contiki-NG is an open-source, cross-platform operating system designed for
  next-generation IoT devices, focusing on dependable, low-power communication. It
  provides a full, RFC-compliant IPv6 networking stack and supports modern industrial
  standards such as 6LoWPAN, 6TiSCH, RPL, and CoAP for resource-constrained hardware.
slug: contiki-ng
codeUrl: https://github.com/contiki-ng/contiki-ng
siteUrl: https://github.com/contiki-ng/contiki-ng
star: 1480
version: release/v5.1
lastUpdated: '2026-03-20'
components:
- Scheduler
- Memory Management
- Network
- Wireless
- IPv6
- 6LoWPAN
- 6TiSCH
- RPL
- CoAP
- LwM2M
- MQTT
- Shell
- FileSystem
- Database
- Cryptography
- DTLS
- TLS/SSL
- Profiling
- BLE
- Simulator
platforms:
- ARM Cortex-M3
- ARM Cortex-M4
- ARM Cortex-M33
- MSP430
- Native
- Simulator
- Renode
- POSIX
- Linux
- macOS
licenses:
- BSD 3-Clause
libraries:
- mbedTLS
- CBOR
createdAt: '2025-12-04'
updatedAt: '2026-03-22'
---

### Features


- Full RFC-compliant IPv6 networking stack with 6LoWPAN header compression for constrained links.

- Support for 6TiSCH (TSCH) providing high-reliability, low-latency, and low-power industrial wireless communication.

- RPL (IPv6 Routing Protocol for Low-Power and Lossy Networks) available in both Classic and Lite versions.

- Native support for CoAP and CoAPs for RESTful interaction in constrained environments.

- Implementation of OMA LwM2M for standardized device management and service enablement.

- Protothreads-based multitasking providing a memory-efficient, event-driven programming model without the overhead of per-thread stacks.

- Integrated Coffee File System designed specifically for flash memory storage on resource-constrained devices.

- Antelope database management system for local data indexing and querying on embedded nodes.

- Energest software-based energy estimation module for fine-grained monitoring of power consumption.

- Support for MQTT and MQTT5 protocols for efficient cloud and broker-based connectivity.

- Comprehensive security suite including AES-CCM*, Elliptic Curve Cryptography (ECC), and CBOR support.

- Integrated Cooja simulator for large-scale network simulation and cross-level debugging.

- Link-time optimization (LTO) support to significantly reduce binary footprint on small-memory devices.

- Hardware Abstraction Layer (HAL) for standardized access to GPIO, UART, SPI, and radio interfaces.

- Support for MPL (Multicast Protocol for Low-Power and Lossy Networks) as per RFC7731.



Contiki-NG is architected as a modular, event-driven operating system specifically optimized for the Internet of Things. At its core, it utilizes a unique multitasking mechanism called **Protothreads**, which provides a stackless, C-based implementation of cooperative multithreading. This allows the system to handle complex asynchronous events and networking protocols with extremely low memory overhead, as it avoids the need for dedicated stacks for every process.

The system is structured into several distinct layers: the **Hardware Abstraction Layer (HAL)**, which provides a uniform interface for various MCUs and radios; the **Core OS**, which manages processes, timers, and events; and the **Network Stack**, which is the most prominent feature of Contiki-NG. The network stack is highly configurable, allowing developers to choose between various MAC layers (CSMA, TSCH, NullMAC) and network layers (IPv6, NullNet). These subsystems interact through well-defined APIs, enabling the integration of services like LwM2M or MQTT on top of the standard IPv6/6LoWPAN foundation.

#### Core Components
* **Protothreads**: Lightweight, stackless threads for event-driven systems.
* **uIP Stack**: A highly optimized IPv6 stack supporting TCP, UDP, and ICMP6.
* **TSCH/6TiSCH**: Time-Slotted Channel Hopping for industrial-grade reliability.
* **Coffee FS**: A flash-optimized file system for persistent storage.
* **Energest**: A real-time energy profiling tool for tracking power states.

### Use Cases

This RTOS is ideal for:

- **Industrial Wireless Networks**: Utilizing 6TiSCH and TSCH to provide deterministic communication and high reliability in environments with heavy interference.
- **Smart City Infrastructure**: Leveraging RPL and IPv6 for large-scale mesh networks such as smart street lighting and environmental monitoring.
- **Remote Asset Management**: Using OMA LwM2M and CoAP for standardized device configuration, firmware updates, and telemetry over low-power wide-area links.
- **Energy-Critical IoT Sensors**: Employing Energest and low-power MAC protocols for battery-operated devices that must remain functional for years without maintenance.

### Getting Started

To begin developing with Contiki-NG, it is highly recommended to use the provided **Docker image**, which contains the complete toolchain, including compilers for ARM and MSP430, as well as the Cooja simulator. Developers can clone the repository and run a "Hello World" example by navigating to `examples/hello-world` and executing `make TARGET=native`. For network simulations, the **Cooja Simulator** allows for testing large-scale RPL or TSCH networks on a PC before deploying to physical hardware. Detailed documentation, including tutorials on the build system and configuration, is available at [docs.contiki-ng.org](https://docs.contiki-ng.org/).
