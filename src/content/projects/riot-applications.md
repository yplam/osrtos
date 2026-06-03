---
title: RIOT Applications
summary: A collection of specialized applications and development tools for the RIOT
  operating system, featuring a network sniffer and a radio spectrum scanner. These
  applications demonstrate the capabilities of the GNRC network stack and provide
  utilities for debugging and monitoring wireless embedded environments.
codeUrl: https://github.com/RIOT-OS/applications
siteUrl: https://github.com/RIOT-OS/RIOT
isShow: false
rtos: riot
libraries: []
topics:
- riot-os
- riot
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- tinyos-apps-for-msp430f5529
- tinyos-nesc-telosb-programs
- atmega128rfa1-tinyos-kth-wsn-project
- zephyr-lorawan-lora-examples
- building-wireless-sensor-networks-with-openthread
- nuttx-applications
---

The RIOT Applications repository serves as a historical and functional collection of tools designed to extend the capabilities of the RIOT operating system. While many of these applications have recently been integrated directly into the main RIOT codebase as examples, this repository remains a valuable reference for developers looking to understand how to build complex, feature-rich applications on top of the RIOT kernel.

### Specialized Tools for Wireless Development

Two of the primary applications featured in this repository are the **Sniffer** and the **Spectrum Scanner**. These tools are particularly useful for developers working with IEEE 802.15.4 or other low-power wireless protocols.

#### The Sniffer Application
The Sniffer is a powerful utility that turns a RIOT-supported board into a passive network monitor. It leverages the `gnrc` (RIOT's modular network stack) and `netdev` modules to capture packets from the air and forward them over a serial interface. 

To make the captured data useful, the project includes a Python-based tool located in `sniffer/tools/sniffer.py`. This script can read the serial output from the hardware and pipe it into standard network analysis tools like Wireshark, allowing for real-time debugging of wireless traffic. The application uses RIOT modules such as `fmt`, `shell`, and `ztimer64_usec` to manage timing and user interaction.

#### The Spectrum Scanner
For those needing to analyze the physical environment, the Spectrum Scanner provides a way to visualize radio frequency activity. By default, it targets the `samr21-xpro` board, a common platform for IoT development. It continuously polls the radio for RSSI (Received Signal Strength Indicator) values across different channels.

Similar to the sniffer, it includes a companion tool: `plot_rssi.py`. This script takes the raw data from the MCU and generates visual representations of the spectrum, helping developers identify noise, interference, or high-traffic channels in their testing environment.

### Technical Architecture

These applications are built using the standard RIOT build system. They rely heavily on the modular nature of RIOT, where specific features are pulled in via the `USEMODULE` directive in the `Makefile`. For example, the use of `auto_init_gnrc_netif` ensures that network interfaces are automatically initialized upon boot, while `ztimer` provides high-precision timing required for radio operations.

```makefile
# Example module inclusion from the Sniffer Makefile
USEMODULE += gnrc
USEMODULE += netdev_default
USEMODULE += auto_init_gnrc_netif
USEMODULE += shell
USEMODULE += ztimer64_usec
```

### Getting Started

To use these applications, you typically need a local clone of the RIOT base repository. The applications use a `RIOTBASE` environment variable to locate the kernel and build system. You can build and flash an application to a specific board using a single command:

```sh
# Building the sniffer for a SAM R21 board
RIOTBASE="/path/to/RIOT" BOARD=samr21-xpro make -C sniffer flash
```

Because RIOT supports a wide variety of hardware, these applications can often be ported to different boards simply by changing the `BOARD` variable, provided the hardware has the necessary radio peripherals.

### Archival Status

It is important to note that this repository is now primarily maintained for historical documentation. The RIOT community has moved these applications into the [main RIOT repository](https://github.com/RIOT-OS/RIOT/tree/master/examples) to ensure they are always tested against the latest kernel changes. Developers are encouraged to look at the examples directory in the main RIOT repo for the most up-to-date versions of these tools.
