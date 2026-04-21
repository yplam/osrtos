---
title: Level RISC-V
summary: Level-V is an open-source, 5-stage in-order RISC-V processor core implementing
  the RV32IMC instruction set. Designed for simulation, verification, and SoC experimentation,
  it features a sophisticated memory hierarchy including L1 and L2 caches, a tournament
  branch predictor, and a comprehensive verification suite integrated with tools like
  Verilator and Spike.
slug: level-risc-v
codeUrl: https://github.com/kerimturak/level-v
siteUrl: https://kerimturak.github.io/level-v/
lastUpdated: '2026-04-19'
licenses:
- GPL-3.0
image: /202604/level-v_0.avif
rtos: ''
topics:
- 5-stage-pipelined-processor
- cache
- coremark
- csr
- dhrystone
- embench-iot
- gpio
- gshare
- i2c
- imperas
- risc-v-dv
- riscv
- rtl
- spi
- systemverilog
- uart
- verilator
- vga-controller
- wishbone-bus
- yosys
isShow: true
createdAt: '2026-04-21T05:32:20+00:00'
updatedAt: '2026-04-21T05:32:20+00:00'
---

Level-V is a robust, open-source implementation of a RISC-V processor core designed specifically for developers and researchers who need more than just a minimal "toy" core. Implementing the RV32IMC ISA—covering integer, multiplication, and compressed instruction extensions—it strikes a balance between complexity and accessibility, making it an ideal platform for SoC experiments and architecture research.

### Architecture and Pipeline

The core is built around a classic 5-stage in-order pipeline, but it differentiates itself through a highly capable frontend. It features an align buffer to handle the complexities of RV32C (compressed) instruction decoding and a sophisticated tournament branch predictor. This prediction unit combines GShare and bimodal algorithms with a Branch Target Buffer (BTB) and a Return Address Stack (RAS). For those looking to experiment with memory latency, the fetch path also includes an optional next-line prefetcher to keep the pipeline fed.

### Advanced Memory Hierarchy

One of the standout features of Level-V is its flexible memory system. While many embedded cores rely on simple bus interfaces, Level-V provides a full L1 instruction and data cache hierarchy with Physical Memory Attributes (PMA) support. 

For more advanced configurations, the project includes an optional non-blocking, multi-bank, multi-port L2 cache (`nbmbmp_l2_cache`). This L2 implementation features separate instruction and data pipes, dual-port BRAM arrays, and a Miss Status Holding Register (MSHR) to handle concurrent misses. It utilizes a MESI-style tagging system and a write-back policy toward the Wishbone-compatible system bus.

### Verification-First Design

Verification is not an afterthought in the Level-V ecosystem. The repository is pre-configured with a comprehensive toolchain that integrates several industry-standard verification flows:

*   **Spike Co-simulation:** Real-time commit-trace comparison against the Spike ISA simulator ensures functional correctness.
*   **Standard Test Suites:** Integrated support for `riscv-tests`, `riscv-arch-test`, and Imperas flows.
*   **Advanced Stimulus:** Hooks for `riscv-dv` (constrained random instruction generation) and `riscv-formal` (bounded formal checks).
*   **Observability:** The system generates Spike-style commit traces and Konata-compatible pipeline exports, allowing developers to visualize instruction flow and stalls in high resolution.

### Performance and Tooling

In terms of raw performance, Level-V achieves approximately 2.62 CoreMark/MHz and 1.51 DMIPS/MHz when simulated with Verilator. The project is heavily oriented toward an open-source tool stack, relying on Verilator for fast RTL simulation, Yosys for synthesis and linting, and Python-based tooling for test orchestration and dashboard generation.

Developers can quickly spin up a simulation environment using the provided Makefile. The environment supports building custom bare-metal C tests using the standard RISC-V GCC toolchain, with output viewable via a simulated UART monitor. For those interested in physical implementation, the project also includes assets for the OpenLane ASIC flow, providing a path from RTL to GDS layout.
