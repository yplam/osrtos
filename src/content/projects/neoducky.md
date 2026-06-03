---
title: NeoDucky
summary: NeoDucky is a compact and efficient BadUSB/RubberDucky device powered by
  CircuitPython and the Adafruit NeoKey Trinkey. It supports automated OS detection,
  stealth mode operation, and a flexible payload syntax for HID injection attacks.
slug: neoducky
codeUrl: https://github.com/FLOCK4H/NeoDucky
star: 29
version: v1.0
lastUpdated: '2024-06-03'
rtos: ''
libraries:
- micropython
topics:
- adafruit
- badusb
- badusb-payloads
- cheap-badusb
- circuitpython
- cybersecurity
- evil-pendrive
- hid
- hid-attacks
- hid-keyboard
- neoducky
- pentesting
- rubber-ducky
- security-tools
isShow: false
createdAt: '2026-02-18'
updatedAt: '2026-02-18'
relatedProjects:
- bluetooth-ducky-esp32-hid-injection-tool
- wifiexe-esp32-s3-based-badusb
- badstm
- toothpaste
- the-tick
- bruce-firmware
---

NeoDucky is an open-source HID payload injection tool designed for security research and ethical hacking. While it is specifically optimized for the Adafruit NeoKey Trinkey (based on the ATSAMD21E18 microcontroller), its CircuitPython-based architecture allows it to be ported to almost any device that supports USB HID and CircuitPython.

### Versatile HID Injection

The primary function of NeoDucky is to act as a "BadUSB" device, mimicking a keyboard to inject keystrokes at high speeds. It uses a simplified payload syntax that allows users to define complex sequences of keys, including modifiers like GUI/Windows keys, Alt, Control, and Shift. 

One of the standout features of the project is its ability to distinguish between macOS and other operating systems automatically. This allows the device to execute different payloads depending on the target environment, ensuring that platform-specific shortcuts (such as using the Command key versus the Control key) are handled correctly without manual intervention.

### Payload Syntax and Control

NeoDucky introduces an easy-to-use syntax for managing payloads. Users can define delays using `<timeX>` tags (where X is the duration in seconds) and create repeating actions using the `<LOOP>` tag. The system handles both single-press keys and "multi-tags" where a key (like Shift) is held down across multiple characters.

An example payload might look like this:

```
<GUI><time2>chrome<time2>\n<time2>www.youtube.com<time1>\n<time2><CTRL>w<time1><LSHT>~<LSHT>
```

This sequence opens a browser, navigates to a URL, and then performs specific keyboard shortcuts, demonstrating the speed and automation capabilities of the device.

### Stealth and Storage Modes

For security professionals, stealth is often a requirement. NeoDucky includes a mechanism to switch between storage mode and stealth mode. By modifying the `boot.py` file to include `storage.disable_usb_device()`, the device will hide its internal flash drive from the host operating system upon connection, making it less conspicuous. Users can re-enable the storage by entering a REPL session via a serial terminal and invoking the storage enable command.

### Hardware and Setup

The project is built around the Adafruit NeoKey Trinkey, a tiny USB-A board featuring an ATSAMD21 microcontroller and a mechanical key switch. Setting up the device involves flashing the CircuitPython UF2 firmware and copying the project files—including `code.py`, `boot.py`, and the `lib` and `tools` directories—to the resulting `CIRCUITPY` drive. The onboard NeoPixel LED provides visual feedback during payload execution, changing colors to indicate different states like delays, key presses, or errors.

### Technical Architecture

The software is modular, utilizing a core `NeoDucky` class in `code.py` that interfaces with the `adafruit_hid` library. It includes an analyzer to parse the `payload.txt` file and a detection module to identify the host OS based on file system structures. The use of CircuitPython makes the logic highly readable and easy to modify for custom security research requirements, providing a high-level abstraction over the underlying SAMD21 hardware.
