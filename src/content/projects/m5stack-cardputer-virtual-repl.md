---
title: M5Stack Cardputer Virtual REPL
summary: A virtual REPL environment for the M5Stack Cardputer that enables interactive
  Python coding directly on the device's keyboard and screen. It provides command
  line history, editing functions, and automatic execution of scripts on boot. The
  project is designed for CircuitPython and includes support for I2S audio playback
  and SD card integration.
slug: m5stack-cardputer-virtual-repl
codeUrl: https://github.com/RetiredWizard/cardputer_repl
star: 20
lastUpdated: '2024-09-15'
rtos: ''
libraries:
- micropython
topics:
- cardputer
- circuitpython
- esp32-s3
- m5stack
- m5stack-cardputer
isShow: false
createdAt: '2026-03-02'
updatedAt: '2026-03-02'
---

The `cardputer_repl` project provides a specialized Virtual REPL (Read-Eval-Print Loop) environment tailored for the M5Stack Cardputer. The Cardputer is a portable computing device powered by the M5StampS3, featuring a built-in keyboard and display. While CircuitPython typically provides a REPL over a serial USB connection, this project enables a standalone interactive experience directly on the device's hardware, allowing users to write and test code without a host computer.

### Interactive Features and Navigation

One of the primary challenges with small-form-factor keyboards is navigating command history and editing long lines of code. This virtual REPL addresses this by mapping the Cardputer's FN key to provide arrow key functionality (up, down, left, right). This allows users to cycle through previous commands and move the cursor within the current line for quick edits, mirroring the behavior of a standard terminal. 

The implementation in `code.py` leverages the `codeop` module to handle multi-line statements. In newer versions of CircuitPython (9.0.0 alpha 7 and later), the REPL can detect incomplete statements and provide a continuation prompt (`,,,`), allowing for the definition of functions and loops directly within the virtual environment.

### Script Integration and Boot Behavior

Beyond acting as a standalone shell, the project allows developers to integrate Cardputer keyboard input into their own Python scripts. By importing the `input` function from the `cardputer_repl` module, standard Python `input()` calls are redirected to use the device's physical keyboard rather than the serial console.

```python
try:
    from cardputer_repl import input
except:
    pass
```

The system distinguishes between the main entry point and user scripts. The standard `code.py` file initializes the virtual REPL. If a file named `virtcode.py` exists in the root directory, the Virtual REPL will execute it upon power-up or reset, similar to how the native CircuitPython REPL handles `code.py`. Once the `virtcode.py` script finishes execution, control is returned to the Virtual REPL, allowing for interactive debugging or further command entry.

### Audio and I2S Support

The repository also includes utilities like `playi2s.py`, which demonstrates audio capabilities on the Cardputer. It supports playing WAV files via the I2S interface, handling various pin definitions for different board revisions (e.g., `I2S_BIT_CLOCK`, `SPEAKER_SCK`, or `I2S_BCK`). The script includes logic for mounting SD cards via SPI and provides a simple interface to play audio files until a user interrupts the process by pressing 'Q'. The audio playback is configured for PCM Little/Signed 16-bit depth, typically at an 8000 Hz sampling rate.

### Evolution and Core Integration

It is important to note that as of CircuitPython 9.1.0-beta.1, much of this functionality has been integrated directly into the CircuitPython core. For users seeking a more comprehensive disk operating system experience on the Cardputer, the project points toward PyDOS as a robust alternative that fully supports the hardware's keyboard and display. This repository remains a valuable reference for implementing custom REPL environments and handling I2S audio on ESP32-S3 based hardware.
