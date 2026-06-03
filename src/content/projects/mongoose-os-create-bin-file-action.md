---
title: Mongoose OS Create Bin File Action
summary: A GitHub Action designed to combine Mongoose OS firmware ZIP files into a
  single, flashable binary image. It automates the process of assembling various firmware
  components into a unified file for deployment and distribution within CI/CD workflows.
slug: mongoose-os-create-bin-file-action
codeUrl: https://github.com/yaourdt/mgos-combine-action
star: 0
version: v0.0.1
lastUpdated: '2020-12-27'
rtos: mongoose-os
topics:
- actions
- mongoose-os
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- mgos-combine
- mongoose-os-docker-action
- mongoose-os-docker-image
- mos-native
- openthread-nrf52840-firmware-builder
- sel4-ci-actions-and-workflows
---

## Overview

The Mongoose OS Create Bin File Action is a specialized utility for developers working with Mongoose OS. When building firmware with the Mongoose OS toolchain, the output is typically a ZIP file containing various components like the bootloader, application code, and filesystem images. This GitHub Action simplifies the post-build process by automatically combining these disparate parts into a single, contiguous binary file.

By converting the firmware ZIP into a unified `.bin` file, developers can more easily manage build artifacts, simplify the flashing process for certain hardware programmers, and streamline the distribution of firmware updates.

## Key Features

- **Automated Firmware Assembly**: Automatically extracts and merges all parts of a Mongoose OS firmware ZIP file.
- **Customizable Output**: Users can specify the input ZIP path, the desired output filename, and additional arguments for the underlying combination tool.
- **Docker-Based Execution**: Runs in a containerized environment, ensuring consistent results regardless of the GitHub Actions runner environment.
- **Seamless Integration**: Designed to fit directly into existing Mongoose OS build pipelines, typically following the build step and preceding artifact upload.

## Technical Implementation

The action is implemented as a Docker-based GitHub Action. It utilizes a Debian-based container that fetches the `mgos-combine` utility, a tool specifically designed to handle the internal structure of Mongoose OS firmware packages. 

The workflow integration is straightforward. The action accepts three primary inputs:
- `zipfile`: The path to the source firmware ZIP (defaults to `./build/fw.zip`).
- `output`: The name for the resulting binary (defaults to `firmware.bin`).
- `args`: Optional flags for the `mgos-combine` tool, such as flash size or fill byte specifications.

## Example Usage

Integrating this action into a GitHub workflow allows for the automatic generation of flashable binaries on every push or release. Below is a typical example of how to use the action in a workflow file:

```yaml
steps:
  - name: Combine Firmware Parts
    uses: yaourdt/mgos-combine-action@v0.0.1
    with:
      zipfile: ./build/fw.zip
      output: my-device-firmware.bin
      args: -s 4096

  - name: Upload Binary Artifact
    uses: actions/upload-artifact@v2
    with:
      name: production-firmware
      path: ./my-device-firmware.bin
```

## Context and Utility

In the Mongoose OS ecosystem, the `mos` tool usually handles flashing via the ZIP file directly. However, many production environments, factory programming setups, and third-party flashing tools require a raw binary image. This action bridges that gap, providing a bridge between the developer-friendly ZIP format and the production-ready binary format within the safety of a CI/CD pipeline.
