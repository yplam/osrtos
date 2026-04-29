---
title: Ultranet-to-I2S
summary: A firmware project for the Raspberry Pi Pico that decodes the Behringer Ultranet
  audio protocol into multiple I2S streams. It utilizes the RP2040's PIO modules for
  high-speed signal decoding and its dual-core architecture to synchronize audio between
  different clock domains.
slug: ultranet-to-i2s
codeUrl: https://github.com/doughadfield/Ultranet-to-I2S
version: V1.2
lastUpdated: '2025-07-12'
licenses:
- GPL-3.0
rtos: ''
topics:
- behringer
- i2s
- ultranet
isShow: true
image: /202604/ultranet-to-i2s.webp
createdAt: '2026-04-28T23:52:56+00:00'
updatedAt: '2026-04-28T23:52:56+00:00'
---

Decoding professional digital audio protocols often requires specialized hardware, but the Ultranet-to-I2S project demonstrates how the Raspberry Pi Pico's unique architecture can bridge this gap. By leveraging the RP2040’s Programmable I/O (PIO) and dual-core capabilities, this project provides a cost-effective way to extract eight channels of analog audio from a Behringer Ultranet stream.

### The Power of PIO and Dual Processors

The project relies on two "secret weapons" of the RP2040. First, the PIO modules are used to handle the heavy lifting of the digital bitstream. Ultranet is a high-speed protocol similar to AES/EBU, running at approximately 12.288MHz to support 48KHz sampling across 8 channels. The PIO state machines are configured to decode this incoming biphase bitstream into raw audio data and, conversely, to encode that data into I2S streams compatible with common DAC modules like the PCM5102A.

Second, the dual-core nature of the Pico solves a classic digital audio problem: synchronization. In a typical setup, the incoming Ultranet stream is clocked by the source device (such as a Behringer X32 mixer), while the outgoing I2S streams are clocked by the Pico itself. Even if both are set to 48KHz, their internal oscillators will never be perfectly identical, leading to cumulative timing errors, clicks, and pops. This project resolves this by dedicating one processor core to reading the Ultranet data into an array and the second core to reading from that array for I2S output. This decoupled approach allows each thread to run independently, effectively acting as a synchronization buffer.

### Technical Implementation and Overclocking

To achieve the precision required for 12.288MHz digital audio, the project overclocks the RP2040 to 172MHz. By dividing this system clock by seven within the PIO modules, the system achieves a sampling frequency that aligns closely with the Ultranet bit period. This high-frequency oversampling ensures accurate tracking of signal edges, which is critical for maintaining data integrity in a high-speed audio stream.

The firmware is built using the Raspberry Pi Pico C/C++ SDK (v2.0.0) and is designed to be developed within Visual Studio Code. It integrates logic from several community projects, specifically adapting PIO programs for SPDIF reception and I2S output to fit the Ultranet specification.

### Hardware Integration

Because Ultranet signals are transmitted as differential pairs over CAT5/6 cabling, the project requires a small amount of external hardware to interface with the Pico. A line receiver IC, such as the MC3486, is used to convert the differential signals into single-ended TTL pulses that the Pico's GPIO pins can process. Once decoded, the audio is sent to multiple I2S decoder boards, allowing for high-quality analog output from a standard RJ45 Ultranet source.

This project serves as an excellent example of using the RP2040 for real-time signal processing tasks that would typically require an FPGA or a much more expensive DSP, making professional audio distribution more accessible for DIY enthusiasts and system integrators.
