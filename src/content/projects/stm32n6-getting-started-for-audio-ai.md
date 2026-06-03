---
title: STM32N6 Getting Started for Audio AI
summary: A real-time environment for deploying X-CUBE-AI models on STM32N6 microcontrollers,
  supporting Audio Event Detection and Speech Enhancement. It provides a complete
  pipeline from sensor acquisition to NPU-accelerated inference with support for both
  FreeRTOS and bare-metal configurations.
slug: stm32n6-getting-started-for-audio-ai
codeUrl: https://github.com/STMicroelectronics/STM32N6-GettingStarted-Audio
siteUrl: https://www.st.com/en/embedded-software/x-cube-ai.html
star: 10
version: v2.2.0
lastUpdated: '2026-01-15'
rtos: freertos
topics:
- ai
- audio
- modelzoo
- services
- stm32
- stm32cube-mcu-package
- stm32n6
isShow: false
createdAt: '2026-02-02'
updatedAt: '2026-02-02'
relatedProjects:
- image-classification-getting-started-for-stm32n6
- stm32n6-getting-started-for-object-detection
- birdnet-for-stm32
- speech-recognition-on-stm32-using-machine-learning
- tensorflow-lite-micro-for-rt-thread
- stm32-ai-model-zoo-services
---

## The Power of Edge AI on STM32N6

The STM32N6 series represents a significant leap in embedded AI capabilities, and the STM32N6-GettingStarted-Audio repository provides the essential foundation for developers looking to harness this power for audio applications. This project is a robust, real-time environment designed to bridge the gap between high-level machine learning models and low-level hardware execution on the STM32N6570-DK Discovery kit.

At its core, the project implements a sophisticated processing chain. It handles everything from physical data acquisition via digital microphones to the final post-processing of AI results. This pipeline typically involves a preprocessing step for feature extraction (such as generating Mel spectrograms), the machine learning inference itself—accelerated by the STM32N6's Neural Processing Unit (NPU)—and a post-processing stage to make the results actionable.

## Versatile Operating Modes

One of the standout features of this package is its flexibility. STMicroelectronics provides implementations for both Bare Metal and FreeRTOS environments. This allows developers to choose the level of abstraction that fits their specific needs:

- **Bare Metal (BM):** Offers minimal overhead and maximum determinism for simple, dedicated tasks.
- **FreeRTOS:** Provides an industry-standard multitasking environment for complex systems requiring task prioritization and concurrent processing.

Furthermore, the project includes "Low Power" (LP) variants for both configurations. These versions leverage advanced hardware features like Dynamic Voltage & Frequency Scaling (DVFS) and Dynamic Power Scaling (DPS), which are critical for battery-operated IoT devices that need to perform continuous audio monitoring without excessive power drain.

## Hardware-Accelerated AI

The project is specifically tailored for the STM32N6570-DK board. It makes full use of the onboard NPU, which can run at speeds up to 800 MHz. This hardware acceleration allows for complex models to run with incredibly low latency. The repository includes two primary use cases:

1. **Audio Event Detection (AED):** Uses a Yamnet model to recognize events like a baby crying, a clock ticking, or sneezing in real-time.
2. **Speech Enhancement (SE):** Improves speech quality and intelligibility in noisy environments using temporal convolutional networks.

## Technical Implementation and Configuration

Developers can easily override default settings through configuration files like `app_config.h` and `ai_model_config.h`. This allows for fine-tuning parameters such as UART baud rates, log levels, and specific audio preprocessing settings. For example, configuring the Mel Spectrogram for an AED model involves defining the number of Mel filters, window lengths, and hop lengths:

```c
// Example preprocessing configuration for AED
#define CTRL_X_CUBE_AI_SPECTROGRAM_NMEL          (64U)
#define CTRL_X_CUBE_AI_SPECTROGRAM_COL           (96U)
#define CTRL_X_CUBE_AI_SPECTROGRAM_HOP_LENGTH    (160U)
#define CTRL_X_CUBE_AI_SPECTROGRAM_NFFT          (512U)
#define CTRL_X_CUBE_AI_SPECTROGRAM_WINDOW_LENGTH (400U)
```

## Seamless Model Deployment

The workflow is tightly integrated with the ST Edge AI ecosystem. Users can train models in the ST Model Zoo and deploy them using the `stedgeai` toolchain. The repository includes shell scripts to automate the generation of C-model code, header installation, and the signing/flashing of firmware to external flash memory. Because the STM32N6 series lacks internal flash, the project provides detailed instructions on using the First Stage Boot Loader (FSBL) and external loaders to program the MX66UW1G45G flash on the discovery board.

By providing a complete, documented path from model training to real-time execution on cutting-edge hardware, this project serves as an invaluable resource for engineers building the next generation of intelligent, power-efficient audio devices.
