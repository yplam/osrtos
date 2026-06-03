---
title: COMPASS Multihop Framework for TinyOS
summary: A multihop networking framework for TinyOS 2.x that implements a unified
  API for sensor network communication. It features a modified version of the Dynamic
  Source Routing (DSR) protocol and supports various addressing modes to simplify
  application development.
codeUrl: https://github.com/jryans/compass-dsr-tinyos
siteUrl: https://convolv.es/compass-dsr-tinyos/
isShow: false
rtos: tinyos
libraries: []
topics:
- dsr
- mote
- routing
- tinyos
- wireless-sensor-network
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- cse160-network-protocols-project-skeleton
- tag-and-tina-implementation-on-tinyos
- lightweight-publish-subscribe-application-protocol-for-tinyos
- loadng-implementation-on-contiki-os
- distributed-wavelet-transform-for-tinyos
- dsml4tinyos-a-domain-specific-language-for-tinyos
---

## The COMPASS Multihop Framework for TinyOS

While TinyOS 2.x provides a robust single-hop messaging layer, it lacks a standardized multihop framework that addresses the diverse needs of sensor network applications. The COMPASS (Communication Protocol Architecture for Sensor Systems) framework was developed at Rice University to fill this gap. By surveying a wide range of distributed data processing algorithms, the developers designed a multihop networking API that provides a unified interface for application designers.

### Bridging the Gap in Sensor Networks

The primary goal of the COMPASS framework is to allow application developers to focus on high-level logic without becoming entangled in the complexities of routing protocol implementation. Conversely, it allows routing protocol designers to iterate on their algorithms without requiring changes to the application code. This modularity is achieved through a clean separation of concerns at the messaging layer.

Key capabilities of the framework include:
* **Multihop Routing**: Support for various addressing modes including single node, multiple nodes, geographical regions, and device hierarchies.
* **Message Interception**: The ability to intercept and process messages as they are being forwarded through the network.
* **Congestion Management**: Tools to control transmission effort and manage network traffic.
* **Self-Organization**: Support for building and maintaining device hierarchies automatically.

### Technical Architecture and DSR

At its core, the framework currently utilizes a modified version of the **Dynamic Source Routing (DSR)** protocol (RFC 4728) tailored specifically for the constraints of TinyOS. DSR is a reactive routing protocol that allows the network to be completely self-organizing and self-healing without the need for periodic advertisement packets.

The implementation is written in **nesC**, the component-based language used by TinyOS. The repository structure includes core components in the `apps/wavelet` directory (which serves as the primary development area for the framework's logic) and reusable interfaces in `tos/interfaces`.

### Configuration and Usage

Integrating COMPASS into a TinyOS project involves wiring the application to the framework's components. The project uses standard TinyOS Makefiles with specific flags to tune the routing behavior. For example, the `Makefile` in the wavelet application demonstrates how to configure the DSR route cache:

```makefile
# Set data length and DSR cache limits
CFLAGS += -DTOSH_DATA_LENGTH=48
CFLAGS += -DDSR_ROUTE_CACHE_MAX_NODES=20
CFLAGS += -DDSR_ROUTE_CACHE_MAX_LINKS=250

# Disable address recognition to allow sniffing/forwarding
CFLAGS += -DCC2420_NO_ADDRESS_RECOGNITION

include $(MAKERULES)
```

### Project Structure

*   **apps/wavelet**: Contains the main framework implementation, including `RouterC`, `BigPackC` (for handling larger data units), and `StatsC` for network telemetry.
*   **docs/**: Includes comprehensive documentation, including a framework overview PDF and generated nesdoc files for API reference.
*   **tos/interfaces**: Defines the standard interfaces used for iteration and comparison within the framework.

COMPASS represents a significant step toward a standardized networking stack for TinyOS, providing the flexibility needed for modern, complex sensor network deployments.
