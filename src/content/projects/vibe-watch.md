---
title: Vibe Watch
summary: Vibe Watch is a wearable, tactile control surface for parallel AI-assisted
  coding built on the M5Stack StopWatch. Powered by an ESP32-S3, it leverages a 466
  × 466 round touchscreen, tactile buttons, sound, and haptics alongside Bluetooth
  Low Energy to monitor up to six AI agent sessions and provide instant physical approval
  and voice controls.
slug: vibe-watch
codeUrl: https://github.com/GOROman/vibewatch
siteUrl: https://m5stack.com/global-innovation-contest-2026
version: v1.00
lastUpdated: '2026-08-08'
licenses:
- MIT
image: /202610/vibewatch_0.avif
rtos: freertos
libraries:
- nimble
topics:
- ai
- ble-hid
- esp32-s3
- m5stack
- m5stack-stopwatch
- platformio
- vibe-coding
isShow: true
createdAt: '2026-10-13T10:51:15+00:00'
updatedAt: '2026-10-13T10:51:15+00:00'
---

Vibe Watch is a wearable, tactile control surface designed for AI-assisted "vibe coding." Developed for the M5Stack Global Innovation Contest 2026, the device moves frequent AI interactions off desktop monitors and onto a dedicated wrist-worn controller.


## Dedicated Hardware for AI-Assisted Workflows

When running multiple AI agent sessions simultaneously, monitoring background tasks and context-switching across desktop windows quickly fragments attention. Vibe Watch tackles this by placing active agent states directly on the wrist. Instead of tabbing back to a terminal or searching through windows, developers can track active tasks at a glance, make approve or reject decisions using physical buttons, and trigger voice input without leaving their flow.

Inspired by dedicated coding hardware devices like the OpenAI Codex Micro, the design combines a circular display with tactile pushbuttons, motion graphics, audio cues, and haptic feedback into a focused human-AI interface.

## Dual-Layer Interface

The interface is organized into two primary operational modes:

### The Agent Layer

The primary view arranges six live agent indicators symmetrically around the perimeter of the circular display. Host-driven state changes communicate background activity using distinct colors, brightness levels, and animations. A spring-physics selection ring allows quick navigation between active agent sessions.

![Vibe Watch Agent layer showing six parallel AI sessions](/202610/vibewatch_2.avif)

### The Action Layer

Pressing both physical hardware buttons switches the device into the Action layer, offering rapid tactile controls:

- **FAST**: Initiates an expedited execution mode.
- **NG / OK**: Provides reject and approve controls, mapped to physical buttons and accented by distinct audio and haptic feedback.
- **PLAN**: Toggles architectural planning mode with an immediate state change.
- **AI**: Calls the primary AI assistant.
- **Center Microphone**: Serves as a hold-to-talk control for voice input.

![Vibe Watch Action layer showing FAST, NG, OK, PLAN, AI, and push-to-talk](/202610/vibewatch_3.avif)

The physical left button is color-coded orange to trigger **NG** (No-Go / Reject), while the blue right button maps to **OK** (Approve). Visual on-screen rails extend from the button edges to reinforce hardware-to-software mappings.

## Multisensory Feedback and Integration

Rather than serving as a basic macro pad, Vibe Watch integrates display motion, audio synthesis, haptics, and inputs into a coherent interaction model:

- Approval (**OK**) triggers an ascending square-wave chime, while rejection (**NG**) outputs a descending phrase.
- Bluetooth pairing and agent status changes deliver distinct tactile vibration patterns.
- Onboard device settings allow customization of audio volume, haptic intensity, and state-change alerts directly on the watch, with values preserved across reboots.

## Hardware Implementation

The project runs on an off-the-shelf M5Stack StopWatch without requiring auxiliary controller boards:

- **ESP32-S3 MCU**: Drives graphics rendering, configuration storage, battery monitoring, and Bluetooth Low Energy (BLE HID) communication.
- **466 × 466 Round Touch Display**: Hosts the radial 6-agent layout and tactile touch targets.
- **Dual Tactile Buttons**: Enable physical, eyes-free decision making.
- **Buzzer and Vibration Motor**: Supply synthesized sound cues and haptic patterns.
- **Rechargeable Battery**: Powers untethered wireless operation.

To make the round StopWatch wearable, the official rectangular Watch Mount Accessory from the M5Stick series is adapted. The plastic retaining clips are removed to produce a flat mating surface, bonded to the rear casing using high-strength double-sided tape, and secured with a nylon strap.

![Modified watch mount attached to the rear of Vibe Watch with strong double-sided tape](/202610/vibewatch_8.avif)

## Building and Pairing

The firmware is developed using PlatformIO on the Arduino framework with ESP32-S3 support, using M5Unified, NimBLE-Arduino, and ArduinoJson. Once flashed over USB, selecting a device slot and initiating pairing in the watch's onboard settings exposes the controller as a standard BLE HID device to the host development environment.
