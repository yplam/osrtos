---
title: Smart Lighting System using ESP32
summary: An automated lighting control system built for the ESP32 platform that optimizes
  energy consumption by managing lights based on human presence and ambient light
  levels. The system integrates PIR and LDR sensors with a potentiometer for manual
  sensitivity tuning, providing a practical solution for smart home and classroom
  automation.
slug: smart-lighting-system-using-esp32
codeUrl: https://github.com/hari2k7/smart-lighting-system
siteUrl: https://wokwi.com/projects/449938141065819137
lastUpdated: '2026-02-08'
image: /202604/smart-lighting-system_0.avif
rtos: ''
topics:
- automation
- embedded-systems
- esp32
- iot
- smart-lighting
- wokwi
isShow: true
createdAt: '2026-04-21T05:17:08+00:00'
updatedAt: '2026-04-21T05:17:08+00:00'
---

The Smart Lighting System project addresses the common challenge of energy waste in unoccupied or naturally well-lit spaces. By leveraging the ESP32 development board, this project creates an intelligent environment where lighting is treated as a dynamic resource rather than a static utility. It is designed to be energy-efficient, making it particularly suitable for settings like automated classrooms, smart homes, and office buildings where lights are frequently left on unnecessarily.

### Intelligent Sensor Integration

At the core of the system is a logic-driven approach to illumination. Rather than relying on simple timers, the system uses a combination of sensors to make informed decisions:

*   **PIR Motion Sensor**: Detects human presence within a room to ensure lights are only active when needed.
*   **LDR (Light Dependent Resistor)**: Measures the intensity of ambient light, preventing the system from turning on artificial lights when natural sunlight is sufficient.
*   **Potentiometer**: Provides a manual interface for users to adjust sensitivity and threshold values in real-time, allowing the system to be calibrated for different room sizes or lighting conditions without code changes.

When the PIR sensor detects motion and the LDR indicates that ambient light is below a specific threshold, the system triggers the LEDs (representing the room's lighting). If the room is bright enough or no motion is detected, the lights remain off, significantly reducing power consumption.

### Technical Implementation

The project is built using the standard Arduino core framework for ESP32. A notable aspect of the implementation is its simplicity; it relies on native GPIO handling and analog-to-digital conversion (ADC) rather than external third-party libraries. This makes the codebase lightweight and easy to audit for beginners and experienced developers alike. 

The system logic is contained within a single `sketch.ino` file, which manages the state machine for the lighting. It includes support for a manual override mode—essential for environments like classrooms where a teacher might need to force the lights off for a presentation—and a power-off state for overall system management.

### Simulation and Prototyping

For developers who may not have the physical hardware on hand, the project is fully documented and compatible with the Wokwi simulator. This allows for rapid prototyping and testing of the sensor logic in a virtual environment. The repository includes a `diagram.json` file that defines the circuit layout, ensuring that the transition from simulation to physical breadboarding is seamless. 

By combining motion detection with light sensitivity, this smart lighting system serves as a foundational IoT project that demonstrates how embedded systems can contribute to more sustainable and automated living spaces.
