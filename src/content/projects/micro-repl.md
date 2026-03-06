---
title: micro-repl
summary: A lightweight, SerialPort-based MicroPython REPL for microcontrollers that
  runs directly in the browser. It provides a fully interactive terminal with support
  for file uploads, code evaluation, and paste mode for boards like the Raspberry
  Pi Pico and Arduino Nano ESP32.
slug: micro-repl
codeUrl: https://github.com/WebReflection/micro-repl
siteUrl: https://webreflection.github.io/micro-repl/board/
star: 17
version: v0.8.2
lastUpdated: '2025-01-29'
rtos: ''
libraries:
- micropython
topics:
- micropython
- repl
- serialport
- web
- webserial
isShow: false
createdAt: '2026-03-06'
updatedAt: '2026-03-06'
---

## Overview

micro-repl is an experimental, browser-based REPL (Read-Eval-Print Loop) designed specifically for MicroPython-powered microcontrollers. By leveraging the Web Serial API, it allows developers to interact with their hardware directly from a web browser without the need for locally installed terminal emulators or specialized IDEs. The project aims to provide a minimal yet powerful interface that supports the core features expected by embedded developers.

## Key Features & Capabilities

The project offers a robust set of features for interacting with MicroPython and CircuitPython boards:

- **Interactive REPL**: A fully functional interactive shell out of the box.
- **Tab Completion**: Supports standard MicroPython tab completion for exploring objects and modules.
- **Control Sequences**: Standard keyboard shortcuts like Control+C (interrupt) and Control+D (soft reboot) are fully supported.
- **File Management**: Includes built-in support for uploading both text and binary files to the microcontroller's filesystem.
- **Paste Mode**: A reliable paste mode that prevents buffer overflows, even when transferring large blocks of code.
- **Dynamic Evaluation**: The `eval` method allows for executing code and retrieving the result as a JavaScript object, facilitating seamless communication between the browser and the board.

## Hardware Support

While micro-repl is designed to be compatible with most MicroPython-based boards, it has been specifically tested on several popular platforms:

- **Raspberry Pi Pico and Pico W**
- **Arduino Nano ESP32**
- **Spike Prime** (LEGO Education)
- **Adafruit PyPortal** (running CircuitPython)

## Technical Implementation

The library is built using modern JavaScript and utilizes `xterm.js` for the terminal emulation layer. It is designed with a modular architecture, where imports are dynamic to keep the initial bundle size minimal. The core logic handles the complexities of the Web Serial API, including stream management and data decoding.

One of the standout features is the `eval` method. When code is evaluated, if the final line is a reference or expression, the library attempts to JSON-serialize the value on the board and parse it back into JavaScript. This allows for high-level data exchange between the embedded environment and the web application.

## Getting Started

The easiest way to integrate micro-repl into a project is via a CDN. Below is a basic example of how to initialize a connection to a board:

```html
<script type="module">
  import Serial from 'https://esm.run/micro-repl/serial';

  const board = Serial({
    baudRate: 115200,
    onconnect() { console.info('Board connected'); },
    ondisconnect() { console.warn('Board disconnected'); },
    ondata(buffer) { /* handle raw data */ }
  });

  // Connection must be triggered by a user gesture
  document.getElementById('connect-btn').onclick = async () => {
    await board.connect('#terminal-container');
  };
</script>
```

## Advanced API Usage

Beyond simple terminal interaction, the `MicroREPLSerialBoard` instance provides methods for programmatic control:

- **`board.upload(path, content)`**: Uploads a string or `File` object to the specified path on the board.
- **`board.reset()`**: Performs a soft-reset of the board and returns it to the REPL prompt.
- **`board.paste(code)`**: Enters paste mode, writes the code block, and exits, which is ideal for sending large scripts without manual interaction.

This project is particularly useful for educational tools, web-based configuration utilities, and quick prototyping environments where a zero-install setup is preferred.
