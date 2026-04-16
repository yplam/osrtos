---
title: FOC_Pocket
summary: FOC_Pocket is a compact, coin-sized brushless motor controller based on the
  ESP32-S3 and the SimpleFOC library. It utilizes highly integrated MPS chips, including
  the MP6541A driver and MA600A magnetic encoder, to provide precise position, speed,
  and torque control for small gimbal motors.
slug: foc-pocket
codeUrl: https://github.com/HwzLoveDz/FOC_Pocket
siteUrl: https://oshwhub.com/mondraker/coin-size-foc-brushless-gimbal-d
lastUpdated: '2025-08-01'
licenses:
- Apache-2.0
image: /202604/FOC_Pocket_3.avif
rtos: freertos
topics:
- bldc
- esp-idf
- esp32
- espressif
- foc
- mps
isShow: true
createdAt: '2026-04-16T03:45:58+00:00'
updatedAt: '2026-04-16T03:45:58+00:00'
---

FOC_Pocket is an embedded systems project born from the desire to learn Field Oriented Control (FOC) while leveraging highly integrated modern components. The project centers around a "coin-size" form factor, specifically designed to drive 2204-style brushless gimbal motors using a high-performance MPS (Monolithic Power Systems) chip stack and the ESP32-S3 microcontroller.


## Hardware Architecture

The hardware design is built around a suite of specialized chips to minimize footprint while maximizing performance:
- **ESP32-S3-PICO-1-N8R8**: The main controller providing Wi-Fi, Bluetooth, and sufficient processing power for FOC calculations.
- **MP6541A**: An integrated brushless motor driver that combines six N-channel power MOSFETs with bidirectional current sensing on the low-side of each bridge arm.
- **MA600A**: A high-precision magnetic encoder with a Tunnel Magnetoresistance (TMR) sensor, offering absolute angle detection over SPI.
- **MPM3632S**: A compact synchronous step-down buck module that converts the main bus voltage to 3.3V for the logic circuitry.
- **SIT3051TK**: A CAN bus transceiver for future multi-device communication.

![FOC_Pocket PCBA mounted on the back of a brushless motor](/202604/FOC_Pocket_0.avif)

## Current Sensing and Driver Logic

The MP6541A is the heart of the motor drive system. Unlike discrete solutions that require external shunts, the MP6541A integrates current sampling within its low-side MOSFETs. The chip outputs a current signal on SOx pins that is proportional to the phase current. 

![MP6541A internal block diagram showing current sensing architecture](/202604/FOC_Pocket_6.avif)

To interface this with the ESP32-S3's ADC, the design uses a reference resistor (RREF) to convert the current signal into a voltage. The zero-current state is calibrated at startup to account for the reference voltage (VREF). The software implementation performs real-time ADC sampling, applies offset compensation for each phase (A, B, and C), and converts the raw voltage into milliamps using the specific current-sense ratios of the chip.

## Magnetic Encoder Integration

For feedback, the project utilizes the MA600A magnetic encoder. This sensor supports high-speed SPI communication (up to 25MHz) and provides 16-bit resolution. The software includes a custom driver that inherits from the SimpleFOC `Sensor` class, overriding the `getSensorAngle` method to fetch raw position data and convert it into radians. 

One significant advantage of the MA600A is its internal filtering, which provides stable angle data without the need for additional software-side window filters. In testing, the sensor achieved an accuracy of approximately ±0.04° without extensive calibration.

## Power Management and Safety

The MPM3632S buck module handles the power conversion from the main bus (up to 18V) down to the 3.3V logic level. A hardware-configurable voltage divider is used to monitor the bus voltage. By default, it is set to a 7.2V threshold to protect 2S lithium batteries from over-discharge, though this can be bypassed for USB-powered operation.

## FOC Control and Software Design

The software is implemented using a modified version of the `esp_simplefoc` library within the ESP-IDF framework. The project includes several example applications:
- **Open-loop control**: For basic motor verification.
- **Closed-loop Velocity/Position control**: Utilizing the MA600A feedback for precise motion.
- **Torque control**: Leveraging the integrated current sensing for force-feedback applications.

![Position closed-loop control performance graph](/202604/FOC_Pocket_18.avif)

The motor parameters for the target 2204 motor are specifically tuned, with 7 pole pairs, a phase resistance of 3.25Ω, and a KV rating of 330. The control loop initialization involves linking the MA600A sensor and the MP6541A driver to the SimpleFOC `BLDCMotor` object, setting PID parameters for velocity and angle loops, and performing the FOC alignment sequence.
