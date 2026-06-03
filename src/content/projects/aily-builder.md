---
title: Aily Builder
summary: A high-performance Arduino compilation CLI tool that utilizes the Ninja build
  system and Tree-sitter syntax parsing to achieve significantly faster build times
  than Arduino CLI or PlatformIO. It features intelligent caching, parallel compilation,
  and a multi-mode linter for precise syntax validation across various hardware platforms
  including ESP32, AVR, and Renesas.
slug: aily-builder
codeUrl: https://github.com/ailyProject/aily-builder
star: 14
lastUpdated: '2026-01-09'
rtos: ''
libraries:
- tft-espi
topics:
- arduino
- avr
- esp32
isShow: false
createdAt: '2026-01-20'
updatedAt: '2026-01-20'
relatedProjects:
- finik-ch32v003-sdk
- mbed-tools
- esp32-p4-jit-dynamic-code-loading-system
- arduino-pico
- sparkminer
- fastled-idf
---

## Introduction

Aily Builder is a specialized compilation tool designed to address the performance bottlenecks often encountered in the Arduino development ecosystem. With the goal of making Arduino development faster and more efficient, it focuses on maximizing CPU utilization and minimizing redundant work during the build process.

## High-Performance Architecture

The core of Aily Builder's speed lies in its modern technology stack. Unlike traditional tools that may rely on simpler dependency detection, Aily Builder uses **Tree-sitter**, a high-performance syntax parsing library. This allows for precise detection of library dependencies by actually understanding the code structure, rather than relying on basic text searches or regex patterns.

For the actual compilation phase, the tool employs the **Ninja build system**. Ninja is designed specifically for speed, focusing on parallel execution to ensure that every available CPU core is utilized. This approach allows Aily Builder to significantly exceed the compilation speeds of the standard Arduino CLI and even PlatformIO, especially in large projects with many dependencies.

## Smart Caching and Incremental Builds

Aily Builder implements a sophisticated caching mechanism to ensure that developers spend less time waiting for builds. By tracking file changes and build artifacts, it avoids recompiling code that hasn't changed.

- **Incremental Builds**: Only modified files and their direct dependents are recompiled, ensuring that small changes result in near-instant updates.
- **Smart Caching**: Build results are stored and reused across sessions. The tool intelligently manages these caches to avoid redundant compilation of core files and external libraries.
- **Cache Management**: The CLI provides built-in tools to view cache statistics and perform cleanup based on file age or specific patterns, helping developers manage disk space effectively.

## Advanced Linting Capabilities

Beyond compilation, Aily Builder includes a powerful `lint` command for syntax analysis. It offers three distinct modes to balance speed and precision:

- **Fast Mode**: A static analysis check that runs in milliseconds (approx. 3-5ms), providing immediate feedback on bracket matching, semicolon checks, and basic syntax validation.
- **Accurate Mode**: A compiler-based validation using GCC for high-precision error detection, type validation, and precise error location.
- **Auto Mode**: A hybrid approach that starts with a fast check and escalates to an accurate check only if issues are detected, optimizing the developer's workflow.

## Getting Started

Aily Builder is a Node.js-based application. Once the repository is cloned and dependencies are installed, users can compile sketches with a single command:

```bash
# Compile an Arduino project for a specific board
ts-node main.ts compile sketch.ino --board arduino:avr:uno --jobs 8
```

The tool supports a wide range of options, including custom SDK paths, additional library directories, serial port specification for uploads, and custom build properties.

## Hardware and Ecosystem Support

While designed for the Arduino ecosystem, Aily Builder is versatile and supports various platforms. It has been tested and includes examples for:

- **AVR**: Standard boards like the Arduino Uno.
- **ESP32**: High-performance IoT modules, including HTTP and S3 variants.
- **Renesas**: Newer boards like the Arduino Uno R4 WiFi.

The project is open-source under the GNU General Public License V3 and leverages the power of the Ninja Build System and Tree-sitter to provide a modern, lightning-fast development experience for the embedded community.
