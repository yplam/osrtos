---
title: Bruxism Detector
summary: An Arduino-based biofeedback device for detecting and monitoring bruxism
  (jaw clenching) using EMG sensors. It features a Machine Learning-based detection
  system using a Support Vector Machine (SVM) algorithm and provides real-time alerts
  through an Arduino Uno R4 WiFi and a companion Android application.
slug: bruxism-detector
codeUrl: https://github.com/LollosoSi/bruxism-detector
siteUrl: https://www.instructables.com/Anti-Bruxism-Device-arduino-Based/
star: 29
version: v1.3.9
lastUpdated: '2026-01-08'
rtos: cmsis
topics:
- arduino
- arduino-uno-r4-wifi
- biofeedback
- bruxism
- conditioning
- electrodes
- emg
- grinding
- machine-learning
- oral-health
- sleep-tracker
isShow: false
createdAt: '2026-01-17'
updatedAt: '2026-01-17'
relatedProjects:
- snoresense-ai-powered-snore-detection-on-seeed-xiao-mg24-sense
- pulse-real-time-vibration-anomaly-detection
- smart-sign-language-glove-translator
- conveyor-belt-fault-detection-system
- pulse
- battery-health-monitor
---

## Overview

The Bruxism Detector is a sophisticated embedded system designed to help users monitor and mitigate jaw muscle activity, commonly known as bruxism. By combining electromyography (EMG) sensing with real-time machine learning, the device identifies clenching events and provides immediate biofeedback. This feedback serves two purposes: conditioning the user to relax their jaw during the day and waking them up if clenching occurs during sleep.

## How It Works

The system relies on an Arduino Uno R4 WiFi paired with an EMG shield to capture signals from the masticatory muscles, specifically the temporalis. Three electrodes placed on the forehead detect electrical activity, which is then processed through a Fast Fourier Transform (FFT). 

Detection is handled by a Support Vector Machine (SVM) algorithm. Because every user's muscle signals are unique, the project includes a training pipeline. Users record clenching and non-clenching states, which are then processed by a Python or Java utility to generate specific weights and bias values. These parameters are compiled directly into the Arduino firmware, allowing for efficient, on-device classification without the need for a persistent cloud connection.

## Biofeedback and Conditioning

The device employs classical conditioning techniques to help users manage their bruxism. When the SVM detects a clenching event, the system responds in stages:

- **Warning Beeps**: A series of soft tones intended to signal the user to relax their jaw without fully waking them.
- **Alarms**: If clenching persists, the device triggers a louder melody or a smartphone vibration (via the Android app) to wake the user.
- **Daytime Training**: An experimental Android feature plays the warning beep at random intervals during the day, prompting the user to consciously relax their jaw and build better habits.

## Technical Implementation

The firmware is built for the Arduino Uno R4 WiFi, leveraging the ARM-specific CMSIS-DSP library for high-performance signal processing. The system uses a modular architecture where detection settings, such as filtering delays and beep counts, are easily configurable in a dedicated settings header file.

```cpp
// Example of SVM weights generated during training
static const float weights[] = { 0.00000000, ... , 0.00517570 };
static const float bias = -0.2237529517562951;
```

Data logging is a core component of the project. The device can stream events via UDP to a Processing-based logger or an Android application. These logs include clenching events, button presses, and alarm triggers, which can later be visualized using a Java-based graphing utility to identify triggers or correlate data with sleep trackers.

## Hardware Requirements

Building the detector requires several specific components:
- **Arduino Uno R4 WiFi**: The core microcontroller.
- **OLIMEX-EKG-EMG-SHIELD**: For reading muscle signals.
- **EMG Electrodes**: Placed on the temples and center of the forehead.
- **Passive Buzzer and Push Button**: For user interaction and audible feedback.
- **3D Printed Enclosure**: A modular design is available to house the electronics and battery safely.

## Safety and Usage

As this is an experimental device involving electrodes connected to the body, safety is paramount. The project emphasizes that the device should never be connected to mains power while in use. It must run exclusively on battery power to eliminate the risk of electrocution. The system is intended for educational and research purposes, providing a platform for users to explore biofeedback and machine learning in a personal health context.
