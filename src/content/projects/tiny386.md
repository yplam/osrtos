---
title: Tiny386
summary: Tiny386 is a highly portable x86 PC emulator written in C99, designed to
  run 16/32-bit software and operating systems like Windows 9x/NT and Linux. It features
  a custom i386 CPU core and emulates a wide range of vintage hardware peripherals,
  making it capable of booting legacy OSs on modern microcontrollers like the ESP32-S3.
slug: tiny386
codeUrl: https://github.com/hchunhui/tiny386
siteUrl: https://hchunhui.github.io/tiny386
version: continuous
lastUpdated: '2026-03-30'
licenses:
- BSD-3-Clause
rtos: freertos
libraries:
- lwip
topics:
- emulator
- esp32
- x86
isShow: false
createdAt: '2026-03-31'
updatedAt: '2026-03-31'
---

## Bringing the 386 Era to Modern Microcontrollers

Tiny386 is an ambitious x86 PC emulator that prioritizes portability and simplicity. Written in C99, it provides a functional environment capable of booting classic operating systems—including Windows 95, Windows NT, and modern Linux kernels—on hardware as constrained as an ESP32-S3 microcontroller. While many emulators focus on high-performance virtualization, Tiny386 focuses on a "built-from-scratch" approach that fits a complete i386 CPU emulator into approximately 6,000 lines of code.

## Technical Architecture and CPU Emulation

At the heart of the project is a custom i386 CPU core. While it omits some complex features like hardware tasking and certain permission checks, it is robust enough to run most 16-bit and 32-bit software. To support more modern software requirements, the developer has integrated specific 486 and 586 instructions. For applications requiring floating-point math, an optional x87 FPU emulator is also included.

The project isn't just a CPU; it provides a complete PC ecosystem by porting essential peripherals from established projects like TinyEMU and QEMU. The emulated hardware suite includes:

*   **Interrupt and Timing:** 8259 PIC and 8254 PIT.
*   **Input/Output:** 8042 Keyboard Controller and CMOS RTC.
*   **Graphics:** ISA VGA with Bochs VBE support.
*   **Storage:** IDE Disk Controller and 8257 ISA DMA.
*   **Networking:** NE2000 ISA Network Card.
*   **Audio:** PC Speaker, SoundBlaster 16, and optional Adlib OPL2 via the fmopl library.

## Firmware and Booting

Tiny386 utilizes SeaBIOS for its standard BIOS and VGABIOS needs. However, it also offers a streamlined path for Linux users. By using a small stub code called `linuxstart` (inspired by JSLinux), the emulator can boot a Linux kernel directly, bypassing the traditional BIOS sequence to save time and resources.

## ESP32 Port and Embedded Integration

The most striking feature of Tiny386 is its ability to run on ESP32-S3 and ESP32-P4 hardware. Using the ESP-IDF framework, the project targets boards like the JC3248W535 and Elecrow CrowPanel. In these embedded environments, the emulator handles display output via SPI/parallel LCDs and manages storage through SD cards formatted with FAT or exFAT.

For input on embedded devices, the project includes a unique utility called `wifikbd`. This allows users to forward keyboard and mouse events from a PC to the ESP32 over a Wi-Fi connection, solving the physical input limitations of small development boards.

## Configuration and Flexibility

The emulator is highly configurable through a standard `.ini` file. Users can define memory sizes (typically 32MB for the system and 2MB for VGA), map disk images (floppy, hard disk, or CD-ROM), and toggle CPU generations (386 through 686). 

```ini
[pc]
bios = bios.bin
vga_bios = vgabios.bin
mem_size = 32M
hda = win95.img

[cpu]
gen = 3
fpu = 1
```

Whether running on a standard Linux desktop using SDL or rawdraw, or acting as a firmware application on an ESP32, Tiny386 demonstrates the power of minimalist, portable C code in bridging the gap between legacy computing and modern embedded systems.
