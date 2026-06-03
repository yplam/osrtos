---
title: MovingAverageFloat
summary: A lightweight C++ template library for calculating moving averages of floating-point
  numbers on Arduino and Mbed platforms. It provides an efficient way to smooth sensor
  data and reduce noise using a circular buffer with double-precision internal accumulation
  to maintain accuracy.
slug: movingaveragefloat
codeUrl: https://github.com/pilotak/MovingAverageFloat
star: 2
version: v1.0.2
lastUpdated: '2021-11-23'
rtos: mbed-os
topics:
- arduino
- arduino-library
- averaging-filter
- filter
- float
- floating-point
- mbed
- mbed-os
- moving-average
isShow: false
createdAt: '2025-12-31'
updatedAt: '2025-12-31'
relatedProjects:
- moving-average-filter
- movingaverageangle
- nano33blesensor
- rtt-libfilter-digital-filter-library-for-rt-thread
- qfplib-m0-full-floating-point-library
- qfplib-m3-floating-point-library
---

## Overview

MovingAverageFloat is a specialized C++ template library designed for embedded systems to calculate the moving average of floating-point data streams. In embedded development, sensor readings often contain high-frequency noise or jitter; a moving average filter is a fundamental digital signal processing (DSP) tool used to smooth these signals and provide more stable values for control logic or user displays.

The library is cross-platform, explicitly supporting both the Arduino framework and Mbed OS, making it versatile for developers working across different microcontroller ecosystems like AVR, STM32, or NRF52.

## Key Features

- **Template-Based Configuration**: The buffer size is defined at compile-time using C++ templates, allowing for static memory allocation and optimized performance.
- **High Precision**: While the input and output are standard `float` values, the library internally maintains the running sum as a `double`. This prevents the accumulation of rounding errors that often plague long-running average filters on 32-bit systems.
- **Memory Efficiency**: The library uses a circular buffer implementation. For example, a filter with a window of 16 samples consumes exactly 64 bytes of RAM (16 * sizeof(float)).
- **Initialization Logic**: On the first call to `add()`, the library automatically fills the entire buffer with the initial value to prevent the "ramp-up" delay typically associated with moving averages.

## Technical Implementation

The core logic resides in a single header file, `MovingAverageFloat.h`. It manages a circular buffer and a pointer to the next insertion index. Instead of recalculating the entire sum every time a new sample is added, it subtracts the oldest value from the running sum and adds the new one, ensuring O(1) time complexity regardless of the buffer size.

### API Methods

- `add(float value)`: Inserts a new sample into the buffer and returns the updated average.
- `get()`: Returns the most recently calculated average without modifying the buffer.
- `get_sum()`: Returns the current internal sum (as a double).
- `fill(float value)`: Forces the entire buffer to be filled with a specific value.
- `reset()`: Resets the filter state, causing the next `add()` call to re-initialize the buffer.

## Usage Example

The following example demonstrates how to integrate the filter into an Mbed OS application:

```cpp
#include "mbed.h"
#include "MovingAverageFloat.h"

// Buffer will be 16 samples long
MovingAverageFloat <16> filter;

int main() {
    // Insert new numbers and get results
    printf("result: %.2f\n", filter.add(1.5)); 
    printf("result: %.2f\n", filter.add(2.5)); 
    printf("result: %.2f\n", filter.add(2.4)); 
    
    // Get last result without adding a new one
    printf("result: %.2f\n", filter.get()); 

    return 0;
}
```

## Integration

The library is structured to be compatible with multiple build systems. It includes a `library.json` for PlatformIO users, `library.properties` for the Arduino Library Manager, and an `mbed_lib.json` for Mbed CLI projects. Because it is implemented as a header-only template class, it is easy to include in any C++ project by simply placing the header file in the include path.
