---
title: AgentDeck
summary: AgentDeck is a multi-surface physical control interface for AI coding agents,
  enabling real-time steering of agents like Claude Code and Codex via hardware. It
  supports 13 different display surfaces simultaneously, utilizing a Node.js or Swift-based
  bridge to coordinate between terminal-based agents and devices like the Stream Deck+,
  Android tablets, and ESP32 displays. The system includes a sophisticated performance
  evaluation framework (APME) that uses local SQLite storage to track and optimize
  agent efficiency.
slug: agentdeck
codeUrl: https://github.com/puritysb/AgentDeck
siteUrl: https://puritysb.github.io/AgentDeck/
version: android-v0.4.0
lastUpdated: '2026-04-21'
licenses:
- MIT
image: /202604/AgentDeck_10.avif
rtos: freertos
libraries:
- lvgl
- sqlite
- platformio-platformio-core
topics:
- ai-agents
- android
- claude-code
- developer-tools
- esp32
- hardware
- iot
- monorepo
- stream-deck
- swiftui
isShow: true
createdAt: '2026-04-23T00:40:49+00:00'
updatedAt: '2026-04-23T00:40:49+00:00'
---

AgentDeck serves as a physical control surface designed specifically for AI coding agents, functioning much like an audio mixing console but tailored for the development workflow. Originally conceived for the Elgato Stream Deck+, the project has expanded to support 13 simultaneous display surfaces, including tablets, e-ink readers, ESP32 modules, and LED matrices. The core philosophy is to allow developers to steer their AI agents without leaving their keyboard flow.


## What is AgentDeck?

The system acts as a bridge that reads an agent's state in real-time and dynamically reconfigures physical buttons and encoders. This allows for instant interactions such as responding to permission prompts with semantic colors, interrupting runaway processes with a dedicated STOP button, and navigating multi-choice prompts via rotary encoders. It also integrates voice input using Apple's on-device SFSpeech framework for a zero-setup, offline dictation experience.

![AgentDeck hardware setup](/202604/AgentDeck_1.avif)

## Technical Architecture

The architecture relies on a central Daemon (port 9120) that acts as the sole hub for all dashboard clients. This daemon aggregates state from various Session Bridges, which handle individual PTY (Pseudo-Terminal) managers for tools like Claude Code or Codex CLI. This separation ensures that the bridge is transparent; if the hardware interface is off, the underlying CLI agents continue to function normally. On macOS, the system can run as a standalone Swift-based daemon, providing a native experience without requiring Node.js.

## Supported Surfaces and Hardware

AgentDeck supports a diverse array of hardware interfaces, categorized into interactive and monitoring surfaces:

*   **Interactive Controllers**: The Stream Deck+ (8 keys, 4 encoders) and the Ulanzi D200H Deck Dock (14-key HID controller) provide tactile control. The Stream Deck+ uses a "session-per-button" layout where users can manage multiple active agents from a single keypad.
*   **Mobile Dashboards**: Android and Apple devices run native apps (Jetpack Compose and SwiftUI) that offer a "terrarium" UI, featuring pixel-art creatures that reflect the agent's current state.
*   **Embedded Displays**: ESP32-based modules, including Round AMOLED and IPS LCD panels, run custom firmware built with LVGL and LovyanGFX. These provide always-on monitoring over WiFi or Serial connections.
*   **LED Matrices**: Devices like the Ulanzi TC001 and Pixoo64 display agent status through simplified pixel-art animations and usage HUDs.

## Stream Deck+ Layout (v4)

The v4 layout introduces a session-per-button model. The keypad provides a list view of up to 8 active sessions. Selecting a session enters a detail view where semantic colors guide the user—green for approval, red for denial, and blue for permanent permissions. Encoders are mapped to utility functions, prompt cycling, usage monitoring, and voice transcription.

![Stream Deck+ layout](/202604/AgentDeck_6.avif)

## Agent Performance Evaluation (APME)

A critical component of AgentDeck is the APME (Agent Performance Evaluation & Model Orchestration) system. It addresses the challenge of routing tasks to the most efficient LLM by moving away from "gut-feel" selection toward data-driven measurement. APME ingests data from Claude Code hooks, PTY parsers, and timeline events into a local SQLite database. It uses a category-aware strategy to evaluate runs based on outcome, judge scores (using local LLM backends like MLX), efficiency, and user "vibe" (manual approval/rejection).

## Embedded Firmware and TUI

For users who prefer a terminal-centric approach, the TUI dashboard provides a Unicode Braille terrarium and ANSI-based gauges for monitoring agents over SSH. Meanwhile, the ESP32 firmware supports multiple board configurations, leveraging PlatformIO for builds. These embedded devices use WiFiManager for easy provisioning and connect via WebSockets to the main daemon to provide a low-power, always-on status display.
