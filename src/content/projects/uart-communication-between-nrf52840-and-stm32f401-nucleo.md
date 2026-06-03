---
title: UART Communication between nRF52840 and STM32F401 Nucleo
summary: A collection of Rust-based example programs demonstrating UART communication
  between an nRF52840 DK and an STM32F401 Nucleo board. It utilizes the RTIC framework
  for concurrency and features examples ranging from basic byte transfers to structured
  data using COBS and the Postcard serialization library.
slug: uart-communication-between-nrf52840-and-stm32f401-nucleo
codeUrl: https://github.com/Dajamante/nRF52_Nucleo_uart
star: 4
lastUpdated: '2022-07-06'
rtos: rtic
topics:
- embedded-rust
- nrf52
- nrf52840
- nucleo
- rtic
- stm32
- uart
- uart-protocol
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- rust-embedded-examples
- stm32f4-rtic-playground
- stm32f429-rtic-and-smoltcp-example-application
- rust-for-arduino-portenta-h7
- rust-i2c-driver-for-bosch-bme280-on-apache-nuttx
- swift-examples-for-stm32c011
---

## Overview

This project provides a series of practical examples for establishing UART (Universal Asynchronous Receiver-Transmitter) communication between two popular microcontroller platforms: the Nordic nRF52840 DK and the STMicroelectronics STM32F401 Nucleo. Developed in Rust, the project serves as a learning resource for developers looking to bridge different hardware ecosystems using standard serial protocols.

The repository is structured as a progression of programs, starting from basic hardware initialization and moving toward robust, structured data exchange. While the nRF52840 typically acts as the sender and the Nucleo as the receiver, several examples demonstrate bidirectional communication and control.

## Technical Stack

The project is built on a modern Rust embedded stack, ensuring memory safety and high performance. Key components include:

- **RTIC (Real-Time Interrupt-driven Concurrency)**: A concurrency framework for Cortex-M devices that provides a hardware-accelerated task scheduler, ensuring deadlock-free execution and efficient resource sharing.
- **Hardware Abstraction Layers (HALs)**: It utilizes `nrf52840-hal` and `stm32f4xx-hal` to interact with the specific peripherals of each board.
- **Serialization**: For complex data structures, the project employs `postcard` for efficient binary serialization and `COBS` (Consistent Overhead Byte Stuffing) for reliable packet framing.
- **Knurling App Template**: The project structure follows the Knurling-rs best practices, including `defmt` for efficient logging over RTT.

## Hardware Configuration

Connecting the two boards requires a simple three-wire setup. Because UART is asynchronous and lacks a shared clock, the transmitter (TX) of one board must connect to the receiver (RX) of the other, with a shared ground reference:

- **Nucleo D8/PA9 (TX)** to **nRF52 P1.07 (RX)**
- **Nucleo D2/PA10 (RX)** to **nRF52 P1.08 (TX)**
- **GND** to **GND**

On the STM32 side, the project highlights the importance of Alternate Function (AF) mapping. Unlike the nRF52, which allows flexible pin routing, the STM32 requires specific pins to be configured with the correct alternate function (AF07 for USART1) to enable serial communication.

## Example Progression

The repository contains multiple programs of increasing complexity:

1.  **Basic Initialization**: Minimal examples for blinking LEDs and verifying hardware state.
2.  **Raw Byte Transfer**: Sending simple byte-sized commands (like emojis or single characters) back and forth.
3.  **Remote Control**: Using the nRF52 to trigger LED states on the Nucleo, or using buttons on one board to toggle peripherals on the other.
4.  **Structured Packets**: Implementing COBS and Postcard to send robust instructions. This approach prevents data corruption and allows for complex command structures rather than simple raw bytes.
5.  **Advanced Control**: Examples involving PWM dimming and interval-based blinking controlled over the serial link.

## Implementation Details

Using RTIC allows the projects to handle UART events through interrupts. For instance, on the Nucleo receiver, a task can be bound to the USART interrupt, ensuring that incoming data is processed immediately without polling the peripheral in a busy loop. 

```rust
#[local]
struct Local {
    // Example of the USART structure in the Nucleo code
    usart: Serial<USART1, (PA9<Alternate<PushPull, 7>>, PA10<Alternate<PushPull, 7>>), u8>,
}
```

By leveraging `postcard` and `COBS`, the project demonstrates how to move beyond "magic numbers" in serial protocols. Instead of sending a raw `1` to turn on a light, the system can send a serialized Rust `enum` or `struct`, which is then decoded safely on the receiving end, providing a much more maintainable and scalable architecture for embedded communication.
