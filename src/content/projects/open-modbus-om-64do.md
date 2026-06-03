---
title: Open Modbus OM-64DO
summary: A compact industrial-grade 64-channel Modbus RTU output module based on the
  STM32G031 microcontroller. It features low-side drivers for switching DC loads up
  to 48V, per-channel LED indicators, and DIN-rail mounting compatibility. The module
  is fully configurable via Modbus holding registers and supports wide input voltages
  for industrial environments.
slug: open-modbus-om-64do
codeUrl: https://github.com/OpenModbus/OM-64DO
star: 11
lastUpdated: '2025-12-18'
rtos: ''
topics:
- automation
- expansion-board
- modbus
- modbus-rtu
- module
- pcb
- plc
- relay
- smarthome
isShow: true
image: /202601/om-64do.webp
createdAt: '2026-01-18'
updatedAt: '2026-01-18'
relatedProjects:
- ryattn-audio-relay-attenuator
- matter-esp32-modbus-adapter
- mongoose-os-configurable-sensor-node
- mbed-os-6-stm32-iot-ethernet-controller
- rp2040-dmxsun
- modbus-tcp-for-stm32f407
---

The **Open Modbus OM-64DO** is a robust, industrial-grade expansion module designed to provide 64 low-side digital outputs via the Modbus RTU protocol. Built around the STM32G031 microcontroller, this module is specifically engineered for applications requiring high-density I/O control, such as PLC expansion, building automation, and distributed control systems.

### Hardware Architecture

The module's design leverages a scalable architecture combining the processing power of an STM32G031 MCU with specialized peripheral ICs. It utilizes four MCP23S17 SPI-based I/O expanders to manage the 64 output signals. These signals drive eight TBD62083 Darlington transistor arrays, which act as the physical interface for switching DC loads.

Each output is an open-collector low-side driver capable of sinking up to 500mA, with a total capacity of 2A per driver package. The module supports a wide range of load voltages, recommended between 5V and 48V DC, making it versatile for driving relays, solenoids, indicator lamps, and alarms.

### Modbus RTU Communication

Communication is handled via a robust RS-485 interface using the THVD1450 transceiver, ensuring reliable data transmission even over long cable runs in noisy industrial environments. The module implements the standard Modbus RTU protocol, allowing it to be easily integrated into existing industrial networks.

Users can control individual outputs by writing to Modbus coils (Function Codes 0x01, 0x05, 0x0F). Additionally, the module features non-volatile configuration storage through holding registers. This allows for field-reconfiguration of serial parameters, including baud rate (up to 115200), parity, and slave address, without needing to reflash the firmware.

### Industrial Design and Wiring

The OM-64DO is designed for practical industrial deployment. It features a compact PCB footprint (163.1 x 72 mm) compatible with the UM72S DIN-rail profile. For ease of installation, it uses DEGSON pluggable screw terminals.

A key feature of the module is its banked output structure. The 64 outputs are divided into four banks (A through D) of 16 channels each. This design allows users to drive devices with different supply voltages simultaneously on a single board. For example, Bank A could control 24V relays while Bank B manages 12V indicators, provided all power supplies share a common ground with the module.

### Safety and Monitoring

To aid in troubleshooting and status monitoring, every output channel is equipped with a dedicated LED indicator that mirrors the state of the driver. The module also includes integrated flyback diodes within the Darlington arrays to protect against inductive voltage spikes from coils and motors. With a wide input supply range of 7V to 28V DC and high-efficiency power regulation via an R-78E3.3-1.0 regulator, the OM-64DO is built for continuous operation in demanding automation environments.
