---
title: SX127X LoRa Transceiver Driver for Contiki-NG
summary: A specialized device driver for Semtech SX127X LoRa transceivers designed
  for the Contiki-NG operating system. It features specific optimizations for the
  TSCH (Time-Slotted Channel Hopping) protocol and provides a portable SPI-based interface
  for various embedded platforms.
slug: sx127x-lora-transceiver-driver-for-contiki-ng
codeUrl: https://github.com/tperale/sx127x
star: 1
lastUpdated: '2022-04-11'
rtos: contiki-ng
topics:
- contiki
- contiki-ng
- lora
- sx1272
- tsch
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- sx128x-lora-transceiver-driver-for-contiki-ng
- contiki-lora-tsch-project
- nrf24-driver-for-contiki-os
- kratos-contiki-os-for-lora
- ql-tsch-implementation-for-contiki-ng
- kw41z-rf-driver-for-arm-mbed-nanostack
---

The SX127X LoRa transceiver driver is a dedicated implementation for the Contiki-NG operating system, specifically designed to bridge the gap between low-power wide-area network (LPWAN) hardware and modern wireless sensor network protocols. Originally developed to study the effectiveness of the Time-Slotted Channel Hopping (TSCH) protocol in conjunction with LoRa technology, this driver provides the necessary abstractions to use Semtech SX1272/SX1276 radios within the Contiki-NG ecosystem.

## Advanced TSCH Integration

One of the primary motivations behind this project is the integration of LoRa with the TSCH MAC protocol. Because LoRa modulation typically involves longer transmission times than standard IEEE 802.15.4 radios, standard TSCH implementations often require modification. This driver works alongside a patched version of Contiki-NG to allow for longer timeslots and more precise transmission duration calculations. This enables researchers and developers to leverage the long-range capabilities of LoRa while maintaining the reliability and interference-avoidance benefits of time-slotted channel hopping.

## Architecture and Hardware Support

The driver is designed to be modular and portable. While it was initially developed and tested on the Zolertia RE-MOTE (a CC2538-based development board), the implementation is structured to work with any platform supported by Contiki-NG. Hardware abstraction is handled through a set of SPI configuration definitions, allowing users to map the driver to their specific pinout by defining the SPI controller, SCK, MISO, MOSI, and Chip Select pins in their project configuration.

## Usage and Configuration

Integrating the driver into a Contiki-NG project is handled through the standard module system. By including the source directory in the project Makefile, the driver becomes available to the system. To use the driver as the primary radio interface, it is defined in the `project-conf.h` file:

```c
#define NETSTACK_CONF_RADIO sx1272_radio_driver
```

For TSCH-specific applications, the driver supports custom hopping sequences and packet duration calculations, which are critical for maintaining synchronization in a LoRa-based TSCH network:

```c
#define TSCH_CONF_DEFAULT_HOPPING_SEQUENCE (uint8_t[]){ 0, 1, 2 }
extern int tsch_packet_duration(size_t len); 
#define TSCH_PACKET_DURATION(len) tsch_packet_duration(len) 
```

## Technical Pedigree

The implementation draws inspiration from the RIOT-OS SX127X radio driver, known for its robustness, and shares goals with other community efforts to bring LoRa capabilities to Contiki-NG. By providing a bridge to the Contiki NETSTACK, this driver enables LoRa hardware to participate in standard IPv6/6LoWPAN networking, opening up new possibilities for long-range IoT deployments.
