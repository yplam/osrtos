---
title: Distributed Wavelet Transform for TinyOS
summary: A data compression system for wireless sensor networks implementing a distributed
  wavelet transform on TinyOS. It includes custom networking protocols, a multi-packet
  fragmentation service, and spatial transform logic optimized for the Crossbow MicaZ
  platform.
slug: distributed-wavelet-transform-for-tinyos
codeUrl: https://github.com/jryans/wavelet-tinyos
star: 0
lastUpdated: '2014-11-12'
rtos: tinyos
topics:
- mote
- tinyos
- wavelet
- wireless-sensor-network
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- tag-and-tina-implementation-on-tinyos
- compass-multihop-framework-for-tinyos
- radiotftp-process-for-contiki-os
- low-power-wireless-networking-for-iot-lpiot
- atmega128rfa1-tinyos-kth-wsn-project
- lightweight-publish-subscribe-application-protocol-for-tinyos
---

## Overview

This project addresses the critical challenge of power consumption in wireless sensor networks (WSNs) by implementing a distributed wavelet transform for data compression. By compressing data at the source and throughout the network, the system reduces the number of transmissions required to reach a base station, thereby extending the operational lifetime of battery-powered sensor nodes.

The implementation is written in nesC for the TinyOS environment and was specifically developed and tested on Crossbow's MicaZ platform. It encompasses not only the wavelet transform itself but also a suite of essential system services required for robust operation in a distributed environment.

## Technical Implementation

The project is built upon several custom-designed components that extend the base capabilities of TinyOS 1.x:

### Networking and Fragmentation
Because the focus was on the transform rather than routing, the system utilizes simplified broadcast and unicast protocols. The broadcast protocol manages packet sequence numbers to prevent redundant transmissions, while the unicast protocol relies on static routing tables. 

To overcome the standard 29-byte data length limitation of TinyOS 1.x, a multi-packet fragmentation and reassembly service was implemented. This service uses descriptor records to rebuild complex data structures, including those containing pointers or variable-length arrays, allowing for the bidirectional communication of large parameter sets and statistical data.

### Distributed Wavelet Transform
The core application performs a spatial transform across the mote network. To ensure nodes operate in sync, the system employs a finite state machine (FSM) with fixed-length delays, assuming underlying clock synchronization between devices. 

Data compression is achieved through a "transmission band" scheme. Each mote compares its transform results against target values provided by the sink node. Motes only transmit if their values fall within specific bands. Once the sink node has received sufficient data to reconstruct an approximation of the original signal, it broadcasts a stop message to suppress further transmissions, saving significant energy.

## Development Challenges and Insights

Developing for the MicaZ platform presented several unique embedded systems challenges:

*   **Simulation and Debugging**: Due to the difficulty of debugging live hardware, the project relied heavily on TOSSIM, the TinyOS simulator, to resolve complex race conditions and message-dependent bugs.
*   **Memory Constraints**: To calculate metrics like the median received signal strength without exhausting the limited RAM of the ATmega128L, the project implemented the P2 algorithm. This allows for the dynamic calculation of quantiles without storing every observation.
*   **Hardware Conflicts**: A notable challenge involved an interrupt conflict on the MicaZ where a sensor shared a line with the radio. If a packet arrived during a sensor read, the data would corrupt. This required careful system-level workarounds and file management within the TinyOS tree.

## Future Directions

The project provides a foundation for further WSN research, with planned improvements including:
*   Implementation of time-domain transforms to complement the existing spatial transform.
*   Decoupling the wavelet core from system services to improve reusability.
*   Enhancing the networking stack for better compatibility with standard routing protocols like MintRoute or CTP.
*   Abstracting input sources to support a wider variety of sensors beyond the fixed defaults.
