---
title: MicroPython Library for the Cheap Yellow Display (CYD)
summary: A high-level MicroPython library designed to simplify the control of the
  ESP32-2432S028R, popularly known as the Cheap Yellow Display (CYD). It provides
  a unified interface for managing the ILI9341 display, XPT2046 touch controller,
  RGB LEDs, and audio components on the ESP32 platform.
slug: micropython-library-for-the-cheap-yellow-display-cyd
codeUrl: https://github.com/jtobinart/MicroPython_CYD_ESP32-2432S028R
lastUpdated: '2024-07-16'
licenses:
- MIT
rtos: ''
libraries:
- micropython
topics:
- cyd
- cydr
- esp32-2432s028
- esp32-2432s028r
- micropython
isShow: false
createdAt: '2026-03-31T23:30:57+00:00'
updatedAt: '2026-03-31T23:30:57+00:00'
---

The ESP32-2432S028R, affectionately dubbed the "Cheap Yellow Display" (CYD) by the maker community, has become a go-to platform for developers seeking an affordable, all-in-one ESP32 touch-screen module. While the hardware is impressive for its price, setting up the various drivers for the display, touch sensor, and peripherals in MicroPython can often be a repetitive task. This library aims to streamline that process by providing a high-level abstraction layer specifically for this board.

## Simplifying the CYD Experience

At its core, this project wraps the complexity of the hardware into a single `CYD` class. Instead of manually configuring SPI pins for the display and touch controller, users can initialize the entire board with just two lines of code. This approach allows developers to focus on building their application logic rather than debugging hardware initialization strings.

The library integrates several key components:
*   **ILI9341 Display Driver**: Handles the 240x320 color screen.
*   **XPT2046 Touch Driver**: Manages the resistive touch interface.
*   **Peripheral Control**: Includes built-in support for the onboard RGB LED (via PWM) and the speaker gain control.

## Technical Integration

The project leverages well-regarded drivers from the MicroPython ecosystem, specifically the ILI9341 and XPT2046 implementations by rdagger. By bundling these dependencies and providing a wrapper, the library ensures compatibility and eases the installation process. It is optimized for MicroPython v1.23.0 and newer, running on the generic ESP32 firmware.

One of the convenient features of this library is its flexible initialization. You can start with default settings or pass specific parameters to adjust the display orientation, speaker gain, or even pre-configure WiFi credentials.

```python
from cydr import CYD

# Initialize with default settings
cyd = CYD()

# Or initialize with specific hardware configurations
cyd = CYD(rgb_pmw=False, speaker_gain=512,
          display_width=240, display_height=320,
          wifi_ssid="Your_SSID", wifi_password="Your_Password")
```

## Hardware and Setup

To use this library, you'll need the ESP32-2432S028R board. The setup process involves flashing the standard MicroPython firmware and transferring the core library files (`cydr.py`, `ili9341.py`, and `xpt2046.py`) to the device. The repository also includes a `boot.py` to help manage the startup sequence.

For those looking to extend the project or generate local documentation, the repository includes a Sphinx-based documentation system. This allows for the generation of professional-grade manuals in HTML or PDF formats, ensuring that as your project grows, the documentation can keep pace.
