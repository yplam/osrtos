---
title: uTensor MNIST Handwriting Recognition Demo
summary: A demonstration project showcasing machine learning on embedded devices using
  uTensor and Mbed OS. It implements a neural network trained on the MNIST dataset
  to recognize handwritten digits on an STM32F413 Discovery board with a touchscreen.
slug: utensor-mnist-handwriting-recognition-demo
codeUrl: https://github.com/ARMmbed/utensor-mnist-demo
star: 2
lastUpdated: '2018-05-08'
rtos: mbed-os
libraries:
- utensor
topics:
- edge-computing
- machine-learning
- mbed
- mnist-handwriting-recognition
- tensorflow
- utensor
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- edgeai-utensor-embedded-rtos-for-arm-processors
- magic-wand-on-mbed
- attiny85-mnist-rnn-eeprom
- fashion-mnist-on-esp32-with-tensorflow-lite-micro
- speech-recognition-on-stm32-using-machine-learning
- edge-computing-ai-for-cubesats
---

## Overview

The uTensor MNIST demo provides a practical example of implementing artificial intelligence on resource-constrained embedded systems. By leveraging uTensor, a lightweight inference engine, developers can bring complex neural networks to ARM Cortex-M devices, significantly reducing the computational and memory overhead typically associated with AI. This project serves as a comprehensive tutorial for bridging the gap between high-level machine learning frameworks like TensorFlow and low-level embedded C++ environments.

## The uTensor Workflow

Running artificial intelligence on embedded systems involves three main steps as demonstrated in this repository:

1.  **Model Construction**: A machine learning model is constructed and trained offline. This example uses a fully-connected neural network with two hidden layers trained on the MNIST dataset using TensorFlow. The resulting model is "frozen" into a protobuf file, which stores the learned graph parameters.
2.  **Code Generation**: The `utensor-cli` tool is used to translate the TensorFlow graph into C++ code. This process outputs uTensor kernels—functions that perform the mathematical operations required for inference—and the associated weights.
3.  **Embedded Integration**: The generated kernels and weights are integrated into an Mbed OS application. The application calls these functions to make predictions based on real-time user input.

## Hardware and Software Integration

The project is designed for the **ST-Discovery-F413H** (DISCO_F413ZH) development board. This platform is ideal for the demo because it includes a built-in touchscreen for user input and an SD card slot for storing model constants. 

The software stack relies on **Mbed OS** for hardware abstraction and system management. The application logic, found in `main.cpp`, handles the touchscreen interface, image processing, and the uTensor inference lifecycle. When a user draws a digit on the screen, the application captures the coordinates, resizes the image to a 28x28 format, and feeds it into the neural network.

## Technical Implementation

The core of the application involves managing the uTensor `Context`, which handles the memory and execution of the tensor graph. The `image.h` utility provides essential functions for image manipulation, such as resizing and padding, to ensure the input data matches the model's requirements.

```cpp
// Capturing the inference result in main.cpp
get_deep_mlp_ctx(ctx, smallImage.get_data());
pc.printf("Evaluating\n\r");
ctx.eval();

// Retrieve the prediction from the output layer
S_TENSOR prediction = ctx.get({"OutputLayer/y_pred:0"});
int result = *(prediction->read<int>(0,0));

pc.printf("Number guessed %d\n\r", result);
```

## Getting Started

To build the project, users need the `mbed-cli` and `utensor-cli` tools. The process involves importing the project, training the model via a provided Jupyter Notebook (`tensorflow-models/deep_mlp.ipynb`), generating the C++ code, and compiling the final binary using Mbed's build system. The learned weights must be copied to an SD card, which the board reads during initialization to populate the model's parameters.

This demo highlights the potential for "Edge AI," where data is processed locally on the device rather than being sent to the cloud, improving latency, privacy, and power consumption for IoT applications.
