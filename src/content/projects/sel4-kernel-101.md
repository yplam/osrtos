---
title: seL4 Kernel 101
summary: A technical tutorial and project template for building a 'Hello World' application
  on the seL4 microkernel from scratch. It provides a manual setup for the project
  layout, CMake build system, and a basic root server implementation targeting x86_64
  simulation.
slug: sel4-kernel-101
codeUrl: https://github.com/manu88/SeL4_101
siteUrl: https://sel4.systems
star: 5
lastUpdated: '2018-12-15'
rtos: sel4
topics:
- hello-world
- micro-kernel
- sel4
- tutorial
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- sel4-userland-library-tutorial
- sel4-cpio-archive-project
- xenomai-hello-world-application
- sel4-kernel-ega-text-display
- the-sel4-white-paper
- sel4-core-platform-sel4cp-workshop
---

## Introduction to seL4 Development

The seL4 microkernel is renowned for its formal verification and high-security guarantees. However, for many developers, the initial barrier to entry is the complexity of its build system and project structure. While the seL4 team provides a robust build system based on CMake, Ninja, and Google's `repo` tool, the **seL4 Kernel 101** project (internally named 'Femur') takes a different approach. It aims to demystify the kernel by creating a 'Hello World' project from scratch, manually defining the project layout and build logic.

## Project Architecture: The 'Femur' Layout

In seL4, the kernel is not a dynamic library; it must be integrated directly into the project. The Femur project organizes its components into a clean, logical structure:

- **kernel/**: Contains the core seL4 kernel source code.
- **projects/**: Houses userland applications, including the custom 'Hello' root server and essential libraries like `musllibc` and `seL4_libs`.
- **tools/**: Contains the `cmake-tool` and other utilities required for the build process.

This layout ensures that userland code is clearly separated from the kernel and build utilities, making the system easier to navigate for those new to microkernel development.

## Building the Root Server

A unique aspect of seL4 is the concept of the **Root Server**. After the kernel initializes, it hands over control to the first user-level process. This process is responsible for managing system resources and launching other services. In this project, the 'Hello' application serves as the root server.

To implement this, the project uses a simple C program that utilizes `printf` to output "Salut, Monde!" (Hello, World!). Because standard C functions require a library, the project links against `musllibc` and `sel4muslcsys`.

### The Root Server Implementation

```c
#include <stdio.h>

int main(void)
{
    printf("Salut, Monde!\n");
    return 0;
}
```

### CMake Configuration

The project uses a custom `CMakeLists.txt` to define the build targets. A critical step is using the `DeclareRootserver()` macro, which tells the seL4 build system that the 'Hello' executable should be treated as the initial userland image.

```cmake
project(Hello C)
add_executable(Hello src/main.c)
target_link_libraries(Hello sel4muslcsys muslc)
DeclareRootserver(Hello)
```

## Simulation and Testing

The project is designed to be run in simulation using QEMU. By using the provided `init-build.sh` script with the `-DSIMULATION=TRUE` flag, developers can generate a simulation script that boots the kernel and the root server in a virtual environment. 

When the simulation runs, the kernel logs show the transition from kernel space to user space, followed by the execution of the 'Hello' application. This provides immediate feedback that the microkernel has successfully initialized the hardware and scheduled the first user thread.

## Conclusion

By bypassing the automated scripts typically used in seL4 development, the seL4 Kernel 101 project provides a valuable learning resource. It forces a deeper understanding of how the kernel, libraries, and userland applications interact, providing a solid foundation for building more complex secure systems on the seL4 microkernel.
