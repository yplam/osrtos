---
title: 'BPU v2.9b-r1: Batch Processing Unit'
summary: A specialized embedded scheduling core designed to maintain stable outgoing
  data pipelines on microcontrollers like the ESP32. It manages transmission through
  budget-based degradation and backpressure handling, ensuring critical telemetry
  is preserved during bandwidth saturation.
slug: bpu-v2-9b-r1-batch-processing-unit
codeUrl: https://github.com/choihimchan/bpu_v2_9b_r1
star: 16
version: v2.9b-r1
lastUpdated: '2026-02-02'
rtos: freertos
topics:
- backpressure
- embedded
- esp32
- scheduler
- telemetry
- uart
isShow: false
createdAt: '2026-03-15'
updatedAt: '2026-03-15'
---

BPU (Batch Processing Unit) is a specialized scheduling core designed for embedded systems where data output pipelines must remain stable even under significant resource pressure. Unlike general-purpose RTOS schedulers, BPU focuses specifically on the runtime behavior of data streams, providing mechanisms for backpressure handling, budget-based degradation, and observable recovery.

### Managing Pipeline Pressure

In many embedded applications, such as telemetry systems or sensor aggregation nodes, the rate of data production can occasionally exceed the available transmission bandwidth. BPU addresses this by implementing two primary control mechanisms:

1. **Budget Pressure**: Limits the number of bytes processed per tick to prevent CPU or bus saturation.
2. **TX Backpressure**: Monitors the state of hardware buffers (like UART TX) and pauses or requeues jobs when the hardware is not ready to accept more data.

### Intelligent Data Degradation

One of the standout features of BPU is its ability to handle data priority through budget-based degradation. When the transmission budget is insufficient, BPU can be configured to drop low-priority data (such as non-critical telemetry) while requeueing high-priority commands. It also supports **coalescing**, which ensures that only the most recent instance of a specific event type is kept in the queue, preventing stale data from clogging the pipeline.

### Observability and Diagnostics

BPU is built with observability in mind. It maintains explicit counters for various runtime signals, allowing developers to interpret exactly why data might be dropping or delaying. Key statistics include:

- `skipB`: Frames skipped due to budget limits.
- `skipTX`: Frames skipped due to hardware buffer saturation.
- `degrade_drop`: Intentional drops of low-priority data.
- `work_us`: Timing statistics for the scheduling tick to monitor CPU load.

### Hardware and Framework Support

The current version (v2.9b-r1) includes a dual-UART demo specifically for the ESP32-WROOM. It demonstrates a high-speed binary stream (921600 baud) using COBS encoding and CRC16 for frame integrity, alongside a human-readable log stream. While the demo is provided as an Arduino sketch, the repository also contains a standalone C implementation (`bpu_espidf.c`) suitable for integration into ESP-IDF projects or other C-based embedded environments.

### Frame Format and Integrity

BPU uses a robust framing format to ensure data integrity over serial links. The protocol follows a specific structure:

`0x00 Delimiter + COBS( [0xB2, type, seq, len, payload..., crc16] )`

This combination of COBS (Consistent Overhead Byte Stuffing) and CRC16 ensures that frames are easily synchronized and validated by the receiving end, even in noisy environments or during high-speed transmission. This makes it an ideal choice for MCU telemetry pipelines and sensor aggregation under bandwidth limits.
