---
title: DeskPet
summary: DeskPet is a pixel-art companion for the M5Stack Cardputer that synchronizes
  with Claude Code sessions via Bluetooth Low Energy. Built on the ESP32-S3 using
  the Arduino framework and NimBLE, it provides real-time visual feedback on AI agent
  states, including task progress, token usage, and permission approvals directly
  from the device's keyboard.
slug: deskpet
codeUrl: https://github.com/bryant24hao/deskpet-firmware
lastUpdated: '2026-04-19'
licenses:
- NOASSERTION
image: /202606/deskpet-firmware_0.avif
rtos: freertos
libraries:
- littlefs
- nimble
- platformio-platformio-core
topics:
- ble
- cardputer
- claude-code
- desktop-pet
- esp32-s3
- m5stack
- pixel-art
- platformio
isShow: true
createdAt: '2026-06-02T23:25:07+00:00'
updatedAt: '2026-06-02T23:25:07+00:00'
relatedProjects:
- deskpet-for-m5stack-cardputer
- clawputer
- clawy
- clawdmeter
- m5paper-buddy
- pixel-pets
---

Bringing AI agents out of the terminal and into the physical world, DeskPet is a dedicated hardware companion for Claude Code. Originally a port of the Claude Desktop Buddy, this implementation is tailored specifically for the M5Stack Cardputer, leveraging its landscape display and full physical keyboard to create an interactive pixel-art mascot that reacts to live coding sessions.

### Hardware and Interaction

The project runs on the M5Stack Cardputer, a compact portable computer powered by the ESP32-S3. By utilizing the device's 1.14" TFT screen, WS2812 RGB LED, and 56-key keyboard, DeskPet transforms a standard microcontroller into a functional peripheral for AI development. The device advertises itself over Bluetooth Low Energy (BLE) using the Nordic UART Service (NUS), making it discoverable by the Claude Desktop Hardware Buddy interface.

One of the most practical features of DeskPet is its ability to handle permission prompts. When Claude Code requests to run a sensitive command—such as a file deletion or a system script—the Cardputer screen flips to a red "Approval Pending" state. Instead of switching windows on a laptop, a developer can simply tap the `Enter` or `Esc` keys on the Cardputer to approve or deny the request, maintaining focus on the primary task.

### The Pixel Pet Persona

At the heart of the experience is "Clawdie," a pixel-art character that reflects the current state of the AI agent. The firmware implements a state machine that transitions the character through seven distinct animations based on heartbeat JSON data received over BLE:

*   **Sleep**: Triggered when the BLE link is down, showing the pet with closed eyes.
*   **Idle**: A breathing animation for when the agent is connected but inactive.
*   **Busy**: A fast-bobbing animation with loading dots when Claude is generating code.
*   **Attention**: A high-alert state with wide eyes and a pulsing orange LED when a permission prompt is waiting.
*   **Heart**: A celebratory state with rising hearts that appears immediately after a user approves a prompt.

### Technical Implementation

The firmware is built using the Arduino framework within the PlatformIO ecosystem. It relies on the NimBLE-Arduino library for efficient Bluetooth communication, which offers a lower memory footprint compared to the standard ESP32 BLE stack. Data exchange is handled via JSON, parsed by ArduinoJson, allowing the device to display live session metrics such as running task counts and cumulative token usage.

For storage and persistence, the project utilizes LittleFS on the ESP32-S3's flash memory. The display logic is optimized for the Cardputer's landscape orientation, providing a split-screen UI where the left side hosts the animated pet and the right side streams live telemetry from the Claude Code session.

### Workflow and Setup

Integrating the DeskPet into a development workflow involves pairing the device through the Claude Desktop Hardware Buddy pane. Once connected, the device acts as a secondary status monitor. The built-in RGB LED provides ambient feedback; for instance, a gentle cyan pulse indicates that Claude is working, while a bright orange blink signals that the user's attention is required for a terminal prompt.

Future developments for the project include a three-level menu system for on-device configuration, NVS (Non-Volatile Storage) persistence for settings, and the ability to push custom GIF character packs to the device, allowing users to swap "Clawdie" for other mascots like a capybara or custom community creations.
