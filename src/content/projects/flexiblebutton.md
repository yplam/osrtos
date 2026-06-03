---
title: FlexibleButton
summary: A lightweight and flexible C library for handling button events in embedded
  systems. It supports various interactions including clicks, double-clicks, long
  presses, and combination keys, with a decoupled architecture compatible with both
  RTOS (like RT-Thread) and bare-metal environments.
slug: flexiblebutton
codeUrl: https://github.com/murphyzhao/FlexibleButton
star: 834
version: 2.0.1
lastUpdated: '2020-04-12'
rtos: rt-thread
topics:
- button
- flex-button
- flexiblebutton
- iot-board
- rt-thread
isShow: false
createdAt: '2025-12-28'
updatedAt: '2025-12-28'
relatedProjects:
- doubleresetdetector-generic
- smart-keymap
- debouncein
- embedmcp-embedded-mcp-server-library
- gooey-gui-library
- lvgl-joystick-library
---

FlexibleButton is a compact and versatile button processing library written in standard C. It is designed to handle a wide range of button interactions, including single clicks, double clicks, multiple clicks, short presses, long presses, and automatic debouncing. One of its standout features is the ability to easily configure combination keys, making it suitable for complex user interfaces in resource-constrained embedded environments.

## Core Philosophy and Architecture

The library is built on a decoupled architecture, meaning it does not depend on specific hardware registers or GPIO implementations. Instead, it uses a scanning method to read all button states at once and reports events through a callback mechanism. This abstraction allows it to support virtually any processor platform and works seamlessly in both OS-based (RTOS) and non-OS (bare-metal) environments.

At its heart, FlexibleButton utilizes a classic "three-line button scan algorithm," which keeps the core logic extremely efficient. The resource footprint is remarkably small; when compiled with ARMCC at -O0 optimization, it occupies less than 800 bytes of code and only 13 bytes of RW data.

## Key Features and Events

FlexibleButton provides a comprehensive set of button events that go beyond simple high/low state detection:
- **FLEX_BTN_PRESS_DOWN**: Initial press detection.
- **FLEX_BTN_PRESS_CLICK**: Standard single click.
- **FLEX_BTN_PRESS_DOUBLE_CLICK**: Rapid double click.
- **FLEX_BTN_PRESS_REPEAT_CLICK**: Continuous multiple clicks (tracked via a click counter).
- **FLEX_BTN_PRESS_SHORT_START / UP**: Short press initiation and release.
- **FLEX_BTN_PRESS_LONG_START / UP**: Long press initiation and release.
- **FLEX_BTN_PRESS_LONG_HOLD**: Continuous event while a button is held down, useful for incrementing values.

## Integration and Usage

For developers using RT-Thread, FlexibleButton is available as an online package via `menuconfig`, allowing for easy integration into existing projects. However, it is equally easy to use in bare-metal projects by simply including the source files and calling the scan function in a timer loop.

### Basic Configuration Example

To use the library, you define an array of `flex_button_t` structures and initialize them with your specific hardware read functions and event callbacks:

```c
static void user_button_init(void)
{
    for (int i = 0; i < USER_BUTTON_MAX; i++)
    {
        user_button[i].id = i;
        user_button[i].usr_button_read = common_btn_read; // Hardware read function
        user_button[i].cb = common_btn_evt_cb;           // Event callback
        user_button[i].pressed_logic_level = 0;          // Active low
        user_button[i].short_press_start_tick = FLEX_MS_TO_SCAN_CNT(1500);
        user_button[i].long_press_start_tick = FLEX_MS_TO_SCAN_CNT(3000);

        flex_button_register(&user_button[i]);
    }
}
```

### The Scanning Mechanism

The library relies on a periodic scan function, `flex_button_scan()`, which should be called every 5ms to 20ms. This function processes the state machine for all registered buttons and triggers the associated callbacks when events occur.

## Advanced Scenarios: Low Power and Interrupts

While the library defaults to a continuous scanning mode, it provides flexibility for power-sensitive applications. Developers can implement low-power strategies by:
1. Suspending the button scanning thread before entering sleep and resuming it upon wake-up.
2. Using an interrupt-driven approach where a GPIO interrupt triggers a single scan or resumes the scanning thread to confirm the button state.

FlexibleButton also supports matrix keyboards. By mapping the matrix scanning logic to the `usr_button_read` callback, developers can leverage the library's event-handling logic for complex keypad layouts.
