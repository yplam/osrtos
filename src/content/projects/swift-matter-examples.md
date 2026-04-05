---
title: Swift Matter Examples
summary: A collection of example applications for building Matter-compatible smart
  home devices using Embedded Swift on ESP32 microcontrollers. It utilizes the ESP-IDF
  framework, the ESP-Matter SDK, and the NimBLE Bluetooth stack to create secure,
  interoperable IoT solutions with a modern programming language.
slug: swift-matter-examples
codeUrl: https://github.com/swiftlang/swift-matter-examples
siteUrl: https://swiftlang.github.io/swift-matter-examples/tutorials/tutorial-table-of-contents/
lastUpdated: '2025-12-24'
licenses:
- Apache-2.0
rtos: freertos
libraries:
- lwip
- nimble
topics:
- embedded
- esp32
- example
- homekit
- matter
- swift
isShow: false
createdAt: '2026-04-05T01:05:12+00:00'
updatedAt: '2026-04-05T01:05:12+00:00'
---

## Bringing Swift to the World of Matter

Embedded systems have traditionally been the domain of C and C++. While these languages offer the performance required for microcontrollers, they often lack the modern safety features and expressive syntax found in higher-level languages. The Swift Matter Examples repository showcases a significant shift in this landscape, demonstrating how Embedded Swift can be used to build sophisticated, secure smart home accessories using the industry-standard Matter protocol.

Associated with Apple's WWDC24 session "Go small with Embedded Swift," this project serves as a bridge between high-level application development and low-level firmware engineering. It provides a practical roadmap for developers looking to harness the safety and expressivity of Swift in environments where every byte of memory counts.

## The Power of Embedded Swift

Embedded Swift is a subset of the Swift language tailored specifically for resource-constrained environments. It retains the core features that make Swift popular—generics, value types, and robust error handling—while eliminating the overhead typically associated with a heavy runtime. This makes it an ideal candidate for microcontrollers like the ESP32-C6 and ESP32-C3, where memory and processing power are at a premium.

By leveraging C++ interoperability, these examples allow developers to call directly into the underlying ESP-IDF and ESP-Matter SDKs. This means you can use the high-level abstractions of Swift to manage complex Matter clusters and attributes while still relying on the battle-tested performance of Espressif's C-based drivers and the FreeRTOS kernel.

## Building for the Matter Standard

Matter is the industry-unifying standard for smart home devices, designed to ensure that products from different manufacturers work together seamlessly. This project provides a practical implementation of a Matter smart light, which can be commissioned and controlled via ecosystems like Apple HomeKit.

The architecture follows a layered approach:
- **Application Layer**: Written in Swift, handling the logic for device state and user interaction.
- **Matter Stack**: Utilizing the Project CHIP (Connected Home over IP) implementation to manage device models and attributes.
- **Network Layer**: Running on IPv6 via the lwIP stack and utilizing NimBLE for Bluetooth Low Energy (BLE) commissioning.
- **Hardware Abstraction**: Built on the Espressif IoT Development Framework (ESP-IDF), targeting RISC-V microcontrollers.

## Project Highlights

The repository includes several distinct projects to help developers explore different levels of complexity:

### Smart Light
A full-featured example of a dimmable light bulb that implements the Matter lighting cluster. It demonstrates how to handle attribute updates and respond to commands from a Matter controller. The implementation highlights how Swift's type system can make the management of complex Matter data models more intuitive.

### LED Blink
A simpler "Hello World" style example that focuses on the basics of GPIO control. It serves as an excellent starting point for understanding how the Swift compiler integrates with the ESP-IDF build system and how to interface with hardware drivers using C++ interoperability.

### Empty Template
A clean slate for developers looking to start their own Matter-enabled projects from scratch. It includes the necessary CMake configurations and SDK defaults to bootstrap a new application quickly.

## Technical Integration

Integrating Swift into an existing C-based build system like ESP-IDF requires specialized configuration. The projects use CMake to coordinate the build process, invoking the Swift nightly toolchain with specific flags for the RISC-V target. The `sdkconfig` files are pre-configured to enable the necessary networking components, including the NimBLE stack for BLE and mbedTLS for secure communication.

One of the most interesting aspects of this project is how it manages the binary footprint. By using Embedded Swift's specialized optimization flags and a "no-runtime" approach, the resulting firmware remains small enough to fit comfortably on the 4MB flash storage typical of ESP32 development kits, even while including the comprehensive Matter protocol stack and a full IPv6 networking implementation.
