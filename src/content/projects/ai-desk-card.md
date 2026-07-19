---
title: AI Desk Card
summary: A secondary e-ink desk display designed for AI Agents like Claude Code and
  Codex, utilizing the M5Paper V1.1 hardware. The project features a Python-based
  daemon for server-side rendering and an ESP32 firmware that supports Wi-Fi, BLE,
  and USB communication.
slug: ai-desk-card
codeUrl: https://github.com/op7418/ai-desk-card
siteUrl: https://github.com/op7418/ai-desk-card
version: v0.10.1
lastUpdated: '2026-05-22'
licenses:
- NOASSERTION
rtos: freertos
libraries:
- littlefs
- lwip
- nimble
- platformio-platformio-core
topics:
- ai-agent
- ai-skill
- ambient-display
- claude-code
- codex
- dashboard
- desk-card
- e-ink
- esp32
- glanceable-display
- m5paper
- secondary-display
- skill
- skills
isShow: true
image: /202607/ai-desk-card.webp
createdAt: '2026-07-02T08:30:26+00:00'
updatedAt: '2026-07-02T08:30:26+00:00'
relatedProjects:
- m5paper-buddy
- clawdmeter
- deskpet-for-m5stack-cardputer
- agentdeck
- deskpet
- codelight
---

The AI Desk Card is an innovative project that bridges the gap between digital AI agents and physical ambient displays. Designed specifically for the M5Paper V1.1—a 4.7-inch e-ink device—it serves as a dedicated "Skill" for agents like Claude Code, Codex, and Cursor. Instead of forcing users to manage firmware updates or manual configuration, the project leverages the power of AI agents to handle the entire lifecycle, from compiling code via PlatformIO to configuring Wi-Fi credentials.

### Architecture and Rendering

At its core, the system uses a server-side rendering architecture. A Python-based daemon runs on the host machine, utilizing the Pillow library to render pixel-perfect frames for various widgets. This approach keeps the ESP32 firmware lightweight, as it only needs to receive and display image data via HTTP, USB, or BLE. This decoupling allows for rapid development of new widgets—such as weather, calendars, PR queues, and system monitors—without needing to modify the C++ firmware. 

The firmware itself is built on the Arduino framework for ESP32, utilizing FreeRTOS for task management. It relies on the LittleFS filesystem to store essential assets, including CJK fonts for proper international character rendering. Communication is handled through a local LAN connection (LWIP) or a specialized BLE standby mode.

### Advanced Power Management

One of the standout features is its sophisticated power management, categorized into three distinct modes:

- **Mode A (Always-on)**: USB-C powered with continuous Wi-Fi connectivity for ultra-low latency updates (0.2s).
- **Mode B (USB Only)**: Standard wired data transmission, useful for initial setup before Wi-Fi is configured.
- **Mode C (Battery + BLE Standby)**: The most efficient mode, where the Wi-Fi is powered down and the device waits for a BLE wake-up signal from the daemon. This leverages the inherent strengths of e-ink technology, providing up to six months of battery life while maintaining a persistent ambient presence on the desk.

### AI Agent Integration

The integration with AI agents is seamless. By adding the repository as a skill, users can interact with their desk card using natural language. Commands like "Show the weather in Beijing" or "Put my schedule on the card" trigger automated workflows that handle data fetching, rendering, and transmission. The project includes 16 built-in widgets, covering everything from Git status and PR queues to focus timers and "now playing" information. 

The display uses a flexible 2-1-1 layout, allowing for multiple slots (top-left, top-right, middle, and bottom) to be populated with different data sources. This turns a piece of hardware into a dynamic extension of the developer's workspace, providing glanceable information without the distraction of a traditional backlit monitor.
