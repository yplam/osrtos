---
title: Xenomai Hello World Application
summary: A simple demonstration of the Xenomai Alchemy API for real-time task management.
  This project illustrates how to create, start, and inquire about real-time tasks
  within a Xenomai-enabled Linux environment.
slug: xenomai-hello-world-application
codeUrl: https://github.com/chudoklates/xenomai_helloworld_241639
star: 0
lastUpdated: '2021-05-12'
rtos: xenomai
topics:
- xenomai
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- xenomai-3-exercises
- str-xenomai-real-time-systems-practices
- xenoparticles
- xenomai-3-exercises-for-raspberry-pi-4
- sel4-kernel-101
- xenomai-3-for-raspberry-pi-4
---

## Overview

This project provides a fundamental "Hello World" example for developers working with Xenomai, a real-time development framework for Linux. It specifically utilizes the Alchemy API, which is one of Xenomai's primary interfaces designed to provide a traditional real-time programming model similar to traditional RTOS environments.

The application serves as a template for initializing the Xenomai environment, spawning a real-time task, and interacting with the task's metadata. It is an ideal starting point for developers transitioning from standard Linux programming to hard real-time systems.

## Technical Implementation

The core of the application is built around the Xenomai Alchemy skin. Unlike standard POSIX threads, Xenomai tasks created via the Alchemy API are managed by the Xenomai co-kernel to ensure deterministic execution and low latency.

### Task Management

The application demonstrates three critical phases of real-time task management:
1.  **Creation**: Using `rt_task_create`, the system allocates resources for a new real-time task named "demo" with a specific priority.
2.  **Execution**: The `rt_task_start` function triggers the entry point of the task, passing control to the `demo` function.
3.  **Introspection**: Inside the task, `rt_task_inquire` is used to retrieve information about the current execution context, such as the task name, which is then printed to the console.

### Build System

The project includes a specialized Makefile that leverages the `xeno-config` utility. This tool is essential in Xenomai development as it automatically provides the necessary compiler flags (`--cflags`) and linker flags (`--ldflags`) required to bind the application against the Alchemy and POSIX wrappers. This ensures that the application correctly interfaces with the real-time kernel rather than standard glibc threading.

## Code Example

The following snippet from `helloWorld.c` shows how a real-time task is defined and launched:

```c
#include <xenomai/alchemy/task.h>

RT_TASK demo_task;

void demo(void *arg)
{
  RT_TASK_INFO curtaskinfo;
  printf("Hello World!\n");

  // Inquire current task details
  rt_task_inquire(NULL, &curtaskinfo);
  printf("Task name : %s \n", curtaskinfo.name);
}

int main(int argc, char* argv[])
{
  printf("start task\n");
  rt_task_create(&demo_task, "demo", 0, 50, 0);
  rt_task_start(&demo_task, &demo, 0);
}
```

## Getting Started

To run this application, a Linux system with the Xenomai real-time patch (Cobalt) and the Xenomai libraries installed is required. The build process is straightforward using the provided Makefile:

1. Run `make` to compile the binary.
2. Execute `./helloWorld` to see the real-time task output.

The expected output confirms the transition from the main Linux process to the Xenomai real-time context, displaying the task start message followed by the "Hello World" string and the task's internal name.
