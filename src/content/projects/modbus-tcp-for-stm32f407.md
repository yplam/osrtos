---
title: Modbus TCP for STM32F407
summary: A Modbus TCP implementation for STM32F407 microcontrollers utilizing FreeRTOS
  and the lwIP stack. It provides a standardized TCP interface for industrial communication,
  supporting common read/write commands and robust error handling for automation equipment.
slug: modbus-tcp-for-stm32f407
codeUrl: https://github.com/a-int/ModbusTCP
star: 13
lastUpdated: '2025-05-08'
rtos: freertos
libraries:
- lwip
topics:
- cubeide
- ethernet
- freertos
- lwip
- modbus
- modbus-server
- modbus-tcp
- rtos
- stm32
- stm32f4
- tcp
isShow: false
createdAt: '2026-03-07'
updatedAt: '2026-03-07'
---

## Overview

Modbus TCP/IP is a cornerstone of industrial communication, serving as a variant of the Modbus family designed specifically for supervision and control over Ethernet networks. This project implements a Modbus TCP server on the STM32F407VETx microcontroller, bridging the gap between high-level application messaging and reliable Ethernet-based data exchange. By providing a standardized TCP interface, it allows Modbus devices to communicate seamlessly across different network types, making it ideal for industrial automation, energy management, and remote monitoring.

## Technical Implementation

The project is built upon a robust embedded stack, leveraging **FreeRTOS** for task management and the **lwIP** (Lightweight IP) stack for networking. The hardware configuration targets the STM32F407, utilizing an RMII interface for Ethernet connectivity. The core logic is partitioned into distinct modules for clarity and maintainability:

- **modbus.c/h**: Handles the parsing of Modbus frames, error checking, and protocol-specific logic.
- **tcpserver.c**: Manages the underlying TCP connections and data streaming using lwIP.

All parsing and error checking are performed on-site within the library. The architecture is designed to be extensible; users simply need to implement specific callback functions to link the Modbus registers to their actual data sources or hardware peripherals.

## Key Features & Capabilities

The implementation supports the most common Modbus function codes required for industrial interfacing:

- **Read Commands**: Support for reading coils (0x01), discrete inputs (0x02), holding registers (0x03), and input registers (0x04).
- **Write Commands**: Support for writing single coils (0x05) and single holding registers (0x06).
- **Error Handling**: Built-in handlers for unsupported commands (0x01), illegal data addresses or quantities (0x02), and illegal data values (0x03).

## Integration and Usage

To integrate this Modbus implementation into a project, developers interact with a set of predefined functions. These functions act as the interface between the Modbus protocol logic and the application's data storage:

```c
// Functions for reading commands
void read_coils(char* repl_buf, uint16_t address, uint16_t quantity);
void read_discrete(char* repl_buf, uint16_t address, uint16_t quantity);
void read_holdings(char* repl_buf, uint16_t address, uint16_t quantity);
void read_inputs(char* repl_buf, uint16_t address, uint16_t quantity);

// Functions for writing commands
void write_single_coil(uint16_t address, uint16_t val);
void write_single_holding(uint16_t address, uint16_t val);
```

By populating these functions with concrete actions—such as reading from a local array or toggling a GPIO pin—the STM32 becomes a fully functional Modbus TCP server capable of communicating with PLCs, SCADA systems, or PC-based diagnostic tools.

## Hardware Configuration

The project includes an STM32CubeMX configuration file (`ModbusTCP.ioc`), which details the peripheral setup. The system clock is configured for 168 MHz, with the Ethernet peripheral set to RMII mode and the lwIP stack configured with a static IP (defaulting to `192.168.1.101`). This provides a solid foundation for developers looking to deploy Modbus TCP in real-world industrial environments where reliability and timing are critical.
