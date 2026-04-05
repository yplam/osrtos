---
title: Esp32Repartition
summary: Esp32Repartition is a specialized tool designed to update ESP32 partition
  tables via Over-the-Air (OTA) updates, primarily to solve storage constraints for
  WLED firmware. Built on the ESP-IDF and Arduino frameworks, it enables resizing
  of app partitions by shrinking data sections without requiring a physical USB connection.
slug: esp32repartition
codeUrl: https://github.com/softplus/Esp32Repartition
siteUrl: https://kno.wled.ge/
version: v0.4.0
lastUpdated: '2024-12-28'
licenses:
- MIT
rtos: freertos
libraries:
- spiffs
topics:
- esp32
- platformio
- wled
isShow: false
createdAt: '2026-04-04T10:06:56+00:00'
updatedAt: '2026-04-04T10:06:56+00:00'
---

As WLED firmware continues to grow in complexity and features, many older ESP32 devices find themselves trapped by legacy partition tables that don't offer enough space for the latest updates. Esp32Repartition provides a creative solution to this "storage wall" by allowing users to reconfigure their device's flash memory layout remotely.

### The Partition Problem

Most early ESP32 WLED installations used a partition layout that allocated roughly 1.2MB for the application. Modern WLED builds often exceed this limit, making OTA updates impossible. Usually, fixing this requires a physical USB connection to re-flash the entire partition table, which is often inconvenient for devices already installed in LED strips, furniture, or architectural fixtures. Esp32Repartition acts as a bridge, allowing a device to "re-map" itself while running.

### How It Works

This project acts as a middle-man firmware. Once uploaded to a device running WLED via the standard update page, it takes control of the flash memory. It performs several critical checks to ensure safety, such as verifying that the device is running from the expected app partition and confirming the layout is compatible (typically an app0, app1, and data structure).

The core logic involves several high-stakes steps:
1. It erases the secondary app partition and the data partition (SPIFFS).
2. It resizes the app0 and app1 partitions to 1536KB each.
3. It shrinks the data partition to accommodate the larger app space.
4. It recreates the partition table checksums so the ESP32 bootloader remains happy.

Once the process is complete, the device reboots with a new memory map, ready to accept the larger, modern WLED firmware files.

### Technical Implementation

Built using PlatformIO with a mix of the Arduino and ESP-IDF frameworks, the project requires specific low-level configurations. Most notably, it requires the `CONFIG_SPI_FLASH_DANGEROUS_WRITE_ALLOWED` flag. This is necessary because the partition table itself resides in a protected area of the flash that standard firmware is usually forbidden from modifying. 

The firmware creates its own temporary access point called `EPM-AP`. Users connect to this AP to access a web interface where they can inspect the current partition layout and trigger the fixing process. The project also handles the switch between app0 and app1 partitions to ensure the repartitioning happens from a stable state.

### Safety and Risks

Because this tool modifies the foundational structure of the device's memory, it is a "use at your own risk" utility. If the power fails or the device reboots during the short window when the partition table is being rewritten, the device could become unbootable (bricked), requiring a recovery via a wired serial connection. Additionally, since the data partition is resized and moved, all local settings and presets are lost during the process, necessitating a backup before beginning.

### Hardware Compatibility

While primarily tested on common boards like the ESP32 DevKitC and D1 Mini ESP32, the logic is designed to be applicable to most standard ESP32 modules. Recent updates have added support for detecting encrypted flash—aborting the process if encryption is found to prevent permanent bricking—and the ability to move data partitions rather than simply deleting them in certain configurations.
