---
title: mbed-memtrace-logger
summary: A Python-based utility for analyzing and logging heap memory trace output
  from mbed-os. It provides a readable visualization of heap allocation, deallocation,
  and fragmentation, specifically optimized for micro:bit and Calliope mini platforms.
slug: mbed-memtrace-logger
codeUrl: https://github.com/thinkberg/mbed-memtrace-logger
star: 1
lastUpdated: '2019-01-20'
rtos: mbed-os
topics:
- log
- mbed-os
- memory
- tracer
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- rtems-stack-tracer
- espfetch
- mcp2518fd-can-fd-logger-for-raspberry-pi-pico
- zview-zephyr-rtos-runtime-visualizer
- contikipy
- nxscli
---

The `mbed-memtrace-logger` is a specialized tool designed to simplify the process of debugging memory issues in mbed-os projects. While mbed-os provides a built-in `memtrace` feature, the raw output can be difficult to interpret during active development. This project provides a Python script that captures serial output and transforms it into a human-readable format, complete with color-coded logs and a visual map of the heap.

## Visualizing the Heap

One of the standout features of this tool is its ability to generate a visual representation of heap allocation. Using a character-based map, it distinguishes between different parts of the memory space to help developers understand how their application is utilizing available RAM:

- `%`: Represents memory headers
- `*`: Represents allocated data blocks
- `.`: Represents free memory blocks

This visualization makes it easy to spot fragmentation issues or identify large blocks of memory that are unexpectedly occupied, which is often the first step in solving memory leaks or stack-heap collisions.

## Integration with micro:bit and Calliope mini

The script is particularly tailored for the BBC micro:bit and the Calliope mini. To use it effectively, developers need to enable heap debugging in their project configuration. For projects using the `microbit-dal`, the following configuration is required in the project's JSON settings:

```json
{
	"microbit-dal": {
		"debug": 1,
		"heap_debug": 1,
		"panic_on_heap_full": 1
	}
}
```

## Real-time Memory Tracking

When running, the script monitors the serial port at a specified baud rate. It automatically detects heap resets and begins tracking every `malloc` and `free` operation. The log output provides a detailed audit trail including:

- **Allocation tracking**: Shows the specific memory address, the size of the change, and the remaining free memory after the operation.
- **Error detection**: Highlights failed `malloc` attempts and issues warnings for invalid `free` calls (such as `free(0x0)`).
- **Free block summary**: Lists available contiguous memory blocks. This is crucial for diagnosing "Out of Memory" (OOM) errors where the total free memory might be sufficient, but no single contiguous block is large enough to satisfy a new allocation request.

## Technical Implementation

The project consists of two main Python components. `memtrace.py` acts as the terminal interface, utilizing `pyserial` and `miniterm` to handle the serial communication. The core logic of parsing and formatting is handled by `memtrace_calliope_trns.py`, which implements a custom `Transform` class. This transformer uses regular expressions to identify mbed-os memory debug strings and converts them into the formatted, colorized output seen in the terminal. This architecture allows the tool to be easily adapted for other mbed-os based platforms beyond the micro:bit.
