---
title: SparkFun MicroPython-OpenCV
summary: A MicroPython port of the OpenCV computer vision library, specifically optimized
  for embedded devices like the Raspberry Pi RP2350. It provides a subset of OpenCV
  functions for image processing, filtering, and object detection within a Python
  environment on microcontrollers. The project integrates with the ulab library for
  NumPy-like array operations and requires hardware with PSRAM for effective use.
slug: sparkfun-micropython-opencv
codeUrl: https://github.com/sparkfun/micropython-opencv
siteUrl: https://docs.opencv.org/4.11.0/d2/de8/group__core__array.html#ga3460e9c9f37b563ab9dd550c4d8c4e7d
star: 23
version: v1.0.1
lastUpdated: '2025-12-01'
rtos: ''
libraries:
- micropython
topics:
- micropython
- opencv
- sparkfun
isShow: false
createdAt: '2026-01-28'
updatedAt: '2026-01-28'
relatedProjects:
- esp-dl-micropython-binding
- semito-v-micropython-compatibility-layer-mcl
- ncnn-mp-neural-network-inference-for-micropython
- ulab-numpy-like-array-manipulation-for-micropython
- pycopy-standard-library-pycopy-lib
- maixpy-v4
---

SparkFun MicroPython-OpenCV is a groundbreaking port that brings the power of the Open Source Computer Vision Library (OpenCV) to the MicroPython ecosystem. This project enables vision processing on resource-constrained embedded devices, allowing developers to implement sophisticated image manipulation and analysis directly in Python. While OpenCV typically requires desktop-class processors and gigabytes of RAM, this port bridges the gap for microcontrollers, specifically targeting the Raspberry Pi RP2350.

## Bringing Computer Vision to Microcontrollers

MicroPython-OpenCV provides a familiar API for developers coming from standard Python environments. It implements a subset of the most useful OpenCV functions, carefully selected to fit within the limited firmware and RAM constraints of embedded hardware. The port includes core modules for image filtering, transformations, drawing, color space conversions, and structural analysis.

Because microcontrollers lack the traditional operating system layers found on PCs, this port introduces necessary API changes for hardware interaction. For instance, instead of standard window management, `cv.imshow()` accepts a display driver object, and camera access is handled through separate drivers that implement the `VideoCapture` interface.

## Technical Implementation and Performance

The project leverages the `ulab` library to provide NumPy-like array support, which is essential for handling image data efficiently. To manage the strict memory limits of microcontrollers, the port includes several optimizations:

- **Memory Management**: It utilizes MicroPython's garbage collector and provides optional `dst` arguments in functions to allow for memory pre-allocation, reducing the overhead of repeated array creation.
- **Hardware Requirements**: Due to the size of image buffers, PSRAM is essentially a requirement. A single 320x240 RGB888 frame buffer consumes approximately 225KiB, making external RAM necessary for complex vision pipelines.
- **Build System**: The project uses a CMake-based build system that integrates OpenCV as a MicroPython user C module, wrapping standard C++ OpenCV functions for use in the MicroPython REPL.

## Example Usage

The following snippet demonstrates how similar the MicroPython implementation is to standard OpenCV code:

```python
import cv2 as cv
from ulab import numpy as np

# Initialize an image array using ulab
img = np.zeros((240, 320, 3), dtype=np.uint8)

# Call standard OpenCV functions
img = cv.putText(img, "Hello OpenCV!", (50, 200), cv.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2)
img = cv.Canny(img, 100, 200)

# Display using a compatible hardware driver
cv.imshow(display, img)
```

## Supported Features

Despite the limitations of embedded environments, the port supports a wide array of functions across several modules:

- **imgproc**: Includes Gaussian blur, Canny edge detection, Sobel operators, and morphological transformations like erosion and dilation.
- **shape**: Provides contour analysis, bounding rectangles, convex hulls, and point-in-polygon tests.
- **feature**: Supports Hough transforms for line and circle detection.
- **imgcodecs**: Enables reading and writing BMP and PNG files directly to the MicroPython filesystem or an SD card.

## Hardware and Platform Support

Currently, the project is primarily tested on the Raspberry Pi RP2350. The firmware adds approximately 3MiB to the standard MicroPython image, necessitating boards with at least 8MB of Flash. While the initial focus is on the RP2350, the architecture is designed to be extensible to other platforms that meet the memory and processing requirements for computer vision tasks.
