---
title: seL4 Microkernel Website
summary: The official web presence and documentation hub for the seL4 microkernel,
  the world's first operating system kernel with a formal mathematical proof of implementation
  correctness. It serves as a comprehensive resource for the seL4 ecosystem, covering
  hardware support, development tools, and industrial use cases.
slug: sel4-microkernel-website
codeUrl: https://github.com/seL4/website
siteUrl: https://sel4.systems
star: 3
lastUpdated: '2025-12-20'
rtos: sel4
topics:
- microkernel
- proof
- sel4
- verification
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- the-sel4-white-paper
- awesome-provable
- sel4-ci-actions-and-workflows
- advanced-operating-system-2017-sos
- sel4-kernel-101
- echronos-on-stm32f4x-nucleo-board
---

The seL4 website repository contains the source code for the official portal of the seL4 microkernel project. As the central hub for the world's most highly assured operating system, the site provides critical information regarding formal verification, performance benchmarks, and the growing ecosystem of tools and frameworks surrounding the kernel.

## A Hub for High-Assurance Computing

The website serves as the primary gateway for developers, researchers, and industrial partners to understand the unique value proposition of seL4. It highlights the kernel's status as both the world's most highly assured and fastest operating system kernel. The content focuses on the formal mathematical proofs that ensure seL4 behaves exactly as specified, enforcing strong security boundaries for applications while maintaining the high performance required for deployed systems.

## Ecosystem and Tooling

A significant portion of the site is dedicated to the tools and frameworks that make seL4 accessible to developers. This includes documentation and overviews for:

- **Microkit**: A high-performance SDK and abstraction layer for statically architected systems.
- **CAmkES**: A component-based development and runtime framework for embedded static systems.
- **sDDF**: A verifiable device driver framework providing interfaces for high-performance encapsulated drivers.
- **Language Support**: Information on using C, C++, Rust, and even MicroPython on top of the microkernel.

## Hardware and Platform Support

The site provides an extensive overview of the hardware platforms supported by seL4. The kernel is designed to run on hardware ranging from small IoT boards to server-class machines. Supported architectures include:

- **Arm**: Comprehensive support for AArch32 and AArch64.
- **RISC-V**: Support for both 32-bit and 64-bit variants.
- **x86**: Support for Intel architectures including virtualization and SMP multicore configurations.

The documentation clarifies the verification status for different configurations, helping users understand which platforms offer the full benefits of seL4's formal proofs.

## Real-World Applications

The "seL4 in use" section showcases the kernel's impact across critical sectors. The site documents how seL4's isolation properties are applied in aerospace, automotive, and defense. Notable examples include protecting DARPA drones against hackers, securing Boeing's Unmanned Little Bird helicopter, and being utilized in mass-produced electric vehicles like NIO's ONVO L60.

## Technical Architecture of the Site

The website itself is a modern static site project built with the following stack:

- **Jekyll**: The static site generator used for content management and Liquid templating.
- **Tailwind CSS**: Used for responsive and maintainable styling.
- **Makefile**: A comprehensive build system that handles dependency installation (via rbenv for Ruby and nvm for Node.js), site generation, and validation.
- **Validation Tools**: Includes scripts for HTML5 compliance and link checking to ensure a high-quality user experience.

Interestingly, the project includes a specialized build target (`make on_seL4`) for hosting the site on seL4 itself, including an additional footer with links describing the specific setup for self-hosting on the microkernel.
