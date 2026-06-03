---
title: SeL4 UserLand Library Tutorial
summary: A technical tutorial demonstrating the creation and integration of userland
  libraries within the seL4 microkernel environment. It provides a minimal implementation
  of a library called libFoo and shows how to link a root server application against
  it using the seL4 CMake build system.
slug: sel4-userland-library-tutorial
codeUrl: https://github.com/manu88/SeL4_UserLandLib
star: 0
lastUpdated: '2018-09-28'
rtos: sel4
topics:
- library
- sel4
- tutorial
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- sel4-kernel-101
- sel4-cpio-archive-project
- bazel2zephyr
- apache-nuttx-getting-started
- rust-stub-library-for-apache-nuttx
- sofa-operating-system-framework
---

## Overview

Developing for the seL4 microkernel often requires a modular approach to code management. This project serves as a practical tutorial for creating userland libraries and linking applications against them within the seL4 ecosystem. It builds upon foundational concepts from the seL4_101 tutorial, providing a simple 'Hello' root server that utilizes a custom library named `libFoo`.

## Project Architecture

The project follows a standard seL4 build system layout, separating the kernel, user projects, and build tools. The directory structure is organized as follows:

- **kernel/**: The seL4 microkernel source.
- **projects/**: Contains the application code (`Hello`), the custom library (`libFoo`), and standard dependencies like `musllibc` and `seL4_libs`.
- **tools/**: Build system utilities, specifically the `cmake-tool`.

## Creating a Library in seL4

In the seL4 build system, a library is structured similarly to an application. It requires its own project directory containing a `CMakeLists.txt` file and source code. A key distinction is the inclusion of an `include` folder to house the library's public interface (API).

### The libFoo Implementation

The example library, `libFoo`, provides a single function `getRandom()`. The implementation is straightforward, demonstrating the basic requirements for a functional library.

**foo.h (Public API):**

```c
#ifndef LIB_FOO_H
#define LIB_FOO_H

int getRandom(void);

#endif /*LIB_FOO_H*/
```

**foo.c (Implementation):**

```c
#include <foo.h>

// See https://xkcd.com/221/ for specs
int getRandom()
{
        return 4;
}
```

### Build Configuration

The library's `CMakeLists.txt` defines the project, adds the source files, and declares the public include directory. It also links against `muslc` to provide standard C library support:

```cmake
cmake_minimum_required(VERSION 3.7.2)
project(libFoo C)

add_library(libFoo EXCLUDE_FROM_ALL src/foo.c)
target_include_directories(libFoo PUBLIC include)
target_link_libraries(libFoo muslc)
```

## Linking Applications Against Custom Libraries

Linking an application against a custom library in seL4 is identical to linking against system libraries. In the application's `CMakeLists.txt` (e.g., the `Hello` project), the new dependency is added to the `target_link_libraries` command:

```cmake
target_link_libraries(Hello sel4muslcsys muslc libFoo)
```

Once linked, the application can include the library's header and invoke its functions. In the `main.c` of the `Hello` application, the library is used to print a value:

```c
#include <stdio.h>
#include <foo.h>

int main(void)
{
    printf("Some random value %i\n" , getRandom() );
    return 0;
}
```

## Technical Context

This project is designed to work with the seL4 CMake-based build environment. It assumes a working knowledge of the seL4 project layout and relies on the debug kernel configuration, as it utilizes `seL4_DebugPutChar` for output without requiring a full platsupport driver initialization. This makes it an ideal starting point for developers moving from basic 'Hello World' examples to more complex, modular system designs on seL4.
