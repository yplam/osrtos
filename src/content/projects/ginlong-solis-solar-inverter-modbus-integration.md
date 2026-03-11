---
title: Ginlong Solis Solar Inverter Modbus Integration
summary: A comprehensive integration project for Ginlong Solis solar inverters, offering
  ESPHome and Arduino-based firmware to monitor and control inverter status via Modbus
  RS-485. It supports hardware like the ESP8266 and the Solis S3 WiFi stick, enabling
  local data export to Home Assistant and InfluxDB.
slug: ginlong-solis-solar-inverter-modbus-integration
codeUrl: https://github.com/hn/ginlong-solis
siteUrl: http://www.noerenberg.de/
star: 140
lastUpdated: '2025-11-02'
rtos: alios-things
libraries:
- lwip
topics:
- alios-things
- arduino
- esp8266
- esphome
- home-assistant
- libretiny
- modbus
- platformio-arduino
- rs485
- rtl8710bn
isShow: true
image: /202512/solis-esp8266-wiring.webp
createdAt: '2025-12-29'
updatedAt: '2025-12-29'
---

Interfacing with solar inverters for real-time monitoring is a key requirement for modern energy management. This project addresses this by providing a suite of tools to communicate with Ginlong Solis inverters via their Modbus RS-485 interface, bypassing proprietary cloud dependencies in favor of local control.

### Hardware Integration Paths

The project supports two primary hardware configurations for data extraction:

1.  **DIY ESP8266 Interface**: This approach uses a Wemos D1 mini or similar ESP8266 board paired with an RS485-to-serial adapter (such as the HW-0519 or XY-K485). This setup requires a proprietary Exceedconn connector to tap into the inverter's physical data port, allowing for a custom-built gateway.
2.  **Solis S3 WiFi Stick**: A significant portion of the project is dedicated to the analysis and repurposing of the official 3rd generation Solis WiFi stick. This hardware is based on the MXCHIP EMW3080 MCU (an ARM Cortex-M4F) and originally runs Alibaba's AliOS-Things. The repository provides detailed instructions for flashing this stick with custom ESPHome firmware, transforming it into a rugged, waterproof, and local-only monitoring node.

### Software Ecosystem

Several software components are available to facilitate data extraction and integration:

*   **ESPHome**: The project offers ready-to-use YAML configuration files for both ESP8266 and EMW3080 targets. These integrate seamlessly with Home Assistant, exposing sensors for power production, DC voltages, temperatures, and grid frequency. Advanced features include limiting inverter output power and synchronizing the internal inverter clock via NTP.
*   **Arduino**: For standalone logging, the `solis2influx.ino` sketch allows users to push inverter data directly to an InfluxDB database. It utilizes the `WiFiManager` library for easy network configuration and `ModbusMaster` for robust communication with the inverter hardware.
*   **Firmware Analysis Tools**: The repository includes specialized tools like `decode-alios-ota-firmware.pl` to analyze and validate AliOS-Things OTA firmware packages, which was instrumental in reverse-engineering the S3 stick's original operating system.

### Modbus Protocol and Register Mapping

Understanding Solis Modbus registers is critical for successful integration. Solis inverters utilize different register maps depending on the specific model. The project documents two main variations:

*   **INV Map**: Used by standard string inverters, typically utilizing registers in the 3xxx range.
*   **ESINV Map**: Used by energy storage (hybrid) inverters, typically utilizing registers in the 33xxx range.

The project includes logic to identify the inverter type by querying register 35000, ensuring that the correct data points are extracted regardless of the hardware model. This ensures compatibility across a wide range of Solis products, from standard residential inverters to complex hybrid storage systems.

### Replacing the Stock Firmware

A powerful feature of this integration is the ability to replace the cloud-dependent stock firmware on the S3 stick. By leveraging the LibreTiny framework, the project enables ESPHome to run on the EMW3080 MCU. This process involves putting the MCU into UART boot mode and using tools like `ltchiptool` to flash the new image. This transition moves the device from a cloud-based Alibaba IoT platform to a local-first architecture, significantly enhancing privacy and system reliability.

### Technical Deep Dive

The hardware in the S3 stick is surprisingly capable, featuring an 8MB flash module despite some official datasheets claiming only 2MB. The project provides a complete reconstruction of the flash partition table, identifying segments for the bootloader, recovery (2ndboot), application, and OTA storage. This level of technical detail allows developers to safely modify the system software while understanding the underlying memory architecture of the Realtek-based MCU.
