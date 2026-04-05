---
title: Speech Recognition on STM32 using Machine Learning
summary: A bare-metal application for the STM32L475VGT that performs real-time keyword
  recognition using TensorFlow Lite for Microcontrollers. It utilizes a quantized
  convolutional neural network to classify audio commands, supported by hardware-accelerated
  CMSIS libraries.
slug: speech-recognition-on-stm32-using-machine-learning
codeUrl: https://github.com/stgloorious/stm32-speech-recognition
version: submission
lastUpdated: '2024-06-11'
licenses:
- MIT
image: /202604/stm32-speech-recognition_0.avif
rtos: ''
libraries:
- tensorflow-micro
topics:
- edge-ai
- embedded
- embedded-ai
- speech-recognition
- tensorflow-lite
- tflite
isShow: true
createdAt: '2026-04-05T00:58:31+00:00'
updatedAt: '2026-04-05T00:58:31+00:00'
---

This project implements keyword recognition on the STM32L475VGT (B-L745E-IOT01A2) development board, enabling the detection of spoken commands like "yes", "no", "up", "down", "left", and "right". By leveraging the TensorFlow Lite for Microcontrollers framework, the system brings machine learning capabilities to a resource-constrained embedded environment. The model is trained on the widely recognized speech_commands dataset by P. Warden.


### Project Progress
The implementation is currently a functional demo where the model runs successfully on the STM32 using the TFLite runtime. Key milestones achieved include porting the STFT (Short-Time Fourier Transform) preprocessing to the microcontroller and establishing a workflow for model training and deployment. While the core inference engine is operational, the PDM microphone readout is a pending feature, currently bypassed by injecting waveforms via UART for evaluation.

### How Keyword Recognition Works
The system classifies spoken keywords by transforming raw audio waveforms into visual representations called spectrograms. This is achieved through a short-time Fourier transform (STFT). The process involves taking a fixed-size window of the audio signal, applying a Hanning window function to reduce spectral leakage, and performing an FFT to generate a single column of the spectrum.

![Spectrogram Generation Overview](/202604/stm32-speech-recognition_1.avif)

This 124 x 129 spectrogram is then fed into a neural network trained with TensorFlow. The architecture consists of simple convolutional and dense layers. To optimize performance for the microcontroller, the model is quantized to use only integers, significantly reducing inference time and memory footprint. Once converted to a TFLite model, it runs on the bare-metal firmware.

### Technical Architecture & Build
The software is designed as a bare-metal application, avoiding the overhead of a full RTOS. It integrates the STM32CubeL4 HAL for hardware abstraction and uses CMSIS-NN and CMSIS-DSP for hardware-accelerated mathematical operations. The build system is managed via CMake and the `arm-none-eabi` toolchain, ensuring compatibility with standard Linux development environments.

Model training is handled by a dedicated Python pipeline. Running the training script downloads the dataset, performs the necessary splits, and generates a quantized model. This model is automatically copied to the source directory to be compiled directly into the firmware.

### Evaluation and Performance
To validate the model's accuracy, the project includes helper tools that send test waveforms from a computer to the STM32 over UART. This allows developers to test the inference engine even without the on-board microphone being fully integrated.

![Evaluation and UART Testing Setup](/202604/stm32-speech-recognition_2.avif)

These scripts can also retrieve and plot spectrograms from the microcontroller using specific build flags. Currently, the system achieves an overall accuracy of approximately 80%, demonstrating the feasibility of robust keyword recognition on low-power ARM Cortex-M4 hardware.

![Model Confusion Matrix](/202604/stm32-speech-recognition_3.avif)
