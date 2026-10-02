---
title: esp32-tinyLLM
summary: A high-performance Rust implementation of a 28.9M-parameter Large Language
  Model optimized for the ESP32-S3 microcontroller. It utilizes 4-bit quantization
  and Per-Layer Embedding techniques to achieve 10.5 tokens per second, significantly
  outperforming the original C implementation.
slug: esp32-tinyllm
codeUrl: https://github.com/Bellman281/esp32-tinyLLM
version: v0.3.0
lastUpdated: '2026-08-20'
licenses:
- Apache-2.0
image: /202609/esp32-tinyLLM_0.avif
rtos: freertos
topics:
- embedded
- esp32
- esp32-s3
- inference-engine
- llm
- quantization
- rust
- rust-crate
- rust-lang
- tinyml
isShow: true
createdAt: '2026-09-17T01:48:40+00:00'
updatedAt: '2026-09-17T01:48:40+00:00'
relatedProjects:
- atome-lm
- picolm
- openrouter-esp-idf-client
- yolov26n-optimized-qat-deployment-on-esp32-p4
- stm32h743zi-rust-playground
- sparkminer
---

Running a Large Language Model (LLM) usually evokes images of massive GPU clusters and high-power consumption. However, esp32-tinyLLM challenges this notion by running a 28.9-million parameter model on an ESP32-S3—a microcontroller that costs roughly $8. By rewriting the inference engine in Rust and employing clever memory management techniques, this project manages to generate text at speeds that exceed the original C implementation it was ported from.

## Fitting 28.9M Parameters into 512KB SRAM

The primary challenge of running an LLM on an ESP32-S3 is the memory constraint. The chip features only 512 KB of SRAM, while the model has nearly 29 million parameters. To bridge this massive gap, the project employs two primary strategies. First, it uses 4-bit quantization for the bulk of the model weights. Second, it utilizes a "Per-Layer Embedding" (PLE) table—a technique inspired by Google's Gemma 3n—where approximately 25 million parameters live in flash-mapped memory rather than RAM. This approach allows the model to write short children's stories at a respectable 10.50 tokens per second.

## The Performance Advantage of Rust

One of the most striking aspects of this project is its performance comparison between C and Rust. Typically, Rust is expected to match C's performance, but in this case, the Rust implementation is 28.2% faster per token on the same hardware. Through careful optimization of the attention mechanism and the feed-forward network (FFN) stages, the Rust engine achieves a wall time of 95.2 ms per token compared to the C reference's 122.0 ms.

For those seeking even more speed, the project includes an experimental `--fast-mspi` flag. By running the memory bus at 120 MHz, the inference speed climbs to 10.89 tokens per second, representing a 32.9% improvement over the C baseline. These benchmarks are not just estimates; they are generated directly from device logs to ensure accuracy.

## Ensuring Mathematical Parity

Speed is meaningless if the model's output deviates from the expected results. To prevent "hallucinating" performance gains through reduced precision or skipped calculations, the project implements a rigorous verification system. Every token emitted by the board is folded into a digest. This digest is then compared against a value recomputed on a host machine. If the firmware diverges by even a single token, the system flags it immediately.

The testing suite is comprehensive, featuring 38 tests across 16 files. These include golden logit comparisons against PyTorch, byte-identical CLI output checks against the compiled C binary, and cross-entropy validation. This ensures that every optimization in the hot path remains bit-exact and mathematically sound.

## Architecture and Portability

The repository is organized into a clean Rust workspace designed for both embedded and host environments:

*   **llm-core**: A `no_std`, platform-agnostic library containing the core model mathematics.
*   **llm-firmware**: The on-device build that leverages the ESP-IDF framework and FreeRTOS to manage hardware-specific tasks and memory mapping.
*   **llm-host**: CLI tools and correctness tests for running the model on a standard PC.
*   **training**: The Python-based pipeline used to train, quantize, and export the model files.

By separating the core logic from the hardware-specific firmware, the project maintains a high degree of portability while still being able to squeeze every bit of performance out of the ESP32-S3's specialized hardware.
