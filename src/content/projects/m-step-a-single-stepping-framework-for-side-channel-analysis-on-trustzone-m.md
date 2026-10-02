---
title: 'M-Step: A Single-Stepping Framework for Side-Channel Analysis on TrustZone-M'
summary: M-Step is a software-based research framework for instruction-level side-channel
  analysis on ARM TrustZone-M microcontrollers, specifically targeting the STM32L5
  series. It enables precise single-stepping of Secure world code from a Non-Secure
  environment to evaluate vulnerabilities such as interrupt latency and cache activity.
  The project integrates with FreeRTOS and MCUboot to provide a complete environment
  for assessing the security of Trusted Firmware-M (TF-M) implementations.
slug: m-step-a-single-stepping-framework-for-side-channel-analysis-on-trustzone-m
codeUrl: https://github.com/M-Step-Framework/m-step
version: usenix-ae-rep-func
lastUpdated: '2026-06-16'
licenses:
- GPL-3.0
rtos: freertos
libraries:
- mcuboot
topics:
- cortex-m
- mcus
- microarchitectural-attacks
- microcontrollers
- security
- side-channel
- trustzone
isShow: false
createdAt: '2026-08-02T06:46:17+00:00'
updatedAt: '2026-08-02T06:46:17+00:00'
relatedProjects:
- cortex-m33-trustzone-experiments-on-qemu-an505
- mtower-trusted-execution-environment
- risc-v-security-analysis-and-attacks
- rtic-scope
- rauk-rtic-analysis-using-klee
- multizone-security-tee-for-risc-v
---

## Precision Side-Channel Analysis for the Secure World

In the world of embedded security, ARM TrustZone-M provides a critical hardware-enforced isolation between Secure and Non-Secure execution environments. However, even with these protections, side-channel vulnerabilities can expose sensitive data. M-Step is a specialized framework designed to probe these boundaries on Cortex-M33 processors, specifically the STM32L5 series. It introduces a software-based single-stepping mechanism that allows researchers to observe the execution of Secure world code at the granularity of individual instructions.

By exploiting the interrupt mechanism inherent in ARM Cortex-M processors, M-Step enables an unprivileged attacker in the Non-Secure world to precisely interrupt and monitor Secure world processes. This capability is essential for identifying and evaluating complex side-channel leaks that might otherwise be hidden by the abstraction layers of a Trusted Execution Environment (TEE).

## Core Mechanism: Single-Stepping via Interrupts

The heart of M-Step is its core algorithm for precise timer-based interrupt injection. Unlike traditional debugging tools that might require hardware debuggers or specific silicon features, M-Step achieves single-stepping purely through software. By carefully timing interrupts, the framework can pause the Secure world execution after every instruction, allowing for a detailed trace of the processor's state and behavior.

This high-resolution control enables a suite of side-channel primitives included in the framework:

*   **Mstp-Nemesis**: Focuses on revealing interrupt latencies, building on the Nemesis research to identify instruction-dependent timing variations.
*   **Mstp-Cache**: Implements Prime+Probe techniques to reveal cache activity and memory access patterns.
*   **Mstp-BUSted**: Analyzes bus contention to detect memory accesses.
*   **Mstp-Zoom**: An architectural plugin designed to amplify interrupt-latency leakage for easier detection.

## Technical Architecture and Integration

M-Step is built to run on the NUCLEO-L552ZE-Q development board. Its architecture is modular, separating the Secure world runtime from the Non-Secure evaluation logic. The Secure world typically runs Trusted Firmware-M (TF-M) along with security-critical libraries like Mbed TLS and the MCUboot bootloader. 

The Non-Secure world can operate as a bare-metal runtime or integrate with an RTOS like FreeRTOS for task management. The framework includes a comprehensive build system managed via Nix, ensuring a reproducible development environment that packages the ARM toolchain, CMake, and specialized analysis tools.

## Visualization and Evaluation Tools

Beyond the execution framework, M-Step provides a robust set of utilities for analyzing the captured data. The `mstp-visualizer` tool converts execution traces into Value Change Dump (VCD) files, which can be opened in GTKWave. This allows researchers to interactively visualize the instruction flow alongside side-channel signals, making it easier to correlate specific instructions with observed leaks.

For those looking to validate the framework's effectiveness, the repository includes end-to-end Proof-of-Concept (PoC) attacks, such as RSA key extraction from Mbed TLS. These evaluations demonstrate how instruction-level granularity can be used to bypass traditional security assumptions in TrustZone-M environments.

## Extending the Framework

M-Step is designed with extensibility in mind. It supports a plugin architecture for both side-channel observations and architectural enhancements. Researchers can add new test configurations or customize M-Step parameters—such as timer base clocks and zero-step detection thresholds—to adapt the framework to different microcontrollers or specific security research goals.
