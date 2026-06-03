---
title: UniGraphic Video Player for ILI9341V
summary: A video player implementation for Mbed OS designed to play raw video files
  on ILI9341V LCD displays. It leverages the UniGraphic library for display abstraction
  and supports high-speed SD card access via SDIO to maintain target frame rates.
slug: unigraphic-video-player-for-ili9341v
codeUrl: https://github.com/vketch/videoplayer
star: 1
lastUpdated: '2021-12-02'
rtos: mbed-os
topics:
- ili9341v
- mbed-os
- nucleo-f412zg
- unigraphics
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- st7735-video-playback-for-stm32
- cheap-yellow-display-video-player-esp32-2432s028
- usb-video-class-uvc-for-raspberry-pi-pico
- lvgl-port-for-stm32f429-discovery-kit
- stm32-displaylink
- animated-gif-on-a-320x240-lcd-display-ili9341-with-the-esp32
---

## Overview

This project provides a specialized video player for embedded systems, specifically designed to work with the ILI9341V LCD controller. Built on top of the UniGraphic library, it offers a straightforward way to render raw video data from a file system onto a display. While it is optimized for the ILI9341V, the architecture is designed to be extensible, allowing for relatively easy adaptation to other LCD controllers supported by the UniGraphic ecosystem.

## Key Features and Capabilities

The player is designed with performance and timing in mind. One of its core features is the ability to handle specific FPS (Frames Per Second) requests. In scenarios where the hardware cannot keep up with the requested frame rate, the player implements a periodic frame-skipping mechanism. This ensures that the video timeline remains accurate, preventing the playback from falling behind the intended duration.

To achieve the throughput required for video playback, the project utilizes raw video files. This minimizes the processing overhead on the microcontroller, shifting the bottleneck to the storage interface. The implementation specifically recommends using an SD card connected via an SDIO interface to ensure the data transfer rate is sufficient for smooth playback.

## Technical Implementation

The project is built for the Mbed OS environment. Because standard Mbed OS does not always provide out-of-the-box support for SDIO drivers on all platforms, this implementation demonstrates how to integrate third-party components like `COMPONENT_SDIO` to achieve high-speed storage access. 

The video player interacts with the display through the UniGraphic library, which provides a hardware abstraction layer for various display controllers. In the provided example, the system is configured for a NUCLEO-F412ZG board, utilizing SPI with DMA (Direct Memory Access) to maximize display update speeds.

## Getting Started

To use the video player, you need a raw video file stored on a FAT-formatted SD card. The player expects the file system to be initialized and passed to the `VideoPlayer` instance. Below is a typical setup for a NUCLEO-F412ZG board:

```cpp
#include "mbed.h"
#include "SDIOBlockDevice.h"
#include "FATFileSystem.h"
#include "ILI9341V.h"
#include "VideoPlayer.h"

// File system on SD card connected over SDIO
static SDIOBlockDevice bd;
BlockDevice *blockDevice = BlockDevice::get_default_instance();
FATFileSystem fs("sd", blockDevice);

// LCD Configuration using SPI with DMA
ILI9341V myLCD(SPI_DMA_, 10000000, D11, D12, D13, D10, D8, D7, "myLCD");

int main()
{
    VideoPlayer video_player(&myLCD);

    // Open the raw video file and play at 21 FPS
    File file(&fs, "raw_video.raw");
    video_player.play(file, 21);

    while (true) {
        ThisThread::sleep_for(500ms);
    }
}
```

## Hardware Requirements

While the software is flexible, the current implementation is tested and verified on:
- **Microcontroller**: NUCLEO-F412ZG (STM32)
- **Display**: ILI9341V LCD
- **Storage**: SD Card via SDIO interface

The use of SDIO is critical for maintaining higher frame rates, as standard SPI-based SD card access often lacks the bandwidth required for real-time video streaming on embedded displays.
