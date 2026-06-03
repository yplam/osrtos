---
title: FreeRTOS Port for RISC-V
summary: A port of the FreeRTOS real-time operating system to the RISC-V architecture,
  supporting privilege specifications from 1.7 to 1.10. It targets RISC-V processors
  like the Rocket core and provides support for simulation environments such as Spike
  and Verilator.
slug: freertos-port-for-risc-v
codeUrl: https://github.com/illustris/FreeRTOS-RISCV
siteUrl: https://www.freertos.org/
star: 79
lastUpdated: '2019-04-22'
rtos: freertos
topics:
- freertos
- risc-v
isShow: false
createdAt: '2025-12-28'
updatedAt: '2025-12-28'
relatedProjects:
- rt-thread-smart-porting-for-risc-v-qemu-and-k210
- freertos-for-raspberry-pi-3-64-bit
- freertos-port-for-avr-xmega
- freertos-port-for-renesas-rh850
- rt-thread-for-picorv32-on-lichee-tang
- freertos-for-cadence-tensilica-hifi-4-dsp
---

The FreeRTOS-RISCV project represents a significant community effort to bring the FreeRTOS real-time operating system to the RISC-V architecture during its early development phases. While now considered obsolete due to the official integration of RISC-V support into the main FreeRTOS codebase, this codebase served as a crucial bridge for developers working with various iterations of the RISC-V privilege specification.

### Supporting the RISC-V Evolution

One of the primary challenges in the early RISC-V ecosystem was the rapid evolution of the architecture's privilege specifications. This port tracked these changes through multiple versions, including support for:
- Privilege Specification 1.7 (Original contribution by Technolution)
- Privilege Specification 1.9 (Updated by illustris)
- Privilege Specification 1.9.1 (Updated by Abhinaya Agrawal)
- Privilege Specification 1.10 (Updated by sherrbc1)

This iterative development allowed the FreeRTOS scheduler to remain compatible with evolving hardware implementations and simulation tools as the RISC-V standard matured.

### Target Platforms and Testing

The port was designed to run on both physical hardware and simulation environments. It was specifically tested on the Rocket RISC-V processor, utilizing the Core Local Interrupt Controller (CLINT) for preemption. For developers without access to physical silicon, the project provided robust support for:
- **Spike**: The official RISC-V ISA simulator.
- **Verilator**: A high-performance Verilog/SystemVerilog simulator.

Testing included a variety of scenarios ranging from simple single-task builds to complex multi-tasking demos. These demos exercised core FreeRTOS primitives such as queues, semaphores, and mutexes, often running over a dozen concurrent tasks to ensure the stability of the context-switching logic.

### Getting Started with the Demo

A demo project is included in the `Demo/riscv-spike` directory, serving as a template for setting up the FreeRTOS scheduler and defining tasks on a RISC-V target. To build the project, users typically configure their RISC-V toolchain path and use the provided Makefile:

```bash
cd Demo/riscv-spike
export RISCV=/opt/riscv # path to RISC-V tools
make
```

Once compiled, the resulting ELF file can be executed in the Spike simulator to verify the RTOS behavior using `spike riscv-spike.elf`.

### Legacy and Upstream Integration

As the RISC-V ecosystem stabilized, official support was merged into the main FreeRTOS repository. Users looking for the most up-to-date and maintained version of FreeRTOS for RISC-V are encouraged to use the official upstream sources. However, this repository remains a valuable historical reference for understanding the implementation details of RTOS context switching and interrupt management across different RISC-V privilege levels.
