---
title: 'PIOKMbox: High-Performance USB HID Passthrough for RP2350'
summary: PIOKMbox is a dual-role USB HID firmware for the Raspberry Pi RP2350 that
  creates a transparent man-in-the-middle passthrough device. It facilitates hardware-level
  input processing by combining physical HID reports with KMBox-compatible serial
  commands, featuring advanced movement humanization and optional visual feedback
  via an ILI9341 TFT display.
slug: piokmbox-high-performance-usb-hid-passthrough-for-rp2350
codeUrl: https://github.com/VoltCyclone/Hurra
version: v2.2.1
lastUpdated: '2026-02-28'
rtos: ''
topics:
- dma
- hid
- kmbox
- kmboxnet
- rp2040
- rp2350
- usb
isShow: true
image: /202604/adafruit_products_metro_rp2350_top.webp
createdAt: '2026-04-19T00:02:43+00:00'
updatedAt: '2026-04-19T00:02:43+00:00'
---

PIOKMbox transforms the Raspberry Pi RP2350 into a sophisticated transparent USB HID bridge. By acting as a man-in-the-middle between a mouse or keyboard and a host PC, it allows for the seamless injection of synthetic inputs alongside physical hardware. The firmware is designed to be entirely invisible to the host computer, mirroring the original device's Vendor ID (VID), Product ID (PID), manufacturer strings, and product names.

## Transparent USB Architecture

The project leverages the dual-core architecture of the RP2350 to manage high-speed USB operations. Core 1 is dedicated to the TinyUSB host stack, utilizing PIO-USB to communicate with the physical mouse or keyboard. Meanwhile, Core 0 handles the TinyUSB device stack, exposing a mirrored HID device to the PC. This separation ensures that physical input and synthetic command injection happen with minimal latency—typically under 1ms for report forwarding.

When a device is connected to the RP2350's USB-A port, PIOKMbox reads the HID report descriptors and caches the device identity. It then performs a dynamic re-enumeration on the device side, ensuring the PC sees the exact peripheral connected to the bridge rather than the microcontroller itself.

## KMBox Protocol and Command Injection

One of the standout features of PIOKMbox is its compatibility with industry-standard protocols like KMBox B+, Ferrum, and Macku. It accepts commands over a hardware UART interface, allowing external tools or scripts to control mouse movements, clicks, and keyboard inputs. 

For developers requiring the absolute lowest latency, the firmware supports a fast binary protocol. These fixed 8-byte packets bypass text parsing to achieve execution times under 50 µs, supporting over 1,000 commands per second. Standard text-based commands remain available for ease of use:

```text
km.move(100, 50)      # Relative mouse move (+X right, +Y down)
km.left(1)            # Press left button
km.click(0)           # Left click
km.lock_mx(1)         # Lock physical mouse X axis
```

## Advanced Movement Humanization

To bridge the gap between robotic automation and natural human input, PIOKMbox includes a sophisticated humanization engine. This system applies movement-aware scaling, velocity-based suppression, and overshoot simulation to synthetic inputs. It offers four configurable intensity levels (OFF, LOW, MEDIUM, and HIGH) that can be toggled via hardware buttons or serial commands.

The humanization logic uses precomputed lookup tables and Bezier easing to simulate natural hand tremors and acceleration curves. For instance, the "Medium" mode matches physical mouse sensor noise (~± 0.17 px) and includes a small chance of overshooting a target, which is then smoothly corrected over subsequent frames. This hardware-accelerated processing adds less than 10 CPU cycles of overhead per pixel calculation.

## The Bridge and Visual Feedback

While a single RP2350 can handle the core passthrough tasks, the project supports a dual-board configuration for expanded functionality. In this setup, a second board—the "Bridge"—acts as an autopilot and display driver. This secondary board can interface with an ILI9341 TFT display to provide real-time performance metrics, such as latency graphs and thermal tracking.

The bridge communicates with the main proxy board via a crossed UART connection. This architecture offloads computer vision processing or complex automation logic to the second MCU, ensuring that the primary HID passthrough remains responsive and jitter-free. Status is further communicated through NeoPixel RGB LEDs, which change color based on the connection state and active humanization mode.

## Hardware and Performance

PIOKMbox is optimized for the RP2350, specifically targeting boards like the Adafruit Metro RP2350. The firmware runs at clock speeds up to 300 MHz to ensure stable PIO-USB performance. 

### Key Performance Metrics:
- **USB Passthrough Latency**: < 1 ms
- **Binary Command Execution**: < 50 µs
- **Text Command Parsing**: < 100 µs
- **UART Transmission**: 87 µs (8 bytes @ 115200 baud)

This high-performance approach makes it an ideal platform for accessibility tools, input automation research, and low-level USB development.
