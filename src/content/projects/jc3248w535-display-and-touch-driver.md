---
title: JC3248W535 Display and Touch Driver
summary: A high-performance driver for the JC3248W535 3.5-inch IPS touchscreen module
  powered by the ESP32-S3. It features a 40MHz QSPI display interface and I2C capacitive
  touch support, optimized for use with the Arduino_GFX library.
slug: jc3248w535-display-and-touch-driver
codeUrl: https://github.com/me-processware/JC3248W535-Driver
version: v1.0.0
lastUpdated: '2025-10-29'
licenses:
- MIT
rtos: freertos
topics:
- arduino
- axs15231
- display
- driver
- embedded
- esp32
- esp32-s3
- iot
- jc3248w535
- platformio
- qspi
- touchscreen
isShow: false
createdAt: '2026-08-12T13:57:33+00:00'
updatedAt: '2026-08-12T13:57:33+00:00'
relatedProjects:
- jc3248w535-lvgl-v9-test-project
- jc4827w543-lvgl-v9-implementation
- lvgl-8-on-wt32-sc01-with-arduino
- esp32-smartdisplay
- esp32-8048s050c-with-lvgl-9-4-and-freertos
- lvgl-display-and-touchpad-drivers-for-esp32
---

The JC3248W535 is a specialized 3.5-inch IPS touchscreen display module that integrates an ESP32-S3-WROOM-1 microcontroller. This driver provides a clean, minimal interface to harness the module's capabilities, specifically focusing on high-speed display updates and responsive touch interaction. By leveraging the ESP32-S3's Quad SPI (QSPI) peripheral and dedicated I2C bus, the driver enables fluid graphical user interfaces on the 320x480 resolution panel.

### Hardware Architecture

The module is built around an IPS LCD panel controlled via a QSPI interface running at 40MHz. This high-bandwidth connection is essential for maintaining acceptable frame rates at the native 320x480 resolution. For user input, the module features a capacitive touch layer managed by the AXS15231B controller. The driver maps these touch coordinates directly to the display's pixel grid, accounting for different screen orientations.

A critical technical requirement for this driver is the use of PSRAM. Because the driver utilizes a canvas-based rendering approach through the Arduino_GFX library, it requires approximately 300KB of RAM for the frame buffer. On the ESP32-S3, this must be allocated in external PSRAM, making the module's 8MB of PSRAM a necessity rather than an option.

### Graphics and Touch Integration

The driver is designed to work seamlessly with the `Arduino_GFX` library. It provides a `getCanvas()` method that returns a pointer to a drawing surface, allowing developers to use standard graphics primitives such as lines, circles, and text. Once drawing operations are complete, a `flush()` command pushes the buffer to the physical display.

The touch interface supports single-point capacitive sensing. The driver handles the I2C communication protocol required by the AXS15231B, including a specific 8-byte command sequence to retrieve 12-bit coordinate data. To ensure smooth interaction, especially for drawing applications, the driver is optimized for high-frequency polling.

### Display Rotation and Coordinate Mapping

Handling display orientation is a core feature of the driver. It supports four rotation modes (0, 90, 180, and 270 degrees). When the rotation is changed, the driver automatically recalculates the width and height parameters and, crucially, re-maps the touch input coordinates so that they align with the visual elements on the screen.

### Implementation Example

Setting up the driver involves initializing both the display and touch objects. The following example demonstrates a basic setup and a simple touch-to-serial loop:

```cpp
#include <JC3248W535.h>

JC3248W535_Display display;
JC3248W535_Touch touch;

void setup() {
  Serial.begin(115200);
  
  // Initialize hardware
  if (!display.begin()) {
    Serial.println("Display init failed - Check PSRAM settings!");
    while(1);
  }
  touch.begin();
  
  // Basic drawing
  auto gfx = display.getCanvas();
  gfx->fillScreen(BLACK);
  gfx->setTextColor(WHITE);
  gfx->print("System Ready");
  display.flush();
}

void loop() {
  TouchPoint point;
  if (touch.read(point)) {
    Serial.printf("X: %d, Y: %d\n", point.x, point.y);
  }
  delay(1);
}
```

### Performance Considerations

To achieve the best performance, developers should be aware of the I2C polling rate. The AXS15231B controller performs best when polled at roughly 100-200Hz. In the Arduino loop, using a minimal delay (such as `delay(1)`) ensures that touch inputs are captured with low latency, which is vital for applications like drawing pads or sliders. Furthermore, the QSPI clock is set to 40MHz by default, providing a bandwidth of approximately 160Mbps for display data transfers.
