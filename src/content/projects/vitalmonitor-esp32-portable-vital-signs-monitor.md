---
title: 'VitalMonitor: ESP32 Portable Vital-Signs Monitor'
summary: A portable biomedical monitor built on ESP32 and FreeRTOS that tracks ECG,
  SpO2, temperature, and respiration. It features a validated QRS detection algorithm,
  local OLED visualization, and a real-time web dashboard for remote patient monitoring.
slug: vitalmonitor-esp32-portable-vital-signs-monitor
codeUrl: https://github.com/Cristi200134/vital-signs-monitor
lastUpdated: '2026-07-01'
licenses:
- MIT
rtos: freertos
libraries:
- lwip
topics:
- ecg-qrs-detection
- embedded-systems
- esp32
- iot-device
- medical-devices
- pulse-oximetry
- signal-processing
isShow: false
createdAt: '2026-07-08T00:10:37+00:00'
updatedAt: '2026-07-08T00:10:37+00:00'
relatedProjects:
- openhrstrap-open-source-esp32-heart-rate-tracker
- espmonitor-iot-environment-monitoring-system
- bbmonitor
- air-quality-monitor
- smart-medibox
- esp32-remote-for-victron
---

VitalMonitor is a portable, four-parameter vital signs monitor designed to bridge the gap between accessible hobbyist electronics and clinical monitoring requirements. Developed as a biomedical engineering project at UMFST "G.E. Palade" Targu Mures, this device serves as a functional proof-of-concept for monitoring heart rate, blood oxygen saturation (SpO2), body temperature, and respiratory rate on a single integrated platform.

### Multi-Parameter Sensing

The system integrates several specialized sensors to provide a comprehensive view of a patient's physiological state:

*   **ECG (Electrocardiogram):** Utilizing an AD8232 instrumentation amplifier paired with an external 16-bit ADS1115 ADC. The signal is processed at 250 samples per second (SPS) and passed through a sophisticated Butterworth filter cascade, including a 0.5 Hz high-pass, 40 Hz low-pass, and a 50 Hz notch filter to eliminate power line interference.
*   **SpO2 and Pulse:** A MAX30102 optical sensor provides pulse oximetry data using the ratio-of-ratios method.
*   **Respiration:** In a clever use of existing hardware, the respiratory rate is derived from the infrared DC modulation of the optical pulse signal, eliminating the need for additional chest straps or thermistors.
*   **Temperature:** Clinical-grade body temperature is tracked using the widely supported DS18B20 sensor.

### Architecture and FreeRTOS Integration

At the heart of VitalMonitor is an ESP32 microcontroller running the FreeRTOS operating system. To ensure clinical priority and prevent data loss, the firmware is organized into eight distinct tasks pinned across both of the ESP32’s cores. This architecture allows the device to handle high-frequency ECG sampling and complex signal processing on one core while simultaneously managing the user interface and web server on the other.

Data integrity is managed via mutexes for shared resources like the I2C bus, which operates at 400 kHz. The ADS1115 is configured in continuous mode, ensuring that the 250 SPS ECG stream remains uninterrupted even when the system is querying other sensors or updating the display.

### Validated QRS Detection

One of the most significant technical achievements of the project is its QRS detection algorithm. Based on a simplified Pan-Tompkins architecture, the algorithm utilizes a 5-point derivative, squaring, and a 148 ms moving-window integration. It employs an adaptive threshold (SPKI/NPKI) and a 200 ms refractory period to accurately identify heartbeats even in noisy signals.

This implementation was rigorously validated against the MIT-BIH Arrhythmia Database, following the ANSI/AAMI EC57 standard. Testing across approximately 70,000 annotated beats from 30 records yielded a Sensitivity (Se) of 98.66% and a Positive Predictivity (+P) of 99.11%, resulting in an overall F1 score of 98.9%.

### User Interface and Connectivity

VitalMonitor provides two primary ways to interact with the data. For bedside use, a 128x64 OLED display provides real-time waveforms and numeric values. For remote monitoring, the device acts as a WiFi access point, hosting an asynchronous web server that provides a real-time web interface. This allows clinicians or caregivers to view vital signs from any browser-enabled device without requiring external internet infrastructure.

Safety is addressed through a three-level alarm system using both visual (LED) and audible (buzzer) cues. Furthermore, the device includes a microSD card slot for session logging, synchronized by a DS3231 real-time clock, which is essential for retrospective analysis of patient data.

### Hardware Implementation

The project is fully documented with a complete engineering pack. The enclosure combines a plywood body with 3D-printed PLA panels, housing an 1800 mAh LiPo battery. To maintain signal purity in the analog section, the power delivery system includes a separate AMS1117 3.3V rail specifically for the instrumentation components, isolated from the digital noise of the ESP32 and the display.
