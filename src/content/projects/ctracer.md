---
title: ctracer
summary: A lightweight C software tracer inspired by ftrace, designed for performance
  analysis and debugging. It leverages GCC instrumentation to capture function calls
  and timestamps, supporting conversion to the Best Trace Format (BTF) for use with
  Eclipse Trace Compass.
codeUrl: https://github.com/claudioscordino/ctracer
isShow: false
rtos: erika-enterprise
libraries: []
topics:
- btf
- erika-enterprise
- gcc
- trace
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- rtic-scope
- rtems-stack-tracer
- zview-zephyr-rtos-runtime-visualizer
- mbed-memtrace-logger
- rauk-rtic-analysis-using-klee
- mcp2518fd-can-fd-logger-for-raspberry-pi-pico
---

### Introduction to ctracer

**ctracer** is a simple yet effective software tracer for C applications. Developed as a preparatory investigation for the [ERIKA Enterprise](http://www.erika-enterprise.com) RTOS, it provides a mechanism to record function execution flow and timing data with minimal overhead. The project draws heavy inspiration from the Linux kernel's `ftrace` mechanism, specifically utilizing compiler-level instrumentation to hook into function entries.

### How It Works

The tracer relies on the GCC `-pg` option, which instructs the compiler to insert calls to a profiling function (traditionally `mcount` or `__fentry__`) at the beginning of every function. `ctracer` provides its own implementation of these hooks, allowing it to intercept execution and log the instruction pointer and a high-resolution timestamp.

To handle the low-level requirements of function interception, the project includes assembly trampolines for both **x86_64** and **AArch64** architectures. These trampolines ensure that the CPU state is preserved while the tracer records the necessary data, making it compatible with modern 64-bit systems.

### Getting Started

Using `ctracer` is straightforward. The build system is managed via a simple Makefile that detects your architecture and applies the necessary flags, such as `-mfentry` on x86_64 systems.

To compile the project, simply run:

```bash
make
```

Running the resulting executable generates a binary trace file:

```bash
./main
```

This produces a file named `trace.dat` containing raw addresses and timestamps. Because raw addresses aren't human-readable, the project provides a Python utility to resolve these addresses into function names using the symbol table of the executable:

```bash
./create_trace.py ./main trace.dat
```

This generates a `trace.txt` file detailing the sequence of function calls.

### Advanced Visualization with BTF

One of the most powerful features of `ctracer` is its support for the **Best Trace Format (BTF)**. By using the `create_trace_btf.py` script, users can convert their raw execution data into a format compatible with [Eclipse Trace Compass](https://www.eclipse.org/tracecompass/). 

This allows developers to move beyond simple text logs and utilize sophisticated graphical tools to visualize call stacks, analyze execution timing, and identify performance bottlenecks in their embedded software.

### Technical Details and Future Goals

The project is currently in a functional prototype stage. The current implementation focuses on function entry points. However, the project roadmap includes several significant enhancements:

*   **Exit Hijacking**: Modifying the trampoline to intercept function returns, allowing for precise measurement of function execution duration.
*   **RTOS Integration**: Porting the core logic to ERIKA Enterprise, a popular OSEK/VDX-certified RTOS for automotive and industrial applications.

By keeping the core logic simple and leveraging standard GCC features, `ctracer` serves as an excellent reference for anyone looking to implement custom software tracing in resource-constrained or real-time environments.
