---
title: Pico2Dexed
summary: A technical port of the Dexed FM synthesis engine to the Raspberry Pi Pico
  2 (RP2350). The project utilizes the ARM Cortex-M33 cores to achieve 10-note polyphony
  at 44.1kHz, supporting I2S audio output and standalone MIDI tone playback.
slug: pico2dexed
codeUrl: https://github.com/nyh-workshop/pico2dexed
lastUpdated: '2024-08-30'
licenses:
- MIT
rtos: ''
topics:
- rp2350
isShow: true
image: /202604/pico2dexed.webp
createdAt: '2026-04-01T23:57:21+00:00'
updatedAt: '2026-04-01T23:57:21+00:00'
---

Pico2Dexed brings the iconic sound of the Yamaha DX7 FM synthesizer engine to the Raspberry Pi Pico 2. By leveraging the updated RP2350 microcontroller and its dual ARM Cortex-M33 cores, this project provides a significant performance leap over previous microcontroller-based ports, offering a high-quality, polyphonic synthesizer in a compact form factor.

### The Evolution of Pico FM Synthesis

The project is a direct evolution of PicoDexed, which was originally developed for the RP2040. While the original port faced significant constraints regarding polyphony and sample rates, the move to the RP2350 allows for a much more robust implementation. Pico2Dexed currently supports 10-note polyphony at a standard 44.1kHz sampling rate without audio stuttering. This is achieved by running the RP2350 at 250MHz, providing the necessary computational headroom for the complex frequency modulation algorithms required by the Dexed engine.

### Core Architecture and Performance

At its heart, Pico2Dexed utilizes the Dexed engine, a versatile FM synthesis tool known for its accuracy in emulating classic 6-operator FM sounds. The firmware is built using the Raspberry Pi Pico SDK and integrates several key components:

- **Synthesis Engine**: A port of Synth_Dexed, optimized for embedded systems and utilizing CMSIS `arm_math` routines for high-performance mathematical operations.
- **Audio Output**: Audio is delivered via I2S, with tested support for the PCM5102 DAC and the Pimoroni Pico Audio Pack. While PWM audio is technically possible, I2S is recommended for professional-grade audio quality.
- **Miditones Integration**: The project includes Len Shustek's miditones player, allowing the system to play back MIDI files converted into a simplified format directly from the firmware.

One of the critical improvements in this port is the management of envelope generators. To mitigate clicking noises during note transitions, the project uses a specific version of the Miditones player that enforces brief note stops, allowing the envelope generator to release and minimize artifacts.

### Hardware and Configuration

Pico2Dexed is specifically optimized for the ARM Cortex-M33 cores of the RP2350. Currently, there are no plans to support the Hazard3 RISC-V cores available on the same chip, as the synthesis engine relies heavily on ARM-specific optimizations. 

For those looking to build the project, the hardware requirements are minimal:
- A Raspberry Pi Pico 2 board.
- An I2S DAC (such as the PCM5102 or Pimoroni Audio Pack).
- Standard GPIO connections for I2S: GP9 (Data), GP10 (Bit Clock), and GP11 (LR Clock).

### Development and Build Environment

The project is designed to be built within the VSCode environment using the official Raspberry Pi Pico extension. It employs a modular CMake-based build system that separates the synthesis engine (`synth_dexed`) and the MIDI processing logic (`miditones`) into distinct libraries. 

While the current version focus on stability and performance testing—temporarily disabling USB and Serial MIDI modules to prioritize core synthesis—the foundation is laid for full MIDI implementation, including support for SysEx voice bank loading and real-time control change messages. This makes Pico2Dexed a powerful starting point for anyone looking to build a custom hardware FM synthesizer using the latest generation of Raspberry Pi silicon.
