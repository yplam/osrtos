---
title: μC/CRC for RT-Thread
summary: A port of the uC/CRC utility library to the RT-Thread RTOS, providing comprehensive
  Error Detecting Code (EDC) and Error Correcting Code (ECC) calculation utilities.
  It supports multiple CRC-16 and CRC-32 models along with Hamming code for error
  correction, integrated with the RT-Thread build system.
slug: c-crc-for-rt-thread
codeUrl: https://github.com/mysterywolf/uC-CRC-for-RT-Thread
star: 3
lastUpdated: '2021-11-01'
rtos: rt-thread
topics:
- crc
- rt-thread
- uc-crc
- ucos
- ucos-iii
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- rtt-validator
- c-common-for-rt-thread
- micro-ros-for-rt-thread
- uc-modbus-for-rt-thread
- c-clk-for-rt-thread
- arduino-rt-thread-library
---

μC/CRC for RT-Thread is a specialized port of the Silicon Labs uC/CRC utility library, designed to provide robust Error Detecting Code (EDC) and Error Correcting Code (ECC) capabilities to the RT-Thread ecosystem. This library is essential for embedded applications requiring high data integrity, such as communication protocols, storage systems, and safety-critical firmware.

The package provides a comprehensive set of tools for calculating Cyclic Redundancy Checks (CRC) and Hamming codes. It is structured to be highly configurable, allowing developers to include only the specific algorithms needed for their target hardware, thereby optimizing memory usage in resource-constrained environments.

## Key Features and Algorithms

The library supports a wide array of standard CRC models and error correction techniques:

- **CRC-16 Support**: Includes multiple standard polynomials such as 0x1021 (CCITT), 0x8005 (IBM), and 0x8048.
- **CRC-32 Support**: Standard 32-bit CRC calculation for larger data blocks.
- **Reflected Data Handling**: Ability to handle reflected input and output data, ensuring compatibility with various industry-standard protocol implementations.
- **Hamming Code (ECC)**: Implementation for detecting and correcting single-bit errors in data streams or memory blocks.
- **Flexible API**: Supports both single-call checksum calculations for static buffers and an Open-Write-Close pattern for processing data streams.

## RT-Thread Integration

This port is specifically tailored for the RT-Thread environment. It includes an `SConscript` file, allowing it to be easily added to projects using the RT-Thread build system. A notable dependency is the RT-Thread uCOS-III compatibility layer; the package is designed to automatically initialize this layer, allowing the library to leverage the underlying RTOS features while maintaining the API structure of the original Micrium uC/CRC implementation.

## Configuration and Optimization

Developers can fine-tune the library through the `crc_cfg.h` header file. This configuration allows for:

- Enabling or disabling specific CRC models to minimize flash footprint.
- Toggling external argument checking for increased runtime robustness.
- Enabling optimized assembly-language calculations (where supported by the architecture) to improve performance in time-sensitive operations.

The library uses a model-based approach where CRC parameters—including the polynomial, initial value, reflection settings, and XOR output—are defined in structures like `CRC_MODEL_16` and `CRC_MODEL_32`. This modularity makes it simple to implement custom CRC algorithms beyond the provided defaults.

## Technical Implementation

The API is designed to be intuitive for embedded developers. For instance, calculating a checksum on a data set can be performed with a single function call:

```c
EDC_ERR err;
CPU_INT16U result;

// Calculate a 16-bit CRC using the CCITT 0x1021 model
result = CRC_ChkSumCalc_16Bit(&CRC_ModelCRC16_1021, p_data, data_size, &err);

if (err == EDC_CRC_ERR_NONE) {
    // Process result
}
```

By providing a standardized way to handle error detection and correction, μC/CRC for RT-Thread helps developers build more reliable and resilient embedded systems.
