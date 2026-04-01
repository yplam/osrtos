---
title: Noninvasive Glucometer
summary: An open-source hardware and software project dedicated to developing noninvasive
  blood glucose monitoring using near-infrared spectrometry. It features multiple
  sensor designs based on the Adafruit Feather M0 and RP2040 platforms, focusing on
  cost-effective and accurate physiological data collection.
slug: noninvasive-glucometer
codeUrl: https://github.com/knowthebird/NoninvasiveGlucometer
lastUpdated: '2024-11-17'
licenses:
- MIT
image: /202603/NoninvasiveGlucometer_0.avif
rtos: ''
topics:
- contest
- glucometer
- sensors
isShow: true
createdAt: '2026-03-31T23:42:06+00:00'
updatedAt: '2026-03-31T23:42:06+00:00'
---

Developing a reliable noninvasive method for monitoring blood glucose levels remains one of the most significant challenges in medical technology. The Noninvasive Glucometer project is an open-source initiative aimed at tackling this problem by providing a platform for designing, building, and testing sensor prototypes. By sharing these designs, the project hopes to reduce the pain, cost, and waste associated with traditional invasive glucometers.

### The Glucosan Design Philosophy

At the heart of the project are the "Glucosans"—a series of sensor designs that follow a specific set of principles. A Glucosan is intended to be a **G**lucometer that is **L**ightweight, **U**niversal, **C**ost-effective, **O**pen Source, **A**ccurate, and **N**oninvasive. 

The project currently details two primary iterations of these sensors:

*   **Glucosan 1**: A foundational design built on the Adafruit Feather M0 Adalogger. It utilizes IR Spectrometry with emitters at 617nm and 940nm, paired with silicon phototransistors for reflectance and transmittance detection. It features a 12-bit ADC and logs data to a CSV or binary file on an SD card.
*   **Glucosan 2**: An advanced iteration utilizing the Adafruit Feather RP2040 Adalogger. This version expands the optical spectrum significantly, using five different emitters ranging from 670nm to 1550nm. It upgrades the sensing hardware to include InGaAs photodiodes for better sensitivity in the infrared range and adds an Inertial Measurement Unit (IMU) to monitor movement and vibrations that might interfere with readings.

### Technical Implementation and Challenges

The sensors operate on the principle of Near-Infrared (NIR) Spectrometry. By passing specific wavelengths of light through or reflecting them off tissue (typically a finger), the device attempts to correlate the absorbed light with glucose concentration. 

The firmware is structured into modular components to handle the complexities of data acquisition. The `Development.ino` sketch serves as the primary firmware, coordinating custom internal libraries:
*   **ExampleSensor**: Manages the low-level hardware interaction with the IR emitters and detectors.
*   **GlucometerDisplay**: Handles user feedback via a 128x64 OLED screen.
*   **GlucometerLogger**: Manages the storage of measurement results to the onboard SD card.

Testing notes from the project highlight the extreme sensitivity required for this type of measurement. Factors such as finger placement within the clamp, ambient light, and physical movement can significantly overshadow the subtle signal changes caused by blood glucose. Recent iterations have focused on using IMUs to calculate the distance between emitters and sensors or to alert the user when the device is not stable enough for a valid reading.

### Data Collection and Analysis

The project emphasizes the importance of large datasets to train and test analysis algorithms. Early logs with Glucosan 1 identified potential hardware coupling issues and signal corruption that only became apparent after reviewing over 150 log entries across a wide range of glucose levels (76-447 mg/dl). This rigorous approach to documenting failures and signal artifacts is crucial for the community to refine the hardware and move toward a reliable, clinically relevant sensor design.
