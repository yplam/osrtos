---
title: Rauk - RTIC Analysis Using KLEE
summary: Rauk is a measurement-based Worst-Case Execution Time (WCET) analysis tool
  for RTIC applications targeting ARM Cortex-M microcontrollers. It utilizes the KLEE
  symbolic execution engine to automatically generate test vectors that ensure full
  path coverage of user tasks for hardware-in-the-loop timing measurements.
slug: rauk-rtic-analysis-using-klee
codeUrl: https://github.com/markhakansson/rauk
star: 3
lastUpdated: '2021-09-13'
rtos: rtic
topics:
- analysis
- cli
- cortex-m
- rtic
- rust
- testing
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- rtic-scope
- tock-test-harness
- mkdbg-embedded-crash-diagnostics-over-uart
- stm32-rtic-project-template
- unicorn-emulator-for-apache-nuttx-on-avaota-a1-arm64-sbc
- pico-rtic-template
---

Rauk is a specialized tool designed to bring automated Worst-Case Execution Time (WCET) analysis to the [RTIC](https://rtic.rs) (Real-Time Interrupt-driven Concurrency) framework. Named after the column-like rock formations found in Scandinavia, Rauk provides a bridge between symbolic execution and physical hardware measurements to help developers understand the timing behavior of their embedded Rust applications.

## The Challenge of WCET Analysis

Determining the Worst-Case Execution Time of a task is critical for real-time systems to ensure that all deadlines are met. However, manually creating test cases that trigger the longest possible execution path is difficult and error-prone. Rauk addresses this by automating the generation of test vectors and executing them on actual ARM Cortex-M hardware.

## How Rauk Works

The analysis process follows a sophisticated multi-step workflow that combines host-side symbolic execution with target-side measurement:

1.  **Test Harness Generation**: Rauk creates a test harness based on the RTIC application. It identifies task resources and hardware inputs to be treated symbolically.
2.  **Symbolic Execution with KLEE**: Using the [KLEE](https://github.com/klee/klee) symbolic execution engine on the LLVM IR of the application, Rauk explores all possible execution paths. This results in a set of test vectors designed to reach every part of the user task.
3.  **Replay and Measurement**: Rauk generates a replay harness where task entry points, exit points, and resource locks are instrumented with breakpoints. The tool then flashes this harness to the target microcontroller.
4.  **Hardware-in-the-Loop Tracing**: By running the generated test vectors on the real hardware, Rauk measures the actual cycle counts at each breakpoint. This produces a timing trace for each vector, allowing developers to identify the true worst-case path.

## Key Features

*   **Automatic Test Vector Generation**: Leverages KLEE to ensure that all logical paths within an RTIC task are exercised.
*   **Real Hardware Measurement**: Unlike pure simulators, Rauk runs code on actual ARM Cortex-M silicon to capture real-world timing characteristics.
*   **RTIC Integration**: Specifically designed to understand RTIC's task and resource model, supporting `cortex-m-rtic` version 0.6.*.
*   **Response-Time Analysis Support**: The output traces can be used as input for broader schedulability and response-time analysis of the entire system.

## Getting Started

To use Rauk, developers mark the tasks they wish to analyze with a specific attribute. The project requires a Rust environment (1.51.0+), KLEE v2.2+, and a compatible ARM Cortex-M microcontroller.

```rust
#[rauk] // Mark task for analysis
#[task(...)]
fn my_task(_: task::Context) {
    // Task logic here
}
```

The workflow is managed through a simple CLI interface:

*   `rauk generate`: Builds the test harness and generates vectors using KLEE.
*   `rauk flash`: Builds the replay harness and flashes it to the target chip.
*   `rauk measure`: Executes the measurement phase to collect cycle counts.

## Technical Considerations

While Rauk provides powerful automation, it is currently in early development. Users should be aware that the measurement process introduces some overhead, and the tool currently focuses on simple resources like primitives and peripherals. It is best suited for applications with smaller tasks where precise timing of logical paths is required for safety or performance guarantees.
