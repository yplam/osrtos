---
title: PC-6001mkII Emulator for Raspberry Pi Pico
summary: A comprehensive hardware emulator for the NEC PC-6001mkII and PC-6601 series
  running on the Raspberry Pi Pico. It utilizes custom PIO state machines for VGA
  and audio generation, supports LittleFS for storage, and offers high-fidelity sound
  emulation via the fmgen library.
slug: pc-6001mkii-emulator-for-raspberry-pi-pico
codeUrl: https://github.com/shippoiincho/p6mk2emulator
lastUpdated: '2025-06-20'
rtos: ''
libraries:
- littlefs
topics:
- raspberry-pi-pico
- retrocomputing
isShow: false
createdAt: '2026-04-04T00:49:34+00:00'
updatedAt: '2026-04-04T00:49:34+00:00'
---

The NEC PC-6001mkII, a beloved 8-bit machine from the early 1980s, finds a new home on the Raspberry Pi Pico. This emulator project transforms the RP2040 microcontroller into a functional PC-6001mkII, complete with support for its successor models like the PC-6601 and the "SR" variants. It is a highly technical implementation that leverages the unique features of the RP2040, particularly its Programmable I/O (PIO) blocks, to handle demanding tasks like VGA signal generation and audio synthesis.

### Hardware Integration and VGA Output

One of the standout features of this emulator is its use of PIO state machines to drive a VGA display. By utilizing six GPIO pins for color (two bits per RGB channel) and two for synchronization, it achieves a 16-color output that can even be configured to emulate the 64-color palette of the original PC-6001. The project includes specialized PIO programs for horizontal and vertical sync, as well as RGB data streaming, ensuring precise timing that matches VGA standards. Because the emulator maps 1 pixel to 1 byte of internal memory, it can handle the specific resolution requirements of the mkII and SR models, including the 80-column text modes.

### Sound Synthesis and Audio Options

Audio is a critical part of the retro experience. This emulator provides two distinct paths for sound production. By default, it uses PWM output for the original PSG sound. However, for enthusiasts seeking higher fidelity, it supports the `fmgen` library to emulate both the PSG and the YM-2203 (OPN) FM sound chip. When using `fmgen`, the project can output high-quality audio via an I2S DAC (such as the PCM5102A), utilizing a dedicated PIO-based I2S transmitter. Recent updates have even added support for the PC-6001's famous speech synthesis features when using I2S output.

### Storage and ROM Management

Because the Raspberry Pi Pico lacks a physical disk or tape drive, this project utilizes the LittleFS library to create a virtual filesystem within the Pico's onboard flash memory. Users can store tape images (.CAS or .P6) and floppy disk images (.D88) directly on the device. Loading and saving these files is handled through an on-screen menu, accessible via the F12 key. The emulator also supports tape fast-loading to skip the long wait times associated with original hardware.

To comply with copyright, the project does not include original system ROMs. Instead, it provides a framework for users to flash their own ROM files (BASIC, Voice, Character Generator, and Kanji ROMs) to specific addresses in the Pico's flash using `picotool`. The documentation provides specific memory offsets for different hardware versions, ensuring that the emulator can find the necessary system data at runtime.

### Peripheral Support and Connectivity

The emulator supports modern USB keyboards connected via an OTG cable, leveraging the TinyUSB stack. Keys are mapped to the original PC-6001 layout, with special keys like STOP, MODE, and PAGE mapped to Pause/Break, ScrollLock, and PageUp, respectively. For gaming, joystick support is included, making it a complete recreation of the original hardware environment.

### Technical Configuration

The project is highly configurable via C defines in the source code. Developers can choose their target machine and sound engine before compiling:

```cpp
// Choose target machine
#define MACHINE_PC6001MK2
//#define MACHINE_PC6001MK2SR
//#define MACHINE_PC6601
//#define MACHINE_PC6601SR

// Choose sound engine
#define USE_FMGEN
#define USE_I2S
```

Other options include enabling the "Warrior's Cartridge" (Senshi no Cartridge) RAM expansion and optimizing performance for the "SR" high-resolution modes using dual-core processing to handle screen redrawing on Core 1 while the CPU emulation runs on Core 0.
