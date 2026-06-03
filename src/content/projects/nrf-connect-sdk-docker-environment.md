---
title: nRF Connect SDK Docker Environment
summary: A containerized build environment for Nordic Semiconductor's nRF Connect
  SDK, providing a pre-configured toolchain for Zephyr-based development. It simplifies
  CI/CD integration and local development by bundling west, nrfutil, and Nordic command-line
  tools into a single Docker image.
slug: nrf-connect-sdk-docker-environment
codeUrl: https://github.com/NordicPlayground/nrf-docker
siteUrl: https://developer.nordicsemi.com/nRF_Connect_SDK/doc/latest/nrf/installation/assistant.html#install-toolchain-manager
star: 81
lastUpdated: '2024-12-20'
rtos: zephyr
topics:
- docker
- docker-image
- github-actions
- sdk-nrf
- zephyr
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- nrf-connect-sdk-build-docker-environment
- docker-containers-for-the-zephyr-rtos
- docker-embedded-development-toolchains
- mongoose-os-docker-image
- artik-developer-environment-docker
- zmk-docker-images
---

## Streamlining nRF Connect SDK Development with Docker

Setting up a consistent development environment for embedded systems can be a complex and time-consuming task. The nRF Connect SDK (NCS), which is built on the Zephyr RTOS, requires specific versions of the GCC toolchain, the `west` meta-tool, and various Python dependencies. The nrf-docker project addresses this challenge by providing a ready-to-use Docker image that contains all the necessary dependencies to compile applications and samples for Nordic Semiconductor's nRF52, nRF53, and nRF91 series SoCs.

## Why Use a Containerized Toolchain?

The primary goal of this project is to provide a reproducible environment for building firmware, particularly in Continuous Integration (CI) environments like GitHub Actions. Provisioning a fresh environment with the toolchain and an updated `west` workspace can often take upwards of 10 minutes. By using a pre-built Docker image, developers can reduce this setup time significantly, ensuring that builds are fast and consistent across different machines.

Beyond CI, this image is highly useful for local development. It allows developers to build firmware without installing the entire toolchain directly on their host operating system, avoiding version conflicts and simplifying the onboarding process for new team members. It also provides a bridge for developers on Windows (via WSL) and macOS (including M1/M2 Apple Silicon) to use the same environment as their Linux-based CI servers.

## Key Components and Features

The Docker image is based on Ubuntu 22.04 and includes a comprehensive suite of Nordic development tools:

- **nRF Connect SDK**: Pre-initialized workspaces for various release branches.
- **West**: The Zephyr meta-tool for managing repositories and builds.
- **nrfutil**: Nordic's versatile command-line utility, used here to manage the toolchain via the Toolchain Manager.
- **Nordic Command Line Tools**: Includes `nrfjprog` and `mergehex` for firmware manipulation.
- **ClangFormat**: Pre-configured with nRF Connect SDK formatting rules to ensure code consistency.
- **Cross-Platform Support**: Support for both `amd64` and `arm64` architectures.

## Building Firmware

Using the image is straightforward. By bind-mounting your project directory into the container, you can run `west build` commands and have the resulting binaries (like `merged.hex`) appear directly on your host machine. For example, to build a standard sample like the `asset_tracker_v2`, a single `docker run` command handles the entire process:

```bash
docker run --rm \
    -v ${PWD}:/workdir/project \
    -w /workdir/nrf/applications/asset_tracker_v2 \
    nordicplayground/nrfconnect-sdk:v2.9-branch \
    west build -p always -b nrf9160dk_nrf9160_ns --build-dir /workdir/project/build
```

## Interactive and CI Usage

The image supports both interactive usage—where a developer can drop into a bash shell inside the container to run manual commands—and automated usage in GitHub Actions. Because the image includes `clang-format` and the official NCS style rules, it can also be integrated into pre-commit hooks or linting workflows to maintain high code quality standards across a project.
