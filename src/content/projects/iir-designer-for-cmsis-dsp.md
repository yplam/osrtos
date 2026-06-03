---
title: IIR Designer for CMSIS-DSP
summary: A collection of GNU Octave scripts for designing IIR filters optimized for
  ARM Cortex cores. It generates coefficients specifically formatted for the CMSIS-DSP
  library's Biquad Cascade Direct Form II Transposed structure, enabling hardware-accelerated
  signal processing.
slug: iir-designer-for-cmsis-dsp
codeUrl: https://github.com/matteoscordino/iir-designer-cmsis-dsp
star: 41
lastUpdated: '2020-12-14'
rtos: cmsis
topics:
- cmsis
- cmsis-dsp
- digital-signal-filtering
- digital-signal-processing
- gnu-octave
- iir
- iir-filter
- iir-filters
- octave-functions
- octave-scripts
- signal-processing
isShow: false
createdAt: '2025-12-29'
updatedAt: '2025-12-29'
relatedProjects:
- iir-filter-coefficient-generator-for-cmsis-dsp
- dsp-from-ground-up-on-arm-processors-and-python
- arm-cortex-m-hilbert-transform
- rtt-libfilter-digital-filter-library-for-rt-thread
- arm-dwt-c-library
- cmsis-for-stm32-development
---

## Overview

The IIR Designer for CMSIS-DSP is a specialized toolset for embedded developers working with digital signal processing on ARM Cortex-M processors. It provides a bridge between high-level filter design in GNU Octave and high-performance implementation in C using ARM's CMSIS-DSP library. By automating the calculation of filter coefficients, it ensures that the resulting filters are mathematically sound and ready for hardware acceleration.

## Key Features

The project focuses on Infinite Impulse Response (IIR) filters implemented as biquad cascades. This structure is particularly efficient for embedded systems as it minimizes numerical instability and is well-supported by the CMSIS-DSP framework. 

**Supported Filter Types include:**
- **Butterworth Filters**: Lowpass, Highpass, Bandpass, and Bandstop configurations.
- **Elliptical Filters**: Bandpass designs with configurable ripple and stopband attenuation.
- **Direct CMSIS Compatibility**: Outputs coefficients in the specific format and order required by the CMSIS-DSP biquad functions.

## Technical Implementation

The scripts utilize the GNU Octave signal package to compute filter poles, zeros, and gains. A critical step in the implementation is the conversion of these parameters into Second Order Sections (SOS). The designer specifically targets the Direct Form II Transposed (DF2T) structure. 

One of the most useful aspects of these scripts is that they automatically handle the coefficient negation required by CMSIS-DSP. In the CMSIS implementation of the biquad cascade, the `a1` and `a2` coefficients are expected to be negated relative to standard filter notation. These scripts perform that transformation, preventing common implementation errors that lead to unstable filters.

## Getting Started

To use the designer, users run the provided `.m` scripts within GNU Octave. For example, to design a 2nd order highpass DC blocker at 20Hz with a 44.1kHz sampling rate, the following command is used:

```octave
pkg load signal
order = 2;
f1 = 20;
fs = 44100;
plot_results = true;
design_iir_highpass_cmsis_butter(order, f1, fs, plot_results);
```

The script outputs an array of coefficients that can be copied directly into C code. On the target ARM hardware, these coefficients are used to initialize an `arm_biquad_cascade_df2T_instance_f32` structure:

```c
#define IIR_ORDER     2
#define IIR_NUMSTAGES (IIR_ORDER/2)

static float32_t m_biquad_state[IIR_ORDER];
static float32_t m_biquad_coeffs[5*IIR_NUMSTAGES] = {
   0.99799, -1.99597, 0.99799, 1.99597, -0.99598
};

arm_biquad_cascade_df2T_instance_f32 const iir_inst = {
  IIR_NUMSTAGES,
  m_biquad_state,
  m_biquad_coeffs
};

// Processing loop
arm_biquad_cascade_df2T_f32(&iir_inst, pSrc, pDst, blockSize);
```

## Visualization and Verification

Beyond generating coefficients, the scripts include built-in visualization capabilities. When the `plot_results` flag is enabled, the scripts generate frequency response plots and simulate the filter's performance against sample signals, such as impulse responses, DC steps, and sine waves at various frequencies. This allows developers to verify the filter's behavior before deploying it to the target microcontroller.
