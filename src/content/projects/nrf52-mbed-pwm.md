---
title: nRF52_MBED_PWM
summary: A high-precision, hardware-based PWM library for nRF52840-based boards using
  the Arduino-mbed core. It provides non-blocking PWM signals for mission-critical
  tasks on platforms like the Arduino Nano 33 BLE and Seeeduino XIAO nRF52840.
slug: nrf52-mbed-pwm
codeUrl: https://github.com/khoih-prog/nRF52_MBED_PWM
star: 3
version: v1.0.3
lastUpdated: '2023-01-22'
rtos: mbed-os
topics:
- arduino-mbed
- duty-cycle
- hardware-pwm
- hardware-timer
- mbed
- mbed-nano
- mbed-os
- multi-channel-pwm
- nano-33-ble
- nano-33-ble-sense
- non-blocking
- nrf52840
- on-the-fly
- pwm
- pwm-driver
- pwm-frequency
- stepper-motor-control
- stepper-motor-driver
- xiao-nrf52840
- xiao-nrf52840-sense
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- mbed-rp2040-pwm-library
- mbed-rpi-pico-timerinterrupt
- n-able-arduino-core
- nucleo-experiment-control-system-for-atom-interferometry
- arduino-serial-ble
- nimble-arduino
---

The nRF52_MBED_PWM library is designed to provide robust, hardware-based Pulse Width Modulation (PWM) for nRF52840-based microcontrollers running on the Arduino-mbed platform. Unlike software-based PWM implementations that rely on CPU cycles and can be interrupted by high-priority tasks or blocking functions, this library leverages the dedicated hardware PWM peripherals of the nRF52840 SoC. This ensures that PWM signals remain stable and accurate, even when the processor is busy with complex calculations, wireless communication, or other time-sensitive operations.

## Why Hardware PWM Matters

In many embedded applications, such as motor control, LED dimming, or signal generation, the precision of the PWM signal is paramount. Software-based PWM (often using `millis()` or `micros()`) is susceptible to jitter and timing drifts caused by interrupts or long-running tasks in the main loop. By using the hardware timers and PWM blocks within the nRF52840, nRF52_MBED_PWM offloads the signal generation from the CPU. This results in a "set-and-forget" workflow where the hardware maintains the signal independently of the software state, making it ideal for mission-critical tasks.

## Supported Hardware and Cores

The library specifically targets boards powered by the nRF52840 and supported by Mbed-based Arduino cores. This includes:
- **Arduino Nano 33 BLE** and **Nano 33 BLE Sense** using the `ArduinoCore-mbed` (mbed_nano) core.
- **Seeeduino XIAO nRF52840** and **XIAO nRF52840 Sense** using the Seeeduino `mbed` core.

On the Arduino Nano 33 BLE, all digital pins (D0 to D13) are PWM-enabled, providing significant flexibility for complex projects requiring multiple outputs.

## Key Features and Capabilities

One of the standout features of this library is its consistency with other "FastPWM" libraries created by the same author for different architectures (such as ESP32, RP2040, and STM32). This common API allows developers to port their PWM-related code across different hardware platforms with minimal changes.

**Core capabilities include:**
- **Independent Channels**: Control multiple PWM outputs with totally independent frequencies and duty cycles.
- **On-the-fly Adjustments**: Start, stop, change, or restore PWM settings dynamically during runtime.
- **Parameter Retrieval**: Functions to read back actual PWM parameters, including frequency, duty cycle, pulse width, and period in microseconds.
- **Non-blocking Execution**: PWM generation continues even if the main loop is blocked by WiFi, Bluetooth, or other services.

## Technical Implementation and Usage

The library is implemented using a header-only style (`.hpp`) to simplify integration, while providing a standard header (`.h`) for the main application file to prevent "Multiple Definitions" linker errors in multi-file projects. 

### Basic Usage Example

Setting up a PWM signal is straightforward. After defining the pin, frequency, and duty cycle, you use the `setPWM` function to initialize the hardware:

```cpp
#include "nRF52_MBED_PWM.h"

uint32_t myPin  = D2;
float dutyCycle = 50.0f;
float freq      = 5000.0f;
mbed::PwmOut* pwm = NULL;

void setup() {
  // Initialize PWM on D2 with 5000Hz and 50% duty cycle
  setPWM(pwm, myPin, freq, dutyCycle);
}

void loop() {
  // PWM runs in hardware independently
}
```

## Advanced Control and Stepper Motors

Beyond simple dimming, the library includes examples for complex use cases like `PWM_StepperControl`. This demonstrates how to use high-frequency PWM to drive stepper motor drivers, allowing for smooth motion control without the overhead of manually toggling pins in software. Because the library allows for frequency changes on-the-fly, it can be used to implement acceleration and deceleration ramps for motion control systems.
