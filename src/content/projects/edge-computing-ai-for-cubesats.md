---
title: Edge Computing AI for Cubesats
summary: A research project evaluating AI model deployment on edge computing platforms
  for cubesat applications. It compares performance, power consumption, and accuracy
  across NVIDIA Jetson TX1, Intel Movidius, and uTensor on Mbed OS using a TensorFlow-based
  character recognition model.
slug: edge-computing-ai-for-cubesats
codeUrl: https://github.com/crespum/oscw18-edge-ai
siteUrl: https://blog.crespum.eu/2018/05/28/spaceup-bcn-18-edge-computing/
star: 12
lastUpdated: '2018-09-20'
rtos: mbed-os
libraries:
- utensor
topics:
- ai
- cubesat
- edge-computing
- jetson
- movidius
- space
- utensor
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- edgeai-utensor-embedded-rtos-for-arm-processors
- utensor-mnist-handwriting-recognition-demo
- edge-ai-on-embedded-linux-i-mx-8m-plus
- yolov26n-optimized-qat-deployment-on-esp32-p4
- fashion-mnist-on-esp32-with-tensorflow-lite-micro
- magic-wand-on-mbed
---

## Overview

As the number of cubesats and small satellites in Low Earth Orbit (LEO) continues to grow, traditional ground-to-space telecommunication links are becoming a bottleneck for data management. The Edge Computing AI for Cubesats project explores increasing satellite autonomy by moving computational power directly to the space segment. By leveraging edge computing, satellites can analyze data gathered onboard—such as identifying complex time-series or detecting anomalies—reducing the need for massive telemetry downloads and regular human intervention.

This project was originally proposed for the Open Source Cubesat Workshop 18 and focuses on the empirical comparison of different Commercial Off-The-Shelf (COTS) solutions for running artificial intelligence in constrained environments.

## Technical Comparison of Edge Platforms

The core of the project is a benchmark comparing three distinct approaches to edge AI, ranging from high-performance modules to ultra-low-power microcontrollers:

*   **NVIDIA Jetson TX1:** A high-performance computing module capable of significant parallel processing.
*   **Intel Movidius:** A dedicated Vision Processing Unit (VPU) designed for low-power computer vision tasks.
*   **uTensor on Mbed OS:** A highly constrained approach using the uTensor library to run inference on microcontrollers supported by the Mbed OS ecosystem.

By testing these three platforms, the project provides insights into how accuracy, power consumption, and processing time scale across different hardware architectures.

## AI Model and Implementation

The project utilizes a TensorFlow-based model trained on the **notMNIST** dataset to identify letters from A to J. The workflow involves several stages of data science and embedded engineering:

1.  **Model Generation:** A Jupyter Notebook (`edge_model.ipynb`) is used to define, train, and validate the neural network using TensorFlow.
2.  **Data Pre-processing:** Images are normalized and one-hot encoded before being fed into a linear function model with softmax activation.
3.  **Model Freezing:** The trained TensorFlow graph is exported and frozen into a `.pb` (protobuf) file to prepare it for deployment.
4.  **Deployment:** The frozen model is then adapted for the specific target platforms, including the conversion process required for uTensor to run on ARM Cortex-M microcontrollers.

## Applications in Space

Onboard AI enables several critical capabilities for modern space missions:

*   **Earth Observation:** Instead of downloading raw high-resolution images, the satellite can process images onboard and transmit only the relevant results or metadata, saving significant bandwidth.
*   **Anomaly Detection:** AI can identify patterns in telemetry that indicate hardware degradation or environmental hazards, allowing the satellite to act autonomously before a ground station can intervene.
*   **Deep Space Autonomy:** For missions where communication latency makes real-time ground control impossible, onboard AI provides the necessary decision-making logic for navigation and coordination.

This project demonstrates that even highly constrained devices running RTOS environments like Mbed OS can participate in the edge AI ecosystem, making intelligence accessible to even the smallest satellite platforms.
