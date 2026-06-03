---
title: cmsis-svd-srcgen
summary: A source code generator that transforms ARM CMSIS SVD specifications into
  register and bitfield definitions for C, Assembly, and Clojure. It automates the
  creation of hardware header files by parsing manufacturer-provided peripheral descriptions,
  supporting features like peripheral filtering and derived register sets.
codeUrl: https://github.com/postspectacular/cmsis-svd-srcgen
isShow: false
rtos: cmsis
libraries: []
topics:
- arm
- cmsis
- codegen
- svd
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- cmsis-parser
- stm32-bare-metal-code-generator
- svdsuite
- development-utils
- rtduino-pinout-generator
- torch2cmsis
---

### Bridging the Gap Between Hardware Specs and Source Code

When developing for ARM Cortex-M microcontrollers, one of the most tedious and error-prone tasks is manually defining peripheral register addresses, offsets, and bitfield masks. While manufacturers provide System View Description (SVD) files—an XML-based standard for describing the hardware capabilities of a device—translating these into usable header files for a specific programming language can be a significant hurdle. 

**cmsis-svd-srcgen** is a specialized tool designed to solve this problem. It acts as a source code generator that consumes ARM CMSIS SVD specifications and outputs structured definitions for various target languages, including C, Assembly (GCC flavor), and Clojure. By leveraging XSLT 2.0, the project provides a flexible way to turn hardware descriptions into code that developers can immediately use in their firmware projects.

### Key Features and Capabilities

The tool is designed to be lightweight yet powerful, focusing on the core requirements of low-level hardware abstraction:

*   **Multi-Language Support**: Currently supports C, Assembly, and Clojure, with the ability to add new languages by defining simple XSLT stub files.
*   **Comprehensive Definitions**: Generates peripheral base addresses, sub-register offsets, reset values, and bitfield shift/mask constants.
*   **Derived Peripheral Support**: Many SVD files use a "derivedFrom" attribute to avoid redundancy (e.g., multiple UARTs with the same register layout). This tool correctly handles these relationships, generating replicated register sets with the appropriate base address offsets.
*   **Granular Filtering**: Because SVD files for modern MCUs can be massive, the tool allows users to include or exclude specific peripherals using the `only` and `excl` parameters. This helps keep generated files manageable and reduces compilation overhead.

### Technical Implementation

The project is built on XSLT (Extensible Stylesheet Language Transformations), specifically requiring an XSLT 2.0 capable processor like **Saxon-HE 9.7+**. The logic is split into a `common.xsl` file containing the core parsing logic and language-specific stylesheets (`lang-c.xsl`, `lang-asm.xsl`, etc.) that handle the formatting for each target.

### Usage and Workflow

To use the generator, you need a Java 7+ environment and an SVD file for your specific microcontroller (usually available from the chip manufacturer's website or the ARM CMSIS repository). The basic command-line interface is straightforward:

```shell
# Generate C headers for a specific SVD file
./convert c stm32f401.svd > stm32f401_regs.h

# Generate definitions only for specific peripherals to save space
./convert c stm32f401.svd only=GPIOA,GPIOB,USART1 > minimal_regs.h
```

### Example Output

The generated C code follows a predictable naming convention that makes it easy to integrate into existing drivers. For example, a GPIO peripheral definition might look like this:

```c
/****************************************************************
 * STM32F401x SVD peripherals & registers
 ****************************************************************/

#ifndef _CMSIS_SVD_H
#define _CMSIS_SVD_H

#define GPIOD 0x40020c00
#define GPIOD_MODER (GPIOD + 0x0) // GPIO port mode register
#define GPIOD_MODER_OFFSET 0x0
#define GPIOD_MODER_RESET 0x00000000
#define GPIOD_MODER_MODER15 (0x3 << 30)
#define GPIOD_MODER_MODER15_SHIFT 30

// ... additional registers and fields

#endif
```

By automating this process, `cmsis-svd-srcgen` ensures that your register definitions are 100% accurate to the manufacturer's specification, eliminating a common source of bugs in embedded development.
