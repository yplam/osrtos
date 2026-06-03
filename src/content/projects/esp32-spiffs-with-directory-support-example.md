---
title: ESP32 SPIFFS with Directory Support Example
summary: This project provides an enhanced SPIFFS implementation for the ESP32, adding
  native directory support to the standard ESP-IDF VFS driver. It includes a modified
  mkspiffs tool for host-side image creation and demonstrates advanced file system
  operations including multitasking and time-stamped file management.
codeUrl: https://github.com/loboris/ESP32_spiffs_example
isShow: false
rtos: freertos
libraries:
- spiffs
topics:
- esp32
- spiffs
- vfs
star: 73
lastUpdated: '2018-06-07'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- esp32-spiffs-image-generation-example
- esp32-fatfs-image-tool-and-example
- esp32-fatfs-storage-example
- stm32-fatfs-and-freertos-integration
- esp32-asyncwebserver-file-upload-example
- esp32-monaco-editor-spiffs
---

While the standard **esp-idf** framework provides robust support for the SPIFFS (SPI Flash File System), it historically lacked native directory support. The **ESP32_spiffs_example** by loboris addresses this gap by providing a modified version of the SPIFFS VFS driver, enabling developers to use standard directory functions like `mkdir()` and `rmdir()` on their ESP32 devices.

### Enhancing the SPIFFS Experience

The core of this project is a modified `esp_spiffs.c` file. By integrating this version into your project's components, you gain the ability to organize files into a hierarchical structure, which is often essential for complex web servers or data logging applications. To maintain compatibility with host-side development, the repository also includes a modified version of the **mkspiffs** tool. This tool allows you to build SPIFFS images on your computer that already contain directory structures, which can then be flashed directly to the ESP32.

### Key Features and Capabilities

- **Directory Handling**: Full support for creating, removing, and listing directories.
- **VFS Integration**: Seamlessly registers with the ESP-IDF Virtual File System (VFS), allowing the use of standard C library functions (e.g., `fopen`, `opendir`).
- **File Operations**: Includes examples for file copying and advanced listing functions that display file types, sizes, and timestamps.
- **NTP Synchronization**: The example includes logic to fetch time from NTP servers via WiFi, ensuring that file timestamps are accurate.
- **Multitasking Tests**: A built-in stress test demonstrates the file system's stability when accessed by multiple FreeRTOS tasks simultaneously.

### Getting Started

To use this example, you need a functional ESP-IDF build environment. After cloning the repository, you should configure the project using the standard menuconfig tool:

```bash
make menuconfig
```

Within the configuration menu, you can set your WiFi credentials (to enable NTP) and adjust SPIFFS-specific settings like the maximum number of partitions and cache configuration. 

### Building the mkspiffs Tool

Before you can generate custom filesystem images, you must build the `mkspiffs` executable for your host operating system. The project provides a convenient script for this:

```bash
./build_mkspiffs
```

**Note:** If you change your SPIFFS configuration in `menuconfig`, you must rebuild `mkspiffs` to ensure the host tool matches the logical page and block sizes defined in your firmware.

### Preparing and Flashing the Image

You can populate the `components/spiffs_image/image/` directory with any files or subdirectories you wish to include. To create and flash the filesystem image, use the following commands:

- `make makefs`: Creates the image in the build directory.
- `make flashfs`: Creates the image and flashes it to the ESP32 at the offset defined in your partition table.

### Example Output

When running the example, the serial output provides a detailed look at the filesystem's performance. It demonstrates creating a directory, copying files, and even attempting to delete a non-empty directory to show error handling:

```text
============================
==== Make new directory ====
============================
  dir: "/spiffs/newdir"
  Directory created
  Copy file from root to new directory...
  List the new directory

List of Directory [/spiffs/newdir]
-----------------------------------
T  Size      Date/Time         Name
-----------------------------------
f       351  07/06/2018 10:59  test.txt.copy
-----------------------------------
```

This project is an excellent resource for ESP32 developers who require a more organized approach to on-flash storage than the flat structure provided by the default ESP-IDF SPIFFS implementation.
