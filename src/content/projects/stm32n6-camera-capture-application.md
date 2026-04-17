---
title: STM32N6 Camera Capture Application
summary: This computer vision application demonstrates high-performance video streaming
  using USB UVC on STM32N6 series microcontrollers. It utilizes FreeRTOS for multi-threaded
  management and the Azure RTOS USBX stack to stream YUV422 video at various resolutions
  up to 800x480 at 30 FPS.
slug: stm32n6-camera-capture-application
codeUrl: https://github.com/STMicroelectronics/x-cube-n6-camera-capture
version: v2.0.0
lastUpdated: '2025-11-10'
licenses:
- NOASSERTION
image: /202604/x-cube-n6-camera-capture_0.avif
rtos: freertos
topics:
- ai
- camera
- camera-capture
- computer-vision
- freertos
- stm32
- stm32cube-mcu-expansion
- stm32cube-mcu-package
- stm32n6
isShow: true
createdAt: '2026-04-17T10:06:12+00:00'
updatedAt: '2026-04-17T10:06:12+00:00'
---

The STM32N6 series represents a significant step in performance for the STM32 family, and this application serves as a primary demonstration of its multimedia capabilities. Designed for the STM32N6570-DK Discovery Board and the NUCLEO-N657X0-Q Nucleo Board, the project focuses on capturing video from high-quality camera sensors and streaming that data to a host PC via the USB Video Class (UVC) protocol.

At its core, the application manages a complex data pipeline that bridges high-speed camera interfaces with USB communication. It supports several dynamically selectable video formats, ranging from 224x224 to 800x480 resolutions, all maintained at a consistent 30 frames per second using the YUV422 format. This makes the board appear to a host computer as a standard webcam, compatible with most standard video capture software.

### Hardware and Sensor Integration

The project is optimized for the IMX335 camera module and several STEVAL evaluation modules (including the 55G1MBI, 66GYMAI1, and 1943-MC1). To handle the high data throughput required for video, the application utilizes the Digital Camera Memory Interface and Pixel Processor (DCMIPP) hardware block. This peripheral is responsible for crucial image processing tasks such as cropping, decimation, and downscaling, which offload significant processing requirements from the main CPU.

Because the STM32N6 series does not feature internal flash memory, the project highlights unique boot configurations. Developers can work in a Development Mode, where firmware is loaded directly into SRAM for rapid debugging, or a Boot from Flash mode, where the firmware is programmed into external flash. Achieving maximum speed on the xSPI interfaces (up to 200MHz) requires specific OTP fuse configurations, which are documented as part of the hardware setup.

### Software Architecture

The software architecture is built on FreeRTOS, providing a multi-threaded flow that ensures the camera capture, image processing, and USB transmission tasks operate concurrently without stalling the pipeline. While the main application logic is managed by FreeRTOS, the project integrates the Azure RTOS USBX stack to handle the complexities of the UVC protocol.

The application also utilizes the internal Image Signal Processor (ISP) to refine the raw data from the camera sensor before it reaches the USB stack. This hardware-level processing ensures that the video stream remains fluid even at higher resolutions. For ease of deployment, the project provides two binary flavors: a "front" orientation for selfie-like views and a "rear" orientation for traditional camera-like perspectives.

### Development and Tooling

Support is provided for major embedded development environments, including IAR Embedded Workbench (EWARM), STM32CubeIDE, and a standard Makefile approach for GCC-based workflows. The build process for the "Boot from Flash" mode includes a specific signing step using the STM32 Signing Tool, which is necessary for the secure boot and execution process of the STM32N6 series. Users can monitor application status and telemetry via a serial console configured at 115200 bps through the onboard ST-LINK adapter.
