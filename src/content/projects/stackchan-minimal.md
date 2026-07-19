---
title: StackChan Minimal
summary: An AI companion robot project for the M5Stack AtomS3R that connects an ESP32-based
  body to local AI services. It supports speech recognition, local LLM chat, and text-to-speech
  integration while providing a hardware interface for sensors and servos.
slug: stackchan-minimal
codeUrl: https://github.com/A-Uta/StackChan_Minimal
lastUpdated: '2026-05-27'
licenses:
- Apache-2.0
rtos: freertos
libraries:
- platformio-platformio-core
topics:
- atom-s3r
- esp32-s3
- llama-cpp
- local-llm
- m5stack
- openai-compatible
- piper-tts
- robot
- whisper-cpp
isShow: true
image: /202605/StackChan_Minimal.webp
createdAt: '2026-05-31T13:47:48+00:00'
updatedAt: '2026-05-31T13:47:48+00:00'
relatedProjects:
- opentoys
- voice-controlled-ground-and-aerial-robot
- diy-ai-voice-assistant-for-esp32-s3
- nebaura-labs-mote
- qbit
- multi-modal-ai-assistant-on-raspberry-pi-5
---

StackChan Minimal is a compact, open-source AI companion robot designed for the M5Stack AtomS3R platform. It serves as a physical interface for local AI services, allowing makers and developers to create interactive, "living" robots that can listen, think, and speak using state-of-the-art local models. By offloading heavy AI processing to external local servers, StackChan Minimal maintains a small footprint while offering sophisticated capabilities.

### Hardware and Architecture

The project is centered around the M5Stack AtomS3R, a powerful ESP32-S3 based controller. To handle audio, it typically utilizes the Atomic Voice Base or a compatible audio module. This setup allows the robot to capture voice input and playback synthesized speech. Under the hood, the firmware runs on the Arduino framework, leveraging the multitasking capabilities of FreeRTOS to manage simultaneous operations like sensor reading, display updates, and network communication. 

The project is managed using PlatformIO, which handles the complex dependency tree including hardware abstraction libraries and communication stacks. While the primary target is the AtomS3R, the codebase includes configurations for other M5Stack devices such as the Core2 and Fire, demonstrating the portability of the underlying architecture.

One of the standout hardware features is the integration of the MAX30100 heart-rate and SpO2 sensor. This allows the robot to act as a demonstration tool for physiological monitoring, reading reference values that can be processed or displayed on its screen. These values are intended for educational and demonstration purposes, showcasing how embedded systems can interact with human biometrics.

### Local AI Integration

Unlike many AI assistants that rely on cloud services, StackChan Minimal is built with a focus on local privacy and low-latency interaction. It connects to various local AI server tools through a standardized communication layer:

- **Speech-to-Text**: It utilizes whisper.cpp to convert spoken language into text locally on a host machine.
- **Large Language Models (LLM)**: The robot can communicate with local LLM servers via OpenAI-compatible APIs. This includes support for popular tools like llama.cpp, LM Studio, and Ollama, allowing the robot to have complex conversations without an internet connection.
- **Text-to-Speech (TTS)**: For its voice, the project integrates with piper-plus or VOICEVOX-compatible adapters, giving the robot a customizable personality and a wide range of vocal options.

### Software Features

The firmware includes a Wi-Fi configuration portal, making it easy to set up network credentials without hardcoding them into the source. It also utilizes the M5Stack-Avatar library, which provides the robot with a charming visual presence through animated faces on the AtomS3R's display. These faces can react to the robot's state, such as blinking or changing expressions when it is listening or speaking.

Data handling is managed via ArduinoJson, which parses the responses from the AI servers, while the ESP32WebServer library facilitates the initial device configuration. This combination of local processing and network-based intelligence creates a responsive and modular AI companion.

### Maker and Educational Use

StackChan Minimal is intended for demonstration, learning, and Maker activities. It provides a practical example of how to integrate multiple complex systems—embedded sensors, motor control (via optional servos), and distributed AI services—into a single cohesive project. Whether used as a desk companion or a platform for learning about ESP32 development and AI integration, it offers a robust starting point for exploring the intersection of robotics and artificial intelligence.
