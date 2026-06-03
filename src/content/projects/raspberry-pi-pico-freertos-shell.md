---
title: Raspberry Pi Pico FreeRTOS Shell
summary: An interactive shell module for Raspberry Pi Pico applications running FreeRTOS.
  It provides a VT100-compatible terminal interface with support for custom commands,
  subcommands, autocompletion, and command history.
slug: raspberry-pi-pico-freertos-shell
codeUrl: https://github.com/JZimnol/pico_freertos_shell
star: 12
version: v0.1
lastUpdated: '2025-01-04'
rtos: freertos
topics:
- freertos
- freertos-kernel
- pico-sdk
- raspberry-pi-pico
- raspberry-pi-pico-w
- rp2040
- rp2040w
- shell
isShow: false
createdAt: '2026-01-17'
updatedAt: '2026-01-17'
relatedProjects:
- picoshell
- rp2040-freertos-template
- raspberry-pi-pico-freertos-sample-application
- breadboardos
- pydos
- sqlite-for-raspberry-pi-pico
---

## Overview

The Raspberry Pi Pico FreeRTOS Shell is a specialized module designed to integrate an interactive command-line interface (CLI) into embedded applications. Specifically targeting the RP2040 microcontroller and the FreeRTOS kernel, this module allows developers to add custom commands and subcommands to their firmware, facilitating real-time debugging, configuration, and system monitoring through a serial terminal.

## Terminal Capabilities

The shell is built with modern terminal features in mind, primarily supporting the VT100 escape sequences. This enables a rich user experience within terminal emulators like picocom, PuTTY, or minicom. Key interface features include:

- **Colored Output**: Support for ANSI color codes to improve readability.
- **Navigation**: Full support for arrow keys (left/right for cursor movement, up/down for history).
- **Editing**: Support for backspace, delete, home, and end keys.
- **Autocompletion**: Tab-based autocompletion for both primary commands and subcommands.
- **Control Sequences**: Standard shortcuts such as Ctrl+C, Ctrl+H, and Ctrl+D.

## Technical Architecture

To ensure that the shell does not block the main application logic or interfere with high-priority tasks, the module is implemented using two separate FreeRTOS tasks:

1.  **Shell I/O and Message Buffering Task**: Manages the input/output streams and handles the buffering of messages.
2.  **Command Handler Task**: Responsible for parsing input and executing the logic associated with registered commands.

This dual-task architecture allows the system to remain responsive even when multiple messages are being printed to the serial output. However, users should note that because of this separation, messages printed via standard `printf` or `puts` inside a command handler might occasionally be interleaved with other application messages.

## Command Definition and Registration

Adding functionality to the shell is straightforward. Developers define command handlers and then use an initializer macro to create a command table. The shell supports nested subcommands, allowing for organized and hierarchical CLI structures.

```c
static void helloworld_cmd_handler(int argc, char **argv) {
    printf("Hello World!\n");
    if (argc > 0) {
        for (size_t i = 0; i < argc; i++) {
            printf("argv[%d] = %s\n", i, argv[i]);
        }
    }
}

static const pfs_command_t SHELL_COMMANDS[] = {
    PFS_COMMAND_INITIALIZER(helloworld,
                            "prints 'Hello World!' and a list of arguments",
                            PFS_COMMAND_HANDLER(helloworld_cmd_handler))};

// Registering the commands
pfs_commands_register(SHELL_COMMANDS, ARRAY_SIZE(SHELL_COMMANDS));
```

## Configuration and Integration

The module is highly configurable via CMake options, allowing developers to tune the shell's footprint and behavior to suit their specific hardware constraints. Available options include adjusting the message queue size, maximum input length, command history depth, and task priorities. 

Integration into existing Pico SDK projects is handled through a provided CMake import file, which simplifies the process of linking the shell library and its FreeRTOS dependencies. The project has been validated against `pico-sdk` version 1.5.1.
