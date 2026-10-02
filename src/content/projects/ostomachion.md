---
title: Ostomachion
summary: Ostomachion is a modular FPGA-based platform integrating a NEORV32 RISC-V
  SoC with the Zephyr RTOS on Xilinx Artix-7 hardware. It features a fully programmatic
  Vivado build flow and a specialized DMA-driven spectral filter pipeline for real-time
  signal processing, complete with a C++20 hardware abstraction layer.
slug: ostomachion
codeUrl: https://github.com/andynicholson/Ostomachion
version: v1.0.0
lastUpdated: '2026-07-19'
licenses:
- NOASSERTION
rtos: zephyr
topics:
- fpga
- neorv32
- rtos
- vhdl
- vivado
- zephyr-rtos
isShow: false
createdAt: '2026-08-06T11:25:04+00:00'
updatedAt: '2026-08-06T11:25:04+00:00'
relatedProjects:
- picorv32-rt-thread-on-lichee-tang-eg4s20
- hbird-e203-rt-thread-on-lichee-tang
- rt-thread-for-picorv32-on-lichee-tang
- wireguard-fpga
- fwrisc-featherweight-risc-v-core
- mos-rtos
---

Ostomachion, named after Archimedes’ ancient dissection puzzle, is a sophisticated embedded platform designed for FPGA-based signal processing. Much like the fourteen geometric pieces of the original puzzle, this project is built from a set of composable, interlocking layers that assemble into a complete, verified FPGA RTOS platform. At its core, it combines the NEORV32 RISC-V SoC with the Zephyr RTOS, targeting the Opal Kelly XEM7310-A200 (Xilinx Artix-7) hardware.

## A Fourteen-Layer Architecture

The project philosophy centers on composability and reproducibility. The architecture is divided into fourteen distinct layers, ranging from the physical Artix-7 FPGA hardware and pin constraints up to a high-level C++20 header-only Hardware Abstraction Layer (HAL). 

Key layers include:
- **NEORV32 RISC-V SoC**: An upstream submodule providing the processor core, on-chip memory, and standard peripherals like GPIO, UART, SPI, and I2C.
- **XBUS to AXI4-Lite Bridge**: A custom RTL path that allows the RISC-V CPU to control IP in the Xilinx fabric via memory-mapped I/O.
- **Programmatic Vivado Build**: Unlike many FPGA projects that rely on hand-edited GUI checkpoints, Ostomachion uses a Tcl-only Vivado block design. This ensures that every bitstream is reproducible from version-controlled text alone using headless batch mode.
- **FrontPanel Host Interface**: Integration with Opal Kelly's FrontPanel SDK for bitstream loading, debugging, and high-speed host I/O.

## The Spectral Filter Pipeline

One of the most impressive features of Ostomachion is its programmable frequency-domain transform pipeline. This hardware accelerator handles a streaming data path consisting of a 4096-point 16-bit forward FFT, a per-bin complex filter, and an inverse FFT. 

A user-programmable mask is applied via a fabric complex multiplier, allowing the system to perform real-time low-pass, high-pass, band-pass, or notch filtering. The data is staged through AXI DMA using TX/RX BRAM, and completion interrupts are aggregated onto the NEORV32 core. This setup allows for arbitrary spectral masks to be synthesized in user-space and executed in hardware with minimal CPU overhead.

## Software Stack and C++20 HAL

On the software side, Ostomachion leverages the Zephyr RTOS for application management and driver orchestration. The project includes out-of-tree Zephyr drivers for NEORV32-specific peripherals and the custom FFT accelerator. 

To provide a modern developer experience, the project implements a C++20 header-only HAL. This layer wraps Zephyr’s C APIs with modern C++ features such as `std::span`, RAII-style device handles, and `[[nodiscard]]` attributes for GPIO, SPI, I2C, and the FFT hardware. This ensures that application logic remains clean and type-safe while interacting with the underlying hardware.

## Live Demonstration and Verification

The platform includes a PyQt6 desktop demonstration that showcases the spectral filter in real-time. By streaming frames to the FPGA over a FrontPanel USB link, the GUI allows users to manipulate filter sliders and immediately see the results in both time and frequency domains. The demo tracks hardware compute time versus host-side processing (using NumPy), providing live statistics on frame rates and numerical agreement.

For verification, the project employs a robust testing suite:
- **GHDL Simulation**: A full peripheral testbench for RTL-level verification.
- **ZTEST**: Integration with Zephyr’s native test framework for firmware validation.
- **Twister**: Automated test execution for different build configurations.

## Getting Started

The project provides a streamlined build process via a comprehensive Makefile. Developers can initialize the environment, build the Zephyr firmware, and synthesize the FPGA bitstream using simple commands:

```bash
source scripts/init_dev_env.sh
make test-zephyr      # Build and run simulation
make fpga-synth       # Synthesize bitstream
make fpga-program     # Load bitstream to hardware
make fpga-fw          # Upload firmware via UART
```

By treating FPGA gates and RTOS threads as a single unified platform, Ostomachion provides a powerful template for high-performance embedded signal processing.
