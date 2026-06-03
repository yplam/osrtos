---
title: SX128X LoRa Transceiver Driver for Contiki-NG
summary: A dedicated driver for the Semtech SX128x series of LoRa transceivers, specifically
  designed for the Contiki-NG operating system. It enables the use of the TSCH (Time-Slotted
  Channel Hopping) protocol over LoRa for low-power wide-area network research and
  applications.
slug: sx128x-lora-transceiver-driver-for-contiki-ng
codeUrl: https://github.com/tperale/sx128x
star: 3
lastUpdated: '2022-04-04'
rtos: contiki-ng
topics:
- c
- contiki-ng
- lora
- lora24
- sx1280
- sx128x
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- sx127x-lora-transceiver-driver-for-contiki-ng
- contiki-lora-tsch-project
- nrf24-driver-for-contiki-os
- kratos-contiki-os-for-lora
- kw41z-rf-driver-for-arm-mbed-nanostack
- ql-tsch-implementation-for-contiki-ng
---

The SX128X driver provides a specialized interface for Semtech's SX128x series of LoRa transceivers within the Contiki-NG ecosystem. Developed primarily as a research tool, this driver facilitates the exploration of Time-Slotted Channel Hopping (TSCH) protocols in conjunction with LoRa modulation, a combination that offers unique possibilities for robust, long-range, and low-power wireless networking.

## Bridging LoRa and TSCH

While LoRa is traditionally used in star topologies like LoRaWAN, this driver enables the use of the TSCH protocol (RFC 7554) on LoRa hardware. TSCH is a medium access control (MAC) layer protocol known for its high reliability and energy efficiency in industrial IoT applications. By bringing TSCH support to the SX128x, this project allows developers to leverage the long-range capabilities of LoRa while benefiting from the deterministic scheduling and interference avoidance of time-slotted channel hopping.

## Integration with Contiki-NG

The driver is designed to be a first-class citizen in the Contiki-NG network stack. It integrates directly into the `NETSTACK` architecture, allowing it to serve as the radio driver for the entire system. 

To use the driver, it must be declared in the project's `Makefile` by adding the source directory to the modules list:

```makefile
MODULES += $(CONTIKI_NG_DRIVERS_DIR)/sx128x/src
```

Furthermore, the radio driver must be specified in the `project-conf.h` file to ensure the network stack utilizes the SX128x hardware correctly:

```c
#define NETSTACK_CONF_RADIO sx128x_radio_driver
```

## Project Structure and Usage

The repository is structured to work seamlessly with Contiki-NG, often included as a submodule. The core implementation is found within the `src` directory, which handles the low-level SPI communication, register configuration, and radio state management required to operate the SX128x transceiver.

For developers looking to get started, the repository includes an `examples` folder. These examples demonstrate how to initialize the radio, configure LoRa parameters, and integrate the driver into a standard Contiki-NG process. This driver is particularly useful for researchers and engineers looking to push the boundaries of what is possible with LoRa hardware beyond standard LoRaWAN implementations, specifically in the realm of mesh networking and synchronized communication.
