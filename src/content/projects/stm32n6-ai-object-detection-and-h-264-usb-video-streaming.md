---
title: STM32N6 AI Object Detection and H.264 USB Video Streaming
summary: This project demonstrates high-performance computer vision on the STM32N6570-DK
  discovery board, utilizing an NPU-accelerated quantized AI model for real-time object
  detection. It leverages a multi-threaded FreeRTOS architecture to manage a complex
  pipeline including DCMIPP image processing, hardware H.264 encoding, and USB Video
  Class (UVC) streaming.
slug: stm32n6-ai-object-detection-and-h-264-usb-video-streaming
codeUrl: https://github.com/STMicroelectronics/x-cube-n6-ai-h264-usb-uvc
version: v2.2.0
lastUpdated: '2025-12-19'
licenses:
- NOASSERTION
image: /202604/x-cube-n6-ai-h264-usb-uvc_0.avif
rtos: freertos
topics:
- ai
- computer-vision
- freertos
- stm32
- stm32cube-mcu-expansion
- stm32cube-mcu-package
- stm32n6
- usb
- uvc
isShow: true
createdAt: '2026-04-26T06:34:07+00:00'
updatedAt: '2026-04-26T06:34:07+00:00'
---

## Real-Time Computer Vision on the Edge

The STM32N6 series represents a significant leap in embedded processing power, and this project serves as a comprehensive demonstration of its capabilities. By integrating hardware-accelerated neural network inference with a robust video processing pipeline, the application performs real-time object detection and streams the results over USB. This project is specifically designed for the STM32N6570-DK Discovery board, showcasing how developers can bridge the gap between complex AI models and practical, high-bandwidth USB video peripherals.

## Technical Architecture and Pipeline

The application is built on a multi-threaded architecture powered by **FreeRTOS**. The data flow is a sophisticated example of modern embedded media handling:

1.  **Image Capture**: Utilizing the Dual DCMIPP (Digital Camera Memory Interface and Pixel Processor) pipes, the system captures frames from high-resolution sensors like the IMX335 or VD66GY. 
2.  **Image Signal Processing (ISP)**: The DCMIPP handles essential tasks such as cropping, decimation, and downscaling to prepare the raw sensor data for both the AI model and the video encoder.
3.  **AI Inference**: A quantized object detection model, generated via **STEdgeAI**, runs on the N6's integrated NPU. This acceleration allows for low-latency detection of people and objects without taxing the main CPU cores.
4.  **H.264 Encoding**: Instead of streaming raw video, which would exceed bandwidth limits at high resolutions, the system uses a hardware H.264 encoder to compress the stream.
5.  **USB Streaming**: The compressed video and detection metadata (bounding boxes) are packaged into a USB Video Class (UVC) stream using the **Azure RTOS USBX** stack, making the device appear as a standard webcam to a host computer.

## Hardware and Sensor Support

The project is optimized for the **STM32N6570-DK Discovery Board**. A notable characteristic of the STM32N6 series is the absence of internal flash memory; consequently, the application demonstrates how to boot from external flash or run in development mode directly from SRAM. 

The application supports several high-end camera modules with varying resolutions and frame rates:
- **IMX335**: 1280x720 @ 30fps
- **VD66GY**: 1120x720 @ 30fps
- **VD55G1**: 640x480 @ 30fps
- **VD1943**: 1280x720 @ 30fps

## Development Environment

To build and deploy this project, the repository supports multiple industry-standard toolchains:
- **STM32CubeIDE**: For an integrated Eclipse-based development experience.
- **IAR Embedded Workbench (EWARM)**: Version 9.40.1 with the N6 specific patch.
- **Makefile**: For developers preferring command-line builds and GDB-based debugging.

Because the AI model weights and biases are significant in size, they are handled as a separate binary (`network_data.hex`) that is programmed into the external flash alongside the application firmware.

## Getting Started and Host Integration

Once the firmware is flashed, the board operates as a UVC-compliant device. On a Windows host, you can view the stream using `ffplay` from the ffmpeg suite:

```bash
ffplay.exe -f dshow -i video="STM32 uvc"
```

On Linux, standard webcam applications like `guvcview` or `VLC` can be used, provided they support H.264 decoding. The output displays the live camera feed with bounding boxes drawn around detected people, including confidence levels calculated by the NPU.

## Advanced Boot Configurations

Handling the memory architecture of the STM32N6 is a key part of this project. The repository provides instructions for two primary modes:
- **Development Mode**: Loads firmware into RAM during a debug session, ideal for rapid iteration.
- **Boot from Flash**: Programs the First Stage Boot Loader (FSBL), the signed application binary, and the AI model data into external flash for persistent operation. 

For production-like deployments, the project includes the use of the `STM32_SigningTool_CLI` to sign the application binary, ensuring it is recognized by the bootloader during the power-on sequence.
