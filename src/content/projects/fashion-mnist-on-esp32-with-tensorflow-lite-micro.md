---
title: Fashion MNIST on ESP32 with TensorFlow Lite Micro
summary: An example project demonstrating how to run the Fashion MNIST TFLite model
  on an ESP32 microcontroller using the ESP-IDF framework. It utilizes TensorFlow
  Lite Micro for edge AI inference, allowing the device to classify clothing items
  locally.
slug: fashion-mnist-on-esp32-with-tensorflow-lite-micro
codeUrl: https://github.com/akshayvernekar/esp_tensorflow_fmnist
siteUrl: https://medium.com/analytics-vidhya/building-edge-ai-applications-using-tensorflow-lite-on-esp32-baf8534b176e
star: 7
lastUpdated: '2020-09-11'
rtos: freertos
libraries:
- tensorflow-micro
- lwip
- spiffs
topics:
- esp-cam
- esp32
- tensorflow-lite
- tensorflow-micro
isShow: false
createdAt: '2025-12-28'
updatedAt: '2025-12-28'
relatedProjects:
- esphome-meter-reader-tflite-component
- esp-dl-micropython-binding
- utensor-mnist-handwriting-recognition-demo
- magic-wand-on-mbed
- ncnn-mp-neural-network-inference-for-micropython
- speech-recognition-on-stm32-using-machine-learning
---

The `esp_tensorflow_fmnist` project serves as a practical demonstration of Edge AI, specifically running a machine learning model on the ESP32 microcontroller. By leveraging TensorFlow Lite Micro, this repository shows how to perform inference on the Fashion MNIST dataset—a collection of Zalando's article images—directly on embedded hardware.

### Bringing Machine Learning to the Edge
Running neural networks on microcontrollers presents unique challenges due to limited memory and processing power. This project addresses these constraints by using TensorFlow Lite Micro, a version of TensorFlow designed specifically for microcontrollers and other devices with only kilobytes of memory. The ESP32, with its dual-core processor and integrated Wi-Fi and Bluetooth, provides a robust platform for such applications.

### Technical Foundation
The project is built upon the Espressif IoT Development Framework (ESP-IDF), specifically version 4.0. It utilizes the standard ESP-IDF build system, including both CMake and traditional Makefiles, ensuring compatibility with various development environments. The configuration is managed through `sdkconfig`, which reveals a deep integration with FreeRTOS for task management and system stability.

Key components of the system include:
- **TensorFlow Lite Micro**: The core engine for loading and running the quantized Fashion MNIST model.
- **ESP-IDF Framework**: Provides the underlying RTOS (FreeRTOS), hardware abstraction layers, and build tooling.
- **Fashion MNIST Model**: A pre-trained model capable of identifying categories of clothing such as T-shirts, trousers, and sneakers.

### Project Structure and Submodules
One notable aspect of this repository is its use of Git submodules. Because TensorFlow Lite Micro and other dependencies are often large or maintained separately, the project requires a recursive clone to pull in all necessary components. This ensures that the specific versions of libraries required for the model to run correctly are included in the build environment.

### Getting Started
To use this project, developers need an ESP32 development board and the ESP-IDF v4.0 environment set up. The workflow involves cloning the repository with submodules:

```bash
git clone --recursive https://github.com/akshayvernekar/esp_tensorflow_fmnist.git
```

If the recursive flag is missed, the submodules can be initialized manually:

```bash
git submodule update --init
```

Once the environment is ready, the project can be built and flashed using the standard ESP-IDF build commands. This process compiles the C++ source code, links the TensorFlow Lite Micro libraries, and embeds the model data into the ESP32's flash memory.

### Real-World Application
The ability to run Fashion MNIST on an ESP32 is more than just a novelty; it demonstrates the feasibility of complex pattern recognition in low-power, low-cost devices. This technology can be extended to various IoT scenarios, such as smart closets, industrial sorting, or wearable technology, where local data processing is preferred over cloud-based inference for reasons of latency, privacy, or connectivity.
