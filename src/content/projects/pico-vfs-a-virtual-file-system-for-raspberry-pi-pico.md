---
title: 'pico-vfs: A Virtual File System for Raspberry Pi Pico'
summary: pico-vfs is a modular virtual file system designed for the Raspberry Pi Pico
  that provides a unified POSIX-compliant API for various storage media. It allows
  developers to mount multiple file systems, such as littlefs and FatFs, across physical
  storage like onboard flash and SD cards. The project streamlines embedded development
  by abstracting hardware differences and supporting standard C file operations.
slug: pico-vfs-a-virtual-file-system-for-raspberry-pi-pico
codeUrl: https://github.com/oyama/pico-vfs
lastUpdated: '2025-04-13'
licenses:
- NOASSERTION
rtos: freertos
libraries:
- littlefs
- lwip
- sqlite
topics:
- fatfs
- littlefs
- raspberry-pi-pico
isShow: false
createdAt: '2026-04-02T11:53:44+00:00'
updatedAt: '2026-04-02T11:53:44+00:00'
---

Managing storage on embedded devices often involves juggling different libraries for flash memory, SD cards, and various file system formats. For developers working with the Raspberry Pi Pico, pico-vfs simplifies this by providing a thin virtual file system (VFS) layer. It allows for the use of familiar POSIX and C standard file APIs—like `open`, `read`, `fopen`, and `fwrite`—regardless of the underlying hardware.

### A Layered Approach to Storage

The core strength of pico-vfs lies in its multi-layer architecture. It separates the physical storage media from the file system logic, providing a flexible stack:

- **Block Device Layer**: This abstracts physical media such as onboard flash, SD cards, or even heap memory into a consistent interface. This abstraction allows developers to add or replace storage media without rewriting application-level code.
- **File System Layer**: It integrates popular implementations like littlefs and FatFs seamlessly. This means you can run a robust, wear-leveled littlefs on internal flash while using FatFs for an external SD card.
- **POSIX File API Layer**: This top layer presents a unified namespace to the application code. Multiple different file systems can be mounted into a single namespace, allowing programs to operate without needing to consider differences in storage media.

### Streamlining Embedded Development

One of the hurdles in embedded programming is the "dialect" problem—every library has its own way of handling files. By implementing standard APIs, pico-vfs reduces the learning curve and makes porting existing C/C++ code significantly easier. 

To further simplify setup, the project includes an `AUTO_INIT` feature. This can automatically initialize and mount the file system before `main()` is even executed, allowing developers to start writing to files immediately. By default, the system can be configured to mount a littlefs partition on the Pico's onboard flash at the root directory automatically.

### Practical Applications

The flexibility of pico-vfs opens up several advanced use cases for the RP2040:

- **Data Logging**: Easily record debug information or sensor data to an SD card using standard `fprintf` calls. The project even includes examples for multicore and USB-based logging.
- **Persistent Configuration**: Store device settings in internal flash that survive reboots using a reliable file system like littlefs.
- **Complex Porting**: The project has already been used to port SQLite3 to the Pico, enabling sophisticated database management on a microcontroller that would otherwise be difficult to implement.
- **Resilient Networking**: By combining it with lwIP, developers can create MQTT clients with local queues to buffer data during network outages, ensuring no data is lost when the connection drops.

### Getting Started

Integrating pico-vfs into a Pico SDK project is straightforward. After adding the library to your `CMakeLists.txt`, you can interact with the file system using standard C headers. The following example demonstrates how simple it is to write a file to the default mounted storage:

```c
#include <pico/stdlib.h>
#include <stdio.h>
#include "filesystem/vfs.h"

int main(void) {
    stdio_init_all();
    
    // Initialize the VFS and default mounts
    fs_init();

    FILE *fp = fopen("HELLO.TXT", "w");
    if (fp) {
        fprintf(fp, "Hello World!\n");
        fclose(fp);
    }
}
```

Whether you are building a simple logger or a complex application requiring multiple storage backends, pico-vfs provides the abstraction needed to keep your code clean and portable. It draws inspiration from the VFS implementations in MicroPython and ARM Mbed OS, bringing that same level of convenience to the C/C++ Pico SDK environment.
