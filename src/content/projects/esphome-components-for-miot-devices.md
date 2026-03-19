---
title: ESPHome Components for MIoT Devices
summary: A collection of custom ESPHome components designed for Xiaomi MIoT devices
  that utilize the MIoT Serial Communication protocol. It enables users to replace
  proprietary cloud-dependent firmware with open-source alternatives for local control
  of air purifiers, fans, and humidifiers via Home Assistant.
slug: esphome-components-for-miot-devices
codeUrl: https://github.com/dhewg/esphome-miot
siteUrl: https://esphome.io/
star: 174
lastUpdated: '2026-01-23'
rtos: freertos
libraries:
- platformio-platformio-core
topics:
- esphome-component
- home-assistant
- iot
- miot
- smart-home
isShow: true
image: /202603/esphome-miot.webp
createdAt: '2026-03-19'
updatedAt: '2026-03-19'
---

## Liberating Xiaomi MIoT Devices from the Cloud

The ESPHome MIoT project provides a suite of components designed to bring local control to Xiaomi MIoT devices. Many modern smart home appliances from the Xiaomi ecosystem adhere to the Xiaomi MIoT Serial Communication protocol. These devices typically feature a dual-microcontroller architecture: one MCU handles the low-level hardware control (like motor speeds or sensor readings), while a second MCU acts as the LAN/cloud gateway. By replacing the firmware on the gateway MCU with ESPHome, users can effectively "liberate" their devices from vendor-specific cloud dependencies.

## Technical Architecture

This project leverages the ESPHome framework to communicate with the device's internal hardware controller. Because the hardware control logic remains on the original manufacturer's MCU, the ESPHome firmware acts as a bridge, translating MIoT protocol messages into standard ESPHome entities. This approach ensures that the safety and operational logic of the device (such as overheat protection in a heater or motor stall detection in a fan) remains intact while providing a completely open interface for the user.

### The MIoT Protocol

The communication is based on Service IDs (SIID) and Property IDs (PIID). Each device defines a specific set of services and properties that can be read from or written to. For example, a fan might have a service for the motor (SIID 2) and a property for the fan speed (PIID 1). This project allows users to map these IDs directly into ESPHome YAML configurations.

## Supported Hardware and Compatibility

The repository includes pre-configured YAML files for a wide variety of popular Xiaomi devices, including:

- **Air Purifiers**: Mi Air Purifier 3/3H, 3C, Pro H, and the Smart Air Purifier 4 series (Lite, Pro, Elite).
- **Humidifiers**: Mi Smart Antibacterial Humidifier and Smartmi Evaporative Humidifier 2.
- **Fans**: Mi Smart Standing Fan 2, 2 Lite, and 2 Pro.
- **Pet Supplies**: Xiaomi Smart Pet Food Feeder.

### Hardware Limitations

It is important to note that not all Xiaomi devices are compatible. The project specifically targets devices with a dedicated gateway MCU that can be flashed with ESPHome. Devices that use a proprietary Xiaomi WiFi microcontroller (such as the MHCW02P or MHCWB2P) are currently unsupported because they are not compatible with the PlatformIO or ESPHome build chains. Additionally, older devices using the legacy `miio` protocol are not compatible with these specific components.

## Integration and Usage

Since these components are built for ESPHome, integration with Home Assistant is native and instantaneous. Once the firmware is flashed, the device appears as a standard ESPHome node, exposing sensors, switches, and fans directly to the Home Assistant dashboard. 

For users looking to add support for new devices, the project recommends using the `miot2esphome` utility. This tool can automatically generate a starter configuration by parsing the official MIoT specifications for a specific model. Users can then refine the generated YAML to match their specific needs and contribute the configuration back to the community via a Pull Request.
