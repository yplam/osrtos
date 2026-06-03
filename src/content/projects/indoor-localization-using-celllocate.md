---
title: Indoor Localization using CellLocate
summary: An embedded application designed for the Ublox C027-LISA-U200 board that
  implements indoor position estimation using u-blox CellLocate technology. It utilizes
  mbed-os to provide a hybrid localization solution that combines cellular network
  data with GPS signals for improved accuracy in challenging environments.
slug: indoor-localization-using-celllocate
codeUrl: https://github.com/Hameem1/Indoor-Localization-using-CellLocate
star: 6
lastUpdated: '2019-02-20'
rtos: mbed-os
topics:
- arm-mbed
- cellular
- gps
- indoor-positioning
- localization
- mbed-os
- ublox
isShow: false
createdAt: '2025-12-29'
updatedAt: '2025-12-29'
relatedProjects:
- ublox-gnss-api-for-mbed
- mbed-cellular-boilerplate
- gps-tracker
- gnss-lorawan-tracker
- smartlock-for-disco-l475vg-iot01a
- mbed-os-lorawan-tinyshell-application
---

## Overview

Indoor localization remains a significant challenge in the embedded and IoT space, as traditional GPS/GNSS signals often fail to penetrate building structures. This project addresses that limitation by leveraging the **u-blox CellLocate** feature on the **Ublox C027-LISA-U200** board. By utilizing cellular network metadata, the system can estimate a device's position even when a satellite fix is impossible.

The application is built on the **mbed-os** framework, providing a robust RTOS environment for managing cellular communication and sensor data. It is particularly useful for asset tracking, industrial monitoring, and IoT devices that frequently move between indoor and outdoor environments.

## Hybrid Localization Strategy

The core strength of this implementation lies in its hybrid approach to positioning. The system does not rely solely on one technology; instead, it intelligently manages two distinct data sources:

- **CellLocate**: When indoors or in urban canyons where GPS signals are weak, the system uses cellular tower information to estimate the location. This feature relies on a database of cellular network attributes to provide a position fix.
- **GPS/GNSS**: When the device has a clear view of the sky, it utilizes standard GPS data. 
- **Hybrid Mode**: When both sources are available, the application combines the data to provide a more reliable and potentially more accurate location estimate than either source could provide alone.

## Technical Implementation

The project is designed to run on the ARM Cortex-M3 based Ublox C027 platform. It integrates several specialized u-blox libraries to handle the complexities of AT commands and cellular modem interfacing. Key components include:

- **ublox-cellular-base**: Provides the foundational driver support for the LISA-U200 cellular module.
- **gnss**: Manages the communication with the onboard GPS/GNSS receiver.
- **Cellular Interface Extensions**: Specifically handles the proprietary AT commands required to trigger and retrieve CellLocate data from the u-blox network.

## Development Environment

This project utilizes the **mbed-cli** toolchain, allowing for a standardized build process across different environments. It is configured to use the `GCC_ARM` toolchain and targets the `UBLOX_C027` board specifically. The project structure follows the standard mbed library format, where dependencies are managed via `.lib` files pointing to remote mercurial or git repositories.

To deploy the system, developers configure their SIM card settings within the `main.cpp` file, which serves as the entry point for the localization logic. The code handles the initialization of the cellular modem, attaches to the GPRS network, and manages the state machine for location requests.
