---
title: WallaBMC
summary: A lightweight Baseboard Management Controller (BMC) firmware built on Zephyr
  RTOS for STM32 and RISC-V microcontrollers. It provides essential server management
  features including a Redfish-compliant API, host power control, and a web-based
  administration interface.
slug: wallabmc
codeUrl: https://github.com/tenstorrent/wallabmc
lastUpdated: '2026-04-24'
licenses:
- Apache-2.0
rtos: zephyr
libraries:
- mcuboot
topics:
- baseboard-management-controller
- bmc
- embedded-systems
- firmware
- redfish
- stm32
- tenstorrent
- zephir
- zephyr-rtos
isShow: true
image: /202604/nucleo-f767zi.avif
createdAt: '2026-04-24T09:35:45+00:00'
updatedAt: '2026-04-24T09:35:45+00:00'
---

WallaBMC is a lightweight Baseboard Management Controller (BMC) firmware designed to bring essential server management capabilities to embedded systems. Developed by Tenstorrent, it targets microcontrollers like the STM32 and RISC-V based platforms, offering a streamlined alternative to full-featured, Linux-based BMC solutions. By leveraging the Zephyr RTOS, WallaBMC provides a modular and efficient foundation for monitoring and managing host systems through industry-standard interfaces.

### Core Management Capabilities

At its heart, WallaBMC implements a Redfish-compliant interface, providing a modern, RESTful API for system management. This allows administrators to interact with the hardware using standard tools and scripts. For human operators, the project includes a built-in web interface (HTTP/HTTPS) that facilitates administration without requiring specialized client software. 

One of the primary functions of a BMC is host power control, and WallaBMC handles this by managing power-on and power-off sequences for the host system. It also provides a bridge for host serial consoles, allowing remote access to the host's boot logs and shell via a web terminal or telnet. This is particularly useful for debugging remote hardware where physical access is limited.

### Technical Architecture and Networking

The firmware is built on the Zephyr RTOS framework, which handles hardware abstraction, threading, and networking. WallaBMC supports IPv4 networking with both static IP configuration and DHCP, including mDNS support for easy hostname resolution (defaulting to `wallabmc.local`). 

Security and persistence are handled through integrated Zephyr modules. Secure communication is supported via HTTPS/TLS, and the system uses persistent storage to ensure that configuration settings—such as network parameters and system preferences—survive reboots. The management console is accessible through multiple channels: the physical MCU serial port, the web-based UI, or via WebSockets for programmatic or remote terminal access.

### Hardware Support and Development

WallaBMC currently supports several hardware platforms, demonstrating its portability across different architectures:

*   **SiFive HiFive Premier P550 MCU**: A RISC-V based platform where the BMC interacts with a high-performance host CPU.
*   **STM32 Nucleo F767ZI**: An ARM Cortex-M7 development board used for standalone development or as a reference for STM32 integrations.
*   **QEMU**: Support for `qemu_cortex_m3` allows for continuous integration and testing in virtualized environments.

### Getting Started

The project utilizes Zephyr's `west` meta-tool for workspace management and building. A typical workflow involves initializing a workspace, updating the required Zephyr modules, and building with `sysbuild` to include the bootloader. For example, building for the Nucleo board is performed with:

```bash
west build --sysbuild -b nucleo_f767zi ~/wallabmc
```

Flashing is typically handled via OpenOCD, and the project is designed to work alongside the MCUboot secure bootloader, ensuring that the firmware can be updated safely. Once booted, the system provides visual feedback via a status LED, and the BMC shell becomes available for configuration and monitoring.
