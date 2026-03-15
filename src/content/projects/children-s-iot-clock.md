---
title: Children's IoT Clock
summary: An ESP32-based IoT clock designed for children's sleep routines, built using
  the ESPHome framework. It utilizes a WS2812B LED matrix to provide color-coded status
  indicators and visual countdowns, featuring automatic time synchronization and Home
  Assistant integration.
slug: children-s-iot-clock
codeUrl: https://github.com/chrisns/childrens-clock
star: 44
version: v1.10.107-rc.10
lastUpdated: '2026-01-16'
rtos: freertos
topics:
- arduino
- c
- children
- clock
- diy
- diy-electronics
- diy-project
- diy-solutions
- esp32
- esphome
- esphome-config
- esphome-device
- iot
- kids
- kids-programming
- network-time-protocol
- ntp
- platformio
isShow: true
image: /202603/daytime.webp
createdAt: '2026-03-15'
updatedAt: '2026-03-15'
---

## Solving the Bedtime Struggle with IoT

The Children's IoT Clock was born out of a common parental frustration: commercial "wake-up" clocks that are difficult to configure, lose time when unplugged, and fail to account for daylight savings. This project leverages the power of the ESP32 and the flexibility of the ESPHome framework to create a robust, network-connected alternative that is both functional and educational for children.

At its core, the clock uses a WS2812B 8x32 LED matrix to communicate time and status. Rather than just showing numbers, it uses a color-coded system to help children understand when it is time to sleep (Red), time to play quietly in their room (Amber), or time to start the day (Green). 

## Hardware Architecture

The build is designed to be accessible and affordable, requiring only a few components:
- **ESP32 Microcontroller**: Acts as the brain of the device, providing Wi-Fi connectivity and processing power.
- **WS2812B 8x32 LED Matrix**: A high-density addressable LED panel used for the display.
- **Photo Frame**: A standard 15x5" frame serves as the enclosure, with a simple sheet of paper acting as a diffuser for the LEDs.

The wiring is straightforward, connecting the matrix's 5V, Ground, and Data-In lines to the ESP32. This simplicity makes it an excellent weekend project for those new to soldering and embedded systems.

## Software and Smart Features

The project is built on **ESPHome**, which allows for declarative configuration via YAML files. This approach simplifies the integration of complex features like SNTP time synchronization, web-based configuration portals, and Home Assistant connectivity. 

One of the most innovative features of this clock is the "visual countdown." A series of dots at the top of the matrix gradually reduces as the current phase (like sleep or quiet time) nears its end. This provides children who cannot yet read a clock a clear way to visualize how much time is left before they can get up.

### Configuration and Logic

The system includes a custom C++ header (`childrensclock.h`) to handle specific logic that goes beyond standard ESPHome components. The configuration allows for distinct schedules for weekdays and weekends, ensuring that Saturday morning sleep-ins are accounted for. 

```yaml
# Example of the state logic used in the display lambda
switch (currentstate) {
  case RED:
    color = id(RED_COLOR);
    break;
  case AMBER:
    color = id(AMBER_COLOR);
    break;
  case GREEN:
    color = id(GREEN_COLOR);
    break;
}

int line_length = id(dots).state;
it.line(0, 0, line_length, 0, color);
```

## Ecosystem Integration

Because it is built with ESPHome, the clock is automatically discovered by **Home Assistant**. This allows parents to adjust wake-up times or colors remotely from their phones without entering the child's room. It also supports the Improv Wi-Fi standard, making the initial network provisioning seamless via Bluetooth or a web browser.

For developers, the project includes a full testing suite using **Ceedling** and **Rake**, demonstrating a professional approach to firmware development even for a home hobbyist project. The code is open-source and designed to be extended, with suggestions for adding temperature sensors, air quality monitors, or speakers to further enhance the device's utility.
