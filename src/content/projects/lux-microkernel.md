---
title: lux microkernel
summary: A portable, minimalist microkernel written from scratch for x86_64 and ARM64.
  It features a preemptive multiprocessor scheduler, asynchronous I/O, and a Unix-like
  API, all implemented in under 5,000 lines of code to minimize software bloat.
slug: lux-microkernel
codeUrl: https://github.com/lux-operating-system/kernel
lastUpdated: '2025-01-31'
licenses:
- MIT
image: /202604/kernel_0.avif
rtos: ''
topics:
- hobby-os
- kernel
- microkernel
- operating-system
- os
- osdev
- posix
- scheduling
- unix
isShow: true
createdAt: '2026-04-01T01:16:03+00:00'
updatedAt: '2026-04-01T01:16:03+00:00'
---

## A Minimalist Approach to Operating System Design

In an era where modern operating systems are often criticized for their complexity and "bloat," the lux project offers a refreshing return to first principles. Developed as a portable microkernel written entirely from scratch, lux is a research and educational project that challenges the norms of software engineering by prioritizing simplicity, stability, and memory protection.

The core philosophy behind lux is the pursuit of a minimal footprint. By implementing essential kernel logic in under 5,000 lines of code, the project minimizes resource consumption and reduces the attack surface compared to mainstream monolithic kernels. It currently targets the x86_64 architecture, with future support planned for ARM64.

## Microkernel Architecture and the Client-Server Paradigm

Unlike monolithic kernels that handle everything from file systems to networking within a single privileged space, lux adopts a strict microkernel architecture. It provides only the most fundamental services: memory management, scheduling, and interprocess communication (IPC).

The rest of the operating system's functionality is delegated to standalone servers running in user space. These servers handle device drivers, file systems, and networking stacks. To facilitate this, lux relies on a central user-space router called **lumen**. Lumen acts as both an init program and a message router, forwarding communications between the kernel and various servers using standard Unix domain sockets. This design ensures that a failure in a specific driver or server doesn't necessarily bring down the entire system, significantly enhancing overall stability.

## Key Technical Features

Despite its small size, lux includes a robust set of features designed for modern hardware:

*   **Memory Management:** The kernel implements a future-proof memory manager capable of handling virtually unlimited physical memory and providing up to 256 TiB of virtual address space for every thread.
*   **Multiprocessor Priority Scheduling:** Built from the ground up for multiprocessor environments, the scheduler handles task prioritization across multiple cores. Crucially, the kernel itself is multithreaded and preemptible, ensuring high responsiveness.
*   **Asynchronous I/O:** Following POSIX standards, lux implements fully asynchronous I/O. Kernel threads are never blocked by I/O operations, allowing user processes to choose between blocking or non-blocking system calls.
*   **Unix-like API:** While it is a custom implementation, lux provides a minimal Unix-like API for common system calls related to files and sockets, making it more accessible for developers familiar with POSIX environments.

## Portability and Development

At its core, lux is built upon a platform abstraction layer. This layer defines a set of functions and constants that must be implemented for each specific CPU architecture, making the process of porting the kernel to new hardware significantly more straightforward.

The project uses a custom toolchain (including `x86_64-lux-gcc`) and is built using a straightforward Makefile system. It serves as a testament to what can be achieved with a focused, minimalist design, providing a powerful foundation for building more complex operating system components in user space.
