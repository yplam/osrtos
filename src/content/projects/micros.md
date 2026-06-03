---
title: micrOS
summary: A MicroPython-based application execution platform and operating system designed
  for DIY projects and IoT devices. It provides a robust framework for managing asynchronous
  tasks, hardware interrupts, and cron-based scheduling on ESP32 and Raspberry Pi
  Pico W microcontrollers. With built-in shell and web servers, micrOS enables seamless
  remote management and device-to-device communication via WiFi and ESP-NOW.
slug: micros
codeUrl: https://github.com/BxNxM/micrOS
star: 123
version: v2.6.0-0
lastUpdated: '2025-12-26'
rtos: ''
libraries:
- micropython
topics:
- asyncio
- diy
- docker
- esp-micropython
- esp32
- esp32camera
- i2c-sensors
- interrupts
- iot-platform
- ledcontrol
- micropython
- mq135
- plugin-architecture
- python
- servo-controller
- socket
- telnet
- webserver
- wifi
isShow: false
createdAt: '2025-12-31'
updatedAt: '2025-12-31'
relatedProjects:
- raspberry-pi-pico-web-server-control
- micropython-for-w601-iot-board
- mqboard-micropython-mqtt-micro-framework
- minios-esp
- micropython-for-pandora-iot-board
- micropython-smarthome-node-pysmartnode
---

## Overview

micrOS is a lightweight yet powerful operating system built specifically for the MicroPython ecosystem. Designed for DIY enthusiasts and embedded developers, it transforms standard microcontrollers into sophisticated application platforms. By abstracting the complexities of hardware management, networking, and task scheduling, micrOS allows developers to focus on writing high-level application logic while the framework handles the underlying system services.

The project targets a wide range of popular hardware, including the entire ESP32 family (S2, S3, C3, C6, and CAM models) and the Raspberry Pi Pico W. It is particularly well-suited for home automation, robotics, and sensor network projects where remote accessibility and autonomous operation are critical.

## Core Architecture: The Load Module System

At the heart of micrOS is the Load Module (LM) concept. Applications are written as standard Python files (prefixed with `LM_`) containing functions that the system automatically exposes. Once a module is loaded, its functions become accessible via multiple interfaces, including a socket-based ShellCli and an HTTP-based WebCli. This design allows for a "codeless" end-user experience where functions can be triggered via a dedicated mobile app or simple REST API calls without the user ever touching the underlying code.

## Advanced Scheduling and Task Management

micrOS features a sophisticated asynchronous task manager that supports both single-execution and periodic background jobs. Using a syntax inspired by Unix shells, users can trigger tasks in the background using the `&` operator or create infinite loops with `&&`. 

Beyond simple task execution, the system includes:
- **Cron Scheduler**: A timestamp-based execution engine that supports standard time formats as well as geolocation-based tags like `sunrise` and `sunset`.
- **Hardware Interrupts**: Support for up to four external event channels with configurable triggers (rising, falling, or both) and built-in software debouncing.
- **Timer IRQs**: Background execution loops for periodic sensor polling or system monitoring.

## Connectivity and Inter-Device Communication

Networking is a first-class citizen in micrOS. The system supports both Station (STA) and Access Point (AP) modes, featuring automatic NTP time synchronization and mDNS support for `.local` hostname resolution. 

One of the most powerful features is **InterCon**, a communication protocol that allows micrOS nodes to talk to each other. This supports both standard TCP/IP sockets and the low-latency **ESP-NOW** protocol. Commands can be piped from one device to another using a simple syntax (e.g., `rgb toggle >>RingLight.local`), enabling complex distributed automation without the need for a central server or cloud service.

## Developer Workflow and Tooling

The project includes the **micrOS DevToolKit**, a comprehensive Python-based GUI and CLI tool for managing the entire lifecycle of a device. It handles:
- USB deployment and MicroPython firmware flashing.
- Over-the-Air (OTA) updates via WebREPL.
- Interactive socket terminal for real-time debugging.
- Automated cross-compilation of Python files to `.mpy` bytecode to save memory.

## Example Load Module

Creating an application in micrOS is as simple as defining standard Python functions. The following example demonstrates a basic LED controller:

```python
from machine import Pin
from microIO import bind_pin

LED = None

def load(pin_number=26):
    global LED
    if LED is None:
        pin = bind_pin('led', pin_number)
        LED = Pin(pin, Pin.OUT)
    return LED

def toggle():
    pin = load()
    pin.value(not pin.value())
    return "LED ON" if pin.value() else "LED OFF"

def help(widgets=False):
    return 'load', 'toggle'
```

Once uploaded, the `toggle` function can be called remotely via the shell, the web dashboard, or even an Apple Shortcut, making micrOS a highly versatile platform for modern embedded development.
