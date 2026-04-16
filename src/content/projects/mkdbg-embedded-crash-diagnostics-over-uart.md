---
title: 'mkdbg: Embedded Crash Diagnostics over UART'
summary: mkdbg is a diagnostic and debugging CLI tool for embedded firmware that provides
  crash analysis and GDB bridging over UART without the need for a debug probe. It
  supports Cortex-M and RISC-V architectures and integrates with RTOS environments
  like FreeRTOS for backtrace generation and register decoding.
slug: mkdbg-embedded-crash-diagnostics-over-uart
codeUrl: https://github.com/JialongWang1201/mkdbg
version: latest
lastUpdated: '2026-04-09'
licenses:
- MIT
rtos: freertos
topics:
- bringup
- cortex-m
- crash-forensics
- embedded-debugging
- fault-telemetry
- firmware
- freertos
- mpu
- postmortem-analysis
- stm32
- stm32f446
- uart-debugging
isShow: false
createdAt: '2026-04-16T03:48:03+00:00'
updatedAt: '2026-04-16T03:48:03+00:00'
---

## Debugging Without a Probe

Embedded developers often face a common nightmare: a device crashes in the field, or on a long-term soak test at 3 AM, and there is no J-Link or ST-Link attached to capture the state. Traditional debugging requires expensive probes and complex setups like OpenOCD or GDB. `mkdbg` changes this dynamic by providing a lightweight, probe-free diagnostic solution that works over the serial connection you likely already have for logging.

At its core, `mkdbg` is a two-part system. The first part is a compact firmware agent—roughly 300 lines of C99 code—that you link into your firmware. When the MCU encounters a fault (like a HardFault or a stack overflow), the agent halts the CPU and streams the crash state over UART. The second part is a high-performance host CLI that reads this data, decodes the registers and fault status registers (FSR), and generates a human-readable report in under a second.

## Key Capabilities

Beyond simple crash reporting, `mkdbg` offers a suite of tools designed to make firmware debugging more accessible:

*   **Crash Analysis**: The `attach` command provides an immediate report containing the fault type, register values, and a heuristic backtrace to identify the "likely culprit" in your source code.
*   **Interactive Debugging**: Using the `debug` command, you can transform your UART connection into a live debugger. It supports breakpoints, watchpoints, register inspection, and stepping, even providing FreeRTOS task names to help navigate complex multi-threaded environments.
*   **Causal Analysis**: Through the `seam` submodule, the tool can analyze event rings to establish a causal chain—essentially showing you the sequence of events that led up to the crash.
*   **GDB Bridge**: The `wire-host` utility acts as a TCP-to-UART bridge, allowing standard tools like `arm-none-eabi-gdb` to connect to your target as if a hardware probe were present.

## Cross-Platform and RTOS Agnostic

One of the strongest features of `mkdbg` is its portability. The firmware agent is written in standard C99 with no OS dependencies, making it compatible with FreeRTOS, Zephyr, or even bare-metal projects. While it is board-agnostic, it includes specific support for Cortex-M and RISC-V 32-bit architectures out of the box.

Integrating the tool is straightforward. You only need to implement two HAL-level functions for UART transmission and reception and call the fault handler hook:

```c
// In your HardFault_Handler:
wire_on_fault(); // Halts CPU and sends crash state

// In your UART driver:
void wire_uart_send(const uint8_t *buf, size_t len) { /* Your HAL implementation */ }
void wire_uart_recv(uint8_t *buf, size_t len)       { /* Your HAL implementation */ }
```

## Architecture and Tools

The project leverages several specialized internal libraries to handle its tasks. The `wire` library manages the communication protocol between the host and the embedded target, while `seam` handles the analysis of telemetry data. For the user interface, it utilizes `termbox2` to provide a clean terminal UI (TUI) via the `mkdbg dashboard` command, which displays live probe status, build information, and the current git state. This integration with version control (via `libgit2`) ensures that the crash reports are always contextualized against the specific build and source code version running on the device.
