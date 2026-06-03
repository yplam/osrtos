---
title: MultiZone Security TEE for RISC-V
summary: A hardware-enforced, software-defined Trusted Execution Environment (TEE)
  for RISC-V processors that provides secure separation of multiple execution zones.
  It leverages standard Physical Memory Protection (PMP) units to shield critical
  functionality from untrusted components without requiring hardware redesign.
slug: multizone-security-tee-for-risc-v
codeUrl: https://github.com/hex-five/multizone-sdk
siteUrl: https://hex-five.com/multizone-security-sdk/
star: 87
version: v2.2.8
lastUpdated: '2024-01-24'
rtos: freertos
topics:
- attestation
- container
- digilent-arty-board
- firmware
- fpga
- freertos
- hypervisor
- microkernel
- multizone
- risc-v
- root-of-trust
- secure-boot
- secure-element
- security
- sifive
- tee
- trusted-computing
- trusted-execution-environment
- trustzone
- xilinx
isShow: false
createdAt: '2025-12-31'
updatedAt: '2025-12-31'
relatedProjects:
- multizone-iot-sdk
- mtower-trusted-execution-environment
- cortex-m33-trustzone-experiments-on-qemu-an505
- fwrisc-featherweight-risc-v-core
- sel4-armv8-vmm-manifest
- bpf-ebpf-for-microcontroller-compartmentalization
---

## Overview

MultiZone Security is a Trusted Execution Environment (TEE) specifically designed for RISC-V processors. It provides a quick and safe way to add security and separation to existing designs, effectively retrofitting hardware that lacks native TrustZone-like primitives. Unlike traditional hypervisors, MultiZone is self-contained, policy-driven, and presents an extremely small attack surface, requiring no coding to define security policies.

The SDK enables hardware-enforced separation of multiple equally secure worlds (zones). It is compatible with any 32-bit or 64-bit RISC-V processor that includes a standard Physical Memory Protection (PMP) unit and supports User (U) mode. This makes it a versatile solution for a wide range of RISC-V implementations, from open-source cores like the Hex Five X300 to commercial cores from SiFive and Andes.

## Key Features & Capabilities

MultiZone Security offers a robust set of features for embedded security:

- **Hardware-Enforced Separation**: Supports up to 4 hardware threads (zones) with up to 8 memory-mapped resources per zone (Flash, RAM, I/O, etc.).
- **Flexible Scheduling**: Includes a scheduler that supports preemptive, cooperative, and round-robin modes with configurable tick or tickless operation.
- **Secure Interzone Communication**: Implements a message-based communication system between zones, eliminating the risks associated with shared memory.
- **Interrupt Management**: Built-in support for secure shared Timer, PLIC, CLIC, and CLINT interrupts.
- **Low Overhead**: The runtime is approximately 4KB, written entirely in assembly for formal verifiability, with a CPU overhead of less than 0.01%.
- **Power Management**: Supports CPU deep-sleep suspend modes (WFI) for low-power applications.

## Technical Architecture

The MultiZone TEE acts as a security monitor that manages the transitions between different execution zones. It uses the RISC-V PMP to define the boundaries of each zone, ensuring that code running in one zone cannot access the memory or peripherals of another unless explicitly permitted by the configuration policy.

The SDK provides a C header (`multizone.h`) that defines macros for interacting with the TEE, such as yielding execution, sending/receiving messages, and accessing protected CSRs (Control and Status Registers).

```c
/* Example of Secure Messaging in MultiZone */
#define MZONE_SEND(zone, msg) ({ \
    register uint32_t a0 asm ("a0"); \
    asm volatile ( \
    "mv a1, %2;" \
    "lw a2, 0*4+%1;" \
    "lw a3, 1*4+%1;" \
    "lw a4, 2*4+%1;" \
    "lw a5, 3*4+%1;" \
    "li a0, 2;" mzone : "=r"(a0) : "m"(*(const char (*)[16]) msg), "r"((int)zone) : "a1","a2","a3","a4","a5"); \
    a0; \
})
```

## Hardware Support

The MultiZone SDK supports several popular RISC-V development boards and SoCs:
- **Digilent Arty A7**: Supporting Hex Five X300 and SiFive E21/E31/S51 bitstreams.
- **SiFive HiFive1 Rev B**: Featuring the Freedom E310 SoC.
- **Microchip Icicle Kit**: Featuring the PolarFire SoC.
- **Andes Corvette-F1**: R1.0 FPGA platform.

## Integration with FreeRTOS

To facilitate the migration of legacy applications, the MultiZone SDK includes an optional integration with FreeRTOS. Developers can run a full instance of FreeRTOS within a single protected zone. This allows for a hybrid architecture where real-time tasks are managed by FreeRTOS while the overall system security and isolation are maintained by the MultiZone TEE. The SDK includes an optimized implementation of `vPortSuppressTicksAndSleep()` that takes full advantage of the RISC-V `wfi` instruction for power efficiency.

## Getting Started

The SDK is designed to work on Linux, Windows, and macOS, requiring only Java 1.8 or greater to run the `multizone.jar` configuration tool. The build process is managed via a standard Makefile, which compiles the individual zone applications and merges them into a single secure firmware image using the MultiZone configurator. Detailed instructions for setting up the GNU RISC-V toolchain and OpenOCD are provided in the repository documentation.
