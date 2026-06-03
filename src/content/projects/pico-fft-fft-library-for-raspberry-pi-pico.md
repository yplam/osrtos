---
title: 'pico_fft: FFT Library for Raspberry Pi Pico'
summary: A lightweight and efficient wrapper for the KISS FFT library, specifically
  designed for the Raspberry Pi Pico (RP2040). It provides high-level functions for
  capturing analog signals via ADC and DMA, processing them into frequency bins, and
  performing real-time signal analysis.
slug: pico-fft-fft-library-for-raspberry-pi-pico
codeUrl: https://github.com/pastaskrue/pico_fft
version: v1.0.0-beta
lastUpdated: '2024-07-04'
licenses:
- MIT
image: /202605/pico_fft_0.avif
rtos: ''
topics:
- c
- examples
- fft
- library
- raspberry-pi-pico
isShow: true
createdAt: '2026-05-07T23:44:50+00:00'
updatedAt: '2026-05-07T23:44:50+00:00'
relatedProjects:
- usbsnifferpio-for-rp2040
- arm-cortex-m-hilbert-transform
- oscilloscope-rp2040
- neopixel-library-for-raspberry-pi-pico
- arm-dwt-c-library
- m5cardputer-audio-spectrum-display
---

Performing frequency domain analysis on microcontrollers often requires navigating complex mathematical libraries and hardware-specific configurations. The `pico_fft` library addresses this challenge for the Raspberry Pi Pico (RP2040) by providing a streamlined wrapper for the well-regarded [KISS FFT](https://github.com/mborgerding/kissfft) library. By abstracting the complexities of Fast Fourier Transform (FFT) operations, it allows developers to focus on signal processing logic rather than low-level boilerplate.

## Bridging KISS FFT and the RP2040

At its core, `pico_fft` is built to leverage the specific hardware capabilities of the RP2040. While KISS FFT provides the mathematical heavy lifting for the transform, this library handles the integration with the Pico's Analog-to-Digital Converter (ADC) and Direct Memory Access (DMA) controller. This integration is vital for real-time applications; by using DMA to capture samples, the CPU is freed to handle other tasks until a full buffer is ready for processing.

The library is designed for efficiency, making it suitable for a variety of audio and signal analysis projects. Whether you are building an audio visualizer, a frequency histogram, or a system to detect the highest amplitude frequency in a signal, `pico_fft` provides the necessary building blocks.

## Hardware Integration

Setting up the library typically involves connecting an analog microphone module (such as the KY-038 or MAX9814) to the Pico. The standard configuration utilizes GPIO26 (ADC0) for signal input. Because the RP2040's ADC is used in conjunction with DMA, the sampling process is highly consistent, which is a prerequisite for accurate FFT results.

## Simplified API Workflow

The library simplifies the FFT workflow into three primary stages: initialization, sampling, and processing.

1.  **Initialization**: The `fft_setup()` function configures the ADC and DMA. It sets the sampling rate and prepares the internal parameters required for the FFT calculation.
2.  **Sampling**: `fft_sample(capture_buf)` triggers the hardware to fill a buffer with analog samples. This non-blocking approach (via DMA) ensures high-speed data acquisition.
3.  **Processing**: `fft_process(capture_buf, bins, bin_count)` takes the raw samples, performs the FFT, and maps the resulting frequency spectrum into user-defined "bins."

### Working with Frequency Bins

One of the most user-friendly features of `pico_fft` is the `frequency_bin_t` structure. Instead of manually parsing a complex array of frequency magnitudes, developers can define specific frequency ranges of interest. This is particularly useful for creating graphic equalizers or audio visualizers.

```c
#define BIN_COUNT 3

frequency_bin_t bins[BIN_COUNT] = {
  {"Bass", 20, 250, 0},
  {"Mid", 251, 4000, 0},
  {"Treble", 4001, 20000, 0}
};

// After processing, access amplitude directly:
printf("Bass Amplitude: %f\n", bins[0].amplitude);
```

## Implementation Example

The following example demonstrates how to implement a basic loop that captures audio and prints the amplitude of various frequency ranges to the serial console:

```c
#include "pico/stdlib.h"
#include "pico/fft.h"

#define BIN_COUNT 10

int main() {
  stdio_init_all();
  fft_setup();

  uint8_t capture_buf[NSAMP];
  frequency_bin_t bins[BIN_COUNT] = {
    {"Bin 1", 0, 2000, 0},
    {"Bin 2", 2001, 4000, 0},
    {"Bin 3", 4001, 6000, 0},
    // ... define additional bins as needed
  };

  while (true) {
    fft_sample(capture_buf);
    fft_process(capture_buf, bins, BIN_COUNT);

    for (int i = 0; i < BIN_COUNT; i++) {
      printf("%s: Amplitude = %f\n", bins[i].name, bins[i].amplitude);
    }

    sleep_ms(100);
  }

  return 0;
}
```

## Technical Considerations

The library is currently in an experimental phase but includes tested examples for common use cases. It is distributed as a CMake-compatible project, making it easy to include as a library or a git submodule within the standard Raspberry Pi Pico C/C++ SDK environment. By linking against `pico_stdlib`, `hardware_adc`, and `hardware_dma`, it ensures that all necessary low-level drivers are correctly initialized for the RP2040 platform.
