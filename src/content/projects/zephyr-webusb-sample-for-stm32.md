---
title: Zephyr WebUSB Sample for STM32
summary: A sample application demonstrating WebUSB functionality on STM32 microcontrollers
  using the Zephyr RTOS. It implements a simple echo service that communicates with
  a web-based application via the WebUSB API, showcasing secure browser-to-hardware
  connectivity.
slug: zephyr-webusb-sample-for-stm32
codeUrl: https://github.com/dimka-rs/zephyr-stm32-webusb
star: 10
lastUpdated: '2020-02-10'
rtos: zephyr
topics:
- bluepill
- stm32
- stm32f103
- webusb
- zephyr
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- zephyr-stm32-spi-example
- mender-ota-example-for-stm32l4-and-zephyr-rtos
- arm-mbed-os-blue-pill-usb-demo
- stm32f429-rtic-and-smoltcp-example-application
- zephyr-rtos-lorawan-node
- zephyr-wi-fi-and-tcp-udp-connection-demo
---

The Zephyr WebUSB sample application provides a practical implementation of the WebUSB API, allowing web applications to communicate directly with embedded hardware. This project specifically targets STM32 microcontrollers, leveraging the robust USB stack provided by the Zephyr RTOS to create a bridge between the physical device and a web browser.

### How WebUSB Works

WebUSB is a modern web standard that enables secure communication between a browser and a USB device. Unlike traditional USB devices that require specific OS-level drivers, WebUSB allows the web page itself to handle the communication logic. This is particularly useful for configuration tools, firmware updates, or simple data logging interfaces that can run entirely in a browser like Google Chrome without requiring the user to install third-party software.

### Technical Implementation

The application is built on the Zephyr RTOS, utilizing its modular USB device stack. The project configuration (prj.conf) enables several critical components:

- **USB Device Stack**: Enabled via `CONFIG_USB_DEVICE_STACK` to handle standard USB requests.
- **BOS Descriptors**: The Binary Object Store (BOS) is essential for WebUSB, as it allows the device to declare its compatibility with the WebUSB protocol to the host operating system.
- **Echo Logic**: The core of the application receives data from the USB interface and immediately echoes it back to the host. This serves as a baseline for testing connectivity and verifying that the data path between the browser and the MCU is functional.

### Hardware and Environment

While the project is designed for boards supported by Zephyr with USB device drivers, the included build scripts specifically reference the `stm32_min_dev_blue` (commonly known as the STM32 "Blue Pill"). The build system uses CMake and Zephyr's `west` tool for compilation and flashing. The project also configures UART interrupt-driven communication and line control to facilitate debugging and status reporting.

### Testing and Web Integration

Because WebUSB is a powerful feature with access to hardware, it is restricted to secure origins (HTTPS). To test the application, developers typically use a local web server or a pre-built web interface. The sample demonstrates the full lifecycle of a WebUSB connection:

1.  **Connection**: The device is connected via USB and recognized by the host.
2.  **Notification**: A landing page notification may appear in the browser, directing the user to the appropriate web interface.
3.  **Authorization**: The user must explicitly grant permission to the web app to access the specific USB device.
4.  **Communication**: Data is exchanged using the WebUSB API's transfer methods, which the STM32 firmware processes and returns.

This sample serves as a foundational template for developers looking to integrate web-based control or monitoring into their STM32-based embedded systems using the Zephyr ecosystem.
