---
title: 'OpenHRStrap: Open-Source ESP32 Heart Rate Tracker'
summary: OpenHRStrap is an open-source DIY chest-strap heart-rate tracker built around
  the ESP32 microcontroller. It utilizes the AD8232 ECG module to capture biosignals
  and implements the Pan–Tompkins algorithm for real-time R-peak detection. The device
  functions as a standard BLE heart rate sensor, allowing for seamless integration
  with fitness applications like Strava.
slug: openhrstrap-open-source-esp32-heart-rate-tracker
codeUrl: https://github.com/MilosRasic98/OpenHRStrap
siteUrl: https://community.element14.com/challenges-projects/element14-presents/project-videos/w/documents/71995/build-your-own-esp32-fitness-heart-rate-monitor-tracker----episode-692
star: 17
lastUpdated: '2025-11-30'
rtos: freertos
topics:
- arduino
- arduino-library
- biotech
- ecg
- ecg-analyzer
- ecg-classification
- ecg-data
- ecg-filtering
- ecg-qrs-detection
- ecg-signal
- ecg-signal-python
- ecg-signals
- esp32
- esp32-arduino
- fitness-tracker
- python
- running
- running-tracker
isShow: true
image: /202601/CroppedFinishedProject.webp
createdAt: '2026-01-18'
updatedAt: '2026-01-18'
relatedProjects:
- vitalmonitor-esp32-portable-vital-signs-monitor
- esphome-treadmill-ftms
- twatch-v3-firmware-for-esp32
- esp32-watch-for-openhaystack
- noninvasive-glucometer
- ov-watch
---

OpenHRStrap is an ambitious open-source project that brings professional-grade heart rate monitoring to the DIY community. Built around the powerful ESP32 platform, specifically the XIAO S3, this project demonstrates how to capture, process, and transmit electrocardiogram (ECG) data in a form factor compatible with standard chest straps. By bridging the gap between raw analog biosignals and digital fitness ecosystems, OpenHRStrap offers a transparent alternative to proprietary wearable technology.

### Hardware Architecture

The hardware design is intentionally DIY-friendly, utilizing commonly available modules to lower the barrier to entry. The system relies on the AD8232 Analogue Front End (AFE), a popular module for ECG measurement, to interface with the body. The microcontroller of choice is the ESP32 XIAO S3, selected for its compact size, processing power, and native Bluetooth Low Energy (BLE) support.

To ensure compatibility with existing fitness gear, the device is housed in a 3D-printed case made from PLA and TPU, designed to snap onto commercial chest straps. The electrical connection to the strap is achieved by soldering wires directly to steel push buttons, while a small 1S Li-ion cell and a boost converter provide the necessary power. This modular approach allows for easy repairs and modifications, a key advantage over sealed commercial units.

### The Pan-Tompkins Algorithm

A core component of OpenHRStrap is its implementation of the Pan-Tompkins algorithm, a gold standard in QRS detection first published in 1985. This algorithm is critical for identifying heartbeats (R-peaks) within a noisy ECG signal, especially during physical activity. The processing pipeline follows the original research paper's design:

1.  **Band-pass Filtering**: Isolates the QRS complex while reducing noise from muscle activity and power line interference.
2.  **Derivative Filter**: Highlights the steep slope of the R-peak to distinguish it from other ECG components like T-waves.
3.  **Squaring**: Amplifies the signal while ensuring all values are positive, further emphasizing the R-peak.
4.  **Moving Window Integration (MWI)**: Smooths the signal to provide a clear pulse for the peak detection logic.

The project includes Python implementations of these filters, allowing users to analyze pre-recorded data and visualize how each stage of the pipeline transforms the raw ECG signal into a detectable heartbeat. This makes the repository an excellent educational resource for those interested in biomedical signal processing.

### BLE Connectivity and App Integration

One of the standout features of OpenHRStrap is its firmware configuration, which allows it to be detected as an off-the-shelf BLE heart rate device. This standard-compliant approach means it is recognized by popular fitness tracking applications like Strava without requiring custom drivers or proprietary apps. Users can wear the strap during a run, and the ESP32 will transmit real-time heart rate data directly to their smartphone.

### Real-World Testing and Future Development

Real-world performance was evaluated by comparing the OpenHRStrap against a smartwatch PPG sensor during a 5K run. While PPG sensors are common in wearables, they often suffer from lag and inaccuracies during high-intensity movement. OpenHRStrap provides data derived directly from electrical heart activity, offering a different perspective on cardiovascular performance.

The project is currently evolving, with a V2 version in progress. Future updates aim to include a custom PCB with an upgraded AFE and dedicated data logging capabilities. This will allow for more rigorous troubleshooting and fine-tuning of the algorithm during high-motion activities, further narrowing the gap between DIY hardware and professional medical-grade monitors.
