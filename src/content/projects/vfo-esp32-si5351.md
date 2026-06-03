---
title: VFO-ESP32-Si5351
summary: A sophisticated Variable Frequency Oscillator (VFO) and transceiver controller
  based on the ESP32 and Si5351 clock generator. It features a high-quality GUI using
  LVGL, support for dual VFOs, WiFi-based CAT control, and integrated SWR/power measurement
  capabilities for amateur radio projects.
slug: vfo-esp32-si5351
codeUrl: https://github.com/paulh002/VFO-ESP32-Si5351
star: 27
version: V2.0
lastUpdated: '2023-06-28'
rtos: freertos
libraries:
- lvgl
- tft-espi
topics:
- esp32-arduino
- lvgl
- pcb
- vfo
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- ic-705-ci-v-band-decoder-and-transverter-controller
- espri-esp-radio-interface
- si4732-radio
- esp32-s3-smart-home-control-panel
- esp32berry
- esp32-sdr-gps-receiver
---

The VFO-ESP32-Si5351 project is a comprehensive solution for amateur radio enthusiasts looking to build or upgrade their transceivers with a modern, digitally-controlled oscillator. By leveraging the processing power of the ESP32 and the versatility of the Si5351A clock generator, this project provides a stable and feature-rich frequency control system that rivals commercial equipment.

### Modern User Interface
One of the standout features of the project is the transition to the LVGL (Light and Versatile Graphics Library). This shift allows for a much more sophisticated and responsive user interface compared to traditional bitmapped displays. The GUI supports both touch input and physical controls via a rotary encoder, making it adaptable to various hardware configurations. The interface includes dedicated screens for frequency display, WiFi configuration, and Si5351 calibration, providing a professional look and feel to homebrew radio equipment.

### Advanced Radio Functionality
The project is designed with the specific needs of radio builders in mind. It supports dual VFOs (VFO A and VFO B), allowing operators to quickly switch between frequencies or monitor different bands. It also includes BFO (Beat Frequency Oscillator) adjustment capabilities, which are essential for SSB and CW modes. To ensure high signal purity, the hardware design utilizes two separate Si5351 chips with buffer transistors to minimize crosstalk, achieving significantly improved suppression compared to single-chip designs.

### Integrated Measurement and Control
Beyond simple frequency generation, the system integrates power and SWR (Standing Wave Ratio) measurement. By using AD8307 log detectors, the VFO can display real-time transmission statistics on the TFT screen. The software includes calibration routines for these detectors, ensuring accurate readings across different power levels. This integration reduces the need for external meters and simplifies the overall transceiver architecture.

### Connectivity and Remote Management
The inclusion of the ESP32 brings powerful networking capabilities to the VFO. The project supports several advanced features:
- **WiFi Configuration**: Users can easily connect the VFO to a local network via the GUI.
- **CAT Interface**: A TCP/IP-based CAT (Computer Aided Transceiver) interface allows the VFO to communicate with other controllers or PC software, such as RF amplifiers or automatic antenna tuners.
- **OTA Updates**: Support for Over-The-Air updates means the firmware can be updated wirelessly once the unit is installed in a chassis, avoiding the need to open the case for maintenance.
- **Telnet Debugging**: Provides a remote console for monitoring system status and debugging without a physical serial connection.

### Hardware and Development
The repository includes KiCad PCB designs that have evolved through several iterations to optimize performance. Improvements include the use of buck converters for efficient power supply, optimized GPIO mapping to avoid ADC/WiFi conflicts, and refined output networks to reduce unwanted radiation. While originally developed in the Arduino IDE, the project also supports Visual Studio with Visual Micro for a more robust development environment.
