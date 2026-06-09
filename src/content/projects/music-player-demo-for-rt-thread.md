---
title: Music Player Demo for RT-Thread
summary: A modern, smartphone-like music player demonstration for RT-Thread using
  the LVGL graphics library. It features advanced spectrum animations, album art zooming,
  and a responsive UI optimized for 480x272 or 272x480 displays.
slug: music-player-demo-for-rt-thread
codeUrl: https://github.com/RT-Thread-packages/lv_demo_music
star: 11
version: v0.3.4
lastUpdated: '2023-12-25'
rtos: rt-thread
libraries:
- lvgl
topics:
- lvgl
- music
- rt-thread
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- sonosesp-esp32-p4-sonos-controller
- esp32-st7789v-ft6236u-arduino-lvgl-demo
- melody-machine
- lumia-esp32
- tinyradio9-for-wt32-sc01-plus
- lvgl-demo-embarcadores
---

## Overview

The Music Player Demo for RT-Thread showcases the capabilities of the LVGL (Light and Versatile Graphics Library) in creating modern, fluid user interfaces on embedded systems. Designed specifically as a package for the RT-Thread RTOS, this demo provides a high-fidelity music player experience similar to those found on modern smartphones. It is particularly optimized for displays with resolutions around 480x272 or 272x480 pixels.

## Key Features

The demo is more than just a static interface; it includes several dynamic components that demonstrate the power of LVGL's animation engine:

- **Spectrum Animation**: A real-time visualizer that reacts to music data. It uses a sophisticated algorithm to zoom the album cover proportionally to bass values and displays mirrored frequency bands around a circular interface.
- **Interactive UI**: Includes a track list, play/pause controls, next/previous track navigation, and a progress slider with custom styling.
- **Auto-Play Modes**: Supports automatic playback for testing purposes, including a mode that calculates and displays average FPS results after 40 seconds of playback.
- **Gesture Support**: Users can navigate through the album art using swipe gestures (left/right) to change tracks.

## Technical Implementation

The project is structured as an RT-Thread package, utilizing the SCons build system. The core logic is contained within `lv_demo_rtt_music_main.c`, which manages the creation of the UI grid, animation callbacks, and event handling.

### Spectrum Visualization

One of the most interesting technical aspects is how the spectrum animation is generated. The project includes a Python utility, `assets/spectrum.py`, which uses the `librosa` library to analyze MP3 files. It extracts four frequency bands (bass, bass-mid, mid, mid-treble) at 33 samples per second and generates a C header file (`spectrum.h`) containing the raw data for the embedded application to consume.

### Configuration and Integration

To use this demo within an RT-Thread project, developers need to enable specific macros in their `lv_conf.h` file. This allows for fine-grained control over features like auto-play and display orientation.

```c
/* music player demo configuration */
#include <rtconfig.h>

#define LV_HOR_RES_MAX              LCD_WIDTH
#define LV_VER_RES_MAX              LCD_HEIGHT
#define LV_USE_DEMO_RTT_MUSIC       1
#define LV_DEMO_RTT_MUSIC_AUTO_PLAY 1
#define LV_FONT_MONTSERRAT_12       1
#define LV_FONT_MONTSERRAT_16       1
#define LV_COLOR_SCREEN_TRANSP      1
```

Once configured, the demo is launched by calling a single initialization function within the user's GUI thread:

```c
void lv_user_gui_init(void)
{
    extern void lv_demo_music(void);
    lv_demo_music();
}
```

## Hardware and Performance

While the demo can run on various hardware supported by RT-Thread and LVGL, it shines on platforms with hardware acceleration for graphics. The spectrum animation uses polygon drawing and trigonometric functions to create the "walking" effect of the bars, which serves as an excellent benchmark for the system's rendering performance and FPS stability.
