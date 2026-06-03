---
title: KW1281 Diagnosis Tool
summary: A diagnostic tool for older VAG (Volkswagen Auto Group) vehicles implementing
  the KW1281 protocol. Built on the Zephyr RTOS, it provides a shell-based interface
  for scanning targets, reading fault codes, and monitoring measurement groups via
  USB or serial connections.
slug: kw1281-diagnosis-tool
codeUrl: https://github.com/jonnykl/kw1281-diag
star: 8
lastUpdated: '2021-10-26'
rtos: zephyr
topics:
- diagnosis
- kw1281
- obd
- vag
- zephyr
isShow: false
createdAt: '2025-12-29'
updatedAt: '2025-12-29'
relatedProjects:
- sel4-hobd-prototype-system
- i2c-scanner-for-m5cardputer
- mkdbg-embedded-crash-diagnostics-over-uart
- zephyr-wi-fi-and-tcp-udp-connection-demo
- cannectivity
- openhaldex-esp32-c6-haldex-controller
---

The KW1281 diagnosis tool is an open-source utility designed for interacting with older Volkswagen Auto Group (VAG) vehicles. It implements the KW1281 protocol, which was the standard diagnostic protocol for many VW, Audi, Seat, and Skoda models before the industry-wide transition to KWP2000 and CAN-based diagnostics.

Built on the Zephyr RTOS, the project leverages the platform's modularity and hardware abstraction layers to provide a robust diagnostic interface. The tool is primarily interacted with through the Zephyr shell module, allowing users to issue commands directly over a serial or USB connection in a terminal environment.

### Key Features and Capabilities

The tool provides several essential diagnostic functions required for maintaining and troubleshooting older vehicles:

- **Target Scanning**: Identify available electronic control units (ECUs) within the vehicle network.
- **Fault Code Management**: Read and clear Diagnostic Trouble Codes (DTCs) to diagnose mechanical or electrical issues.
- **Measurement Groups**: Real-time monitoring of sensor data and internal ECU parameters, such as engine RPM, coolant temperature, or mass air flow.
- **Basic Settings**: Perform adaptations and basic settings, which are often required after replacing components or performing specific maintenance tasks like throttle body alignment.
- **Raw Block Communication**: For advanced users, the tool supports sending raw blocks to the ECU for low-level protocol interaction and debugging.

### Technical Architecture

The project is structured as a Zephyr application, utilizing the RTOS's built-in features for task management and hardware interfacing. The core logic is split between the main application entry point and a dedicated protocol implementation (`kw1281.c`). The use of Zephyr's shell module (`CONFIG_SHELL`) provides a professional command-line interface with features like command completion and help text.

Hardware integration is handled through Zephyr's driver model. The configuration indicates support for several key embedded features:

- **USB Device Stack**: The tool can act as a USB device, specifically using the CDC ACM class to provide a virtual COM port for easy connection to modern computers.
- **Serial Console**: Traditional UART communication is supported for hardware that doesn't use USB directly.
- **GPIO**: General-purpose I/O control for signaling or hardware-level protocol timing required by the K-Line physical layer.

### Getting Started

As a Zephyr-based project, it follows the standard Zephyr build system using CMake. The project requires a configured Zephyr development environment. Once built and flashed to a supported microcontroller, the diagnostic interface becomes available via the configured shell backend (typically a USB serial port). 

Users connect the hardware to the vehicle's K-line diagnostic port to begin communication. The tool's prompt (`kw1281-diag: `) provides immediate feedback, and the built-in help commands offer guidance on available diagnostic functions. This makes it a lightweight and portable alternative to bulky dedicated diagnostic hardware for enthusiasts and developers working with classic VAG platforms.
