---
title: RTIC Scope
summary: RTIC Scope is a non-intrusive tracing toolset for RTIC applications running
  on ARMv7-M targets. It leverages hardware-assisted ITM and DWT units to provide
  zero-cost instrumentation and host-side analysis of real-time task execution.
codeUrl: https://github.com/rtic-scope/cargo-rtic-scope
siteUrl: https://rtic-scope.github.io
isShow: false
rtos: rtic
libraries: []
topics:
- cargo-plugin
- cortex-m
- embedded-rust
- rtic
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- rauk-rtic-analysis-using-klee
- zview-zephyr-rtos-runtime-visualizer
- stm32-rtic-project-template
- pico-rtic-template
- b-l475e-iot01a-discovery-board-support-crate
- rttrust-rust-wrapper-for-rt-thread
---

Debugging real-time systems often presents a paradox: the act of observing the system can change its behavior. Traditional logging methods, such as printing over UART, introduce significant latency and CPU overhead that can mask race conditions or cause missed deadlines. **RTIC Scope** solves this by providing a non-intrusive, zero-cost tracing toolset specifically designed for the [RTIC (Real-Time Interrupt-driven Concurrency)](https://rtic.rs) framework.

### Hardware-Assisted Tracing
RTIC Scope exploits the advanced debugging features found in ARMv7-M architectures (such as Cortex-M3, M4, and M7). By utilizing the **Instrumentation Trace Macrocell (ITM)** and **Data Watchpoint and Trace (DWT)** units, the tool can emit trace packets with negligible impact on the target's execution timing. This allows developers to monitor task entry, exit, and resource usage in real-time without the "observer effect" typical of software-based logging.

### The RTIC Scope Ecosystem
The project is structured as a workspace containing several specialized components:

*   **cargo-rtic-scope**: The primary host-side daemon. It acts as the bridge between the hardware probe and the developer's machine, parsing the raw ITM stream into meaningful events.
*   **cortex-m-rtic-trace**: A target-side library and set of procedural macros. These are used to instrument the RTIC application, ensuring that the hardware units are correctly configured to emit the necessary trace data.
*   **rtic-scope-api**: A library that allows developers to build their own frontends or analysis tools on top of the RTIC Scope data stream.
*   **rtic-scope-frontend-dummy**: A reference implementation of a frontend to demonstrate how to consume trace data.

### Technical Architecture
RTIC Scope is deeply integrated with the Rust embedded ecosystem. It uses `probe-rs` for high-performance communication with debug probes (like ST-Link or J-Link) and the `itm` crate for decoding the hardware trace protocol. 

One of the most powerful aspects of RTIC Scope is its ability to understand the structure of the target application. By using `rtic-syntax` to parse the application's source code at compile-time, the tool can map raw hardware addresses and task IDs back to the specific names and functions defined in the Rust code. This metadata is often stored in the `Cargo.toml` of the target project:

```toml
[package.metadata.rtic-scope]
pac_name = "stm32f4"
pac_features = ["stm32f401"]
interrupt_path = "stm32f4::stm32f401::Interrupt"
tpiu_freq = 16000000
tpiu_baud = 115200
```

### Getting Started
To use RTIC Scope, developers typically add the `cortex-m-rtic-trace` dependency to their embedded project and use the provided macros to instrument their RTIC tasks. On the host side, running `cargo rtic-scope` will begin capturing the trace. The tool can output data to various sinks, including file-based logs for offline replay or live streams for real-time visualization.

By providing a clear window into the execution of asynchronous tasks and hardware interrupts, RTIC Scope is an essential tool for developers building high-reliability, real-time systems where timing is everything.
