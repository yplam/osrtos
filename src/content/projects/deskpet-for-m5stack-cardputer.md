---
title: DeskPet for M5Stack Cardputer
summary: DeskPet is a pixel-art companion for the M5Stack Cardputer that synchronizes
  with Claude Code sessions via Bluetooth Low Energy (BLE). Built on the ESP32-S3
  using the NimBLE stack and ArduinoJson, it provides real-time visual feedback and
  hardware-based command approval for AI agent workflows.
slug: deskpet-for-m5stack-cardputer
codeUrl: https://github.com/bryant24hao/deskpet-firmware
lastUpdated: '2026-04-19'
licenses:
- NOASSERTION
image: /202604/deskpet-firmware_0.avif
rtos: freertos
libraries:
- nimble
- littlefs
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
createdAt: '2026-04-28T23:42:29+00:00'
updatedAt: '2026-04-28T23:42:29+00:00'
---

## Overview

DeskPet is an interactive pixel-art companion designed for the M5Stack Cardputer, serving as a hardware bridge for Claude Code sessions. It is a community port of the `claude-desktop-buddy` project, adapted specifically for the Cardputer’s landscape display and full physical keyboard. By connecting to a computer over Bluetooth Low Energy (BLE), DeskPet provides a physical manifestation of an AI agent, reacting in real-time to the agent's internal state and activity.

The project transforms the M5Stack Cardputer into a dedicated monitoring and control device. While the AI agent works on the laptop, DeskPet displays live session statistics—such as running task counts and cumulative token usage—and allows the user to approve or deny sensitive operations directly from the Cardputer’s keyboard.

## Real-Time Interaction and State Machine

At the heart of DeskPet is a robust state machine that governs the behavior of a pixel character named "Clawdie." The device communicates with the Claude Desktop app using the Nordic UART Service (NUS) protocol. As the AI agent moves through different phases of a task, it sends JSON heartbeats to the Cardputer, triggering specific animations and LED behaviors:

*   **Idle & Busy**: When the agent is active, Clawdie bobs and displays loading dots. When idle, the pet breathes and blinks.
*   **Attention & Approval**: One of the most functional aspects of the project is the approval loop. When Claude Code requests permission to run a command (like a file deletion), the Cardputer screen flips to a red "Approval Pending" state, and the WS2812 LED pulses orange. The user can approve the action by pressing `Enter` or deny it with `Esc`, allowing for a seamless workflow without switching windows on the main computer.
*   **Environmental Cues**: The pet reacts to the environment; for instance, it "sleeps" when the BLE link is down and can enter a "dizzy" state if the keyboard is mashed too quickly.

## Technical Implementation

The firmware is developed using the Arduino framework within the PlatformIO ecosystem, targeting the ESP32-S3 inside the M5Stack Cardputer. It leverages several key libraries to handle the complex requirements of an interactive BLE device:

*   **NimBLE-Arduino**: Used for efficient BLE communication, handling the advertising as `Claude-DP-XXXX` and managing the NUS data stream.
*   **ArduinoJson**: Essential for parsing the heartbeat JSON packets that stream from the host computer, containing session metadata and state triggers.
*   **LittleFS**: Utilized for the on-board filesystem to manage assets and configuration.
*   **M5Cardputer Library**: Provides the hardware abstraction for the 240x135 TFT display and the 56-key keyboard matrix.

## Hardware Integration

The project makes full use of the Cardputer's unique form factor. Unlike the original M5StickC implementation, this version utilizes the landscape UI to provide a split-screen view: the left side hosts the animated pixel pet, while the right panel displays live telemetry. The physical keyboard is mapped to the agent's approval flow, ensuring that the "Hardware Buddy" experience is tactile and responsive. The onboard WS2812 RGB LED provides peripheral status updates, such as a cyan "breathing" effect during active generation and green flashes for successful approvals.
