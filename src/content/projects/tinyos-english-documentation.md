---
title: TinyOS English Documentation
summary: A documentation repository for the TinyOS operating system, containing TinyOS
  Enhancement Proposals (TEPs) and architectural overviews. It includes a build system
  to generate documentation in HTML and PDF formats from reStructuredText sources.
slug: tinyos-english-documentation
codeUrl: https://github.com/mlbo/TinyOSDocEn
star: 0
lastUpdated: '2019-01-04'
rtos: tinyos
topics:
- tinyos
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- wireless-sensor-network-and-tinyos-documentation
- tinyos-nesc-telosb-programs
- homebrew-tinyos-for-msp430
- tinyos-installation-guide-for-windows
- lennyos-tinyos
- blinker-iot-documentation
---

## Overview

TinyOS is a pioneering component-based, event-driven operating system designed specifically for low-power wireless devices, such as those used in sensor networks, ubiquitious computing, and smart buildings. The `TinyOSDocEn` repository serves as a critical resource for developers and researchers, providing the English-language documentation and technical specifications for the TinyOS ecosystem.

This repository is derived from the official `tinyprod` sources and is primarily used as a learning and reference tool for understanding the inner workings of TinyOS 2.x. It centralizes the TinyOS Enhancement Proposals (TEPs), which are the formal documents describing the design, protocols, and interfaces of the system.

## Technical Documentation Structure

The documentation is authored using reStructuredText (RST), a lightweight markup language. This approach allows the documentation to be maintained as plain text while being easily convertible into various rich formats. The repository is organized into several key directories:

- **txt/**: Contains the source files for the documentation, including the general overview and the individual TEP files.
- **html/**: The destination for generated web-based documentation.
- **pdf/**: The destination for generated LaTeX-based PDF documents.
- **stylesheets/**: Contains CSS files that define the visual presentation of the generated HTML documents.

## Build System and Generation

To ensure that the documentation is accessible in multiple formats, the project employs a flexible build system. It supports two primary methods for generating the final output:

### Makefile Integration
The provided `Makefile` uses `rst2html` and `rst2latex` from the Docutils suite. By running standard make commands, users can compile the text sources into styled HTML pages or LaTeX files, which are then processed into PDFs using `pdflatex`. This is the preferred method for developers working in a Unix-like environment.

### Ant Build Support
For environments where Java-based tools are preferred, the project includes a `build.xml` file. This allows Apache Ant to orchestrate the build process, calling the underlying Makefile to generate both HTML and PDF versions of the documentation.

## Key Content: TEPs

The heart of this repository is the collection of TEPs. These documents are essential for anyone looking to contribute to TinyOS or build complex applications on top of it. They cover a wide range of topics, including:

- Hardware Abstraction Architecture (HAA)
- Network protocols and routing
- Resource arbitration and power management
- Boot sequences and system initialization

By providing the tools to build these documents locally, the repository ensures that developers have offline access to the high-level design principles and low-level API specifications that define the TinyOS environment.
