---
title: TNY-360 Quadruped Robot
summary: TNY-360 is an open-source, 12-DOF quadruped robot designed for research and
  interaction, powered by the ESP32-S3 microcontroller. It utilizes the ESP-IDF framework
  and FreeRTOS to manage complex tasks like inverse kinematics, computer vision via
  an OV2640 camera, and human-robot interaction. The project features a fully 3D-printable
  chassis and integrated sensors including Lidar, IMU, and I2S audio.
slug: tny-360-quadruped-robot
codeUrl: https://github.com/TNY-Robotics/TNY-360
siteUrl: https://tny-robotics.com/tny-360
version: v0.0.4
lastUpdated: '2026-03-13'
licenses:
- NOASSERTION
image: /202604/TNY-360_0.avif
rtos: freertos
libraries:
- littlefs
- nimble
topics:
- ai
- cpp
- embedded
- esp32
- quadruped
- robotics
isShow: true
createdAt: '2026-04-18T01:30:36+00:00'
updatedAt: '2026-04-18T01:30:36+00:00'
---

The TNY-360 is a sophisticated, open-source quadruped robot designed to bridge the gap between hobbyist robotics and advanced research platforms. Built around the powerful ESP32-S3 N16R8, this compact robot dog is engineered for high-performance motion, edge computing, and human-robot interaction (HRI). By combining a custom-designed 3D-printable chassis with a suite of advanced sensors, the TNY-360 provides a versatile foundation for exploring quadrupedal locomotion and artificial intelligence.

### Hardware Architecture and Motion Control

At the heart of the TNY-360's physical capabilities is a 12-degree-of-freedom (DOF) movement system. Unlike standard budget quadruped designs that rely on open-loop servo control, the TNY-360 utilizes modified MG996R servos. These actuators are enhanced with analog position feedback, allowing the firmware to read the actual position of the joints. This closed-loop approach is critical for implementing precise inverse kinematics and ensuring the robot can adapt to varying terrain or external forces.

The system is powered by a 3S LiPo battery (utilizing six Samsung INR18650-25R cells) and monitored by an INA219 sensor for real-time voltage and current tracking. A PCA9685 16-channel PWM driver manages the high-density actuator requirements, while the ESP32-S3 handles the high-level logic and communication.

### Sensing and Interaction

The TNY-360 is equipped with a comprehensive sensor suite that enables it to perceive its environment:

*   **Vision:** An OV2640 camera module provides a visual feed for object tracking and computer vision tasks.
*   **Depth Perception:** A VL53L0X Time-of-Flight (ToF) Lidar sensor measures distances to obstacles in front of the robot.
*   **Orientation:** An MPU6050 6-axis IMU provides real-time data on the robot's pitch, roll, and yaw, enabling active balancing and gait stabilization.

Beyond environmental sensing, the robot is designed for interaction. It features an "OLED face" (SH1106 128x64 display) to express status or emotions, and an I2S MEMS microphone and speaker for audio-based interaction. This makes the TNY-360 an ideal platform for developing social robotics applications.

### Firmware and Software Stack

The firmware is built using the ESP-IDF (Espressif IoT Development Framework) within the PlatformIO ecosystem. Leveraging FreeRTOS, the system manages multiple concurrent tasks, such as processing camera frames, calculating gait patterns, and maintaining network connectivity. 

The project makes extensive use of modern ESP32 features, including:
*   **LittleFS:** Used for robust on-board file storage of configuration data and web assets.
*   **NimBLE:** Provides a lightweight Bluetooth Low Energy stack for remote control and telemetry.
*   **WebSocket Support:** The firmware includes an HTTP server with WebSocket support, enabling low-latency communication with web-based dashboards or controllers.

### Development and Customization

One of the most compelling aspects of the TNY-360 is its accessibility. The chassis is 100% 3D-printable, with source files provided in FreeCAD format, allowing developers to modify the physical structure to suit their specific needs. The firmware is structured with custom components for various sensors and drivers, making it easy to extend the codebase or integrate new hardware. 

Whether you are interested in mastering the mathematics of quadrupedal gaits, experimenting with edge AI for computer vision, or building a unique interactive companion, the TNY-360 provides a complete, open-source roadmap to advanced robotics.
