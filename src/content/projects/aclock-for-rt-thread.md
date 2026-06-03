---
title: aclock for RT-Thread
summary: aclock is a terminal-based analog clock interface designed for the RT-Thread
  RTOS. It utilizes VT100 terminal sequences to render a visual clock on the system
  console and requires an active RTC device to function.
codeUrl: https://github.com/mysterywolf/aclock
siteUrl: https://github.com/mysterywolf/aclock
isShow: false
rtos: rt-thread
libraries: []
topics:
- rt-thread
- clock
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- c-clk-for-rt-thread
- w601-rt-thread-alarm-clock
- rx8900-high-precision-rtc-driver-for-rt-thread
- ds3231-rtc-driver-for-rt-thread
- termbox-for-rt-thread
- donut-for-rt-thread
---

## Bringing a Classic Visual to the RT-Thread Terminal

For developers working with RT-Thread, the terminal (msh) is often the primary window into the system's soul. While usually reserved for debugging and system commands, the `aclock` package adds a touch of classic computing aesthetics to the environment. `aclock` is a terminal-based analog clock that transforms a standard VT100-compatible terminal into a functional time-piece.

Originally based on the work by [tenox7](https://github.com/tenox7/aclock/blob/master/sources/aclock-vt100.c), this version has been ported specifically for the RT-Thread ecosystem by Meco Man. It serves as both a fun utility and a demonstration of how terminal escape sequences can be used to create dynamic interfaces in an embedded environment.

### How it Works

The application is designed to run directly from the RT-Thread shell (`msh`). Once invoked, it takes over the terminal display to draw a circular clock face with moving hands for hours, minutes, and seconds. Because it relies on standard VT100 escape codes, it works across most modern serial terminal emulators (like PuTTY, Tera Term, or the built-in terminals in VS Code and CLion).

To provide accurate time, `aclock` requires that the system has a registered RTC (Real-Time Clock) device. Before running the clock, users should ensure their hardware RTC is configured and the system time is set.

### Getting Started with aclock

Integrating `aclock` into your RT-Thread project is straightforward thanks to the RT-Thread package management system. You can find it under the following path in `menuconfig`:

```text
RT-Thread online packages  --->
    miscellaneous packages  --->
        entertainment: terminal games and other interesting software packages  --->
            [*] aclock: a terminal clock
```

After selecting the package and updating your project, simply compile and flash your firmware. Once the system is booted and you are at the command line, you can launch the clock with a single command:

```shell
msh> aclock
```

### Technical Details

The project structure is lightweight, consisting primarily of `aclock.c` and an `SConscript` for the build system. This simplicity makes it an excellent reference for developers interested in:
- Implementing terminal-based UI elements in RTOS environments.
- Interfacing with the RT-Thread RTC device drivers.
- Using SCons for package management within the RT-Thread ecosystem.

Whether you need a simple way to verify your RTC is ticking correctly or you just want to add some personality to your embedded device's console, `aclock` provides a clean, nostalgic solution.
