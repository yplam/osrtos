---
title: Zephyr RTOS Driver for HC-SR04 Ultrasonic Sensor
summary: 'A Zephyr RTOS sensor driver for the HC-SR04 ultrasonic ranging module, conforming
  to the standard Sensor subsystem API. It provides two implementation variants: a
  portable GPIO-based version and a high-precision nRF52-specific version utilizing
  hardware peripherals like PPI and TIMER.'
slug: zephyr-rtos-driver-for-hc-sr04-ultrasonic-sensor
codeUrl: https://github.com/inductivekickback/hc-sr04
star: 8
lastUpdated: '2021-02-07'
rtos: zephyr
topics:
- driver
- hc-sr04
- ncs
- nordicsemi
- nrfx
- sensor
- zephyr
isShow: false
createdAt: '2025-12-29'
updatedAt: '2025-12-29'
relatedProjects:
- vl53l0x-tof-sensor-driver-for-rt-thread
- zephyr-rtos-for-dwm1001
- nrf-servo-driver-for-zephyr-rtos
- hdc1000-sensor-driver-for-rt-thread
- apache-nuttx-driver-for-bosch-bme280-sensor
- ultrasonic-hc-sr04-test-for-mongoose-os
---

## Overview

The HC-SR04 is a widely used, inexpensive ultrasonic ranging module capable of measuring distances by emitting an ultrasonic pulse and timing its echo. This project provides a dedicated driver for the Zephyr RTOS, allowing the sensor to be integrated into the Zephyr Sensor subsystem API. Built originally using the nRF Connect SDK (NCS), it offers a standardized way to access distance data on supported microcontrollers.

## How the Sensor Works

The HC-SR04 operates using a simple trigger-and-echo mechanism:
1. The controller sets the **TRIG** pin high for at least 10 microseconds.
2. The sensor emits an ultrasonic burst and sets the **ECHO** pin high.
3. The controller measures the duration the ECHO pin remains high.
4. This duration is converted into a distance measurement (meters) based on the speed of sound.

While the HC-SR04 is a 5V device, its TRIG pin can typically be driven by 3V logic. However, the ECHO pin requires a voltage divider when connected to 3.3V microcontrollers like the nRF52840 to prevent hardware damage.

## Driver Variants

This repository provides two distinct implementation strategies to suit different performance and portability requirements:

### Standard HC_SR04 Variant
This version uses standard Zephyr GPIO drivers and pin-change interrupts. It captures timestamps using `k_cycle_get_32` on both the rising and falling edges of the ECHO pulse. 
- **Pros**: Highly portable across different hardware platforms supported by Zephyr.
- **Cons**: Measurement accuracy can be affected by interrupt latency if the CPU is busy with higher-priority tasks.

### NRFX Hardware-Accelerated Variant
Specifically designed for Nordic Semiconductor nRF52-series SoCs, the `HC_SR04_NRFX` variant leverages specialized hardware peripherals including GPIOTE, TIMER, PPI (Programmable Peripheral Interconnect), and EGU (Event Generator Unit).
- **Pros**: The measurement is handled entirely in hardware, meaning CPU interrupt latency does not affect accuracy. It only triggers a single CPU interrupt once the measurement is complete.
- **Cons**: It is hardware-specific and requires manual configuration of EGU instances in the DeviceTree overlay.

## Integration and Configuration

To use the driver, you must define the sensor in your project's DeviceTree overlay. For the standard variant, the configuration looks like this:

```devicetree
us0: hc-sr04 {
    compatible = "elecfreaks,hc-sr04";
    label = "HC-SR04_0";
    trig-gpios = <&gpio0 26 GPIO_ACTIVE_HIGH>;
    echo-gpios = <&gpio0 27 GPIO_ACTIVE_HIGH>;
    status = "okay";
};
```

In your `prj.conf`, you would enable the sensor and GPIO subsystems:

```conf
CONFIG_SENSOR=y
CONFIG_GPIO=y
CONFIG_HC_SR04=y
```

## Technical Considerations

The driver uses a mutex to ensure that only one HC-SR04 device is actively measuring at any given time. This is a critical design choice because ultrasonic sensors cannot distinguish between their own echoes and those produced by other nearby sensors, which can lead to erroneous readings if multiple units fire simultaneously. 

Additionally, the driver handles error conditions, such as when a target is too close or too far for a valid echo. In these cases, the sensor produces a specific long-duration pulse (approximately 128.6ms) which the driver identifies to prevent incorrect distance calculations.
