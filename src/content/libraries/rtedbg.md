---
title: RTEdbg
summary: RTEdbg is a lightweight, minimally intrusive binary data logging and tracing
  toolkit designed for real-time embedded systems. It enables high-speed instrumentation
  by logging raw binary data to a RAM buffer for offline or live decoding on a host
  machine, supporting complex data structures and timing analysis without halting
  execution.
slug: rtedbg-rtedbg
codeUrl: https://github.com/RTEdbg/RTEdbg
star: 122
version: v1.02.00
lastUpdated: '2026-02-16'
licenses:
- MIT
libraryType: Tracing
createdAt: '2026-01-05'
updatedAt: '2026-03-01'
---

### Features


- Minimally intrusive code instrumentation with execution overhead as low as 35 CPU cycles on Cortex-M4 devices.

- Raw binary data logging to RAM buffers (linear or circular) to minimize bandwidth and storage requirements.

- Host-side decoding using printf-style format strings stored exclusively on the host to save target memory.

- Support for exporting logged data to Value Change Dump (VCD) format for visualization in waveform viewers like GTKWave.

- Flexible data filtering using a 32-bit message filter to enable or disable logging groups on the fly.

- Reentrant logging functions that do not require disabling interrupts on cores supporting atomic operations.

- Capability to log complex data types, including bit fields, packed structures, and full core dumps.

- Automated generation of statistical reports for decoded values, including minimum, maximum, and timing intervals.

- Integration support for major RTOSs like FreeRTOS with preconfigured trace macros and demo projects.

- Data transfer utilities (RTEgetData) for retrieving logs via GDB server or serial COM ports while the target is running.

- Low stack requirements, typically requiring only 4 to 8 bytes of stack space per logging call.

- Support for NMI and fatal exception handlers for post-mortem debugging and core dump analysis.

- Multi-file output sorting, allowing specific message types to be directed to dedicated log files for easier analysis.

- Inline function versions for time-critical sections to further reduce execution latency at the cost of code size.

- Standardized 24-byte header for the data logging structure containing buffer indices, filter values, and configuration.



RTEdbg follows a decoupled architecture consisting of a target-side library and host-side utilities. The target library (RTElib) manages a structured data block in RAM, which includes a 24-byte header and a configurable buffer. Logging macros capture raw binary data and a format ID, appending them with a high-resolution timestamp. This "raw" approach shifts the heavy processing—such as string formatting and floating-point manipulation—to the host computer.

The host-side component (RTEmsg) parses the binary stream using format definition files, which are standard C headers. Data transfer is handled by intermediate tools like RTEgetData, which interface with debug probes via GDB server or serial ports. This separation ensures the embedded target remains responsive and maintains deterministic real-time behavior, even when generating a high volume of trace data.

#### Core Components
*   **RTElib**: The core instrumentation library providing reentrant logging functions for the embedded target.
*   **RTEmsg**: The host-side decoder that converts binary logs into human-readable text, CSV, or VCD formats.
*   **RTEgetData**: A utility for extracting RAM buffer contents via GDB or serial interfaces.
*   **Message Filter**: A 32-bit runtime mechanism for selective logging of user-defined event groups.

### Use Cases
This library is ideal for:
- **Real-Time Performance Optimization**: Identifying bottlenecks and performing timing analysis in hard real-time control systems without halting the CPU or altering timing significantly.
- **Post-Mortem Debugging**: Capturing CPU registers and stack state during fatal exceptions like HardFault or NMI for offline core dump analysis.
- **Long-Term Stability Testing**: Monitoring system behavior over extended periods by logging to a circular buffer and exporting data to CSV for automated regression analysis.
- **Protocol Analysis**: Debugging complex communication stacks by logging raw packets and decoding them on the host to understand environmental influences.

### Getting Started
Developers can start by downloading the full toolkit from the [RTEdbg Releases](https://github.com/RTEdbg/RTEdbg/releases) page, which includes the library, host tools, and documentation. The [RTEdbg Manual](https://github.com/RTEdbg/RTEdbg/releases/download/Documentation/RTEdbg.library.and.tools.manual.pdf) provides a comprehensive "Getting Started Guide" and detailed integration instructions for various IDEs like STM32CubeIDE, Keil MDK, and IAR EWARM. For a quick implementation reference, the [FreeRTOS trace demo](https://github.com/RTEdbg/FreeRTOS-trace-demo) illustrates how to integrate the library into an RTOS-based project and export data to VCD files for graphical analysis.
