---
title: Jupyter MicroPython Kernel
summary: A Jupyter notebook kernel for interacting with MicroPython-based microcontrollers
  like the ESP8266 and ESP32. It supports serial REPL and WebREPL connections, enabling
  interactive coding, file transfers, and firmware flashing directly from a notebook
  environment.
slug: jupyter-micropython-kernel
codeUrl: https://github.com/goatchurchprime/jupyter_micropython_kernel
star: 158
lastUpdated: '2021-03-28'
rtos: ''
libraries:
- micropython
topics:
- jupyter
- micropython
- python
isShow: false
createdAt: '2025-12-29'
updatedAt: '2025-12-29'
relatedProjects:
- micro-repl
- arduino-lab-for-micropython
- semito-v-micropython-compatibility-layer-mcl
- m5stack-cardputer-virtual-repl
- micropython-port-for-rt-thread
- micropython-and-lvgl-firmware-for-esp32
---

## Overview

The Jupyter MicroPython Kernel provides a bridge between the interactive Jupyter Notebook environment and MicroPython-compatible hardware. It allows developers to write and execute Python code directly on microcontrollers such as the ESP8266 and ESP32 via a serial REPL or WebREPL connection. By leveraging the familiar Jupyter interface, it transforms the embedded development workflow into a more exploratory and documented process.

## Key Features and Capabilities

This kernel is designed for robustness and transparency, exposing the underlying communication processes to the user. It utilizes MicroPython's "paste mode" (Ctrl-A) to send blocks of code to the device without the overhead of standard REPL echoing, ensuring that large code blocks are executed reliably.

**Core functionalities include:**
- **Serial and WebREPL Support:** Connect to devices via standard USB-serial ports or wirelessly through WebREPL (specifically for ESP8266).
- **Magic Commands:** A suite of "%" magic commands simplifies device management. Users can use `%serialconnect` to establish a link, `%reboot` for a soft reset, and `%lsmagic` to list all available kernel extensions.
- **File Management:** The `%sendtofile` command allows users to take the contents of a notebook cell and save it directly to the device's filesystem as a `.py` file.
- **Firmware Flashing:** Integrated support for `esptool.py` allows users to erase flash and upload new MicroPython firmware binaries without leaving the notebook environment.

## Technical Implementation

The kernel operates by communicating with the device's serial line and issuing specific hex commands to enter and exit different REPL modes. It handles the asynchronous nature of serial communication by allowing the notebook UI to independently issue Ctrl-C signals, which can interrupt hanging processes on the microcontroller. 

For advanced users and debugging, the kernel provides low-level access to the serial stream through commands like `%writebytes` and `%readbytes`. This allows developers to inspect the raw data exchange and troubleshoot connection issues or custom protocol implementations.

## Hardware Support

While primarily targeting the ESP8266 and ESP32, the kernel is flexible enough to work with other MicroPython-compatible boards. The repository includes demonstration notebooks for MaixPy (K210), showing its utility in specialized environments like embedded AI and machine vision. On Linux systems, users may need to manage group permissions (tty and dialout) to access serial hardware, while Windows users rely on standard USB-to-serial drivers.

## Getting Started

Once the kernel is installed and registered with Jupyter, starting a session is as simple as selecting "MicroPython" from the new notebook menu. A typical session begins with a connection command:

```python
%serialconnect --port=COM5
```

After connecting, standard Python code can be executed in cells, and the output is streamed back from the device in real-time. This makes it an ideal tool for testing hardware peripherals, prototyping drivers, or creating interactive educational content for embedded systems.
