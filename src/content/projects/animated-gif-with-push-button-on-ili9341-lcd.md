---
title: Animated GIF with Push Button on ILI9341 LCD
summary: This project provides firmware for the ESP32-S3 to display and cycle through
  animated GIFs stored in flash memory on a 320x240 ILI9341 LCD. It utilizes the bb_spi_lcd
  and AnimatedGIF libraries to manage display control and image decoding, allowing
  users to switch animations via a physical push button.
slug: animated-gif-with-push-button-on-ili9341-lcd
codeUrl: https://github.com/thelastoutpostworkshop/AnimatedGIF340_240_Push_Button
siteUrl: https://youtu.be/omUWkUqFYrQ
lastUpdated: '2024-07-30'
licenses:
- MIT
image: /202606/AnimatedGIF340_240_Push_Button_0.avif
rtos: ''
topics:
- esp32
- gif
- gif-animation
- ili9341
isShow: true
createdAt: '2026-06-04T23:39:16+00:00'
updatedAt: '2026-06-04T23:39:16+00:00'
relatedProjects:
- animated-gif-on-a-320x240-lcd-display-ili9341-with-the-esp32
- animated-gif-stored-in-sd-card-and-played-from-spiffs-on-a-round-display-gc9a01-with-the-esp32
- gif-decoder-for-lvgl
- readmepaper-esp32-7-color-e-paper-display-project
- jc4827w543-lvgl-v9-implementation
- deck
---

Visual feedback is a cornerstone of modern embedded projects, and adding animated GIFs to a small display can significantly enhance the user experience. This project demonstrates how to implement a robust GIF player on an ESP32-S3 using a standard 320x240 ILI9341 LCD. By leveraging the processing power of the ESP32-S3, the application can decode and render animations smoothly in real-time.

## Hardware and Display Control

The setup centers around the ESP32-S3, a powerful microcontroller with sufficient memory and speed to handle the computational overhead of GIF decoding. The display is a 320x240 LCD driven by the ILI9341 controller over a high-speed SPI interface. The project utilizes the `bb_spi_lcd` library, which provides efficient display driver control tailored for this hardware configuration.

## GIF Decoding and Memory Management

Handling animated images on a microcontroller requires efficient decoding. This project uses the `AnimatedGIF` library to parse the GIF format and manage individual frame rendering. A notable feature of this implementation is that the animated GIFs are stored directly in the program memory (flash) along with the code. This approach eliminates the need for an external SD card, reducing the physical footprint and complexity of the hardware while ensuring fast access to the image data.

## Interactive Functionality

To make the display interactive, the firmware integrates a physical push button. This button allows the user to cycle through multiple stored animations stored in the partition memory. The code manages the state transitions, ensuring that the current animation is cleared and the next one begins decoding and rendering upon a button press. This makes the project highly suitable for applications such as digital badges, interactive desk toys, or custom status indicators.

## Technical Implementation

The firmware is structured as an Arduino sketch (`.ino`), making it accessible for rapid prototyping. It handles several low-level tasks, including:

- **SPI Initialization**: Setting up the communication bus for the ILI9341 display.
- **Partition Management**: Utilizing standard ESP32 system headers to interact with flash memory where the GIF assets are stored.
- **Frame Rendering**: Coordinating between the GIF decoder and the LCD driver to push pixel data to the screen at the correct intervals.
- **Interrupt/Polling Logic**: Monitoring the push button state to trigger animation changes.

This project serves as a practical example for developers looking to integrate rich visual assets into ESP32-based hardware projects without the overhead of a full operating system or external storage modules.
