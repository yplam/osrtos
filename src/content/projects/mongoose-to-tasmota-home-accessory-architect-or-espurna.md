---
title: Mongoose to Tasmota, Home Accessory Architect or ESPurna
summary: A minimal intermediate firmware for OTA flashing target firmwares like Tasmota,
  HAA, or ESPurna onto Shelly devices. Built on Mongoose OS, it provides a bridge
  for migrating ESP8266-based smart home hardware from stock firmware to open-source
  alternatives.
slug: mongoose-to-tasmota-home-accessory-architect-or-espurna
codeUrl: https://github.com/yaourdt/mgos-to-tasmota
star: 425
version: release-v0.4.6
lastUpdated: '2023-02-16'
rtos: mongoose-os
libraries:
- spiffs
topics:
- firmware
- mongoose-os
- shelly
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- tasmota-to-mongoose-os-converter
- shelly-to-haa-firmware-converter
- sonoff-http-firmware
- mongoose-os-configurable-sensor-node
- mongoose-os
- sonoff-basic-firmware-for-openhab
---

The `mgos-to-tasmota` project serves as a specialized bridge for smart home enthusiasts looking to migrate their Shelly devices from the stock Mongoose OS-based firmware to alternative platforms like Tasmota, Home Accessory Architect (HAA), or ESPurna. This transition is often desired to gain local control, improve privacy, or integrate devices into ecosystems like HomeKit or Home Assistant without relying on proprietary cloud services.

## The Migration Bridge

At its core, this project provides a minimal intermediate firmware. Because direct OTA flashing between significantly different firmware architectures can be risky or impossible due to partition layout differences, this intermediate step prepares the device and handles the download and installation of the final target image. It essentially acts as a specialized bootloader and installer that runs within the existing Mongoose OS environment of a Shelly device.

## Supported Hardware and Targets

The firmware is highly versatile, supporting a wide array of ESP8266-based Shelly models, including:

- **Relays**: Shelly 1, 1PM, 2, 2.5, 1L, and Uni.
- **Plugs**: Shelly Plug S, Plug US, and Plug 2.
- **Lighting**: Shelly RGBW2, Dimmer 1/2, Bulb, Vintage, and Duo.
- **Sensors**: Shelly EM, H&T, and i3.

Users can choose between three primary target firmwares:

1. **Tasmota**: A popular all-in-one firmware for ESP8266 devices with extensive sensor and protocol support.
2. **Home Accessory Architect (HAA)**: Specifically designed for native Apple HomeKit integration without a bridge.
3. **ESPurna**: A feature-rich firmware focusing on power monitoring and MQTT integration.

## Technical Implementation

The project is built using the **Mongoose OS** framework. The configuration is managed via a `mos.yml` file, which defines specific build variables for each Shelly model, such as flash size, filesystem size (using **SPIFFS**), and boot configuration addresses. This ensures that the intermediate firmware respects the specific memory map of the target hardware.

For example, a build for a Shelly 1PM uses specific build variables to define the SPIFFS layout and flash size:

```yaml
- when: build_vars.MODEL == "Shelly1PM"
  apply:
    name: switch1pm
    build_vars:
      FS_SIZE: 262144
      FLASH_SIZE: 2097152
      BOOT_CONFIG_ADDR: 0x1000
      MGOS_ROOT_FS_TYPE: SPIFFS
```

## Deployment and Safety

The migration can be initiated through a simple HTTP GET request to the Shelly's stock OTA update endpoint, pointing it to the hosted ZIP files of this intermediate firmware. Alternatively, the project includes a Python-based "automagic" flashing script (`flash-shelly.py`) that can discover Shelly devices on the local network and automate the conversion process.

Recognizing the risks of OTA bootloader modification, the firmware includes a safety mechanism: if the device fails to connect to the primary Wi-Fi after flashing, it attempts to connect to a backup recovery network (SSID: `mgos-recover`, Password: `RJoPuKC3u5`) to allow the user to regain control and prevent bricking.

## Building from Source

Developers can customize or build the firmware themselves using the `mos` tool. By specifying the model and target firmware as build variables, the system generates a tailored binary:

```bash
mos build --build-var MODEL=Shelly1 --build-var TARGETFW=tasmota --platform esp8266
```

This flexibility allows for the addition of new models or the adjustment of default firmware URLs as needed, making it a powerful tool for the ESP8266 smart home community.
