---
title: arm-dwt-c-library
summary: A C implementation of the one-dimensional Discrete Wavelet Transform (DWT)
  specifically designed for ARM Cortex-M microcontrollers. It leverages the CMSIS
  library for signal processing and provides an embedded alternative to the popular
  PyWavelets library with support for multiple decomposition levels.
codeUrl: https://github.com/etiennedemontalivet/arm-dwt-c-library
isShow: false
rtos: cmsis
libraries: []
topics:
- dwt
- cmsis
- arm
- library
- c
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- arm-cortex-m-hilbert-transform
- keras-to-cmsis-nn-converter
- pico-fft-fft-library-for-raspberry-pi-pico
- qfplib-m0-tiny
- arduino-cmsis-module
- cmsis-for-stm32-development
---

Digital Signal Processing (DSP) on the edge often requires sophisticated mathematical transforms to extract features from raw sensor data. While the Fast Fourier Transform (FFT) is a staple in the embedded world, the Discrete Wavelet Transform (DWT) offers distinct advantages for non-stationary signals by providing both time and frequency localization. The **arm-dwt-c-library** is a dedicated C implementation of the 1D DWT, built to run efficiently on ARM-based hardware.

### Bridging the Gap Between Python and Embedded C
One of the primary inspirations for this library is [PyWavelets](https://pywavelets.readthedocs.io/en/latest/), the standard-bearer for wavelet transforms in the Python ecosystem. Developers often prototype signal processing pipelines in Python and then face the daunting task of porting those algorithms to C for deployment on microcontrollers. This library aims to simplify that transition by providing a similar functional interface and ensuring output consistency. In fact, testing on an STM32H7 (Cortex-M7) has demonstrated that the library's output matches PyWavelets with a relative error of only 1e-4.

### Technical Implementation
The library is built on top of the **CMSIS library**, which is the industry standard for hardware abstraction and DSP optimization on ARM Cortex-M processors. While the current implementation prioritizes code readability and maintainability, it is designed to be easily integrated into existing ARM-based projects. 

Key features include:
- **Decomposition Levels**: Support for multi-level decomposition, configurable via the `ARM_DWT_MAX_DEC_LEVEL` definition.
- **Padding Modes**: Currently supports zero padding and symmetrical padding, which are essential for handling signal boundaries.
- **Float32 Support**: Uses 32-bit floating-point precision for high-accuracy signal analysis.

### Getting Started
Integration is straightforward as the project does not rely on complex build systems or target-specific Makefiles. To use it, you simply need to add `arm_dwt_f32.h` and `arm_dwt_f32.c` to your source tree and link against the CMSIS library appropriate for your specific Cortex-M core.

The basic workflow involves initializing the transform and then executing it on your data buffer:

```c
// Initialize the DWT structure with desired parameters
arm_dwt_init_f32(&dwt_instance, ...);

// Perform the Discrete Wavelet Transform
arm_dwt_f32(&dwt_instance, input_buffer, output_buffer);
```

### Hardware Support and Performance
The library has been validated on high-performance embedded hardware like the STM32H7. Because it utilizes CMSIS, it is compatible with a wide range of ARM Cortex-M devices. While the current version focuses on correctness and readability, future updates are planned to explore optimizations using `arm_conv_f32` to further reduce execution time in resource-constrained environments.

### Roadmap
The project is actively evolving, with several planned improvements on the horizon:
- Implementation of additional padding possibilities beyond zero and symmetrical.
- Further optimization of computation routines using CMSIS-DSP convolution functions.
- Comprehensive execution time benchmarking across different hardware targets.
