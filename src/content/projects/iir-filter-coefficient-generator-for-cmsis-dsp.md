---
title: IIR Filter Coefficient Generator for CMSIS DSP
summary: A GNU Octave tool for generating IIR filter coefficients compatible with
  the ARM CMSIS DSP library. It supports Butterworth, Chebyshev, Bessel, and Elliptic
  filters, providing coefficients in the second-order section format required for
  ARM Cortex-M signal processing applications.
slug: iir-filter-coefficient-generator-for-cmsis-dsp
codeUrl: https://github.com/ankitemb/IIR-Filter-Coefficient-for-CMSIS-DSP
star: 26
lastUpdated: '2020-08-16'
rtos: cmsis
topics:
- cmsis
- cmsis-dsp
- cortex-m
- digital-signal-filtering
- digital-signal-processing
- dsp
- dsp-library
- gnu-octave
- iir
- iir-filter
- iir-filters
- octave
- octave-functions
- octave-scripts
- signal-processing
isShow: false
createdAt: '2025-12-29'
updatedAt: '2025-12-29'
relatedProjects:
- iir-designer-for-cmsis-dsp
- dsp-from-ground-up-on-arm-processors-and-python
- arm-cortex-m-hilbert-transform
- rtt-libfilter-digital-filter-library-for-rt-thread
- arm-dwt-c-library
- arduino-cmsis-module
---

## Overview

Implementing Infinite Impulse Response (IIR) filters on ARM Cortex-M cores requires precise coefficients formatted specifically for the ARM CMSIS DSP library. This project provides a GNU Octave script designed to automate the computation of these coefficients, bridging the gap between filter design and embedded implementation. By using this tool, developers can generate optimized coefficients for high-performance signal processing on ARM hardware.

## Supported Filter Types

The script is versatile, supporting a wide range of standard filter types used in digital signal processing:
- **Butterworth Filter**: Lowpass, Highpass, Bandpass, and Bandstop
- **Chebyshev-1 Filter**: Lowpass, Highpass, Bandpass, and Bandstop
- **Bessel Filter**: Lowpass and Highpass
- **Elliptic Filter**: Lowpass, Highpass, Bandpass, and Bandstop

These filters can be implemented as Biquad Cascade IIR Filters using either the Direct Form I structure or the Direct Form II Transposed structure. The latter is particularly efficient when running on ARM Cortex cores with floating-point units (FPU).

## Technical Implementation

The CMSIS DSP library expects coefficients to be organized in a specific second-order section (SOS) digital filter manner. The format follows the pattern:

```
{b10, b11, b12, a11, a12, b20, b21, b22, a21, a22, ...}
```

Where `b` represents the numerator coefficients and `a` represents the denominator coefficients for each biquad stage. The Octave script handles the complex math of filter design and outputs the data in this exact sequence, allowing for direct copy-pasting into C source files.

## Usage Example

To generate coefficients, users can run the script within GNU Octave. For example, to create a 3rd-order Butterworth Highpass filter with a 5000 Hz cutoff at a 44.1 kHz sampling frequency, the following commands are used:

```octave
pkg load signal
iir_filter = "butter"
order = 3
fs = 44100
fc = 5000
ft = 'high'
plot_on = 1

iir_coeffs_cmsis(iir_filter, order, fs, fc, ft, plot_on)
```

## Embedded Integration

Once the coefficients are generated, they can be integrated into an ARM project using the `arm_biquad_cascade_df2T_f32` or similar functions. Below is a conceptual example of how the generated coefficients are applied in a C environment:

```c
#define NUM_STAGE_IIR 2
#define NUM_STD_COEFFS 5

static float32_t iirState[NUM_STAGE_IIR * 2];
static float32_t iirCoeffs[NUM_STAGE_IIR * NUM_STD_COEFFS] = 
{
    0.96452, -1.92904, 0.96452, 1.94945, -0.95020,
    1.00000, -2.00000, 1.00000, 1.97831, -0.97906
};

arm_biquad_cascade_df2T_instance_f32 S;

int main()
{
    // Initialize the filter instance
    arm_biquad_cascade_df2T_init_f32(&S, NUM_STAGE_IIR, &iirCoeffs[0], &iirState[0]);
    
    // Perform filtering on input blocks
    arm_biquad_cascade_df2T_f32(&S, pInput, pOutput, blockSize);
    
    while(1);
}
```

This workflow ensures that the filter designed in the mathematical environment of Octave behaves identically when deployed on the target microcontroller, leveraging the optimized SIMD and FPU instructions available in ARM Cortex-M processors.
