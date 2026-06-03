---
title: MovingAverageAngle
summary: A C++ template library for Arduino and Mbed that implements a moving average
  filter specifically for angular data. It solves the 0-360 degree wrap-around problem
  by averaging sine and cosine components of the input values.
slug: movingaverageangle
codeUrl: https://github.com/pilotak/MovingAverageAngle
star: 1
version: v1.1.0
lastUpdated: '2023-05-13'
rtos: mbed-os
topics:
- angle
- arduino
- arduino-library
- averaging-filter
- compass
- filter
- float
- mbed
- mbed-os
- moving-average
isShow: false
createdAt: '2025-12-31'
updatedAt: '2025-12-31'
relatedProjects:
- movingaveragefloat
- moving-average-filter
- mpu6050-interfacing-library-for-esp32-esp-idf
- rtt-libfilter-digital-filter-library-for-rt-thread
- nano33blesensor
- spektrum-receiver-library-for-mbed
---

## Overview

Averaging angular data, such as compass headings, wind direction, or rotary encoder positions, presents a unique challenge in embedded systems. A standard arithmetic mean fails when values wrap around the 360-degree mark; for instance, the average of 350° and 10° should logically be 0° (or 360°), but a simple calculation would yield 180°. The MovingAverageAngle library provides a robust, lightweight solution for this problem, compatible with both Arduino and Mbed platforms.

## The Angular Wrap-around Problem

When dealing with circular data, the discontinuity at the 0/360-degree boundary breaks traditional linear filters. MovingAverageAngle addresses this by decomposing each angular input into its Cartesian coordinates: sine and cosine. By maintaining separate moving averages for these two components and then recombining them using the `atan2` function, the library ensures that the resulting average correctly reflects the circular nature of the data. This method is mathematically sound and prevents the "jump" errors associated with simple linear averaging.

## Key Features

- **Cross-Platform Support**: Designed to work seamlessly across Arduino and Mbed OS environments, including support for `mbed_lib.json` and `library.json` configurations.
- **Template-Based Design**: Uses C++ templates to allow users to define the buffer size at compile-time, which helps in optimizing memory allocation and performance.
- **High Precision**: Performs internal calculations using double-precision floating-point math while utilizing scaled integers for the underlying moving average filters to maintain accuracy.
- **Simple API**: Provides a clean interface with methods like `add()`, `get()`, `fill()`, and `reset()`, making it easy to integrate into existing sensor processing loops.

## Technical Implementation

The library is implemented as a header-only C++ template class. It manages two internal `MovingAverage` instances—one for the sine component and one for the cosine component. When a new angle is added, the library converts the degree value to radians, calculates the sine and cosine (scaled by 10,000,000 to preserve precision in integer math), and updates the respective filters. The `get()` method then performs the inverse trigonometric calculation to return the filtered angle in the 0-360° range.

## Getting Started

Integrating the filter into an Mbed or Arduino project is straightforward. The following example demonstrates how to initialize a filter with a buffer of four samples and process data near the wrap-around point:

```cpp
#include "mbed.h"
#include "MovingAverageAngle.h"

// Buffer will be 4 samples long, using 16 bytes of RAM for the filters
MovingAverageAngle <4> filter;

int main() {
    // Adding samples near the wrap-around point (350 and 20)
    printf("result: %.2f\n", filter.add(350.0)); 
    printf("result: %.2f\n", filter.add(20.0)); 
    printf("result: %.2f\n", filter.add(30.0)); 
    printf("result: %.2f\n", filter.add(40.0));

    // Retrieve the latest filtered value without adding a new one
    printf("final result: %.2f\n", filter.get()); 

    return 0;
}
```

## Memory and Performance

Because the library uses templates, the memory footprint is predictable and static. For a buffer size of `N`, the filter consumes approximately `2 * N * sizeof(int32_t)` plus a small amount of overhead for the double-precision result storage. This makes it highly suitable for resource-constrained microcontrollers where heap allocation should be avoided and deterministic memory usage is required.
