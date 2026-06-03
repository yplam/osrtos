---
title: Mongoose OS Docker Image
summary: A Dockerized environment for the Mongoose OS (mos) tool, providing a consistent
  and portable toolchain for building IoT firmware. It simplifies the development
  process by encapsulating the mos command-line utility and its dependencies within
  a lightweight Alpine Linux container.
slug: mongoose-os-docker-image
codeUrl: https://github.com/cruftlab/mongoose-os-docker
siteUrl: https://mongoose-os.com/
star: 2
lastUpdated: '2018-03-08'
rtos: mongoose-os
topics:
- dockerfile
- mongoose-os
isShow: false
createdAt: '2025-12-31'
updatedAt: '2025-12-31'
relatedProjects:
- mongoose-os-docker-action
- nrf-connect-sdk-docker-environment
- tock-os-docker-build-environment
- nrf-connect-sdk-build-docker-environment
- tock-os-docker-image
- zmk-docker-images
---

## Overview

The Mongoose OS Docker project provides a containerized version of the `mos` tool, the primary command-line interface for Mongoose OS development. Mongoose OS is a popular IoT firmware development framework designed for microcontrollers like the ESP32, ESP8266, and CC3200. By wrapping the toolchain in a Docker image, developers can avoid the complexities of local environment setup and ensure consistent build results across different operating systems.

## Simplifying the Development Workflow

Setting up embedded toolchains can often be a tedious process involving specific versions of compilers, Python scripts, and system dependencies. This Docker image eliminates those hurdles by providing a pre-configured environment based on Alpine Linux. The image includes the `mos` tool and its necessary dependencies, such as `curl`, allowing developers to start building firmware immediately after pulling the image.

One of the primary advantages of this approach is the "Docker as a tool" philosophy. The image is configured with the `mos` binary as its entrypoint. This means that any arguments passed to the `docker run` command are forwarded directly to the `mos` tool, effectively making the container behave like a local installation of the software.

## Working with Source Files

Because the toolchain runs inside a container, it needs access to the project's source code on the host machine. The project utilizes Docker volumes to bridge this gap. The standard convention for this image is to mount the local firmware directory to the `/sources/` volume inside the container. 

For example, to initialize a new firmware project in a local directory, a developer would mount their current working directory to the container's volume. This allows the `mos` tool to generate files directly onto the host's filesystem while the actual execution happens within the isolated environment of the container.

## Technical Implementation

The Dockerfile is designed to be lightweight and efficient. It uses Alpine Linux as a base, which keeps the image size minimal. The build process involves:
- Installing `curl` to facilitate the download of the Mongoose OS installation script.
- Executing the official Mongoose OS installation script to fetch the latest version of the `mos` tool.
- Setting the working directory to `/sources/` to align with the expected volume mount.
- Configuring the entrypoint to `/root/.mos/bin/mos` for seamless command execution.

## Getting Started

Using the image is straightforward for anyone familiar with the Docker CLI. To view the help menu and verify the installation, users can run the container with the `--help` flag. For actual development tasks, such as building firmware or flashing devices, the `-v` flag is essential for mounting the source code. 

This containerized approach is particularly useful for Continuous Integration (CI) pipelines, where a clean and reproducible build environment is required for every commit. It ensures that the firmware is built using the exact same toolchain version regardless of whether it is running on a developer's laptop or a remote build server.
