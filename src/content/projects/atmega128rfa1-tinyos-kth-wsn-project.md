---
title: ATmega128RFA1 TinyOS KTH WSN Project
summary: A comprehensive suite of TinyOS applications and drivers specifically designed
  for the ATmega128RFA1 microcontroller. It includes sensor applications, radio communication
  tests, and serial port drivers developed for wireless sensor network (WSN) research
  at KTH.
codeUrl: https://github.com/alpsayin/atmega128rfa1-tinyos-kth-wsn
isShow: false
rtos: tinyos
libraries: []
topics:
- atmega128rfa1
- tinyos
- wsn
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- tinyos-apps-for-msp430f5529
- tinyos-nesc-telosb-programs
- building-wireless-sensor-networks-with-openthread
- wireless-sensor-network-and-tinyos-documentation
- sx128x-lora-transceiver-driver-for-contiki-ng
- nrf24-driver-for-contiki-os
---

The **atmega128rfa1-tinyos-kth-wsn** repository is a specialized collection of software components and applications built for the ATmega128RFA1, a popular microcontroller that integrates an AVR core with a 2.4GHz IEEE 802.15.4 radio. Developed within the context of Wireless Sensor Network (WSN) research at KTH Royal Institute of Technology, this project provides a robust foundation for building low-power wireless applications using the TinyOS operating system.

## Project Overview and Architecture

This project is structured around the TinyOS component model, utilizing the nesC programming language. It serves as both a development playground and a production-ready codebase for WSN deployments. The repository includes several sub-projects ranging from low-level hardware tests to complex application-level logic. 

One of the most significant parts of the repository is the `modified-tinyos-main` directory. This contains specific modifications to the core TinyOS library required to support the ATmega128RFA1 platform effectively. These modifications cover chip-specific drivers and platform configurations that may not be present in the standard TinyOS distribution.

## Key Applications and Components

### SensorAppC: The Core Application
The flagship application in this repository is `SensorAppC`. This is the primary software intended for deployment on ATmega128RFA1 nodes. It follows the standard nesC pattern of separating configuration (`C` files) from implementation (`P` files). 

Key files within this application include:
- **bb.nc**: The top-level component that wires the system together.
- **ControllerP.nc**: Manages the high-level logic and state transitions.
- **SensorSubsystemP.nc**: Handles data acquisition from the hardware sensors.
- **RadioSubsystemP.nc**: Manages wireless communication and packet handling.

### Communication and Serial Forwarding
To bridge the gap between the wireless sensor network and a host computer (such as an Alix board), the project includes the `SerialPacketForwarder`. This component is designed to reliably move data between the radio interface and the serial port, allowing for real-time monitoring and command injection from a PC or gateway.

### Hardware Testing and Validation
Before deploying complex logic, the project provides several utility applications to validate hardware functionality:
- **AdcTest**: A modified version of the classic TinyOS 'Blink' application that adds ADC driver testing via `PlatformSensorC` and outputs data over `PlatformSerialC`.
- **RadioCountToLedsAM**: A test project for radio connectivity, based on standard TinyOS dissemination and collection templates.
- **SerialPortNoTiny**: For developers needing to debug hardware without the abstraction of an OS, this directory contains a pure C project for testing the ATmega128RFA1 serial port.

## Technical Details and Packet Handling

The project uses a unified header file, `packet_types.h`, which defines the communication protocol used across the entire system. This file is shared between the TinyOS code running on the nodes and the C/Python programs running on the gateway (Alix) side. It defines structures for commands, status updates, and data packets, ensuring consistency across the network.

### Example Makefile Integration

The project integrates with the TinyOS-Plugin for Eclipse, but also maintains standard Makefiles for command-line builds. A typical `Makefile` in the project looks like this:

```makefile
COMPONENT=RadioCountToLedsAppC
BUILD_EXTRA_DEPS = RadioCountMsg.py RadioCountMsg.class
CLEAN_EXTRA = RadioCountMsg.py RadioCountMsg.class RadioCountMsg.java

RadioCountMsg.py: RadioCountToLeds.h
	mig python -target=$(PLATFORM) $(CFLAGS) -python-classname=RadioCountMsg RadioCountToLeds.h radio_count_msg -o $@

include $(MAKERULES)
```

This snippet demonstrates the use of `mig` (Message Interface Generator) to automatically create Python and Java bindings for the network packets defined in C headers, facilitating easy integration with high-level monitoring tools.

## Getting Started

To use this project, developers typically need to:
1. Set up a TinyOS development environment.
2. Apply the modifications found in `modified-tinyos-main` to their local TinyOS installation using the provided scripts.
3. Navigate to a specific application directory (like `SensorAppC/src`) and run `make <platform>` to compile the hex file for the ATmega128RFA1 target.
