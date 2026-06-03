---
title: μC/Clk for RT-Thread
summary: A port of the Micrium uC/Clk clock and calendar management module for the
  RT-Thread RTOS. It provides Year 2000 compliant timekeeping with support for NTP
  and Unix timestamps, offering comprehensive date/time conversion utilities and automatic
  initialization within the RT-Thread environment.
slug: c-clk-for-rt-thread
codeUrl: https://github.com/mysterywolf/uC-Clk-for-RT-Thread
siteUrl: https://doc.micrium.com/pages/viewpage.action?pageId=10753188
star: 2
lastUpdated: '2021-11-01'
rtos: rt-thread
topics:
- calendar
- clk
- clock
- rt-thread
- timestamps
- uc-clk
- ucos
- ucos-iii
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- c-common-for-rt-thread
- ds3231-rtc-driver-for-rt-thread
- rx8900-high-precision-rtc-driver-for-rt-thread
- c-crc-for-rt-thread
- aclock-for-rt-thread
- lwip-ptp-precision-time-protocol-for-lwip
---

## Overview

μC/Clk for RT-Thread is a specialized port of Micrium's uC/Clk module, designed to provide robust time and calendar management for embedded systems running the RT-Thread RTOS. This module implements a Year 2000 (Y2K) compliant clock that maintains UTC time with high precision, bridging the gap between low-level hardware timers and high-level application requirements.

While the internal clock maintains time from January 1st, 2000, through December 31st, 2134, the library is highly versatile in its ability to interface with other standard time formats. It provides built-in support for converting to and from NTP (Network Time Protocol) timestamps and Unix timestamps, ensuring compatibility with network services and legacy systems.

## Key Features

### Comprehensive Time Management
The module allows applications to obtain high-resolution timestamps to mark event occurrences. It utilizes a structured data type, `CLK_DATE_TIME`, which contains detailed fields including Year, Month, Day, Day-of-Year, Day-of-Week, Hour, Minute, Second, and Timezone Offset. This structure simplifies the process of displaying human-readable dates or performing complex calendar calculations.

### Multi-Format Support
One of the strongest aspects of μC/Clk is its native support for multiple timestamp epochs:
- **Internal UTC**: 2000/01/01 to 2134/12/31.
- **NTP Timestamps**: 1900/01/01 to 2034/12/31.
- **Unix Timestamps**: 1970/01/01 to 2104/12/31.

### RT-Thread Integration
This port is specifically optimized for the RT-Thread ecosystem. It supports the RT-Thread `Env` configuration tool, allowing developers to easily adjust task priorities and stack sizes. Furthermore, it can be configured to use `INIT_DEVICE_EXPORT`, enabling the RT-Thread kernel to automatically initialize the clock module during the system boot sequence.

## Technical Implementation

The project relies on the RT-Thread uCOS-III compatibility layer, which allows the Micrium-sourced code to run seamlessly on the RT-Thread kernel. The architecture is split into several key components:
- **clk.c/clk.h**: The core logic for time calculations and conversions.
- **clk_cfg.h**: A configuration header for enabling or disabling features like NTP support, Unix support, and string conversions.
- **clk_os_iii.c**: The OS-dependent layer that interfaces with the RTOS for task management and synchronization.

Developers can choose between a software-maintained clock (driven by an RTOS task) or an externally-maintained clock (driven by hardware RTC chips). When using the software clock, the module manages a dedicated task to increment the internal counter.

## Configuration and Usage

Configuration is primarily handled through `clk_cfg.h` or the RT-Thread `menuconfig` interface. Users can define:
- Task priority and stack size for the clock management thread.
- Whether to enable automatic initialization.
- Support for specific string formats and timestamp conversions.

Example of the RT-Thread configuration menu:
```
RT-Thread online packages
    system packages --->
        [*] Micrium: Micrium software products porting for RT-Thread --->
            [*] uC/Clk for RT-Thread --->
                (10)  The priority level value of uC/Clk task
                (80)  The stack size of UC/Clk task (sizeof(CPU_STK))
                [*]   Enable uC/Clk automatical initialization
```

By integrating this package, RT-Thread developers gain access to a professional-grade timekeeping stack that is both reliable and easy to synchronize with external time sources like SNTP servers.
