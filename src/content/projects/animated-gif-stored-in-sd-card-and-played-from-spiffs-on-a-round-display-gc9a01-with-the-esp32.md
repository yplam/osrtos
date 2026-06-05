---
title: Animated GIF stored in SD Card and played from SPIFFS on a Round Display (GC9A01)
  with the ESP32
summary: This project demonstrates how to display animated GIFs on a round GC9A01
  TFT display using an ESP32. It implements a workflow that reads GIF files from an
  SD card, copies them to internal SPIFFS storage for optimized access, and renders
  them using the AnimatedGIF and TFT_eSPI libraries.
codeUrl: https://github.com/thelastoutpostworkshop/animated_gif_sdcard_spiffs
siteUrl: https://youtu.be/mqSe_uMpxIs
isShow: false
rtos: ''
libraries:
- spiffs
topics:
- animated-gif
- arduino
- esp32
- gc9a01
- sd-card
- sd-card-reader
- spiffs
- tftespi
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- animated-gif-on-a-320x240-lcd-display-ili9341-with-the-esp32
- animated-gif-with-push-button-on-ili9341-lcd
- readmepaper-esp32-7-color-e-paper-display-project
- cheap-yellow-display-video-player-esp32-2432s028
- gif-decoder-for-lvgl
- esp32-spiffs-image-generation-example
---

Displaying animated GIFs on microcontrollers can be a challenge due to memory constraints and storage speed. This project by the Last Outpost Workshop provides a robust solution for the ESP32, specifically targeting the popular GC9A01 round TFT display. By combining external SD card storage with the speed of internal SPIFFS (Serial Peripheral Interface Flash File System), it achieves smooth animation playback suitable for wearable tech, smart gauges, or decorative props.

## The Workflow: SD Card to SPIFFS

One of the most interesting aspects of this project is its two-stage storage approach. While SD cards are excellent for storing large numbers of GIF files, reading from them directly can sometimes introduce latency during high-frame-rate playback. 

In the `setup()` phase, the code initializes both the SD card and SPIFFS. It then formats the SPIFFS partition to ensure enough space is available, opens a specific GIF from the SD card (e.g., `x_wing.gif`), and copies the entire file into the ESP32's internal flash. This ensures that during the `loop()` phase, the `AnimatedGIF` library can pull data from the much faster internal memory, reducing stuttering.

## Technical Components and Libraries

The project relies on several key libraries to handle the heavy lifting of graphics and decoding:
- **TFT_eSPI**: A highly optimized library for driving displays like the GC9A01. It supports DMA (Direct Memory Access) for faster pixel pushing.
- **AnimatedGIF**: This library handles the complex task of decoding GIF frames, managing palettes, and handling transparency.
- **FS & SPIFFS**: Used for managing the internal file system on the ESP32.

## Optimized Rendering with GIFDraw

The project includes a dedicated `GIFDraw.ino` file that contains the `GIFDraw` callback function. This function is responsible for taking decoded pixel data and sending it to the display. It includes logic for:
- **Transparency Handling**: Correcting pixels based on the GIF's transparent color index.
- **DMA Support**: If `USE_DMA` is defined, the code uses double-buffering to push pixels to the screen while the next line is being processed, significantly boosting the frame rate (up to 71.6 FPS on some displays).
- **Display Cropping**: Ensuring that images larger than the display bounds are handled gracefully.

## Getting Started

To use this project, you will need an ESP32, a GC9A01 round display, and an SD card module. 

1.  **Configure TFT_eSPI**: You must edit the `User_Setup.h` file within the TFT_eSPI library to match your specific pinout and the GC9A01 driver.
2.  **Prepare the SD Card**: Place your desired GIF files in the root directory of the SD card.
3.  **Update the Filename**: In the main `.ino` file, change the `filename` variable to match your GIF (e.g., `const char *filename = "/darthvader.gif";`).

```c
// Example of the main loop playing the GIF
void loop()
{
  if (gif.open(filename, fileOpen, fileClose, fileRead, fileSeek, GIFDraw))
  {
    tft.startWrite();
    while (gif.playFrame(true, NULL))
    {
      // Frames are rendered via the GIFDraw callback
    }
    gif.close();
    tft.endWrite();
  }
}
```

This project serves as an excellent template for anyone looking to add high-quality visual assets to their ESP32 projects without sacrificing performance.
