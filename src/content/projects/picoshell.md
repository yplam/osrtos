---
title: PicoShell
summary: A lightweight, UNIX-style command-line interface for the Raspberry Pi Pico
  W 2 (RP2350) built with MicroPython. It provides features for filesystem management,
  Wi-Fi networking, Telnet access, and system monitoring on embedded hardware.
slug: picoshell
codeUrl: https://github.com/patrickp02/PicoShell
star: 15
lastUpdated: '2025-06-09'
rtos: ''
libraries:
- micropython
topics:
- cli
- embedded
- iot
- micropython
- pico
- raspberry-pi-pico
- shell
isShow: false
createdAt: '2026-01-26'
updatedAt: '2026-01-26'
relatedProjects:
- smolos
- breadboardos
- raspberry-pi-pico-freertos-shell
- minios-esp
- pydos
- raspberry-pi-pico-web-server-control
---

PicoShell is a lightweight, real-time command-line interface (CLI) designed specifically for the Raspberry Pi Pico W 2, powered by the RP2350 dual-core processor. Developed entirely in MicroPython, it transforms the standard MicroPython REPL experience into a more structured, UNIX-style shell environment. This makes it significantly easier to interact with the hardware's filesystem, manage network connections, and monitor system performance without writing custom Python scripts for every basic task.

## A Familiar Shell for Embedded Hardware

One of the primary challenges when working with microcontrollers like the Pico W is managing files and system state over a serial connection. PicoShell addresses this by providing a suite of standard filesystem tools. Users can navigate directories using `cd`, list files with `ls`, and perform file operations like `mkdir`, `rm`, and `read`. This familiarity reduces the friction for developers coming from Linux or macOS environments who are used to interacting with systems via a terminal.

## Networking and Remote Access

Beyond simple file management, PicoShell includes robust networking capabilities. It features a built-in Wi-Fi management system that uses a persistent `config.txt` file to store credentials, allowing the device to automatically connect to the internet on boot. Once online, the shell provides networking utilities such as `ping`, `ifconfig`, and even a basic `curl` implementation for fetching web content.

A standout feature is the integrated Telnet daemon. By launching the Telnet server, developers can access the PicoShell CLI remotely over the network. This is particularly useful for headless projects where physical USB access is restricted or inconvenient. The project is designed to allow the Telnet server to autostart upon a successful network connection, effectively turning the Pico W 2 into a remote-accessible terminal.

## System Monitoring and Performance

PicoShell provides deep insights into the RP2350's hardware. It includes commands to check RAM usage (`ram`), available storage (`dspace`), and CPU temperature (`temp`). For those looking to push the hardware further, the shell supports overclocking via the `setclock` command, allowing users to adjust the CPU frequency between 40 MHz and 260 MHz dynamically.

## Technical Implementation

The architecture of PicoShell is modular. The core logic resides in `Main.py`, while the command implementations are abstracted into `utils.py`. This structure makes it easy for developers to add their own custom commands. Additionally, the shell includes a `run` command, which allows for the execution of external Python scripts stored on the device's filesystem, making it a versatile platform for running automated tasks or testing snippets of code.

## Getting Started

To deploy PicoShell, users first need to flash the official MicroPython UF2 firmware for the Pico W 2. Once the environment is ready, the project files—including `boot.py`, `Main.py`, `utils.py`, and the configuration files—are uploaded to the device using tools like Thonny or `mpremote`.

Configuration is handled through a simple `config.txt` file:

```text
SSID=YourNetwork
PASSWORD=YourPassword
```

Once configured, the device will boot directly into the shell, providing an immediate and interactive interface for embedded development. The project also includes a `boot.py` script that ensures the USB REPL is correctly bound before starting the main shell loop, ensuring stability during the boot process.
