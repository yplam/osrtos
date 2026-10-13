---
title: HackMan3D Control Deck
summary: HackMan3D Control Deck is a family of programmable desktop macro controllers
  pairing dedicated embedded hardware with a cross-platform PySide6 configuration
  application. The entry HCD-BASE model runs on an ATmega32U4 (Arduino Pro Micro)
  to monitor mechanical MX switches and drive status LEDs, while larger variants expand
  to encoder multiplexing and ESP32-S3 touchscreen control. Communication occurs over
  serial USB via a continuous heartbeat protocol for active profile execution and
  key mappings.
slug: hackman3d-control-deck
codeUrl: https://github.com/HackMan3D/Hackman3D-Control-Deck
version: v1.6.6
lastUpdated: '2026-10-10'
image: /202610/Hackman3D-Control-Deck_0.avif
rtos: ''
topics:
- arduino
- macos
- macro-pad
- pyside6
- windows
isShow: true
createdAt: '2026-10-13T10:50:45+00:00'
updatedAt: '2026-10-13T10:50:45+00:00'
---

HackMan3D Control Deck (HCD) is an open family of programmable desktop controllers. The ecosystem bridges custom microcontrollers with a unified desktop interface across macOS, Windows, and Linux. The flagship HCD-BASE and HCD Plus configurations use an ATmega32U4 microcontroller (Arduino Pro Micro), while the touchscreen-driven HCD Pro is built around an ESP32-S3 module.

![HCD-BASE hardware with nine MX keys](/202610/Hackman3D-Control-Deck_2.avif)

## System Architecture and Operation

The controller operates in lockstep with the desktop host application over USB serial communication:

1. The desktop application discovers the controller and maintains active link monitoring via a continuous `HCD_PING` and `HCD_PONG` heartbeat loop.
2. When key events occur, the microcontroller reports state changes across the serial line to trigger configured host-side actions.
3. The host software manages profiles, assigning actions to both short and long press states on each key.
4. Status signals feed back to the board: a dedicated red connection LED reflects host heartbeat status (shutting off if communication lapses for three seconds), while a white LED bar provides hardware action feedback.

Firmware flashing is handled directly through the desktop application via bundled AVRDUDE and esptool utilities, eliminating the need to compile sketches manually or install standalone programming suites.


## HCD-BASE Hardware

The base unit is built around straightforward, modular electronics:

- **Microcontroller**: Arduino Pro Micro running an ATmega32U4 at 5 V / 16 MHz.
- **Input**: 9 mechanical MX switches arranged in a 3 × 3 matrix using internal microcontroller pull-ups and shared ground wiring.
- **Lighting & Drivers**: A red connection indicator LED and a white 5 V COB LED strip for action feedback, each switched via discrete IRLB8721 power MOSFETs.
- **Interface**: USB-C connectivity for host discovery, firmware flashing, and bidirectional control streams.

![HCD-BASE key editor with the first MX key selected](/202610/Hackman3D-Control-Deck_1.avif)

## Desktop Application

The companion software is developed using PySide6 to provide unified management across Windows, macOS, and Linux platforms:

- **Profiles & Key Assignment**: Allows users to configure separate short-press and long-press actions for all switches, mapping them to system hotkeys, text snippets, application shortcuts, URL navigation, and media commands.
- **Hardware Diagnostics**: Inspects active firmware versions, serial interfaces, link heartbeat status, and real-time switch states.
- **Firmware Flashing**: Directly uploads prebuilt firmware binaries to connected boards over USB.
- **Background Operation**: Minimizes seamlessly to the macOS menu bar or the Windows and Linux system tray to keep hotkey execution and heartbeat telemetry running continuously in the background.

## Firmware Implementation

The firmware repository organizes code cleanly by model variant:

- `HackMan3DControlDeck`: Main firmware sketch for the 9-key ATmega32U4 BASE variant, splitting responsibilities across dedicated modules for button state tracking (`HCD_Buttons`), lighting control (`HCD_Leds`), and serial command handling (`HCD_Protocol`).
- `HackMan3DControlDeckPlus`: Extended ATmega32U4 sketch incorporating MCP23017 I/O expansion to monitor 12 switches alongside clickable rotary encoders.
- `HackMan3DControlDeckPro`: ESP32-S3 firmware coordinating a 7-inch RGB touch panel, persistent flash asset cache, and USB serial command pipelines.
