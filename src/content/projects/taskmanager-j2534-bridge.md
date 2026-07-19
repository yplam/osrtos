---
title: Taskmanager J2534 Bridge
summary: An open-source implementation of the SAE J2534-1 v04.04 PassThru standard,
  designed to connect STM32F407-based CAN adapters to professional vehicle diagnostic
  software. The project includes a C# Win32 DLL for protocol handling and a FreeRTOS-based
  ESP32 simulator for bench validation.
slug: taskmanager-j2534-bridge
codeUrl: https://github.com/gorevyoneticisi/taskmanager-j2534
version: v1.0.4
lastUpdated: '2026-06-09'
licenses:
- NOASSERTION
image: /202607/taskmanager-j2534_0.avif
rtos: freertos
topics:
- automotive
- can-bus
- diagnostics
- j2534
- obd2
- stm32
- windows
isShow: true
createdAt: '2026-07-18T14:33:49+00:00'
updatedAt: '2026-07-18T14:33:49+00:00'
relatedProjects:
- cannectivity
- esp-can-analyzer
- toyota-rav4-climate-control-panel-lin-bus-interface
- kw1281-diagnosis-tool
- bmw-idrive-controller-can-bus-interpreter
- sel4-hobd-prototype-system
---

Professional vehicle diagnostic interfaces are notoriously expensive and often locked to specific manufacturer software. The Taskmanager J2534 Bridge aims to break this cycle by providing an open, galvanically-isolated adapter that speaks the universal J2534 standard used by original equipment manufacturers (OEMs). By implementing the PassThru API in software, this project allows users to run actual dealer software like Toyota Techstream, VW ODIS, and Ford IDS using custom, affordable hardware.

### The Architecture: Software-Heavy, Firmware-Light

The project follows a deliberate design philosophy: keep the hardware firmware simple and move the complex protocol logic to the PC. The STM32F407-based firmware acts as a thin UART-to-CAN bridge, moving raw CAN frames at high speeds (921600 baud) without making protocol decisions. 

All the "intelligence" resides in the `TaskmanagerBridge.dll`, written in C# and targeting .NET Framework 4.7.2. This DLL handles the heavy lifting of the J2534-1 v04.04 specification, including:
- **ISO15765-2 Transport Layer**: Managing segmentation, reassembly, and flow control (SF/FF/CF/FC).
- **Message Filtering**: Implementing PASS, BLOCK, and FLOW_CONTROL filters per channel.
- **Channel Management**: Supporting simultaneous CAN and ISO15765 communication.
- **Periodic Messages**: Utilizing high-precision system timers to maintain heartbeat signals required by various ECUs.

### Hardware Stack and Connectivity

The current hardware iteration (v1) utilizes a robust stack designed for automotive environments. It features an STM32F407VET6 microcontroller paired with an FT232H USB-to-UART adapter. To protect the PC from voltage spikes on the vehicle side, the design includes galvanic isolation via an ADuM1201 digital isolator and an SN65HVD230 CAN transceiver. 

While the current version supports 11-bit standard CAN IDs, the repository outlines a clear roadmap for Hardware v2. This future iteration aims to move to native USB transport (WinUSB Bulk endpoints) to eliminate UART latency and add support for 29-bit extended IDs, CAN FD, and K-line protocols.

### Bench Testing with the ESP32 Simulator

One of the most useful components of this repository is the included ESP32-based OBD2 simulator. Since testing diagnostic tools on a live vehicle can be risky or inconvenient, the simulator provides a safe environment for development. Running on FreeRTOS, the simulator uses the ESP32's native TWAI (Two-Wire Automotive Interface) driver to act as a vehicle ECU. 

Developers can connect to the simulator via Wi-Fi to adjust live engine parameters and manage Diagnostic Trouble Codes (DTCs) through a web-based control panel. This allows for end-to-end validation of the J2534 DLL's timing and protocol handling before the hardware ever touches an actual OBD2 port.

### Protocol Implementation and Compatibility

The bridge is specifically focused on modern CAN and ISO15765 (UDS) diagnostics. It has been confirmed to work with several major dealer tools:
- **Toyota Techstream**: Fully confirmed for VIM connection and diagnostics.
- **VW ODIS**: Confirmed working for VAG group vehicles.
- **Ford IDS**: Confirmed for CAN-based Ford and Lincoln vehicles.

Because the DLL handles ISO-TP segmentation on the PC side, it provides significant flexibility. For instance, it supports configurable padding values (`ISO15765_FRAME_PAD_VAL`), which is a strict requirement for BMW ISTA compatibility. However, users should note that the current hardware does not support legacy protocols like K-line or specialized GM protocols like SWCAN, though these are planned for future updates.
