---
title: 'ulog_easyflash: Flash Backend and Filter Storage for RT-Thread'
summary: A plugin for the RT-Thread ulog component that utilizes the EasyFlash library
  to provide persistent log storage and filter configuration. It features circular
  log replacement, historical log retrieval via the console, and automatic loading
  of filter parameters at startup.
slug: ulog-easyflash-flash-backend-and-filter-storage-for-rt-thread
codeUrl: https://github.com/armink-rtt-pkgs/ulog_easyflash
siteUrl: https://github.com/armink-rtt-pkgs/ulog_easyflash
star: 13
version: 0.2.0
lastUpdated: '2023-11-24'
rtos: rt-thread
libraries:
- easyflash
topics:
- backend
- easyflash
- ulog
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- hommie-logger
- meindatalogger
- littlefs-ring-buffers
- spiffslogger
- rtcmemory
- arduino-littlefs-spimemory-wrapper
---

## Overview

ulog_easyflash is a specialized plugin for the RT-Thread ulog component, designed to bridge the gap between real-time logging and persistent storage. By leveraging the EasyFlash library, this package enables developers to store logs directly into Flash memory and persist ulog filter configurations across system reboots. 

The ulog component in RT-Thread features a decoupled front-end and back-end design. This plugin implements a dedicated Flash backend, allowing logs to be saved in a circular replacement format. When the allocated log partition is full, the system automatically overwrites the oldest entries, ensuring continuous operation without manual maintenance.

## Key Features

- **Persistent Log Storage**: Seamlessly connects ulog with EasyFlash to save logs to non-volatile memory.
- **Filter Configuration Persistence**: Automatically saves and loads ulog filter parameters (such as global levels, tags, and keywords), ensuring that debugging configurations survive a power cycle.
- **Circular Replacement**: Implements a FIFO-style circular buffer on Flash to manage space efficiently.
- **Interactive Debugging**: Provides a suite of Finsh/MSH commands to read historical logs, clear the log area, or save current filter settings directly from the console.
- **Resource Efficient**: Designed with a small footprint, making it suitable for resource-constrained microcontrollers.

## Technical Implementation

The package is built to work with RT-Thread 3.1.1+ and EasyFlash 3.0.0+. It integrates into the RT-Thread build system via SCons and can be easily enabled through the RT-Thread package manager (menuconfig). 

### Flash Backend Initialization

Initialization is typically handled automatically if the project has component auto-initialization enabled. Otherwise, a simple call to `ulog_ef_backend_init()` at the application layer sets up the backend. Once initialized, the system can capture logs at specific levels to prevent Flash wear from excessive low-priority logging.

```c
/* Example: Set the system to only save logs at the warning level and above to Flash */
ulog_ef_log_lvl_set(LOG_LVL_WARNING);
```

### Filter Management

One of the most powerful features of this plugin is the ability to save runtime log filters. If a developer adjusts log filters during a debugging session using the `ulog_filter` command, they can persist these settings using the `ulog_filter_save` command. On the next boot, the system calls `ulog_ef_filter_cfg_load()` to restore the exact same debugging environment.

## Console Integration

The plugin provides several MSH commands to interact with the stored data:

- `ulog_flash read`: Displays all historical logs stored in Flash to the console.
- `ulog_flash read [size]`: Reads a specific number of recent bytes from the log storage.
- `ulog_flash clean`: Wipes the log partition.
- `ulog_filter_save`: Commits the current ulog runtime filter configuration to EasyFlash's ENV area.

## Getting Started

To use this package, select it in the RT-Thread online packages under `tools packages`. You must ensure that the EasyFlash library is also configured, specifically the "Saved log area size" setting. Additionally, the ulog runtime filter must be enabled in the RT-Thread kernel configuration to utilize the filter saving functionality.
