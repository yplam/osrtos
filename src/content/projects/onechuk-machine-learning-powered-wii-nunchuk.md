---
title: 'onechuk: Machine Learning Powered Wii Nunchuk'
summary: A modified Nintendo Wii Nunchuk controller powered by an ESP32 running TensorFlow
  Lite for Microcontrollers. It enables gesture-based commands via the joystick, supporting
  multiple action profiles like BLE HID media controls and administrative functions.
slug: onechuk-machine-learning-powered-wii-nunchuk
codeUrl: https://github.com/karaulj/onechuk
star: 13
lastUpdated: '2021-07-07'
rtos: freertos
libraries:
- tensorflow-micro
topics:
- ble
- esp-idf
- esp32
- freertos
- mcu
- nunchuk
- rgb-led
- tensorflow-lite
- tensorflow-micro
- tinypico
- wii
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- gesture-detecting-macro-keyboard
- esp-usb-ble-hid-bridge
- airmouses3
- picogamepadconverter
- openhoop
- buttfinity
---

The onechuk project transforms a standard Nintendo Wii Nunchuk into a versatile, machine-learning-enhanced controller. By integrating an ESP32 (specifically the TinyPICO Nano) into the classic controller's shell, the project enables complex gesture recognition using TensorFlow Lite for Microcontrollers. This allows users to execute various commands—ranging from media playback to system administration—simply by "drawing" shapes with the analog joystick.

## Intelligent Gesture Recognition

At the heart of onechuk is a neural network trained to recognize joystick patterns. Users initiate a gesture by holding the "Z" button and moving the joystick. Once the button is released, the onboard ESP32 performs inference on the captured data. If the model identifies a gesture with high confidence, a corresponding action is triggered. The system supports a variety of pre-trained gestures including circles, flicks (up, down, left, right), and center clicks.

## Device Profiles and BLE HID

The project utilizes "device profiles" to map gestures to different sets of actions. These profiles are indicated by a single RGB LED:

- **BLE HID (Green):** In this mode, the onechuk acts as a Bluetooth Low Energy Human Interface Device. Gestures can control media playback (Pause/Play, Track navigation) and volume.
- **Admin (Red):** This profile provides system-level controls such as restarting the device, entering deep sleep, or checking BLE status and debugging sensor data.

Users can cycle through these profiles using the "C" button, allowing the same physical gesture to perform different tasks depending on the active context.

## Machine Learning Workflow

One of the most impressive aspects of the project is its integrated training pipeline. The repository includes Python scripts for collecting raw joystick data over UART and training a TFLite model. The workflow is designed to be seamless:

1. **Collection:** Use `collect_training_data.py` to record joystick movements.
2. **Training:** Run `train_model.py` to generate a standard TFLite model and convert it into a C header/source file using the `xxd` utility.
3. **Deployment:** The ESP-IDF build system is configured via CMake to automatically copy the latest model files into the project components during the compilation process.

## Hardware and Power Management

The physical build involves significant modification of the original Nunchuk. The interior support material is cleared to make room for a 400mAh LiPo battery, the TinyPICO Nano, and a custom 3D-printed micro USB port housing. 

To maximize battery life, the firmware includes aggressive power management. The device automatically enters deep sleep after 60 seconds of inactivity. A unique feature of the onechuk is its wake-up mechanism: users can wake the device from deep sleep simply by tapping the micro USB port, utilizing the ESP32's touch-sensing capabilities on the metal connector.

## Technical Foundation

Built on the ESP-IDF framework, the project leverages FreeRTOS for task management and timing. The high-performance requirements of reading the Nunchuk's I2C data and running inference are met by configuring the ESP32 to run at 240MHz. The project demonstrates a sophisticated blend of embedded systems programming, physical computing, and edge AI, providing a template for creating smart, gesture-aware peripherals.
