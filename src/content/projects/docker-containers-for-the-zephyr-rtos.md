---
title: Docker Containers for the Zephyr RTOS
summary: A set of Docker images providing a complete development environment for the
  Zephyr RTOS. It includes the Zephyr SDK, West meta-tool, and all necessary dependencies
  to build, flash, and debug applications for various architectures including Arm
  Cortex-M.
slug: docker-containers-for-the-zephyr-rtos
codeUrl: https://github.com/beriberikix/zephyr-docker
star: 13
lastUpdated: '2023-12-17'
rtos: zephyr
topics:
- docker
- zephyr
- zephyr-rtos
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- zmk-docker-images
- nuttx-development-docker-environment
- nrf-connect-sdk-docker-environment
- tock-os-docker-build-environment
- nrf-connect-sdk-build-docker-environment
- swedish-embedded-workstation
---

## Streamlining Zephyr Development with Docker

Setting up a development environment for the Zephyr RTOS can often be a complex process, involving the installation of specific toolchains, the Zephyr SDK, and numerous Python dependencies. The `zephyr-docker` project simplifies this by providing ready-to-use Docker container images that encapsulate the entire build environment. 

By using these containers, developers can fetch, build, flash, and debug Zephyr applications locally without installing any tools other than Docker and Git. This approach ensures a consistent environment across different developer machines and CI/CD pipelines, eliminating the "it works on my machine" problem often encountered in embedded development.

## Flexible Build Environments

The project offers multiple ways to utilize the Docker images, catering to different needs regarding image size and target architectures. 

### Debian and Alpine Support
The primary environment is based on Debian, providing a robust and compatible base for most development tasks. For users concerned with image size, an alternative configuration using Alpine Linux is available. Alpine is a lightweight distribution that significantly reduces the container's footprint while still providing the necessary tools for Zephyr development, such as the Device Tree Compiler (DTC) and Python.

### Multi-Architecture Toolchains
The images are highly configurable via build arguments. Developers can specify the Zephyr SDK version and the specific toolchains required for their hardware. For example, images can be built specifically for Arm Cortex-M targets or configured to support multiple toolchains like x86_64 and Arm simultaneously. This flexibility allows teams to tailor their environment to their specific hardware needs.

## Key Components Included

Each image comes pre-configured with the essential tools required by the Zephyr ecosystem:
- **Zephyr SDK**: Includes the compilers and tools necessary for building for various architectures.
- **West**: Zephyr's meta-tool for managing repositories, building applications, and flashing firmware.
- **System Dependencies**: Essential build tools like CMake, Ninja, Git, and the Device Tree Compiler (DTC).
- **Python Environment**: A virtual environment containing the necessary Python packages for Zephyr's build system, ensuring no conflicts with the host system's Python installation.

## Development Workflow

The containers can be used in several modes. In interactive mode, the container acts much like a virtual machine. Developers can shell into the container, initialize a Zephyr project using `west`, and run build commands. Because the source code can be mounted from the local machine, developers can continue using their preferred IDEs while the container handles the heavy lifting of the compilation.

```bash
docker run -it --name zephyr-gsg ghcr.io/beriberikix/zephyr:arm-0.16.4sdk
west init ~/zephyrproject
cd ~/zephyrproject
west update
west build -b mimxrt1060_evkb samples/basic/minimal -p
```

## Project Evolution

This project is transitioning to a new home under the Embedded Containers organization. This move reflects a broader effort to provide standardized, containerized environments for various embedded ecosystems. While existing images remain hosted, the project is moving toward a more centralized maintenance model to support the growing Zephyr community.
