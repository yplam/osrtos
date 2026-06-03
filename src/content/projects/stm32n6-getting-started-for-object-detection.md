---
title: STM32N6 Getting Started for Object Detection
summary: A real-time object detection application for STM32N6 microcontrollers, showcasing
  NPU-accelerated AI inference using STEdgeAI. It features a sophisticated vision
  pipeline with dual DCMIPP pipelines, ISP integration, and support for external flash
  booting on STM32N6570-DK and NUCLEO-N657X0-Q boards.
slug: stm32n6-getting-started-for-object-detection
codeUrl: https://github.com/STMicroelectronics/STM32N6-GettingStarted-ObjectDetection
siteUrl: https://www.st.com/en/development-tools/stedgeai-core.html
star: 15
version: v2.1.1
lastUpdated: '2025-09-04'
rtos: cmsis
topics:
- ai
- computer-vision
- modelzoo
- object-detection
- services
- stm32
- stm32cube-mcu-package
- stm32n6
isShow: true
image: /202601/STM32N6570-DK.webp
createdAt: '2026-01-19'
updatedAt: '2026-01-19'
relatedProjects:
- image-classification-getting-started-for-stm32n6
- stm32n6-ai-object-detection-and-h-264-usb-video-streaming
- stm32n6-getting-started-for-audio-ai
- edge-ai-on-embedded-linux-i-mx-8m-plus
- stm32n6-camera-capture-application
- stm32-ai-model-zoo-services
---

The STM32N6-GettingStarted-ObjectDetection project is a comprehensive entry point for developers looking to leverage the advanced AI capabilities of the STM32N6 series microcontrollers. This repository provides a complete, real-time embedded environment designed to execute quantized neural networks accelerated by the on-chip Neural Processing Unit (NPU).

The STM32N6 is unique in the STM32 lineup as it lacks internal flash memory, requiring a specific boot strategy from external memory. This project demonstrates how to handle this architecture, providing configurations for both development mode (loading into SRAM) and production-ready boot-from-flash modes.

## Advanced Vision Pipeline

A standout feature of this project is its utilization of the Digital Camera Memory Interface and Pixel Processor (DCMIPP). The application implements dual DCMIPP pipelines, allowing for sophisticated image handling including cropping, decimation, and downscaling. It also integrates the Image Signal Processor (ISP) to ensure high-quality input for the AI models. The final output is rendered using a dual-layer LTDC (LCD-TFT Display Controller) implementation, which overlays detection bounding boxes and confidence levels directly onto the live camera feed.

## AI Model Execution

The project is built around the STEdgeAI (formerly STM32Cube.AI) ecosystem. It supports NPU-accelerated quantized models, specifically optimized for object detection tasks. While the project comes with prebuilt binaries for a standard detection model, it is designed to be fully compatible with the ST ModelZoo. This integration allows users to train their own models, evaluate them, and automatically deploy them to the STM32N6 hardware.

## Hardware and Tooling

The application supports two primary development platforms:
- **STM32N6570-DK Discovery Board**: A full-featured evaluation kit with an integrated display.
- **NUCLEO-N657X0-Q Nucleo Board**: A flexible prototyping board that can output video via USB/UVC or an SPI display.

Supported camera modules include the IMX335, STEVAL-55G1MBI, and STEVAL-66GYMAI1. On the software side, the project is tailored for STM32CubeIDE and utilizes the STM32CubeProgrammer for firmware deployment and external flash management.

## Getting Started

For developers starting with the source code, the project offers multiple build configurations. In "Dev Mode," the firmware is loaded directly into RAM for rapid iteration during debugging. For permanent deployment, the project provides a workflow to sign the binary and program it into external flash along with the necessary First Stage Boot Loader (FSBL) and AI model weights.

```bash
# Example command to program the signed binary to external flash
STM32_Programmer_CLI -c port=SWD mode=HOTPLUG -el $DKEL -hardRst -w build/Application/<board_name>/Project_sign.bin 0x70100000
```

The repository includes detailed documentation on deploying custom TFLite models, configuring camera orientations, and managing aspect ratios, making it a robust foundation for building production-grade vision applications on the edge.
