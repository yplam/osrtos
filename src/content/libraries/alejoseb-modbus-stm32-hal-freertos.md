---
title: Modbus-STM32-HAL-FreeRTOS
summary: This library provides a comprehensive Modbus implementation for STM32 microcontrollers,
  supporting TCP, RTU (USART), and USB-CDC interfaces. Built upon the STM32 Cube HAL
  and FreeRTOS, it enables multithread-safe concurrent execution of multiple Modbus
  Master and Slave instances across various hardware transport layers.
slug: alejoseb-modbus-stm32-hal-freertos
codeUrl: https://github.com/alejoseb/Modbus-STM32-HAL-FreeRTOS
star: 745
lastUpdated: '2026-02-05'
licenses:
- LGPL-2.1
libraryType: Middleware
createdAt: '2025-12-31'
updatedAt: '2026-03-08'
---

### Features


- Supports Modbus RTU Master and Slave modes over USART/UART interfaces.

- Supports Modbus TCP Master and Slave (Server) modes using the lwIP stack.

- Includes USB-CDC RTU support specifically validated for STM32F103 Bluepill boards.

- Multithread-safe implementation leveraging FreeRTOS primitives for robust concurrency.

- Enables concurrent execution of multiple Modbus instances on a single MCU, limited only by available hardware peripherals.

- Provides USART DMA support with idle-line detection for high baud rates up to 2 Mbps.

- Features a configurable TCP auto-aging algorithm for efficient management of multiple client connections.

- Compatible with RS232 and RS485 physical layers, including hardware RE/DE control pins.

- Utilizes an efficient Ring Buffer implementation for data reception to minimize processing overhead.

- Portable architecture designed for any STM32 MCU supported by the ST Cube HAL framework.

- Supports multi-client Modbus TCP slave configurations for complex networking scenarios.

- Fully integrated with CMSIS_V2 FreeRTOS API for modern RTU/TCP application development.

- Allows manual definition of Modbus telegrams for flexible Master function code implementation.

- Includes Python-based Jupyter notebooks using Pymodbus for external testing and validation.

- Provides extensive examples for NUCLEO-64, NUCLEO-144, and Discovery development boards.



The library is designed with a modular architecture that decouples the Modbus protocol logic from the underlying hardware transport layer. It utilizes a central `modbusHandler_t` structure to encapsulate the state, configuration, and hardware handles (UART, TCP, or USB) for each instance. The core protocol engine resides in `Modbus.c`, while `UARTCallback.c` manages the integration with STM32 HAL interrupt and DMA events. By leveraging FreeRTOS tasks and ring buffers, the library ensures non-blocking operation and thread safety, allowing the MCU to handle communication tasks efficiently alongside application logic.

**Core Components**
* **Modbus Engine**: Handles PDU (Protocol Data Unit) parsing and generation for both Master and Slave roles.
* **Transport Layer Abstraction**: Provides specialized handlers for USART (Interrupt/DMA), TCP (lwIP), and USB-CDC.
* **Ring Buffer Manager**: Handles incoming serial data streams to prevent packet loss during high-speed communication.
* **Configuration System**: Uses `ModbusConfig.h` to allow developers to toggle features like TCP or USB support to optimize memory footprint.

### Use Cases

This library is ideal for:
- **Industrial Automation**: Implementing Modbus RTU slaves on custom STM32-based PLCs or sensor nodes to interface with industrial HMI panels.
- **Protocol Gateways**: Creating Modbus TCP-to-RTU bridges that allow legacy serial devices to be monitored and controlled over Ethernet networks.
- **Remote Monitoring**: Using an STM32 as a Modbus Master to poll data from multiple power meters, solar inverters, or environmental sensors via RS485 daisy-chains.
- **Embedded HMI Integration**: Connecting STM32-driven displays (e.g., TouchGFX) to external controllers using Modbus as the primary data exchange protocol.

### Getting Started

To integrate the library, developers should import the `MODBUS-LIB` folder into their STM32CubeIDE project and create a `ModbusConfig.h` file based on the provided `ModbusConfigTemplate.h`. The project must have FreeRTOS (CMSIS_V2) enabled and the target USART configured with global interrupts and appropriate NVIC preemption priorities (typically 5 or higher). For TCP functionality, lwIP must be configured within CubeMX. Detailed setup instructions and board-specific examples for various NUCLEO and Discovery boards are available in the [Examples](https://github.com/alejoseb/Modbus-STM32-HAL-FreeRTOS/tree/master/Examples) directory of the repository.
