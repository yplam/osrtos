---
title: 'ulab: NumPy-like Array Manipulation for MicroPython'
summary: ulab is a high-performance, C-implemented numerical library for MicroPython
  and CircuitPython that provides a NumPy-like interface for array manipulation. It
  supports multi-dimensional ndarrays and advanced mathematical routines from NumPy
  and SciPy, optimized for resource-constrained embedded systems like STM32, ESP32,
  and RP2040.
slug: ulab-numpy-like-array-manipulation-for-micropython
codeUrl: https://github.com/v923z/micropython-ulab
siteUrl: https://micropython-ulab.readthedocs.io/en/latest/index.html
star: 488
version: 6.11.0
lastUpdated: '2025-10-08'
rtos: ''
libraries:
- micropython
- sipeed-maixpy
topics:
- circuitpython
- circuitpython-ulab
- firmware
- iterables
- micropython
- micropython-ulab
- module
- numpy
- openmv
- scipy
- ulab
isShow: false
createdAt: '2025-12-31'
updatedAt: '2025-12-31'
relatedProjects:
- sparkfun-micropython-opencv
- ncnn-mp-neural-network-inference-for-micropython
- semito-v-micropython-compatibility-layer-mcl
- pycopy
- pycopy-standard-library-pycopy-lib
- micropython-lib
---

## Overview

ulab is a powerful numerical array manipulation library designed specifically for MicroPython and CircuitPython. Written in C for maximum performance, it brings the familiar syntax and capabilities of NumPy to the world of microcontrollers. The library defines compact containers called `ndarray`s for numerical data of one to four dimensions, allowing developers to perform complex mathematical operations on embedded hardware without the overhead of pure Python implementations.

As a software-only standard MicroPython user module, ulab has no hardware dependencies. This makes it highly portable, capable of being compiled for any platform that supports MicroPython or its derivatives. It supports a variety of data types, including 8-bit and 16-bit signed and unsigned integers, as well as single and double-precision floats.

## Key Features and Capabilities

The core of ulab is the `ndarray` object, which supports standard binary operators like addition, subtraction, and comparison, as well as unary operators like absolute value and negation. Beyond basic arithmetic, ulab provides a rich set of functions inspired by the NumPy and SciPy ecosystems:

- **Universal Functions:** Element-wise operations for fast data processing.
- **Linear Algebra:** Support for matrix operations via `numpy.linalg` and `scipy.linalg`.
- **Fast Fourier Transforms:** Efficient frequency analysis through `numpy.fft`.
- **Signal Processing:** Filtering and signal manipulation via `scipy.signal`.
- **Optimization and Statistics:** Tools for finding roots, curve fitting, and random number generation.

One of the library's most significant advantages is its memory efficiency. By using C-level optimizations and compact data structures, ulab allows microcontrollers to handle data sets that would typically be too slow or memory-intensive for standard Python lists.

## Hardware and Platform Support

ulab is widely adopted across the embedded Python ecosystem and is included by default in several popular firmware variants:

- **CircuitPython:** Included in builds for SAMD51 and nRF microcontrollers by Adafruit.
- **MicroPython Ports:** Supports STM32-based boards (like the Pyboard), ESP32, and the Raspberry Pi RP2040 (Pico).
- **Specialized Hardware:** Integrated into MaixPy (K210), OpenMV, and the Pimoroni Pico builds.

For developers with strict flash memory constraints, ulab is highly customizable. Unnecessary functions can be excluded during compilation using pre-processor switches, allowing the library to fit into smaller footprints by trading off specific features for reduced firmware size.

## Technical Implementation

The library is designed to be transparent and extensible. It includes a `user` module that allows developers to add their own C-level functions that operate on `ndarray`s without modifying the core library code. It also provides a `utils` module for interfacing with peripheral devices that support the buffer protocol, enabling direct data transfer between hardware components and numerical arrays.

## Getting Started

Using ulab is designed to be straightforward for those familiar with NumPy. The following snippet demonstrates how ulab can be used interchangeably with standard Python libraries, facilitating easy porting of CPython code to embedded devices:

```python
try:
    from ulab import numpy
    from ulab import scipy
except ImportError:
    import numpy
    import scipy.special

x = numpy.array([1, 2, 3])
scipy.special.erf(x)
```

Whether you are performing real-time signal processing on an ESP32 or managing sensor data on a Raspberry Pi Pico, ulab provides the numerical heavy lifting required for sophisticated embedded applications.
