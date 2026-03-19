---
title: ZMK Tri-State Behavior
summary: A custom behavior module for ZMK Firmware that implements tri-state logic,
  allowing keys to persist state until interrupted. It enables advanced keyboard features
  like 'Swapper' for window switching and is fully compatible with Zephyr RTOS 3.5.
slug: zmk-tri-state-behavior
codeUrl: https://github.com/dhruvinsh/zmk-tri-state
star: 19
lastUpdated: '2025-03-16'
rtos: zephyr
topics:
- zephyr
- zmk
- zmk-config
- zmk-firmware
isShow: false
createdAt: '2026-03-19'
updatedAt: '2026-03-19'
---

ZMK Tri-State is a specialized behavior module designed for the ZMK Firmware ecosystem, bringing advanced stateful key logic to custom mechanical keyboards. Originally inspired by Nick Conway's implementation for QMK, this module allows users to define keys that perform different actions based on the sequence of presses and external interruptions, without needing to maintain a separate fork of the ZMK source code.

At its core, a Tri-State behavior operates in three distinct phases: start, continue, and interrupt. When the key is first pressed, it triggers a 'start' behavior. Subsequent presses of the same key trigger a 'continue' behavior. The state remains active until an 'interrupt' event occurs—such as pressing a different key or changing a layer—at which point a final 'deactivation' behavior is fired. This logic is particularly useful for implementing features like "Swapper," which mimics the behavior of Alt-Tab on Windows or Cmd-Tab on macOS, where a modifier is held while a secondary key is tapped repeatedly.

### Technical Implementation

One of the strengths of this implementation is its seamless integration with the ZMK module system. It is designed to be added to a user's configuration via the `west.yml` manifest, ensuring that the custom behavior is pulled in during the build process. It maintains full compatibility with Zephyr RTOS 3.5, which serves as the underlying real-time operating system for ZMK. By leveraging the Zephyr device tree system, users can define these behaviors directly in their keymap files.

### Advanced Configuration

The behavior is highly customizable through several Devicetree properties that allow for fine-tuned control over how the state is maintained and broken:

- **timeout-ms**: This property allows the deactivation behavior to fire automatically after a specified period of inactivity following the release of the Tri-State key.
- **ignored-key-positions**: This is an array of key indexes that, when pressed, will not trigger the interrupt behavior. This is essential for complex macros where multiple keys might need to interact while the Tri-State remains active.
- **ignored-layers**: This prevents layer changes from accidentally terminating the behavior, allowing for sophisticated multi-layer interactions where the user might toggle a layer to access different 'continue' actions.

### Usage Example

To use Tri-State in a ZMK keymap, users define the behavior in their Devicetree configuration. Below is a basic example of a Tri-State configuration used to create a window swapper:

```devicetree
/ {
    behaviors {
        swap: swapper {
            compatible = "zmk,behavior-tri-state";
            label = "SWAPPER";
            #binding-cells = <0>;
            bindings = <&kt LALT>, <&kp TAB>, <&kt LALT>;
            ignored-key-positions = <1>;
        };
    };

    keymap {
        default_layer {
            bindings = <
                &swap    &kp LS(TAB)
                &kp B    &kp C>;
        };
    };
};
```

In this scenario, the first press activates a 'Key Toggle' for Left Alt and sends a Tab. Subsequent presses of the `&swap` key send Tab again. Because `LS(TAB)` (Shift-Tab) is included in the `ignored-key-positions`, it can be used to navigate backward through the window list without releasing the Alt modifier. Once a key like `&kp B` is pressed, the interrupt fires, and the final `&kt LALT` binding is triggered to release the modifier.

This module is a testament to the extensibility of ZMK and Zephyr, providing power users with the tools to create highly optimized and ergonomic input sequences for specialized hardware.
