---
title: MicroPython Encoder Menu
summary: A lightweight, asynchronous menu system for MicroPython designed for rotary
  encoders and OLED displays. It provides a flexible framework for creating submenus,
  handling user input, and managing non-blocking tasks on platforms like the Raspberry
  Pi Pico and ESP32.
codeUrl: https://github.com/sgall17a/encodermenu
isShow: false
rtos: ''
libraries:
- micropython
topics:
- asyncio
- encoder
- menu
- micropython
- oled
- rotary
- wizard
star: 116
lastUpdated: '2021-04-08'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- micropython-rotary-encoder-driver
- pikapython
- raspberry-pi-pico-web-server-control
- micropython-kitchen-sink-for-m5stack
- pycopy
- pycopy-standard-library-pycopy-lib
---

Creating a user interface for small embedded devices can be a challenge, especially when you are limited to a tiny OLED screen and a single rotary encoder. The **encodermenu** project provides a streamlined solution for MicroPython developers looking to build navigable, multi-level menus without blocking their main application logic.

Originally developed for the Raspberry Pi Pico, this library is also compatible with ESP32 and ESP8266 boards. It is designed to work out-of-the-box with SSD1306-based OLED displays and standard rotary encoders that include an integrated push-button. By leveraging MicroPython's `uasyncio` library, the menu system ensures that your device can continue to handle background tasks—like driving Neopixels or monitoring sensors—while the user interacts with the display.

## Flexible Menu Definitions

The core of the system is based on a simple list-and-tuple structure. Each menu item consists of a caption and an action function. Because menus themselves are wrapped into functions, creating submenus is as simple as nesting one menu definition inside another. 

```python
trees = wrap_menu([
    ('gum', wizard), 
    ('ti-tree', info), 
    ('red-gum count', get_integer), 
    ('Back!', back)
])

main_menu = wrap_menu([
    ('Patterns', patterns), 
    ('Trees', trees), 
    ('Brightness', brightness)
])
```

This hierarchical approach allows for deep navigation structures while keeping the code readable and easy to maintain.

## Advanced Input Handling

Beyond simple navigation, the library includes several built-in functions to capture data from the user:

*   **get_integer**: Allows users to select a numeric value by rotating the encoder. It supports minimum/maximum bounds and increments.
*   **get_selection**: Provides a way to choose a string or value from a predefined list, similar to a dropdown menu.
*   **wizard**: A sequence of input prompts (like setting hours, then minutes, then seconds) that guides the user through a multi-step configuration process.
*   **info**: A simple way to display a screen of text or dynamic data (like the current time) that clears upon the next user interaction.

Data captured through these inputs is stored in a global dictionary, making it easily accessible to other parts of your application.

## Asynchronous and Non-Blocking

One of the standout features of this library is its integration with `uasyncio`. In many embedded projects, a blocking menu would stop all other processes (like a blinking LED or a motor controller). This library runs within an event loop, polling the hardware for clicks and rotations while allowing other coroutines to run.

If you have a long-running task, such as a rainbow pattern on a Neopixel strip, you can use the provided utility functions `make_task()` and `stop()` to manage these background operations directly from menu actions. This ensures that selecting a new light pattern automatically stops the previous one and starts the new task without freezing the UI.

## Hardware Abstraction

While the project defaults to using the `rotary-irq` and `ssd1306` libraries, it is built with a minimal hardware abstraction layer (HAL). This makes it relatively straightforward to adapt the system for different display types—such as character LCDs—or different encoder libraries. If your display driver supports the standard MicroPython `framebuf` module, it will likely work with minimal modification.

Whether you are building a home automation controller, a custom synthesizer, or a handheld gadget, the MicroPython Encoder Menu offers a robust foundation for professional-feeling hardware interfaces.
