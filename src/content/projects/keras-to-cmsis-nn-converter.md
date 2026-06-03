---
title: Keras to CMSIS-NN Converter
summary: A Python-based utility that converts Keras machine learning models into optimized
  C code for ARM Cortex-M microcontrollers. It leverages the CMSIS-NN and CMSIS-DSP
  libraries to implement neural network layers, specifically focusing on 1D Convolutional
  Neural Networks (CNNs).
slug: keras-to-cmsis-nn-converter
codeUrl: https://github.com/quinnabrvau/Keras_2_CMSIS
star: 2
lastUpdated: '2019-05-12'
rtos: cmsis
topics:
- cmsis
- cmsis-nn
- keras
isShow: false
createdAt: '2025-12-29'
updatedAt: '2025-12-29'
relatedProjects:
- torch2cmsis
- utensor-code-generator-utensor-cgen
- pruning-deep-learning-models-for-arm-cortex-m
- arm-dwt-c-library
- cmsis-parser
- ncnn-mp-neural-network-inference-for-micropython
---

## Bridging the Gap Between Keras and Embedded Hardware

Keras_2_CMSIS is a specialized tool designed to bridge the gap between high-level machine learning development in Python and low-level firmware implementation on ARM Cortex-M microcontrollers. By automating the conversion of Keras models (saved as .h5 files) into C source and header files, it allows developers to deploy trained models onto resource-constrained hardware using ARM's optimized CMSIS-NN and CMSIS-DSP libraries.

## Core Functionality and Layer Support

The project currently focuses on the implementation of 1D Convolutional Neural Networks (CNNs), which are frequently used in embedded systems for signal processing, vibration analysis, and audio classification. The tool parses the model configuration and weights directly from Keras H5 files and maps them to corresponding CMSIS-NN functions.

Key supported layers and operations include:
- **Conv1d**: Maps to `arm_convolve_HWC_q7_basic_1d` or optimized fast variants.
- **Pooling**: Supports both Max Pooling (`arm_maxpool_q7_HWC_1d`) and Average Pooling (`arm_avepool_q7_HWC_1d`).
- **Activations**: Implements ReLU, Tanh, and Sigmoid using CMSIS-NN activation functions.
- **Up-sampling**: Provides functionality for 1D up-sampling operations.

## Technical Implementation

The conversion process is handled by a Python-based pipeline that performs several critical tasks:

1.  **Weight Extraction**: It reads weights and biases from the H5 file, transposing and formatting them into C-style arrays.
2.  **Quantization**: The tool handles the conversion of floating-point weights into fixed-point formats (typically Q7 or Q15) required by CMSIS-NN for efficient execution on microcontrollers.
3.  **Code Generation**: It generates a pair of `.c` and `.h` files containing the network definition, weight arrays, and the function calls necessary to execute the inference pass.

## Optimization Strategies

One of the strengths of this tool is its ability to select optimized CMSIS-NN kernels based on the input shape. For example, in `layer1d.py`, the tool can automatically switch to a 'fast' version of the convolution function if the input and output shapes meet specific alignment requirements (e.g., multiples of 2 or 4), ensuring the best possible performance on the target hardware.

## Usage Example

The tool is designed to be used as a command-line utility. A typical conversion command looks like this:

```bash
python main.py my_model.h5 my_output_name ./output_directory/
```

This command processes `my_model.h5` and produces `my_output_name.c` and `my_output_name.h` in the specified directory. These files can then be integrated directly into an IDE like Keil MDK, IAR, or a GCC-based Makefile project targeting ARM Cortex-M devices.

## Future Development

While the project currently excels at 1D CNN conversion, the roadmap includes expanding support for fully connected (Dense) layers, improving quantization optimization, and implementing automatic detection for choosing between Q7 and Q15 precision based on the model's requirements.
