---
title: Moving Average Filter
summary: A lightweight C++ template library for calculating moving averages on fixed-point
  numbers. Optimized for embedded platforms like Arduino and Mbed, it utilizes power-of-two
  buffer sizes to perform efficient division via bit-shifting.
slug: moving-average-filter
codeUrl: https://github.com/pilotak/MovingAverage
star: 3
version: v1.2.1
lastUpdated: '2024-10-11'
rtos: mbed-os
topics:
- arduino
- arduino-library
- averaging-filter
- filter
- mbed
- mbed-os
- moving-average
isShow: false
createdAt: '2025-12-31'
updatedAt: '2025-12-31'
relatedProjects:
- movingaveragefloat
- movingaverageangle
- rtt-libfilter-digital-filter-library-for-rt-thread
- embedded-kf-library
- qfplib-m0-full-floating-point-library
- qfplib-m0-tiny
---

## Overview

The Moving Average Filter library provides a memory-efficient and computationally fast implementation of a simple moving average (SMA) for embedded systems. Designed specifically for microcontrollers where floating-point operations might be expensive or unavailable, this library focuses on fixed-point integer math. It is compatible with both the Arduino and Mbed frameworks, making it a versatile tool for smoothing sensor data and reducing signal noise in real-time applications.

## Key Features and Optimizations

The library is implemented as a C++ template, allowing developers to choose the underlying data type that best fits their precision requirements and memory constraints. It supports standard integer types including `uint8_t`, `int16_t`, and `uint32_t`.

A significant optimization in this library is the requirement that buffer lengths must be a power of two (e.g., 2, 4, 8, 16, 32...). This constraint allows the library to replace costly division operations with bitwise right-shifts. In the context of low-power 8-bit or 32-bit microcontrollers, this significantly reduces the CPU cycles required for every new sample added to the filter.

## Technical Implementation

The `MovingAverage` class manages an internal circular buffer. When a new value is added, the oldest value is subtracted from a running sum, the new value is added, and the result is calculated. The library also handles the initial state gracefully: upon the first sample, it can automatically fill the entire buffer to prevent a slow ramp-up to the average.

### Buffer Type Constraints
- **8-bit types**: Supports very large buffer lengths (up to 16,843,009).
- **16-bit types**: Supports buffer lengths up to 65,537.
- **32-bit types**: Buffer length is limited by the bit-depth of the input numbers to prevent overflow of the internal 32-bit sum (e.g., 30-bit numbers allow a buffer of 2, while 29-bit numbers allow a buffer of 4).

## Getting Started

The library is easy to integrate into existing projects. Below is an example of how to use the filter within an Mbed environment:

```cpp
#include "mbed.h"
#include "MovingAverage.h"

// Initialize a filter for uint8_t samples with a buffer size of 16
MovingAverage <uint8_t, 16> filter;

int main() {
    // Insert new numbers and retrieve the current average
    printf("result: %u\n", filter.add(255)); 
    printf("result: %u\n", filter.add(6));   
    printf("result: %u\n", filter.add(9));   
    
    // Get the last calculated result without adding a new sample
    printf("result: %u\n", filter.get());    

    return 0;
}
```

## API Methods

- `add(T value)`: Adds a new sample to the buffer and returns the new average.
- `get()`: Returns the most recently calculated average.
- `get_sum()`: Returns the current raw sum of all samples in the buffer.
- `fill(T value)`: Pre-fills the entire buffer with a specific value, useful for setting an initial baseline.
- `reset()`: Resets the filter state.
- `set_samples(uint16_t samples)`: Dynamically adjusts the number of samples used (must be less than or equal to the template size `N`).
