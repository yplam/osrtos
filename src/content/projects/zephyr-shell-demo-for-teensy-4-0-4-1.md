---
title: Zephyr Shell Demo for Teensy 4.0/4.1
summary: A demonstration application showcasing the Zephyr RTOS shell on Teensy 4.0
  and 4.1 hardware. It features multi-threaded communication using message queues,
  hardware FPU support, and POSIX clock integration, providing a robust alternative
  to the standard Arduino stack for real-time control and IoT applications.
slug: zephyr-shell-demo-for-teensy-4-0-4-1
codeUrl: https://github.com/ufechner7/teensy4_shell
star: 13
lastUpdated: '2021-01-04'
rtos: zephyr
topics:
- shell
- teensy40
- zephyr
- zephyr-rtos
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- freertos-port-for-teensy-3-6-4-0-4-1
- zephyr-wi-fi-and-tcp-udp-connection-demo
- stm32l476g-discovery-rtos-sensor-project
- lvgl-demo-embarcadores
- zephyr-stm32-spi-example
- mender-ota-example-for-stm32l4-and-zephyr-rtos
---

## Overview

The Teensy 4.0 and 4.1 are exceptionally powerful microcontrollers, yet they are often limited by the standard Arduino software stack when used in professional control or IoT contexts. This project demonstrates how to leverage the Zephyr RTOS on Teensy hardware to unlock advanced features such as hard real-time scheduling, secure network stacks, and CANopen support. 

This specific repository serves as a tutorial for implementing an interactive shell interface, allowing developers to monitor and control the system in real-time through a serial console. It provides a template for building portable, secure, and maintainable embedded applications that can easily be migrated to other MCUs supported by Zephyr.

## Key Features

- **Interactive Shell**: A fully functional command-line interface (CLI) with tab completion, history, and custom commands like `blink` and `date`.
- **Multi-Threading**: Demonstrates concurrent execution of multiple threads, including dedicated tasks for LED control, button debouncing, and UART communication.
- **Inter-Thread Communication**: Uses Zephyr's message queues (`k_msgq`) and atomic global variables to pass data safely between threads.
- **Hardware Floating Point**: Configured to use the hardware FPU for both single and double-precision calculations, with context switching support enabled.
- **POSIX Clock Integration**: Enables the use of standard POSIX date and time APIs, allowing the system to track and set time via the shell.
- **Flexible Serial Mapping**: Standard output can be dynamically mapped between USB-serial (CDC_ACM) and physical UART pins.

## Technical Implementation

The project is structured around the Zephyr build system using `west`. Configuration is handled through `prj.conf`, where various kernel features are toggled. For example, the shell is enabled and configured with specific stack sizes and history buffers to ensure stability on the i.MX RT1062 processor.

Hardware-specific configurations, such as pin assignments for the button (Pin 23) and the toggle LED (Pin 9), are defined using DeviceTree overlays (`teensy40.overlay`). This ensures that the application logic remains decoupled from the specific hardware pinout.

### Defining Custom Shell Commands

One of the project's strengths is demonstrating how to extend the shell. By using the `SHELL_CMD_ARG_REGISTER` macro, developers can add custom logic that interacts with the running system. Below is an example of how the `blink` command is implemented to control the LED thread:

```c
static int cmd_blink(const struct shell *shell, size_t argc, char **argv)
{
    if (argc == 2) {
        if (strcmp(argv[1], "on") == 0) {
            shell_print(shell, "on");
            blink_stat = true;
            k_wakeup(led_id);
        } else if (strcmp(argv[1], "off") == 0) {
            shell_print(shell, "off");
            blink_stat = false;
            k_wakeup(led_id);
        }
    }
    return 0;
}

SHELL_CMD_ARG_REGISTER(blink, NULL, "Turn blinking on or off", cmd_blink, 2, 0);
```

## Communication and Monitoring

The application utilizes a message queue to handle data from a physical button. When the button (connected to pin 23) is pressed, a string is pushed to a queue, which the UART thread then processes and logs. This pattern prevents the UI or high-priority tasks from blocking on slow I/O operations.

Users can also monitor system health directly through the shell. Commands like `kernel stacks` provide real-time insight into memory usage, helping developers identify potential stack overflows before they cause system crashes. This level of introspection is a significant advantage of using a professional RTOS like Zephyr over simpler bare-metal frameworks.
