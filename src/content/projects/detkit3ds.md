---
title: Detkit3DS
summary: A lightweight object detection application for the Nintendo 3DS handheld
  console. It leverages the NCNN inference framework and LVGL 8.3.11 for its user
  interface, supporting models like Nanodet-Plus and Fastest-Det for non-real-time
  image analysis.
slug: detkit3ds
codeUrl: https://github.com/Deepdive543443/Detkit3DS
star: 11
version: 1.0.3
lastUpdated: '2025-03-02'
rtos: ''
libraries:
- lvgl
topics:
- 3ds-homebrew
- deep-learning
- lvgl
- ncnn
- object-detection
isShow: true
image: /202602/detkit3ds.webp
createdAt: '2026-02-16'
updatedAt: '2026-02-16'
relatedProjects:
- esp32berry
- dssh-nintendo-3ds-ssh-client-with-pinyin-ime-and-voice-input
- stm32n6-getting-started-for-object-detection
- stm32-pocket-game-dev-console
- lilka-diy-console
- esp32-cam-yolo-object-and-animal-detection
---

## Overview

Detkit3DS is a specialized object detection application designed specifically for the Nintendo 3DS handheld console. By combining high-performance neural network inference with a polished graphical interface, the project demonstrates the potential of running modern computer vision tasks on legacy embedded hardware. The application is built using the NCNN framework for inference and LVGL for a user interface that remains faithful to the original Nintendo 3DS system aesthetics.

## Technical Architecture

The project is powered by two primary components: NCNN and LVGL. NCNN is a high-performance neural network inference computing framework optimized for mobile platforms, which allows the 3DS to process complex models despite its limited hardware resources. The user interface is built on LVGL 8.3.11, providing a responsive and visually integrated experience that mimics the native 3DS system UI.

For object detection, Detkit3DS utilizes two highly optimized, anchor-free models:
- **Nanodet-Plus (int8)**: Provides detection in approximately 6 seconds.
- **Fastest-Det**: A faster alternative that completes detection in roughly 4 seconds.

These models are executed in a non-real-time fashion, focusing on accuracy and efficiency within the constraints of the 3DS hardware.

## Development and Build System

Detkit3DS is developed using the DevkitARM toolchain, the standard for 3DS homebrew development. The build system is managed via CMake, utilizing the `3ds-cmake` toolchain files to target the ARM-based architecture of the console. 

The project structure includes a comprehensive `setup.sh` script designed to automate the complex process of building submodules. This script handles the cross-compilation of LVGL, NCNN (with specific flags for the 3DS environment), and the core detector library before final executable linking. Developers can target different output formats, including `.3dsx` for the Homebrew Launcher or `.cia` for permanent installation via a title manager.

## Key Features

- **Optimized Inference**: Uses NCNN with int8 quantization to maximize performance on the 3DS CPU.
- **Native UI Experience**: An interface inspired by the Nintendo 3DS system menu, powered by LVGL.
- **Dual Model Support**: Choice between Nanodet-Plus and Fastest-Det depending on the user's speed and accuracy requirements.
- **Homebrew Integration**: Full support for standard 3DS homebrew tools and libraries like `ctrulib`, `citro3d`, and `citro2d`.

## Getting Started

Building the project requires a Linux environment (such as Ubuntu 20.04 or WSL). After installing the DevkitARM toolchain, users must clone the repository with submodules and run the provided setup script to prepare the dependencies. The project supports building both standard executables and CIA packages for installation on the console's home menu.
