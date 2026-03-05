---
title: OpenFIRE - The Open Four Infa-Red Emitter Light Gun System
summary: OpenFIRE is an advanced open-source firmware for RP2040 and RP2350 microcontrollers,
  providing high-performance IR light gun tracking with perspective adjustment. It
  features dual-core optimization to separate input polling from camera processing,
  ensuring low latency and high responsiveness. The system supports a wide range of
  peripherals including solenoids, rumble motors, and OLED displays, all configurable
  via a dedicated desktop application.
slug: openfire-the-open-four-infa-red-emitter-light-gun-system
codeUrl: https://github.com/TeamOpenFIRE/OpenFIRE-Firmware
star: 129
version: v6.1
lastUpdated: '2026-01-16'
rtos: ''
libraries:
- littlefs
topics:
- arduino
- lightgun
- raspberry-pi-pico
- rp2040
isShow: true
image: /202603/openfire.webp
createdAt: '2026-03-05'
updatedAt: '2026-03-05'
---

OpenFIRE represents a significant leap forward for the DIY light gun community, serving as the successor to the IR-GUN4ALL and SAMCO projects. It is a feature-rich firmware designed specifically for the Raspberry Pi RP2040 and the newer RP2350 microcontrollers. By leveraging the unique capabilities of these chips, OpenFIRE provides a low-latency, highly customizable experience for retro gaming enthusiasts and arcade builders alike.

### Advanced Tracking and Architecture

At its core, OpenFIRE is built to handle the complexities of modern light gun emulation. One of its standout features is the support for multiple IR layouts, including the recommended double lightbar and the diamond layout compatible with Xwiigun. Unlike simpler systems, OpenFIRE utilizes real-time perspective-adjusted tracking. This ensures that the cursor remains accurate even when the player is not perfectly centered or is at an angle to the screen, a common issue with traditional IR-based setups.

The firmware is architected to take full advantage of the RP2040's dual-core design. The main core is dedicated to processing camera data and managing peripherals, while the second core handles high-frequency tasks like input polling, queuing, and serial communication. This separation of concerns ensures that the gun remains responsive even when driving complex peripherals like OLED displays or handling heavy force feedback signals.

### Peripherals and Feedback

OpenFIRE isn't just about tracking; it's a complete peripheral controller. It supports a wide array of tactile feedback options, including 12/24V solenoids for that classic arcade "kick" and 5V rumble motors for more subtle feedback. It also integrates support for SSD1306-based I2C OLED displays, which can show real-time game data like life counts and ammo, or assist with menu navigation. For visual flair, the system supports WS2812B NeoPixels and RGB LEDs for reactive lighting.

The input system is equally robust. OpenFIRE can emulate a keyboard, a 5-button absolute positioning mouse, or a dual-stick gamepad with D-pad support. This flexibility is managed through a comprehensive button mapping system, allowing users to tailor the gun's behavior to specific games or emulators. It is fully compatible with PC force feedback handlers like Mame Hooker and The Hook Of The Reaper, and it offers dedicated mappings for the MiSTer FPGA ecosystem.

### Configuration and Ecosystem

For users, installation is simplified through the use of .UF2 binaries, which can be flashed via a simple drag-and-drop process. Configuration is handled through the cross-platform OpenFIRE Desktop App, which allows for on-the-fly adjustments to calibration, button layouts, and hardware settings. Settings are stored directly on the microcontroller's flash memory using a file system (LittleFS), making the gun a truly portable "plug-and-play" device.

Developers looking to contribute or customize the firmware will find a well-documented build process. The project uses the Arduino framework with a specific patched version of the `arduino-pico` core to ensure compatibility with the TinyUSB stack. This open-source approach encourages community forks and ports, ensuring that OpenFIRE remains a versatile tool for the light gun community for years to come.
