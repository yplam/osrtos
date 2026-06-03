---
title: I2Cwrapper
summary: I2Cwrapper is a modular framework for implementing I2C target (slave) devices
  on Arduino-compatible hardware. It enables the control of non-I2C peripherals like
  stepper motors and TFT displays over an I2C bus by translating commands between
  a controller and target device. The project supports a wide range of platforms including
  AVR, ESP32, SAMD, and STM32, and includes built-in error checking and interrupt
  support.
slug: i2cwrapper
codeUrl: https://github.com/ftjuh/I2Cwrapper
siteUrl: https://ftjuh.github.io/I2Cwrapper/index.html
star: 35
version: v0.5.0
lastUpdated: '2023-04-04'
rtos: ''
libraries:
- ucglib
topics:
- arduino
- arduino-library
- esp32
- esp8266
- i2c
- i2c-device
- i2c-master
- i2c-slave
- i2c-target
- port-expander
- samd
- sensor
- servo
- servo-control
- stepper
- stepper-motor-control
- stm32
- tft-display
- tm1638
- ucglib
isShow: false
createdAt: '2025-12-29'
updatedAt: '2025-12-29'
relatedProjects:
- supladevice-library
- xiaomi-cybergear-arduino-library
- liquidcrystal-i2c-multilingual
- spirit-motor-driver-library
- thingpulse-oled-ssd1306-driver
- pamculib
---

I2Cwrapper is a versatile framework designed to bridge the gap between I2C-capable controllers and peripherals that lack a native I2C interface. By using an Arduino-compatible device as an intermediary "target" (slave), the framework allows developers to control hardware like stepper motor drivers, TFT displays, and various sensors over the I2C bus. This approach effectively turns a standard microcontroller into a custom I2C peripheral.

The framework is divided into two main parts: a firmware framework that runs on the target device and a controller library used by the master device. Together, they handle the low-level communication overhead, including I2C interrupt service routines, command interpretation, and error checking using CRC8 checksums.

### Modular Architecture

One of the strongest features of I2Cwrapper is its modularity. It comes with several pre-built modules that "wrap" existing popular Arduino libraries, allowing them to be used remotely over the bus:

- **AccelStepperI2C**: Provides I2C control for up to eight stepper motors with acceleration support. It utilizes a local state machine to handle step generation on the target, preventing I2C bus clogging.
- **ServoI2C**: Mimics the standard Arduino Servo library for I2C-based motor control.
- **PinI2C**: Acts as an I/O expander, allowing digital and analog pins to be read or written over I2C as if they were local to the controller.
- **UcglibI2C**: Enables remote control of TFT displays supported by the Ucglib library.
- **RotaryEncoderI2C**: Reads quadrature encoders and manages counts locally on the target device.

### Advanced Communication Features

Beyond simple command passing, I2Cwrapper includes sophisticated features to ensure reliable operation in embedded environments. It implements a dedicated I2C state machine to handle communication events gracefully and provides an interrupt mechanism. This allows the target device to proactively alert the controller (via a dedicated hardware line) when an event occurs—such as a limit switch being triggered or a touch sensor being pressed—significantly reducing the need for constant I2C polling.

To address timing issues common in software-based I2C implementations, the framework includes an experimental "auto-adjust" feature for I2C delays. This mechanism calculates the optimal timing for transmissions based on the specific hardware performance and bus conditions of the connected devices.

### Broad Hardware Compatibility

I2Cwrapper is designed to be platform-agnostic within the Arduino ecosystem. It has been tested across a wide variety of architectures, making it suitable for everything from low-power sensors to high-performance motor controllers:

- **AVR**: Standard Arduinos like the Uno, Nano, and Mega.
- **ESP8266 & ESP32**: High-performance wireless SoCs.
- **ATtiny**: Small-footprint devices (e.g., ATtiny85/88) using ATTinyCore.
- **SAMD & STM32**: Modern 32-bit ARM Cortex-M microcontrollers.

### Example Usage

Setting up a controller to interact with a target device is straightforward. The following example demonstrates how to use the `PinI2C` module to control remote pins on a target device:

```cpp
#include <Wire.h>
#include <PinI2C.h>

uint8_t i2cAddress = 0x08;
I2Cwrapper wrapper(i2cAddress); // Represent the target device
PinI2C pins(&wrapper);          // Use the Pin interface

void setup() {
  Wire.begin();
  
  // Check if the target is present
  if (wrapper.ping()) {
    wrapper.reset(); // Clear target state
    pins.pinMode(13, OUTPUT); // Set pin 13 on the target to OUTPUT
  }
}

void loop() {
  // Toggle the LED on the target device
  pins.digitalWrite(13, HIGH);
  delay(500);
  pins.digitalWrite(13, LOW);
  delay(500);
}
```

For developers looking to extend the system, I2Cwrapper provides templates for creating new modules, making it a flexible choice for complex distributed embedded systems where pin count or physical distance requires offloading peripheral control to secondary microcontrollers.
