---
title: Docker Embedded Development Toolchains
summary: A collection of multi-stage Docker images designed to provide consistent,
  reproducible environments for embedded development and CI/CD pipelines. It features
  specialized containers for Clang-format and the GNU Arm Embedded Toolchain, pre-configured
  with Mbed CLI, CMake, and Ninja.
codeUrl: https://github.com/leka/docker-embedded-toolchains
isShow: false
rtos: mbed-os
libraries: []
topics:
- arm-none-eabi
- arm-none-eabi-gcc
- cmake
- docker
- embedded
- github-actions
- mbed-os
star: 2
lastUpdated: '2021-06-18'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- zmk-docker-images
- tock-os-docker-image
- nrf-connect-sdk-docker-environment
- docker-containers-for-the-zephyr-rtos
- nrf-connect-sdk-build-docker-environment
- tock-os-docker-build-environment
---

Setting up a development environment for embedded systems is notoriously difficult. Between managing specific versions of the GNU Arm Embedded Toolchain, ensuring CMake and Ninja are correctly configured, and handling Python dependencies for tools like Mbed CLI, developers often spend more time fighting their environment than writing code. Leka's `docker-embedded-toolchains` project solves this by providing standardized, ready-to-use Docker images for both local development and Continuous Integration (CI).

### The Power of Multi-Stage Builds

The project utilizes Docker's multi-stage build feature to create specialized, lean images. This approach allows the repository to maintain a single Dockerfile while outputting different images tailored for specific tasks, such as code formatting or full firmware compilation. This reduces the footprint of CI runners and ensures that developers only download the tools they actually need.

### CI - Clang-format

Code consistency is vital in collaborative embedded projects. The `ci_clang_format` image is a super-lean container based on Ubuntu, specifically designed to run `clang-format` on a codebase. At only ~40MB (compressed), it is optimized for speed in GitHub Actions or other CI pipelines. It currently ships with Clang-format version 12.0.0, allowing teams to enforce style guides without requiring every contributor to install the LLVM toolchain locally.

To run the formatter via Docker, you can use a simple command:

```bash
docker run --rm weareleka/docker-clang-format:latest clang-format --version
```

### CI - ARM Toolchain

The heavy lifter of the repository is the `ci_arm_toolchain` image. This is a comprehensive environment for building firmware targeting ARM Cortex-M microcontrollers. It is built on Ubuntu and includes a robust suite of tools:

- **GNU Arm Embedded Toolchain**: Version 10-2020-q4-major (10.2.1).
- **Build Systems**: CMake 3.20.4 and Ninja-build.
- **Optimization Tools**: ccache for faster recompilation and zstd for compression.
- **Mbed Ecosystem**: Full support for `mbed-cli` and the necessary Python requirements for `mbed-os` development.

This image is particularly useful for projects utilizing Mbed OS, as it pre-installs all the complex Python dependencies that often cause issues during manual setup. It weighs in at approximately 260MB (compressed), which is remarkably efficient given the breadth of tools included.

### Getting Started and Usage

Using these images is straightforward. For interactive development, you can mount your source code into the container and drop into a bash shell:

```bash
docker run --privileged -it --rm weareleka/docker-arm-toolchain:latest /bin/bash
```

Inside this shell, you have immediate access to `arm-none-eabi-gcc`, `cmake`, and `mbed`. This ensures that every member of a development team is using the exact same compiler version and build flags, eliminating the "works on my machine" class of bugs.

For CI/CD, these images are designed to be used as the `container` image in GitHub Actions workflows. By referencing `weareleka/docker-arm-toolchain:latest`, you can automate your build and test process with the confidence that the environment is identical to your local setup. This project serves as a foundational piece of infrastructure for LekaOS, demonstrating how modern DevOps practices can be applied to the world of embedded systems.
