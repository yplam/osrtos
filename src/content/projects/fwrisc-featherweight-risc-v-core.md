---
title: 'FWRISC: Featherweight RISC-V Core'
summary: A resource-efficient RISC-V implementation of the RV32IMC instruction set
  designed for FPGA-based IoT applications. It features built-in Data Execution Prevention
  (DEP) for enhanced security and provides native support for the Zephyr RTOS.
slug: fwrisc-featherweight-risc-v-core
codeUrl: https://github.com/Featherweight-IP/fwrisc
star: 53
version: v1.0.0
lastUpdated: '2022-01-17'
rtos: zephyr
topics:
- risc-v
- verilog
- zephyr
isShow: false
createdAt: '2025-12-29'
updatedAt: '2025-12-29'
relatedProjects:
- fazyrv-a-scalable-risc-v-core
- rt-thread-for-picorv32-on-lichee-tang
- level-risc-v
- freertos-port-for-risc-v
- picorv32-rt-thread-on-lichee-tang-eg4s20
- hbird-e203-rt-thread-on-lichee-tang
---

FWRISC is a lightweight RISC-V processor core designed with a focus on balancing FPGA resource utilization and performance. Specifically targeting IoT applications, the FWRISC-S variant implements the RV32IMC instruction set, providing a robust foundation for embedded systems that require a compact yet capable processing unit.

The core was originally developed for the 2019 RISC-V soft-CPU core contest, emphasizing security features appropriate for the IoT landscape. As a non-pipelined processor, it prioritizes simplicity and low resource consumption, making it an ideal candidate for integration into resource-constrained FPGA environments.

### Core Architecture and Performance

FWRISC supports the standard integer instructions, registers, Control and Status Registers (CSRs), and exceptions required by the RISC-V specification. Its implementation of the RV32IMC ISA includes:
- Multi-cycle shift, multiply, and divide operations.
- Support for compressed instructions (C extension) to reduce code size.
- Performance counters (MINSTR, MCYCLE).
- Support for address-alignment exceptions and standard ECALL/EBREAK/ERET instructions.

In terms of performance, the core achieves 0.15 DMIPS/MHz. While modest compared to high-performance pipelined designs, this trade-off allows for significant resource savings. For instance, on a Microsemi IGLOO2 target, the bare core consumes approximately 2,592 LUTs and operates at frequencies around 36.6 MHz.

### Security Features

A standout feature of FWRISC-S is its implementation of Data Execution Prevention (DEP). This security mechanism is designed to prevent arbitrary code execution, a critical requirement for IoT devices that often run fixed firmware. By using linker symbols and configuring specific CSRs just after the kernel boots, the system can restrict execution to only the designated text sections of the memory image.

### Zephyr RTOS Support

FWRISC is fully compatible with the Zephyr RTOS, a popular choice for modern IoT development. The repository includes specific SoC-support configurations for Zephyr, allowing developers to leverage a mature ecosystem of drivers and middleware. The integration is designed to work seamlessly with the core's DEP features, ensuring that security is baked into the system from the boot process onward.

### Verification and Tooling

The project maintains high standards for correctness, passing all RISC-V RV32I compliance tests. The verification environment is comprehensive, utilizing tools like Icarus Verilog and Verilator for simulation. The build system is managed via `ivpm` and Python-based scripts, supporting a modern CI/CD workflow that ensures the core remains stable across updates. For developers looking to integrate FWRISC into their own designs, the repository provides detailed documentation covering tools, setup, verification, and the specific Zephyr port.
