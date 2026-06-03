---
title: Swedish Embedded Control Systems Toolbox
summary: A comprehensive pure C library for advanced control systems, state estimation,
  and model identification in embedded environments. It features a wide array of numerical
  methods including MPC, Kalman filtering, and system identification algorithms, all
  designed without dynamic memory allocation for real-time reliability.
codeUrl: https://github.com/swedishembedded/control
siteUrl: https://swedishembedded.com/sdk
isShow: false
rtos: zephyr
libraries: []
topics:
- c
- control-systems
- embedded-c
- embedded-systems
- firmware
- system-identification
- system-identification-toolbox
- zephyr
- zephyr-rtos
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- embedded-kf-library
- swedish-embedded-platform-sdk
- swedish-embedded-workstation
- hsmcpp-hierarchical-state-machine-c-library
- smart-keymap
- rtt-libfilter-digital-filter-library-for-rt-thread
---

The Swedish Embedded Control Systems Toolbox is a sophisticated suite of control engineering tools designed specifically for the constraints of embedded systems. Written in pure C, this library provides developers with the mathematical heavy lifting required for advanced control, state estimation, and model identification without the overhead of dynamic memory allocation. This makes it an ideal choice for real-time applications where determinism and memory safety are critical.

### A Foundation in Numerical Methods
At its core, the toolbox is built upon a robust linear algebra engine. It handles everything from basic matrix operations to complex decompositions like Singular Value Decomposition (SVD), Cholesky, and QR. These aren't just academic exercises; they are the building blocks for real-time applications like the Discrete Lyapunov solver, matrix exponential calculations, and balanced realizations. By operating entirely on standard C arrays, the library remains portable across various MCU architectures.

### Advanced Control and Estimation
The library moves beyond simple PID loops into the realm of modern control theory. It provides implementations for:
- **Model Predictive Control (MPC)**: Utilizing linear programming for optimized outputs and inputs.
- **State Estimation**: Implementing standard Kalman filters and the more stable Square Root Unscented Kalman Filter (SR-UKF) for both state and parameter estimation.
- **Regulators**: Linear Quadratic Integral (LQI) and Model Reference Adaptive Control (MRAC) for high-performance tracking.

### System Identification: Learning from Data
One of the most impressive aspects of this toolbox is its focus on system identification. It allows developers to create mathematical models from real-world data directly on an embedded target. This is particularly useful for adaptive systems that need to tune themselves to changing hardware characteristics.
- **RLS (Recursive Least Squares)**: Ideal for Single-Input Single-Output (SISO) systems with low memory requirements, suitable for identifying transfer functions.
- **OKID and ERA/DC**: Advanced algorithms for identifying Multi-Variable (MIMO) state-space models from impulse or regular data.
- **SINDy (Sparse Identification of Nonlinear Dynamics)**: A modern approach to identifying nonlinear ordinary differential equations from time-domain data.

### Designed for the Embedded Ecosystem
Integration is a primary focus of the project. The library is fully compatible with the Zephyr RTOS, allowing it to be added as a module via the `west` tool. It is also a core component of the Swedish Embedded Platform SDK. Because it avoids `malloc`, it is suitable for safety-critical or highly constrained environments where heap fragmentation must be avoided.

### Practical Example: Recursive Least Squares (RLS)
The library makes it straightforward to identify a model from data. For instance, identifying a hydraulic hanging load system can be done using the RLS algorithm to create a transfer function model from input/output data:

```c
// The library uses generic implementations on C arrays
// Example logic for identifying a system model
float sampleTime = 0.02f;
float forgetting = 0.98f;
// [sysd, K] = rls(u, y, np, nz, nze, sampleTime, forgetting);
// This allows for real-time identification of system parameters
```

### Building and Documentation
The project uses a standard CMake build flow, making it easy to cross-compile for various architectures. It includes a comprehensive documentation suite generated via Doxygen and AsciiDoc, covering everything from basic linear algebra to complex artificial intelligence algorithms like A* pathfinding and Support Vector Machines (SVM) with C code generation capabilities.
