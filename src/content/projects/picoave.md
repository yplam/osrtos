---
title: picoAVE
summary: picoAVE is a hardware and software HDMI mod for the Nintendo Wii, powered
  by the Raspberry Pi RP2040 microcontroller. It utilizes a parallel video processing
  pipeline across both cores to deliver 480p output without information loss, leveraging
  the RP2040's PIO and DMA capabilities for TMDS encoding and audio serialization.
slug: picoave
codeUrl: https://github.com/xtreme8000/picoAVE
lastUpdated: '2026-03-22'
licenses:
- GPL-3.0
image: /202604/picoAVE_0.avif
rtos: ''
topics:
- ave
- gamecube
- hdmi
- mod
- modding
- pico
- raspberry-pi-pico
- rp2040
- wii
isShow: true
createdAt: '2026-04-08T23:40:06+00:00'
updatedAt: '2026-04-08T23:40:06+00:00'
---

For retro gaming enthusiasts, bringing classic consoles into the modern era usually involves expensive FPGA-based HDMI modifications. picoAVE changes this dynamic by utilizing the versatile Raspberry Pi RP2040 microcontroller to handle high-speed video processing for the Nintendo Wii. By leveraging the unique hardware features of the RP2040—specifically its Programmable I/O (PIO) blocks and dual-core architecture—this project provides a high-quality digital video output at a fraction of the cost of traditional solutions.

## High-Speed Video Pipeline

The core of picoAVE is a parallel video processing pipeline that spans both of the RP2040's Cortex-M0+ cores. Handling a 720x480p 60Hz video signal is a significant challenge for a general-purpose microcontroller, but picoAVE achieves this without color or information loss. The system is designed with vsync synchronization at its heart, ensuring that screen tearing is impossible by design. 

One core typically handles the capture and processing of incoming video data from the Wii's internal digital bus, while the second core manages the encoding and serialization. This division of labor allows the system to maintain the tight timing required for HDMI signals. In the background, separate tasks manage audio packet generation, fitting them into the spare time within the video stream to provide a complete HDMI experience.

## The Power of PIO

The project makes extensive use of the RP2040's PIO state machines to handle the heavy lifting of signal manipulation. Several specialized PIO programs are included in the repository:

*   **Capture PIO**: Samples high-speed video data from the Wii's interface, synchronizing with the system clock to shift pixel components into the RX FIFO.
*   **Serializer PIO**: Handles the complex task of TMDS encoding and data serialization required for the HDMI physical layer.
*   **I2S PIO**: Acts as a digital audio receiver to capture 16-bit audio data by monitoring word select and clock signals.
*   **Clock PIO**: Manages specialized timing requirements to keep the entire pipeline in sync.

Because the RP2040 is being pushed to its limits, the project requires overclocking the system clock. This allows the microcontroller to match the timing requirements of the 480p video standard, which is the currently supported output mode (EDTV/HDTV 480p in the Wii settings).

## Hardware Implementation

While the software is the brain of the project, custom hardware is required to make picoAVE a reality. A standard Raspberry Pi Pico board is unsuitable for the final installation because it does not expose the necessary clock input pin and is too bulky to fit inside the Wii's chassis. 

The hardware design typically involves a custom PCB containing the RP2040, voltage level shifters (like the TXS0108E) to adapt the Wii GPU's 1.8V signals to the 3.3V levels of the microcontroller, flash memory, and an LDO regulator. The design is compact enough to be installed internally, often connecting to the console's video signals via a flex PCB or direct wiring.

## Building the Project

Software for picoAVE is built using the standard Raspberry Pi Pico SDK. It is essential to build the project in **Release** mode to ensure the compiler optimizes the code enough to meet the strict timing windows of the video pipeline. 

```bash
mkdir build
cd build
cmake -DCMAKE_BUILD_TYPE=Release -DPICO_SDK_PATH=/path/to/pico-sdk/ ..
make
```

Beyond the code, the project serves as a fascinating example of how low-cost microcontrollers can replace specialized logic chips in high-bandwidth applications through clever software engineering and the use of hardware peripherals like DMA and PIO.
