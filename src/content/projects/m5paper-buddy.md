---
title: M5Paper Buddy
summary: A physical companion device for the Claude Code AI assistant, utilizing the
  M5Paper V1.1 e-ink display. It features real-time session mirroring, hardware-based
  tool approval, and touch-screen interactions powered by ESP32 and a Python-based
  daemon.
slug: m5paper-buddy
codeUrl: https://github.com/op7418/m5-paper-buddy
siteUrl: https://github.com/op7418/m5-paper-buddy
lastUpdated: '2026-04-19'
licenses:
- NOASSERTION
rtos: freertos
libraries:
- littlefs
- platformio-platformio-core
topics:
- approval-workflow
- arduino
- ble
- claude
- claude-code
- claude-code-plugin
- e-ink
- eink
- esp32
- hardware
- i18n
- m5paper
- m5stack
- platformio
isShow: true
image: /202605/m5-paper-buddy.webp
createdAt: '2026-05-07T23:34:05+00:00'
updatedAt: '2026-05-07T23:34:05+00:00'
relatedProjects:
- ai-desk-card
- deskpet-for-m5stack-cardputer
- clawy
- deskpet
- claude-buddy-pico
- nebaura-labs-mote
---

## Your AI Coding Partner in Physical Form

While AI coding assistants like Claude Code have revolutionized development workflows, they often remain confined to a terminal window or a background process. M5Paper Buddy bridges the gap between the digital and physical worlds by transforming an M5Paper V1.1 into a dedicated desktop companion for Claude Code. This project leverages the unique properties of e-ink technology to provide a persistent, low-power dashboard that tracks your AI's activity, context usage, and pending tasks.

## Hardware-Driven Workflow and Security

One of the standout features of M5Paper Buddy is its hardware approval system. In a typical Claude Code session, the AI might request to run a bash command, edit a file, or write new content. Instead of just another prompt in your terminal, these requests trigger a full-screen "PreToolUse" card on the M5Paper. 

Users can review the complete command or a file diff directly on the e-ink screen and use the physical hardware buttons to approve (PUSH) or deny (DOWN) the action. This adds a tangible layer of security and intentionality to AI-driven development. For those in a flow state, a long-press of the UP button activates Do Not Disturb (DND) mode, which can be configured to auto-approve requests while providing a visual indicator of the AI's status.

## A Technical Deep Dive into the Architecture

The project is built on the ESP32-powered M5Paper V1.1, featuring a 4.7" 540x960 e-ink display and a GT911 capacitive touch panel. The firmware is developed using the Arduino framework within the PlatformIO ecosystem, utilizing FreeRTOS under the hood for task management.

Communication between the computer and the hardware is handled by a Python-based daemon (`claude_code_bridge.py`). This bridge supports dual transport modes:
- **USB Serial**: Default, zero-configuration mode for direct connection.
- **BLE (Bluetooth Low Energy)**: Utilizing the Nordic UART Service for a wireless experience, complete with macOS passkey pairing support.

The system utilizes LittleFS to store a substantial 3.4MB CJK (Chinese, Japanese, Korean) TrueType font, ensuring that the UI and AI responses can be rendered accurately in multiple languages. The project also includes a custom partition table to accommodate the large font file and the firmware within the M5Paper's 16MB flash memory.

## Intelligent Session Management

M5Paper Buddy isn't limited to a single project. Its multi-session dashboard displays all active Claude Code windows in a column, allowing users to switch focus with a simple touch. The right column provides a visual progress bar indicating context window usage—a critical metric when working with large codebases. This data is parsed in real-time from session transcripts, calculating input and output tokens against a configurable budget (defaulting to 200K tokens for standard Claude models).

## Personality and Feedback

To make the assistant feel more alive, the UI features an ASCII "cat" companion that changes its expression based on the system state. Whether the AI is idle, busy processing a request, waiting for attention, or celebrating a successful task, the cat provides immediate visual feedback. 

## Seamless Integration

The project is designed to be a first-class citizen of the Claude Code ecosystem. It includes a dedicated plugin that provides slash commands directly within the Claude terminal:
- `/buddy-install`: Automates the environment setup, including Python dependencies and PlatformIO configuration.
- `/buddy-start` / `/buddy-stop`: Manages the background daemon.
- `/buddy-flash`: Handles firmware and filesystem updates.

By combining specialized hardware with deep software hooks, M5Paper Buddy creates a more ergonomic and transparent environment for developers working with cutting-edge AI tools.
