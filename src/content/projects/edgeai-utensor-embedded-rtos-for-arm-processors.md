---
title: 'EdgeAI-uTensor: Embedded RTOS for ARM Processors'
summary: A project showcasing the deployment of machine learning models on ARM-based
  embedded systems using the uTensor framework. It facilitates the transition of DNN
  models from desktop training environments to real-time execution on edge devices
  for applications like predictive maintenance.
codeUrl: https://github.com/Rajesh-Siraskar/EdgeAI-uTensor_Embedded_RTOS_for_ARM_processors
siteUrl: https://utensor.github.io/website/
isShow: false
rtos: mbed-os
libraries:
- utensor
topics:
- mbed-os
- platformio
- predictive-maintenance
- rtos
star: 7
lastUpdated: '2021-03-02'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- tensorflow-lite-micro-for-rt-thread
- utensor-mnist-handwriting-recognition-demo
- pruning-deep-learning-models-for-arm-cortex-m
- magic-wand-on-mbed
- edge-ai-on-embedded-linux-i-mx-8m-plus
- stm32n6-getting-started-for-audio-ai
---

## Bringing Intelligence to the Edge with uTensor

The world of Artificial Intelligence is no longer confined to massive data centers and high-powered GPUs. With the rise of Edge AI, machine learning models are moving directly onto the microcontrollers that power our everyday devices. The **EdgeAI-uTensor** project is a prime example of this evolution, demonstrating how to implement Deep Neural Networks (DNN) on ARM processors using C++ and Real-Time Operating Systems (RTOS).

### The Power of uTensor

At the heart of this project lies **uTensor**, an extremely lightweight machine learning inference framework. Optimized specifically for ARM targets, uTensor is built on TensorFlow but stripped down to its essentials. The core runtime is remarkably small—only about 2KB—making it ideal for memory-constrained environments where every byte counts.

uTensor operates through a two-part system:
1. **An Offline Tool**: This handles the heavy lifting of model translation, converting models trained on a desktop (using standard frameworks like TensorFlow) into C++ code.
2. **A Runtime Library**: A minimal set of operators and memory managers that execute the model on the target hardware.

### From Desktop to Deployment

One of the most significant challenges in embedded AI is the "deployment gap." Models are typically trained in Python-heavy environments with gigabytes of RAM, while the target hardware might have only a few hundred kilobytes. This project bridges that gap by providing a workflow to:

- Train a model on a desktop environment.
- Export the weights and architecture.
- Deploy the resulting model as C++ code (`DNN_model.cpp` and `DNN_model_weight.hpp`) onto an ARM processor.

### Real-World Application: Predictive Maintenance

The project highlights **Predictive Maintenance** as a key use case. By running DNN models locally on an ARM processor, devices can analyze sensor data in real-time to predict equipment failure before it happens. This local processing reduces latency, saves bandwidth, and ensures that critical alerts are generated even without a constant internet connection.

### Technical Components

The repository is structured to provide a clear path from model definition to execution:

- **`main.cpp`**: The entry point of the application, orchestrating the RTOS tasks and triggering the inference engine.
- **`DNN_model.cpp` / `.hpp`**: These files contain the generated C++ code representing the neural network layers and logic.
- **`DNN_model_weight.hpp`**: This header file stores the pre-trained weights of the model, typically as constant arrays that reside in the flash memory of the microcontroller.

By leveraging C++ and RTOS principles, the project ensures that the AI inference doesn't block other critical system tasks, maintaining the responsiveness required for industrial and consumer embedded applications.

### Getting Started

To explore this project, you'll need an ARM-based development board and the uTensor tools. The workflow involves taking a pre-trained TensorFlow model and using the uTensor CLI to generate the source files found in this repository. Once integrated, the model can be called like any other C++ function, providing predictions based on live sensor input.

Check out the [uTensor website](https://utensor.github.io/website/) for more details on the underlying framework and how to build your own edge intelligence.
