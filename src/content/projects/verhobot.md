---
title: VerhoBot
summary: VerhoBot is an open-source smart curtain robot based on the ESP32-C3 platform,
  designed to automate curtain movement for improved sleep cycles. It utilizes a TB6612FNG
  motor driver and N20 geared DC motor to provide quiet, battery-powered operation
  with integrated WiFi scheduling and a web-based management dashboard.
slug: verhobot
codeUrl: https://github.com/migit/verhoBot
siteUrl: https://myworks.gt.tc/verhobot
version: v1.2.1-stable
lastUpdated: '2026-07-07'
image: /202607/verhoBot_2.avif
rtos: freertos
topics:
- cad
- compact
- curtain-bot
- esp32
- esp32-c3
- firmware-development
- home-automation
- iot-device
- n20-motors
- pcb
- polar-day
- product-development
- robot
- robots
- scheduled-tasks
- tb6612fng
- tiny-bot
- web-flasher
- webdashboard
- wifi
isShow: true
createdAt: '2026-07-19T00:29:54+00:00'
updatedAt: '2026-07-19T00:29:54+00:00'
relatedProjects:
- cuybot-v1-opensource-smartcar-project
- smart-medibox
- qbit
- esp32-mqtt-motor-control
- sesame-robot-micro
- scara-drawing-robot
---

## The Tiny Bot for Natural Mornings

VerhoBot was created to solve a specific challenge common in regions with extreme daylight variations, such as the Finnish summer. While blackout curtains are essential for sleeping through bright nights, they often block the natural morning sunlight that helps regulate the body's wake-up cycle. VerhoBot bridges this gap by providing a compact, rail-mounted robotic platform that automatically opens curtains at a scheduled time, allowing users to wake up to natural light without the jar of a traditional alarm.

Designed as a fully open-source project, VerhoBot is more than just a consumer gadget; it is a platform for makers and engineers to explore embedded systems, mechanical design, and IoT integration. It offers complete ownership of hardware and software, ensuring no vendor lock-in and high repairability.

## Core Capabilities and Features

The project currently delivers a stable set of features focused on reliable curtain automation:
- **Automated Movement**: Precise control for opening and closing curtains.
- **Battery-Powered Efficiency**: Designed for long-term operation using low-power sleep modes.
- **ESP32-C3 Control**: Leverages the Supermini form factor for a compact footprint.
- **Web Dashboard**: A local configuration interface for WiFi setup, scheduling, and manual overrides.
- **OTA Updates**: Over-the-air firmware updates are supported to simplify maintenance once the bot is mounted.

Future iterations aim to expand these capabilities with Home Assistant integration, environmental sensors, and advanced obstacle detection.

## Hardware and Electronics

The system architecture is built around affordable and widely available components. The brain of the device is an ESP32-C3 Supermini, which handles both the motor logic and the web server. For movement, the project utilizes an N20 Geared DC Motor (ideally 100 RPM at 6V) driven by a TB6612FNG motor driver, chosen for its efficiency and small size.

![VehoBot-schematic](/202607/verhoBot_3.avif)

Power is provided by a 3.7V 300mAh Li-Ion battery, rechargeable via a standard USB-C interface. While initial designs considered various sensors, current position tracking is handled via timing-based calibration in the firmware, allowing the bot to determine "fully open" and "fully closed" states based on travel duration.

## Mechanical Design

VerhoBot features a modular internal architecture housed in a 3D-printable enclosure. The design is optimized for rail-mounted operation, ensuring compatibility with most existing curtain setups. The enclosure is built specifically around the custom PCB design to maintain a compact form factor.

![vbot1](/202607/verhoBot_4.avif)

The assembly involves a mix of 3D-printed parts and standard mechanical hardware, making it accessible for hobbyists with a basic 3D printer and soldering iron.

![VerhoBot_parts](/202607/verhoBot_5.avif)

## Software Operation and Logic

The firmware is designed to be user-friendly from the first boot. When unconfigured, the device broadcasts a "VerhoBot-Setup" Access Point. Users can connect to this network to access a dashboard at `192.168.4.1`, where they can configure home WiFi credentials and operation schedules.

In normal operation, the bot follows a strict power-management routine:
1. **Connect and Sync**: Joins the home network to synchronize time.
2. **Deep Sleep**: Enters a low-power state to conserve battery.
3. **Scheduled Wake**: At the designated time, the bot wakes up, moves the curtain, and remains awake for 60 seconds to allow for manual dashboard control before returning to sleep.
4. **Manual Override**: A physical button wake-up allows users to toggle the curtain position instantly.

## Lessons from Development

Developing VerhoBot provided several insights into battery-powered IoT design. Implementing OTA (Over-the-Air) updates early in the process proved vital, as it eliminated the need to constantly plug and unplug the device during firmware tuning. The team also discovered that the ESP32-C3 Supermini required specific GPIO configuration for deep-sleep wake-up, leading to a hardware revision using GPIO1 for the wake button.

Despite using a relatively small 300mAh battery, the bot has demonstrated a runtime of over six days in testing, thanks to aggressive deep-sleep cycles. Future hardware revisions may involve desoldering onboard LEDs to further extend battery life.

## Open Source Commitment

VerhoBot is officially certified as Open Source Hardware by the Open Source Hardware Association (OSHWA) under UID **FI000004**. This certification ensures that all design files, firmware, and documentation are publicly available and comply with open-source definitions, fostering a community-driven approach to smart home automation.
