---
title: wasp-os
summary: Wasp-os is a MicroPython-based firmware for nRF52-powered smartwatches, including
  the Pine64 PineTime. It provides a complete wearable operating system with heart
  rate monitoring, step counting, and a variety of applications, all accessible via
  an interactive Python REPL for real-time development.
slug: wasp-os
codeUrl: https://github.com/wasp-os/wasp-os
siteUrl: https://wasp-os.readthedocs.io
star: 903
version: v0.4
lastUpdated: '2025-04-12'
rtos: ''
libraries:
- micropython
- littlefs
- mcuboot
topics:
- micropython
- pinetime
- smartwatch
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- hypnos
- pinetime-zephyr-firmware
- bosmoment-pinetime-firmware-applications
- infinitime
- pinetime-rs
- twatch-v3-firmware-for-esp32
---

# Wasp-os: A Python-Powered Smartwatch Experience

Wasp-os is an open-source firmware designed specifically for smartwatches based on the Nordic Semiconductor nRF52 family of microcontrollers. It is most notably associated with the Pine64 PineTime, a "hacker-friendly" wearable, but also supports other devices like the Colmi P8 and Senbono K9. By leveraging MicroPython, wasp-os transforms these devices into highly customizable platforms where users can write and test applications in real-time.

## The Power of MicroPython on Your Wrist

The standout feature of wasp-os is its integration of MicroPython. Unlike traditional smartwatch firmwares written in C or C++, wasp-os allows developers to interact with the hardware using a Python REPL (Read-Eval-Print Loop). This means you can tweak settings, test drivers, or develop new UI components interactively over a Bluetooth Low Energy (BLE) connection.

The system includes a robust application framework that handles event-driven programming, making it easy to create responsive user interfaces. Because the code is Python, the development cycle is significantly faster than traditional embedded workflows that require constant compiling and flashing.

## Robust Bootloader and OTA Updates

Developing for sealed devices like smartwatches presents unique challenges—there are often no physical reset buttons or easily accessible UART pins. Wasp-os addresses this with a specialized bootloader based on the Adafruit NRF52 Bootloader. This bootloader has been hardened to ensure that the device can always be recovered via BLE, even if the main application crashes. This "safety net" allows developers to confidently push over-the-air (OTA) updates to their watches without fear of bricking them.

## Built-in Applications and Features

Out of the box, wasp-os is a fully functional smartwatch OS. It includes:
- **Fitness Tracking**: Full support for heart rate monitoring (using the HRS3300 sensor) and step counting (via the BMA42x series accelerometers).
- **Time Management**: Multiple clock faces (digital, analog, binary, and even a Fibonacci clock), stopwatches, alarms, and countdown timers.
- **Utilities**: A calculator, flashlight, music player controller, and weather app.
- **Games**: Classic titles like 2048, Snake, and a 15-puzzle.

## Customization and Community

Wasp-os is designed to be modular. Users can customize their firmware builds by modifying a simple `wasp.toml` configuration file to include only the applications and watch faces they need. This helps manage the limited memory resources of the nRF52832 SoC.

The project is supported by an active community centered around GitHub and Matrix. For those who want to experiment without hardware, wasp-os even provides a PC-hosted simulator, allowing for rapid UI development and testing in a standard desktop environment.

## Getting Started

To interact with the watch, users can use the `wasptool` utility. For example, setting the time and starting the system can be done directly from a Python console:

```python
# Accessing the REPL via wasptool
watch.rtc.set_localtime((yyyy, mm, dd, HH, MM, SS))
wasp.system.run()
```

Whether you are a hobbyist looking to customize your watch or a developer wanting to explore Python in an embedded context, wasp-os provides a powerful and accessible entry point into the world of wearable technology.
