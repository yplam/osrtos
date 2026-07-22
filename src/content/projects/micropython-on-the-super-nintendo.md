---
title: MicroPython on the Super Nintendo
summary: This project ports MicroPython v1.28.0 to the Super Nintendo Entertainment
  System (SNES), enabling the compilation and execution of Python code directly on
  its 3.58 MHz 65816 processor. It features a custom bare-metal layer, a battery-backed
  SRAM filesystem, and integrations for sprite-based gaming and graphical user interfaces.
slug: micropython-on-the-super-nintendo
codeUrl: https://github.com/FabianKuebler/micropython-snes
lastUpdated: '2026-07-06'
licenses:
- MIT
rtos: ''
libraries:
- micropython
topics:
- '65816'
- emulation
- micropython
- python
- retrocomputing
- snes
isShow: false
createdAt: '2026-07-20T10:47:49+00:00'
updatedAt: '2026-07-20T10:47:49+00:00'
---

## Bringing Python to 16-bit Legend

Running a modern Python environment on hardware from 1990 is no small feat. This project brings MicroPython v1.28.0—complete with its lexer, compiler, and virtual machine—to the Super Nintendo Entertainment System. Operating on a stock 3.58 MHz 65816 processor with a 56 KB heap, it doesn't just run pre-compiled bytecode; it actually compiles Python source code on the SNES itself. The port is highly compatible, passing nearly 92% of MicroPython's standard `tests/basics` suite on emulated hardware.

## A Portable SNES Workstation

The project is packaged into several distinct ROM images, each showcasing a different capability of the port. The flagship experience is "mpyos," a workstation-like environment that boots into a C-based file manager. This system leverages the 32 KB battery-backed cartridge SRAM as a persistent filesystem, allowing Python scripts to survive power-off cycles. It even includes a full-screen editor and an on-screen keyboard, turning the SNES into a self-contained development environment where you can write and run code using only a game controller.

For those looking for a more traditional MicroPython experience, the standalone REPL provides an interactive 32×28 text console. There are also specialized ROMs demonstrating high-level library support, such as a port of the Stage game library mapped to the SNES PPU and nano-gui widgets rendering through a `framebuf`-backed driver.

## Technical Architecture and Hardware Mapping

The port sits on a custom bare-metal layer that handles the specifics of the SNES hardware. This includes:

- **Graphics**: Tile banks in VRAM are shared between backgrounds and objects, with grids mapped to hardware tilemaps and sprites managed via OAM entries. The Stage library port uses one-vblank DMA flips for smooth performance.
- **Memory**: The system utilizes console WRAM for the 56 KB Python heap and cartridge SRAM for file storage.
- **I/O**: Standard SNES controllers are used for navigation and typing, while a WRAM mailbox protocol allows for headless testing and communication with emulators like Mesen2.

## The Engineering Challenge: 16-bit Pointers and Compiler Bugs

Porting a codebase designed for modern 32-bit and 64-bit systems to a 16-bit architecture revealed significant hurdles. The project surfaced 23 root-caused bugs in the Calypsi 65816 toolchain and identified several upstream MicroPython issues related to 16-bit truncation and Garbage Collector (GC) root tracking that were previously invisible on more powerful targets.

One of the most persistent issues involved memory alignment. Because the compiler occasionally ignored alignment attributes on struct members, objects in ROM that landed on odd addresses were incorrectly decoded by MicroPython’s object representation logic. This led to "layout-sensitive miscompiles" that were eventually resolved through custom link-time checks and alignment fences.

To further accommodate the compiler and the architecture, the MicroPython VM was split into per-opcode handler functions. This "split VM" approach bypassed complex compiler bugs triggered by the original massive switch-case statement and setjmp-based exception handling, ensuring the VM remains stable on the 65816.

## Testing and Reliability

Reliability is maintained through a rigorous testing harness using the Mesen2 emulator. A WRAM mailbox protocol allows a host-side pytest suite to feed scripted stdin and joypad input into the ROM. The ROM then writes its transcript and exit status back into WRAM for the host to assert. This automated pipeline ensures that the complex interplay between the Python VM, the C port, and the underlying 65816 assembly remains functional across updates.
