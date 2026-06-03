---
title: openMMC
summary: An open-source modular IPM Controller firmware based on FreeRTOS, designed
  for MicroTCA and AdvancedTCA systems. It provides a robust framework for managing
  AMC FMC Carrier (AFC) boards, featuring IPMI command support, sensor monitoring,
  and flexible hardware configuration.
slug: openmmc
codeUrl: https://github.com/lnls-dig/openMMC
siteUrl: https://lnls-dig.github.io/openMMC
star: 44
version: v1.6.2
lastUpdated: '2025-05-27'
rtos: freertos
topics:
- cmake
- cortex-m3
- freertos
- ipmi
- mtca
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- wallabmc
- esp-open-rtos
- eez-bench-box-3-bb3-modular-power-supply-platform
- arm-control-framework-acorns-rover
- stm32f107-makefile-freertos-template
- stm32l475-freertos-iot-project
---

openMMC is a modular, open-source firmware implementation for Intelligent Platform Management Controllers (IPMC). Developed primarily for the AMC FMC Carrier (AFC) boards used in MicroTCA systems, it provides the essential management layer required for high-availability hardware in research and industrial environments.

At its core, openMMC leverages FreeRTOS to manage the concurrent tasks required for system management. These tasks include monitoring environmental sensors (voltage, temperature), managing power-up sequences, and communicating with a Shelf Manager or MicroTCA Carrier Hub (MCH) via the Intelligent Platform Management Interface (IPMI) protocol. The use of an RTOS ensures that time-critical management tasks are handled with the necessary determinism required for hardware protection and system health monitoring.

### Hardware and Platform Support

The project is highly tailored for the AFC series of boards, specifically versions 3.1 and 4.0. It supports various Rear Transition Modules (RTMs) like the 8sfp and lamp modules. The firmware is typically deployed on NXP LPC microcontrollers (such as the LPC1764), utilizing the LPCOpen library for low-level hardware abstraction. The build system is designed to be flexible, allowing developers to specify board versions and RTM types at compile-time using CMake flags.

### Key Features and IPMI Integration

Beyond standard IPMI compliance, openMMC introduces several custom commands that enhance the observability and control of the controller:

- **Memory Monitoring**: Users can query the free heap memory of the MMC via raw IPMI commands, which is crucial for ensuring long-term stability in embedded systems.
- **Version Tracking**: The firmware supports reading the Git commit hash directly through IPMI, allowing operators to verify exactly which version of the firmware is running on a specific slot in a crate without physical access.
- **Dynamic Clock Configuration**: Recent updates have moved clock switch configurations from hardcoded values to dynamic IPMI-based settings. This allows for flexible routing of clock signals on AFC boards (using chips like the ADN4604 or IDT 8V54816) without requiring a firmware recompile.

### Development and Deployment

The project utilizes a modern CMake-based build system, which simplifies the process of targeting different board versions and debug configurations. Developers can choose between several programming methods depending on their hardware setup:

- **JTAG/SWD**: Using OpenOCD with CMSIS-DAP, J-Link, or Digilent JTAG probes.
- **Network-based Updates**: Support for HPM (Hardware Platform Management) upgrades via `ipmitool` or `hpm-downloader`, enabling remote firmware updates over the MicroTCA backplane.
- **Serial Programming**: For newer AFCv4 hardware, the `nxpprog` utility allows for programming via a serial port using the NXP ISP protocol.

Debugging is well-supported through GDB integration with OpenOCD, providing a standard workflow for inspecting program flow and memory on the target microcontroller. The project also includes scripts for generating clock configurations and handling binary conversions for HPM updates.

### Modular Design

The repository is structured to separate the core IPMI logic from the board-specific porting layers. This modularity makes it possible to adapt openMMC to other hardware platforms beyond the AFC series, provided they follow the IPMI architectural requirements. By providing a transparent and extensible codebase, openMMC serves as a vital tool for the scientific community and developers working with modular electronics standards like MicroTCA.4.
