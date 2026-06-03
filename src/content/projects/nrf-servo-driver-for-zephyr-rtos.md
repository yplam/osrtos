---
title: nRF Servo Driver for Zephyr RTOS
summary: A specialized Zephyr RTOS driver for controlling servomotors using Nordic
  Semiconductor's PWM peripheral. It simplifies hardware integration by automatically
  mapping PWM channels and scaling pulse widths through Devicetree configurations.
slug: nrf-servo-driver-for-zephyr-rtos
codeUrl: https://github.com/inductivekickback/nrf_servo
star: 9
version: v2.4.0
lastUpdated: '2023-07-13'
rtos: zephyr
topics:
- driver
- ncs
- nordicsemi
- nrfx
- servo
- zephyr
- zephyr-rtos
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- zephyr-rtos-driver-for-hc-sr04-ultrasonic-sensor
- hynitron-cst816s-touch-controller-driver-for-apache-nuttx
- nrf52-mbed-pwm
- bl602-gpio-expander-for-apache-nuttx
- zephyr-grbl
- zephyr-rtos-for-dwm1001
---

## Overview

The nRF Servo driver is a Zephyr RTOS-based module designed to streamline the control of servomotors on Nordic Semiconductor hardware. Developed using the nRF Connect SDK (NCS), this driver abstracts the complexity of managing PWM peripherals, allowing developers to focus on application logic rather than low-level register configuration.

Servomotors typically require a specific PWM signal—usually with a 20ms period—where the pulse width determines the shaft position. However, these pulse widths are rarely standardized across different manufacturers. A common challenge in embedded development is mapping these varying pulse widths to specific angles while ensuring the motor does not stall by exceeding its physical limits. This driver addresses these challenges by providing a structured way to define and control servos within the Zephyr ecosystem.

## Key Features and Capabilities

One of the primary advantages of this driver is its automatic resource management. Manually assigning individual servos to specific channels on various PWM peripheral instances can be a tedious task. This driver automatically assigns PWM channels to each servo device defined in the Devicetree (DT). To ensure compatibility with other parts of an application, developers can explicitly deny the driver access to specific PWM instances using configuration flags like `CONFIG_NRF_SERVO_ALLOW_PWMX`.

**Core features include:**
- **Automatic PWM Mapping**: Dynamically assigns hardware channels to servo instances.
- **Devicetree Integration**: Configuration is handled entirely through Zephyr's standard DT mechanism.
- **Safety Constraints**: Allows developers to define minimum and maximum pulse widths to prevent motor stalling and excessive current draw.
- **Value Scaling**: Maps a simple 0-100 input range to the specific microsecond pulse widths required by the hardware.

## Technical Implementation

The driver is built to work seamlessly with Nordic's PWM peripheral. Each servo is defined as a node in a Devicetree overlay. This node specifies the GPIO pin, the initial startup value, and the timing constraints in microseconds. 

At runtime, the driver translates a high-level value (0 to 100) into the appropriate PWM duty cycle based on the `min_pulse_us` and `max_pulse_us` parameters. This ensures that the application code remains hardware-agnostic, as the specific timing requirements of a particular servo model are encapsulated within the board's configuration files.

## Getting Started

To integrate a servo into a project, a developer adds an entry to their project's local overlay file. A typical configuration looks like this:

```devicetree
servo0: nrf-servo0 {
    compatible = "nrf-servo";
    pin = <27>;
    init_value = <50>;
    min_pulse_us = <1000>;
    max_pulse_us = <2000>;
    status = "okay";
};
```

After enabling the driver in the project configuration (`CONFIG_NRF_SERVO=y`), the application can interact with the servo using a simple API. The driver provides functions to write new positions and read the current state:

```c
// Set the servo to a new position (0-100)
ret = servo_write(dev, value);

// Read the current position
ret = servo_read(dev, &value);
```

This abstraction makes it easy to swap hardware or change servo models without rewriting the core application logic, as only the Devicetree pulse width values need to be updated.
