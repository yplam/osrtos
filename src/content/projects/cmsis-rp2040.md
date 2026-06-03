---
title: cmsis-rp2040
summary: A project template for the Raspberry Pi Pico (RP2040) that integrates the
  Open-CMSIS-Pack ecosystem with the official Pico SDK. It automates toolchain setup
  using vcpkg and PowerShell, allowing developers to use CMSIS-Pack tools like csolutions
  for RP2040 development.
codeUrl: https://github.com/cinnamondev/cmsis-rp2040
isShow: false
rtos: cmsis
libraries:
- lvgl
topics:
- cmsis
- embedded
- ili9341
- ili9341-pico
- pico
- powershell
- raspberry-pi-pico
- rp2040
- templates
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- rp2040-freertos-template
- pico-zephyr-project
- lvgl-port-for-raspberry-pi-pico-mdk-arm
- pico-rtic-template
- pico-demos-for-rp2040
- micropico-visual-studio-code-extension
---

Setting up a development environment for the Raspberry Pi Pico (RP2040) often involves manually installing the ARM GCC compiler, CMake, Ninja, and various SDK dependencies. The **cmsis-rp2040** project aims to streamline this process by providing a template that bridges the gap between the official Raspberry Pi Pico SDK and the Open-CMSIS-Pack ecosystem.

### Modernizing the RP2040 Workflow

This project allows developers to use Open-CMSIS-Pack tools—such as `csolution` and software packs—with the Pico SDK with minimal friction. By leveraging the modern CMSIS build system, developers can manage project configurations through YAML files (`picopico.csolution.yaml` and `picopico.cproject.yaml`), which is a significant shift from traditional, often complex CMakeLists.txt management.

One of the standout features of this template is its use of `vcpkg` for bootstrapping. Instead of requiring the user to manually install compilers and build tools, the provided PowerShell scripts (`bootstrap.ps1` and `buildgen.ps1`) handle the heavy lifting. This ensures that the ARM GCC compiler, Open-CMSIS-Pack devtools, CMake, and Ninja are all localized within the build environment, reducing "it works on my machine" syndrome.

### Getting Started

The template includes a simple blink program to verify the toolchain. To get started, users need to clone the repository and initialize the submodules to pull in the `pico-sdk`:

```bash
git submodule update --init --recursive
```

Building the project is handled via a PowerShell script, which abstracts the underlying complexity of the build system:

```bash
powershell .\buildgen.ps1 -BuildTarget Debug -TargetProject picopico 
```

The script even supports linking additional Pico SDK libraries on the fly using the `-link_libs` argument. Once the build is complete, a `.uf2` file is generated in the `./build/debug/` directory, ready to be flashed onto the Pico.

### Technical Architecture

The project is structured to support the Open-CMSIS-Pack suite, which is licensed under Apache 2.0. This suite is designed for portability and modularity in embedded software. By integrating this with the RP2040, the project opens up the possibility of using a wide array of CMSIS software packs for middleware and drivers that might not be natively part of the Pico SDK.

For those looking for more advanced implementations, the project also references a `demo-lvgl` branch. This demo provides a template for a Light and Versatile Graphics Library (LVGL) project, including a driver for the ILI9341 display controller, demonstrating how the template can be extended for complex UI-driven applications.

### Future Development

While the project is functional, it is currently listed as a work-in-progress. Planned features include improved debug mode support via Picoprobe and enhanced input sanitization for the build scripts. Despite being developed primarily on Windows, the use of PowerShell (which is now cross-platform) suggests that the environment is intended to be portable to Linux systems as well.
