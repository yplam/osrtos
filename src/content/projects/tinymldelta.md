---
title: TinyMLDelta
summary: TinyMLDelta provides a framework for incremental binary model updates on
  TinyML and embedded AI devices, reducing OTA bandwidth by up to 99% through diff
  patching. The project includes a Python-based patch generator and a platform-agnostic
  C runtime that manages atomic A/B model swaps, crash-safe journaling, and compatibility
  guardrails for TensorFlow Lite Micro models.
slug: tinymldelta
codeUrl: https://github.com/felixgalindo/TinyMLDelta
siteUrl: https://medium.com/@felixgalindo91/introducing-tinymldelta-incremental-ml-model-updates-for-tiny-devices-96663edd1991
lastUpdated: '2026-06-29'
licenses:
- NOASSERTION
rtos: zephyr
libraries:
- tensorflow-micro
topics:
- edgeai
- embedded-systems
- tensorflow
- tensorflow-lite
- tinyml
isShow: false
createdAt: '2026-07-18T14:32:12+00:00'
updatedAt: '2026-07-18T14:32:12+00:00'
relatedProjects:
- tensorflow-lite-micro-for-rt-thread
- edgeai-utensor-embedded-rtos-for-arm-processors
- atome-lm
- fashion-mnist-on-esp32-with-tensorflow-lite-micro
- pruning-deep-learning-models-for-arm-cortex-m
- embedmcp-embedded-mcp-server-library
---

Updating machine learning models on edge devices often presents a significant challenge for developers. Shipping a full TensorFlow Lite Micro model—which can range from 20 KB to over 200 KB—over low-bandwidth connections like BLE or LoRaWAN is slow, costly, and energy-intensive. TinyMLDelta solves this by shifting the paradigm from full model re-flashing to incremental binary patches. Instead of replacing the entire file, it generates a tiny diff that mutates the existing model in flash into a new version.

### Efficiency and Reliability

The core value of TinyMLDelta lies in its efficiency. In real-world benchmarks, a weight update for a 67 KB TFLite sensor model produced a patch of just 475 bytes—a 99.3% reduction in bandwidth. This efficiency does not come at the cost of safety. The system employs an atomic A/B slot strategy and crash-safe journaling, ensuring that the device remains functional even if power is lost during the update process. If a patch application is interrupted, the system can recover or fall back to the previous known-good model.

### Guardrails and Compatibility

One of the most innovative features of TinyMLDelta is its built-in guardrail system. Updating a model in an embedded environment is risky because the firmware's interpreter is often compiled with a specific set of operators and a fixed memory arena. TinyMLDelta uses metadata TLVs (Type-Length-Value) to enforce compatibility before a patch is ever applied. It automatically rejects patches if the new model requires more arena memory than the firmware provides, or if there is an ABI mismatch between the model and the linked TensorFlow Lite Micro kernels.

These guardrails cover several critical scenarios:
* **Memory Arena**: Rejects updates if `REQ_ARENA_BYTES` exceeds the firmware's pre-allocated buffer.
* **Operator Sets**: Ensures the linked kernels in the firmware support the model's requirements.
* **I/O Schema**: Optionally validates that the input and output shapes or data types haven't changed in a way that would break the application code.

### System Architecture

The project is split into two main components: **PatchGen** and **TinyMLDelta Core**.

PatchGen is a Python-based tool designed to run in a CI/CD pipeline or on a developer's machine. It performs a byte-level diff between a base model and a target model, applying compression (such as RLE or LZ4) and generating the necessary metadata headers. 

The TinyMLDelta Core is a platform-agnostic C library that resides in the device firmware. It handles the heavy lifting of parsing the patch header, verifying integrity via CRC32 or digital signatures, and executing the diff chunks to transform the inactive flash slot into the new target model. Once the update is verified, a single atomic operation flips the active slot.

### Hardware and Integration

TinyMLDelta currently supports several environments, including a POSIX simulation for testing on macOS and Linux without physical hardware. For real-world deployment, it features a live temperature anomaly demo on the Arduino UNO Q, which utilizes an STM32U585 running Zephyr. The project also provides integration paths for the Edge Impulse SDK, allowing developers to update models exported from the Edge Impulse platform.

While the core is crypto-agnostic, it includes hooks for authenticity verification. Developers can plug in SHA-256 with Ed25519/ECDSA or even SUIT (RFC 9019) compliant verifiers to ensure that only authorized patches are applied to the fleet.

### Wire Format and Extensibility

The patch format is designed to be lightweight and extensible. The header includes digests for both the base and target models to ensure the patch is applied to the correct version. 

```c
typedef struct __attribute__((packed)) {
    uint8_t  v;               // format version
    uint8_t  algo;            // 0=NONE, 1=CRC32, 2=SHA256, 3=CMAC
    uint16_t chunks_n;        // number of diff chunks
    uint32_t base_len;        // expected base model size
    uint32_t target_len;      // expected target model size
    uint8_t  base_chk[32];    // integrity digest of base
    uint8_t  target_chk[32];  // integrity digest of target
    uint16_t meta_len;        // bytes of metadata TLVs that follow
    uint16_t flags;
} tmd_hdr_t;
```

With support for multiple compression backends and a roadmap that includes Zephyr RTOS and ESP32 ports, TinyMLDelta is a robust solution for developers looking to maintain and improve TinyML models in the field without the overhead of traditional firmware updates.
