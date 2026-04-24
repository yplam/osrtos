---
title: Tenstorrent System Firmware
summary: Tenstorrent System Firmware is a Zephyr RTOS-based firmware stack designed
  for Tenstorrent AI hardware controllers. It manages the System Management Controller
  (SMC) and Device Management Controller (DMC) for platforms like Blackhole and Grendel,
  providing custom drivers for AI accelerators and supporting secure updates via MCUboot.
slug: tenstorrent-system-firmware
codeUrl: https://github.com/tenstorrent/tt-system-firmware
siteUrl: https://tenstorrent.com
version: v19.9.0
lastUpdated: '2026-04-17'
licenses:
- Apache-2.0
image: /202604/blackhole-p150a-pcb.webp
rtos: zephyr
libraries:
- mcuboot
- nanopb
topics:
- firmware
- tenstorrent
- zephyr
isShow: true
createdAt: '2026-04-24T09:35:16+00:00'
updatedAt: '2026-04-24T09:35:16+00:00'
---

Tenstorrent is a leader in high-performance AI accelerator hardware, and the TT-System-Firmware repository provides the essential software infrastructure for managing these complex systems. Built on the Zephyr RTOS, this firmware stack is designed to be modular, secure, and scalable, catering to the unique requirements of Tenstorrent’s AI ULC (Ultra-Low-Cost) architectures.

The project is structured around two primary controllers: the System Management Controller (SMC) and the Device Management Controller (DMC). This dual-controller architecture allows for a clean separation of concerns, where the SMC typically handles high-level system monitoring and the DMC focuses on device-specific operations and hardware acceleration management.

### Hardware Support and Architecture

The firmware is specifically tailored for Tenstorrent's silicon, including the Blackhole (BH) and Grendel architectures. It supports various board revisions such as the P100A, P150A, and P300A. The repository includes a wide array of custom drivers that interface directly with Tenstorrent's proprietary hardware blocks, such as:

- **Network on Chip (NOC)**: Specialized DMA and clock control drivers for the Blackhole architecture.
- **Virtual Console**: A unique driver that redirects console output to scratch registers, enabling simulation hosts to display firmware logs without traditional UART hardware.
- **JTAG and Debugging**: Comprehensive JTAG support, including bitbang drivers and a JTAG shell for interactive debugging.
- **Mailbox (MBOX)**: Drivers for inter-processor communication between different management cores.

### Integration with the Zephyr Ecosystem

By leveraging the Zephyr RTOS, the project benefits from a standardized build system using the `west` meta-tool. The firmware integrates several key Zephyr-compatible libraries and modules:

- **MCUboot**: Facilitates secure bootloading and firmware updates. The repository includes logic for managing flash slots and triggering ROM updates.
- **Nanopb**: Used for efficient protocol buffer communication, particularly for managing SPI ROM firmware tables.
- **Custom Tenstorrent Libraries**: The `lib/tenstorrent` directory contains specialized modules for binary descriptors (bindesc), boot banners, and hardware-specific ARC processor support.

### Development and Testing Workflow

Tenstorrent emphasizes a rigorous testing environment. The project uses Zephyr’s `twister` framework for running test suites and `ztest` for unit testing. The CI/CD pipeline includes various stages such as hardware "smoke" tests and long-running "soak" tests to ensure stability on physical AI accelerator boards. 

For developers, the repository provides a suite of tooling scripts like `tt-console` and `tt-tracing` which utilize direct TLB access for advanced debugging and monitoring. The use of Zephyr's shell interface across different components further enhances the developer experience, allowing for real-time interaction with the firmware during the development and validation phases of Tenstorrent’s AI hardware lifecycle.
