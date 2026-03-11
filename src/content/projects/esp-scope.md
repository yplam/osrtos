---
title: ESP-Scope
summary: ESP-Scope is a web-based oscilloscope application built on the ESP-IDF framework
  for ESP32 microcontrollers. It utilizes the ESP32's ADC capabilities to capture
  analog signals and serves a real-time visualization interface via a web browser,
  supporting sample rates up to 83.3 kHz.
codeUrl: https://github.com/MatAtBread/esp-scope
isShow: true
rtos: freertos
libraries:
- lwip
topics: []
image: /202512/esp-scope-3d.webp
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
star: 166
---

ESP-Scope is a clever implementation of a web-based oscilloscope leveraging the power of the ESP32 and the ESP-IDF framework. Designed to provide real-time signal visualization through a standard web browser, this project eliminates the need for dedicated display hardware by serving a responsive UI directly from the microcontroller. It is particularly optimized for the Seeed XIAO ESP32C6, though it can be adapted for other ESP32-based development boards.

### Core Features and Capabilities
The project transforms an ESP32 into a functional diagnostic tool with several impressive features:
- **Real-time Visualization**: Signals are captured via the ADC and streamed to a web interface.
- **Adjustable Sample Rates**: Users can configure the sampling frequency between 1 Hz and 83,333 Hz.
- **Triggering and Measurement**: Includes adjustable trigger levels and crosshair functionality for precise signal analysis.
- **Integrated Test Signal**: A built-in test signal generator (output on D1) allows for easy calibration and verification without external equipment.
- **WiFi Management**: The device starts as a WiFi Access Point (AP) for initial configuration and can be easily connected to an existing network via a built-in WiFi manager.

### Technical Architecture
ESP-Scope is built using the ESP-IDF (Espressif IoT Development Framework). It relies on FreeRTOS for task management, ensuring that ADC sampling and web server operations run concurrently without interference. The project uses the following ESP-IDF components:
- `esp_http_server`: To host the web interface and handle data requests.
- `esp_adc`: For high-speed analog-to-digital conversion.
- `esp_wifi` and `esp_netif`: To manage wireless connectivity.
- `nvs_flash`: For persistent storage of WiFi credentials and oscilloscope settings.

The frontend is a lightweight combination of HTML and JavaScript, embedded directly into the firmware. This allows the device to remain completely self-contained.

### Hardware and 3D Design
While the software is the heart of the project, the author has provided a complete hardware solution. The repository includes 3D design files (STEP format) for a custom case designed for the Seeed XIAO ESP32C6. The case includes space for a Li-poly battery, making the ESP-Scope a truly portable tool. The hardware setup uses standard 2.54mm pitch headers for ground, signal, and test connections.

### Getting Started
To build the project, you will need the ESP-IDF environment installed. The build process follows the standard ESP-IDF workflow:

```bash
# Clone the repository
git clone https://github.com/MatAtBread/esp-scope.git
cd esp-scope

# Set up environment and build
idf.py set-target esp32c6
idf.py build
idf.py flash monitor
```

Once flashed, the device creates a WiFi network named "ESP-Scope". Connecting to this network and navigating to `http://esp-scope` opens the control dashboard. The onboard LED provides status feedback, such as indicating AP mode (1-second flashes) or active data transmission (rapid flashes).

### A Note on Development
Interestingly, the project serves as a case study for AI-assisted development. Much of the code was generated using Google Gemini, with human oversight for architectural design and refinement. This collaborative approach resulted in a fully functional, documented, and housed project completed in just a weekend.
