---
title: Sleepy Nodes
summary: An implementation of the Sleepy CoAP Node protocol based on the IETF draft
  RFC. It provides a synchronization interface for energy-constrained IoT devices
  using the Contiki OS and Erbium CoAP engine, allowing nodes to delegate resources
  to a proxy and sleep for extended periods.
slug: sleepy-nodes
codeUrl: https://github.com/Fpculcasi/sleepy-nodes
star: 0
lastUpdated: '2017-09-30'
rtos: contiki-os
topics:
- californium
- coap
- contiki-os
- cooja
- energy-saving
- iot
- proxy
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- low-power-wireless-networking-for-iot-lpiot
- coap-eap-with-eap-noob-in-contiki
- lightweight-publish-subscribe-application-protocol-for-tinyos
- mqtt-like-application-for-tinyos
- contiki-lora-tsch-project
- msf-protocol-simulation-for-contiki-ng
---

## Overview

Sleepy Nodes is an implementation of the Sleepy CoAP Node protocol, specifically following the specifications laid out in the IETF draft RFC `draft-zotti-core-sleepy-nodes-04`. The project addresses a common challenge in the Internet of Things (IoT): how to enable Constrained Application Protocol (CoAP) communication for devices that must remain in a low-power sleep state for the majority of their operation.

In a standard CoAP environment, nodes are expected to be reachable. However, "sleepy" nodes often power down their radio interfaces to conserve battery. This project implements a proxy-based architecture where a Sleepy Node can delegate its resources to a more capable Proxy. The Proxy handles requests from the network on behalf of the node while it is asleep, and synchronizes state when the node wakes up.

## Technical Architecture

The system is divided into three primary components:

1.  **Sleepy Node**: Implemented using the **Contiki OS** and the **Erbium (er-coap)** REST engine. These nodes run on constrained hardware, manage local sensors, and periodically wake up to synchronize with a proxy.
2.  **Proxy**: Built using the **Californium** framework. The proxy acts as a gateway, mirroring the resources of the sleepy nodes and caching updates from the network (such as configuration changes) to be delivered when the node next checks in.
3.  **Regular Node**: Represented in this project by the Firefox Copper (Cu) plugin, acting as a standard CoAP client that interacts with the delegated resources on the proxy.

## Key Interfaces

The project defines two primary interfaces to manage the lifecycle of a sleepy resource:

### SYNCHRONIZE Interface
This interface handles the interaction between the Sleepy Node and the Proxy. The node follows a specific lifecycle:
- **Discovery & Registration**: The node discovers a proxy and registers its local resources.
- **Update Loop**: The node enters a loop where it checks for modified resources on the proxy, updates local configurations if necessary, samples local sensors, and pushes new values to the proxy before returning to sleep.

### DELEGATE Interface
This interface allows Regular Nodes to interact with the Proxy. Clients can perform discovery to find which sleepy nodes have delegated resources to the proxy and can "observe" these resources. When a Sleepy Node updates the proxy, the proxy automatically notifies all registered observers.

## Implementation Details

The project leverages the Contiki build system and is configured via `project-conf.h`. It utilizes the Erbium CoAP implementation and the REST engine provided by Contiki. Key features include:

- **Unicast Discovery**: Due to reliability issues with multicast in certain environments, proxy discovery is performed via unicast.
- **Blocking Requests**: The implementation uses a set of macros to handle blocking CoAP requests, simplifying the state machine for the application developer.
- **Resource Lifetime**: Supports resource expiration and re-registration logic if a proxy discards a delegated resource due to timeout.

### Example API Usage

The project provides a high-level API for developers to integrate sleepy behavior into their sensor applications. For example, registering a resource and updating its value is handled through descriptive macros:

```c
// Register a resource to the proxy
PROXY_RESOURCE_REGISTRATION(proxy_handler, delegate_resource);

// Update a resource value with a specific lifetime
PROXY_RESOURCE_PUT_LT(proxy_handler, delegated_resource, lifetime);

// Check for updates from the proxy
PROXY_ASK_UPDATES(proxy_handler, local_path_prefix, query);
```

## Hardware and Software Requirements

The Sleepy Node component is designed to run within the Contiki environment, targeting platforms like TelosB (Sky) or simulated nodes in Cooja. It requires IPv6 support (`UIP_CONF_IPV6`) and is optimized for memory-constrained devices by disabling TCP and using linker optimizations.
