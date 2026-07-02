---
title: ESPHome Modbus TCP to RTU Bridge
summary: A transparent Modbus TCP-to-RTU bridge component for ESPHome, targeting ESP8266
  and ESP32 platforms. It facilitates communication between multiple Modbus TCP clients
  and serial Modbus RTU slaves using RS-485 or UART hardware, featuring full integration
  with Home Assistant for monitoring and control.
slug: esphome-modbus-tcp-to-rtu-bridge
codeUrl: https://github.com/rosenrot00/esphome_modbus_bridge
star: 27
lastUpdated: '2026-01-26'
rtos: freertos
topics:
- esp32
- esp8266
- esphome
- home-assistant
- modbus
- modbus-bridge
- modbus-rtu
- modbus-tcp
- rs485
- rs485-to-ethernet
- rs485-to-wifi
isShow: false
createdAt: '2026-01-27'
updatedAt: '2026-01-27'
relatedProjects:
- esphome-deye-inverter
- multiple-jk-bms-modbus-rs485-integration
- simplebus2-mqtt-bridge
- solar2mqtt
- ginlong-solis-solar-inverter-modbus-integration
- esp32-uart-bridge
---

## Bridging Industrial Protocols with ESPHome

The ESPHome Modbus TCP to RTU Bridge is a specialized component designed to bridge the gap between modern Ethernet/Wi-Fi networks and traditional industrial serial communication. By acting as a transparent gateway, it allows standard Modbus TCP clients—such as Home Assistant, SCADA systems, or custom scripts—to interact with Modbus RTU slave devices over a serial interface. This is particularly useful for integrating industrial hardware like solar inverters, heat pumps, and power meters into a smart home or automation ecosystem.

## Technical Capabilities

The bridge operates by listening on a configurable TCP port (defaulting to 502) for standard Modbus TCP frames. When a request is received, the component extracts the payload, translates it into a Modbus RTU frame, and transmits it via the ESP device's UART. Once the RTU slave responds, the bridge performs the reverse translation and sends the data back to the TCP client. 

**Key technical features include:**
- **Concurrent Client Support:** The bridge can handle multiple simultaneous TCP connections with built-in preemption logic to manage slot limits.
- **RS-485 Control:** It provides native support for RS-485 transceivers, including configurable Driver Enable (DE) and Receiver Enable (/RE) pins, which can be shared or separate.
- **Silence-Based Detection:** RTU frame ends are detected via UART silence, ensuring compatibility with various baud rates without requiring explicit byte counts.
- **Home Assistant Integration:** The bridge exposes various diagnostic metrics to Home Assistant, such as TCP client counts, RTU timeouts, and connection drops, allowing for robust monitoring of the communication bus.

## Hardware Implementation

The project is compatible with both ESP8266 and ESP32 microcontrollers. To interface with Modbus RTU devices, an RS-485 transceiver (such as the MAX3485 or SP3485) is typically required. The bridge manages the hardware flow control necessary for half-duplex RS-485 communication, ensuring the transceiver is in the correct state for transmitting or receiving data.

## Configuration and Usage

Integrating the bridge into an ESPHome project is done via the `external_components` block. Users can define the UART parameters (TX/RX pins, baud rate) and then configure the `modbus_bridge` component to link that UART to the TCP server. 

```yaml
external_components:
  - source:
      type: git
      url: https://github.com/rosenrot00/esphome_modbus_bridge
    components: [modbus_bridge]

uart:
  id: uart_bus
  tx_pin: GPIO17
  rx_pin: GPIO16
  baud_rate: 9600

modbus_bridge:
  id: mb_bridge
  uart_id: uart_bus
  tcp_port: 502
  rtu_response_timeout: 3000
```

Beyond the embedded component, the repository includes `modbus_rw.py`, a Python utility based on the `pymodbus` library. This tool serves as a convenient diagnostic aid, allowing developers to read and write registers directly from a workstation to verify that the bridge and the downstream RTU devices are functioning correctly.

## Proven Compatibility

The component has been successfully tested with a variety of hardware integrations, including Nilan ventilation systems, Solarman inverters, Marstek Venus batteries, and SolaX Modbus setups. Its flexibility with function codes and CRC handling (including optional byte swapping) makes it a versatile tool for diverse industrial and hobbyist applications.
