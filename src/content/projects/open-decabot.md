---
title: Open Decabot
summary: An accessible, 3D-printed robotics platform powered by the ESP8266-based
  Wemos D1 Mini. It features Wi-Fi and ESP-NOW connectivity for remote control, uses
  continuous rotation servos for locomotion, and integrates LED matrix displays for
  visual feedback and sensor data visualization.
slug: open-decabot
codeUrl: https://github.com/triwaca/openDecabot
siteUrl: http://www.decabot.com
lastUpdated: '2026-06-29'
licenses:
- NOASSERTION
image: /202607/openDecabot_0.avif
rtos: ''
topics:
- 3dprinted
- esp8266
- robot
- robotics
isShow: true
createdAt: '2026-07-19T07:16:00+00:00'
updatedAt: '2026-07-19T07:16:00+00:00'
---

Open Decabot is an open-source robotics project designed to lower the barrier to entry for building and programming mobile robots. Developed with a focus on simplicity and modularity, the platform utilizes the popular Wemos D1 Mini form factor, leveraging the ESP8266 microcontroller's native Wi-Fi capabilities to create an Internet of Things (IoT) ready educational tool.

## Hardware Architecture and Design

The core of the Open Decabot is the ESP8266, specifically the Wemos D1 Mini. This choice allows users to take advantage of the extensive ecosystem of Wemos shields. In its standard configuration, the robot utilizes a LED matrix shield for visual expression and a custom connection shield (or the dedicated Decabot Mini Shield) to interface with peripherals.

One of the most efficient design choices in the Open Decabot is the use of two 360-degree continuous rotation servo motors for the drive system. Unlike standard DC motors which require external H-bridge motor drivers, these servos contain their own internal driving circuitry. This allows them to be connected directly to the ESP8266's GPIO pins, significantly simplifying the wiring and reducing the bill of materials (BOM).

The robot's physical structure is designed for accessibility, consisting of eight 3D-printable parts that can be assembled with standard screws. The chassis even includes a dedicated hatch for easy access to the USB port, facilitating quick firmware updates without dismantling the entire unit. Power is typically provided by four AA batteries, though the design is flexible enough to be hacked for Li-Ion support using a Wemos battery shield.

## Wireless Control and Communication

Open Decabot supports multiple communication protocols to suit different use cases:

*   **Web-Based Control**: By hosting a captive portal and an asynchronous web server (using the `ESPAsyncWebServer` library), the robot can be controlled directly from a smartphone or computer browser. This setup provides a touch-based joystick interface for steering and triggering animations.
*   **ESP-NOW**: For low-latency remote control, the project implements ESP-NOW, a connectionless communication protocol developed by Espressif. This allows a dedicated transmitter (like a joystick-equipped ESP32) to send movement and action commands to the robot with minimal overhead.

## Sensing and Visual Feedback

Beyond basic movement, the Open Decabot is equipped for more complex tasks such as navigation and telemetry. The repository includes firmware for integrating a QMC5883L magnetometer, effectively turning the robot into a digital compass. To handle the inherent noise of magnetic sensors, the project utilizes a Kalman filter to smooth azimuth readings, ensuring stable heading data.

The Wemos LED Matrix shield serves as the robot's "face." The software includes routines for animated, blinking eyes and can map sensor data—such as magnetic orientation—directly onto the matrix for real-time visual feedback.

## Software and Extensibility

The project is built within the Arduino IDE ecosystem, making it easy for beginners to modify and upload code. The firmware is modular, with separate sketches provided for different functionalities:

*   `decabot_webControler`: The primary web-based remote control interface.
*   `espNOW_openDecabot`: A receiver-side implementation for low-latency wireless control.
*   `azimuthComFiltro`: A demonstration of filtered sensor fusion for navigation.
*   `magnet_openDecabot`: A visualization tool for magnetic fields.

The project encourages community modification, from basic code tweaks to hardware hacks like adding line-following sensors, gyroscopes, or OLED displays via the I2C bus available on the custom shield.
