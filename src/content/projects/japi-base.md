---
title: Japi Base
summary: Japi Base is a hackable retro computer platform for the Raspberry Pi Pico
  2 (RP2350) that provides integrated VGA, PS/2 keyboard, SD storage, and audio capabilities.
  It utilizes a dual-core architecture where I/O management is isolated to one core
  and a single PIO block, leaving the second core and remaining peripherals entirely
  available for user applications. The system features a unified file API using littlefs
  for internal flash and FatFs for external SD cards.
slug: japi-base
codeUrl: https://github.com/JanFromBelgium/japi-base
version: v0.6
lastUpdated: '2026-06-01'
licenses:
- NOASSERTION
image: /202606/japi-base_3.avif
rtos: ''
libraries:
- littlefs
topics:
- embedded
- homebrew-computer
- littlefs
- pico2
- pio
- raspberry-pi-pico
- retrocomputing
- rp2350
- vga
isShow: true
createdAt: '2026-06-02T02:42:01+00:00'
updatedAt: '2026-06-02T02:42:01+00:00'
---

Japi Base is a well-documented foundation for building small-scale computers on the Raspberry Pi Pico 2 (RP2350). It provides the essential I/O infrastructure—video, keyboard, storage, and sound—while maintaining a architecture that keeps the system hackable and educational. By isolating the base I/O engine to Core 1 and a single PIO block, the platform ensures that Core 0 and the remaining hardware resources are completely free for custom user programs.

## Core Features

The system is designed to be genuinely usable with high-quality output and flexible input options. The VGA output provides a 1024×768 resolution at 60 Hz, adhering to exact VESA timings. It supports a text mode of 127 columns by 64 rows with 64 colors available for both foreground and background, utilizing an 8×12 pixel CP437 font. Beyond text, Japi Base includes a character-aligned bitmap window overlaid on the text screen, supporting up to 128 KB of buffer space for logical pixel scales.

Input is handled through a PS/2 keyboard driver that supports pluggable layouts such as AZERTY, QWERTY, and QWERTZ, configurable via a system file. For storage, the platform implements a unified DOS-style file API that manages both a 360 KB LittleFS "flash floppy" and an optional micro-SD card. Audio capabilities include PWM stereo output driven by a built-in 4-channel wavetable synth with ADSR envelopes and panning.

One of the more advanced technical features is the switchable CPU clock. The system supports three voltage-tracked speeds (260 MHz, 324 MHz, and 390 MHz) selectable at runtime. A built-in watchdog ensures system stability; if a board cannot maintain a specific speed tier, it automatically steps down to a lower frequency without requiring a re-flash.

## Hardware Implementation


The hardware design is optimized for simplicity and can be built on a breadboard or perfboard. All I/O pins are concentrated on the left side of the Pico 2, leaving the right side (GP16–GP28) open for user projects. 

![Complete Japi Base schematic for VGA, PS/2, and SD card interfaces](/202606/japi-base_4.avif)

### Video and Audio
The VGA signal is generated using a weighted-resistor Digital-to-Analog Converter (DAC). Two GPIO bits per color drive the 75 Ω terminated VGA input, providing 64 distinct colors. Audio is produced via PWM smoothed by a 1 kΩ and 3.3 nF RC low-pass filter with a 48 kHz cutoff, designed for use with active PC speakers.

### Input and Storage
The PS/2 keyboard interface utilizes a bidirectional logic-level shifter to bridge the 5V keyboard signals to the Pico's 3.3V GPIOs. The micro-SD card interface uses SPI1 and connects directly to the 3.3V native pins of the SD card. Notably, card detection is disabled to prevent background interrupts from disturbing the precise VGA scanline timing.

## Technical Architecture

The engine is highly optimized for the RP2350's capabilities. At a 260 MHz CPU clock, the PIO divider runs at 1:1, providing an exact 65 MHz pixel clock. The render path and scanline buffers live entirely in RAM, which prevents flash access latency from interfering with the video signal. The audio system runs at a sample rate of 24,180 Hz, generating one sample every two scanlines to keep the per-scanline interrupt workload bounded.

![VGA showcase displaying the color palette and character set](/202606/japi-base_0.avif)

## Software Development

Developing for Japi Base follows a pattern familiar to users of graphics libraries like SDL. The `vga_set_char`, `vga_print`, and `vga_clear` functions write to a back buffer, while `vga_wait_vblank()` swaps the buffers during the vertical blanking interval. This ensures flicker-free updates and allows the rendering logic to take longer than a single frame if necessary.

```c
#include "japi_base.h"

int main(void) {
    japi_init(); // clock, VGA, keyboard, SD
    vga_clear(VGA_WHITE, VGA_DARK_BLUE);
    vga_print(2, 4, "Hello from Japi Base!", VGA_YELLOW, VGA_DARK_BLUE);
    japi_play(NOTE_C5, 200);

    for (;;) {
        vga_wait_vblank(); // publish writes to the screen
        if (japi_has_char()) {
            uint16_t k = japi_get_char();
            if (k == JAPI_KEY_ESCAPE) break;
        }
    }
    return 0;
}
```

![The Starry Night dithered into the 64-color palette](/202606/japi-base_1.avif)

The project incorporates several third-party libraries for its filesystem and driver support, including FatFs for SD card management and littlefs for flash-based storage. These are consolidated within the firmware structure to simplify the build process using the standard Pico SDK toolchain.
