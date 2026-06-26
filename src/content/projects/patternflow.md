---
title: PatternFlow
summary: PatternFlow is an open-source LED synthesizer built on the ESP32-S3 platform,
  designed to drive HUB75 RGB LED matrices with real-time, interactive visuals. The
  system features a modular C++ firmware architecture, four physical rotary encoders
  for tactile control, and a web-based ecosystem for pattern generation and audio-reactive
  synchronization.
slug: patternflow
codeUrl: https://github.com/engmung/PatternFlow
siteUrl: https://patternflow.work
version: v2.0.0
lastUpdated: '2026-06-25'
licenses:
- CC-BY-SA-4.0
image: /202606/PatternFlow_0.avif
rtos: ''
topics:
- creative-coding
- esp32
- generative-art
- hub75e
- led-matrix
- open-source-hardware
- react-three-fiber
- simulation
- threejs
- video-synthesizer
isShow: true
createdAt: '2026-06-25T23:50:52+00:00'
updatedAt: '2026-06-25T23:50:52+00:00'
relatedProjects:
- retro-video-synthesizer-esp32-pure-data
- pixlpal-m1-firmware
- led-controller-esp32-hub75e-led-matrix-controller
- esp32-32x32-rgb-matrix-controller
- svitrix-firmware
- rgblight-iot-rgb-led-controller
---

PatternFlow is an open-source LED synthesizer designed to be played with the fingertips. By turning four physical knobs, users can reshape light patterns generated through creative coding on an LED matrix in real time. Rather than treating light as a passive visual effect, the project aims to create a multisensory experience that connects directly to the motion of the hand.


### Participation and Open Creation

At its core, PatternFlow is inspired by Nam June Paik's *Participation TV*, which demonstrated that audiences could intervene in electronic imagery. This project takes that concept further into the modern technological landscape, moving the audience from mere operators to creators. Through publicly released hardware files, firmware, and 3D models, anyone can build their own device, generate custom patterns, and share them with a wider community.

### Interactive Patterns and the Live Editor

The system ships with a curated library of nearly 30 presets, accessible via a web-based Live Editor. This editor allows users to remix patterns in the browser before flashing them to the device. The hardware itself includes three reusable custom slots for user-created patterns, which can be cycled through by long-pressing the fourth encoder. The device typically boots into "Origin," a pattern featuring concentric sine waves sampled by an emergent grid.

![Close-up of the PatternFlow hardware interface with four control knobs](/202606/PatternFlow_1.avif)

### AI-Assisted Pattern Generation

One of the most unique aspects of PatternFlow is its integration with generative AI. The project provides prompt templates for AI coding assistants like Claude or ChatGPT. The workflow involves:
1. Copying a creation prompt from the Live Editor.
2. Describing a visual concept to an AI assistant to generate JavaScript code.
3. Testing the visuals in the web-based virtual preview.
4. Converting the finalized logic into C++ headers using a secondary prompt for inclusion in the firmware.

This approach removes the need for deep knowledge of GLSL or complex rendering pipelines, allowing creators to focus on the visual and interactive behavior of their patterns.

### Audio-Reactive Control

PatternFlow can react to audio over Wi-Fi using a specialized Chrome/Edge extension. This tool captures audio from a browser tab, performs an FFT analysis across four frequency bands, and sends the resulting values to the device via WebSockets. The firmware then translates these values into virtual encoder motions, enabling any pattern designed for knob control to become audio-reactive without requiring additional code.

### Hardware and Technical Architecture

The device is powered by a standalone ESP32-S3 microcontroller driving a HUB75 RGB LED matrix. The firmware is written in Arduino-compatible C++ and utilizes a modular architecture where each pattern exists as a self-contained module with its own setup, update, and draw routines. The framework manages shared tasks such as input handling, LED rendering, mode transitions, and color calibration.

![The first PatternFlow custom PCB fabricated for the ESP32-S3](/202606/PatternFlow_4.avif)

The hardware design includes a custom PCB and a 3D-printed enclosure, though modular paths exist for laser-cut acrylic or stainless steel variations. The project has evolved from initial experiments with potentiometers to a professional-grade PCB design supported by community contributors and manufacturing partners.

### Project Evolution

Since its inception in early 2026, PatternFlow has grown from a single pattern study into a collaborative open-source ecosystem. Following strong community interest on platforms like Reddit and Instagram, the project transitioned to an open-source model, releasing all firmware under the MIT license and hardware designs under CC-BY-SA 4.0. The roadmap includes continued pattern development, a Crowd Supply campaign, and further expansion of the community-driven pattern library.
