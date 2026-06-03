---
title: seL4, CAmkES, and L4v Docker Build Environments
summary: A collection of Dockerfiles and build infrastructure providing standardized
  development environments for the seL4 microkernel, CAmkES component framework, and
  L4v verification toolchain. It simplifies the setup of complex dependencies required
  for building, testing, and verifying seL4-based systems across x86, ARM, and RISC-V
  architectures.
slug: sel4-camkes-and-l4v-docker-build-environments
codeUrl: https://github.com/seL4/seL4-CAmkES-L4v-dockerfiles
star: 13
lastUpdated: '2025-08-13'
rtos: sel4
topics:
- camkes
- docker
- l4v
- sel4
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- zmk-docker-images
- docker-embedded-development-toolchains
- artik-developer-environment-docker
- docker-containers-for-the-zephyr-rtos
- nuttx-development-docker-environment
- tock-os-docker-build-environment
---

## Standardizing seL4 Development Environments

The seL4 microkernel is renowned for its formal security proofs, but the toolchain required to build, test, and verify it is notoriously complex. The `seL4-CAmkES-L4v-dockerfiles` repository provides a robust solution to this challenge by offering a collection of Docker containers that pre-package all necessary dependencies for the seL4 ecosystem, including the CAmkES (Component Architecture for microkernel-based Embedded Systems) framework and the L4v verification suite.

These Docker files serve as the foundation for regression testing within the seL4 Foundation. By using these images, developers can ensure they are working within a well-tested, up-to-date environment that matches the CI/CD pipelines used by the core maintainers.

## Core Components and Layering

The project uses a layered approach to build images, allowing users to choose the specific level of tooling they require:

- **seL4 Image**: Contains the base tools and dependencies required to compile the seL4 microkernel itself.
- **CAmkES Image**: Built on top of the seL4 image, adding the Python and Haskell dependencies needed for the CAmkES component framework.
- **L4v Image**: The most comprehensive layer, adding the Isabelle/HOL theorem prover and other tools required for formal verification tasks.

This modularity is managed through a sophisticated `Makefile` and a `build.sh` script, which handle the orchestration of Docker builds across different host architectures, including x86_64 and ARM64 (Apple Silicon support included).

## Seamless Host Integration

One of the standout features of this project is its focus on usability. Rather than forcing developers to work in an isolated silo, the provided infrastructure maps the user's local UID and GID into the container. This allows developers to:

- Map their local source code directories to `/host` inside the container.
- Read and write files with correct permissions.
- Run graphical tools (like Isabelle's jEdit interface) via X11 forwarding.
- Persist data across sessions using Docker volumes for home directories and Isabelle caches.

## Getting Started

For most users, getting started is as simple as running a single command. To enter a shell with all CAmkES dependencies ready to go, one can run:

```bash
make user
```

To target a specific environment or project directory, the `HOST_DIR` variable can be used:

```bash
make user_sel4 HOST_DIR=~/my_sel4_project
```

Inside the container, standard seL4 workflows—such as using the `repo` tool to fetch manifests and `ninja` for builds—work exactly as they would on a native Linux installation, but without the headache of manual dependency management.

## Extensibility and Customization

The environment is designed to be extensible. The `extras.Dockerfile` acts as a shim, allowing users to add their own dependencies (such as specific versions of Rust or CakeML) without modifying the core base images. The `build.sh` script further supports this by allowing users to "apply" specific software packages during the build process using the `-s` flag, making it easy to create bespoke environments for specialized research or development tasks.
