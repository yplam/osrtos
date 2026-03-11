---
title: ESPUI
summary: A simple Arduino-style library for creating web-based user interfaces on
  ESP8266 and ESP32 microcontrollers. It leverages WebSockets for real-time control
  and supports a wide range of UI elements including sliders, switches, and graphs.
slug: espui
codeUrl: https://github.com/s00500/ESPUI
star: 1052
version: 2.2.4
lastUpdated: '2025-11-26'
rtos: freertos
libraries:
- littlefs
topics:
- arduino
- arduino-ide
- arduino-library
- browser
- callback
- control-pad
- easy
- esp32
- esp8266
- iot
- javascript
- slide
- spiffs
- tablet
- ui
- user-interface
- userinterface
- webinterface
- websockets
isShow: true
image: /202512/ui_complete.webp
createdAt: '2025-12-28'
updatedAt: '2025-12-28'
---

# ESPUI: Streamlined Web Interfaces for ESP8266 and ESP32

ESPUI is a library designed to simplify the creation of web-based graphical user interfaces (GUIs) for the popular ESP8266 and ESP32 microcontrollers. For many embedded developers, building a responsive web interface involves juggling HTML, CSS, JavaScript, and backend C++ code. ESPUI abstracts this complexity, offering an "Arduino-style" syntax that allows developers to define UI elements directly within their firmware sketches.

## Real-Time Interaction via WebSockets

At its core, ESPUI relies on the `ESPAsyncWebserver` and WebSockets. This architecture ensures that communication between the microcontroller and the client (such as a smartphone or tablet) is bi-directional and instantaneous. When a user toggles a switch on the web interface, the change is pushed to the ESP device immediately. Conversely, if the ESP updates a sensor value, the change is reflected across all connected clients in real-time without requiring a page refresh.

## A Rich Library of UI Elements

ESPUI provides a comprehensive suite of pre-built components that cover most IoT use cases:

*   **Basic Controls**: Buttons, switches, and sliders for direct interaction.
*   **Input Fields**: Text, number, date, time, and color pickers, as well as password fields.
*   **Information Display**: Labels for sensor data and a specialized "File Display" for viewing contents of the ESP's internal filesystem.
*   **Navigation**: Support for tabs allows developers to organize complex interfaces into multiple pages.
*   **Specialized Widgets**: A "Buttonpad" (with or without a center button) is included for controlling movements, such as for robotics or camera gimbals.

## Advanced Customization and Styling

While ESPUI works out of the box with a clean, default look based on Skeleton CSS, it offers significant flexibility for advanced users. One of its standout features is the support for **Inline Styles**. Developers can apply custom CSS directly to specific panels or elements, enabling unique color schemes, drop shadows, and custom layouts.

Additionally, controls can be dynamically enabled, disabled, or hidden at runtime. This is particularly useful for creating context-aware interfaces where certain settings only become available based on the device's state.

## Efficient Resource Management

Web interfaces require assets like HTML, CSS, and JavaScript files. ESPUI handles this in two ways:

1.  **PROGMEM**: Files are stored directly in the program memory, making the setup "plug-and-play."
2.  **LittleFS**: For projects where program memory is tight, ESPUI can serve these assets from the ESP's flash filesystem. The library includes a helper function, `ESPUI.prepareFileSystem()`, to automate the process of burning these files to the chip.

## Getting Started Example

Creating a simple interface is straightforward. After initializing your network connection, you can add controls in the `setup()` function:

```cpp
void setup() {
  // ... Network setup ...

  ESPUI.button("Push Me", &buttonCallback, ControlColor::Peterriver);
  ESPUI.slider("Brightness", &sliderCallback, ControlColor::Alizarin, 50);

  ESPUI.begin("Control Panel");
}
```

The callback functions receive a pointer to the control and an event type (e.g., `B_DOWN`, `B_UP`, `SL_VALUE`), allowing for granular control over user interactions. To differentiate between events, developers typically use a `switch` statement within the callback to handle specific actions like button presses or slider movements.

## Conclusion

ESPUI is an excellent choice for developers who want to add a professional-looking interface to their ESP-based projects without the overhead of full-stack web development. Its combination of ease of use, real-time performance, and deep customization options makes it a staple library in the ESP32 and ESP8266 ecosystem.
