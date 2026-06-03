---
title: bazel2zephyr
summary: A tutorial and demonstration project for cross-compiling C++ libraries using
  Bazel and the ARM toolchain for integration into the Zephyr RTOS. It provides a
  step-by-step guide on using bazel-embedded to generate static libraries and linking
  them via Zephyr's CMake build system.
codeUrl: https://github.com/GatCode/bazel2zephyr
isShow: false
rtos: zephyr
libraries: []
topics:
- arm
- bazel
- cortex-m
- nordic
- nrf5340
- zephyr
- zephyr-rtos
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- sel4-userland-library-tutorial
- seal-test-bare-bones-example
- qemu-emulation-for-ti-lm3s6965-cortex-m3
- stm32f1-rtos-example-project
- zephyr-rtos-tutorial-for-beginners
- cmsis-rtos-on-micro-bit
---

Bridging the gap between modern build systems like Bazel and embedded RTOS environments like Zephyr can be a daunting task. While Bazel is renowned for its reproducible builds and dependency management, Zephyr relies heavily on CMake. The `bazel2zephyr` project provides a clear, hands-on tutorial for developers who need to take an existing Bazel-based C++ project, cross-compile it for ARM, and link it into a Zephyr application.

## The Challenge of Cross-Toolchain Integration

In many professional embedded environments, logic libraries are developed and tested on host machines using Bazel. However, when it comes time to deploy that logic to an ARM-based microcontroller running Zephyr, developers often struggle with toolchain mismatches. This repository solves that by breaking the process down into three digestible steps: creating the library, cross-compiling for ARM, and final integration.

## Step 0: Defining the Library Code

The project starts with a simple `CalculationMachine` library. This serves as a proxy for any complex business logic you might have. The library consists of a basic class that adds two integers, defined in standard C++ header and source files. To make this a Bazel project, a `BUILD` file is used to define a `cc_library` target:

```python
cc_library(
    name = "calculationMachine",
    srcs = ["calculationMachine.cc"],
    hdrs = ["calculationMachine.hh"],
)
```

## Step 1: ARM Binary Creation with Bazel

The core of the cross-compilation magic happens in Step 1. By default, Bazel builds for the host architecture. To target ARM, the project leverages `bazel-embedded`. By updating the `WORKSPACE` file to include the `bazel_embedded` repository and configuring a `.bazelrc` file to enable toolchain resolution, users can compile their library specifically for Cortex-M architectures.

For example, to build for a Cortex-M3 platform, the following command is used:

```bash
bazel build //... --platforms=@bazel_embedded//platforms:cortex_m3
```

This produces a static library (`.a` file) that is binary-compatible with the ARM processors typically used in Zephyr-supported hardware.

## Step 2: Integration into Zephyr

Once the static library is generated, it must be introduced to the Zephyr build system. This is achieved by treating the Bazel output as an imported library within Zephyr's `CMakeLists.txt`. The project demonstrates how to use `add_library(... STATIC IMPORTED GLOBAL)` to point Zephyr to the pre-compiled binary.

```cmake
set(LIB_DIR ${CMAKE_CURRENT_SOURCE_DIR}/lib)
include_directories(${LIB_DIR})

add_library(calculationMachine STATIC IMPORTED GLOBAL)
set_target_properties(calculationMachine PROPERTIES IMPORTED_LOCATION ${LIB_DIR}/libcalculationMachine.a)
target_link_libraries(app PUBLIC calculationMachine)
```

## Implementation in Zephyr

With the library linked, using it within a Zephyr application is seamless. The standard `main.cpp` can include the header file and instantiate the class just like any other local code. The project provides a sample loop that performs calculations and prints results to the Zephyr console:

```cpp
#include <zephyr.h>
#include <sys/printk.h>
#include "calculationMachine.hh"

void main(void) {
    while(1) {
        CalculationMachine machine = CalculationMachine();
        printk("Sum of 5 and 3 = %d
", machine.sum(5, 3));
        k_sleep(K_MSEC(1000));
    }
}
```

## Considerations and Limitations

While this approach is powerful for integrating existing codebases, the author notes that complexity can vary. Depending on the existing Bazel project's dependencies and the specific toolchain capabilities, some code adaptation or refactoring may be necessary to ensure compatibility with the constrained environment of an RTOS like Zephyr. This tutorial serves as a foundational template for developers looking to modernize their embedded build workflows.
