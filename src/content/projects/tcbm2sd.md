---
title: TCBM2SD
summary: TCBM2SD is an SD-based mass storage solution and 1551 paddle replacement
  for the Commodore C16, C116, and Plus/4. It simulates the TCBM bus protocol of the
  1551 disk drive using an Arduino Mini Pro and a CPLD, supporting high-speed loading
  and standard CBM DOS commands.
slug: tcbm2sd
codeUrl: https://github.com/ytmytm/plus4-tcbm2sd
version: v1.1-release
lastUpdated: '2026-01-23'
image: /202604/plus4-tcbm2sd_0.avif
rtos: ''
topics:
- arduino-mini-pro
- cbm
- commodore
- commodore-plus4
- commodore116
- commodore16
- cpld
- plus4
- sd2iec
- sdcard
- sdcard-arduino
- tcbm
- verilog
isShow: true
createdAt: '2026-04-08T23:51:33+00:00'
updatedAt: '2026-04-08T23:51:33+00:00'
---

TCBM2SD is a multi-purpose hardware project designed for the Commodore C16, C116, and Plus/4 series. Created by Maciej 'YTM/Elysium' Witkowiak, it serves as both a modern replacement for the CBM 1551 paddle cartridge and a mass storage device using an SD card. By interfacing with the computer's expansion port, it simulates the behavior of a TCBM (Tape/Commodore Bus Manual) bus 1551 disk drive.


## Drive Simulator Capabilities

Rather than performing cycle-exact emulation of the 1551 hardware, TCBM2SD simulates its functional behavior. This approach allows for broad compatibility with standard Kernal operations while offering significant performance improvements. Key features include:

*   **File Support**: Native DLOAD and DSAVE support for files on the SD card.
*   **Disk Images**: Read-only support for common Commodore disk images (D64, D71, D81, D80, D82), which are handled as subdirectories.
*   **Performance**: Standard Kernal transfers operate at approximately 3100 b/s, which is roughly twice as fast as an original 1551. The integrated fastloader reaches speeds of 9300 b/s—about 6 times faster than a 1551 and 23 times faster than a standard 1541 drive.
*   **Embedded Booter**: A fastload booter is stored in flash and can be triggered by loading the `*` file, which automatically runs `BOOT.T2SD` from the root directory.
*   **CBM DOS Compatibility**: Supports standard disk commands including `CD`, `R`, `S`, `MD`, `RD`, `I`, `UI`, and `UJ`, along with utility commands for device number changes and block-level access.

![tcbm2sd installed in Plus/4 expansion port](/202604/plus4-tcbm2sd_1.avif)

## Hardware and Paddle Replacement

TCBM2SD is designed with a low part count, utilizing a CPLD, a 3.3V voltage regulator, and four capacitors. The CPLD integrates the logic for the PLA 251641-3 and the 6523T (28-pin triport). This design allows the device to function as a standalone paddle replacement for a real 1551 drive; in this configuration, the Arduino can be disabled or removed entirely.

![tcbm2sd populated PCB](/202604/plus4-tcbm2sd_2.avif)

The hardware design improves upon the original PLA equations, ensuring the paddle occupies only eight I/O addresses (FEF0-FEF7 for device 8 and FEC0-FEC7 for device 9). The device number can be permanently stored in EEPROM or configured via physical jumpers.

## Platform for Development

Beyond its use as a storage device, TCBM2SD serves as a development platform for future TCBM bus projects. All TCBM bus signals are exposed at the cartridge edge and the Arduino footprint. Because the signals are already converted to 3.3V logic, the board can be used to interface with modern microcontrollers or single-board computers like the Raspberry Pi without additional level shifters. This makes it an ideal starting point for porting projects like Pi1551 or sd2iec to the TCBM bus.

## Software Ecosystem

The project is supported by a variety of software tools and patches. This includes compatibility with Siz's I/O library v4, a dedicated GEOS build for TCBM2SD, and a collection of patched disk games optimized for the hardware. The repository provides all necessary files for manufacturing the PCB (Gerbers) and compiling the firmware for the Arduino and CPLD components.
