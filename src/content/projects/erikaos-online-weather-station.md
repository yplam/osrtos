---
title: ErikaOS Online Weather Station
summary: An embedded weather and Spotify status display system built on Erika Enterprise
  RTOS using an STM32F407-discovery board. It utilizes an ESP8266 module for WiFi
  connectivity and implements a complex hierarchical state machine to manage network
  requests, web servers for configuration, and API interactions with OpenWeatherMap
  and Spotify.
codeUrl: https://github.com/ckevar/ErikaOS-OnlineWeatherStation
isShow: false
rtos: erika-enterprise
libraries: []
topics:
- c
- erika
- erika-enterprise
- esp8266
- esp8266-projects
- esp8266-webserver
- esp8266wifi
- os
- real-time
- stm32
- stm32f4
- stm32f4-discovery
- stm32f407
- stm32f407vg
star: 2
lastUpdated: '2024-09-20'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- stm32-weather-station
- weather-micro-station-for-t-display-s3
- esp8266-esp32-spotify-oled-display
- erikaos-real-time-watch
- esptimecast
- stm32f407-weather-clock-cmake-development-template
---

The ErikaOS Online Weather Station is a sophisticated embedded project that transforms an STM32F407-discovery board into a real-time dashboard for weather updates and Spotify playback status. By leveraging the Erika Enterprise RTOS and an ESP8266 WiFi module, this project demonstrates how to build a robust, internet-connected device capable of handling complex API interactions and serving web-based configuration interfaces.

### The Architecture: An Automated Web Browser
At its core, the system is designed as an automated web browser. Rather than simple sequential code, the developer implemented a hierarchical state machine (HSM) named 'Network' to automate WiFi configuration, data requests, and web servers. This approach allows the system to make deterministic decisions based on responses from the ESP8266 module, which interfaces via UART. 

The system handles five distinct API requests: IP-based location, weather fetching from OpenWeatherMap, Spotify authentication (OAuth), token renewal, and playback status. Because Spotify's API requires SSL and modern domains use SNI (Server Name Indication), the project utilizes the ESP8266-IDF-ATV2.2.1 firmware to ensure secure connections that older AT firmware versions could not support.

### Hierarchical State Machines
Managing the complexity of network states—such as handling unexpected disconnections or truncated responses—is achieved through a clever implementation of HSMs. The project uses a bit-masking approach to define states:

```c
uint16_t state = MKSTATE(super, sub);
uint16_t superstate = SUPERSTATE(state); // parent state
uint16_t substate = SUBSTATE(state);     // child state
```

Transitions are managed via Look-Up Tables (LUTs), ensuring that the system can recover from errors (like a lost TCP connection) by checking the network status and returning to the last active client state without a full system restart.

### Real-Time Task Management with ErikaOS
The application is divided into five prioritized ErikaOS tasks to ensure responsive performance:
1. **Weather Update (10 min period):** Triggers weather fetching.
2. **Spotify Update (2s period):** Polls Spotify playback status. Interestingly, the developer optimized the Spotify API query by specifying a market (e.g., `?market=IT`) to reduce the JSON payload from ~13KB to ~4KB, preventing buffer overflows and reducing latency.
3. **ESP8266 Poll (40ms period):** Empties the 8KB DMA buffer to parse incoming UART data.
4. **LCD In (20ms period):** Handles touch screen input with a custom non-linear filter.
5. **Network Automaton (80ms period):** The engine that runs the web client or servers.

### Advanced Touch Screen Filtering
One of the technical highlights of the project is the implementation of a 'State Update Equation' filter for the resistive touch screen. To combat noise in the X-axis coordinates, the developer implemented a variable-alpha filter (similar to a Kalman filter). This allows for a fast response when the screen is first touched while providing high noise rejection as the touch continues, ensuring that UI buttons remain responsive and accurate.

### Development and Testing
Reliability is bolstered by unit testing using the CUnit framework. The project includes tests for the Look-Up Tables and the ESP8266 driver, specifically focusing on the HTTP method extractor and status code hashing. The driver uses a unique hashing mechanism for HTTP status codes (like 200 or 404) to avoid the overhead of generic string conversion functions like `atoi()`.

To get started with the project, developers need the Erika2.x OS environment and the `gcc-arm-none-eabi` toolchain. The project is flashed to the STM32 board using `st-flash`, providing a complete end-to-end example of a modern, RTOS-based IoT application.
