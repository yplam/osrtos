---
title: Claude Buddy Pico
summary: Claude Buddy Pico is a hardware mascot for Claude Desktop, ported from the
  original M5Stack version to the Raspberry Pi Pico 2 W. It features a 2.8-inch landscape
  display, Bluetooth Low Energy connectivity via BTstack, and physical buttons for
  approving or denying AI tool calls. The project utilizes the Pimoroni Pico library
  for peripheral management and includes custom 3D-printable CAD files for the enclosure.
slug: claude-buddy-pico
codeUrl: https://github.com/amargandhi/claude-buddy-pico
lastUpdated: '2026-04-21'
licenses:
- MIT
image: /202605/claude-buddy-pico_0.avif
rtos: ''
topics:
- 3d-printing
- ble
- claude
- claude-code
- claude-desktop
- embedded
- pico-2w
- pimoroni
- raspberry-pi-pico
isShow: true
createdAt: '2026-05-18T23:50:40+00:00'
updatedAt: '2026-05-18T23:50:40+00:00'
relatedProjects:
- m5paper-buddy
- deskpet-for-m5stack-cardputer
- deskpet
- clawy
- ai-desk-card
- clawdmeter
---

Claude Buddy Pico brings the Claude Code mascot to life as a playful, physical desktop companion. Originally developed by Felix Rieseberg for M5 ESP32 hardware, this project ports the experience to the Raspberry Pi Pico 2 W, upgrading the interface to a larger 2.8" display. The device sits alongside your computer, reacting to Claude Desktop's actions with animated expressions and providing physical buttons to approve or deny tool calls via Bluetooth.


### Hardware and Capabilities

The project is designed around the Raspberry Pi Pico 2 W and the Pimoroni Display Pack 2.8. While it can run tethered via USB, it supports untethered operation using an optional LiPo SHIM and a 2000 mAh battery. The physical enclosure is a custom 3D-printed case shaped like the "Clawd" character, with CAD files provided in both editable `.step` and printable `.stl` formats.

![All parts laid out: Pico 2 W, Pimoroni Display Pack 2.8, LiPo SHIM, 2000 mAh battery, 3D-printed Clawd case, M3 screws](/202605/claude-buddy-pico_2.avif)

Key hardware features include:
- **Landscape Display**: A 320×240 resolution UI, moving away from the portrait orientation of the original M5Stack build.
- **Physical Controls**: Four front buttons (A, B, X, and Y) replace the original power-button semantics for navigation and interaction.
- **BLE Protocol**: Uses the standard Hardware Buddy protocol, allowing it to pair seamlessly with stock Claude Desktop sessions.

### Technical Implementation

The firmware is built using the Raspberry Pi Pico SDK and the Pimoroni Pico library, which manages the ST7789 display driver, buttons, and RGB LEDs. Bluetooth functionality is handled by the BTstack library. 

One of the primary departures from the upstream project is the removal of the IMU (Inertial Measurement Unit). Interactions that previously relied on physical movement, such as shaking the device to make the character dizzy or turning it face-down to trigger a "nap" mode, have been mapped to explicit button holds. For example, holding the 'X' button triggers the dizzy easter egg, while holding 'Y' manages the nap and wake states.

![Claude Buddy Pico powered on in the printed case](/202605/claude-buddy-pico_1.avif)

### Firmware Architecture

The build system supports two distinct firmware paths from the same codebase:
1. **Main Path (V2)**: This is the default animated UI, featuring face expressions, an animated pet, a dock clock, and a detailed permissions log.
2. **Basic Path (V1)**: A simplified, single-file UI monolith used during early bringup. It maintains the same BLE stack but provides simpler screens without animations, making it ideal for debugging the Bluetooth layer.

The repository also generates several diagnostic "smoke-test" builds to verify hardware integrity, including isolated tests for the display, buttons, LEDs, and the BLE protocol stack.

### Integration with Claude Desktop

To use the device, users enable Developer Mode within the Claude Desktop application and navigate to the Hardware Buddy menu. The Pico identifies itself as "Claude Pico" during the Bluetooth Low Energy pairing process. Once connected, it provides a tactile interface for the AI's tool call requests, with the 'A' button serving as the primary approval mechanism and the 'B' button used for denials.
