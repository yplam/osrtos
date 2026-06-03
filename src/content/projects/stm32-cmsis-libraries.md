---
title: STM32 CMSIS Libraries
summary: A comprehensive collection of CMSIS-based peripheral and sensor libraries
  specifically designed for the STM32F103C8T6 microcontroller. It provides low-level,
  high-performance drivers for internal peripherals and a wide variety of external
  modules including sensors, displays, and communication bridges.
slug: stm32-cmsis-libraries
codeUrl: https://github.com/gkiryaziev/STM32-CMSIS_Libraries
star: 67
lastUpdated: '2025-08-25'
rtos: cmsis
topics:
- 24c64
- 74hc595
- ads1115
- arm
- bmp280
- cmsis
- dht11
- encoder
- hcsr04
- lcd1602
- led-display
- lsm303dlhc
- max6675
- mpu9255
- pcf8574t
- stm32
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- stm32f103-cmsis-libraries-and-projects
- stm32f103-cmsis-peripheral-configuration
- cmsis-drivers-for-efm32-and-stm32
- cmsis-for-stm32-development
- stm32-prototyping-libraries
- lpc1115-libraries-and-drivers
---

## Overview

The STM32 CMSIS Libraries project is a specialized repository providing low-level drivers and middleware for the STM32F103C8T6 microcontroller, commonly known as the "Blue Pill." Unlike projects that rely on the heavy abstraction of the STM32 HAL (Hardware Abstraction Layer), this project focuses on using CMSIS (Cortex Microcontroller Software Interface Standard) to interact directly with hardware registers. This approach offers developers a more lightweight footprint and greater control over the MCU's performance.

Developed using STM32CubeIDE 1.7.0, the repository serves as both a library collection and a reference for bare-metal development on the ARM Cortex-M3 architecture.

## Core System Libraries

The project includes essential system-level drivers located in the `Inc` and `Src` directories. These form the foundation for any STM32 application:

- **RCC & GPIO**: Fundamental clock configuration and pin management.
- **USART, I2C, & SPI**: Standard communication protocols for interfacing with peripherals and other microcontrollers.
- **Delay**: Implementation of timing functions, including high-precision delays using the Data Watchpoint and Trace (DWT) unit.
- **RTC, PWM, & EXTI**: Support for the Real-Time Clock, Pulse Width Modulation, and External Interrupts.

## External Component Support

Beyond standard peripheral drivers, the repository features an extensive `Lib` folder containing drivers for popular external components. These drivers support various communication methods, including bit-banging and hardware-accelerated SPI/I2C:

- **Sensors**: Support for the MAX6675 (thermocouple), MPU9255 (9-axis IMU), BMP280 (pressure/temperature), ADS1115 (ADC), LSM303DLHC (accelerometer/magnetometer), HCSR04 (ultrasonic), and DHT11 (humidity/temperature).
- **Displays & IO**: Drivers for LCD1602 (via 8-bit, 4-bit, or PCF8574T I2C bridge), 74HC595 shift registers, and LED displays.
- **Storage**: Support for 24C64 EEPROM via I2C.
- **Input**: A polling-based rotary encoder driver with software debouncing.

## Non-Blocking Delay Implementation

One of the standout features of this library collection is the implementation of non-blocking delays using the DWT unit. This allows developers to manage multiple timed events without stalling the processor, which is critical for maintaining responsiveness in embedded applications. 

```c
// Example of non-blocking delay usage
Delay_TypeDef d1, d2, usart1_d1;
char buffer[USART1_BUFFER_SIZE] = {0};

if (DWT_nb_timeout(&d1)) {
    GPIO_WritePin(GPIOB, 12 , state1); 
    state1 = !state1;
    DWT_nb_delay_ms(&d1, 300);
}

if (DWT_nb_timeout(&d2)) {
    GPIO_WritePin(GPIOB, 14 , state2); 
    state2 = !state2;
    DWT_nb_delay_ms(&d2, 700);
}

// Non-blocking USART1 string reading
if (DWT_nb_timeout(&usart1_d1)) {
    if (USART1_ReadString(buffer))
        USART1_SendString(buffer);
    DWT_nb_delay_ms(&usart1_d1, 50);
}
```

## Technical Details

The project includes a standard linker script (`STM32F103C8TX_FLASH.ld`) configured for the 64KB Flash and 20KB RAM typical of the F103C8T6. It defines a stack size of 1KB and a heap size of 512 bytes, ensuring a stable environment for C applications. By utilizing CMSIS, the code remains highly portable across other STM32F1 series devices with minimal modification.
