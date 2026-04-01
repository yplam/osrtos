---
title: JC2432W328 Microcontroller Board Documentation
summary: A comprehensive technical resource for the ESP32-based JC2432W328 development
  board, featuring an ST7789 display and capacitive touch. The repository provides
  a wide range of Arduino-based examples covering WiFi networking, BLE services, hardware
  peripherals, and LVGL graphics integration.
slug: jc2432w328-microcontroller-board-documentation
codeUrl: https://github.com/maxpill/JC2432W328
lastUpdated: '2024-08-29'
rtos: freertos
libraries:
- lvgl
topics:
- esp32
- esp32-marauder
- esp32-wroom
- esp32cyd
- jc2432w328
- st7789
- st7789-display
isShow: true
image: /202604/JC2432W328.webp
createdAt: '2026-04-01T01:24:28+00:00'
updatedAt: '2026-04-01T01:24:28+00:00'
---

The JC2432W328 is a versatile development platform that has gained popularity in the maker community as a cost-effective, all-in-one ESP32 module with an integrated display. Often referred to as a variant of the "Cheap Yellow Display" (CYD) family, this board combines the dual-core processing power of the ESP32 with a 2.8-inch TFT LCD, making it an ideal candidate for IoT controllers, handheld devices, and interactive user interface projects.

At its core, the board utilizes the ST7789 display controller to drive a 320x240 pixel color screen. While many similar budget boards rely on resistive touch, the JC2432W328 stands out for its integration of the CST820 capacitive touch controller, offering a more modern and responsive user experience suitable for complex gesture-based interfaces.

### Hardware Capabilities and Peripherals

The project provides a deep dive into the board's hardware through a series of structured code examples. For fundamental hardware interaction, the repository includes implementations for analog-to-digital conversion (ADC), UART serial communication, and hardware interrupts. The use of hardware timers is also demonstrated, showcasing how to handle precise timing tasks—such as toggling status LEDs—without blocking the main execution loop or the WiFi stack.

One of the more interesting hardware features is the onboard RGB LED and buzzer system. The provided examples demonstrate how to control these peripherals effectively, including a standalone implementation that plays the "Pirates of the Caribbean" theme song by calculating frequency-based delays to generate square-wave audio signals directly from the ESP32 GPIOs.

### Wireless Connectivity: WiFi and BLE

As an ESP32-powered device, wireless connectivity is a primary focus of this documentation. The repository covers a broad spectrum of networking scenarios powered by the native ESP32 stack and FreeRTOS-based Arduino core:

- **WiFi Modes**: Detailed guides for setting up a Soft Access Point (AP) for local configuration and connecting as a Station (STA) to existing networks.
- **Network Protocols**: Implementations of TCP servers and clients, as well as asynchronous UDP communication for low-latency data transfer.
- **Web Control**: A dedicated example for an asynchronous web server allows for remote GPIO control (such as toggling a relay) directly from a standard web browser.
- **Provisioning**: The repository includes SmartConfig support, enabling users to configure WiFi credentials via a smartphone app rather than hardcoding them into the firmware.
- **Bluetooth**: Basic BLE service setup is provided, allowing the board to act as a peripheral that can communicate with mobile devices for data logging or remote control.

### Advanced Graphics with LVGL and LovyanGFX

For projects requiring sophisticated user interfaces, the documentation illustrates how to bridge the gap between the hardware and high-level graphics frameworks. By integrating the LVGL (Light and Versatile Graphics Library) with the LovyanGFX driver, the board can render complex UI elements, buttons, and animations. The examples detail the necessary SPI bus configurations, memory buffer management, and callback functions required to achieve smooth performance. This setup allows the ESP32 to handle both the GUI rendering and background tasks like sensor monitoring or network communication simultaneously.

### Getting Started

The repository serves as both a technical reference and a boilerplate for new projects. Each example is designed to be standalone, allowing developers to test specific features—like the capacitive touch interface, the SD card slot, or wireless connectivity—before integrating them into larger applications. Whether you are building a simple sensor dashboard or a complex remote control interface, the JC2432W328 documentation provides the necessary foundation for professional ESP32-based display development.
