---
title: Blazing ASM
summary: Blazing ASM is a lightweight, C++20 header-only assembler library designed
  for high-performance x86-64 machine code generation. It allows developers to construct
  raw bytecode sequences at either compile-time or runtime with minimal overhead,
  making it particularly suitable for shellcode development and low-level system programming.
slug: blazing-asm
codeUrl: https://github.com/0x1c1101/blazing_asm
star: 142
lastUpdated: '2025-08-13'
licenses:
- GPL-3.0
libraryType: Language
createdAt: '2026-01-13'
updatedAt: '2026-03-17'
---

### Features


- Supports the majority of significant Intel x86-64 architecture instructions including data movement, arithmetic, and control flow.

- Provides a static mode using 'assemble_static' for zero-overhead, compile-time machine code generation.

- Offers a dynamic mode using 'assemble' for runtime instruction encoding with support for dynamic operands.

- Operates without the C++ Standard Template Library (STL), ensuring compatibility with kernel driver projects.

- Implemented as a single C++ header file for trivial integration into existing projects.

- Utilizes C++20 features and template-focused design to achieve high-speed instruction encoding.

- Supports memory operand proxy structs (MEM.QWORD, MEM.DWORD, etc.) for type-safe memory addressing.

- Employs operator overloading to provide an assembly-like syntax for base, index, scaling, and displacement calculations.

- Includes a label system for control flow instructions like JCC, JMP, and CALL using BIND and Label macros.

- Supports 32-bit register mode overrides in 64-bit memory operands via the MEM32 proxy.

- Provides raw byte injection capabilities through the DB(...) instruction for custom data placement.

- Handles relative memory addressing using RIP and EIP registers within memory operands.

- Includes support for scaling factors (2, 4, 8) via the ScalingSize enum to prevent register value loss during arithmetic.

- Allows for signed immediate operands for displacement calculations in control flow instructions.

- Generates raw, fixed-size machine instructions directly into static arrays without runtime memory management.



Blazing ASM is architected as a template-heavy, header-only framework that leverages C++20's compile-time capabilities to transform high-level C++ expressions into raw x86-64 machine code. The library's core design revolves around two primary emission modes: a static mode that uses `constexpr` evaluation to produce bytecode at compile-time, and a dynamic mode that allows for runtime variable injection while maintaining high performance through inlined encoding logic. By avoiding dependencies on the STL, the architecture is suitable for freestanding environments, such as OS kernels or embedded firmware.

The system utilizes a proxy-based operand model where registers, immediates, and memory locations are represented as distinct types. Memory operands are handled through a specialized proxy struct (`MEM`) that uses operator overloading to mimic standard assembly syntax for SIB (Scale, Index, Base) addressing. This allows the compiler to validate instruction formats and operand sizes during the compilation phase, reducing the likelihood of generating invalid machine code.

**Core Components**
- **Static Emitter**: A `constexpr` engine that generates fixed `std::array` bytecode at compile-time.
- **Dynamic Emitter**: A runtime engine that handles dynamic values and label resolution via a simplified hash map.
- **Operand Proxies**: Type-safe representations for 8, 16, 32, and 64-bit registers and memory pointers.
- **Label Manager**: A mechanism for binding and resolving branch targets within shellcode sequences.

### Use Cases
This library is ideal for:
- **Exploit Development**: Rapidly constructing and mutating shellcode with precise control over instruction-level byte sequences.
- **Kernel Programming**: Generating machine code within environments where the standard library is unavailable and minimal overhead is required.
- **Code Obfuscation**: Implementing low-level code mutation and obfuscation techniques by dynamically generating instructions at runtime.
- **Security Research**: Developing penetration testing tools that require on-the-fly generation of specific x86-64 instruction patterns.

### Getting Started
To integrate Blazing ASM, download the `blazing_asm.hpp` header and include it in your C++20 project. The library is designed for simplicity; you can begin emitting code by calling `basm::assemble_static` for compile-time arrays or `basm::assemble` for runtime generation. Detailed usage examples for memory operands, labels, and various instruction categories are provided in the [DOCUMENTATION.md](https://github.com/0x1c1101/blazing_asm/blob/main/DOCUMENTATION.md) file. For optimal performance, it is recommended to use precompiled headers to minimize the impact of the template-heavy logic on compilation times.
