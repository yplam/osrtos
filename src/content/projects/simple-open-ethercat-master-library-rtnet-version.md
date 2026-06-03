---
title: Simple Open EtherCAT Master Library (RTNET Version)
summary: A real-time EtherCAT master library based on SOEM, specifically patched for
  use with RTnet on Xenomai and RTAI. It provides hard real-time network communication
  for high-performance robotics applications, enabling low-latency control of EtherCAT
  slaves.
slug: simple-open-ethercat-master-library-rtnet-version
codeUrl: https://github.com/saga0619/rtnet_soem
siteUrl: https://openethercatsociety.github.io/doc/soem/
star: 21
lastUpdated: '2025-01-16'
rtos: xenomai
topics:
- ethtercat
- real-time
- rtnet
- soem
- xenomai
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- soem-w5500-ethercat-master-for-raspberry-pi
- real-time-spi-on-xenomai-3
- canfestival-rtt
- xenomai-3-for-raspberry-pi-2-and-3
- xenomai-3-for-raspberry-pi-0-1-linux-kernel-4-1-21
- flexptp
---

## Overview

RTnet SOEM is a specialized version of the Simple Open EtherCAT Master (SOEM) library, modified to support hard real-time networking via RTnet. While the original SOEM is a widely used C-based EtherCAT master library, this version introduces specific socket configuration codes required to interface with the RTnet protocol stack on Linux extensions like Xenomai and RTAI.

This project is particularly suited for high-performance robotics and industrial automation where deterministic communication is critical. It has been successfully deployed and tested on the TOCABI humanoid robot, a complex 33-degree-of-freedom system, demonstrating high stability with virtually no timeouts over extended operation periods.

## The Role of RTnet and Xenomai

RTnet is an Open Source hard real-time network protocol stack designed for real-time Linux extensions. By patching SOEM to work with RTnet, this library allows developers to bypass the standard Linux network stack's non-deterministic behavior. 

The recommended environment for this library is Ubuntu 20.04 running Linux kernel 5.4.124 with Xenomai 3.1.1. The build system is managed via CMake and specifically looks for Xenomai dependencies to enable real-time capabilities.

## Technical Implementation and Threading

One of the critical aspects of using RTnet SOEM is the management of real-time threads. The library follows a specific execution model to ensure successful initialization and low-latency operation:

- **Initialization**: Functions like `ec_init` or `ec_init_redundant` must be called from the main (non-real-time) thread. Attempting to initialize EtherCAT communication within a real-time thread may lead to failure.
- **Cyclic Communication**: Once initialized, all other communication codes and process data exchanges should be placed within a high-priority real-time thread to ensure deterministic performance.

## Hardware and Configuration

The library has been validated with professional-grade hardware, including Intel I340-T4 NICs and Elmo Gold Whistle slaves. It supports redundant cabling configurations, which is essential for maintaining control in complex robotic systems where a single cable failure could be catastrophic.

To use RTnet with SOEM, users typically need to employ shell scripts to manage the kernel modules. This involves:
1. Loading the `rtpacket` kernel module.
2. Unbinding the NIC from standard non-real-time drivers.
3. Binding the NIC to the RT driver.
4. Configuring the real-time interface using `rtifconfig`.

## Getting Started

The project includes a `red_test` utility as a default build target, which serves as a primary tool for verifying redundant EtherCAT configurations. Users can test their setup by specifying the real-time ethernet interfaces (e.g., `rteth0`, `rteth1`) and the desired cycle time. 

For developers looking for implementation examples, the project references the TOCABI robot's communication code as a real-world template for integrating RTnet SOEM into complex control loops.
