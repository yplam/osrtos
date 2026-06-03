---
title: TCF (Test Case Framework)
summary: A comprehensive test automation framework designed to simplify the creation
  and execution of tests across diverse hardware platforms. It provides a client-server
  architecture for managing remote hardware targets, automated building, flashing,
  and execution, with specialized support for the Zephyr RTOS.
slug: tcf-test-case-framework
codeUrl: https://github.com/intel/tcf
siteUrl: http://intel.github.io/tcf
star: 25
version: v0.15
lastUpdated: '2025-12-11'
rtos: zephyr
topics:
- automation
- python
- testing-framework
- zephyr
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- icetea-test-framework
- tock-test-harness
- swedish-embedded-platform-sdk
- ferros-fancy-test
- remote-flash-and-test-for-bl602-bl604-nuttx
- bridle
---

## Overview

TCF (Test Case Framework) is a powerful system designed to simplify the creation and execution of automated test cases across a wide variety of hardware platforms. Developed by Intel, TCF aims to reduce the setup effort required by software, QA, and release engineers, as well as CI/CD systems. It provides a unified interface to discover, manage, and execute unit, integration, and end-to-end tests on local hosts or remote target hardware.

The system is built around a client-server architecture that allows developers to share expensive or complex hardware resources efficiently. By abstracting the hardware interaction, TCF enables engineers to focus on test logic rather than the mechanics of power cycling, flashing, or connecting to serial consoles.

## System Architecture

TCF consists of two primary components that work in tandem to manage the testing lifecycle:

- **tcf (The Client):** A command-line utility and test runner used by developers and CI agents. It manages test targets exported by brokers and executes test cases. It handles the logic of selecting suitable targets based on metadata and evaluating test results.
- **ttbd (The Server):** The Test Target Broker Daemon manages the physical or virtual hardware connected to it. It acts as a proxy, allowing multiple users to acquire, configure, and operate on targets remotely.

## Deep Integration with Zephyr RTOS

One of TCF's standout features is its robust support for the Zephyr RTOS. The framework includes specialized drivers and builders that understand Zephyr's build system and configuration. This allows TCF to automatically build Zephyr applications, flash them to supported boards (or QEMU instances), and monitor the console output for specific success or failure strings.

For Zephyr developers, TCF can run standard Zephyr sanity checks and samples with a single command. It manages environment variables like `ZEPHYR_BASE` and `ZEPHYR_TOOLCHAIN_VARIANT` internally, ensuring that tests are executed in a consistent environment. It even supports complex multi-architecture testing, allowing a single test case to be validated across x86, ARM, RISC-V, and Xtensa targets simultaneously.

## Key Features and Capabilities

TCF provides a suite of primitives for interacting with embedded hardware:

- **Power Control:** Primitives for powering targets on, off, or performing a power cycle.
- **Deployment:** Tools to flash images, ROMs, or deploy filesystem images to targets.
- **Console Interaction:** Real-time reading and writing to serial consoles to verify system behavior.
- **Debugging:** Support for attaching GDB, resetting CPUs, and running OpenOCD commands.
- **Resource Management:** A sophisticated target acquisition system that prevents conflicts when multiple users or CI jobs need the same hardware.

## Automation with Python

While TCF supports various test formats, its primary automation language is Python. Test cases are defined as Python classes that inherit from the TCF API, providing a clean and extensible way to define test logic. 

```python
import tcfl.tc

@tcfl.tc.target("zephyr_board", app_zephyr = "examples/hello_world")
class _test(tcfl.tc.tc_c):
    def eval(self, target):
        # TCF handles building and flashing automatically
        # We just need to check the output
        target.expect("Hello World!")
```

In this model, the `@tcfl.tc.target` decorator acts as a requirement specification. TCF will scan available targets, find one that matches the "zephyr_board" tag, build the specified application, deploy it, and then run the `eval` function to determine success.

## Community and Documentation

TCF is distributed under the Apache 2.0 license and is designed with a small footprint and minimal dependencies. It focuses strictly on execution, providing clean data feeds for external reporting and coverage analysis tools. Extensive documentation, including quickstart guides for both general use and Zephyr-specific development, is available to help new users set up their own test brokers and client environments.
