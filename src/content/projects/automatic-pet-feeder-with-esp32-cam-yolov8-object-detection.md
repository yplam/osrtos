---
title: Automatic Pet Feeder With ESP32-CAM & Yolov8 Object Detection
summary: An IoT-based automatic pet feeder that utilizes an ESP32-CAM for live streaming
  and a servo motor for dispensing food. It features a Flask web interface for remote
  control and employs a YOLOv8 object detection model to automatically feed pets when
  they are recognized.
slug: automatic-pet-feeder-with-esp32-cam-yolov8-object-detection
codeUrl: https://github.com/PierceBrandies/PetFeeder
star: 21
lastUpdated: '2024-05-19'
rtos: freertos
libraries:
- sqlite
topics:
- cpp
- cs50
- esp32-cam
- flask
- yolov8
isShow: true
image: /202602/pet-feeder.webp
createdAt: '2026-03-01'
updatedAt: '2026-03-01'
---

## Overview

The Automatic Pet Feeder project is a sophisticated IoT solution that merges embedded systems, computer vision, and web technologies to automate pet care. Developed as a CS50 final project, it demonstrates a full-stack approach to hardware interaction, using an ESP32-CAM to bridge the gap between the physical world and intelligent software.

At its core, the system relies on an ESP32-CAM microcontroller. This compact board handles two primary tasks: capturing a live video stream of the feeding area and controlling a digital servo motor that operates the food dispensing mechanism. The firmware, developed using the Arduino framework, provides a robust foundation for handling WiFi connectivity and PWM signals for the servo.

## Intelligent Object Detection

The intelligence of the feeder is hosted on a Flask-based web application. This server-side component receives the camera stream and processes it using the YOLOv8 (You Only Look Once) object detection model. By leveraging the Ultralytics framework and OpenCV, the system can identify specific animals—such as dogs, cats, or birds—in real-time. 

When a pet is detected and the "auto-feed" mode is enabled, the application logic evaluates the detection data. If the criteria are met, it sends a network command back to the ESP32-CAM to trigger the feeding cycle. This allows for a truly hands-off approach to pet management, ensuring animals are fed when they approach the bowl.

## Features and User Interface

The project includes a comprehensive web dashboard that serves as the primary control point for the user. Through this interface, pet owners can interact with the device in several ways:

- **Live Monitoring**: View a real-time video feed from the ESP32-CAM to check on pets.
- **Manual Control**: Trigger a feeding session immediately with a manual override button.
- **Flash Toggle**: Remotely turn the ESP32-CAM's onboard LED on or off for better visibility at night.
- **Customizable Settings**: Adjust food portion sizes and set specific timers or intervals between automatic feeds to prevent overfeeding.

## Technical Architecture

The project architecture follows an edge-to-host design pattern. The ESP32-CAM acts as the edge device, performing hardware I/O and image capture. Because the YOLOv8 nano model and image processing require significant computational power, the heavy lifting is performed on a host machine running Python. 

Communication between the Python backend and the ESP32 is handled over the local network via HTTP. The ESP32-CAM hosts a small web server that listens for feeding commands and streams MJPEG data. This separation of concerns allows the system to maintain high-accuracy AI detection while keeping the embedded hardware requirements minimal.

## Hardware and Setup

The hardware setup is designed to be accessible, requiring only an ESP32-CAM, a digital servo motor, and a power source. For programming, the project utilizes an FTDI USB-to-serial converter or an ESP32-CAM-MB shield. The repository provides detailed wiring diagrams to assist with the assembly of the camera and servo circuit.

On the software side, the project uses an Anaconda environment to manage a variety of dependencies, including PyTorch for the AI model and Flask for the web frontend. The ESP32 code is provided as an Arduino sketch, making it easy to flash using the Arduino IDE.
