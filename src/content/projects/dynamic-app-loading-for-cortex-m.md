---
title: Dynamic App Loading for Cortex-M
summary: A framework for implementing dynamic application loading on Cortex-M microcontrollers
  using Position Independent Code (PIC) and Global Offset Tables (GOT). It leverages
  the Zephyr RTOS for kernel services and syscall handling, allowing applications
  to be loaded and executed from any memory location.
codeUrl: https://github.com/rgujju/Dynamic_App_Loading
siteUrl: https://rgujju.github.io/Dynamic_App_Loading/html/index.html
isShow: false
rtos: zephyr
libraries: []
topics:
- cortex-m
- dynamic-app
- dynamic-loading
- embedded
- mcu
- zephyr
star: 63
lastUpdated: '2020-07-29'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- esp32-p4-jit-dynamic-code-loading-system
- beremiz4uc
- fpbinject
- bpf-ebpf-for-microcontroller-compartmentalization
- arm-control-framework-acorns-rover
- mcumanager-ios
---

In the world of embedded systems, applications are traditionally linked statically with the kernel and flashed as a single monolithic binary. However, as systems become more complex, the need for dynamic application loading—the ability to load and run code at runtime without reflashing the entire system—becomes increasingly valuable. The **Dynamic App Loading** project provides a minimal, educational, and functional example of how to achieve this on ARM Cortex-M hardware.

### The Architecture: Kernel and Dynamic Apps

The project is divided into two distinct parts: the **Kernel** and the **App**. 

*   **The Kernel**: Built on top of the Zephyr RTOS, the kernel is responsible for the heavy lifting. It manages hardware initialization, handles system calls (syscalls), and includes an `app_loader` module. The kernel provides the actual implementation of hardware-level APIs, such as `SetLed`, which dynamic apps can call without having the implementation code compiled into their own binary.
*   **The App**: The application is compiled as Position Independent Code (PIC). This allows the binary to be placed anywhere in memory (SRAM or Flash) and still execute correctly. To achieve this, the project utilizes the Global Offset Table (GOT) mechanism, where the base address of the GOT is maintained in the `R9` register.

### Technical Implementation: PIC and GOT

To make the application position-independent, the project uses specific GCC compiler flags:
```bash
-fpic -msingle-pic-base -mpic-register=r9 -mno-pic-data-is-text-relative -mlong-calls
```
These flags ensure that data accesses are relative to the address in `R9`. When the kernel starts an app, it passes the GOT address as a parameter in `R0`. A small assembly startup routine (`app_startup.s`) then moves this value into `R9` before jumping to the application's `main` function.

Because standard ELF files are often too large and contain unnecessary metadata for microcontrollers, the project includes a tool called `elf2tinf`. This Python script converts the ELF file into a **TINF** (Tiny Interface) format, a compact binary format that includes the necessary relocation information and section data for the MCU-side loader.

### Leveraging Zephyr Syscalls

One of the most innovative aspects of this project is its use of Zephyr's syscall infrastructure. By modifying how Zephyr handles syscall headers, the project allows dynamic apps to invoke kernel functions using the standard Zephyr API. This is achieved by compiling a "userlib"—a static archive containing the syscall wrappers—which the dynamic app links against. 

When the app calls a function like `SetLed`, it triggers a supervisor call (SVC) or a similar trap mechanism, which the Zephyr kernel intercepts, validates, and executes on behalf of the application. This maintains a clean separation between the unprivileged application and the privileged kernel.

### Hardware Support and Portability

The current implementation targets the **STM32F429i-DISC1** board, utilizing its Cortex-M4 processor. However, the architecture is designed to be portable. Since it relies on Zephyr, porting to other boards is largely a matter of changing the `-DBOARD` parameter in CMake. For other architectures, the primary change required would be the method of passing the GOT base address to the application.

### Getting Started

The workflow for creating a dynamic app involves a few distinct steps:
1.  **Build the Userlib**: Generate the static library and headers from the kernel source that the app will use for syscalls.
2.  **Build the App**: Compile the application (e.g., the provided `blinky` example) using the PIC flags.
3.  **Convert to TINF**: Use the `elf2tinf.py` script to create a `.tinf` binary and a corresponding `.h` header for easy testing.
4.  **Build and Flash the Kernel**: Compile the Zephyr kernel with the `app_loader` and the application binary included, then flash it to the target hardware.

This project serves as an excellent reference for developers looking to understand the intricacies of linkers, relocation, and memory management in embedded environments.
