---
title: '2019 Electronic Design Competition: Paper Counting Display Device'
summary: A high-precision paper counting system developed for the 2019 Chinese Undergraduate
  Electronics Design Contest. It utilizes an STM32F407 microcontroller running the
  RT-Thread RTOS and an FDC2214 capacitive sensor to detect paper quantity with 100%
  accuracy up to 50 sheets.
codeUrl: https://github.com/zengwangfa/2019-Electronic-Design-Competition
isShow: false
rtos: rt-thread
libraries: []
topics:
- electronic-design-competition
- rt-thread
- fdc2214
- data-processing
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- elevourer-portable-intelligent-electronic-load
- stm32l476g-discovery-rtos-sensor-project
- wute-dashboard-for-formula-student-electric
- power-pico
- noninvasive-glucometer
- ch32v003-usb-meter
---

The 2019 Chinese Undergraduate Electronics Design Contest (NUEDC) presented a unique challenge in Problem F: creating a device capable of accurately counting sheets of paper using non-contact methods. This repository showcases a highly successful implementation of a Paper Counting Display Device, which achieved a 100% accuracy rate for counts up to 50 sheets.

### System Architecture and Hardware
At the heart of the system is the **STM32F407ZGT6**, a powerful Cortex-M4 microcontroller running at 168MHz. The project leverages the **RT-Thread** real-time operating system to manage concurrent tasks efficiently. The primary sensing component is the **FDC2214**, a high-resolution (28-bit) capacitance-to-digital converter known for its electromagnetic interference (EMI) resistance. 

The hardware setup involves two copper plates acting as a capacitor, with the paper sheets serving as the dielectric material. As the number of sheets changes, the capacitance varies, and the FDC2214 captures these minute fluctuations. The core controller board is feature-rich, integrating peripherals such as an OLED display, a USART HMI touch screen, a voice module for status broadcasting, and various communication interfaces like Zigbee and WiFi.

### Advanced Signal Processing
Counting paper sheets accurately is difficult due to environmental noise and the non-linear relationship between paper quantity and capacitance. To solve this, the project employs several sophisticated software techniques:

1.  **Kalman Filtering**: Raw data from the FDC2214 is processed through a Kalman filter to suppress noise and stabilize readings.
2.  **Fuzzy Logic Control**: The system uses the Maximum Membership principle to determine the domain of capacitance values and paper counts. By establishing fuzzy rules and a control table, the device can classify real-time data into the most likely sheet-count interval.
3.  **Calibration Mode**: A dedicated calibration routine allows the device to adapt to different paper types and environmental conditions by fitting a curve to the collected samples.

### Software Design and Threading
The software is organized into three primary functional layers within the RT-Thread environment:
- **Simple Device Thread**: Manages basic I/O like LEDs, the buzzer, and Flash storage.
- **Main Measurement Thread**: Handles the heavy lifting, including HMI interaction, FDC2214 data acquisition/conversion, and voice module communication.
- **System Monitoring**: A dedicated Watchdog thread ensures system reliability and recovery in case of software hangs.

### Performance and Mechanical Design
The project includes detailed mechanical designs, featuring a fixed hinge structure to maintain consistent pressure and distance between the copper plates, which is critical for capacitive sensing accuracy. Testing data included in the repository shows that the device maintains 100% accuracy up to 50 sheets, with performance gradually tapering to 64% as the count reaches 80 sheets, demonstrating the physical limits of the capacitive sensing method for thick stacks.

For developers interested in RTOS-based sensor applications or competitive electronics, this repository provides a complete package including Keil5 projects, MATLAB scripts for data fitting, PCB schematics, and even Multisim simulations for the contest's comprehensive evaluation phase.
