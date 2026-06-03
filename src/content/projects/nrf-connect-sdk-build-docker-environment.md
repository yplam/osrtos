---
title: nRF Connect SDK Build Docker Environment
summary: A pre-configured Docker build environment for Nordic Semiconductor's nRF
  Connect SDK (NCS) v2.9.0. It includes the Zephyr SDK, nRF Command Line Tools, and
  the West toolchain, designed for consistent CI/CD pipelines and simplified local
  firmware development.
slug: nrf-connect-sdk-build-docker-environment
codeUrl: https://github.com/hardwario/nrf-connect-sdk-build-docker
siteUrl: https://www.hardwario.com
star: 6
version: v2.9.0-1
lastUpdated: '2025-02-26'
rtos: zephyr
libraries:
- nanopb
topics:
- docker
- hardwario
- iot
- ncs
- zephyr
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- nrf-connect-sdk-docker-environment
- docker-containers-for-the-zephyr-rtos
- docker-embedded-development-toolchains
- zmk-docker-images
- tock-os-docker-image
- tock-os-docker-build-environment
---

The nRF Connect SDK Build Docker project provides a standardized, containerized environment for developing firmware for Nordic Semiconductor's nRF series of microcontrollers. By encapsulating the complex toolchain requirements of the nRF Connect SDK (NCS) into a Docker image, it eliminates the common dependency challenges associated with setting up embedded development environments across different operating systems.

### A Consistent Development Foundation

The environment is built upon an Ubuntu base and is specifically tailored for NCS version v2.9.0. This version of the SDK is paired with the Zephyr SDK v0.17.0, ensuring that the toolchain is validated and compatible with the underlying RTOS. By using this image, teams can ensure that every developer and CI/CD runner uses the exact same compiler, libraries, and build tools, which is critical for maintaining firmware reproducibility.

### Integrated Tooling

The Docker image comes pre-loaded with essential Nordic and Zephyr utilities, including:

- **West**: The meta-tool used by Zephyr for managing repositories, fetching dependencies, and building projects.
- **nRF Command Line Tools**: Essential for flashing, erasing, and interacting with Nordic hardware via J-Link.
- **nrfutil**: A versatile tool for device firmware updates (DFU) and toolchain management.
- **Zephyr SDK**: The comprehensive cross-compiler toolchain for ARM and RISC-V architectures.
- **Python Environment**: A pre-configured Python environment with necessary scripts for device management and build automation.

### Streamlining CI/CD Pipelines

One of the primary use cases for this project is integration into automated build pipelines, such as GitHub Actions, GitLab CI, or Jenkins. Instead of manually installing gigabytes of toolchain data on a runner for every build, the pipeline can simply pull the pre-built image. This significantly reduces setup time and improves the reliability of firmware builds by providing a clean, immutable environment for every execution.

### Building Firmware

The image is designed to be used with the `west` build system. A typical workflow involves mounting the local workspace into the container and executing the build command. For example, to build a standard sample like 'blinky', a developer can run:

```bash
sh -c 'docker run --rm -it -u $(id -u):$(id -g) -v $(pwd):/build -w /build/zephyr/samples/basic/blinky hardwario/nrf-connect-sdk-build:v2.9.0-1 west build -b <BOARD_NAME>'
```

This approach keeps the host machine clean while providing a powerful, reproducible build environment. The inclusion of `ccache` support within the image further optimizes build times by caching object files across successive runs, which is particularly beneficial in local development scenarios.

### Technical Specifications

The environment includes specific paths and environment variables configured for the Zephyr toolchain variant. It handles the installation of `python3-venv`, `wget`, `jq`, and essential build tools like `gcc-multilib`. It also pre-installs the `nanopb` generator, which is frequently used in embedded projects for protocol buffer serialization, ensuring that developers have all the necessary middleware tools ready to use out of the box.
