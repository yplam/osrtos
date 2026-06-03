---
title: Zig on RISC-V BL602 with Apache NuttX RTOS
summary: A comprehensive project demonstrating how to build and run Zig applications
  on the RISC-V BL602 microcontroller using the Apache NuttX RTOS. It covers everything
  from basic 'Hello World' examples to complex LoRaWAN implementations, including
  technical workarounds for ABI compatibility and C-to-Zig translation.
slug: zig-on-risc-v-bl602-with-apache-nuttx-rtos
codeUrl: https://github.com/lupyuen/zig-bl602-nuttx
siteUrl: https://lupyuen.github.io/articles/zig
star: 38
lastUpdated: '2022-10-18'
rtos: nuttx
libraries:
- lvgl
topics:
- bl602
- bl604
- iot
- lora
- lorawan
- nuttx
- pinecone
- pinedio
- riscv32
- zig
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- zig-lvgl-touchscreen-app-on-apache-nuttx-rtos
- visual-programming-for-zig-with-nuttx-sensors
- pinedio-stack-bl604-on-apache-nuttx-rtos
- rust-test-app-for-apache-nuttx-os
- lorawan-test-app-for-apache-nuttx
- stm32l475-freertos-iot-project
---

## Integrating Zig with Apache NuttX

Zig is increasingly recognized for its potential in embedded systems development, offering modern safety features and a powerful build system while maintaining seamless interoperability with C. This project explores the practical application of Zig on the RISC-V BL602 SoC, specifically targeting the Apache NuttX RTOS environment. It serves as a technical guide for developers looking to leverage Zig's capabilities in a real-time operating system context.

## Technical Challenges and Solutions

One of the primary hurdles addressed in this project is the Application Binary Interface (ABI) compatibility between the Zig compiler and the NuttX build system. By default, the Zig compiler may produce object files with a Software Floating-Point ABI, whereas NuttX for BL602 is typically compiled for Hardware Floating-Point. 

The project details a unique workaround involving the modification of the ELF header. By patching byte `0x24` of the compiled object file, the project demonstrates how to align the Zig-generated code with the NuttX environment, allowing for successful linking. This deep dive into the ELF structure highlights the flexibility required when working with emerging toolchains in embedded environments.

## From C to Zig: LoRaWAN Implementation

Beyond simple examples, the project showcases a complex LoRaWAN application ported from C to Zig. This implementation involves over 600 lines of Zig code and demonstrates how to handle advanced C interoperability scenarios, such as:

- **Opaque Types**: Managing complex C structures that contain bitfields, which Zig's auto-translation might not handle directly.
- **Macro Workarounds**: Defining custom Zig logic to bypass C macros that use token concatenation (`##`) or specific suffixes like `LL`.
- **Memory Safety**: Utilizing Zig's safety checks, such as wraparound addition and index-out-of-bounds protection, to create more robust firmware.

## Zig as a Build Tool

The project also explores using the Zig compiler (`zig cc`) as a drop-in replacement for GCC. This approach is tested against existing NuttX libraries, such as the LoRa SX1262 driver. By substituting the standard compiler with Zig's Clang-based frontend, developers can benefit from Zig's simplified cross-compilation capabilities while maintaining compatibility with existing C codebases.

## Hardware and Ecosystem

The examples are designed to run on BL602 and BL604 RISC-V processors, commonly found on boards like the Pine64 PineCone and PineDio Stack. The project demonstrates the full lifecycle of an IoT application, from joining a LoRaWAN network (via gateways like ChirpStack or The Things Network) to transmitting data packets.

### Basic Zig Entry Point

Integrating a Zig application into the NuttX shell (NSH) is straightforward. A typical entry point looks like this:

```zig
const std = @import("std");

pub extern fn printf(_format: [*:0]const u8) c_int;

pub export fn hello_zig_main(_argc: c_int, _argv: [*]const [*]const u8) c_int {
    _ = _argc;
    _ = _argv;
    _ = printf("Hello, Zig!\n");
    return 0;
}
```

This project provides a roadmap for embedded developers to transition from traditional C development to the modern, safety-oriented world of Zig without sacrificing the power and reliability of the Apache NuttX RTOS.
