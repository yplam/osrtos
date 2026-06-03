---
title: optparse
summary: A portable, reentrant, and embeddable command-line argument parser designed
  for embedded systems like RT-Thread. It supports POSIX-style short options and GNU-style
  long options without requiring dynamic memory allocation or standard C library dependencies.
slug: optparse
codeUrl: https://github.com/liu2guang/optparse
star: 28
version: v1.0.0
lastUpdated: '2022-07-27'
rtos: rt-thread
topics:
- getopt
- optparse
- rt-thread
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- rtems-ec-cli-command-line-interface-for-embedded-controllers
- lua2rtt
- flexiblebutton
- jsonx-lightweight-embedded-json-serializer
- termbox-for-rt-thread
- pycopy
---

## Overview

`optparse` is an open-source, portable, and reentrant command-line argument parser designed specifically for embedded environments. While many developers are familiar with the standard POSIX `getopt` function, using it in a Real-Time Operating System (RTOS) like RT-Thread presents several challenges. `optparse` addresses these issues by providing a library that is completely self-contained, requires no dynamic memory allocation, and maintains its state in a private structure rather than global variables.

This library is particularly useful for developers building command-line interfaces (CLI) for embedded shells, such as RT-Thread's `msh`. It supports POSIX-style option strings, GNU-style long arguments, argument permutation, and subcommand processing.

## Why Use optparse Over Standard getopt?

In many embedded development environments, the standard POSIX `getopt` implementation has three major drawbacks that `optparse` overcomes:

1.  **Reentrancy and Global State**: Standard `getopt` stores its parsing state in global variables. In a multi-threaded RTOS environment, this means only one command can safely use `getopt` at a time. `optparse` stores state in a user-provided `struct optparse`, allowing multiple independent parsers to run concurrently without interference.
2.  **Toolchain Compatibility**: Many embedded BSPs (Board Support Packages) must support various compilers like Keil MDK, IAR, and GCC. Standard `getopt` is often missing or behaves inconsistently in non-GCC environments like Keil. `optparse` is written in standard C with no external dependencies, ensuring high portability across all major embedded toolchains.
3.  **Error Handling**: In standard implementations, error messages are typically printed directly to `stderr`. `optparse` captures error messages in an `errmsg` field within its state structure, allowing the application to decide how and where to display the error.

## Technical Implementation

One of the most impressive features of `optparse` is its zero-dependency design. It does not require a standard C library (libc), making it suitable for bare-metal applications or highly constrained systems where libc might not be available or desired. 

By default, `optparse` performs argument permutation, moving non-option arguments to the end of the `argv` array as it parses. This behavior can be disabled if necessary by setting the `permute` field to 0 after initialization.

## Usage Examples

### Basic Option Parsing

The following example demonstrates how to use `optparse` within an RT-Thread `msh` command:

```c
#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>
#include "optparse.h"

int cmd_parse(int argc, char **argv)
{
    bool amend = false;
    const char *color = "white";
    int option;
    struct optparse options;

    optparse_init(&options, argv);
    while ((option = optparse(&options, "ac:")) != -1) {
        switch (option) {
        case 'a':
            amend = true;
            break;
        case 'c':
            color = options.optarg;
            break;
        case '?':
            fprintf(stderr, "%s: %s\n", argv[0], options.errmsg);
            return EXIT_FAILURE;
        }
    }

    char *arg;
    while ((arg = optparse_arg(&options)))
        printf("Remaining argument: %s\n", arg);
    return 0;
}
MSH_CMD_EXPORT(cmd_parse, example command description);
```

### Long Option Support

For more complex interfaces, `optparse_long()` provides an API similar to GNU's `getopt_long()`:

```c
struct optparse_long longopts[] = {
    {"amend", 'a', OPTPARSE_NONE},
    {"brief", 'b', OPTPARSE_NONE},
    {"color", 'c', OPTPARSE_REQUIRED},
    {"delay", 'd', OPTPARSE_OPTIONAL},
    {0}
};

struct optparse options;
optparse_init(&options, argv);
while ((option = optparse_long(&options, longopts, NULL)) != -1) {
    // Handle options...
}
```

## Integration with RT-Thread

The project includes an `SConscript` file, making it easy to integrate into RT-Thread projects using the SCons build system. It is designed to be used as an RT-Thread package, where it can be enabled via `menuconfig` and automatically compiled into the firmware image.
