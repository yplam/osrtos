---
title: mBot2 and CyberPi Programming Examples
summary: A comprehensive collection of programming examples and projects for the mBot2
  robot and CyberPi control board. It provides support for both MicroPython and Arduino
  (PlatformIO) development, covering hardware features such as motion sensing, AI,
  networking, and motor control.
slug: mbot2-and-cyberpi-programming-examples
codeUrl: https://github.com/PerfecXX/mBot2
star: 19
lastUpdated: '2025-11-06'
rtos: ''
libraries:
- micropython
- platformio-platformio-core
topics:
- arduino
- cyberpi
- makeblock
- mbot2
- mbuild
- micropython
- platformio
- python
- robotics
isShow: true
image: /202602/cyberpi.webp
createdAt: '2026-03-01'
updatedAt: '2026-03-01'
---

The mBot2 repository is a dedicated resource for developers looking to extend the capabilities of the mBot2 robot and its CyberPi main control board. While these devices are often associated with the mBlock block-based coding environment, this project provides the necessary tools and examples to transition into text-based programming using MicroPython and Arduino (C++).

### Dual-Platform Support

The project caters to two primary development workflows, each with its own set of advantages and trade-offs:

*   **MicroPython**: This is the recommended path for most users as it provides full API support for all CyberPi features. A significant advantage of using MicroPython is that it does not overwrite the factory firmware (CyberPiOS), preserving compatibility with built-in features and accessories.
*   **Arduino (PlatformIO)**: For developers seeking lower-level control or those preferred to work within the VS Code ecosystem, the repository includes a PlatformIO-compatible Arduino setup. Users should be aware that flashing Arduino code will overwrite the CyberPiOS, making the original operating system inaccessible until the firmware is restored.

### Hardware Capabilities and Examples

The repository is organized into several categories covering the full spectrum of the mBot2 ecosystem. The examples serve as building blocks for more complex robotic applications:

*   **CyberPi Core**: This includes examples for the onboard hardware, such as the RGB LEDs, high-resolution display, audio output, and motion sensors. It also covers essential connectivity features including Wi-Fi, Local Area Network (LAN), and IoT Cloud integration.
*   **mBot2 Shield**: This section provides specific code for controlling the chassis motors and utilizing the extension ports on the robot's base, which are critical for mobility and physical interaction.
*   **mBuild Modules**: The repository supports a wide array of external modules, including the Ultrasonic Sensor 2, Quad RGB Sensor, Science Sensors, and the Smart Camera for vision-based tasks.
*   **Advanced Integration**: Beyond basic hardware control, the project includes examples for complex tasks like AI-based recognition, MQTT communication for IoT projects, and upload-mode broadcasting for inter-device communication.

### Project Structure and Tools

Beyond simple hardware tests, the repository includes a `project` directory containing integrated examples that demonstrate how to combine multiple sensors and actuators into functional robotic applications. These larger-scale projects serve as practical templates for students and hobbyists.

Additionally, a `tools` section provides utility scripts and debugging aids essential for firmware management and advanced development tasks outside the standard mBlock environment. This makes the repository a complete toolkit for anyone looking to master the mBot2 platform through professional-grade coding practices.
