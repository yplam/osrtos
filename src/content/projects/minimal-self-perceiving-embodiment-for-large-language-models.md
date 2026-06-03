---
title: Minimal Self-Perceiving Embodiment for Large Language Models
summary: A reference implementation of a hardware embodiment system for LLMs using
  an ESP32 with environmental sensors and feedback actuators. It enables self-perception
  loops where the model can monitor its own haptic and audio outputs via an Arduino-based
  firmware and a TypeScript bridge service.
slug: minimal-self-perceiving-embodiment-for-large-language-models
codeUrl: https://github.com/oliviazzzu/minimal-embodiment
siteUrl: https://doi.org/10.5281/zenodo.19903098
version: v1.0-paper
lastUpdated: '2026-05-16'
licenses:
- MIT
rtos: freertos
topics:
- embodied-ai
- esp32
- hci
- human-ai-interaction
- large-language-models
- self-perception
isShow: false
createdAt: '2026-05-24T00:33:45+00:00'
updatedAt: '2026-05-24T00:33:45+00:00'
relatedProjects:
- stackchan-minimal
- diy-ai-voice-assistant-for-esp32-s3
- opentoys
- esp32-voice-assistant
- xiaoclaw-ai-voice-assistant-with-local-agent-brain
- echokit-firmware
---

Giving a Large Language Model (LLM) a physical presence is more than just connecting a chatbot to a motor. It involves creating a feedback system where the model can perceive the effects of its own actions. The **Minimal Embodiment** project provides a reference implementation for exactly this: a small, persistent body built around an ESP32 that allows an LLM to interact with and sense the physical world in real-time.

### The Physical Body: Sensors and Actuators

The hardware is designed to be compact yet sensory-rich. At its core is an ESP32 microcontroller managing a suite of I2C-based sensors and output channels. The system includes:

*   **Environmental Sensing:** A BME280 or BME680 for tracking temperature, humidity, and atmospheric pressure.
*   **Light Perception:** A BH1750 sensor for measuring ambient light levels.
*   **Motion and Orientation:** An MPU6050 6-axis accelerometer and gyroscope.
*   **Sound:** A microphone connected via the ESP32's I2S interface.

On the output side, the "body" features three primary channels for expression and feedback:

*   **Haptics:** A DRV2605 driver for precise tactile effects and vibrations.
*   **Visuals:** An SSD1306 OLED display used to render a digital "face" for the model.
*   **Audio:** A piezo buzzer driven by LEDC for generating melodies and tones.

### Self-Perception Loops

What makes this project unique is its focus on "self-perception loops." In a typical robotic setup, sensors detect the environment and actuators affect it. In this embodiment, the output channels are deliberately coupled back to the input channels. For instance, when the LLM triggers a haptic tap, the motion sensor detects the resulting vibration. When it plays a tone via the buzzer, the microphone hears the sound. 

This coupling allows the model to "feel" itself move and "hear" itself speak. This creates a rudimentary form of physical self-awareness, allowing the LLM to validate that its intended actions actually occurred in the physical world. The repository includes specific measurements and data from the paper to validate these loops, demonstrating how the ESP32 can report these "echoes" back to the central intelligence.

### System Architecture

The project is split into two main technical components:

1.  **Microcontroller Firmware:** Written in C++ for the Arduino framework, the firmware handles the real-time aspects of sensor polling and actuator control. It is responsible for reporting self-perception echoes and maintaining a stable connection to the bridge.
2.  **HTTP Bridge:** A single-file Node.js/TypeScript service. This acts as the intermediary between the LLM (which communicates via standard HTTPS) and the ESP32. The bridge is designed to be exceptionally lightweight, running on the Node.js standard library with no external production dependencies.

### Research and Validation

The repository is not just a hobbyist tool but a research artifact. It includes the original validation data used in the associated paper's self-perception measurements. Researchers can use the provided scripts to reproduce these experiments, running randomized trials of haptic and audio effects to measure system consistency and latency. 

For those looking to build their own, the project includes a comprehensive Build Guide and a detailed Bill of Materials. Because it uses standard ESP32 hardware and the widely supported Arduino ecosystem, it serves as an accessible entry point for developers interested in the intersection of embedded systems and embodied AI.
