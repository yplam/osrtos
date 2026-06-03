---
title: SOEM W5500 EtherCAT Master for Raspberry Pi
summary: A real-time EtherCAT master implementation for Raspberry Pi using the Wiznet
  W5500 Ethernet chip via SPI. It leverages the Simple Open Source EtherCAT Master
  (SOEM) library and is optimized for hard real-time performance using Xenomai or
  Preempt-RT patched Linux kernels.
slug: soem-w5500-ethercat-master-for-raspberry-pi
codeUrl: https://github.com/thanhtam-h/soem-w5500-rpi
siteUrl: http://www.simplerobot.net/
star: 252
lastUpdated: '2020-06-16'
rtos: xenomai
topics:
- ethercat
- realtime-ethercat-master
- rpi
- soem
- xenomai
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- simple-open-ethercat-master-library-rtnet-version
- real-time-spi-on-xenomai-3
- xenomai-3-for-raspberry-pi-0-1-linux-kernel-4-1-21
- xenomai-3-for-raspberry-pi-2-and-3
- xenomai-3-for-raspberry-pi-4
- xenomai-on-raspberry-pi
---

## Real-time EtherCAT on Raspberry Pi

The soem-w5500-rpi project provides a specialized solution for achieving hard real-time EtherCAT master functionality on the Raspberry Pi platform. While the Raspberry Pi is a powerful single-board computer, its standard onboard Ethernet controller is often unsuitable for high-performance, low-jitter EtherCAT communication due to its internal architecture. This project overcomes those limitations by utilizing the Wiznet W5500 Ethernet chip connected via the SPI interface.

By bypassing the standard networking stack and using a dedicated SPI-based Ethernet controller, this implementation allows for deterministic communication essential for industrial automation and robotics. The project is built upon the Simple Open Source EtherCAT Master (SOEM) and includes a real-time compatible W5500 driver specifically tuned for the Raspberry Pi.

## Technical Architecture

The system relies on a specific combination of hardware and software to ensure real-time performance:

*   **Hardware**: Compatible with all versions of Raspberry Pi (0, 1, 2, 3, and 4) paired with a Wiznet W5500 Ethernet chip.
*   **Kernel**: Requires a patched Linux kernel using either Xenomai (2.x or 3.x) or the Preempt-RT patch set.
*   **EtherCAT Stack**: A patched version of SOEM that supports the real-time OSAL (Operating System Abstraction Layer) required by Xenomai and Preempt-RT.
*   **Driver**: A custom, real-time compatible driver for the W5500 that handles EtherCAT frames over the SPI bus.

## Implementation Details

Because real-time requirements vary significantly between Raspberry Pi hardware revisions and kernel versions, the project is organized into specific branches. Users must select the branch corresponding to their specific setup, such as Raspberry Pi 4 with Preempt-RT or Raspberry Pi 0/1 with Xenomai 2. This ensures that the SPI timings and interrupt handling are correctly configured for the target environment.

The project includes essential tools for bus diagnostics and configuration. For example, the `slaveinfo` utility allows users to scan the EtherCAT bus and retrieve detailed information about connected slaves, including PDO (Process Data Object) mapping:

```bash
# Check information of all slaves on the bus
cd test/slaveInfo/
sudo ./slaveinfo wiz

# Check PDO mapping of all slaves
sudo ./slaveinfo wiz -map
```

## Getting Started

To use this project, developers typically need to prepare their Raspberry Pi with a real-time patched kernel first. Once the environment is ready, the build process involves compiling the OSAL, the hardware abstraction layer (OSHW), the SOEM library itself, and finally the test applications. The provided `build.sh` script automates this sequence, ensuring that dependencies are linked correctly across the different sub-modules of the repository.
