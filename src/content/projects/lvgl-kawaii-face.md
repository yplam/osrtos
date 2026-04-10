---
title: LVGL Kawaii Face
summary: An animated kawaii-style face widget for LVGL 9 on ESP32, featuring 17 distinct
  emotions with dynamic eye, mouth, and sparkle animations. It supports smooth transitions
  between expressions and integrates directly into the ESP-IDF component system.
slug: lvgl-kawaii-face
codeUrl: https://github.com/0015/lvgl_kawaii_face
siteUrl: https://www.that-project.com
version: v1.0.0
lastUpdated: '2026-02-27'
licenses:
- MIT
rtos: freertos
libraries:
- lvgl
topics:
- dynamic-animation
- embedded-graphics
- esp-idf-component
- kawaii-ui
- lvgl
- lvgl-esp32
isShow: false
createdAt: '2026-04-09T23:46:33+00:00'
updatedAt: '2026-04-09T23:46:33+00:00'
---

Bringing personality to embedded user interfaces often requires complex asset management or heavy video files. LVGL Kawaii Face offers a lightweight, programmatic alternative for developers using LVGL 9 on the ESP32. It is a dedicated widget that renders an animated, expressive face onto a canvas, allowing for a wide range of emotional feedback in human-machine interface (HMI) projects.

## Dynamic Expressions and Emotions

The core of the project is its ability to transition between 17 different emotional states. Rather than static frames, each emotion features its own set of dynamic behaviors. For example, the `FACE_SAD` state includes falling tears and a melancholy sway, while `FACE_LOVE` features heart-shaped eyes and a floating heartbeat animation. Other states like `FACE_WORKING_HARD` or `FACE_SURPRISED` include specific details such as dripping sweat or shock vibrations.

The widget handles the rendering of eyes, eyebrows, blush, and mouth shapes. It also supports smooth transitions between these expressions, ensuring that moving from a neutral state to an excited one feels fluid rather than jarring.

## Technical Implementation

Designed specifically for ESP-IDF (version 5.0 and later) and LVGL 9, the component is highly integrated into the Espressif ecosystem. It uses the LVGL canvas object as its drawing surface, which allows the face to scale automatically to fit its parent container. This makes it easy to place the face within a specific UI layout without manually recalculating coordinates for every eye or mouth movement.

Animations are driven by a configurable timer, typically running at around 33 FPS (30ms interval). The component also includes built-in logic for automatic blinking and idle glance movements, which helps the face feel "alive" even when the emotion isn't changing.

## Integration and Usage

Adding the widget to an ESP-IDF project is straightforward, as it is structured as a standard component. Once the folder is placed in the `components/` directory, the build system automatically handles dependencies like `lvgl` and `esp_timer`.

### Initialization

To get started, you define a configuration structure and initialize the animation engine. The widget requires a parent object (like a panel) to define its bounds.

```c
face_config_t cfg = {
    .parent          = face_panel,  // The LVGL object the face will fill
    .animation_speed = 30,          // Timer interval in ms
    .blink_interval  = 3000,        // Auto-blink every 3 seconds
    .auto_blink      = true,
};
ESP_ERROR_CHECK(face_animation_init(&cfg));
```

### Controlling Emotions

Changing the face's expression can be done instantly or with a transition effect. This allows developers to trigger reactions based on system events, such as a successful sensor reading or a low-battery warning.

```c
// Instant switch to a happy expression
face_set_emotion(FACE_HAPPY, false);

// Smoothly transition to a surprised face
face_set_emotion(FACE_SURPRISED, true);
```

## Thread Safety and Platform Support

Because LVGL is not thread-safe by default, this component includes mechanisms to handle locking. On ESP-IDF, it can automatically detect and use `esp_lvgl_port` for mutex locking. For other environments or custom LVGL implementations, developers can provide their own lock and unlock functions using `face_set_lvgl_lock_fns()`. This ensures that animation updates don't conflict with other UI tasks.
