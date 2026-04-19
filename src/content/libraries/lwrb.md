---
title: Lightweight ring buffer manager
slug: lwrb
summary: LwRB is a lightweight, platform-independent C11 library providing a generic
  FIFO ring buffer implementation optimized for embedded systems. It is specifically
  designed to support zero-copy DMA transfers and provides thread and interrupt safety
  for single-reader/single-writer configurations without requiring mutexes on supported
  architectures.
codeUrl: https://github.com/MaJerle/lwrb
siteUrl: http://docs.majerle.eu/projects/lwrb/
star: 1441
version: v3.2.0
lastUpdated: '2026-04-14'
components:
- Storage
platforms:
- ARM Cortex-M
- AVR
- RISC-V
- x86
- x86_64
- POSIX
- Windows
- Linux
licenses:
- MIT
libraryType: Middleware
createdAt: '2025-12-17'
updatedAt: '2026-04-19'
---

### Features


- Written in C11 and fully compatible with size_t for all data size types.

- Implements a generic First-In First-Out (FIFO) ring buffer structure.

- Eliminates dynamic memory allocation by using static or application-provided arrays.

- Utilizes optimized memory copy operations (memcpy) instead of byte-wise loops for data transfer.

- Provides thread-safe operation for single-write/single-read pipes on architectures with atomic size_t access.

- Ensures interrupt-safe usage for single-write/single-read configurations on ARM Cortex-M and similar architectures.

- Supports atomic protection mechanisms for architectures smaller than the size_t width, such as AVR.

- Designed for zero-copy overhead between the buffer and application memory during DMA transfers.

- Includes data peek functionality to preview buffer contents without removing them.

- Supports data skip operations to discard bytes from the read pointer.

- Provides advance operations to manually commit data after writing to the buffer memory.

- Implements an event notification system for buffer state changes.

- Extremely low memory footprint, requiring less than 1kB of non-volatile memory.

- Platform-independent core logic suitable for any CPU architecture with a C compiler.

- Supports fragmented memory blocks for wrap-around handling in DMA operations.

- Released under the permissive and user-friendly MIT license.



### Architecture

LwRB (Lightweight Ring Buffer) is architected as a high-performance FIFO manager that abstracts the complexities of circular buffer management. The core design revolves around a control structure (`lwrb_t`) that maintains read and write indices. Unlike traditional ring buffers that use a "full" flag or reserve one byte to distinguish between empty and full states, LwRB uses the relationship between read and write pointers to calculate available space and data length dynamically.

The library is optimized for performance by utilizing `memcpy` for data movement. When a read or write operation spans the end of the physical memory array, LwRB splits the operation into two contiguous memory copies, maximizing throughput compared to byte-by-byte loops. This architecture is particularly beneficial for DMA-driven systems where the buffer can be treated as two linear segments for zero-copy transfers.

#### Core Components
- **Buffer Controller**: Manages the read/write indices and provides the logic for wrap-around handling.
- **Memory Provider**: A user-defined static or dynamic array that serves as the raw storage for the FIFO.
- **Event System**: An optional notification layer that allows applications to react to buffer events (e.g., data added).

### Use Cases

This library is ideal for:

- **Serial Communication**: Buffering UART/USART data between hardware interrupts and application-level processing tasks.
- **DMA Transfers**: Serving as a bridge for DMA controllers to move data directly into or out of application memory with zero-copy overhead.
- **Inter-Process Communication (IPC)**: Acting as a thread-safe pipe for single-producer/single-consumer patterns in RTOS environments.
- **Sensor Data Logging**: Temporarily storing high-frequency sensor samples before batch processing or transmission.
- **Interrupt-to-Task Streaming**: Safely passing data from high-priority interrupt service routines (ISRs) to background worker threads.
- **Network Stack Buffering**: Managing packet fragments or stream data for TCP/UDP communication on resource-constrained microcontrollers.

### Getting Started

To integrate LwRB, include the `lwrb.h` and `lwrb.c` files in your project. The basic workflow involves declaring an `lwrb_t` instance and a raw memory array, then initializing the buffer using `lwrb_init`. Once initialized, data can be added using `lwrb_write` and retrieved using `lwrb_read`.

```c
/* Initialize buffer with 1024 bytes of storage */
lwrb_t buff;
uint8_t data_arr[1024];
lwrb_init(&buff, data_arr, sizeof(data_arr));

/* Write data to buffer */
lwrb_write(&buff, "Hello World", 11);

/* Read data from buffer */
uint8_t read_data[16];
size_t bytes_read = lwrb_read(&buff, read_data, sizeof(read_data));
```

For advanced usage, such as DMA integration, developers should refer to the `lwrb_get_linear_block_read_address` and `lwrb_get_linear_block_write_address` functions in the [official documentation](http://docs.majerle.eu/projects/lwrb/).
