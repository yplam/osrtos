---
title: ESP32 NimBLE HID Client
summary: A library and example collection for configuring an ESP32 as a BLE HID client
  (central) using the NimBLE-Arduino stack. It allows ESP32 devices to connect to
  and process data from BLE peripherals such as mice, joysticks, and gamepads.
codeUrl: https://github.com/esp32beans/BLE_HID_Client
isShow: false
rtos: ''
libraries:
- nimble
topics:
- arduino
- ble
- ble-central
- ble-client
- bluetooth
- bluetooth-low-energy
- esp32
- hid
- mouse
- nimble
- pass-through
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- nimble-hid-keyboard-and-mouse-example-for-esp32
- usb-keyboard-and-mouse-bluetooth-adapter-esp32
- micropython-human-interface-device-library
- hijelhid-blekeyboard
- arduino-serial-ble
- esp-usb-ble-hid-bridge
---

The **ESP32 NimBLE HID Client** project provides a robust framework for turning an ESP32 into a BLE Central device capable of interacting with Human Interface Devices (HID). While many ESP32 projects focus on making the microcontroller act as a BLE keyboard or mouse (a peripheral), this project flips the script, allowing the ESP32 to act as the host that consumes data from wireless peripherals.

### Overview and Capabilities
Built on top of the high-performance **NimBLE-Arduino** library by h2zero, this project simplifies the process of scanning for, connecting to, and parsing reports from BLE HID servers. This is particularly useful for robotics, accessibility tools, or industrial controllers where you might want to use a standard off-the-shelf BLE joystick or trackball to control hardware like servos, motors, or LEDs.

The project has been verified to work with several commercial devices, including the Microsoft Bluetooth Mouse, various BLE trackballs, and specific BLE gamepads. It also works seamlessly with other ESP32s acting as HID peripherals.

### Technical Architecture
The project leverages the NimBLE stack, which is known for having a significantly lower memory footprint compared to the default Bluedroid stack found in the ESP32 Arduino core. This efficiency is critical when your application needs to handle both BLE communication and complex logic or display drivers simultaneously.

One of the standout features is the `BLE_Client_Joystick` class, which abstracts the complexity of HID report descriptors into simple callback functions. Instead of manually parsing byte arrays, developers can register functions to handle specific events like stick movement or button presses.

### Hardware Support
While the core functionality works on standard ESP32 modules, the project includes a specialized example for the **ESP32-S3**. The `BLE_HID_Mouse_USB` demo acts as a bridge: it receives movement data from a BLE mouse and re-transmits it over the S3's native USB port as a standard USB HID mouse. This effectively creates a "BLE to USB" adapter, a task that requires a chip with both BLE and native USB OTG capabilities.

### Getting Started
To use the library, you must first install the `NimBLE-Arduino` library via the Arduino Library Manager. The project structure is designed to be modular, with the joystick logic separated into `BLE_Client_Joystick.cpp` and `.h` files for easy integration into other projects.

Here is a snippet of how the joystick implementation simplifies interaction:

```cpp
#include "BLE_Client_Joystick.h"

BLE_Client_Joystick BLE_Joystick;

void movement(int x, int y) {
  Serial.printf("Stick moved: x=%d, y=%d\r
", x, y);
}

void button_A(bool pressed) {
  Serial.println(pressed ? "Button A Pressed" : "Button A Released");
}

void setup() {
  Serial.begin(115200);
  // Initialization logic for scanning and connecting
}
```

### Advanced HID Parsing
For developers needing to support custom or non-standard HID devices, the project provides tools to inspect the **HID Report Map**. By capturing the raw hex digits of the report descriptor from the BLE peripheral, users can use external parsers to understand the data structure of the notifications. This makes the library extensible to almost any BLE HID device, including digitizer tablets, barcode scanners, and custom game controllers.
