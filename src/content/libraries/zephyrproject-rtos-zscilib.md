---
title: zscilib
summary: The Zephyr Scientific Library (zscilib) is a portable C-based library designed
  for scientific computing, data analysis, and data manipulation on resource-constrained
  embedded hardware. It provides a comprehensive suite of tools for linear algebra,
  physics simulations, and sensor fusion, enabling complex processing to occur directly
  on the endnode rather than requiring external server-side analysis.
slug: zephyrproject-rtos-zscilib
codeUrl: https://github.com/zephyrproject-rtos/zscilib
star: 164
version: v0.2.0-rc1
lastUpdated: '2025-12-11'
licenses:
- Apache-2.0
libraryType: Middleware
createdAt: '2026-01-04'
updatedAt: '2026-03-03'
---

### Features


- Comprehensive vector operations including addition, dot product, cross product, and normalization for f32 and f64 types.

- Extensive matrix algebra support featuring multiplication, inversion, SVD, and pseudoinverse calculations.

- Statistical analysis tools for calculating mean, variance, standard deviation, and performing linear regression.

- Probability functions covering PDF and CDF for uniform, normal, and binomial distributions.

- Physics modules for kinematics, dynamics, thermodynamics, electromagnetism, and fluid mechanics.

- Sensor fusion implementations including Madgwick, Mahony, AQUA, and Extended Kalman filters.

- Orientation and attitude estimation using quaternions, Euler angles, and AHRS algorithms.

- Colorimetry support for CIE XYZ, xyY, and RGB color space conversions and standard illuminant data.

- Interpolation methods such as nearest neighbor, linear, and natural cubic splines.

- Measurement API for standardized representation of SI units, scales, and C data types.

- Configurable floating-point precision (32-bit vs 64-bit) to balance performance and accuracy.

- Architecture-specific optimizations for ARM Cortex-M using Thumb-2 assembly.

- Integration with the Zephyr shell for interactive testing and debugging of scientific functions.

- Standalone build support for non-Zephyr embedded projects using standard makefiles.

- Optional bounds checking to ensure data integrity during vector and matrix operations.



The Zephyr Scientific Library (zscilib) is architected as a modular collection of scientific functions designed to bridge the gap between raw sensor data and actionable information. The library is written entirely in C and follows a domain-specific organization, where features are grouped into logical modules such as linear algebra, physics, and colorimetry. This modularity allows developers to include only the necessary components, which is critical for memory-constrained embedded systems. 

A central design principle of zscilib is its flexibility regarding numerical precision. Through the use of the `zsl_real_t` type, the library can be configured at compile-time to use either single-precision (32-bit) or double-precision (64-bit) floating-point values. While the library is optimized for the Zephyr RTOS ecosystem, it maintains a portable core that can be used in standalone environments. It also includes an architecture-specific optimization layer, currently targeting ARM Cortex-M processors with Thumb-2 assembly to maximize performance on low-power hardware.

#### Core Components
- **Linear Algebra**: High-performance vector and matrix operations including decompositions.
- **Numerical Analysis**: Statistical and probabilistic functions for data characterization.
- **Physics Engine**: Equations for kinematics, dynamics, and electrical components.
- **Orientation & Fusion**: Algorithms for converting IMU data into orientation vectors.
- **Colorimetry**: Tools for spectral power distribution and color space conversion.

### Use Cases
This library is ideal for:
- **Edge Computing**: Performing complex data aggregation and statistical analysis directly on the endnode to reduce data transmission overhead.
- **Motion Tracking**: Implementing AHRS and sensor fusion for IMU-based orientation and attitude estimation in wearables or robotics.
- **Industrial Sensing**: Executing on-device linear regression and anomaly detection for predictive maintenance applications.
- **Smart Lighting**: Converting spectral or radiometric data into precise colorimetric values like CCT, Duv, or RGB for advanced lighting control.

### Getting Started
To begin using zscilib within a Zephyr project, ensure the library is included in your `west.yml` manifest and enable the library via `CONFIG_ZSL=y` in your project configuration. For developers working outside of Zephyr, a standalone reference project is provided in `samples/standalone` which uses a standard Makefile build system. Comprehensive API documentation is available at the [official zscilib documentation site](https://zephyrproject-rtos.github.io/zscilib/), which details function signatures and mathematical implementations for all modules. Developers can also utilize the built-in shell commands (`zsl`, `color`, `orient`) to interactively test algorithms on their target hardware.
