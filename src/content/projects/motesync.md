---
title: MoteSync
summary: MoteSync is a wireless sensor network project designed for detecting the
  epicenter of a sound source. It utilizes the Contiki-NG operating system and targets
  Zolertia hardware, specifically the Remote-revB platform with CC1200 radio drivers.
slug: motesync
codeUrl: https://github.com/jebentancour/MoteSync
star: 0
lastUpdated: '2018-11-15'
rtos: contiki-ng
topics:
- contiki-os
- re-mote
isShow: false
createdAt: '2025-12-31'
updatedAt: '2025-12-31'
relatedProjects:
- low-power-wireless-networking-for-iot-lpiot
- networked-embedded-systems-nes-project
- project-astra-asset-tracking
- atmega128rfa1-tinyos-kth-wsn-project
- thingbot-subghz
- esp-ppb
---

MoteSync is an embedded systems project focused on the detection of a sound source's epicenter using a wireless sensor network (WSN). By leveraging distributed sensors, the system can triangulate or estimate the origin of acoustic signals within a monitored area, making it a valuable tool for environmental monitoring and acoustic research.

The project is built upon the **Contiki-NG** operating system, a leading open-source OS for the Internet of Things. Contiki-NG provides the necessary networking stack and low-power capabilities required for wireless sensor nodes to communicate effectively while maintaining energy efficiency.

### Hardware and Platform

MoteSync is specifically designed to run on **Zolertia** hardware, with a focus on the **Zoul** module and the **Remote-revB** board. These platforms are well-regarded in the research and industrial IoT communities for their robust radio capabilities and ease of integration with Contiki-based environments.

Key hardware components and configurations utilized include:
- **CC1200 Radio**: A high-performance sub-1GHz transceiver used for long-range, low-power communication.
- **ADC Pins**: Used for interfacing with sound sensors to capture acoustic data.
- **Antenna Selection**: Configured for Sub-GHz operation to optimize signal propagation.

### Technical Configuration

The project requires specific radio and network stack configurations to function correctly. These are typically defined in the `project-conf.h` file. For instance, the project switches the default radio driver to the `cc1200_driver` and utilizes the `nullrdc_driver` for the Radio Duty Cycling (RDC) layer to ensure precise timing for acoustic measurements.

```c
#undef  NETSTACK_CONF_RADIO
#define NETSTACK_CONF_RADIO         cc1200_driver
#define NETSTACK_CONF_RDC           nullrdc_driver
#define CC1200_CONF_USE_GPIO2       1
#define CC1200_CONF_USE_RX_WATCHDOG 0
#define ANTENNA_SW_SELECT_DEF_CONF  ANTENNA_SW_SELECT_SUBGHZ
#define RPL_MRHOF_CONF_MAX_LINK_METRIC 10000
```

### Getting Started

To deploy MoteSync, developers need to set up the Contiki-NG environment and the specific Zolertia toolchain. The workflow involves compiling the application for the `zoul` target and uploading the firmware to the nodes via USB. 

For example, to compile and upload a basic application to a Remote-revB board, the following commands are used:

```bash
make TARGET=zoul savetarget
make 01-hello-world BOARD=remote-revb
sudo make 01-hello-world.upload MOTES=/dev/ttyUSB0
```

The project also includes examples for interacting with on-board LEDs and buttons, which are essential for debugging and user interaction during field deployment. By monitoring the ADC pins, the system can trigger events based on sound thresholds, which are then synchronized across the network to determine the sound's origin.

### Sound Source Localization

The core logic of MoteSync involves processing acoustic data across multiple nodes. By synchronizing the network and comparing the time-of-arrival or signal strength of sound waves at different sensor locations, the system can calculate the most likely epicenter of the noise. This implementation demonstrates the power of using a modern RTOS like Contiki-NG for complex, time-sensitive distributed sensing tasks.
