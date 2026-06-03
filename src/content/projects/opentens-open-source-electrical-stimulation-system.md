---
title: 'openTENS: Open-Source Electrical Stimulation System'
summary: An open-source, programmable electrical stimulation platform designed for
  research and wearable applications. It features a bipolar H-Bridge output, integrated
  GSR sensing for closed-loop control, and hardware-level safety mechanisms. The project
  provides both PCB designs and a software SDK to support rapid prototyping of TENS
  and EMS devices.
slug: opentens-open-source-electrical-stimulation-system
codeUrl: https://github.com/0ingchun/openTENS
star: 12
lastUpdated: '2025-12-22'
rtos: ''
topics:
- arduino
- ems
- medical
- medical-application
- research
- research-tool
isShow: true
image: /202601/AC_TENS_version2_3D.webp
createdAt: '2026-01-31'
updatedAt: '2026-01-31'
relatedProjects:
- tinycore-esp32-s3-learning-platform
- noninvasive-glucometer
- openhoop
- nrf52840-m-2-developer-kit
- openhrstrap-open-source-esp32-heart-rate-tracker
- sw32-4-channel-e-stim
---

## Overview

openTENS is a programmable, safe, and flexible electrical stimulation platform designed specifically for researchers, designers, and developers. While commercial Transcutaneous Electrical Nerve Stimulation (TENS) and Electronic Muscle Stimulation (EMS) devices are often closed systems that prevent users from modifying waveforms or implementing closed-loop control, openTENS provides a fully open-source alternative. 

The project aims to become the "Arduino Platform" for electrical stimulation, offering a standardized hardware interface that can be easily integrated with various sensors like GSR (Galvanic Skin Response), EMG (Electromyography), and IMUs (Inertial Measurement Units). This makes it an ideal tool for exploring emotion regulation, rehabilitation systems, and affective computing.

## Hardware Architecture

The core of the openTENS hardware is designed around a bipolar output H-Bridge circuit. This allows for sophisticated waveform generation beyond the simple pulses found in consumer-grade devices. Key hardware features include:

- **Programmable Bipolar Output**: Utilizing an H-Bridge for flexible stimulation patterns.
- **Safety Mechanisms**: Built-in hardware current limiting and electrical isolation to protect the user.
- **Integrated GSR Sensing**: Real-time feedback for closed-loop control systems, allowing the stimulation to react to the user's physiological state.
- **Multimodal Support**: Designed to work with conductive textile electrodes and various sensor modules.

The repository includes complete schematic and PCB designs, allowing developers to modify the hardware to suit specific research needs or form factors.

## Software SDK and Programmability

To complement the hardware, openTENS includes a software SDK and driver libraries. This software layer abstracts the complexity of the H-Bridge control and GSR data acquisition, providing a programmable interface for developers. By using the SDK, researchers can implement custom stimulation protocols, such as varying frequencies, pulse widths, and duty cycles, or develop algorithms that adjust stimulation based on real-time sensor data.

## Research and Applications

Initiated by researchers at Xi’an Jiaotong-Liverpool University (XJTLU), openTENS is rooted in academic exploration. It was inspired by research into H-Bridge bipolar stimulation with real-time feedback. Potential applications for the platform include:

- **Affective Computing**: Using electrical stimulation for emotion regulation experiments.
- **Rehabilitation**: Developing wearable systems that use textile electrodes for physical therapy.
- **Human-Computer Interaction (HCI)**: Creating haptic feedback systems or new forms of interactive wearable technology.

## Safety and Compliance

Because electrical stimulation involves direct contact with the human body, openTENS emphasizes safety. The project includes a comprehensive safety notice and disclaimer. It is important to note that openTENS is intended for research and educational purposes only and is not a certified medical device. The documentation provides recommended operating limits, such as keeping output current below 10 mA RMS and output voltage within ±50 V, to ensure a safe prototyping environment.
